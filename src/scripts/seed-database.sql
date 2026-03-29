-- ============================================================
-- COGNITIVE NEBULA - SEED COMPLETO DO BANCO DE DADOS
-- Execute este arquivo inteiro no seu PostgreSQL
-- Ordem: Badge > Vocabulary > PhrasalVerb > Expression > 
--        GrammarTip > Video > Podcast > Song > KeyPhrase > SongVocab
-- ============================================================

-- ==================== BADGES (15) ====================
INSERT INTO "Badge" (slug, name, description, icon, color, "xpReward", condition) VALUES
('first-login', 'Primeiro Acesso', 'Fez login pela primeira vez', 'login', '#a078c0', 10, '{"type":"login","count":1}'),
('streak-3', 'Fogo Aceso', '3 dias consecutivos de estudo', 'local_fire_department', '#e0a458', 25, '{"type":"streak","days":3}'),
('streak-7', 'Semana Perfeita', '7 dias consecutivos de estudo', 'whatshot', '#e0a458', 50, '{"type":"streak","days":7}'),
('streak-30', 'Dedicado', '30 dias consecutivos de estudo', 'military_tech', '#e0a458', 200, '{"type":"streak","days":30}'),
('quiz-first', 'Primeiro Quiz', 'Completou seu primeiro quiz', 'quiz', '#7c9fdb', 15, '{"type":"quiz","count":1}'),
('quiz-10', 'Mente Afiada', 'Completou 10 quizzes', 'psychology', '#7c9fdb', 50, '{"type":"quiz","count":10}'),
('quiz-perfect', 'Perfeito!', 'Acertou 100% em um quiz', 'stars', '#6bc5a0', 30, '{"type":"quiz_perfect","count":1}'),
('flashcard-50', 'Revisor', 'Revisou 50 flashcards', 'style', '#d47a8f', 40, '{"type":"flashcard","count":50}'),
('flashcard-200', 'Mestre do Vocabulario', 'Revisou 200 flashcards', 'auto_awesome', '#d47a8f', 100, '{"type":"flashcard","count":200}'),
('timer-5', 'Focado', 'Completou 5 sessoes de estudo', 'timer', '#a078c0', 20, '{"type":"timer","count":5}'),
('timer-30', 'Maratonista', 'Completou 30 sessoes de estudo', 'speed', '#a078c0', 75, '{"type":"timer","count":30}'),
('checklist-7', 'Disciplinado', 'Completou checklist 7 vezes', 'task_alt', '#6bc5a0', 30, '{"type":"checklist_complete","count":7}'),
('xp-500', 'Estudante', 'Acumulou 500 XP', 'school', '#8b7ec8', 0, '{"type":"xp_total","amount":500}'),
('xp-2000', 'Veterano', 'Acumulou 2000 XP', 'workspace_premium', '#8b7ec8', 0, '{"type":"xp_total","amount":2000}'),
('xp-5000', 'Lenda', 'Acumulou 5000 XP', 'diamond', '#8b7ec8', 0, '{"type":"xp_total","amount":5000}')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  "xpReward" = EXCLUDED."xpReward",
  condition = EXCLUDED.condition;

-- ==================== VOCABULARY ====================
-- MES 1 - Fundacao (40 palavras)
INSERT INTO "Vocabulary" (word, type, definition, example, month, level, category) VALUES
('Hello', 'interjeicao', 'Ola, saudacao basica', 'Hello, how are you?', 1, 'basico', 'cotidiano'),
('Goodbye', 'interjeicao', 'Tchau, despedida', 'Goodbye, see you tomorrow!', 1, 'basico', 'cotidiano'),
('Please', 'adverbio', 'Por favor', 'Please, can you help me?', 1, 'basico', 'cotidiano'),
('Thank you', 'expressao', 'Obrigado(a)', 'Thank you for your help!', 1, 'basico', 'cotidiano'),
('Sorry', 'adjetivo', 'Desculpa, sinto muito', 'I''m sorry for being late.', 1, 'basico', 'cotidiano'),
('Begin', 'verbo', 'Comecar, iniciar algo', 'Let us begin the lesson.', 1, 'basico', 'geral'),
('Journey', 'substantivo', 'Jornada, viagem longa', 'The journey to fluency takes time.', 1, 'basico', 'geral'),
('Understand', 'verbo', 'Entender, compreender', 'I understand the question now.', 1, 'basico', 'geral'),
('Knowledge', 'substantivo', 'Conhecimento, saber', 'Knowledge is power.', 1, 'basico', 'academico'),
('Practice', 'substantivo/verbo', 'Pratica / Praticar', 'Practice makes perfect.', 1, 'basico', 'geral'),
('Family', 'substantivo', 'Familia', 'My family lives in Brazil.', 1, 'basico', 'cotidiano'),
('Friend', 'substantivo', 'Amigo(a)', 'She is my best friend.', 1, 'basico', 'cotidiano'),
('Work', 'substantivo/verbo', 'Trabalho / Trabalhar', 'I work from home.', 1, 'basico', 'negocios'),
('Study', 'verbo', 'Estudar', 'I study English every day.', 1, 'basico', 'academico'),
('Learn', 'verbo', 'Aprender', 'I want to learn new words.', 1, 'basico', 'academico'),
('Speak', 'verbo', 'Falar', 'Can you speak English?', 1, 'basico', 'geral'),
('Listen', 'verbo', 'Ouvir, escutar', 'Listen to the teacher carefully.', 1, 'basico', 'geral'),
('Read', 'verbo', 'Ler', 'I read books every night.', 1, 'basico', 'academico'),
('Write', 'verbo', 'Escrever', 'Write your name here.', 1, 'basico', 'academico'),
('Think', 'verbo', 'Pensar', 'I think this is correct.', 1, 'basico', 'geral'),
('Believe', 'verbo', 'Acreditar', 'I believe in you.', 1, 'basico', 'geral'),
('Morning', 'substantivo', 'Manha', 'Good morning!', 1, 'basico', 'cotidiano'),
('Night', 'substantivo', 'Noite', 'Good night, sleep well.', 1, 'basico', 'cotidiano'),
('Today', 'adverbio', 'Hoje', 'What are we doing today?', 1, 'basico', 'cotidiano'),
('Tomorrow', 'adverbio', 'Amanha', 'See you tomorrow!', 1, 'basico', 'cotidiano'),
('Always', 'adverbio', 'Sempre', 'I always study in the morning.', 1, 'basico', 'geral'),
('Never', 'adverbio', 'Nunca', 'Never give up!', 1, 'basico', 'geral'),
('Beautiful', 'adjetivo', 'Bonito(a), lindo(a)', 'What a beautiful day!', 1, 'basico', 'cotidiano'),
('Happy', 'adjetivo', 'Feliz', 'I am happy to meet you.', 1, 'basico', 'cotidiano'),
('Difficult', 'adjetivo', 'Dificil', 'English is not that difficult.', 1, 'basico', 'geral'),
('Easy', 'adjetivo', 'Facil', 'This exercise is easy.', 1, 'basico', 'geral'),
('Important', 'adjetivo', 'Importante', 'Pronunciation is important.', 1, 'basico', 'geral'),
('Water', 'substantivo', 'Agua', 'Can I have some water?', 1, 'basico', 'cotidiano'),
('Food', 'substantivo', 'Comida', 'The food here is great.', 1, 'basico', 'cotidiano'),
('House', 'substantivo', 'Casa', 'Welcome to my house.', 1, 'basico', 'cotidiano'),
('School', 'substantivo', 'Escola', 'I go to school by bus.', 1, 'basico', 'academico'),
('Book', 'substantivo', 'Livro', 'This book is very interesting.', 1, 'basico', 'academico'),
('Time', 'substantivo', 'Tempo', 'What time is it?', 1, 'basico', 'cotidiano'),
('Help', 'verbo/substantivo', 'Ajudar / Ajuda', 'Can you help me, please?', 1, 'basico', 'cotidiano'),
('Want', 'verbo', 'Querer', 'I want to learn English.', 1, 'basico', 'geral')
ON CONFLICT (word, month) DO NOTHING;

