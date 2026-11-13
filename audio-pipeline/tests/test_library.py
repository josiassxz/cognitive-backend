from pipeline.library import difficulty, display_title


def test_display_title_restores_possessive_and_minor_words():
    assert display_title("The Emperor S New Clothes") == "The Emperor's New Clothes"
    assert display_title("Mysteries Of The Unexplained") == "Mysteries of the Unexplained"
    assert display_title("Don T Look Now") == "Don't Look Now"
    assert display_title("Of Mice And Men") == "Of Mice and Men"  # primeira palavra mantém maiúscula


def _segments(text: str):
    return [{"text": text, "startMs": 0, "endMs": 60_000}]


def test_difficulty_ignores_proper_names_and_ranks_rare_words():
    easy = difficulty(_segments("The cat sat on the mat. Akuna went home with her mother and father."))
    hard = difficulty(_segments("The obstreperous curmudgeon promulgated an abstruse, recondite edict."))
    assert easy["cefrEstimate"] == "a1"
    assert hard["cefrEstimate"] == "c1"
    assert hard["rareWordPercent"] > easy["rareWordPercent"]
