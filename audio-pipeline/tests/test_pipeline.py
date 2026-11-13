"""Testes dos comportamentos críticos do pipeline (sem modelos nem rede)."""
import json

import pytest

from pipeline import review, segment, translate, validate
from pipeline.align import enforce_monotonic
from pipeline.asr import _convert_chunk
from pipeline.audio import Chunk, plan_chunks
from pipeline.clipaudit import classify
from pipeline.config import ChunkParams, SegmentParams
from pipeline.inventory import _exclusion_reason
from pipeline.util import atomic_write_json, read_json, task_lock, LockError
from pathlib import Path


def make_words(text: str, start=1000, dur=200, gap=60, pauses=None):
    """Palavras sintéticas; `pauses` = {índice: ms extra de pausa depois da palavra}."""
    pauses = pauses or {}
    words, cursor = [], start
    for index, token in enumerate(text.split()):
        words.append({"id": f"w{index + 1:06d}", "word": token, "startMs": cursor, "endMs": cursor + dur, "timeSource": "aligner"})
        cursor += dur + gap + pauses.get(index, 0)
    return words


# ---------------------------------------------------------------- janelas / chunks
def test_short_audio_is_single_chunk():
    chunks = plan_chunks(200_000, [], ChunkParams())
    assert len(chunks) == 1 and chunks[0].own_end_ms == 200_000


def test_chunks_cut_at_silence_and_cover_everything():
    silences = [(598_000, 599_000), (1_210_000, 1_211_000)]
    chunks = plan_chunks(1_800_000, silences, ChunkParams())
    assert [c.cut_kind for c in chunks] == ["silence", "silence", "end"]
    assert chunks[0].own_end_ms == 598_500
    # cobertura contínua, sem buracos nem sobreposição de "donos"
    assert chunks[0].own_start_ms == 0 and chunks[-1].own_end_ms == 1_800_000
    for a, b in zip(chunks, chunks[1:]):
        assert a.own_end_ms == b.own_start_ms


def test_chunks_without_silence_use_overlap():
    chunks = plan_chunks(1_500_000, [], ChunkParams())
    assert chunks[0].cut_kind == "overlap"
    assert chunks[0].decode_end_ms > chunks[0].own_end_ms
    assert chunks[1].decode_start_ms < chunks[1].own_start_ms


def test_overlap_words_are_not_lost_or_duplicated():
    """A mesma palavra vista em duas janelas sobrepostas fica em exatamente uma."""
    left = Chunk(0, 0, 604_000, 0, 600_000, "overlap")
    right = Chunk(1, 596_000, 1_200_000, 600_000, 1_200_000, "end")
    # palavra em 599.0–599.4 s e outra em 600.2–600.6 s (tempos absolutos)
    raw_left = {"segments": [{"words": [{"word": " before", "start": 599.0, "end": 599.4}, {"word": " after", "start": 600.2, "end": 600.6}]}]}
    raw_right = {"segments": [{"words": [{"word": " before", "start": 3.0, "end": 3.4}, {"word": " after", "start": 4.2, "end": 4.6}]}]}
    kept = [w["word"] for s in _convert_chunk(raw_left, left) for w in s["words"]]
    kept += [w["word"] for s in _convert_chunk(raw_right, right) for w in s["words"]]
    assert kept == ["before", "after"]


def test_asr_does_not_invent_probability():
    chunk = Chunk(0, 0, 10_000, 0, 10_000, "end")
    segs = _convert_chunk({"segments": [{"words": [{"word": " hi", "start": 0.1, "end": 0.4}]}]}, chunk)
    assert "probability" not in segs[0]["words"][0]