-- MES 2 - Expansao (40 palavras)
INSERT INTO "Vocabulary" (word, type, definition, example, month, level, category) VALUES
('Actually', 'adverbio', 'Na verdade, na realidade', 'Actually, I changed my mind.', 2, 'basico', 'geral'),
('Already', 'adverbio', 'Ja (algo que aconteceu)', 'I have already finished.', 2, 'basico', 'geral'),
('Although', 'conjuncao', 'Embora, apesar de', 'Although it was raining, we went out.', 2, 'basico', 'geral'),
('Appointment', 'substantivo', 'Compromisso, consulta', 'I have a doctor''s appointment.', 2, 'basico', 'cotidiano'),
('Awesome', 'adjetivo', 'Incrivel, fantastico', 'That movie was awesome!', 2, 'basico', 'cotidiano'),
('Behavior', 'substantivo', 'Comportamento', 'His behavior was very polite.', 2, 'intermediario', 'geral'),
('Bother', 'verbo', 'Incomodar, perturbar', 'Don''t bother me right now.', 2, 'basico', 'cotidiano'),
('Chance', 'substantivo', 'Chance, oportunidade', 'Give me another chance.', 2, 'basico', 'geral'),
('Choose', 'verbo', 'Escolher', 'You can choose any color.', 2, 'basico', 'geral'),
('Complain', 'verbo', 'Reclamar', 'Stop complaining about the weather.', 2, 'basico', 'cotidiano'),
('Customer', 'substantivo', 'Cliente', 'The customer is always right.', 2, 'basico', 'negocios'),
('Deal', 'substantivo/verbo', 'Acordo / Lidar com', 'It''s a great deal!', 2, 'basico', 'negocios'),
('Deliver', 'verbo', 'Entregar', 'They will deliver the package tomorrow.', 2, 'basico', 'cotidiano'),
('Develop', 'verbo', 'Desenvolver', 'We need to develop new skills.', 2, 'intermediario', 'academico'),
('Enjoy', 'verbo', 'Aproveitar, curtir', 'Enjoy your vacation!', 2, 'basico', 'cotidiano'),
('Enough', 'adjetivo/adverbio', 'Suficiente, bastante', 'That''s enough for today.', 2, 'basico', 'geral'),
('Expensive', 'adjetivo', 'Caro (preco)', 'This restaurant is too expensive.', 2, 'basico', 'cotidiano'),
('Experience', 'substantivo', 'Experiencia', 'She has a lot of experience.', 2, 'basico', 'negocios'),
('Figure out', 'verbo', 'Descobrir, entender', 'I need to figure out the answer.', 2, 'basico', 'geral'),
('Forget', 'verbo', 'Esquecer', 'Don''t forget your keys.', 2, 'basico', 'cotidiano'),
('Guess', 'verbo', 'Adivinhar, supor', 'I guess you''re right.', 2, 'basico', 'geral'),
('Happen', 'verbo', 'Acontecer', 'What happened yesterday?', 2, 'basico', 'geral'),
('Hope', 'verbo/substantivo', 'Esperar / Esperanca', 'I hope you feel better soon.', 2, 'basico', 'geral'),
('Improve', 'verbo', 'Melhorar', 'I want to improve my English.', 2, 'basico', 'academico'),
('Issue', 'substantivo', 'Problema, questao', 'There''s an issue with the order.', 2, 'intermediario', 'negocios'),
('Keep', 'verbo', 'Manter, continuar', 'Keep studying every day.', 2, 'basico', 'geral'),
('Likely', 'adverbio/adjetivo', 'Provavelmente, provavel', 'It''s likely going to rain.', 2, 'intermediario', 'geral'),
('Matter', 'substantivo/verbo', 'Assunto / Importar', 'It doesn''t matter.', 2, 'basico', 'geral'),
('Maybe', 'adverbio', 'Talvez', 'Maybe we should try again.', 2, 'basico', 'geral'),
('Mean', 'verbo', 'Significar, querer dizer', 'What does this word mean?', 2, 'basico', 'academico'),
('Mistake', 'substantivo', 'Erro', 'Everyone makes mistakes.', 2, 'basico', 'geral'),
('Opportunity', 'substantivo', 'Oportunidade', 'This is a great opportunity.', 2, 'intermediario', 'negocios'),
('Rather', 'adverbio', 'Preferivelmente, mais bem', 'I''d rather stay home.', 2, 'intermediario', 'geral'),
('Realize', 'verbo', 'Perceber, se dar conta', 'I didn''t realize it was so late.', 2, 'basico', 'geral'),
('Remember', 'verbo', 'Lembrar', 'Do you remember her name?', 2, 'basico', 'geral'),
('Require', 'verbo', 'Exigir, requerer', 'This job requires experience.', 2, 'intermediario', 'negocios'),
('Several', 'adjetivo', 'Varios, diversos', 'I have several questions.', 2, 'intermediario', 'geral'),
('Suggest', 'verbo', 'Sugerir', 'I suggest we take a break.', 2, 'basico', 'geral'),
('Toward', 'preposicao', 'Em direcao a', 'Walk toward the exit.', 2, 'intermediario', 'geral'),
('Whether', 'conjuncao', 'Se (condicional)', 'I don''t know whether to go.', 2, 'intermediario', 'geral')
ON CONFLICT (word, month) DO NOTHING;

-- MES 3 - Imersao (40 palavras)
INSERT INTO "Vocabulary" (word, type, definition, example, month, level, category) VALUES
('Achieve', 'verbo', 'Alcancar, conquistar', 'She achieved her goals.', 3, 'intermediario', 'geral'),
('Afford', 'verbo', 'Ter condicoes de pagar', 'I can''t afford a new car.', 3, 'intermediario', 'cotidiano'),
('Annoying', 'adjetivo', 'Irritante, chato', 'That noise is so annoying.', 3, 'basico', 'cotidiano'),
('Argue', 'verbo', 'Discutir, argumentar', 'They always argue about politics.', 3, 'intermediario', 'geral'),
('Aware', 'adjetivo', 'Ciente, consciente', 'Are you aware of the problem?', 3, 'intermediario', 'geral'),
('Barely', 'adverbio', 'Mal, quase nao', 'I can barely hear you.', 3, 'intermediario', 'geral'),
('Belong', 'verbo', 'Pertencer', 'This book belongs to me.', 3, 'basico', 'geral'),
('Breathe', 'verbo', 'Respirar', 'Take a deep breath and breathe.', 3, 'basico', 'cotidiano'),
('Claim', 'verbo/substantivo', 'Afirmar / Reivindicacao', 'He claims he was there.', 3, 'intermediario', 'geral'),
('Concern', 'substantivo/verbo', 'Preocupacao / Preocupar', 'Safety is our main concern.', 3, 'intermediario', 'geral'),
('Consider', 'verbo', 'Considerar', 'Have you considered moving abroad?', 3, 'intermediario', 'geral'),
('Definitely', 'adverbio', 'Definitivamente, com certeza', 'I''m definitely going to the party.', 3, 'intermediario', 'geral'),
('Demand', 'verbo/substantivo', 'Exigir / Demanda', 'The demand for English is growing.', 3, 'intermediario', 'negocios'),
('Deny', 'verbo', 'Negar', 'He denied the accusations.', 3, 'intermediario', 'geral'),
('Depend', 'verbo', 'Depender', 'It depends on the weather.', 3, 'basico', 'geral'),
('Despite', 'preposicao', 'Apesar de', 'Despite the rain, we had fun.', 3, 'intermediario', 'geral'),
('Disappoint', 'verbo', 'Decepcionar', 'I don''t want to disappoint you.', 3, 'intermediario', 'geral'),
('Disease', 'substantivo', 'Doenca', 'Heart disease is very common.', 3, 'intermediario', 'academico'),
('Either', 'adverbio/conjuncao', 'Qualquer um / Tambem nao', 'Either option is fine with me.', 3, 'intermediario', 'geral'),
('Eventually', 'adverbio', 'Eventualmente, finalmente', 'He eventually found a job.', 3, 'intermediario', 'geral'),
('Evidence', 'substantivo', 'Evidencia, prova', 'There''s no evidence of that.', 3, 'intermediario', 'academico'),
('Exactly', 'adverbio', 'Exatamente', 'That''s exactly what I meant.', 3, 'basico', 'geral'),
('Expect', 'verbo', 'Esperar (expectativa)', 'I didn''t expect this result.', 3, 'intermediario', 'geral'),
('Fail', 'verbo', 'Falhar, reprovar', 'Don''t be afraid to fail.', 3, 'basico', 'geral'),
('Fault', 'substantivo', 'Culpa, falha', 'It''s not your fault.', 3, 'intermediario', 'geral'),
('Feature', 'substantivo', 'Caracteristica, recurso', 'The best feature of this app.', 3, 'intermediario', 'negocios'),
('Forward', 'adverbio/adjetivo', 'Para frente, adiante', 'I look forward to meeting you.', 3, 'intermediario', 'geral'),
('Huge', 'adjetivo', 'Enorme, gigante', 'It was a huge success.', 3, 'basico', 'geral'),
('Indeed', 'adverbio', 'De fato, realmente', 'He is indeed very talented.', 3, 'intermediario', 'geral'),
('Influence', 'substantivo/verbo', 'Influencia / Influenciar', 'Music has a big influence on me.', 3, 'intermediario', 'geral'),
('Instead', 'adverbio', 'Em vez disso', 'Let''s walk instead of driving.', 3, 'intermediario', 'geral'),
('Involve', 'verbo', 'Envolver', 'The project involves many people.', 3, 'intermediario', 'negocios'),
('Mention', 'verbo', 'Mencionar', 'She mentioned your name.', 3, 'intermediario', 'geral'),
('Notice', 'verbo/substantivo', 'Notar / Aviso', 'Did you notice anything different?', 3, 'intermediario', 'geral'),
('Obvious', 'adjetivo', 'Obvio', 'The answer is obvious.', 3, 'intermediario', 'geral'),
('Perhaps', 'adverbio', 'Talvez, quem sabe', 'Perhaps we should try again.', 3, 'intermediario', 'geral'),
('Prevent', 'verbo', 'Prevenir, impedir', 'We need to prevent accidents.', 3, 'intermediario', 'geral'),
('Purpose', 'substantivo', 'Proposito, objetivo', 'What is the purpose of this meeting?', 3, 'intermediario', 'negocios'),
('Remain', 'verbo', 'Permanecer', 'Please remain seated.', 3, 'intermediario', 'geral'),
('Struggle', 'verbo/substantivo', 'Lutar / Luta, dificuldade', 'I struggle with pronunciation.', 3, 'intermediario', 'geral')
ON CONFLICT (word, month) DO NOTHING;

