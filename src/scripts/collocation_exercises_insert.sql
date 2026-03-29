-- ============================================
-- CollocationExercise - Auto-generated
-- Total: 1037 exercícios
-- ============================================

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I usually ___ breakfast at 7 AM.', 'have', ARRAY['do', 'take', 'make'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have breakfast' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We ___ lunch at noon every day.', 'have', ARRAY['do', 'take', 'make'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have lunch' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'They ___ dinner together as a family.', 'have', ARRAY['do', 'take', 'make'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have dinner' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I ___ a shower every morning.', 'take', ARRAY['make', 'bring', 'have'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'take a shower' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Can you ___ a photo of us?', 'take', ARRAY['make', 'bring', 'have'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'take a photo' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Everyone ___s mistakes when learning.', 'make', ARRAY['get', 'have', 'do'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'make a mistake' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I need to ___ my homework before dinner.', 'do', ARRAY['give', 'make', 'get'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'do homework' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'It''s late, let''s ___ home.', 'go', ARRAY['come', 'run', 'move'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go home' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Children ___ school five days a week.', 'go to', ARRAY['run to', 'walk to', 'get to'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go to school' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'go to work: ___ work', 'go to', ARRAY['run to', 'walk to', 'get to'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go to work' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Let''s ___ a game together.', 'play', ARRAY['run', 'have', 'do'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'play a game' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We ___ TV after dinner.', 'watch', ARRAY['read', 'hear', 'play'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'watch TV' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I ___ music while studying.', 'listen to', ARRAY['see', 'play', 'hear'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'listen to music' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She ___s a book before bed.', 'read', ARRAY['hear', 'see', 'write'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'read a book' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'You should ___ water every day.', 'drink', ARRAY['serve', 'pour', 'have'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'drink water' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', '___ morning! How are you?', 'good', ARRAY['bad', 'great', 'nice'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good morning' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', '___ night, sleep well!', 'good', ARRAY['bad', 'great', 'nice'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good night' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She is my ___ friend.', 'best', ARRAY['first', 'top', 'good'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'best friend' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'São Paulo is a ___ city.', 'big', ARRAY['huge', 'large', 'small'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'big city' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I love ___ weather in summer.', 'hot', ARRAY['warm', 'cool', 'wet'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'hot weather' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'You need to ___ a decision soon.', 'make', ARRAY['get', 'have', 'do'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make a decision' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'It''s easy to ___ friends at school.', 'make', ARRAY['get', 'have', 'do'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make friends' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She ___s money by selling online.', 'make', ARRAY['get', 'have', 'do'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make money' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Let''s ___ a break for coffee.', 'take', ARRAY['make', 'bring', 'have'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take a break' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I ___ a bus to work every day.', 'take', ARRAY['make', 'bring', 'have'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take a bus' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', '___ your time, there''s no rush.', 'take', ARRAY['make', 'bring', 'have'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take your time' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I ___ exercise three times a week.', 'do', ARRAY['give', 'make', 'get'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'do exercise' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'It''s your turn to ___ the dishes.', 'do', ARRAY['give', 'make', 'get'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'do the dishes' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I ___ dressed quickly in the morning.', 'get', ARRAY['give', 'put', 'take'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get dressed' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We need to ___ ready for the party.', 'get', ARRAY['give', 'put', 'take'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get ready' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I always ___ lost in this city.', 'get', ARRAY['give', 'put', 'take'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get lost' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Please ___ attention to the teacher.', 'pay', ARRAY['do', 'give', 'make'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'pay attention' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Grandma ___s us a story every night.', 'tell', ARRAY['say', 'speak', 'talk'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'tell a story' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Don''t be afraid to ___ a question.', 'ask', ARRAY['say', 'tell', 'make'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'ask a question' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Success comes from ___ work.', 'hard', ARRAY['easy', 'heavy', 'soft'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'hard work' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I try not to eat ___ food every day.', 'fast', ARRAY['long', 'easy', 'short'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'fast food' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She is a very ___ friend of mine.', 'close', ARRAY['far', 'new', 'near'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'close friend' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I need a ___ coffee this morning.', 'strong', ARRAY['hard', 'tough', 'firm'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'strong coffee' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'There was ___ rain last night.', 'heavy', ARRAY['strong', 'hard', 'thick'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'heavy rain' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'He fell into a ___ sleep.', 'deep', ARRAY['shallow', 'high', 'wide'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'deep sleep' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'make progress: ___ progress', 'make', ARRAY['get', 'have', 'do'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make progress' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Please ___ an effort to arrive on time.', 'make', ARRAY['get', 'have', 'do'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make an effort' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'You should ___ advantage of this opportunity.', 'take', ARRAY['make', 'bring', 'have'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take advantage' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'You must ___ responsibility for your actions.', 'take', ARRAY['make', 'bring', 'have'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take responsibility' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We need to ___ more research on this topic.', 'do', ARRAY['give', 'make', 'get'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'do research' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'He always ___s his promises.', 'keep', ARRAY['leave', 'take', 'make'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'keep a promise' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She ___s a successful business.', 'run', ARRAY['do', 'hold', 'set'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'run a business' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'catch a cold: ___ cold', 'catch', ARRAY['get', 'make', 'hold'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'catch a cold' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'It''s hard to ___ a bad habit.', 'break', ARRAY['take', 'keep', 'make'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'break a habit' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I''m trying to ___ money for a trip.', 'save', ARRAY['keep', 'hold', 'cut'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'save money' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'He wants to ___ weight before summer.', 'lose', ARRAY['waste', 'break', 'miss'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'lose weight' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Can you ___ me some advice?', 'give', ARRAY['put', 'get', 'have'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'give advice' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We need to ___ this problem quickly.', 'solve', ARRAY['work', 'find', 'make'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'solve a problem' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I always try to ___ the deadline.', 'meet', ARRAY['join', 'get', 'find'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'meet a deadline' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'I use ___ transport to go to work.', 'public', ARRAY['common', 'private', 'social'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'public transport' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Just use your ___ sense.', 'common', ARRAY['normal', 'general', 'rare'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'common sense' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Motivation is a ___ factor for success.', 'key', ARRAY['basic', 'major', 'main'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'key factor' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Technology plays a ___ role in education.', 'major', ARRAY['big', 'key', 'primary'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'major role' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'This store sells ___ quality products.', 'high', ARRAY['big', 'wide', 'long'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'high quality' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We need a ___ term plan.', 'long', ARRAY['short', 'wide', 'high'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'long term' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We can ___ a conclusion from the data.', 'draw', ARRAY['bring', 'pull', 'take'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'draw a conclusion' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The campaign aims to ___ awareness.', 'raise', ARRAY['set', 'make', 'lift'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'raise awareness' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She worked hard to ___ her goal.', 'reach', ARRAY['hit', 'make', 'find'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'reach a goal' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We must ___ this challenge together.', 'face', ARRAY['handle', 'find', 'see'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'face a challenge' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Please ___ the instructions carefully.', 'follow', ARRAY['keep', 'take', 'make'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'follow instructions' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She ___ed valuable experience abroad.', 'gain', ARRAY['make', 'reach', 'win'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'gain experience' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Hard work helps you ___ success.', 'achieve', ARRAY['get', 'reach', 'gain'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'achieve success' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'It''s important to ___ clear goals.', 'set', ARRAY['get', 'make', 'run'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'set a goal' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We will ___ a meeting next Monday.', 'hold', ARRAY['make', 'carry', 'keep'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'hold a meeting' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We need to ___ out this plan.', 'carry', ARRAY['take', 'move', 'hold'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'carry out a plan' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'This tool ___s an important purpose.', 'serve', ARRAY['bring', 'provide', 'give'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'serve a purpose' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'He was accused of ___ting a crime.', 'commit', ARRAY['do', 'make', 'carry'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'commit a crime' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', '___ thinking is essential in education.', 'critical', ARRAY['key', 'serious', 'important'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'critical thinking' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'There was a ___ increase in prices.', 'sharp', ARRAY['steep', 'strong', 'sudden'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'sharp increase' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The company faced a ___ decline in sales.', 'steep', ARRAY['big', 'sharp', 'strong'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'steep decline' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Losing the final was a ___ disappointment.', 'bitter', ARRAY['cold', 'sweet', 'harsh'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'bitter disappointment' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We offer a ___ range of services.', 'broad', ARRAY['big', 'open', 'wide'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'broad range' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'There is ___ competition in this market.', 'fierce', ARRAY['hard', 'wild', 'strong'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'fierce competition' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'A good relationship is based on ___ respect.', 'mutual', ARRAY['common', 'shared', 'open'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'mutual respect' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The city experienced ___ growth.', 'rapid', ARRAY['sudden', 'fast', 'swift'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'rapid growth' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The team ___ed extensive research.', 'conduct', ARRAY['carry', 'make', 'perform'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'conduct research' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'They ___ed a marketing campaign.', 'launch', ARRAY['make', 'start', 'begin'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'launch a campaign' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'overcome obstacles: ___ obstacles', 'overcome', ARRAY['solve', 'beat', 'face'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'overcome obstacles' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'He decided to ___ a career in medicine.', 'pursue', ARRAY['seek', 'reach', 'chase'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'pursue a career' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'We need to ___ this problem head-on.', 'tackle', ARRAY['deal', 'solve', 'face'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'tackle a problem' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The new strategy ___ed great results.', 'yield', ARRAY['create', 'give', 'produce'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'yield results' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Media can ___ a powerful influence.', 'exert', ARRAY['show', 'use', 'put'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'exert influence' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The government ___d new restrictions.', 'impose', ARRAY['put', 'force', 'place'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'impose restrictions' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'It''s difficult to ___ economic growth.', 'sustain', ARRAY['maintain', 'keep', 'support'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'sustain growth' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'draw attention: ___ attention', 'draw', ARRAY['bring', 'pull', 'take'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'draw attention' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Experts ___d concerns about the plan.', 'raise', ARRAY['set', 'make', 'lift'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'raise concerns' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Technology has had a ___ impact.', 'profound', ARRAY['deep', 'major', 'big'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'profound impact' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The tech industry saw ___ growth.', 'unprecedented', ARRAY['huge', 'massive', 'incredible'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'unprecedented growth' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'He had only a ___ notion of what to do.', 'vague', ARRAY['weak', 'dim', 'light'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'vague notion' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'Children have a ___ imagination.', 'vivid', ARRAY['clear', 'rich', 'deep'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'vivid imagination' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'She succeeded through ___ determination.', 'sheer', ARRAY['complete', 'total', 'utter'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'sheer determination' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'There is ___ evidence to support it.', 'substantial', ARRAY['major', 'big', 'significant'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'substantial evidence' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'They reached a ___ agreement.', 'mutual', ARRAY['common', 'shared', 'open'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'mutual agreement' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'The proposal sparked a ___ debate.', 'fierce', ARRAY['hard', 'wild', 'strong'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'fierce debate' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'fill_blank', 'There is a ___ consensus on this issue.', 'broad', ARRAY['big', 'open', 'wide'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'broad consensus' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: tomar café da manhã', 'have breakfast', ARRAY['sustain growth', 'keep a promise', 'exert influence'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have breakfast' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: almoçar', 'have lunch', ARRAY['face a challenge', 'sustain growth', 'drink water'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have lunch' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: jantar', 'have dinner', ARRAY['take a photo', 'have breakfast', 'hold a meeting'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have dinner' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: tomar banho', 'take a shower', ARRAY['have breakfast', 'break a habit', 'exert influence'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'take a shower' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: tirar uma foto', 'take a photo', ARRAY['have breakfast', 'ask a question', 'launch a campaign'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'take a photo' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: cometer um erro', 'make a mistake', ARRAY['raise awareness', 'make a decision', 'break a habit'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'make a mistake' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fazer lição de casa', 'do homework', ARRAY['serve a purpose', 'give advice', 'save money'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'do homework' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ir para casa', 'go home', ARRAY['make a decision', 'overcome obstacles', 'get dressed'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go home' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ir à escola', 'go to school', ARRAY['make a mistake', 'tell a story', 'follow instructions'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go to school' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ir ao trabalho', 'go to work', ARRAY['get lost', 'tell a story', 'pay attention'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go to work' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: jogar um jogo', 'play a game', ARRAY['raise concerns', 'ask a question', 'keep a promise'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'play a game' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: assistir TV', 'watch TV', ARRAY['launch a campaign', 'raise awareness', 'take your time'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'watch TV' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ouvir música', 'listen to music', ARRAY['read a book', 'reach a goal', 'gain experience'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'listen to music' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ler um livro', 'read a book', ARRAY['take your time', 'get lost', 'follow instructions'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'read a book' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: beber água', 'drink water', ARRAY['gain experience', 'listen to music', 'meet a deadline'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'drink water' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: bom dia', 'good morning', ARRAY['public transport', 'broad consensus', 'broad range'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good morning' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: boa noite', 'good night', ARRAY['vivid imagination', 'broad consensus', 'best friend'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good night' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: melhor amigo/a', 'best friend', ARRAY['mutual respect', 'high quality', 'substantial evidence'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'best friend' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: cidade grande', 'big city', ARRAY['heavy rain', 'vivid imagination', 'rapid growth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'big city' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: clima quente', 'hot weather', ARRAY['mutual agreement', 'unprecedented growth', 'best friend'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'hot weather' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: tomar uma decisão', 'make a decision', ARRAY['do exercise', 'take a bus', 'yield results'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make a decision' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fazer amigos', 'make friends', ARRAY['make a decision', 'go home', 'drink water'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make friends' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ganhar dinheiro', 'make money', ARRAY['gain experience', 'take a bus', 'watch TV'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make money' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fazer uma pausa', 'take a break', ARRAY['break a habit', 'hold a meeting', 'save money'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take a break' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: pegar um ônibus', 'take a bus', ARRAY['solve a problem', 'launch a campaign', 'go home'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take a bus' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: não ter pressa', 'take your time', ARRAY['have dinner', 'give advice', 'do research'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take your time' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fazer exercício', 'do exercise', ARRAY['face a challenge', 'go to work', 'take your time'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'do exercise' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: lavar a louça', 'do the dishes', ARRAY['do homework', 'make money', 'have dinner'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'do the dishes' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: se vestir', 'get dressed', ARRAY['watch TV', 'take a break', 'raise awareness'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get dressed' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: se preparar', 'get ready', ARRAY['drink water', 'impose restrictions', 'face a challenge'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get ready' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: se perder', 'get lost', ARRAY['catch a cold', 'take a break', 'read a book'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get lost' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: prestar atenção', 'pay attention', ARRAY['go home', 'do research', 'tell a story'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'pay attention' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: contar uma história', 'tell a story', ARRAY['raise awareness', 'exert influence', 'pursue a career'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'tell a story' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fazer uma pergunta', 'ask a question', ARRAY['have lunch', 'take a photo', 'make a mistake'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'ask a question' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: trabalho duro', 'hard work', ARRAY['sharp increase', 'unprecedented growth', 'good night'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'hard work' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: comida rápida', 'fast food', ARRAY['big city', 'substantial evidence', 'heavy rain'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'fast food' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: amigo íntimo', 'close friend', ARRAY['bitter disappointment', 'hard work', 'common sense'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'close friend' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: café forte', 'strong coffee', ARRAY['heavy rain', 'fast food', 'sheer determination'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'strong coffee' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: chuva forte', 'heavy rain', ARRAY['deep sleep', 'hard work', 'rapid growth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'heavy rain' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sono profundo', 'deep sleep', ARRAY['sheer determination', 'broad consensus', 'hot weather'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'deep sleep' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: progredir', 'make progress', ARRAY['hold a meeting', 'draw a conclusion', 'take responsibility'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make progress' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fazer um esforço', 'make an effort', ARRAY['go to school', 'give advice', 'get lost'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make an effort' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: aproveitar', 'take advantage', ARRAY['listen to music', 'take a photo', 'achieve success'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take advantage' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: assumir responsabilidade', 'take responsibility', ARRAY['take a break', 'go to work', 'save money'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take responsibility' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fazer pesquisa', 'do research', ARRAY['raise concerns', 'have dinner', 'keep a promise'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'do research' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: cumprir uma promessa', 'keep a promise', ARRAY['watch TV', 'do the dishes', 'have dinner'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'keep a promise' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: administrar um negócio', 'run a business', ARRAY['take advantage', 'take your time', 'take a shower'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'run a business' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: pegar um resfriado', 'catch a cold', ARRAY['have lunch', 'reach a goal', 'listen to music'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'catch a cold' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: quebrar um hábito', 'break a habit', ARRAY['launch a campaign', 'sustain growth', 'tackle a problem'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'break a habit' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: economizar dinheiro', 'save money', ARRAY['lose weight', 'ask a question', 'listen to music'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'save money' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: perder peso', 'lose weight', ARRAY['have breakfast', 'go home', 'make friends'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'lose weight' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: dar conselho', 'give advice', ARRAY['do exercise', 'conduct research', 'make a mistake'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'give advice' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: resolver um problema', 'solve a problem', ARRAY['tell a story', 'break a habit', 'launch a campaign'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'solve a problem' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: cumprir um prazo', 'meet a deadline', ARRAY['run a business', 'take responsibility', 'follow instructions'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'meet a deadline' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: transporte público', 'public transport', ARRAY['mutual agreement', 'strong coffee', 'vivid imagination'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'public transport' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: senso comum', 'common sense', ARRAY['sharp increase', 'major role', 'big city'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'common sense' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fator chave', 'key factor', ARRAY['major role', 'good morning', 'rapid growth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'key factor' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: papel importante', 'major role', ARRAY['broad consensus', 'heavy rain', 'good night'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'major role' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: alta qualidade', 'high quality', ARRAY['public transport', 'good morning', 'vague notion'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'high quality' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: longo prazo', 'long term', ARRAY['fierce debate', 'substantial evidence', 'high quality'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'long term' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: chegar a uma conclusão', 'draw a conclusion', ARRAY['sustain growth', 'go to school', 'hold a meeting'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'draw a conclusion' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: aumentar a conscientização', 'raise awareness', ARRAY['watch TV', 'pursue a career', 'tell a story'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'raise awareness' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: alcançar um objetivo', 'reach a goal', ARRAY['save money', 'watch TV', 'make an effort'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'reach a goal' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: enfrentar um desafio', 'face a challenge', ARRAY['commit a crime', 'save money', 'go home'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'face a challenge' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: seguir instruções', 'follow instructions', ARRAY['have breakfast', 'keep a promise', 'play a game'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'follow instructions' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ganhar experiência', 'gain experience', ARRAY['watch TV', 'run a business', 'follow instructions'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'gain experience' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: alcançar sucesso', 'achieve success', ARRAY['draw attention', 'exert influence', 'take a bus'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'achieve success' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: definir um objetivo', 'set a goal', ARRAY['have breakfast', 'yield results', 'sustain growth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'set a goal' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: realizar uma reunião', 'hold a meeting', ARRAY['go to school', 'give advice', 'draw a conclusion'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'hold a meeting' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: executar um plano', 'carry out a plan', ARRAY['get dressed', 'do homework', 'solve a problem'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'carry out a plan' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: servir a um propósito', 'serve a purpose', ARRAY['go home', 'run a business', 'do homework'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'serve a purpose' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: cometer um crime', 'commit a crime', ARRAY['tell a story', 'overcome obstacles', 'have lunch'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'commit a crime' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: pensamento crítico', 'critical thinking', ARRAY['good morning', 'mutual respect', 'steep decline'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'critical thinking' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: aumento acentuado', 'sharp increase', ARRAY['unprecedented growth', 'sheer determination', 'profound impact'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'sharp increase' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: queda acentuada', 'steep decline', ARRAY['unprecedented growth', 'hard work', 'substantial evidence'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'steep decline' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: decepção amarga', 'bitter disappointment', ARRAY['unprecedented growth', 'high quality', 'big city'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'bitter disappointment' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ampla gama', 'broad range', ARRAY['common sense', 'sharp increase', 'profound impact'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'broad range' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: concorrência acirrada', 'fierce competition', ARRAY['critical thinking', 'vague notion', 'substantial evidence'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'fierce competition' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: respeito mútuo', 'mutual respect', ARRAY['bitter disappointment', 'major role', 'sharp increase'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'mutual respect' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: crescimento rápido', 'rapid growth', ARRAY['fierce debate', 'strong coffee', 'hot weather'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'rapid growth' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: conduzir pesquisa', 'conduct research', ARRAY['gain experience', 'sustain growth', 'hold a meeting'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'conduct research' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: lançar uma campanha', 'launch a campaign', ARRAY['watch TV', 'pursue a career', 'take a bus'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'launch a campaign' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: superar obstáculos', 'overcome obstacles', ARRAY['ask a question', 'take advantage', 'get dressed'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'overcome obstacles' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: seguir uma carreira', 'pursue a career', ARRAY['save money', 'set a goal', 'launch a campaign'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'pursue a career' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: enfrentar um problema', 'tackle a problem', ARRAY['pursue a career', 'catch a cold', 'pay attention'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'tackle a problem' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: gerar resultados', 'yield results', ARRAY['overcome obstacles', 'get lost', 'commit a crime'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'yield results' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: exercer influência', 'exert influence', ARRAY['make progress', 'achieve success', 'watch TV'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'exert influence' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: impor restrições', 'impose restrictions', ARRAY['play a game', 'take a bus', 'pursue a career'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'impose restrictions' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sustentar crescimento', 'sustain growth', ARRAY['pay attention', 'face a challenge', 'do exercise'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'sustain growth' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: chamar atenção', 'draw attention', ARRAY['launch a campaign', 'reach a goal', 'do research'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'draw attention' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: levantar preocupações', 'raise concerns', ARRAY['get ready', 'pay attention', 'go home'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'raise concerns' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: impacto profundo', 'profound impact', ARRAY['public transport', 'common sense', 'heavy rain'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'profound impact' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: crescimento sem precedentes', 'unprecedented growth', ARRAY['broad consensus', 'best friend', 'broad range'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'unprecedented growth' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: noção vaga', 'vague notion', ARRAY['high quality', 'critical thinking', 'major role'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'vague notion' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: imaginação vívida', 'vivid imagination', ARRAY['critical thinking', 'key factor', 'profound impact'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'vivid imagination' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: pura determinação', 'sheer determination', ARRAY['best friend', 'big city', 'mutual respect'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'sheer determination' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: evidência substancial', 'substantial evidence', ARRAY['public transport', 'hard work', 'critical thinking'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'substantial evidence' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: acordo mútuo', 'mutual agreement', ARRAY['hot weather', 'steep decline', 'key factor'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'mutual agreement' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: debate acirrado', 'fierce debate', ARRAY['sheer determination', 'hot weather', 'strong coffee'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'fierce debate' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: amplo consenso', 'broad consensus', ARRAY['common sense', 'fierce competition', 'sheer determination'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'broad consensus' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: bit', 'a bit', ARRAY['work out', 'on holiday', 'decline in sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'a bit' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: more', 'a bit more', ARRAY['if necessary', 'by no means', 'one another'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a bit more' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: a…', 'a bit of a…', ARRAY['check in', 'carry on', 'come across sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'a bit of a…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'a bit of sth', ARRAY['control over sb/sth', 'for the benefit of sb', 'for lunch'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a bit of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'a couple of sth', ARRAY['in addition', 'have a look', 'deal with sb'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'a couple of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: few', 'a few', ARRAY['in order of sth', 'engaged in sth', 'in effect'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'a few' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: idea', 'a good idea', ARRAY['in town', 'caused by sth', 'last year'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'a good idea' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: deal', 'a great deal', ARRAY['depend on sb/sth', 'if you want to', 'care for sb'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a great deal' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of...', 'a kind of...', ARRAY['for free', 'as for sb/sth', 'primary school'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a kind of...' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: little', 'a little', ARRAY['i''m sorry', 'look sth up', 'how long…?'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'a little' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: bit', 'a little bit', ARRAY['come true', 'at home', 'access to sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a little bit' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: more', 'a little more', ARRAY['get better', 'go wrong', 'be made up of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a little more' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ago', 'a long time ago', ARRAY['per hour', 'up to sth', 'with respect to sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'a long time ago' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: way', 'a long way', ARRAY['on holiday', 'bound to do sth', 'x years later'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'a long way' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: lot', 'a lot', ARRAY['to do with sb/sth', 'subject to sth', 'nothing like'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'a lot' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: more', 'a lot more', ARRAY['a means of sth', 'as follows…', 'good for sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a lot more' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'a lot of sth', ARRAY['in charge of sb/sth', 'be allowed to do sth', 'in touch'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'a lot of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'a means of sth', ARRAY['the rest of sth', 'no doubt', 'search engine'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'a means of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'a number of sth', ARRAY['come into sth', 'break up', 'and so on'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'a number of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'a period of time', ARRAY['bear sb/sth in mind', 'take advantage of sb/sth', 'all but'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'a period of time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'a range of sth', ARRAY['town centre', 'each other', 'for free'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a range of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'a variety of sth', ARRAY['because of', 'or so', 'too bad'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'a variety of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'able to do sth', ARRAY['each one', 'in summer', 'at present'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'able to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: all', 'above all', ARRAY['aim to do sth', 'excuse me', 'appeal to sb'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'above all' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'access to sth', ARRAY['relate to sth/sb', 'deprive sb/sth of sth', 'over there'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'access to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'account for sth', ARRAY['next time', 'have time', 'in the presence of sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'account for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'accused of sth', ARRAY['have got', 'after all', 'in the presence of sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'accused of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'act as sth', ARRAY['happy with sb/sth', 'make a difference', 'on the way'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'act as sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'add to sth', ARRAY['so far', 'start with sb/sth', 'at the hands of sb'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'add to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: all', 'after all', ARRAY['in bed', 'in recent years', 'work together'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'after all' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: again', 'again and again', ARRAY['the following…', 'aimed at sb', 'in a way that…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'again and again' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'agree with sb', ARRAY['be known as sb/sth', 'quite a lot', 'for instance'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'agree with sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'aim to do sth', ARRAY['why not…?', 'concerned with sth', 'far away'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'aim to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'aimed at doing sth', ARRAY['the next day', 'for instance', 'by the end of sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'aimed at doing sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'aimed at sb', ARRAY['with the exception of sb/sth', 'hear of sb/sth', 'how long…?'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'aimed at sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: about…', 'all about…', ARRAY['far from sth', 'fail to do sth', 'at first'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'all about…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: but', 'all but', ARRAY['that is', 'look back at sth', 'tend to do sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'all but' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: day', 'all day', ARRAY['in touch', 'worried about sb/sth', 'take over'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'all day' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'all kinds of…', ARRAY['on board', 'not necessarily', 'turn sth on'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'all kinds of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: world', 'all over the world', ARRAY['would you like…?', 'for a moment', 'swimming pool'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'all over the world' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: over…', 'all over…', ARRAY['end in sth', 'hear about sb/sth', 'in order of sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'all over…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'all sorts of…', ARRAY['as such', 'by means of sth', 'in history'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'all sorts of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: more', 'all the more', ARRAY['wait for sb/sth', 'high street', 'get married'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'all the more' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'all the time', ARRAY['depend on sb/sth', 'stay in', 'had better'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'all the time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: way', 'all the way', ARRAY['likely to do sth', 'stay in', 'take off'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'all the way' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'along with sb/sth', ARRAY['get up', 'be surrounded by sb/sth', 'mental health'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'along with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'alternative to sth', ARRAY['as of…', 'at the end of sth', 'manage to do sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'alternative to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'and so on', ARRAY['be attributed to sb', 'phone call', 'as much as'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'and so on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: else', 'anything else', ARRAY['climate change', 'in an attempt to do sth', 'some kind of…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'anything else' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: from', 'apart from', ARRAY['awareness of sth', 'associated with sth', 'turn sth on'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'apart from' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'appeal to sb', ARRAY['such a/an…', 'result in sth', 'care about sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'appeal to sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'apply for sth', ARRAY['in the absence of sb/sth', 'over there', 'i mean'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'apply for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'apply to sb/sth', ARRAY['at first', 'excuse me', 'the case'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'apply to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: world', 'around the world', ARRAY['other than', 'well known', 'believe in sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'around the world' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: at…', 'arrive at…', ARRAY['that''s it', 'in the first place', 'at times'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'arrive at…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: in…', 'arrive in…', ARRAY['as to', 'out there', 'in business'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'arrive in…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: gallery', 'art gallery', ARRAY['that day', 'be surrounded by sb/sth', 'i think so'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'art gallery' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: result', 'as a result', ARRAY['anything else', 'work hard', 'check in'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'as a result' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: whole', 'as a whole', ARRAY['on the street', 'awareness of sth', 'to date'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'as a whole' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: concerned', 'as far as i am concerned', ARRAY['on behalf of sb', 'town centre', 'check out'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'as far as i am concerned' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: concerned', 'as far as sb/sth is concerned', ARRAY['have fun', 'turn out', 'at the beginning of sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'as far as sb/sth is concerned' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: follows…', 'as follows…', ARRAY['come up with sth', 'aim to do sth', 'work on sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'as follows…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'as for sb/sth', ARRAY['secondary school', 'for long', 'sum up'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'as for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: if…', 'as if…', ARRAY['take sth off', 'on board', 'engage in sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'as if…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: as…', 'as long as…', ARRAY['all the time', 'on board', 'this year'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'as long as…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: as', 'as much as', ARRAY['relate to sth/sb', 'car park', 'look out'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'as much as' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'as of…', ARRAY['come into sth', 'in the case of sth', 'be expected to do sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'as of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: to', 'as opposed to', ARRAY['exposure to sth', 'bad for sb/sth', 'by no means'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'as opposed to' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'as part of sth', ARRAY['rise in sth', 'unable to do sth', 'in an attempt to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'as part of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: as', 'as soon as', ARRAY['you see', 'oh no!', 'role model'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'as soon as' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: possible', 'as soon as possible', ARRAY['in the meantime', 'not only', 'in the centre'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'as soon as possible' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: such', 'as such', ARRAY['the following…', 'make sense', 'half an hour'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'as such' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: though…', 'as though…', ARRAY['other than', 'be meant to do sth', 'in order of sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'as though…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: to', 'as to', ARRAY['caused by sth', 'secondary school', 'take place'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'as to' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: well', 'as well', ARRAY['belong to sb', 'back sb/sth up', 'point of view'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'as well' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'ask for sth', ARRAY['x years later', 'nothing like', 'work with sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'ask for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'associated with sth', ARRAY['sort sb/sth/yourself out', 'for example', 'family member'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'associated with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: first', 'at first', ARRAY['take over', 'attached to sb/sth', 'manage to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'at first' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: home', 'at home', ARRAY['feel like sth', 'well known', 'lots of…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at home' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: last', 'at last', ARRAY['be said to be sth', 'work as sth', 'these days'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'at last' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: least', 'at least', ARRAY['care for sb', 'belong to sth', 'set out'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'at least' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: once', 'at once', ARRAY['in hospital', 'tell the truth', 'be said to be sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'at once' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: present', 'at present', ARRAY['once a…', 'in particular', 'involvement in sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'at present' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: risk', 'at risk', ARRAY['stay in', 'end with sth', 'in the hands of sb'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'at risk' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: school', 'at school', ARRAY['in the wake of sb/sth', 'take off', 'pretty good'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at school' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: point', 'at some point', ARRAY['a range of sth', 'he or she', 'concentrate on sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'at some point' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'at the age of…', ARRAY['this year', 'have nothing to do with sb/sth', 'climate change'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'at the age of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'at the beginning of sth', ARRAY['at risk', 'arrive in…', 'have sth in common'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at the beginning of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: end', 'at the end', ARRAY['in history', 'sit down', 'be made of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at the end' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'at the end of sth', ARRAY['on the street', 'family member', 'in turn'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at the end of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: day', 'at the end of the day', ARRAY['tv show', 'except for', 'sort sb/sth/yourself out'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'at the end of the day' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'at the expense of sb/sth', ARRAY['come on!', 'each one', 'take over'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'at the expense of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'at the hands of sb', ARRAY['for the sake of sb/sth', 'talk about sb/sth', 'along with sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'at the hands of sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: moment', 'at the moment', ARRAY['how long…?', 'in the wake of sb/sth', 'in a position to do sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at the moment' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'at the same time', ARRAY['think about sb/sth', 'a bit', 'by the end of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at the same time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'at the start of sth', ARRAY['search engine', 'so that…', 'take care of sb/sth/yourself'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'at the start of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'at the time', ARRAY['bring sth up', 'on the other side', 'sound like sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'at the time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'at the time of sth', ARRAY['with regard to sb/sth', 'get on with sb', 'wrong with sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'at the time of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: top', 'at the top', ARRAY['think about sb/sth', 'one or two', 'something like…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'at the top' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: weekend', 'at the weekend', ARRAY['write sth down', 'in the air', 'excuse me'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at the weekend' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: point', 'at this point', ARRAY['even though', 'the 20th century', 'even more…'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'at this point' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: stage', 'at this stage', ARRAY['a period of time', 'look for sb/sth', 'some kind of…'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'at this stage' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: times', 'at times', ARRAY['in business', 'be surrounded by sb/sth', 'i''m afraid…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'at times' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: university', 'at university', ARRAY['be made up of sth', 'the first thing', 'worried about sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at university' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: work', 'at work', ARRAY['oh no!', 'relate to sth/sb', 'developing countries'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'at work' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'attached to sb/sth', ARRAY['be made up of sth', 'one another', 'well known'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'attached to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'awareness of sth', ARRAY['on tv', 'be known to do sth', 'live with sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'awareness of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'away from sb/sth', ARRAY['instead of', 'hear about sb/sth', 'over the years'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'away from sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: forth', 'back and forth', ARRAY['get better', 'every day', 'i guess'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'back and forth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'back sb/sth up', ARRAY['a variety of sth', 'as if…', 'begin with sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'back sb/sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'bad for sb/sth', ARRAY['a long way', 'opposed to sth', 'post office'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'bad for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: news', 'bad news', ARRAY['look like sb/sth', 'benefit from sth', 'good at sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'bad news' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: thing', 'bad thing', ARRAY['have got to', 'plan for sth', 'secondary school'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'bad thing' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'based on sth', ARRAY['act as sth', 'on the internet', 'at the end'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'based on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be about to do sth', ARRAY['in other words', 'millions of…', 'let alone'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'be about to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be allowed to do sth', ARRAY['related to sth/sb', 'report on sth', 'of course'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'be allowed to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'be attributed to sb', ARRAY['other than', 'run out of sth', 'find out'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'be attributed to sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be charged with sth', ARRAY['in some cases', 'go into sth', 'go down'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'be charged with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be derived from sth', ARRAY['in order to do sth', 'write sth down', 'difficult for sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'be derived from sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be entitled to sth', ARRAY['not even', 'the next day', 'on monday'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'be entitled to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be expected to do sth', ARRAY['go through sth', 'on television', 'such as'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'be expected to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be found to do sth', ARRAY['go ahead', 'as a whole', 'as much as'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'be found to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'be going on', ARRAY['city centre', 'for life', 'after all'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'be going on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be going to do sth', ARRAY['no more than…', 'apart from', 'secondary school'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'be going to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'be known as sb/sth', ARRAY['look for sb/sth', 'follow sth up', 'lead to sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'be known as sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be known to do sth', ARRAY['get up', 'look sth up', 'x years old'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'be known to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be made of sth', ARRAY['once again', 'refer to sb/sth', 'as a whole'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'be made of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be made up of sth', ARRAY['work on sth', 'excuse me', 'for example'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'be made up of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be meant to do sth', ARRAY['or so', 'talk about sb/sth', 'check in'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'be meant to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be reported to be sth', ARRAY['in the middle', 'go away', 'in connection with sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'be reported to be sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be said to be sth', ARRAY['at the end of the day', 'sit down', 'figure sb/sth out'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'be said to be sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'be supposed to do sth', ARRAY['he or she', 'no doubt', 'in the light of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'be supposed to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'be surrounded by sb/sth', ARRAY['be expected to do sth', 'take off', 'if you want to'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'be surrounded by sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: blame', 'be to blame', ARRAY['make sure', 'grow up', 'back and forth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'be to blame' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: mind', 'bear sb/sth in mind', ARRAY['those who…', 'get better', 'search engine'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'bear sb/sth in mind' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of', 'because of', ARRAY['believe in sb/sth', 'as for sb/sth', 'no more than…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'because of' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'begin with sth', ARRAY['at least', 'come on!', 'care for sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'begin with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'believe in sb/sth', ARRAY['for long', 'on earth', 'no longer'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'believe in sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'belong to sb', ARRAY['i mean', 'spend time', 'all the time'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'belong to sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'belong to sth', ARRAY['be made of sth', 'in any case', 'come into sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'belong to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'benefit from sth', ARRAY['in the same way', 'phone number', 'as to'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'benefit from sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: white', 'black and white', ARRAY['nothing but', 'make sure', 'the first thing'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'black and white' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sides', 'both sides', ARRAY['all but', 'set sth up', 'back and forth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'both sides' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'bound to do sth', ARRAY['let me know', 'i don''t care', 'pretty good'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'bound to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'break up', ARRAY['look for sb/sth', 'it takes …', 'over the course of…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'break up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'bring sb up', ARRAY['such a/an…', 'the best thing', 'high street'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'bring sb up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: about', 'bring sth about', ARRAY['be allowed to do sth', 'per hour', 'i would say…'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'bring sth about' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'bring sth up', ARRAY['take care of sb/sth/yourself', 'all over…', 'as such'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'bring sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'by means of sth', ARRAY['go down sth', 'on board', 'in relation to sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'by means of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: means', 'by no means', ARRAY['be meant to do sth', 'feel good', 'in the future'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'by no means' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: now', 'by now', ARRAY['have time', 'in school', 'on the way'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'by now' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'by the end of sth', ARRAY['in general', 'last year', 'mental health'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'by the end of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: (that)…', 'by the time (that)…', ARRAY['sound like sb/sth', 'bound to do sth', 'be found to do sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'by the time (that)…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'call for sth', ARRAY['you see', 'access to sth', 'in the country'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'call for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'call on sb', ARRAY['go to bed', 'work sth out', 'a little'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'call on sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'can''t afford sth', ARRAY['all kinds of…', 'in connection with sb/sth', 'take sth into account'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'can''t afford sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: park', 'car park', ARRAY['get back', 'differences between a and b', 'a bit of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'car park' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'care about sth', ARRAY['in the summer', 'cell phone', 'control over sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'care about sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'care for sb', ARRAY['sort sb/sth/yourself out', 'may well', 'you''re welcome'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'care for sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'carry on', ARRAY['on the other hand', 'at the end', 'at the time'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'carry on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'carry sth out', ARRAY['over the course of…', 'a period of time', 'prime minister'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'carry sth out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: study', 'case study', ARRAY['would love to do sth', 'in danger', 'in connection with sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'case study' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'caused by sth', ARRAY['at the time', 'in effect', 'as to'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'caused by sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: phone', 'cell phone', ARRAY['on the other side', 'other than', 'hang on'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'cell phone' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: in', 'check in', ARRAY['family member', 'thank you', 'at the end'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'check in' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'check out', ARRAY['in some cases', 'have fun', 'heart disease'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'check out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'check sb/sth out', ARRAY['start with sb/sth', 'to date', 'or two'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'check sb/sth out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'choose to do sth', ARRAY['up and down', 'get home', 'in relation to sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'choose to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: centre', 'city centre', ARRAY['on earth', 'black and white', 'arrive in…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'city centre' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'clean up', ARRAY['in the end', 'bring sth up', 'on my own'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'clean up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'click on sth', ARRAY['opposed to sth', 'sound like sb/sth', 'take advantage of sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'click on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: change', 'climate change', ARRAY['caused by sth', 'appeal to sb', 'make sense'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'climate change' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'close to sb/sth', ARRAY['a lot more', 'black and white', 'in such a way (that)…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'close to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'come across sb/sth', ARRAY['on holiday', 'as though…', 'ordinary people'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'come across sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: back', 'come back', ARRAY['get to know sb', 'human being', 'fail to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'come back' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: from…', 'come from…', ARRAY['good news', 'or two', 'old friend'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'come from…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'come into sth', ARRAY['ordinary people', 'put sth on', 'check in'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'come into sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on!', 'come on!', ARRAY['in line with sth', 'bring sth up', 'millions of…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'come on!' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: true', 'come true', ARRAY['in the past', 'at last', 'get better'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'come true' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'come up with sth', ARRAY['in this case', 'go back', 'in the absence of sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'come up with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'compared with sth', ARRAY['look forward to sth', 'every day', 'in space'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'compared with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'concentrate on sth', ARRAY['act as sth', 'the 20th century', 'a kind of...'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'concentrate on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'concerned about sth', ARRAY['be allowed to do sth', 'health problems', 'i don''t care'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'concerned about sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'concerned with sth', ARRAY['in my opinion', 'go into sth', 'prove to be sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'concerned with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'confidence in sb/sth', ARRAY['in the street', 'have fun', 'look like sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'confidence in sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'connected to sth', ARRAY['at home', 'the case', 'be reported to be sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'connected to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'connected with sb/sth', ARRAY['relevant to sb/sth', 'sit down', 'out there'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'connected with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'consist of sb/sth', ARRAY['no doubt', 'as far as i am concerned', 'at the end of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'consist of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'consistent with sth', ARRAY['take up sth', 'x years old', 'sort of sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'consistent with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'contribute to sth', ARRAY['run out', 'on top of sth/sb', 'at first'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'contribute to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'control over sb/sth', ARRAY['close to sb/sth', 'get rid of sb/sth', 'pay for sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'control over sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'cope with sth', ARRAY['work for sb/sth', 'in terms of sth', 'far away'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'cope with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: card', 'credit card', ARRAY['aim to do sth', 'related to sth/sb', 'end with sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'credit card' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'deal with sb', ARRAY['fed up', 'opposed to sth', 'in place'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'deal with sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'deal with sth', ARRAY['heart disease', 'associated with sth', 'in line with sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'deal with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'decide on sth', ARRAY['fall off', 'go down', 'focus on sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'decide on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'decline in sth', ARRAY['with the exception of sb/sth', 'at the time of sth', 'go on to do sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'decline in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'dedicated to sth', ARRAY['search for sth/sb', 'get married', 'on monday'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'dedicated to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'depend on sb/sth', ARRAY['check sb/sth out', 'for a while', 'get to know sb'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'depend on sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'depend on sth', ARRAY['not even', 'be to blame', 'good at sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'depend on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'dependent on sb/sth', ARRAY['in the event of sth', 'and so on', 'at the weekend'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'dependent on sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'depending on', ARRAY['in town', 'that day', 'thousands of…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'depending on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'deprive sb/sth of sth', ARRAY['solution to sth', 'over the course of…', 'sound like sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'deprive sb/sth of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: that…', 'despite the fact that…', ARRAY['as to', 'the important thing', 'at the top'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'despite the fact that…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: countries', 'developing countries', ARRAY['in front of', 'in time', 'hear about sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'developing countries' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: b', 'differences between a and b', ARRAY['as long as…', 'happy with sb/sth', 'go away'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'differences between a and b' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'difficult for sb', ARRAY['oh dear', 'work hard', 'heart disease'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'difficult for sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'dispose of sb/sth', ARRAY['so far', 'phone call', 'in touch'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'dispose of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: well', 'do well', ARRAY['one day', 'tv show', 'be surrounded by sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'do well' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'draw attention to sb/sth', ARRAY['on the left', 'be attributed to sb', 'go into sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'draw attention to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'due to sb/sth', ARRAY['well known', 'over there', 'right now'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'due to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: one', 'each one', ARRAY['too long', 'in the end', 'in favour of sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'each one' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: other', 'each other', ARRAY['oh no!', 'in fact', 'as for sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'each other' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: growth', 'economic growth', ARRAY['in touch', 'regarded as sth', 'secondary school'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'economic growth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'end in sth', ARRAY['bear sb/sth in mind', 'have no idea', 'depending on'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'end in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'end up', ARRAY['potential for sth', 'look back at sth', 'over time'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'end up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'end with sth', ARRAY['ever since', 'again and again', 'quality of life'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'end with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'engage in sth', ARRAY['in conjunction with sb/sth', 'alternative to sth', 'secondary school'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'engage in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'engaged in sth', ARRAY['turn sth on', 'the best thing', 'may well'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'engaged in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: if', 'even if', ARRAY['why not…?', 'on the wall', 'little more than…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'even if' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: more…', 'even more…', ARRAY['at the time of sth', 'a long way', 'at the start of sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'even more…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: though', 'even though', ARRAY['on the beach', 'search engine', 'in the wake of sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'even though' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: since', 'ever since', ARRAY['dedicated to sth', 'as soon as possible', 'how much…?'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'ever since' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: day', 'every day', ARRAY['at the weekend', 'up to sb', 'at the beginning of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'every day' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: else', 'everyone else', ARRAY['consist of sb/sth', 'refer to sb/sth', 'way of life'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'everyone else' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: same', 'exactly the same', ARRAY['short of sth', 'everyone else', 'point of view'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'exactly the same' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: for', 'except for', ARRAY['high street', 'no problem', 'these days'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'except for' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: me', 'excuse me', ARRAY['look forward to sth', 'one or two', 'raise money'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'excuse me' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'experience in sth', ARRAY['look forward to sth', 'call for sth', 'look sth up'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'experience in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'exposure to sth', ARRAY['in the north', 'believe in sb/sth', 'mean to do sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'exposure to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'fail to do sth', ARRAY['developing countries', 'with the exception of sb/sth', 'up to sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'fail to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: asleep', 'fall asleep', ARRAY['think of sb/sth', 'depend on sb/sth', 'away from sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'fall asleep' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: love', 'fall in love', ARRAY['work on sth', 'exposure to sth', 'on board'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'fall in love' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: off', 'fall off', ARRAY['belong to sb', 'take sth/sb on', 'be expected to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'fall off' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: member', 'family member', ARRAY['be said to be sth', 'mental health', 'even though'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'family member' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: away', 'far away', ARRAY['in contrast', 'one another', 'bad news'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'far away' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'far from sth', ARRAY['as for sb/sth', 'all the way', 'may well'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'far from sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: more', 'far more', ARRAY['whether or not…', 'put sth forward', 'back and forth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'far more' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: too', 'far too', ARRAY['thanks to sb/sth', 'connected to sth', 'in summer'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'far too' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'fed up', ARRAY['be charged with sth', 'find out', 'get up'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'fed up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: good', 'feel good', ARRAY['a couple of sth', 'had better', 'because of'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'feel good' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'feel like sth', ARRAY['a kind of...', 'get to know sb', 'back and forth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'feel like sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'figure sb/sth out', ARRAY['work together', 'on the ground', 'respect for sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'figure sb/sth out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: in', 'fill sth in', ARRAY['make sth up', 'for long', 'in a way that…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'fill sth in' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'find it difficult to do sth', ARRAY['in particular', 'know how', 'in summer'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'find it difficult to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'find out', ARRAY['health problems', 'a little', 'after all'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'find out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'find yourself doing sth', ARRAY['rise in sth', 'human being', 'get up'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'find yourself doing sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: all', 'first of all', ARRAY['a number of sth', 'engage in sth', 'in school'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'first of all' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'focus on sb/sth', ARRAY['too bad', 'for that matter', 'turn sth up'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'focus on sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'follow sth up', ARRAY['break up', 'take up sth', 'carry on'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'follow sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'followed by sb/sth', ARRAY['little more than…', 'thanks to sb/sth', 'get in'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'followed by sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'for a long time', ARRAY['up against sth', 'a lot of sth', 'all over the world'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'for a long time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: moment', 'for a moment', ARRAY['exposure to sth', 'followed by sb/sth', 'important for sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'for a moment' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: while', 'for a while', ARRAY['be charged with sth', 'too long', 'with respect to sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'for a while' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: example', 'for example', ARRAY['get away with sth', 'put sth forward', 'police officer'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'for example' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: free', 'for free', ARRAY['at least', 'mental health', 'all the way'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'for free' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: instance', 'for instance', ARRAY['i think so', 'on the wall', 'again and again'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'for instance' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: life', 'for life', ARRAY['by now', 'control over sb/sth', 'on the other side'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'for life' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: long', 'for long', ARRAY['put sth together', 'what about…?', 'work with sb'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'for long' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: lunch', 'for lunch', ARRAY['no more than…', 'ask for sth', 'all over the world'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'for lunch' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: years', 'for many years', ARRAY['on the phone', 'far from sth', 'economic growth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'for many years' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'for some time', ARRAY['in touch', 'over time', 'next year'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'for some time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: matter', 'for that matter', ARRAY['in the middle', 'dependent on sb/sth', 'for the benefit of sb'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'for that matter' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'for the benefit of sb', ARRAY['in some cases', 'followed by sb/sth', 'feel good'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'for the benefit of sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'for the first time', ARRAY['difficult for sb', 'on the internet', 'on the street'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'for the first time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'for the rest of sth', ARRAY['alternative to sth', 'ranging from', 'run out of sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'for the rest of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'for the sake of sb/sth', ARRAY['fed up', 'next year', 'wrong with sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'for the sake of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: reason', 'for this reason', ARRAY['on the floor', 'in april', 'developing countries'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'for this reason' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'get away with sth', ARRAY['little more than…', 'search engine', 'on the beach'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'get away with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: back', 'get back', ARRAY['be said to be sth', 'go down sth', 'take up sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get back' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: better', 'get better', ARRAY['likely to do sth', 'mobile phone', 'run out'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get better' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: home', 'get home', ARRAY['in some cases', 'regarded as sth', 'make sth up'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'get home' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: in', 'get in', ARRAY['look back at sth', 'sort sb/sth/yourself out', 'turn sth up'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'get in' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: married', 'get married', ARRAY['on a regular basis', 'quite a…', 'in favour of sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'get married' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: off', 'get off', ARRAY['have you ever…?', 'mean to do sth', 'short of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'get off' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'get on', ARRAY['a long time ago', 'in response to sth', 'feel like sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'get on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'get on with sb', ARRAY['begin with sth', 'alternative to sth', 'this is…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'get on with sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'get out', ARRAY['mobile phone', 'on a regular basis', 'turn into sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'get over sb/sth', ARRAY['get married', 'x years ago', 'pretty much'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'get over sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'get rid of sb/sth', ARRAY['regarded as sth', 'put it', 'as such'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'get rid of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: there', 'get there', ARRAY['in favour of sb/sth', 'once a…', 'in full'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'get there' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'get to know sb', ARRAY['on the other side', 'post office', 'again and again'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'get to know sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: to…', 'get to…', ARRAY['on the internet', 'depending on', 'excuse me'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'get to…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'get up', ARRAY['fill sth in', 'or two', 'bad thing'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'get up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'get used to sth', ARRAY['quite a…', 'end with sth', 'pretty good'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'get used to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'give sth up', ARRAY['turn sth up', 'go away', 'in april'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'give sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'give up', ARRAY['sort sb/sth/yourself out', 'in the past', 'raise money'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'give up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: that…', 'given that…', ARRAY['be found to do sth', 'the 20th century', 'because of'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'given that…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: warming', 'global warming', ARRAY['for a long time', 'something like…', 'next time'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'global warming' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ahead', 'go ahead', ARRAY['take sth into account', 'that is', 'a number of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'go ahead' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: and…', 'go and…', ARRAY['mean to do sth', 'point out', 'on the wall'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'go and…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: away', 'go away', ARRAY['half an hour', 'consistent with sth', 'thank you'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'go away' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: back', 'go back', ARRAY['so that…', 'car park', 'for example'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go back' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: down', 'go down', ARRAY['global warming', 'in this case', 'at school'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'go down' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'go down sth', ARRAY['or so', 'for the sake of sb/sth', 'good thing'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'go down sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'go for sth', ARRAY['in class', 'involvement in sth', 'come from…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'go for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'go into sth', ARRAY['with the exception of sb/sth', 'out there', 'so that…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go into sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: off', 'go off', ARRAY['on television', 'come true', 'at the weekend'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'go off' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'go on to do sth', ARRAY['confidence in sb/sth', 'point out', 'mean to do sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'go on to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'go out', ARRAY['all the way', 'sum up', 'at the end of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'go through sth', ARRAY['see you', 'deal with sb', 'ordinary people'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'go through sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: bed', 'go to bed', ARRAY['except for', 'care about sth', 'pretty good'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go to bed' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'go up', ARRAY['because of', 'phone call', 'look like sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'go up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: wrong', 'go wrong', ARRAY['have nothing to do with sb/sth', 'arrive at…', 'except for'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'go wrong' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'good at sth', ARRAY['in time', 'by the time (that)…', 'one or two'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good at sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'good for sb/sth', ARRAY['in the middle', 'guess what…', 'in connection with sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: luck', 'good luck', ARRAY['nothing but', 'in front of', 'wake up'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'good luck' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: news', 'good news', ARRAY['engaged in sth', 'post office', 'as far as sb/sth is concerned'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good news' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: thing', 'good thing', ARRAY['good news', 'how about…?', 'in spite of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good thing' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'grow up', ARRAY['likely to do sth', 'in terms of sth', 'on the street'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'grow up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'growth in sth', ARRAY['belong to sb', 'a little', 'how much…?'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'growth in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: what…', 'guess what…', ARRAY['get off', 'in the street', 'one day'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'guess what…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: better', 'had better', ARRAY['based on sth', 'too long', 'be entitled to sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'had better' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: hour', 'half an hour', ARRAY['contribute to sth', 'someone else', 'get to know sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'half an hour' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'hang on', ARRAY['set to do sth', 'by the end of sth', 'search for sth/sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'hang on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'happen to sb/sth', ARRAY['far away', 'to do with sb/sth', 'as well'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'happen to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'happy with sb/sth', ARRAY['awareness of sth', 'know how', 'so as to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'happy with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: look', 'have a look', ARRAY['and so on', 'prior to', 'point out'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'have a look' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fun', 'have fun', ARRAY['first of all', 'by the end of sth', 'in hospital'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have fun' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: got', 'have got', ARRAY['move on', 'find it difficult to do sth', 'find out'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have got' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: to', 'have got to', ARRAY['someone else', 'concerned about sth', 'result in sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'have got to' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: idea', 'have no idea', ARRAY['cell phone', 'turn sth on', 'a bit of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'have no idea' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'have nothing to do with sb/sth', ARRAY['take place', 'once again', 'point of view'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'have nothing to do with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: mind', 'have sb/sth in mind', ARRAY['the best thing', 'go back', 'set out'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'have sb/sth in mind' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: common', 'have sth in common', ARRAY['deprive sb/sth of sth', 'what about…?', 'difficult for sb'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'have sth in common' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'have time', ARRAY['choose to do sth', 'in charge of sb/sth', 'look back at sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ever…?', 'have you ever…?', ARRAY['in such a way (that)…', 'town centre', 'car park'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'have you ever…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: she', 'he or she', ARRAY['manage to do sth', 'in a position to do sth', 'in business'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'he or she' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: problems', 'health problems', ARRAY['someone else', 'take sth/sb on', 'investment in sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'health problems' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'hear about sb/sth', ARRAY['prior to', 'by the time (that)…', 'over time'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'hear about sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'hear of sb/sth', ARRAY['far from sth', 'respect for sb/sth', 'in other words'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'hear of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: disease', 'heart disease', ARRAY['developing countries', 'contribute to sth', 'pretty much'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'heart disease' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: school', 'high school', ARRAY['at the moment', 'click on sth', 'prime minister'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'high school' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: street', 'high street', ARRAY['wait for sb/sth', 'look for sb/sth', 'a good idea'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'high street' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: education', 'higher education', ARRAY['at the expense of sb/sth', 'even more…', 'after all'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'higher education' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: her', 'his or her', ARRAY['by the end of sth', 'take place', 'no problem'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'his or her' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: about…?', 'how about…?', ARRAY['come up with sth', 'in action', 'car park'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'how about…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: you?', 'how are you?', ARRAY['learn how to do sth', 'end with sth', 'oh no!'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'how are you?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: long…?', 'how long…?', ARRAY['i would say…', 'with regard to sb/sth', 'look like sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'how long…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: many…?', 'how many…?', ARRAY['a couple of sth', 'decide on sth', 'in contrast'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'how many…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: much…?', 'how much…?', ARRAY['over there', 'in this case', 'take place'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'how much…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: often…?', 'how often…?', ARRAY['he or she', 'oh well', 'the vast majority of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'how often…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: being', 'human being', ARRAY['get back', 'make sth up', 'there is'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'human being' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: rights', 'human rights', ARRAY['try and…', 'had better', 'turn out'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'human rights' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: care', 'i don''t care', ARRAY['above all', 'connected with sb/sth', 'on the floor'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'i don''t care' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: guess', 'i guess', ARRAY['far more', 'you''re welcome', 'have you ever…?'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'i guess' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: say…', 'i have to say…', ARRAY['as far as sb/sth is concerned', 'at the top', 'on board'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'i have to say…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: mean', 'i mean', ARRAY['all the more', 'loads of sb/sth', 'quite a lot'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'i mean' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: so', 'i think so', ARRAY['no longer', 'so as to do sth', 'be going to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'i think so' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: if…', 'i wonder if…', ARRAY['on the street', 'tell the truth', 'pretty good'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'i wonder if…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: say…', 'i would say…', ARRAY['this kind of…', 'reaction to sth', 'be attributed to sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'i would say…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: afraid…', 'i''m afraid…', ARRAY['developing countries', 'take advantage of sb/sth', 'the case'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'i''m afraid…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sorry', 'i''m sorry', ARRAY['to do with sb/sth', 'it takes …', 'on television'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'i''m sorry' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: you', 'if i were you', ARRAY['prime minister', 'at the time', 'back sb/sth up'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'if i were you' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: necessary', 'if necessary', ARRAY['be charged with sth', 'on the other hand', 'find out'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'if necessary' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: only…', 'if only…', ARRAY['regarded as sth', 'in charge of sb/sth', 'good for sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'if only…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: to', 'if you want to', ARRAY['have sth in common', 'aim to do sth', 'quality of life'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'if you want to' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'important for sb/sth', ARRAY['apply for sth', 'spend time', 'be supposed to do sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'important for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in a position to do sth', ARRAY['for the first time', 'stay in', 'in the morning'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in a position to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: that…', 'in a way that…', ARRAY['take up sth', 'at this stage', 'in spite of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in a way that…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in accordance with sth', ARRAY['pick sb/sth up', 'old friend', 'be known as sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in accordance with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: action', 'in action', ARRAY['fall asleep', 'look sth up', 'be to blame'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in action' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: addition', 'in addition', ARRAY['climate change', 'on the beach', 'the case'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in addition' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: advance', 'in advance', ARRAY['consistent with sth', 'mobile phone', 'take over'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in advance' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in an attempt to do sth', ARRAY['in class', 'as far as i am concerned', 'come into sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in an attempt to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: case', 'in any case', ARRAY['be going on', 'health problems', 'bring sb up'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in any case' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: april', 'in april', ARRAY['on time', 'set sth up', 'aimed at doing sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in april' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: bed', 'in bed', ARRAY['in the form of sb/sth', 'stand up', 'get up'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in bed' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: business', 'in business', ARRAY['as soon as', 'tv show', 'as of…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in business' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: case…', 'in case…', ARRAY['in the same way', 'dependent on sb/sth', 'a great deal'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in case…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in charge of sb/sth', ARRAY['the best thing', 'even though', 'pretty good'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in charge of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: class', 'in class', ARRAY['all about…', 'art gallery', 'bear sb/sth in mind'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in class' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in conjunction with sb/sth', ARRAY['exactly the same', 'up against sth', 'town centre'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in conjunction with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in connection with sb/sth', ARRAY['thousands of…', 'tend to do sth', 'phone number'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in connection with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: contrast', 'in contrast', ARRAY['sum up', 'thanks to sb/sth', 'make sth up'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in contrast' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: danger', 'in danger', ARRAY['likely to do sth', 'because of', 'not only'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in danger' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: effect', 'in effect', ARRAY['for instance', 'to do with sb/sth', 'confidence in sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in effect' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fact', 'in fact', ARRAY['have no idea', 'get married', 'less than…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in fact' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in favour of sb/sth', ARRAY['this is…', 'in the hands of sb', 'be meant to do sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in favour of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of', 'in front of', ARRAY['at the start of sth', 'bound to do sth', 'feel like sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in front of' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: full', 'in full', ARRAY['so far', 'get away with sth', 'add to sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in full' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: general', 'in general', ARRAY['all about…', 'find yourself doing sth', 'all over the world'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in general' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: history', 'in history', ARRAY['that''s it', 'to do with sb/sth', 'as part of sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in history' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: hospital', 'in hospital', ARRAY['be derived from sth', 'break up', 'instead of'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in hospital' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in line with sth', ARRAY['live with sb', 'concerned about sth', 'no doubt'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in line with sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: love', 'in love', ARRAY['as a whole', 'back and forth', 'good news'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in love' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: opinion', 'in my opinion', ARRAY['come into sth', 'check in', 'more and more'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in my opinion' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in order of sth', ARRAY['in terms of sth', 'this morning', 'x times a…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in order of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in order to do sth', ARRAY['concerned with sth', 'respond to sth/sb', 'as a whole'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in order to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: words', 'in other words', ARRAY['for some time', 'if necessary', 'in the street'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in other words' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: part', 'in part', ARRAY['thanks to sb/sth', 'town centre', 'run out of sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in part' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: particular', 'in particular', ARRAY['the rest of sth', 'a bit of sth', 'in practice'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in particular' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: place', 'in place', ARRAY['in the midst of sth', 'end up', 'can''t afford sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in place' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: practice', 'in practice', ARRAY['no more than…', 'a means of sth', 'at the beginning of sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in practice' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: prison', 'in prison', ARRAY['cope with sth', 'as to', 'x hours a day'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in prison' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: public', 'in public', ARRAY['in respect of sth', 'be to blame', 'look like sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in public' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: years', 'in recent years', ARRAY['seek to do sth', 'go down', 'on the ground'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in recent years' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in relation to sb/sth', ARRAY['the best thing', 'in the wake of sb/sth', 'difficult for sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in relation to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in respect of sth', ARRAY['no more than…', 'in the middle', 'anything else'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in respect of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in response to sth', ARRAY['deal with sb', 'have fun', 'phone call'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in response to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: school', 'in school', ARRAY['in town', 'sort of sth', 'experience in sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in school' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: cases', 'in some cases', ARRAY['come from…', 'in turn', 'talk about sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in some cases' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: space', 'in space', ARRAY['if i were you', 'over time', 'work with sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in space' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in spite of sth', ARRAY['last year', 'go down', 'as a result'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in spite of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: (that)…', 'in such a way (that)…', ARRAY['nothing like', 'at risk', 'for a moment'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in such a way (that)…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: summer', 'in summer', ARRAY['of course', 'in this case', 'grow up'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in summer' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in terms of sth', ARRAY['at the time of sth', 'all about…', 'connected to sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in terms of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in the absence of sb/sth', ARRAY['come true', 'so far', 'be made up of sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the absence of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: air', 'in the air', ARRAY['be surrounded by sb/sth', 'this is…', 'credit card'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in the air' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in the case of sth', ARRAY['bear sb/sth in mind', 'his or her', 'first of all'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in the case of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: centre', 'in the centre', ARRAY['connected with sb/sth', 'as soon as possible', 'with the exception of sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the centre' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: country', 'in the country', ARRAY['would like', 'go on to do sth', 'attached to sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the country' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'in the course of…', ARRAY['how are you?', 'on the internet', 'experience in sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the course of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: end', 'in the end', ARRAY['other than', 'the next day', 'x hours a day'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in the end' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in the event of sth', ARRAY['health problems', 'a bit of sth', 'after all'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the event of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in the face of sth', ARRAY['put sth together', 'fed up', 'go up'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the face of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: place', 'in the first place', ARRAY['in summer', 'it takes …', 'away from sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in the first place' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in the form of sb/sth', ARRAY['slow down', 'for the rest of sth', 'be going on'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in the form of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: future', 'in the future', ARRAY['check in', 'in the country', 'account for sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the future' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'in the hands of sb', ARRAY['fed up', 'in april', 'in the meantime'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the hands of sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in the light of sth', ARRAY['that''s it', 'work with sb', 'those who…'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the light of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: meantime', 'in the meantime', ARRAY['check out', 'be meant to do sth', 'take sth up'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the meantime' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: middle', 'in the middle', ARRAY['happen to sb/sth', 'experience in sth', 'take sth off'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in the middle' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'in the midst of sth', ARRAY['concerned with sth', 'in line with sth', 'in the same way'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the midst of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: morning', 'in the morning', ARRAY['go out', 'wrong with sb/sth', 'in the first place'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the morning' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: future', 'in the near future', ARRAY['set sth up', 'as much as', 'get rid of sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in the near future' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: north', 'in the north', ARRAY['look for sb/sth', 'be known as sb/sth', 'regarded as sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the north' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: past', 'in the past', ARRAY['in history', 'come up with sth', 'i''m sorry'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the past' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'in the presence of sb', ARRAY['role model', 'really enjoy', 'bring sb up'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the presence of sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: way', 'in the same way', ARRAY['bring sth about', 'in the summer', 'those who…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in the same way' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: street', 'in the street', ARRAY['go out', 'in the north', 'on board'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the street' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: summer', 'in the summer', ARRAY['participate in sth', 'point of view', 'at this point'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in the summer' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'in the wake of sb/sth', ARRAY['rely on sb/sth', 'for life', 'away from sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'in the wake of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: (that)…', 'in the way (that)…', ARRAY['fed up', 'a lot', 'as well'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in the way (that)…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: case', 'in this case', ARRAY['half an hour', 'excuse me', 'go out'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in this case' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: way', 'in this way', ARRAY['depend on sth', 'nothing like', 'work on sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'in this way' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'in time', ARRAY['quite a…', 'away from sb/sth', 'a couple of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: touch', 'in touch', ARRAY['come on!', 'agree with sb', 'hear of sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'in touch' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: town', 'in town', ARRAY['raise money', 'in fact', 'lots of…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'in town' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: turn', 'in turn', ARRAY['higher education', 'for the rest of sth', 'work together'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'in turn' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of', 'instead of', ARRAY['guess what…', 'may well', 'as of…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'instead of' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'investment in sth', ARRAY['it depends', 'a kind of...', 'report on sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'investment in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'involvement in sth', ARRAY['live on sth', 'i would say…', 'in hospital'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'involvement in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: depends', 'it depends', ARRAY['get home', 'go for sth', 'on top of sth/sb'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'it depends' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'it is important to do sth', ARRAY['based on sth', 'good luck', 'get over sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'it is important to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: …', 'it takes …', ARRAY['set out', 'belong to sth', 'back and forth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'it takes …' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'kind of sb/sth', ARRAY['a long time ago', 'above all', 'take off'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'kind of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: how', 'know how', ARRAY['in town', 'next year', 'over time'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'know how' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'last time', ARRAY['set sth up', 'put sth up', 'above all'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'last time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: year', 'last year', ARRAY['really like', 'in class', 'hear of sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'last year' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'lead to sth', ARRAY['involvement in sth', 'based on sth', 'for the sake of sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'lead to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'learn how to do sth', ARRAY['raise money', 'be supposed to do sth', 'mobile phone'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'learn how to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'leave sb/sth out', ARRAY['work together', 'at once', 'in the course of…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'leave sb/sth out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: than…', 'less than…', ARRAY['high street', 'would like', 'pick sb/sth up'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'less than…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: alone', 'let alone', ARRAY['oh yes', 'go out', 'at school'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'let alone' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: know', 'let me know', ARRAY['up and down', 'far more', 'begin with sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'let me know' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: me…', 'let me…', ARRAY['at the time of sth', 'in advance', 'the case'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'let me…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'likely to do sth', ARRAY['in hospital', 'for the rest of sth', 'it takes …'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'likely to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'listen to sb/sth', ARRAY['fall in love', 'because of', 'as opposed to'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'listen to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: than…', 'little more than…', ARRAY['at the hands of sb', 'a range of sth', 'car park'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'little more than…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'live on sth', ARRAY['choose to do sth', 'exposure to sth', 'participate in sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'live on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'live with sb', ARRAY['back sb/sth up', 'of course', 'work on sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'live with sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: room', 'living room', ARRAY['in the hands of sb', 'add to sth', 'for the sake of sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'living room' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'loads of sb/sth', ARRAY['wake up', 'as soon as', 'at the end of sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'loads of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth/yourself', 'look after sb/sth/yourself', ARRAY['be supposed to do sth', 'bound to do sth', 'check sb/sth out'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'look after sb/sth/yourself' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'look at sb/sth', ARRAY['happen to sb/sth', 'set sth up', 'get used to sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'look at sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'look back at sth', ARRAY['for some time', 'a number of sth', 'quality of life'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'look back at sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'look for sb/sth', ARRAY['not only', 'in other words', 'at the same time'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'look for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'look forward to sth', ARRAY['sit down', 'living room', 'there is'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'look forward to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'look like sb/sth', ARRAY['apart from', 'for some time', 'report on sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'look like sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'look out', ARRAY['bring sth up', 'work sth out', 'wake up'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'look out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'look sth up', ARRAY['choose to do sth', 'in prison', 'the following…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'look sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'lots of…', ARRAY['turn sth up', 'once a…', 'by the time (that)…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'lots of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: difference', 'make a difference', ARRAY['on the internet', 'for example', 'work out'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make a difference' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sense', 'make sense', ARRAY['go down', 'go for sth', 'all over the world'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make sense' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'make sth up', ARRAY['get there', 'in response to sth', 'think about sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sure', 'make sure', ARRAY['as if…', 'put sth up', 'would love to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make sure' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'manage to do sth', ARRAY['on board', 'concerned about sth', 'at the end'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'manage to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: well', 'may well', ARRAY['be about to do sth', 'be entitled to sth', 'work out'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'may well' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'mean to do sth', ARRAY['for this reason', 'control over sb/sth', 'and so on'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'mean to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: health', 'mental health', ARRAY['not only', 'i''m sorry', 'human being'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'mental health' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'millions of…', ARRAY['get used to sth', 'welcome to sth', 'would love to do sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'millions of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: phone', 'mobile phone', ARRAY['role model', 'as a whole', 'even though'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'mobile phone' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: more', 'more and more', ARRAY['by no means', 'high street', 'half an hour'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'more and more' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: less', 'more or less', ARRAY['you see', 'on earth', 'mental health'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'more or less' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: than…', 'more than…', ARRAY['hang on', 'for the benefit of sb', 'all sorts of…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'more than…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'move on', ARRAY['compared with sth', 'the vast majority of sth', 'you see'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'move on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: better', 'much better', ARRAY['he or she', 'good at sth', 'in line with sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'much better' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'next time', ARRAY['global warming', 'work for sb/sth', 'excuse me'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'next time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: year', 'next year', ARRAY['belong to sb', 'have you ever…?', 'take off'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'next year' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: doubt', 'no doubt', ARRAY['in such a way (that)…', 'go down', 'in the end'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'no doubt' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: longer', 'no longer', ARRAY['with respect to sth', 'take part', 'a long way'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'no longer' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: matter…', 'no matter…', ARRAY['more than…', 'no more than…', 'growth in sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'no matter…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: than…', 'no more than…', ARRAY['have no idea', 'concerned about sth', 'on a regular basis'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'no more than…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: problem', 'no problem', ARRAY['dedicated to sth', 'in advance', 'at once'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'no problem' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: way', 'no way', ARRAY['get home', 'point of view', 'so that…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'no way' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: all', 'not at all', ARRAY['in history', 'oh dear', 'involvement in sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'not at all' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: even', 'not even', ARRAY['take place', 'close to sb/sth', 'rise in sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'not even' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: necessarily', 'not necessarily', ARRAY['in response to sth', 'find it difficult to do sth', 'turn sth off'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'not necessarily' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: only', 'not only', ARRAY['related to sth/sb', 'a lot of sth', 'act as sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'not only' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: mention', 'not to mention', ARRAY['other than', 'for that matter', 'had better'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'not to mention' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: but', 'nothing but', ARRAY['lots of…', 'at work', 'go to bed'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'nothing but' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: like', 'nothing like', ARRAY['the rest of sth', 'let me know', 'as soon as'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'nothing like' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: course', 'of course', ARRAY['raise money', 'x times a…', 'on the ground'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'of course' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: dear', 'oh dear', ARRAY['be known to do sth', 'sort sb/sth/yourself out', 'in the case of sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'oh dear' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: no!', 'oh no!', ARRAY['see you', 'in terms of sth', 'in the event of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'oh no!' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: well', 'oh well', ARRAY['check in', 'go to bed', 'really like'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'oh well' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: yes', 'oh yes', ARRAY['by the end of sth', 'in danger', 'far away'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'oh yes' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: friend', 'old friend', ARRAY['a lot more', 'because of', 'happy with sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'old friend' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: basis', 'on a regular basis', ARRAY['oh dear', 'be made up of sth', 'on television'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'on a regular basis' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'on behalf of sb', ARRAY['no more than…', 'high street', 'as long as…'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'on behalf of sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: board', 'on board', ARRAY['in line with sth', 'go ahead', 'fall off'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'on board' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: earth', 'on earth', ARRAY['go on to do sth', 'a little bit', 'you''re welcome'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'on earth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: holiday', 'on holiday', ARRAY['welcome to sth', 'a little more', 'on the left'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on holiday' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: monday', 'on monday', ARRAY['think of sb/sth', 'in fact', 'on the basis of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on monday' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: own', 'on my own', ARRAY['on behalf of sb', 'be going to do sth', 'short of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'on my own' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: television', 'on television', ARRAY['all kinds of…', 'no problem', 'work for sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on television' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'on the basis of sth', ARRAY['on the internet', 'a few', 'break up'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'on the basis of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: beach', 'on the beach', ARRAY['in favour of sb/sth', 'this kind of…', 'depend on sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on the beach' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: floor', 'on the floor', ARRAY['think about sb/sth', 'one day', 'these days'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on the floor' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ground', 'on the ground', ARRAY['hear of sb/sth', 'opposed to sth', 'look for sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'on the ground' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: internet', 'on the internet', ARRAY['even if', 'a range of sth', 'pick sb/sth up'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on the internet' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: left', 'on the left', ARRAY['all kinds of…', 'pretty much', 'point out'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on the left' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: hand', 'on the one hand', ARRAY['likely to do sth', 'rather than', 'no more than…'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'on the one hand' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: hand', 'on the other hand', ARRAY['this time', 'move on', 'out there'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'on the other hand' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: side', 'on the other side', ARRAY['welcome to sth', 'in the north', 'be expected to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'on the other side' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'on the part of sb', ARRAY['the rest of sth', 'a long time ago', 'far more'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'on the part of sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: phone', 'on the phone', ARRAY['excuse me', 'other than', 'on top of sth/sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on the phone' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: street', 'on the street', ARRAY['all the more', 'how many…?', 'control over sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'on the street' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: wall', 'on the wall', ARRAY['you see', 'how about…?', 'if necessary'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'on the wall' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: way', 'on the way', ARRAY['look out', 'at the time of sth', 'quite a…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'on the way' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'on time', ARRAY['this time', 'in the event of sth', 'heart disease'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'on time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth/sb', 'on top of sth/sb', ARRAY['deprive sb/sth of sth', 'with respect to sth', 'rather than'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'on top of sth/sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: tv', 'on tv', ARRAY['in the air', 'at this point', 'a good idea'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'on tv' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: a…', 'once a…', ARRAY['it is important to do sth', 'seek to do sth', 'in order of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'once a…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: again', 'once again', ARRAY['if necessary', 'get over sb/sth', 'prepared to do sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'once again' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: another', 'one another', ARRAY['back sb/sth up', 'to do with sb/sth', 'in the summer'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'one another' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: day', 'one day', ARRAY['i wonder if…', 'despite the fact that…', 'for life'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'one day' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: two', 'one or two', ARRAY['be said to be sth', 'in history', 'take part'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'one or two' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'opposed to sth', ARRAY['come into sth', 'wake up', 'that''s it'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'opposed to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: so', 'or so', ARRAY['i wonder if…', 'i think so', 'at some point'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'or so' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: something', 'or something', ARRAY['to date', 'a bit more', 'on tv'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'or something' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: two', 'or two', ARRAY['a variety of sth', 'all the way', 'in the street'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'or two' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: people', 'ordinary people', ARRAY['living room', 'on top of sth/sb', 'go into sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'ordinary people' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: than', 'other than', ARRAY['bring sb up', 'every day', 'respect for sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'other than' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: to', 'ought to', ARRAY['on the wall', 'take sth into account', 'at school'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'ought to' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'out of sth', ARRAY['fill sth in', 'begin with sth', 'if you want to'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'out of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: there', 'out there', ARRAY['prove to be sth', 'in favour of sb/sth', 'come on!'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'out there' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'over the course of…', ARRAY['be entitled to sth', 'along with sb/sth', 'in a position to do sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'over the course of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: years', 'over the years', ARRAY['in the face of sth', 'seek to do sth', 'for long'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'over the years' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: there', 'over there', ARRAY['at once', 'case study', 'leave sb/sth out'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'over there' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'over time', ARRAY['can''t afford sth', 'back sb/sth up', 'to date'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'over time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'participate in sth', ARRAY['at the weekend', 'depend on sb/sth', 'belong to sb'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'participate in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'pay for sth', ARRAY['developing countries', 'set sth up', 'live on sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'pay for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: hour', 'per hour', ARRAY['go up', 'living room', 'take off'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'per hour' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: call', 'phone call', ARRAY['in charge of sb/sth', 'in the north', 'if necessary'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'phone call' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: number', 'phone number', ARRAY['work with sb', 'role model', 'be to blame'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'phone number' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'pick sb/sth up', ARRAY['wait for sb/sth', 'at some point', 'fall asleep'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'pick sb/sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'plan for sth', ARRAY['on the street', 'that day', 'give up'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'plan for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'play with sb/sth', ARRAY['prove to be sth', 'mental health', 'control over sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'play with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: view', 'point of view', ARRAY['primary school', 'fall off', 'in school'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'point of view' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'point out', ARRAY['aim to do sth', 'see you', 'associated with sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'point out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: officer', 'police officer', ARRAY['come back', 'rather than', 'wrong with sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'police officer' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: station', 'police station', ARRAY['at home', 'pretty good', 'oh well'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'police station' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: office', 'post office', ARRAY['work for sb/sth', 'be going to do sth', 'be meant to do sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'post office' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'potential for sth', ARRAY['swimming pool', 'search for sth/sb', 'fed up'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'potential for sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'prepared to do sth', ARRAY['call for sth', 'that is', 'oh no!'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'prepared to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: good', 'pretty good', ARRAY['think about sb/sth', 'learn how to do sth', 'in effect'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'pretty good' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: much', 'pretty much', ARRAY['in relation to sb/sth', 'apply for sth', 'anything else'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'pretty much' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: school', 'primary school', ARRAY['have got to', 'lead to sth', 'opposed to sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'primary school' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: minister', 'prime minister', ARRAY['one day', 'find yourself doing sth', 'as follows…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'prime minister' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: to', 'prior to', ARRAY['at the top', 'prove to be sth', 'millions of…'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'prior to' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'prove to be sth', ARRAY['stick to sth', 'aimed at doing sth', 'on my own'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'prove to be sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: it', 'put it', ARRAY['next year', 'be surrounded by sb/sth', 'hear about sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'put it' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: forward', 'put sth forward', ARRAY['for lunch', 'in the wake of sb/sth', 'attached to sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'put sth forward' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'put sth on', ARRAY['at present', 'no problem', 'in this case'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'put sth on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: together', 'put sth together', ARRAY['up and down', 'right now', 'click on sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'put sth together' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'put sth up', ARRAY['associated with sth', 'above all', 'oh dear'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'put sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: life', 'quality of life', ARRAY['all but', 'a few', 'feel good'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'quality of life' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: lot', 'quite a lot', ARRAY['at work', 'search engine', 'primary school'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'quite a lot' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: a…', 'quite a…', ARRAY['such as', 'even more…', 'agree with sb'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'quite a…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: money', 'raise money', ARRAY['in the summer', 'phone number', 'take off'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'raise money' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: from', 'ranging from', ARRAY['what about…?', 'depend on sth', 'have no idea'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'ranging from' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: than', 'rather than', ARRAY['work on sth', 'as a whole', 'be meant to do sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'rather than' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'reaction to sth', ARRAY['go into sth', 'come from…', 'nothing but'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'reaction to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: enjoy', 'really enjoy', ARRAY['look back at sth', 'point of view', 'get in'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'really enjoy' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: good', 'really good', ARRAY['human being', 'look sth up', 'on a regular basis'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'really good' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: like', 'really like', ARRAY['benefit from sth', 'run out of sth', 'get back'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'really like' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: why', 'reasons why', ARRAY['no more than…', 'concerned about sth', 'ordinary people'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'reasons why' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'refer to sb/sth', ARRAY['even though', 'tend to do sth', 'decline in sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'refer to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'regarded as sth', ARRAY['out of sth', 'be reported to be sth', 'for the benefit of sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'regarded as sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth/sb', 'relate to sth/sb', ARRAY['in april', 'a good idea', 'in this case'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'relate to sth/sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth/sb', 'related to sth/sb', ARRAY['in hospital', 'if only…', 'i have to say…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'related to sth/sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'relevant to sb/sth', ARRAY['in place', 'in my opinion', 'live with sb'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'relevant to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'rely on sb/sth', ARRAY['higher education', 'look out', 'in danger'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'rely on sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'report on sth', ARRAY['relevant to sb/sth', 'stay in', 'in an attempt to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'report on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'respect for sb/sth', ARRAY['first of all', 'at risk', 'in turn'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'respect for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth/sb', 'respond to sth/sb', ARRAY['regarded as sth', 'in fact', 'take sth/sb on'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'respond to sth/sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'result in sth', ARRAY['at the end', 'sit down', 'let me…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'result in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: now', 'right now', ARRAY['apart from', 'prime minister', 'such as'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'right now' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'rise in sth', ARRAY['lots of…', 'how many…?', 'because of'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'rise in sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: model', 'role model', ARRAY['bring sb up', 'manage to do sth', 'come from…'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'role model' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'run out', ARRAY['bring sth up', 'back and forth', 'next time'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'run out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'run out of sth', ARRAY['far too', 'take care of sb/sth/yourself', 'the vast majority of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'run out of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: fiction', 'science fiction', ARRAY['raise money', 'work together', 'call on sb'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'science fiction' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: engine', 'search engine', ARRAY['up against sth', 'in a position to do sth', 'think about sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'search engine' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth/sb', 'search for sth/sb', ARRAY['happy with sb/sth', 'wake up', 'let alone'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'search for sth/sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: school', 'secondary school', ARRAY['in case…', 'lead to sth', 'as well'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'secondary school' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: you', 'see you', ARRAY['arrive at…', 'account for sth', 'take up sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'see you' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'seek to do sth', ARRAY['compared with sth', 'mean to do sth', 'with the exception of sb/sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'seek to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'set out', ARRAY['know how', 'access to sth', 'report on sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'set out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'set sth up', ARRAY['good news', 'not only', 'carry sth out'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'set sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'set to do sth', ARRAY['would like', 'way of life', 'well known'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'set to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'short of sth', ARRAY['around the world', 'a couple of sth', 'next year'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'short of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: down', 'sit down', ARRAY['no longer', 'so that…', 'follow sth up'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'sit down' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: down', 'slow down', ARRAY['bring sth about', 'back and forth', 'how are you?'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'slow down' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'so as to do sth', ARRAY['much better', 'i think so', 'x times a…'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'so as to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: far', 'so far', ARRAY['a long way', 'at the age of…', 'in particular'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'so far' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: that…', 'so that…', ARRAY['some kind of…', 'a number of sth', 'these days'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'so that…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'solution to sth', ARRAY['at first', 'grow up', 'one or two'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'solution to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'some kind of…', ARRAY['each other', 'good luck', 'in the future'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'some kind of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: else', 'someone else', ARRAY['a bit of a…', 'add to sth', 'all about…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'someone else' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: like…', 'something like…', ARRAY['get back', 'figure sb/sth out', 'last time'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'something like…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'sort of sth', ARRAY['oh no!', 'in the air', 'a good idea'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'sort of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'sort sb/sth/yourself out', ARRAY['the first thing', 'get on with sb', 'first of all'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'sort sb/sth/yourself out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'sound like sb/sth', ARRAY['compared with sth', 'account for sth', 'good thing'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'sound like sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'speak to sb', ARRAY['away from sb/sth', 'move on', 'a lot'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'speak to sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'spend time', ARRAY['turn sth up', 'ordinary people', 'in the event of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'spend time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'stand up', ARRAY['go to bed', 'even though', 'for many years'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'stand up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'start with sb/sth', ARRAY['take advantage of sb/sth', 'wrong with sb/sth', 'mental health'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'start with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: in', 'stay in', ARRAY['really like', 'for the sake of sb/sth', 'agree with sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'stay in' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'stick to sth', ARRAY['rely on sb/sth', 'in hospital', 'each one'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'stick to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'subject to sth', ARRAY['put sth forward', 'such as', 'in the same way'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'subject to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'succeed in doing sth', ARRAY['phone call', 'growth in sth', 'last year'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'succeed in doing sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: a/an…', 'such a/an…', ARRAY['turn out', 'in favour of sb/sth', 'on the wall'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'such a/an…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: as', 'such as', ARRAY['or two', 'up to sb', 'on television'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'such as' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'suffer from sth', ARRAY['go into sth', 'come up with sth', 'at last'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'suffer from sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'sum up', ARRAY['work as sth', 'at the time of sth', 'someone else'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'sum up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'sure to do sth', ARRAY['x hours a day', 'on television', 'good thing'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'sure to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: pool', 'swimming pool', ARRAY['all about…', 'bad for sb/sth', 'in the midst of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'swimming pool' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'take advantage of sb/sth', ARRAY['belong to sth', 'go for sth', 'bad news'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'take advantage of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth/yourself', 'take care of sb/sth/yourself', ARRAY['and so on', 'at least', 'in line with sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take care of sb/sth/yourself' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: off', 'take off', ARRAY['good thing', 'check out', 'when it comes to sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take off' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: over', 'take over', ARRAY['as such', 'a long way', 'wrong with sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'take over' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: part', 'take part', ARRAY['far too', 'let me…', 'when it comes to sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take part' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: place', 'take place', ARRAY['something like…', 'despite the fact that…', 'sound like sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take place' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: account', 'take sth into account', ARRAY['call on sb', 'get used to sth', 'on monday'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'take sth into account' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: off', 'take sth off', ARRAY['so that…', 'be going on', 'happen to sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take sth off' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'take sth up', ARRAY['go off', 'get away with sth', 'in business'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'take sth/sb on', ARRAY['fall in love', 'a bit of a…', 'move on'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take sth/sb on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'take up sth', ARRAY['i would say…', 'run out', 'dispose of sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take up sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'talk about sb/sth', ARRAY['turn sth on', 'in the absence of sb/sth', 'get on'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'talk about sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: truth', 'tell the truth', ARRAY['in town', 'in full', 'involvement in sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'tell the truth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'tend to do sth', ARRAY['appeal to sb', 'first of all', 'take sth/sb on'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'tend to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: you', 'thank you', ARRAY['find out', 'in such a way (that)…', 'quite a lot'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'thank you' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'thanks to sb/sth', ARRAY['loads of sb/sth', 'as much as', 'in terms of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'thanks to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: day', 'that day', ARRAY['far away', 'too long', 'a bit of sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'that day' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: is', 'that is', ARRAY['get used to sth', 'growth in sth', 'listen to sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'that is' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: it', 'that''s it', ARRAY['be supposed to do sth', 'as follows…', 'everyone else'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'that''s it' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: century', 'the 20th century', ARRAY['not even', 'in some cases', 'in the summer'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'the 20th century' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: thing', 'the best thing', ARRAY['on holiday', 'those who…', 'up and down'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'the best thing' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: case', 'the case', ARRAY['in the north', 'take sth into account', 'on monday'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'the case' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: which…', 'the extent to which…', ARRAY['on the internet', 'deal with sb', 'turn sth on'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'the extent to which…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: that…', 'the fact that…', ARRAY['in accordance with sth', 'on the beach', 'short of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'the fact that…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: thing', 'the first thing', ARRAY['deprive sb/sth of sth', 'fail to do sth', 'both sides'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'the first thing' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: following…', 'the following…', ARRAY['fall asleep', 'oh dear', 'talk about sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'the following…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: thing', 'the important thing', ARRAY['in the air', 'swimming pool', 'that is'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'the important thing' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: day', 'the next day', ARRAY['take over', 'take sth/sb on', 'have sth in common'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'the next day' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'the other side of sth', ARRAY['each one', 'look back at sth', 'deal with sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'the other side of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'the rest of sth', ARRAY['on the street', 'have got', 'if only…'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'the rest of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'the vast majority of sth', ARRAY['throw sth away', 'even more…', 'in the wake of sb/sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'the vast majority of sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: is', 'there is', ARRAY['excuse me', 'move on', 'human rights'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'there is' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: days', 'these days', ARRAY['have a look', 'at times', 'look after sb/sth/yourself'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'these days' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: say…', 'they say…', ARRAY['in response to sth', 'on the street', 'in the summer'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'they say…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'think about sb/sth', ARRAY['at the end', 'look after sb/sth/yourself', 'credit card'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'think about sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'think of sb/sth', ARRAY['experience in sth', 'other than', 'in the absence of sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'think of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: is…', 'this is…', ARRAY['with the exception of sb/sth', 'get in', 'have got'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'this is…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'this kind of…', ARRAY['ordinary people', 'succeed in doing sth', 'agree with sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'this kind of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: morning', 'this morning', ARRAY['regarded as sth', 'to date', 'such as'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'this morning' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: time', 'this time', ARRAY['be derived from sth', 'as opposed to', 'ranging from'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'this time' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: year', 'this year', ARRAY['higher education', 'wait for sb/sth', 'add to sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'this year' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: who…', 'those who…', ARRAY['work with sb', 'check sb/sth out', 'a lot of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'those who…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: of…', 'thousands of…', ARRAY['in addition', 'with respect to sth', 'if you want to'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'thousands of…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: away', 'throw sth away', ARRAY['over time', 'carry on', 'together with'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'throw sth away' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: date', 'to date', ARRAY['good news', 'as far as i am concerned', 'able to do sth'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'to date' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'to do with sb/sth', ARRAY['rather than', 'seek to do sth', 'human rights'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'to do with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: with', 'together with', ARRAY['in a position to do sth', 'on the other hand', 'living room'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'together with' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: bad', 'too bad', ARRAY['put sth forward', 'lots of…', 'if only…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'too bad' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: long', 'too long', ARRAY['exposure to sth', 'as well', 'the first thing'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'too long' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: much', 'too much', ARRAY['move on', 'all over…', 'in bed'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'too much' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: centre', 'town centre', ARRAY['related to sth/sb', 'for some time', 'something like…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'town centre' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: and…', 'try and…', ARRAY['associated with sth', 'set to do sth', 'depending on'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'try and…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'turn into sth', ARRAY['aimed at sb', 'far too', 'deal with sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'turn into sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'turn out', ARRAY['less than…', 'all over the world', 'more than…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'turn out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: off', 'turn sth off', ARRAY['in the case of sth', 'decide on sth', 'get over sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'turn sth off' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: on', 'turn sth on', ARRAY['look like sb/sth', 'as of…', 'add to sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'turn sth on' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'turn sth up', ARRAY['on the phone', 'based on sth', 'per hour'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'turn sth up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: show', 'tv show', ARRAY['in public', 'point of view', 'confidence in sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'tv show' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'unable to do sth', ARRAY['alternative to sth', 'those who…', 'in the air'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'unable to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'up against sth', ARRAY['at the hands of sb', 'too long', 'more or less'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'up against sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: down', 'up and down', ARRAY['know how', 'let me know', 'half an hour'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'up and down' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'up to sb', ARRAY['let me…', 'differences between a and b', 'thank you'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'up to sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'up to sth', ARRAY['tend to do sth', 'in the midst of sth', 'this time'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'up to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'wait for sb/sth', ARRAY['let alone', 'point out', 'come across sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'wait for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: up', 'wake up', ARRAY['in the summer', 'in conjunction with sb/sth', 'have got to'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'wake up' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: life', 'way of life', ARRAY['in order of sth', 'oh yes', 'let me…'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'way of life' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'welcome to sth', ARRAY['one day', 'fall asleep', 'get on with sb'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'welcome to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: known', 'well known', ARRAY['for a long time', 'out of sth', 'concerned about sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'well known' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: about…?', 'what about…?', ARRAY['start with sb/sth', 'back sb/sth up', 'work as sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'what about…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'when it comes to sth', ARRAY['whether or not…', 'lots of…', 'this kind of…'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'when it comes to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: not…', 'whether or not…', ARRAY['x hours a day', 'would like', 'in the street'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'whether or not…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: not…?', 'why not…?', ARRAY['on the internet', 'a lot more', 'sure to do sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'why not…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'with regard to sb/sth', ARRAY['fall in love', 'a number of sth', 'ought to'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'with regard to sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'with respect to sth', ARRAY['look after sb/sth/yourself', 'work as sth', 'of course'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'with respect to sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'with the exception of sb/sth', ARRAY['higher education', 'as for sb/sth', 'on holiday'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'with the exception of sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'work as sth', ARRAY['the fact that…', 'would like', 'work on sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'work as sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'work for sb/sth', ARRAY['at the expense of sb/sth', 'sort sb/sth/yourself out', 'in the form of sb/sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'work for sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: hard', 'work hard', ARRAY['all day', 'be said to be sth', 'all but'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'work hard' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'work on sth', ARRAY['check out', 'at the weekend', 'a long way'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'work on sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'work out', ARRAY['depend on sb/sth', 'put it', 'with the exception of sb/sth'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'work out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: out', 'work sth out', ARRAY['on top of sth/sb', 'in connection with sb/sth', 'the other side of sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'work sth out' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: together', 'work together', ARRAY['given that…', 'mobile phone', 'on the one hand'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'work together' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb', 'work with sb', ARRAY['make sense', 'as soon as possible', 'go wrong'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'work with sb' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'worried about sb/sth', ARRAY['in any case', 'in this case', 'in effect'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'worried about sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: like', 'would like', ARRAY['in general', 'find yourself doing sth', 'or so'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'would like' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sth', 'would love to do sth', ARRAY['go to bed', 'for the sake of sb/sth', 'oh well'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'would love to do sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: rather…', 'would rather…', ARRAY['each one', 'be going to do sth', 'alternative to sth'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'would rather…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: like…?', 'would you like…?', ARRAY['investment in sth', 'exactly the same', 'at school'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'would you like…?' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: down', 'write sth down', ARRAY['be attributed to sb', 'in the light of sth', 'human rights'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'write sth down' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: sb/sth', 'wrong with sb/sth', ARRAY['global warming', 'get in', 'too much'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'wrong with sb/sth' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: day', 'x hours a day', ARRAY['together with', 'the 20th century', 'go down sth'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'x hours a day' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: a…', 'x times a…', ARRAY['take sth/sb on', 'end up', 'have no idea'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'x times a…' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: ago', 'x years ago', ARRAY['in favour of sb/sth', 'at last', 'i wonder if…'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'x years ago' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: later', 'x years later', ARRAY['work for sb/sth', 'again and again', 'good thing'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'x years later' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: old', 'x years old', ARRAY['too much', 'be made of sth', 'each other'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'x years old' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: see', 'you see', ARRAY['in the country', 'as part of sth', 'draw attention to sb/sth'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'you see' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'choose_phrase', 'Qual é a colocação correta? Dica: welcome', 'you''re welcome', ARRAY['on the ground', 'he or she', 'in business'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'you''re welcome' AND c."type" = 'phrase'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "have breakfast"?', 'tomar café da manhã', ARRAY['cumprir um prazo', 'se preparar', 'jantar'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have breakfast' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "have lunch"?', 'almoçar', ARRAY['cumprir um prazo', 'pensamento crítico', 'comida rápida'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have lunch' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "have dinner"?', 'jantar', ARRAY['pensamento crítico', 'gerar resultados', 'contar uma história'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'have dinner' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "take a shower"?', 'tomar banho', ARRAY['alta qualidade', 'prestar atenção', 'tirar uma foto'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'take a shower' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "take a photo"?', 'tirar uma foto', ARRAY['realizar uma reunião', 'amplo consenso', 'trabalho duro'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'take a photo' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "make a mistake"?', 'cometer um erro', ARRAY['tomar banho', 'dar conselho', 'crescimento rápido'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'make a mistake' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "do homework"?', 'fazer lição de casa', ARRAY['respeito mútuo', 'impacto profundo', 'crescimento rápido'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'do homework' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "go home"?', 'ir para casa', ARRAY['jantar', 'transporte público', 'decepção amarga'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go home' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "go to school"?', 'ir à escola', ARRAY['senso comum', 'fazer um esforço', 'fazer pesquisa'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go to school' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "go to work"?', 'ir ao trabalho', ARRAY['chamar atenção', 'ir à escola', 'ir para casa'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'go to work' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "play a game"?', 'jogar um jogo', ARRAY['pensamento crítico', 'fazer uma pergunta', 'decepção amarga'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'play a game' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "watch TV"?', 'assistir TV', ARRAY['pura determinação', 'noção vaga', 'definir um objetivo'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'watch TV' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "listen to music"?', 'ouvir música', ARRAY['cometer um crime', 'tomar café da manhã', 'bom dia'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'listen to music' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "read a book"?', 'ler um livro', ARRAY['ir à escola', 'chegar a uma conclusão', 'sustentar crescimento'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'read a book' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "drink water"?', 'beber água', ARRAY['não ter pressa', 'levantar preocupações', 'enfrentar um desafio'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'drink water' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "good morning"?', 'bom dia', ARRAY['se vestir', 'aumento acentuado', 'senso comum'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good morning' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "good night"?', 'boa noite', ARRAY['conduzir pesquisa', 'realizar uma reunião', 'quebrar um hábito'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'good night' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "best friend"?', 'melhor amigo/a', ARRAY['chuva forte', 'ler um livro', 'evidência substancial'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'best friend' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "big city"?', 'cidade grande', ARRAY['se perder', 'jantar', 'cumprir uma promessa'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'big city' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "hot weather"?', 'clima quente', ARRAY['fazer uma pergunta', 'chuva forte', 'pensamento crítico'], 'a1', 1
FROM "Collocation" c WHERE c."phrase" = 'hot weather' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "make a decision"?', 'tomar uma decisão', ARRAY['economizar dinheiro', 'prestar atenção', 'amigo íntimo'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make a decision' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "make friends"?', 'fazer amigos', ARRAY['decepção amarga', 'lavar a louça', 'cumprir uma promessa'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make friends' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "make money"?', 'ganhar dinheiro', ARRAY['cometer um erro', 'lançar uma campanha', 'levantar preocupações'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'make money' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "take a break"?', 'fazer uma pausa', ARRAY['ampla gama', 'seguir instruções', 'ganhar dinheiro'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take a break' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "take a bus"?', 'pegar um ônibus', ARRAY['cumprir um prazo', 'administrar um negócio', 'fazer pesquisa'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take a bus' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "take your time"?', 'não ter pressa', ARRAY['aproveitar', 'resolver um problema', 'trabalho duro'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'take your time' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "do exercise"?', 'fazer exercício', ARRAY['dar conselho', 'ir ao trabalho', 'bom dia'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'do exercise' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "do the dishes"?', 'lavar a louça', ARRAY['conduzir pesquisa', 'se preparar', 'quebrar um hábito'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'do the dishes' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "get dressed"?', 'se vestir', ARRAY['boa noite', 'alcançar sucesso', 'tomar uma decisão'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get dressed' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "get ready"?', 'se preparar', ARRAY['administrar um negócio', 'ganhar dinheiro', 'respeito mútuo'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get ready' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "get lost"?', 'se perder', ARRAY['concorrência acirrada', 'sustentar crescimento', 'lançar uma campanha'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'get lost' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "pay attention"?', 'prestar atenção', ARRAY['não ter pressa', 'fazer amigos', 'comida rápida'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'pay attention' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "tell a story"?', 'contar uma história', ARRAY['ir para casa', 'ler um livro', 'não ter pressa'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'tell a story' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "ask a question"?', 'fazer uma pergunta', ARRAY['levantar preocupações', 'fazer pesquisa', 'noção vaga'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'ask a question' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "hard work"?', 'trabalho duro', ARRAY['beber água', 'dar conselho', 'amplo consenso'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'hard work' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "fast food"?', 'comida rápida', ARRAY['fazer amigos', 'pura determinação', 'gerar resultados'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'fast food' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "close friend"?', 'amigo íntimo', ARRAY['lançar uma campanha', 'jantar', 'pensamento crítico'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'close friend' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "strong coffee"?', 'café forte', ARRAY['alcançar um objetivo', 'tirar uma foto', 'cometer um crime'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'strong coffee' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "heavy rain"?', 'chuva forte', ARRAY['ouvir música', 'quebrar um hábito', 'enfrentar um desafio'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'heavy rain' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "deep sleep"?', 'sono profundo', ARRAY['gerar resultados', 'contar uma história', 'progredir'], 'a2', 2
FROM "Collocation" c WHERE c."phrase" = 'deep sleep' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "make progress"?', 'progredir', ARRAY['resolver um problema', 'almoçar', 'chamar atenção'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make progress' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "make an effort"?', 'fazer um esforço', ARRAY['respeito mútuo', 'lançar uma campanha', 'ir à escola'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'make an effort' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "take advantage"?', 'aproveitar', ARRAY['senso comum', 'fazer um esforço', 'ir para casa'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take advantage' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "take responsibility"?', 'assumir responsabilidade', ARRAY['ler um livro', 'resolver um problema', 'gerar resultados'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'take responsibility' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "do research"?', 'fazer pesquisa', ARRAY['se perder', 'enfrentar um problema', 'resolver um problema'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'do research' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "keep a promise"?', 'cumprir uma promessa', ARRAY['superar obstáculos', 'transporte público', 'seguir uma carreira'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'keep a promise' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "run a business"?', 'administrar um negócio', ARRAY['exercer influência', 'sono profundo', 'fazer um esforço'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'run a business' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "catch a cold"?', 'pegar um resfriado', ARRAY['transporte público', 'ir para casa', 'ganhar dinheiro'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'catch a cold' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "break a habit"?', 'quebrar um hábito', ARRAY['beber água', 'se perder', 'ampla gama'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'break a habit' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "save money"?', 'economizar dinheiro', ARRAY['fazer exercício', 'tomar uma decisão', 'queda acentuada'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'save money' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "lose weight"?', 'perder peso', ARRAY['pegar um ônibus', 'executar um plano', 'melhor amigo/a'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'lose weight' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "give advice"?', 'dar conselho', ARRAY['alcançar sucesso', 'tomar café da manhã', 'concorrência acirrada'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'give advice' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "solve a problem"?', 'resolver um problema', ARRAY['fazer um esforço', 'concorrência acirrada', 'definir um objetivo'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'solve a problem' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "meet a deadline"?', 'cumprir um prazo', ARRAY['assumir responsabilidade', 'ir ao trabalho', 'clima quente'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'meet a deadline' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "public transport"?', 'transporte público', ARRAY['se vestir', 'se preparar', 'debate acirrado'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'public transport' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "common sense"?', 'senso comum', ARRAY['enfrentar um desafio', 'alcançar um objetivo', 'quebrar um hábito'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'common sense' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "key factor"?', 'fator chave', ARRAY['alcançar um objetivo', 'enfrentar um problema', 'resolver um problema'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'key factor' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "major role"?', 'papel importante', ARRAY['assumir responsabilidade', 'administrar um negócio', 'amplo consenso'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'major role' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "high quality"?', 'alta qualidade', ARRAY['ganhar dinheiro', 'cumprir uma promessa', 'imaginação vívida'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'high quality' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "long term"?', 'longo prazo', ARRAY['chuva forte', 'imaginação vívida', 'fazer pesquisa'], 'b1', 3
FROM "Collocation" c WHERE c."phrase" = 'long term' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "draw a conclusion"?', 'chegar a uma conclusão', ARRAY['pensamento crítico', 'fazer exercício', 'alta qualidade'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'draw a conclusion' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "raise awareness"?', 'aumentar a conscientização', ARRAY['jantar', 'contar uma história', 'café forte'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'raise awareness' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "reach a goal"?', 'alcançar um objetivo', ARRAY['tirar uma foto', 'conduzir pesquisa', 'impor restrições'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'reach a goal' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "face a challenge"?', 'enfrentar um desafio', ARRAY['crescimento sem precedentes', 'dar conselho', 'longo prazo'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'face a challenge' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "follow instructions"?', 'seguir instruções', ARRAY['sono profundo', 'imaginação vívida', 'chamar atenção'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'follow instructions' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "gain experience"?', 'ganhar experiência', ARRAY['exercer influência', 'decepção amarga', 'progredir'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'gain experience' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "achieve success"?', 'alcançar sucesso', ARRAY['papel importante', 'levantar preocupações', 'debate acirrado'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'achieve success' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "set a goal"?', 'definir um objetivo', ARRAY['chegar a uma conclusão', 'pensamento crítico', 'papel importante'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'set a goal' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "hold a meeting"?', 'realizar uma reunião', ARRAY['chegar a uma conclusão', 'contar uma história', 'superar obstáculos'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'hold a meeting' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "carry out a plan"?', 'executar um plano', ARRAY['alcançar sucesso', 'lavar a louça', 'impacto profundo'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'carry out a plan' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "serve a purpose"?', 'servir a um propósito', ARRAY['ir ao trabalho', 'assistir TV', 'fazer amigos'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'serve a purpose' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "commit a crime"?', 'cometer um crime', ARRAY['tirar uma foto', 'perder peso', 'fazer uma pausa'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'commit a crime' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "critical thinking"?', 'pensamento crítico', ARRAY['comida rápida', 'boa noite', 'ampla gama'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'critical thinking' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "sharp increase"?', 'aumento acentuado', ARRAY['decepção amarga', 'levantar preocupações', 'conduzir pesquisa'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'sharp increase' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "steep decline"?', 'queda acentuada', ARRAY['transporte público', 'progredir', 'pensamento crítico'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'steep decline' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "bitter disappointment"?', 'decepção amarga', ARRAY['assumir responsabilidade', 'chamar atenção', 'almoçar'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'bitter disappointment' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "broad range"?', 'ampla gama', ARRAY['administrar um negócio', 'fator chave', 'longo prazo'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'broad range' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "fierce competition"?', 'concorrência acirrada', ARRAY['dar conselho', 'papel importante', 'cumprir um prazo'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'fierce competition' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "mutual respect"?', 'respeito mútuo', ARRAY['contar uma história', 'economizar dinheiro', 'ir para casa'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'mutual respect' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "rapid growth"?', 'crescimento rápido', ARRAY['comida rápida', 'assistir TV', 'enfrentar um desafio'], 'b2', 4
FROM "Collocation" c WHERE c."phrase" = 'rapid growth' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "conduct research"?', 'conduzir pesquisa', ARRAY['dar conselho', 'pensamento crítico', 'papel importante'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'conduct research' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "launch a campaign"?', 'lançar uma campanha', ARRAY['gerar resultados', 'fazer amigos', 'fazer pesquisa'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'launch a campaign' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "overcome obstacles"?', 'superar obstáculos', ARRAY['ler um livro', 'fazer uma pausa', 'aproveitar'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'overcome obstacles' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "pursue a career"?', 'seguir uma carreira', ARRAY['papel importante', 'conduzir pesquisa', 'tomar banho'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'pursue a career' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "tackle a problem"?', 'enfrentar um problema', ARRAY['longo prazo', 'cometer um crime', 'servir a um propósito'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'tackle a problem' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "yield results"?', 'gerar resultados', ARRAY['aumentar a conscientização', 'lavar a louça', 'acordo mútuo'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'yield results' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "exert influence"?', 'exercer influência', ARRAY['tomar café da manhã', 'acordo mútuo', 'jantar'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'exert influence' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "impose restrictions"?', 'impor restrições', ARRAY['jogar um jogo', 'chamar atenção', 'executar um plano'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'impose restrictions' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "sustain growth"?', 'sustentar crescimento', ARRAY['amplo consenso', 'fazer um esforço', 'jogar um jogo'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'sustain growth' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "draw attention"?', 'chamar atenção', ARRAY['almoçar', 'concorrência acirrada', 'sustentar crescimento'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'draw attention' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "raise concerns"?', 'levantar preocupações', ARRAY['prestar atenção', 'sono profundo', 'pura determinação'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'raise concerns' AND c."type" = 'verb_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "profound impact"?', 'impacto profundo', ARRAY['servir a um propósito', 'quebrar um hábito', 'concorrência acirrada'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'profound impact' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "unprecedented growth"?', 'crescimento sem precedentes', ARRAY['café forte', 'impor restrições', 'beber água'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'unprecedented growth' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "vague notion"?', 'noção vaga', ARRAY['bom dia', 'executar um plano', 'exercer influência'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'vague notion' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "vivid imagination"?', 'imaginação vívida', ARRAY['definir um objetivo', 'clima quente', 'dar conselho'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'vivid imagination' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "sheer determination"?', 'pura determinação', ARRAY['superar obstáculos', 'se perder', 'tomar café da manhã'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'sheer determination' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "substantial evidence"?', 'evidência substancial', ARRAY['senso comum', 'definir um objetivo', 'dar conselho'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'substantial evidence' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "mutual agreement"?', 'acordo mútuo', ARRAY['se vestir', 'tirar uma foto', 'tomar café da manhã'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'mutual agreement' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "fierce debate"?', 'debate acirrado', ARRAY['fazer pesquisa', 'fazer um esforço', 'dar conselho'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'fierce debate' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;

INSERT INTO "CollocationExercise" ("collocationId", "promptType", "prompt", "correctAnswer", "distractors", "cefrLevel", "month")
SELECT c.id, 'match_meaning', 'Qual é o significado de "broad consensus"?', 'amplo consenso', ARRAY['pegar um resfriado', 'ganhar experiência', 'seguir instruções'], 'c1', 5
FROM "Collocation" c WHERE c."phrase" = 'broad consensus' AND c."type" = 'adj_noun'
ON CONFLICT DO NOTHING;