# ---------------------------------------------------------------- alinhamento
def test_enforce_monotonic_marks_estimates_as_interpolated():
    words = [
        {"id": "a", "word": "one", "startMs": 100, "endMs": 300, "timeSource": "aligner"},
        {"id": "b", "word": "two", "startMs": 50, "endMs": 90, "timeSource": "asr"},  # fora de ordem
        {"id": "c", "word": "three", "startMs": 900, "endMs": 1100, "timeSource": "aligner"},
    ]
    fixed = enforce_monotonic(words, 5000)
    assert fixed == 1 and words[1]["timeSource"] == "interpolated"
    assert words[0]["endMs"] <= words[1]["startMs"] < words[1]["endMs"] <= words[2]["startMs"]


def test_enforce_monotonic_keeps_small_overlap_as_measured():
    words = [
        {"id": "a", "word": "one", "startMs": 100, "endMs": 310, "timeSource": "aligner"},
        {"id": "b", "word": "two", "startMs": 300, "endMs": 500, "timeSource": "aligner"},
    ]
    assert enforce_monotonic(words, 5000) == 0
    assert words[1]["startMs"] == 310 and words[1]["timeSource"] == "aligner"


# ---------------------------------------------------------------- segmentação
STORY = (
    "Once upon a time there lived in a certain village a little country girl, the prettiest creature who was ever seen. "
    "Her mother was fond of her, and her grandmother doted on her still more. Yes. "
    "It suited the girl so extremely well that everybody called her Little Red Riding Hood and she set out immediately."
)


def test_segments_partition_words_exactly_once_in_order():
    words = make_words(STORY, pauses={13: 400, 20: 500})
    segments = segment.build_segments("sha256-x", words, 60_000, SegmentParams())
    covered = []
    index = {w["id"]: i for i, w in enumerate(words)}
    for seg in segments:
        covered += [w["id"] for w in words[index[seg["firstWordId"]] : index[seg["lastWordId"]] + 1]]
    assert covered == [w["id"] for w in words]
    result = validate.validate_content(words, segments, 60_000)
    assert result["status"] == "valid", result["errors"]


def test_segment_times_come_from_words_and_play_bounds_do_not_invade_neighbors():
    words = make_words(STORY, pauses={13: 400, 20: 500})
    segments = segment.build_segments("sha256-x", words, 60_000, SegmentParams())
    index = {w["id"]: i for i, w in enumerate(words)}
    for seg in segments:
        first, last = index[seg["firstWordId"]], index[seg["lastWordId"]]
        assert seg["startMs"] == words[first]["startMs"] and seg["endMs"] == words[last]["endMs"]
        assert seg["playStartMs"] <= seg["startMs"] and seg["playEndMs"] >= seg["endMs"]
        if first > 0:
            assert seg["playStartMs"] >= words[first - 1]["endMs"]
        if last + 1 < len(words):
            assert seg["playEndMs"] <= words[last + 1]["startMs"]


def test_long_sentence_is_split_at_comma_not_after_function_word():
    words = make_words(STORY, pauses={13: 400})
    segments = segment.build_segments("sha256-x", words, 60_000, SegmentParams())
    assert segments[0]["text"].endswith("girl,")
    for seg in segments:
        assert seg["wordCount"] <= 16
        last = seg["text"].split()[-1].lower()
        assert last not in {"the", "a", "of", "to", "and"}


def test_segment_ids_are_stable_and_depend_on_word_range():
    words = make_words(STORY)
    a = segment.build_segments("sha256-x", words, 60_000, SegmentParams())
    b = segment.build_segments("sha256-x", words, 60_000, SegmentParams())
    assert [s["id"] for s in a] == [s["id"] for s in b]
    assert segment.segment_id("sha256-x", "w1", "w5") != segment.segment_id("sha256-y", "w1", "w5")