-- MES 4 - Fluencia Basica (35 palavras)
INSERT INTO "Vocabulary" (word, type, definition, example, month, level, category) VALUES
('Acknowledge', 'verbo', 'Reconhecer, admitir', 'He acknowledged his mistake.', 4, 'intermediario', 'geral'),
('Abroad', 'adverbio', 'No exterior', 'She studied abroad for a year.', 4, 'intermediario', 'geral'),
('Assumption', 'substantivo', 'Suposicao', 'Don''t make assumptions.', 4, 'intermediario', 'academico'),
('Benefit', 'substantivo/verbo', 'Beneficio / Beneficiar', 'Exercise has many benefits.', 4, 'intermediario', 'geral'),
('Challenge', 'substantivo/verbo', 'Desafio / Desafiar', 'Learning English is a challenge.', 4, 'intermediario', 'geral'),
('Commitment', 'substantivo', 'Compromisso, dedicacao', 'Success requires commitment.', 4, 'intermediario', 'negocios'),
('Confidence', 'substantivo', 'Confianca', 'She speaks with confidence.', 4, 'intermediario', 'geral'),
('Convince', 'verbo', 'Convencer', 'He convinced me to go.', 4, 'intermediario', 'geral'),
('Deadline', 'substantivo', 'Prazo final', 'The deadline is next Friday.', 4, 'intermediario', 'negocios'),
('Effective', 'adjetivo', 'Eficaz, efetivo', 'This method is very effective.', 4, 'intermediario', 'geral'),
('Encourage', 'verbo', 'Encorajar, incentivar', 'I encourage you to keep trying.', 4, 'intermediario', 'geral'),
('Environment', 'substantivo', 'Ambiente, meio ambiente', 'We need to protect the environment.', 4, 'intermediario', 'academico'),
('Establish', 'verbo', 'Estabelecer', 'They established a new company.', 4, 'intermediario', 'negocios'),
('Furthermore', 'adverbio', 'Alem disso', 'Furthermore, I would like to add...', 4, 'avancado', 'academico'),
('Grateful', 'adjetivo', 'Grato, agradecido', 'I''m grateful for your help.', 4, 'intermediario', 'geral'),
('Hesitate', 'verbo', 'Hesitar', 'Don''t hesitate to ask questions.', 4, 'intermediario', 'geral'),
('Inevitable', 'adjetivo', 'Inevitavel', 'Change is inevitable.', 4, 'avancado', 'geral'),
('Insight', 'substantivo', 'Perspicacia, percepcao', 'That gives us a new insight.', 4, 'avancado', 'academico'),
('Launch', 'verbo/substantivo', 'Lancar / Lancamento', 'We will launch the product next month.', 4, 'intermediario', 'negocios'),
('Negotiate', 'verbo', 'Negociar', 'We need to negotiate the price.', 4, 'intermediario', 'negocios'),
('Nevertheless', 'adverbio', 'No entanto, mesmo assim', 'It was hard. Nevertheless, I did it.', 4, 'avancado', 'academico'),
('Outcome', 'substantivo', 'Resultado, desfecho', 'The outcome was positive.', 4, 'intermediario', 'geral'),
('Overcome', 'verbo', 'Superar', 'You can overcome any obstacle.', 4, 'intermediario', 'geral'),
('Performance', 'substantivo', 'Desempenho', 'Her performance was excellent.', 4, 'intermediario', 'negocios'),
('Persuade', 'verbo', 'Persuadir', 'She persuaded him to join.', 4, 'intermediario', 'geral'),
('Potential', 'substantivo/adjetivo', 'Potencial', 'You have great potential.', 4, 'intermediario', 'geral'),
('Profit', 'substantivo', 'Lucro', 'The company made a big profit.', 4, 'intermediario', 'negocios'),
('Pursue', 'verbo', 'Perseguir, buscar', 'She decided to pursue her dreams.', 4, 'avancado', 'geral'),
('Relevant', 'adjetivo', 'Relevante', 'Is this information relevant?', 4, 'intermediario', 'academico'),
('Rely', 'verbo', 'Confiar, depender de', 'You can rely on me.', 4, 'intermediario', 'geral'),
('Reveal', 'verbo', 'Revelar', 'The study revealed new findings.', 4, 'intermediario', 'geral'),
('Satisfaction', 'substantivo', 'Satisfacao', 'Customer satisfaction is important.', 4, 'intermediario', 'negocios'),
('Significant', 'adjetivo', 'Significativo', 'There was a significant improvement.', 4, 'avancado', 'academico'),
('Thorough', 'adjetivo', 'Minucioso, completo', 'He did a thorough review.', 4, 'avancado', 'academico'),
('Willing', 'adjetivo', 'Disposto', 'Are you willing to help?', 4, 'intermediario', 'geral')
ON CONFLICT (word, month) DO NOTHING;

-- MES 5 - Refinamento (35 palavras)
INSERT INTO "Vocabulary" (word, type, definition, example, month, level, category) VALUES
('Accomplish', 'verbo', 'Realizar, cumprir', 'What did you accomplish today?', 5, 'avancado', 'geral'),
('Apparently', 'adverbio', 'Aparentemente', 'Apparently, he moved to London.', 5, 'intermediario', 'geral'),
('Breakthrough', 'substantivo', 'Avanço significativo', 'It was a scientific breakthrough.', 5, 'avancado', 'academico'),
('Comprehensive', 'adjetivo', 'Abrangente, completo', 'This is a comprehensive guide.', 5, 'avancado', 'academico'),
('Consequently', 'adverbio', 'Consequentemente', 'He missed the bus. Consequently, he was late.', 5, 'avancado', 'academico'),
('Controversy', 'substantivo', 'Controversia, polemica', 'The decision caused controversy.', 5, 'avancado', 'geral'),
('Convey', 'verbo', 'Transmitir, comunicar', 'I want to convey my gratitude.', 5, 'avancado', 'geral'),
('Crucial', 'adjetivo', 'Crucial, fundamental', 'Timing is crucial in business.', 5, 'avancado', 'negocios'),
('Dilemma', 'substantivo', 'Dilema', 'I''m facing a moral dilemma.', 5, 'avancado', 'geral'),
('Distinguish', 'verbo', 'Distinguir, diferenciar', 'Can you distinguish the two sounds?', 5, 'avancado', 'academico'),
('Elaborate', 'verbo/adjetivo', 'Elaborar / Elaborado', 'Could you elaborate on that?', 5, 'avancado', 'academico'),
('Emerge', 'verbo', 'Emergir, surgir', 'New trends are emerging.', 5, 'avancado', 'geral'),
('Emphasize', 'verbo', 'Enfatizar', 'I want to emphasize this point.', 5, 'avancado', 'academico'),
('Enhance', 'verbo', 'Melhorar, aprimorar', 'Technology can enhance learning.', 5, 'avancado', 'geral'),
('Extent', 'substantivo', 'Extensao, grau', 'To what extent do you agree?', 5, 'avancado', 'academico'),
('Fundamental', 'adjetivo', 'Fundamental', 'Grammar is fundamental to language.', 5, 'avancado', 'academico'),
('Imply', 'verbo', 'Implicar, dar a entender', 'What are you implying?', 5, 'avancado', 'geral'),
('Innovative', 'adjetivo', 'Inovador', 'They have an innovative approach.', 5, 'avancado', 'negocios'),
('Likelihood', 'substantivo', 'Probabilidade', 'There''s a high likelihood of success.', 5, 'avancado', 'geral'),
('Moreover', 'adverbio', 'Alem do mais', 'Moreover, the results were impressive.', 5, 'avancado', 'academico'),
('Nonetheless', 'adverbio', 'Apesar disso', 'It was risky. Nonetheless, they succeeded.', 5, 'avancado', 'geral'),
('Perspective', 'substantivo', 'Perspectiva, ponto de vista', 'Try to see it from my perspective.', 5, 'avancado', 'geral'),
('Phenomenon', 'substantivo', 'Fenomeno', 'It''s a natural phenomenon.', 5, 'avancado', 'academico'),
('Precisely', 'adverbio', 'Precisamente', 'That''s precisely what I mean.', 5, 'avancado', 'geral'),
('Profound', 'adjetivo', 'Profundo (sentido figurado)', 'It had a profound impact on me.', 5, 'avancado', 'geral'),
('Regardless', 'adverbio', 'Independentemente', 'I''ll go regardless of the weather.', 5, 'avancado', 'geral'),
('Simultaneously', 'adverbio', 'Simultaneamente', 'Both events happened simultaneously.', 5, 'avancado', 'geral'),
('Sophisticated', 'adjetivo', 'Sofisticado', 'It''s a sophisticated system.', 5, 'avancado', 'geral'),
('Strategy', 'substantivo', 'Estrategia', 'We need a new marketing strategy.', 5, 'avancado', 'negocios'),
('Substantial', 'adjetivo', 'Substancial, consideravel', 'There was a substantial increase.', 5, 'avancado', 'negocios'),
('Tend', 'verbo', 'Tender a', 'People tend to forget new words.', 5, 'intermediario', 'geral'),
('Ultimately', 'adverbio', 'Em ultima analise', 'Ultimately, the choice is yours.', 5, 'avancado', 'geral'),
('Undertake', 'verbo', 'Empreender, assumir', 'She undertook a difficult project.', 5, 'avancado', 'negocios'),
('Whereas', 'conjuncao', 'Enquanto, ao passo que', 'I like coffee, whereas she likes tea.', 5, 'avancado', 'academico'),
('Yield', 'verbo/substantivo', 'Produzir / Rendimento', 'The experiment yielded results.', 5, 'avancado', 'academico')
ON CONFLICT (word, month) DO NOTHING;

-- MES 6 - Consolidacao (30 palavras)
INSERT INTO "Vocabulary" (word, type, definition, example, month, level, category) VALUES
('Advocate', 'verbo/substantivo', 'Defender / Defensor', 'She advocates for human rights.', 6, 'avancado', 'geral'),
('Ambiguous', 'adjetivo', 'Ambiguo', 'The instructions are ambiguous.', 6, 'avancado', 'academico'),
('Anticipate', 'verbo', 'Antecipar, prever', 'We anticipate a positive response.', 6, 'avancado', 'negocios'),
('Coherent', 'adjetivo', 'Coerente', 'Make sure your argument is coherent.', 6, 'avancado', 'academico'),
('Compelling', 'adjetivo', 'Convincente, cativante', 'He made a compelling argument.', 6, 'avancado', 'geral'),
('Contemplate', 'verbo', 'Contemplar, considerar', 'I''m contemplating a career change.', 6, 'avancado', 'geral'),
('Counterpart', 'substantivo', 'Equivalente, homologo', 'She met her Japanese counterpart.', 6, 'avancado', 'negocios'),
('Deteriorate', 'verbo', 'Deteriorar, piorar', 'The situation continues to deteriorate.', 6, 'avancado', 'geral'),
('Discrepancy', 'substantivo', 'Discrepancia', 'There''s a discrepancy in the data.', 6, 'avancado', 'academico'),
('Eloquent', 'adjetivo', 'Eloquente', 'She gave an eloquent speech.', 6, 'avancado', 'geral'),
('Endeavor', 'substantivo/verbo', 'Empreendimento / Empenhar-se', 'It was a worthwhile endeavor.', 6, 'avancado', 'geral'),
('Feasible', 'adjetivo', 'Viavel', 'Is this plan feasible?', 6, 'avancado', 'negocios'),
('Fluctuate', 'verbo', 'Flutuar, variar', 'Prices fluctuate throughout the year.', 6, 'avancado', 'negocios'),
('Forthcoming', 'adjetivo', 'Proximo, vindouro', 'Details about the forthcoming event.', 6, 'avancado', 'geral'),
('Hinder', 'verbo', 'Impedir, dificultar', 'Lack of sleep can hinder learning.', 6, 'avancado', 'geral'),
('Imperative', 'adjetivo/substantivo', 'Imperativo, essencial', 'It is imperative to act now.', 6, 'avancado', 'geral'),
('Inadvertently', 'adverbio', 'Inadvertidamente', 'I inadvertently deleted the file.', 6, 'avancado', 'geral'),
('Juxtapose', 'verbo', 'Justapor', 'The artist juxtaposes old and new.', 6, 'avancado', 'academico'),
('Mitigate', 'verbo', 'Mitigar, atenuar', 'We need to mitigate the risks.', 6, 'avancado', 'negocios'),
('Nuance', 'substantivo', 'Nuance, sutileza', 'There are many nuances in English.', 6, 'avancado', 'academico'),
('Paradigm', 'substantivo', 'Paradigma', 'This is a paradigm shift.', 6, 'avancado', 'academico'),
('Pragmatic', 'adjetivo', 'Pragmatico, pratico', 'We need a pragmatic approach.', 6, 'avancado', 'negocios'),
('Prevalent', 'adjetivo', 'Prevalente, predominante', 'English is prevalent in business.', 6, 'avancado', 'geral'),
('Reconcile', 'verbo', 'Reconciliar', 'They reconciled after the argument.', 6, 'avancado', 'geral'),
('Resilient', 'adjetivo', 'Resiliente', 'She is a resilient person.', 6, 'avancado', 'geral'),
('Scrutinize', 'verbo', 'Escrutinar, examinar', 'They scrutinized every detail.', 6, 'avancado', 'academico'),
('Setback', 'substantivo', 'Reves, contratempo', 'Don''t let setbacks discourage you.', 6, 'avancado', 'geral'),
('Streamline', 'verbo', 'Otimizar, simplificar', 'We need to streamline the process.', 6, 'avancado', 'negocios'),
('Versatile', 'adjetivo', 'Versatil', 'English is a very versatile language.', 6, 'avancado', 'geral'),
('Worthwhile', 'adjetivo', 'Que vale a pena', 'Learning English is worthwhile.', 6, 'avancado', 'geral')
ON CONFLICT (word, month) DO NOTHING;


-- ==================== PHRASAL VERBS (60 - 10 por mes) ====================
INSERT INTO "PhrasalVerb" (phrasal, meaning, example, month) VALUES
-- Mes 1
('Look up', 'Procurar (informacao)', 'Look up the word in the dictionary.', 1),
('Give up', 'Desistir', 'Never give up on your dreams.', 1),
('Wake up', 'Acordar', 'I wake up at 7 every morning.', 1),
('Turn on', 'Ligar (aparelho)', 'Turn on the TV, please.', 1),
('Turn off', 'Desligar (aparelho)', 'Turn off the lights when you leave.', 1),
('Come back', 'Voltar', 'When are you coming back?', 1),
('Sit down', 'Sentar', 'Please sit down.', 1),
('Stand up', 'Levantar', 'Stand up and stretch.', 1),
('Pick up', 'Pegar, buscar', 'Can you pick up the kids?', 1),
('Put on', 'Vestir, colocar', 'Put on your jacket, it''s cold.', 1),
-- Mes 2
('Find out', 'Descobrir', 'I need to find out the truth.', 2),
('Go on', 'Continuar', 'Please go on with your story.', 2),
('Come up with', 'Inventar, ter uma ideia', 'She came up with a great idea.', 2),
('Run out of', 'Ficar sem', 'We ran out of milk.', 2),
('Look forward to', 'Aguardar ansiosamente', 'I look forward to your reply.', 2),
('Get along with', 'Dar-se bem com', 'Do you get along with your neighbors?', 2),
('Take care of', 'Cuidar de', 'Take care of yourself.', 2),
('Make up', 'Inventar / Fazer as pazes', 'Don''t make up excuses.', 2),
('Point out', 'Apontar, indicar', 'She pointed out the mistake.', 2),
('Bring up', 'Mencionar, criar (filhos)', 'Don''t bring up that topic again.', 2),
-- Mes 3
('Break down', 'Quebrar, ter pane / Desmoronar', 'My car broke down on the highway.', 3),
('Carry on', 'Continuar, prosseguir', 'Carry on with your work.', 3),
('Cut off', 'Cortar, interromper', 'The call was cut off.', 3),
('Drop off', 'Deixar (alguem/algo)', 'I''ll drop you off at the station.', 3),
('End up', 'Acabar, terminar', 'We ended up staying home.', 3),
('Figure out', 'Resolver, entender', 'I can''t figure out this problem.', 3),
('Get over', 'Superar', 'She got over her fear of flying.', 3),
('Hold on', 'Esperar, aguardar', 'Hold on a second, please.', 3),
('Keep up with', 'Acompanhar, manter o ritmo', 'I can''t keep up with the news.', 3),
('Look into', 'Investigar', 'The police are looking into it.', 3),
-- Mes 4
('Put off', 'Adiar', 'Don''t put off your homework.', 4),
('Set up', 'Configurar, montar', 'We need to set up the equipment.', 4),
('Show up', 'Aparecer', 'He didn''t show up for the meeting.', 4),
('Take off', 'Decolar / Tirar (roupa)', 'The plane took off on time.', 4),
('Throw away', 'Jogar fora', 'Don''t throw away your notes.', 4),
('Turn down', 'Recusar / Abaixar volume', 'She turned down the job offer.', 4),
('Work out', 'Resolver / Malhar', 'Everything worked out in the end.', 4),
('Back up', 'Apoiar / Fazer backup', 'I need to back up my files.', 4),
('Call off', 'Cancelar', 'They called off the event.', 4),
('Catch up', 'Alcancar, pôr em dia', 'Let''s catch up over coffee.', 4),
-- Mes 5
('Come across', 'Encontrar por acaso', 'I came across an interesting article.', 5),
('Count on', 'Contar com', 'You can count on me.', 5),
('Deal with', 'Lidar com', 'How do you deal with stress?', 5),
('Fall behind', 'Ficar para tras', 'Don''t fall behind on your studies.', 5),
('Fill in', 'Preencher', 'Please fill in the form.', 5),
('Go through', 'Passar por, examinar', 'Let''s go through the document.', 5),
('Hand in', 'Entregar', 'Hand in your assignment by Friday.', 5),
('Lay off', 'Demitir', 'The company laid off 200 workers.', 5),
('Pull off', 'Conseguir (algo dificil)', 'She pulled off an amazing presentation.', 5),
('Rule out', 'Descartar, eliminar', 'We can''t rule out that option.', 5),
-- Mes 6
('Boil down to', 'Resumir-se a', 'It all boils down to practice.', 6),
('Brush up on', 'Revisar, relembrar', 'I need to brush up on my grammar.', 6),
('Dive into', 'Mergulhar em, aprofundar', 'Let''s dive into the topic.', 6),
('Draw up', 'Elaborar, redigir', 'We need to draw up a plan.', 6),
('Iron out', 'Resolver (problemas)', 'We need to iron out the details.', 6),
('Live up to', 'Corresponder a', 'He lived up to expectations.', 6),
('Narrow down', 'Reduzir opcoes', 'Let''s narrow down the list.', 6),
('Phase out', 'Eliminar gradualmente', 'They are phasing out the old system.', 6),
('Spell out', 'Explicar detalhadamente', 'Let me spell it out for you.', 6),
('Wrap up', 'Finalizar, concluir', 'Let''s wrap up this meeting.', 6)
ON CONFLICT (phrasal, month) DO NOTHING;