def test_editorial_exclusion_removes_footer_but_keeps_it_as_neighbor():
    text = "The wolf ate her all up. The end. Hope you have enjoyed the reading Come back to http colon slash slash example"
    words = make_words(text)
    reviewed = {"segments": [{"id": "r1", "words": words}], "exclusions": review.detect_editorial_exclusions([{"words": words}])}
    excluded = review.excluded_word_ids(reviewed)
    assert words[8]["id"] in excluded and words[7]["id"] not in excluded  # "Hope" excluído, "end." mantido
    segments = segment.build_segments("sha256-x", words, 60_000, SegmentParams(), excluded)
    assert "Hope" not in " ".join(s["text"] for s in segments)
    # o último trecho não pode tocar o início do rodapé
    assert segments[-1]["playEndMs"] <= words[8]["startMs"]
    assert validate.validate_content(words, segments, 60_000, None, excluded)["status"] == "valid"


# ---------------------------------------------------------------- validação
def test_validation_catches_bad_ranges_and_lost_words():
    words = make_words("One two three four five six.")
    segments = segment.build_segments("sha256-x", words, 60_000, SegmentParams())
    assert validate.validate_content(words, segments, 60_000)["status"] == "valid"
    assert validate.validate_content(words, segments, 1500)["status"] == "invalid"  # além da duração
    broken = json.loads(json.dumps(segments))
    broken[0]["lastWordId"] = words[-2]["id"]  # perde a última palavra
    assert any("partição" in e for e in validate.validate_content(words, broken, 60_000)["errors"])
    shuffled = [dict(w) for w in words]
    shuffled[2]["startMs"] = 0
    assert validate.validate_content(shuffled, segments, 60_000)["status"] == "invalid"


def test_utf16_offsets_match_javascript_convention():
    assert validate.utf16_len("aé😀") == 4  # o emoji ocupa 2 unidades UTF-16
    assert validate.utf16_slice("a😀bc", 3, 5) == "bc"


# ---------------------------------------------------------------- tradução
def _segs():
    words = make_words("She set out immediately. He ran away.")
    segments = segment.build_segments("sha256-x", words, 60_000, SegmentParams(min_words=1, target_words=4))
    index = {w["id"]: i for i, w in enumerate(words)}
    by_segment = {s["id"]: words[index[s["firstWordId"]] : index[s["lastWordId"]] + 1] for s in segments}
    return words, segments, by_segment


def test_translation_rejects_missing_extra_repeated_ids_and_empty_text():
    _, segments, _ = _segs()
    good = {"items": [{"id": s["id"], "translation": "ok", "highlights": []} for s in segments]}
    assert set(translate.validate_batch_response(segments, good)) == {s["id"] for s in segments}
    with pytest.raises(translate.TranslationResponseError):
        translate.validate_batch_response(segments, {"items": good["items"][:-1]})
    with pytest.raises(translate.TranslationResponseError):
        translate.validate_batch_response(segments, {"items": good["items"] + [{"id": "seg_x", "translation": "a", "highlights": []}]})
    with pytest.raises(translate.TranslationResponseError):
        translate.validate_batch_response(segments, {"items": [good["items"][0]] * len(segments)})
    empty = json.loads(json.dumps(good))
    empty["items"][0]["translation"] = "  "
    with pytest.raises(translate.TranslationResponseError):
        translate.validate_batch_response(segments, empty)


def test_highlights_resolve_to_word_ids_and_utf16_offsets():
    _, segments, by_segment = _segs()
    seg = segments[0]
    resolved = translate.resolve_highlight(by_segment[seg["id"]], "Ela é rápida e partiu na hora.", "set out", "partiu")
    assert [w for w in resolved["wordIds"]] == [by_segment[seg["id"]][1]["id"], by_segment[seg["id"]][2]["id"]]
    assert "Ela é rápida e partiu na hora."[resolved["pt"]["start"] : resolved["pt"]["end"]] == "partiu"
    assert translate.resolve_highlight(by_segment[seg["id"]], "Ela partiu.", "ran away", "partiu") is None  # inglês de outro trecho
    assert translate.resolve_highlight(by_segment[seg["id"]], "Ela partiu.", "set out", "saiu") is None  # pt inexistente