-- ==================== EXPRESSIONS (30 - 5 por mes) ====================
INSERT INTO "Expression" (expression, meaning, example, month, category) VALUES
-- Mes 1
('Break a leg', 'Boa sorte (usado em teatro/provas)', 'Break a leg on your exam tomorrow!', 1, 'idiom'),
('Piece of cake', 'Muito facil, moleza', 'The test was a piece of cake.', 1, 'idiom'),
('Hit the books', 'Estudar bastante', 'I need to hit the books tonight.', 1, 'idiom'),
('No worries', 'Sem problemas, de nada', 'No worries, I can help you.', 1, 'informal'),
('My bad', 'Erro meu, culpa minha', 'Oh, my bad! I forgot to call you.', 1, 'slang'),
-- Mes 2
('Under the weather', 'Se sentindo mal, doente', 'I''m feeling under the weather today.', 2, 'idiom'),
('Cost an arm and a leg', 'Custar muito caro', 'That car costs an arm and a leg.', 2, 'idiom'),
('It''s up to you', 'Depende de voce, voce que decide', 'It''s up to you where we eat.', 2, 'informal'),
('No big deal', 'Nao e nada demais', 'It''s no big deal, don''t worry.', 2, 'informal'),
('Hang in there', 'Aguente firme', 'Things will get better. Hang in there!', 2, 'idiom'),
-- Mes 3
('Once in a blue moon', 'Muito raramente', 'I go to the gym once in a blue moon.', 3, 'idiom'),
('Call it a day', 'Encerrar por hoje', 'I''m tired. Let''s call it a day.', 3, 'idiom'),
('Get the hang of it', 'Pegar o jeito', 'You''ll get the hang of it soon.', 3, 'idiom'),
('On the same page', 'Em acordo, alinhados', 'Let''s make sure we''re on the same page.', 3, 'idiom'),
('Speak of the devil', 'Falando no diabo', 'Speak of the devil! We were just talking about you.', 3, 'idiom'),
-- Mes 4
('Think outside the box', 'Pensar fora da caixa', 'We need to think outside the box.', 4, 'idiom'),
('The ball is in your court', 'A decisao e sua', 'I made my offer. The ball is in your court.', 4, 'idiom'),
('Get out of hand', 'Sair do controle', 'The party got out of hand.', 4, 'idiom'),
('A blessing in disguise', 'Mal que vem para bem', 'Losing that job was a blessing in disguise.', 4, 'idiom'),
('Beat around the bush', 'Enrolar, nao ir direto ao ponto', 'Stop beating around the bush and tell me.', 4, 'idiom'),
-- Mes 5
('The elephant in the room', 'O assunto que ninguem quer tocar', 'Let''s address the elephant in the room.', 5, 'idiom'),
('Burn the midnight oil', 'Trabalhar/estudar ate tarde', 'I''ve been burning the midnight oil studying.', 5, 'idiom'),
('Go the extra mile', 'Fazer mais do que o esperado', 'She always goes the extra mile.', 5, 'idiom'),
('Cut to the chase', 'Ir direto ao ponto', 'Let me cut to the chase.', 5, 'idiom'),
('Hit the nail on the head', 'Acertar em cheio', 'You hit the nail on the head with that answer.', 5, 'idiom'),
-- Mes 6
('Back to square one', 'De volta a estaca zero', 'The project failed. Back to square one.', 6, 'idiom'),
('In a nutshell', 'Resumindo', 'In a nutshell, we need more practice.', 6, 'idiom'),
('Actions speak louder than words', 'Acoes valem mais que palavras', 'Don''t just promise. Actions speak louder than words.', 6, 'formal'),
('At the end of the day', 'No final das contas', 'At the end of the day, practice is key.', 6, 'informal'),
('The sky is the limit', 'O ceu e o limite', 'With English, the sky is the limit!', 6, 'idiom')
ON CONFLICT (expression, month) DO NOTHING;


-- ==================== GRAMMAR TIPS (30 - 5 por mes) ====================
INSERT INTO "GrammarTip" (title, explanation, examples, month, category) VALUES
-- Mes 1
('Verbo To Be (Presente)', 'O verbo TO BE significa SER ou ESTAR. Conjugacao: I am, You are, He/She/It is, We are, They are. Use para descrever estados, profissoes e localizacoes.', ARRAY['I am a student. (Eu sou estudante)', 'She is happy. (Ela esta feliz)', 'They are from Brazil. (Eles sao do Brasil)', 'We are at home. (Nos estamos em casa)'], 1, 'tempos verbais'),
('Simple Present', 'Usado para habitos, rotinas e verdades gerais. Estrutura: Sujeito + verbo (base). Para he/she/it, adicione -s ou -es ao verbo.', ARRAY['I study every day. (Eu estudo todo dia)', 'She works at a bank. (Ela trabalha em um banco)', 'He watches TV at night. (Ele assiste TV a noite)', 'Water boils at 100 degrees. (A agua ferve a 100 graus)'], 1, 'tempos verbais'),
('Artigos A / An / The', 'A = antes de sons de consoante. AN = antes de sons de vogal. THE = artigo definido (algo especifico).', ARRAY['I have a book. (Eu tenho um livro)', 'She is an engineer. (Ela e uma engenheira)', 'The car is red. (O carro e vermelho)', 'I saw an hour ago. (Eu vi uma hora atras - H mudo)'], 1, 'artigos'),
('Pronomes Pessoais e Possessivos', 'Pessoais: I, you, he, she, it, we, they. Possessivos: my, your, his, her, its, our, their. Nunca confunda its (dele/dela coisa) com it''s (it is).', ARRAY['I love my family. (Eu amo minha familia)', 'She forgot her keys. (Ela esqueceu as chaves dela)', 'It''s a beautiful day. Its color is blue. (E um lindo dia. Sua cor e azul)'], 1, 'pronomes'),
('Plural dos Substantivos', 'Regra geral: adicione -s. Palavras terminadas em s/sh/ch/x/z: adicione -es. Terminadas em consoante+y: troque y por -ies. Existem plurais irregulares: man>men, child>children, foot>feet.', ARRAY['book > books, car > cars', 'bus > buses, watch > watches', 'city > cities, baby > babies', 'man > men, woman > women, child > children'], 1, 'geral'),
-- Mes 2
('Present Continuous', 'Usado para acoes acontecendo AGORA ou planos futuros proximos. Estrutura: Sujeito + am/is/are + verbo-ING.', ARRAY['I am studying right now. (Estou estudando agora)', 'She is working from home today. (Ela esta trabalhando de casa)', 'We are meeting tomorrow. (Vamos nos encontrar amanha)', 'They are not coming. (Eles nao vao vir)'], 2, 'tempos verbais'),
('Simple Past (Regular)', 'Para acoes no passado. Verbos regulares: adicione -ED. Estrutura negativa: did not (didn''t) + verbo base. Pergunta: Did + sujeito + verbo base?', ARRAY['I worked yesterday. (Eu trabalhei ontem)', 'She studied all night. (Ela estudou a noite toda)', 'Did you watch the movie? (Voce assistiu o filme?)', 'I didn''t understand. (Eu nao entendi)'], 2, 'tempos verbais'),
('Simple Past (Irregular)', 'Muitos verbos comuns sao irregulares no passado. Nao ha regra - e preciso memorizar: go>went, see>saw, eat>ate, have>had, do>did, make>made, take>took, come>came, get>got, know>knew.', ARRAY['I went to school. (Eu fui para escola)', 'She saw her friend. (Ela viu a amiga)', 'We had dinner together. (Jantamos juntos)', 'He made a mistake. (Ele cometeu um erro)'], 2, 'tempos verbais'),
('Preposicoes de Tempo: In, On, At', 'IN = meses, anos, estacoes, periodos longos. ON = dias e datas. AT = horas e momentos especificos.', ARRAY['in January, in 2024, in the morning', 'on Monday, on July 4th, on my birthday', 'at 3 o''clock, at noon, at night', 'I was born in 1995, on March 15th, at 8 AM.'], 2, 'preposicoes'),
('Preposicoes de Lugar: In, On, At', 'IN = dentro de (espacos fechados, cidades, paises). ON = em cima de (superficies). AT = em (locais especificos, enderecos).', ARRAY['She lives in Brazil. (Ela mora no Brasil)', 'The book is on the table. (O livro esta na mesa)', 'I am at the office. (Estou no escritorio)', 'He is in the car, on the phone, at the corner.'], 2, 'preposicoes'),
-- Mes 3
('Present Perfect', 'Conecta passado ao presente. Estrutura: have/has + past participle. Usado para experiencias, acoes recentes e duracoes ate agora.', ARRAY['I have visited London. (Eu ja visitei Londres)', 'She has lived here for 5 years. (Ela mora aqui ha 5 anos)', 'Have you ever eaten sushi? (Voce ja comeu sushi?)', 'I haven''t finished yet. (Ainda nao terminei)'], 3, 'tempos verbais'),
('Comparativos e Superlativos', 'Comparativo: adjetivo curto + -er (ou more + adjetivo longo). Superlativo: the + adjetivo + -est (ou the most + adjetivo).', ARRAY['She is taller than me. (Ela e mais alta que eu)', 'This book is more interesting. (Mais interessante)', 'He is the tallest in the class. (O mais alto)', 'English is the most spoken language. (A mais falada)'], 3, 'geral'),
('Modais: Can, Could, Should', 'CAN = capacidade/permissao. COULD = possibilidade/pedido educado. SHOULD = conselho/sugestao. Seguidos de verbo base (sem to).', ARRAY['I can speak English. (Eu sei falar ingles)', 'Could you help me? (Voce poderia me ajudar?)', 'You should study more. (Voce deveria estudar mais)', 'She can''t swim. (Ela nao sabe nadar)'], 3, 'geral'),
('Condicionais: If + Present', 'Primeira condicional: If + present, will + base verb. Para situacoes reais/provaveis no futuro.', ARRAY['If it rains, I will stay home. (Se chover, fico em casa)', 'If you study hard, you will pass. (Se estudar, vai passar)', 'I will help you if you ask. (Te ajudo se pedir)', 'If she calls, tell her I''m busy. (Se ela ligar, diga que estou ocupado)'], 3, 'geral'),
('Relative Clauses: Who, Which, That', 'WHO = para pessoas. WHICH = para coisas. THAT = para ambos (informal). Adicionam informacao ao substantivo.', ARRAY['The woman who lives next door is nice. (A mulher que mora ao lado e legal)', 'The book which I read was great. (O livro que li era otimo)', 'The car that he bought is red. (O carro que ele comprou e vermelho)', 'I know a guy who speaks 5 languages.'], 3, 'pronomes'),
-- Mes 4
('Past Continuous', 'Para acoes em andamento no passado. Estrutura: was/were + verbo-ING. Frequentemente usado com when/while.', ARRAY['I was studying when she called. (Eu estava estudando quando ela ligou)', 'They were playing while it was raining. (Estavam jogando enquanto chovia)', 'What were you doing at 9 PM? (O que voce estava fazendo as 21h?)', 'She was sleeping when the alarm rang.'], 4, 'tempos verbais'),
('Future with Will vs Going To', 'WILL = decisoes espontaneas, previsoes, promessas. GOING TO = planos ja decididos, previsoes com evidencia.', ARRAY['I will help you. (Eu vou te ajudar - decisao agora)', 'I''m going to study abroad next year. (Vou estudar fora - plano)', 'It''s going to rain. (Vai chover - vejo as nuvens)', 'Don''t worry, I will call you. (Promessa)'], 4, 'tempos verbais'),
('Passive Voice', 'Quando o foco e na acao, nao em quem fez. Estrutura: Sujeito + to be + past participle (+ by agent).', ARRAY['The book was written by Tolkien. (O livro foi escrito por Tolkien)', 'English is spoken worldwide. (Ingles e falado mundialmente)', 'The cake was made by my mom. (O bolo foi feito pela minha mae)', 'The meeting has been cancelled. (A reuniao foi cancelada)'], 4, 'geral'),
('Reported Speech', 'Para relatar o que alguem disse. Mude o tempo verbal um passo para tras. say>said, am>was, will>would.', ARRAY['She said she was tired. (Ela disse que estava cansada)', 'He told me he would come. (Ele me disse que viria)', 'They said they had finished. (Disseram que tinham terminado)', 'She asked if I was happy. (Ela perguntou se eu era feliz)'], 4, 'geral'),
('Tag Questions', 'Mini-perguntas no final para confirmar. Se a frase e positiva, a tag e negativa e vice-versa.', ARRAY['You speak English, don''t you? (Voce fala ingles, nao?)', 'She is coming, isn''t she? (Ela vem, nao?)', 'They haven''t arrived, have they? (Eles nao chegaram, chegaram?)', 'It was fun, wasn''t it? (Foi divertido, nao foi?)'], 4, 'geral'),
-- Mes 5
('Past Perfect', 'Para uma acao ANTES de outra no passado. Estrutura: had + past participle. O "passado do passado".', ARRAY['I had already eaten when she arrived. (Eu ja tinha comido quando ela chegou)', 'They had left before the rain started. (Tinham saido antes da chuva)', 'She told me she had been to Paris. (Ela me disse que tinha ido a Paris)', 'Had you ever seen snow before? (Voce ja tinha visto neve?)'], 5, 'tempos verbais'),
('Conjuncoes Avancadas', 'Although/Though = embora. However = no entanto. Therefore = portanto. Moreover = alem disso. Nevertheless = apesar disso.', ARRAY['Although it was late, she kept studying. (Embora fosse tarde, continuou)', 'The test was hard. However, I passed. (No entanto, passei)', 'He practiced daily. Therefore, he improved. (Portanto, melhorou)', 'Moreover, the results were impressive. (Alem disso, os resultados)'], 5, 'conjuncoes'),
('Phrasal Verbs como Vocabulario', 'Phrasal verbs mudam completamente de sentido com particulas diferentes. Look up (procurar), look after (cuidar), look into (investigar), look forward to (aguardar).', ARRAY['Look up the word. (Procure a palavra)', 'She looks after her kids. (Ela cuida dos filhos)', 'We''re looking into the issue. (Estamos investigando)', 'I look forward to meeting you. (Aguardo ansioso)'], 5, 'geral'),
('Gerund vs Infinitive', 'Alguns verbos pedem gerund (-ing): enjoy, avoid, suggest. Outros pedem infinitive (to + verb): want, decide, plan. Alguns mudam de sentido: stop doing vs stop to do.', ARRAY['I enjoy reading books. (Gosto de ler livros)', 'She decided to study abroad. (Decidiu estudar fora)', 'Stop talking! (Pare de falar!) vs Stop to talk. (Pare para falar)', 'I avoid eating fast food. (Evito comer fast food)'], 5, 'geral'),
('Inversao para Enfase', 'Em linguagem formal, inverta sujeito e auxiliar para dar enfase. Never have I, Not only did, Rarely do.', ARRAY['Never have I seen such beauty. (Nunca vi tanta beleza)', 'Not only did she pass, but she got the highest grade.', 'Rarely do we get this opportunity. (Raramente temos essa chance)', 'Hardly had I arrived when it started raining.'], 5, 'geral'),
-- Mes 6
('Mixed Conditionals', 'Mistura de tempos nas condicionais. If + past perfect, would + base (passado irreal > resultado presente). If + past simple, would have + PP (presente irreal > resultado passado).', ARRAY['If I had studied harder, I would be fluent now. (Se tivesse estudado mais, seria fluente agora)', 'If she were braver, she would have applied. (Se fosse mais corajosa, teria se candidatado)', 'If they had left earlier, they would be here now.', 'If I knew French, I would have taken that job in Paris.'], 6, 'geral'),
('Subjuntivo (Wish/If only)', 'WISH + past simple = desejo sobre o presente. WISH + past perfect = arrependimento sobre o passado. WISH + would = reclamacao/pedido de mudanca.', ARRAY['I wish I spoke fluent English. (Quem dera eu falasse ingles fluente)', 'I wish I had started earlier. (Quem dera tivesse comecado antes)', 'I wish it would stop raining. (Quem dera parasse de chover)', 'If only I had more time. (Se eu tivesse mais tempo)'], 6, 'geral'),
('Cleft Sentences (It is/was... that)', 'Usadas para dar enfase a uma parte especifica da frase. Estrutura: It is/was + enfase + that/who + resto.', ARRAY['It was John who broke the window. (Foi o John que quebrou a janela)', 'It is practice that makes you fluent. (E a pratica que te deixa fluente)', 'It was in London that I first heard English spoken naturally.', 'What I need is more practice. (O que eu preciso e mais pratica)'], 6, 'geral'),
('Conectores de Discurso', 'Para textos e fala fluente: In addition (alem disso), On the other hand (por outro lado), As a result (como resultado), In conclusion (em conclusao), As far as I know (ate onde eu sei).', ARRAY['In addition, exercise improves memory. (Alem disso)', 'On the other hand, some prefer apps. (Por outro lado)', 'As a result, more people are learning English. (Como resultado)', 'In conclusion, consistency is the key. (Em conclusao)'], 6, 'geral'),
('Collocations Comuns', 'Combinacoes naturais de palavras em ingles. Nao se traduz literalmente - se aprende como blocos.', ARRAY['make a decision (tomar uma decisao) - NAO do a decision', 'do homework (fazer tarefa) - NAO make homework', 'take a break (fazer uma pausa) - NAO make a break', 'pay attention (prestar atencao) - NAO give attention'], 6, 'geral')
ON CONFLICT (title, month) DO NOTHING;