def test_stale_translation_is_detected_when_english_changes(tmp_path):
    words, segments, by_segment = _segs()
    source = tmp_path / "t.json"
    source.write_text(json.dumps({"items": [{"id": s["id"], "translation": "x", "highlights": []} for s in segments]}))
    result = translate.translate_from_file(segments, by_segment, source)
    assert validate.validate_content(words, segments, 60_000, result)["translationStatus"] == "complete"
    changed = json.loads(json.dumps(segments))
    changed[0]["text"] = changed[0]["text"].replace("She", "They")
    words2 = [dict(w) for w in words]
    words2[0]["word"] = "They"
    errors = validate.validate_content(words2, changed, 60_000, result)["errors"]
    assert any("texto inglês diferente" in e for e in errors)


# ---------------------------------------------------------------- revisão / correções
def test_correction_is_traceable_and_changes_alignment_hash():
    words = make_words("Little Red Riding had set out.")
    reviewed = {"segments": [{"id": "r1", "chunk": 0, "startMs": 0, "endMs": 9000, "text": "", "words": words}], "corrections": []}
    before = review.alignment_input_hash(reviewed)
    review.apply_correction(reviewed, "w000004", "Hood", "ana", "ouvi o áudio")
    assert reviewed["corrections"][0]["before"] == "had" and reviewed["corrections"][0]["after"] == "Hood"
    assert review.alignment_input_hash(reviewed) != before  # dispara realinhamento
    with pytest.raises(ValueError):
        review.apply_correction(reviewed, "w000004", "two words", "ana", "x")


def test_flags_possible_omission_only_when_gap_is_not_silence():
    raw = {"language": "en", "detectedLanguage": "en", "segments": [
        {"id": "r1", "text": "a", "startMs": 0, "endMs": 500, "words": [{"id": "w1", "word": "a", "startMs": 0, "endMs": 500}]},
        {"id": "r2", "text": "b", "startMs": 5000, "endMs": 5500, "words": [{"id": "w2", "word": "b", "startMs": 5000, "endMs": 5500}]},
    ]}
    silent = review.detect_flags(raw, [(500, 5000)], 5500)
    voiced = review.detect_flags(raw, [], 5500)
    assert not [f for f in silent if f["kind"] == "possible_omission"]
    assert [f for f in voiced if f["kind"] == "possible_omission"]


# ---------------------------------------------------------------- inventário / util
def test_inventory_exclusion_rules():
    assert _exclusion_reason(Path("healthchecks/x.mp3"))
    assert _exclusion_reason(Path("reading/teste-mnkk3rvp.mp3"))
    assert _exclusion_reason(Path("reading/snippets/abc.mp3"))
    assert _exclusion_reason(Path("reading/the-test-of-time-abcd1234.mp3")) is None
    assert _exclusion_reason(Path("reading/little-red-riding-hood-mnx2xc04.mp3")) is None


def test_atomic_write_and_lock(tmp_path):
    target = tmp_path / "a" / "b.json"
    atomic_write_json(target, {"x": 1})
    assert read_json(target) == {"x": 1} and not list(target.parent.glob("*.tmp"))
    with task_lock(tmp_path / ".lock"):
        with pytest.raises(LockError):
            with task_lock(tmp_path / ".lock"):
                pass
    with task_lock(tmp_path / ".lock"):  # liberado depois do uso
        pass


def test_clip_audit_classification():
    assert classify(["a", "b"], ["a", "b"], None, None) == "match"
    assert classify(["a", "b"], ["z", "a", "b"], "z", None) == "leading_extra_prev_word"
    assert classify(["a", "b"], ["a", "b", "c"], None, "c") == "trailing_extra_next_word"
    assert classify(["a", "b", "c"], ["b", "c"], None, None) == "first_word_missing"
    assert classify(["a", "b", "c"], ["a", "b"], None, None) == "last_word_missing"