-- ==================== VIDEOS (30 - 5 por mes) ====================
INSERT INTO "Video" (title, "youtubeId", channel, duration, description, month, category, level) VALUES
-- Mes 1
('English for Beginners - Basic Conversation', '4MlVGJazIJo', 'Shaw English Online', '20:00', 'Conversacoes basicas para iniciantes', 1, 'conversacao', 'iniciante'),
('Learn English Pronunciation in 30 Minutes', 'n4JLFac_TJA', 'Rachel''s English', '30:00', 'Guia completo de pronuncia americana', 1, 'pronuncia', 'iniciante'),
('100 English Words You Need to Know', 'PKa1vEAYVGo', 'English with Lucy', '15:00', '100 palavras mais comuns em ingles', 1, 'vocabulario', 'iniciante'),
('English Grammar for Beginners', 'D3FvGLZBhA4', 'mmmEnglish', '12:00', 'Gramatica basica - verbo to be e presente simples', 1, 'gramatica', 'iniciante'),
('Daily English Listening Practice', 'kd_fFWBJgEY', 'English Addict with Mr Steve', '18:00', 'Pratica de listening com conversas do dia a dia', 1, 'listening', 'iniciante'),
-- Mes 2
('Phrasal Verbs for Daily Life', 'n0lMXCdhVnQ', 'English with Lucy', '16:00', 'Os phrasal verbs mais usados no cotidiano', 2, 'vocabulario', 'iniciante'),
('American vs British Pronunciation', '13W0bh8bJw0', 'Rachel''s English', '20:00', 'Diferencas de pronuncia entre americano e britanico', 2, 'pronuncia', 'intermediario'),
('Past Tense in 15 Minutes', 'Ug6GjA8dXxs', 'JamesESL English Lessons', '15:00', 'Dominando o passado simples', 2, 'gramatica', 'iniciante'),
('How to Order Food in English', '7f7pK9GaLSM', 'English Speaking Course', '10:00', 'Vocabulario e frases para restaurantes', 2, 'conversacao', 'iniciante'),
('English Listening with Movies', 'K-ODAYCqRxM', 'English with Lucy', '22:00', 'Aprenda ingles com cenas de filmes famosos', 2, 'listening', 'intermediario'),
-- Mes 3
('How to Think in English', 'SsL1Nzl_H0s', 'Linguamarina', '12:00', 'Tecnicas para parar de traduzir mentalmente', 3, 'conversacao', 'intermediario'),
('Connected Speech in English', '3-FfNJOJIu0', 'Rachel''s English', '18:00', 'Como nativos conectam palavras na fala', 3, 'pronuncia', 'intermediario'),
('Present Perfect Explained Simply', '6bSNfyGb-rQ', 'BBC Learning English', '10:00', 'Explicacao clara do present perfect', 3, 'gramatica', 'intermediario'),
('English Idioms You Must Know', '1UpA5G8fXOA', 'English with Lucy', '14:00', 'Expressoes idiomaticas essenciais', 3, 'vocabulario', 'intermediario'),
('Understand FAST English Speakers', 'V3-a1PBkyRA', 'Speak English With Vanessa', '20:00', 'Tecnicas para entender ingles rapido', 3, 'listening', 'intermediario'),
-- Mes 4
('How to Give Opinions in English', 'I9QGW-J1uRk', 'English Speaking Course', '12:00', 'Frases e estruturas para dar opinioes', 4, 'conversacao', 'intermediario'),
('English for Job Interviews', 'naIkpQ2PQ-U', 'Learn English with Bob', '25:00', 'Preparacao completa para entrevistas', 4, 'conversacao', 'intermediario'),
('Passive Voice Made Easy', 'q6bJsY2XOQY', 'JamesESL English Lessons', '14:00', 'Entendendo a voz passiva', 4, 'gramatica', 'intermediario'),
('Business English Vocabulary', 'k9qHVlaMKbQ', 'English with Lucy', '16:00', 'Vocabulario essencial para negocios', 4, 'vocabulario', 'intermediario'),
('English Culture: Do''s and Don''ts', 'GnNJAE0_0WM', 'BBC Learning English', '10:00', 'Gafes culturais para evitar em paises anglófonos', 4, 'cultura', 'intermediario'),
-- Mes 5
('Advanced Grammar: Mixed Conditionals', 'f7IqV4lmjbU', 'English with Lucy', '14:00', 'Condicionais mistas explicadas', 5, 'gramatica', 'avancado'),
('How to Sound More Natural in English', 'dQw4w9WgXcQ', 'Rachel''s English', '22:00', 'Dicas para soar mais natural', 5, 'pronuncia', 'avancado'),
('Academic English Vocabulary', 'h_vxPp1aOQk', 'English with Lucy', '18:00', 'Vocabulario academico avancado', 5, 'vocabulario', 'avancado'),
('Debate in English: How to Argue', 'Cd-yGsVCi5s', 'English Speaking Course', '15:00', 'Estruturas para debates e argumentacao', 5, 'conversacao', 'avancado'),
('Advanced Listening: TED Talks', 'hMineBDiASQ', 'TED', '20:00', 'Pratica de listening com TED Talks', 5, 'listening', 'avancado'),
-- Mes 6
('Think Like a Native Speaker', 'QJKm4yTqHq8', 'Linguamarina', '15:00', 'Como pensar como um nativo', 6, 'conversacao', 'avancado'),
('Formal vs Informal English', 'WbW-GZbR-fQ', 'BBC Learning English', '12:00', 'Quando usar linguagem formal vs informal', 6, 'vocabulario', 'avancado'),
('English Fluency: Final Tips', 'dBQ2SLhi9nU', 'English with Lucy', '20:00', 'Dicas finais para alcancar fluencia', 6, 'conversacao', 'avancado'),
('Writing in English: Academic Style', 'wZVjjJqN38I', 'Oxford Online English', '18:00', 'Escrita academica em ingles', 6, 'gramatica', 'avancado'),
('Advanced Pronunciation Masterclass', 'Wn3YByxSMho', 'Rachel''s English', '25:00', 'Aula avancada de pronuncia e entonacao', 6, 'pronuncia', 'avancado')
ON CONFLICT ("youtubeId") DO NOTHING;


-- ==================== PODCASTS (24 - 4 por mes) ====================
INSERT INTO "Podcast" (name, description, url, level, month, category) VALUES
-- Mes 1
('BBC 6 Minute English', 'Programas curtos de 6 minutos sobre topicos variados - perfeito para iniciantes', 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english', 'iniciante', 1, 'conversacao'),
('Espresso English Podcast', 'Licoes curtas e diretas para quem esta comecando', 'https://www.espressoenglish.net/english-learning-podcast/', 'iniciante', 1, 'geral'),
('Voice of America - Learning English', 'Noticias em ingles lento e claro - ideal para treinar ouvido', 'https://learningenglish.voanews.com/', 'iniciante', 1, 'noticias'),
('English Class 101', 'Licoes estruturadas de ingles para todos os niveis', 'https://www.englishclass101.com/', 'iniciante', 1, 'geral'),
-- Mes 2
('All Ears English', 'Conversas naturais sobre a vida nos EUA - otimo para listening', 'https://www.allearsenglish.com/', 'intermediario', 2, 'conversacao'),
('Culips English Podcast', 'Expressoes e girias do dia a dia explicadas', 'https://www.culips.com/', 'intermediario', 2, 'conversacao'),
('Luke''s English Podcast', 'Professor britanico com humor e historias envolventes', 'https://teacherluke.co.uk/', 'intermediario', 2, 'entretenimento'),
('Podcasts in English', 'Episodios organizados por nivel com transcricoes', 'https://www.podcastsinenglish.com/', 'iniciante', 2, 'geral'),
-- Mes 3
('The English We Speak (BBC)', 'Uma expressao idiomatica nova por episodio - 3 minutos', 'https://www.bbc.co.uk/learningenglish/english/features/the-english-we-speak', 'intermediario', 3, 'conversacao'),
('Business English Pod', 'Ingles para negocios e ambiente profissional', 'https://www.businessenglishpod.com/', 'intermediario', 3, 'negocios'),
('Effortless English Podcast', 'Metodo de aprendizado natural sem decorar regras', 'https://effortlessenglishclub.com/', 'intermediario', 3, 'geral'),
('EnglishPod', 'Dialogos reais com explicacoes de vocabulario e gramatica', 'https://www.englishpod.com/', 'intermediario', 3, 'conversacao'),
-- Mes 4
('TED Talks Daily', 'Ideias inspiradoras de palestrantes do mundo todo', 'https://www.ted.com/podcasts/ted-talks-daily', 'intermediario', 4, 'geral'),
('Stuff You Should Know', 'Podcast popular sobre curiosidades - ingles natural', 'https://www.iheart.com/podcast/105-stuff-you-should-know-26940277/', 'intermediario', 4, 'entretenimento'),
('Grammar Girl', 'Dicas rapidas de gramatica em ingles', 'https://www.quickanddirtytips.com/grammar-girl', 'intermediario', 4, 'geral'),
('The Moth', 'Historias reais contadas ao vivo - otimo para narrative listening', 'https://themoth.org/podcast', 'intermediario', 4, 'entretenimento'),
-- Mes 5
('Freakonomics Radio', 'Economia e comportamento humano - vocabulario avancado', 'https://freakonomics.com/podcasts/', 'avancado', 5, 'geral'),
('Radiolab', 'Ciencia e filosofia com narrativa envolvente', 'https://radiolab.org/', 'avancado', 5, 'geral'),
('Planet Money (NPR)', 'Economia explicada de forma acessivel e divertida', 'https://www.npr.org/sections/money/', 'avancado', 5, 'negocios'),
('99% Invisible', 'Design e arquitetura - vocabulario tecnico e criativo', 'https://99percentinvisible.org/', 'avancado', 5, 'geral'),
-- Mes 6
('Serial', 'Jornalismo investigativo - narrativa complexa e envolvente', 'https://serialpodcast.org/', 'avancado', 6, 'entretenimento'),
('This American Life', 'Historias reais da America - ingles 100% nativo', 'https://www.thisamericanlife.org/', 'avancado', 6, 'entretenimento'),
('The Daily (New York Times)', 'Noticias aprofundadas - vocabulario jornalistico avancado', 'https://www.nytimes.com/column/the-daily', 'avancado', 6, 'noticias'),
('Hardcore History', 'Historia contada de forma epica - vocabulario rico e avancado', 'https://www.dancarlin.com/hardcore-history-series/', 'avancado', 6, 'historia')
ON CONFLICT (name, month) DO NOTHING;


-- ==================== SONGS (18 - 3 por mes) ====================
INSERT INTO "Song" (slug, title, artist, "youtubeId", level, themes, "learningNotes", month) VALUES
('dont-stop-believin', 'Don''t Stop Believin''', 'Journey', '1k8craCGpgs', 'Iniciante', ARRAY['perseveranca', 'sonhos'], 'Otima para praticar present continuous e vocabulario basico', 1),
('let-it-be', 'Let It Be', 'The Beatles', 'QDYfEBY9NM4', 'Iniciante', ARRAY['aceitacao', 'paz'], 'Vocabulario simples, ritmo lento. Perfeita para iniciantes', 1),
('imagine', 'Imagine', 'John Lennon', 'YkgkThdzX-8', 'Iniciante', ARRAY['paz', 'mundo ideal'], 'Frases curtas e claras. Excelente para pronuncia', 1),
('someone-like-you', 'Someone Like You', 'Adele', 'hLQl3WQQoQ0', 'Intermediario', ARRAY['amor', 'saudade'], 'Boa para praticar past tense e sentimentos', 2),
('shape-of-you', 'Shape of You', 'Ed Sheeran', 'JGwWNGJdvx8', 'Iniciante', ARRAY['romance', 'cotidiano'], 'Vocabulario moderno e coloquial. Ritmo otimo para shadowing', 2),
('counting-stars', 'Counting Stars', 'OneRepublic', 'hT_nvWreIhg', 'Intermediario', ARRAY['ambicao', 'mudanca'], 'Phrasal verbs e vocabulario emocional', 2),
('hotel-california', 'Hotel California', 'Eagles', 'BciS5krYL80', 'Intermediario', ARRAY['misterio', 'metafora'], 'Rica em linguagem figurativa e vocabulario avancado', 3),
('bohemian-rhapsody', 'Bohemian Rhapsody', 'Queen', 'fJ9rUzIMcZQ', 'Avancado', ARRAY['drama', 'complexidade'], 'Vocabulario variado, mudancas de ritmo. Desafio de listening', 3),
('shallow', 'Shallow', 'Lady Gaga & Bradley Cooper', '8GBiXPTnM6Q', 'Intermediario', ARRAY['coragem', 'amor'], 'Emocao na voz, bom para entonacao e pronuncia', 3),
('fix-you', 'Fix You', 'Coldplay', 'k4V3Mo61fJM', 'Intermediario', ARRAY['superacao', 'apoio'], 'Condicionais e vocabulario emocional', 4),
('believer', 'Believer', 'Imagine Dragons', '7wtfhZwyrcc', 'Intermediario', ARRAY['forca', 'superacao'], 'Ritmo forte, bom para pronuncia enfatica', 4),
('perfect', 'Perfect', 'Ed Sheeran', '2Vv-BfVoq4g', 'Iniciante', ARRAY['romance', 'simplicidade'], 'Vocabulario simples e pronuncia clara', 4),
('viva-la-vida', 'Viva la Vida', 'Coldplay', 'dvgZkm1xWPE', 'Avancado', ARRAY['historia', 'poder'], 'Vocabulario historico e metaforico rico', 5),
('lose-yourself', 'Lose Yourself', 'Eminem', '_Yhyp-_hX2s', 'Avancado', ARRAY['determinacao', 'oportunidade'], 'Ritmo rapido, otimo para listening avancado e girias', 5),
('hallelujah', 'Hallelujah', 'Leonard Cohen', 'y8AWFf7EAc4', 'Avancado', ARRAY['espiritualidade', 'poesia'], 'Linguagem poetica e vocabulario literario', 5),
('we-are-the-champions', 'We Are The Champions', 'Queen', '04854XqcfCY', 'Intermediario', ARRAY['vitoria', 'perseveranca'], 'Present perfect e vocabulario motivacional', 6),
('here-comes-the-sun', 'Here Comes The Sun', 'The Beatles', 'KQetemT1sWc', 'Iniciante', ARRAY['esperanca', 'recomeço'], 'Vocabulario simples, otima para encerrar a jornada', 6),
('dont-stop-me-now', 'Don''t Stop Me Now', 'Queen', 'HgzGwKwLmgM', 'Intermediario', ARRAY['energia', 'liberdade'], 'Phrasal verbs e vocabulario de emocoes positivas', 6)
ON CONFLICT (slug) DO NOTHING;


-- ==================== KEY PHRASES (vinculadas as Songs) ====================
-- Precisamos dos IDs das songs. Usamos subqueries.
INSERT INTO "KeyPhrase" (en, pt, "songId") VALUES
-- Don''t Stop Believin''
('Don''t stop believin''', 'Nao pare de acreditar', (SELECT id FROM "Song" WHERE slug = 'dont-stop-believin')),
('Hold on to that feeling', 'Segure esse sentimento', (SELECT id FROM "Song" WHERE slug = 'dont-stop-believin')),
('Strangers waiting', 'Estranhos esperando', (SELECT id FROM "Song" WHERE slug = 'dont-stop-believin')),
-- Let It Be
('Let it be', 'Deixe estar / Aceite', (SELECT id FROM "Song" WHERE slug = 'let-it-be')),
('There will be an answer', 'Havera uma resposta', (SELECT id FROM "Song" WHERE slug = 'let-it-be')),
('Speaking words of wisdom', 'Dizendo palavras de sabedoria', (SELECT id FROM "Song" WHERE slug = 'let-it-be')),
-- Imagine
('Imagine all the people living life in peace', 'Imagine todas as pessoas vivendo em paz', (SELECT id FROM "Song" WHERE slug = 'imagine')),
('You may say I''m a dreamer', 'Voce pode dizer que sou um sonhador', (SELECT id FROM "Song" WHERE slug = 'imagine')),
-- Someone Like You
('Never mind, I''ll find someone like you', 'Nao importa, eu vou encontrar alguem como voce', (SELECT id FROM "Song" WHERE slug = 'someone-like-you')),
('I heard that you''re settled down', 'Ouvi dizer que voce se estabilizou', (SELECT id FROM "Song" WHERE slug = 'someone-like-you')),
-- Shape of You
('I''m in love with the shape of you', 'Estou apaixonado pelo seu formato', (SELECT id FROM "Song" WHERE slug = 'shape-of-you')),
('We push and pull like a magnet do', 'A gente empurra e puxa como um ima', (SELECT id FROM "Song" WHERE slug = 'shape-of-you')),
-- Counting Stars
('Lately I''ve been losing sleep', 'Ultimamente tenho perdido o sono', (SELECT id FROM "Song" WHERE slug = 'counting-stars')),
('Everything that kills me makes me feel alive', 'Tudo que me mata me faz sentir vivo', (SELECT id FROM "Song" WHERE slug = 'counting-stars')),
-- Hotel California
('You can check out any time you like, but you can never leave', 'Voce pode fazer checkout quando quiser, mas nunca pode ir embora', (SELECT id FROM "Song" WHERE slug = 'hotel-california')),
('Welcome to the Hotel California', 'Bem-vindo ao Hotel California', (SELECT id FROM "Song" WHERE slug = 'hotel-california')),
-- Shallow
('I''m falling in all the good times', 'Estou caindo em todos os bons momentos', (SELECT id FROM "Song" WHERE slug = 'shallow')),
('Tell me something, girl', 'Me conta uma coisa, garota', (SELECT id FROM "Song" WHERE slug = 'shallow')),
-- Fix You
('Lights will guide you home', 'Luzes vao te guiar para casa', (SELECT id FROM "Song" WHERE slug = 'fix-you')),
('When you try your best but you don''t succeed', 'Quando voce tenta o seu melhor mas nao consegue', (SELECT id FROM "Song" WHERE slug = 'fix-you')),
-- Believer
('Pain! You made me a believer', 'Dor! Voce me fez um crente', (SELECT id FROM "Song" WHERE slug = 'believer')),
('First things first', 'Primeiro as coisas mais importantes', (SELECT id FROM "Song" WHERE slug = 'believer')),
-- Viva la Vida
('I used to rule the world', 'Eu costumava governar o mundo', (SELECT id FROM "Song" WHERE slug = 'viva-la-vida')),
('One minute I held the key', 'Em um minuto eu segurava a chave', (SELECT id FROM "Song" WHERE slug = 'viva-la-vida')),
-- We Are The Champions
('We are the champions, my friends', 'Nos somos os campeoes, meus amigos', (SELECT id FROM "Song" WHERE slug = 'we-are-the-champions')),
('No time for losers', 'Sem tempo para perdedores', (SELECT id FROM "Song" WHERE slug = 'we-are-the-champions'));


-- ==================== SONG VOCAB (vinculado as Songs) ====================
INSERT INTO "SongVocab" (word, meaning, "songId") VALUES
-- Don''t Stop Believin''
('believin''', 'acreditar (forma coloquial)', (SELECT id FROM "Song" WHERE slug = 'dont-stop-believin')),
('strangers', 'estranhos, desconhecidos', (SELECT id FROM "Song" WHERE slug = 'dont-stop-believin')),
('midnight', 'meia-noite', (SELECT id FROM "Song" WHERE slug = 'dont-stop-believin')),
-- Let It Be
('wisdom', 'sabedoria', (SELECT id FROM "Song" WHERE slug = 'let-it-be')),
('whisper', 'sussurrar', (SELECT id FROM "Song" WHERE slug = 'let-it-be')),
-- Imagine
('dreamer', 'sonhador', (SELECT id FROM "Song" WHERE slug = 'imagine')),
('possessions', 'posses, bens materiais', (SELECT id FROM "Song" WHERE slug = 'imagine')),
-- Someone Like You
('settled down', 'se estabilizou', (SELECT id FROM "Song" WHERE slug = 'someone-like-you')),
('bittersweet', 'agridoce', (SELECT id FROM "Song" WHERE slug = 'someone-like-you')),
-- Shape of You
('magnet', 'ima', (SELECT id FROM "Song" WHERE slug = 'shape-of-you')),
('thrifty', 'economico, barato', (SELECT id FROM "Song" WHERE slug = 'shape-of-you')),
-- Counting Stars
('surrender', 'render-se', (SELECT id FROM "Song" WHERE slug = 'counting-stars')),
('swinging', 'balancando', (SELECT id FROM "Song" WHERE slug = 'counting-stars')),
-- Hotel California
('desert', 'deserto', (SELECT id FROM "Song" WHERE slug = 'hotel-california')),
('feast', 'banquete', (SELECT id FROM "Song" WHERE slug = 'hotel-california')),
-- Shallow
('shallow', 'raso, superficial', (SELECT id FROM "Song" WHERE slug = 'shallow')),
('dive', 'mergulhar', (SELECT id FROM "Song" WHERE slug = 'shallow')),
-- Fix You
('ignite', 'acender, inflamar', (SELECT id FROM "Song" WHERE slug = 'fix-you')),
('stream', 'corrente, fluxo', (SELECT id FROM "Song" WHERE slug = 'fix-you')),
-- Viva la Vida
('shattered', 'destruido, despedacado', (SELECT id FROM "Song" WHERE slug = 'viva-la-vida')),
('wicked', 'perverso, malvado', (SELECT id FROM "Song" WHERE slug = 'viva-la-vida'));


-- ============================================================
-- FIM DO SEED! 
-- Total aproximado:
-- 15 Badges
-- ~220 Vocabulary (40+40+40+35+35+30)
-- 60 Phrasal Verbs
-- 30 Expressions
-- 30 Grammar Tips
-- 30 Videos
-- 24 Podcasts  
-- 18 Songs + ~26 KeyPhrases + ~21 SongVocab
-- ============================================================
