// GERADO por talk-tts/gen_dialogues.py. Não editar à mão.
import type { TalkDialogueDef } from './types';

export const TALK_DIALOGUES: TalkDialogueDef[] = [
 {
  "slug": "ordering-at-a-cafe",
  "title": "Ordering at a Café",
  "level": "A1",
  "description": "Peça bebida e lanche numa cafeteria.",
  "intro": "Você entra numa cafeteria pequena, numa manhã fria. A atendente Emma sorri atrás do balcão.",
  "cast": {
   "w": {
    "name": "Emma",
    "role": "Atendente"
   }
  },
  "start": "c1",
  "decisions": [
   6,
   9
  ],
  "nodes": {
   "c1": {
    "speaker": "w",
    "text": "Hi there! Welcome to Corner Café.",
    "pt": "Oi! Bem-vindo ao Corner Café.",
    "audio": "talk/dialogues/ordering-at-a-cafe/e11c3325e6c9.mp3",
    "next": "c2"
   },
   "c2": {
    "speaker": "w",
    "text": "What can I get for you today?",
    "pt": "O que vai querer hoje?",
    "audio": "talk/dialogues/ordering-at-a-cafe/2c679d05d9f2.mp3",
    "options": [
     {
      "text": "A coffee, please.",
      "pt": "Um café, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/44f058288aef.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/7d1a34981cbd.mp3",
      "next": "coffee_size"
     },
     {
      "text": "Can I have a cup of tea?",
      "pt": "Pode me ver uma xícara de chá?",
      "audio": "talk/dialogues/ordering-at-a-cafe/fde76f349c44.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/bd21bcdd5ea9.mp3",
      "next": "tea"
     },
     {
      "text": "An orange juice, please.",
      "pt": "Um suco de laranja, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/a6d0ecf21521.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/efda84e4ce3e.mp3",
      "next": "juice"
     },
     {
      "text": "I'm twenty-five years old.",
      "pt": "Tenho vinte e cinco anos.",
      "audio": "talk/dialogues/ordering-at-a-cafe/71f194d189fd.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/d3b6341a7341.mp3",
      "next": null,
      "react": {
       "text": "Sorry? I mean, what would you like to drink?",
       "pt": "Como? Quer dizer, o que você gostaria de beber?",
       "audio": "talk/dialogues/ordering-at-a-cafe/fbd8a94afac3.mp3"
      }
     }
    ]
   },
   "coffee_size": {
    "speaker": "w",
    "text": "Sure. What size would you like? Small, medium or large?",
    "pt": "Claro. Qual tamanho você quer? Pequeno, médio ou grande?",
    "audio": "talk/dialogues/ordering-at-a-cafe/caeb9570db5c.mp3",
    "options": [
     {
      "text": "Medium, please.",
      "pt": "Médio, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/ccdf515f1347.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/2fb3f8059ad2.mp3",
      "next": "coffee_milk"
     },
     {
      "text": "A large one, please.",
      "pt": "Um grande, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/7354964ad287.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/1568e782734c.mp3",
      "next": "coffee_milk"
     },
     {
      "text": "Yes, it's very cold today.",
      "pt": "Sim, está muito frio hoje.",
      "audio": "talk/dialogues/ordering-at-a-cafe/df54e559616e.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/b84ebfb2d934.mp3",
      "next": null,
      "react": {
       "text": "It is! But which size? Small, medium or large?",
       "pt": "Está mesmo! Mas qual tamanho? Pequeno, médio ou grande?",
       "audio": "talk/dialogues/ordering-at-a-cafe/22202c997362.mp3"
      }
     }
    ]
   },
   "coffee_milk": {
    "speaker": "w",
    "text": "Would you like milk in your coffee?",
    "pt": "Quer leite no seu café?",
    "audio": "talk/dialogues/ordering-at-a-cafe/900e79fd0270.mp3",
    "options": [
     {
      "text": "Yes, a little milk, please.",
      "pt": "Sim, um pouco de leite, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/92e3103b20a9.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/2f40a31556ce.mp3",
      "next": "coffee_sugar"
     },
     {
      "text": "No milk, thanks. Just black.",
      "pt": "Sem leite, obrigado. Só puro.",
      "audio": "talk/dialogues/ordering-at-a-cafe/185d454af282.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/33b2def80dd2.mp3",
      "next": "food"
     },
     {
      "text": "It's on the table.",
      "pt": "Está na mesa.",
      "audio": "talk/dialogues/ordering-at-a-cafe/5a6f644644b8.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/7c29f04a9808.mp3",
      "next": null,
      "react": {
       "text": "Hmm, I'm asking about milk. Do you want milk in your coffee?",
       "pt": "Hum, estou perguntando do leite. Você quer leite no café?",
       "audio": "talk/dialogues/ordering-at-a-cafe/aa14dc05f3ae.mp3"
      }
     }
    ]
   },
   "coffee_sugar": {
    "speaker": "w",
    "text": "And sugar?",
    "pt": "E açúcar?",
    "audio": "talk/dialogues/ordering-at-a-cafe/b60e55fc5d71.mp3",
    "options": [
     {
      "text": "One sugar, please.",
      "pt": "Um açúcar, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/fe234cbe184b.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/bf1d221528de.mp3",
      "next": "food"
     },
     {
      "text": "No sugar, thank you.",
      "pt": "Sem açúcar, obrigado.",
      "audio": "talk/dialogues/ordering-at-a-cafe/f261a630a43f.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/2bed3312818f.mp3",
      "next": "food"
     },
     {
      "text": "My name is Lucas.",
      "pt": "Meu nome é Lucas.",
      "audio": "talk/dialogues/ordering-at-a-cafe/723fc71a675e.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/ea4283ce900d.mp3",
      "next": null,
      "react": {
       "text": "Nice to meet you, Lucas! But sugar or no sugar?",
       "pt": "Prazer, Lucas! Mas com ou sem açúcar?",
       "audio": "talk/dialogues/ordering-at-a-cafe/d37d4afc3d5b.mp3"
      }
     }
    ]
   },
   "tea": {
    "speaker": "w",
    "text": "Of course. We have black tea, green tea and mint tea. Which one would you like?",
    "pt": "Claro. Temos chá preto, chá verde e chá de hortelã. Qual você quer?",
    "audio": "talk/dialogues/ordering-at-a-cafe/f8e3530267ac.mp3",
    "options": [
     {
      "text": "Green tea, please.",
      "pt": "Chá verde, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/a3078c53a4ea.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/336edfab72e3.mp3",
      "next": "tea_honey"
     },
     {
      "text": "Mint tea, please.",
      "pt": "Chá de hortelã, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/31df281a2271.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/41c2d99e3510.mp3",
      "next": "tea_honey"
     },
     {
      "text": "I live near here.",
      "pt": "Eu moro aqui perto.",
      "audio": "talk/dialogues/ordering-at-a-cafe/bc8042742148.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/94ede490206d.mp3",
      "next": null,
      "react": {
       "text": "Oh, nice! But which tea would you like?",
       "pt": "Ah, que legal! Mas qual chá você quer?",
       "audio": "talk/dialogues/ordering-at-a-cafe/83d54a9ead2a.mp3"
      }
     }
    ]
   },
   "tea_honey": {
    "speaker": "w",
    "text": "Would you like honey or lemon with your tea?",
    "pt": "Quer mel ou limão no seu chá?",
    "audio": "talk/dialogues/ordering-at-a-cafe/6f6d53d7fcbe.mp3",
    "options": [
     {
      "text": "Honey, please.",
      "pt": "Mel, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/59fb7fa73ead.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/fe39633a1e59.mp3",
      "next": "food"
     },
     {
      "text": "A slice of lemon, please.",
      "pt": "Uma rodela de limão, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/9c34010bb87a.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/0ceb2708c798.mp3",
      "next": "food"
     },
     {
      "text": "Every morning at seven.",
      "pt": "Toda manhã às sete.",
      "audio": "talk/dialogues/ordering-at-a-cafe/ebc7964fc7d6.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/d3bd71b5709e.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean honey or lemon?",
       "pt": "Desculpe, quis dizer: mel ou limão?",
       "audio": "talk/dialogues/ordering-at-a-cafe/3f8461d9fa3a.mp3"
      }
     }
    ]
   },
   "juice": {
    "speaker": "w",
    "text": "Our orange juice is fresh. With ice or without ice?",
    "pt": "Nosso suco de laranja é natural. Com gelo ou sem gelo?",
    "audio": "talk/dialogues/ordering-at-a-cafe/110035e25d77.mp3",
    "options": [
     {
      "text": "With ice, please.",
      "pt": "Com gelo, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/d97c004312f9.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/775d267f4e6a.mp3",
      "next": "food"
     },
     {
      "text": "No ice, thanks.",
      "pt": "Sem gelo, obrigado.",
      "audio": "talk/dialogues/ordering-at-a-cafe/b50cd02cdaed.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/df34fc687778.mp3",
      "next": "food"
     },
     {
      "text": "I don't like the beach.",
      "pt": "Eu não gosto de praia.",
      "audio": "talk/dialogues/ordering-at-a-cafe/6a4d910d1848.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/6cfe02de42cc.mp3",
      "next": null,
      "react": {
       "text": "Ha! Okay, but ice or no ice in your juice?",
       "pt": "Rá! Tudo bem, mas com ou sem gelo no suco?",
       "audio": "talk/dialogues/ordering-at-a-cafe/46cdf9671cf8.mp3"
      }
     }
    ]
   },
   "food": {
    "speaker": "w",
    "text": "Great. Would you like something to eat? We have muffins and sandwiches.",
    "pt": "Ótimo. Quer algo para comer? Temos muffins e sanduíches.",
    "audio": "talk/dialogues/ordering-at-a-cafe/081b8137e8d9.mp3",
    "options": [
     {
      "text": "A blueberry muffin, please.",
      "pt": "Um muffin de mirtilo, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/fc2ba655c0b0.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/77fa9a88c96f.mp3",
      "next": "here"
     },
     {
      "text": "What sandwiches do you have?",
      "pt": "Quais sanduíches vocês têm?",
      "audio": "talk/dialogues/ordering-at-a-cafe/9ef3f47fb93a.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/04549f0aa71e.mp3",
      "next": "sandwich"
     },
     {
      "text": "No, thanks. That's all.",
      "pt": "Não, obrigado. É só isso.",
      "audio": "talk/dialogues/ordering-at-a-cafe/980f56842380.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/8b072eeddc00.mp3",
      "next": "here"
     },
     {
      "text": "I'm sorry, I'm late.",
      "pt": "Desculpe, estou atrasado.",
      "audio": "talk/dialogues/ordering-at-a-cafe/03038a026bc3.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/f2c03abd4d9c.mp3",
      "next": null,
      "react": {
       "text": "No problem! So, anything to eat?",
       "pt": "Sem problema! Então, algo para comer?",
       "audio": "talk/dialogues/ordering-at-a-cafe/ab263fde0fde.mp3"
      }
     }
    ]
   },
   "sandwich": {
    "speaker": "w",
    "text": "We have ham and cheese, and chicken salad.",
    "pt": "Temos de presunto e queijo, e de salada de frango.",
    "audio": "talk/dialogues/ordering-at-a-cafe/fbffa95c2dde.mp3",
    "options": [
     {
      "text": "Ham and cheese, please.",
      "pt": "Presunto e queijo, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/08b9bbfb9e43.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/e49f60713644.mp3",
      "next": "here"
     },
     {
      "text": "The chicken salad sounds good.",
      "pt": "O de salada de frango parece bom.",
      "audio": "talk/dialogues/ordering-at-a-cafe/30ccc903a48a.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/a55dbf036e6c.mp3",
      "next": "here"
     },
     {
      "text": "It's next Tuesday.",
      "pt": "É na próxima terça.",
      "audio": "talk/dialogues/ordering-at-a-cafe/e069a427394f.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/00d78bdf008e.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Which sandwich would you like?",
       "pt": "Como? Qual sanduíche você quer?",
       "audio": "talk/dialogues/ordering-at-a-cafe/f5c3fa280e6a.mp3"
      }
     }
    ]
   },
   "here": {
    "speaker": "w",
    "text": "Is that for here or to go?",
    "pt": "É para comer aqui ou para levar?",
    "audio": "talk/dialogues/ordering-at-a-cafe/ea60e3e31eef.mp3",
    "options": [
     {
      "text": "For here, please.",
      "pt": "Para comer aqui, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/ace6bba79962.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/4d8657c7e266.mp3",
      "next": "pay"
     },
     {
      "text": "To go, please.",
      "pt": "Para levar, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/e7a880973a5e.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/7f223f91c22c.mp3",
      "next": "pay"
     },
     {
      "text": "Yes, I'm from Brazil.",
      "pt": "Sim, sou do Brasil.",
      "audio": "talk/dialogues/ordering-at-a-cafe/6097dbed0dcc.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/1fa116afea53.mp3",
      "next": null,
      "react": {
       "text": "Oh, cool! But do you want to eat here, or take it with you?",
       "pt": "Ah, legal! Mas você quer comer aqui ou levar?",
       "audio": "talk/dialogues/ordering-at-a-cafe/e7547e488457.mp3"
      }
     }
    ]
   },
   "pay": {
    "speaker": "w",
    "text": "That's eight dollars and fifty cents. Cash or card?",
    "pt": "São oito dólares e cinquenta centavos. Dinheiro ou cartão?",
    "audio": "talk/dialogues/ordering-at-a-cafe/6a50d986215c.mp3",
    "options": [
     {
      "text": "Card, please.",
      "pt": "Cartão, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/1676217c3a15.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/e4375275fcc6.mp3",
      "next": "card"
     },
     {
      "text": "Cash. Here's ten dollars.",
      "pt": "Dinheiro. Aqui estão dez dólares.",
      "audio": "talk/dialogues/ordering-at-a-cafe/68fde8dc10f0.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/0268f83ae209.mp3",
      "next": "cash"
     },
     {
      "text": "Blue is my favorite color.",
      "pt": "Azul é minha cor favorita.",
      "audio": "talk/dialogues/ordering-at-a-cafe/bcac7b311620.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/818fca9c197d.mp3",
      "next": null,
      "react": {
       "text": "Okay! But are you paying with cash or card?",
       "pt": "Certo! Mas vai pagar em dinheiro ou cartão?",
       "audio": "talk/dialogues/ordering-at-a-cafe/9a1e099c640a.mp3"
      }
     }
    ]
   },
   "card": {
    "speaker": "w",
    "text": "Perfect. Just tap your card here.",
    "pt": "Perfeito. É só aproximar o cartão aqui.",
    "audio": "talk/dialogues/ordering-at-a-cafe/e9a56dd79b5b.mp3",
    "next": "name"
   },
   "cash": {
    "speaker": "w",
    "text": "Thank you. Here's your change, one dollar and fifty cents.",
    "pt": "Obrigada. Aqui está o seu troco, um dólar e cinquenta centavos.",
    "audio": "talk/dialogues/ordering-at-a-cafe/c3315e432f99.mp3",
    "next": "name"
   },
   "name": {
    "speaker": "w",
    "text": "Can I have your name for the order?",
    "pt": "Pode me dizer seu nome para o pedido?",
    "audio": "talk/dialogues/ordering-at-a-cafe/1fd810dbaac9.mp3",
    "options": [
     {
      "text": "Sure, it's Lucas.",
      "pt": "Claro, é Lucas.",
      "audio": "talk/dialogues/ordering-at-a-cafe/e131fc696883.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/c92947a432cb.mp3",
      "next": "end"
     },
     {
      "text": "It's Ana. A, N, A.",
      "pt": "É Ana. A, N, A.",
      "audio": "talk/dialogues/ordering-at-a-cafe/4804498206ae.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/755fe4794dd6.mp3",
      "next": "end"
     },
     {
      "text": "Ten minutes ago.",
      "pt": "Dez minutos atrás.",
      "audio": "talk/dialogues/ordering-at-a-cafe/b4fd958ef692.mp3",
      "audioF": "talk/dialogues/ordering-at-a-cafe/73aee348cc3c.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I need your name. What's your name?",
       "pt": "Desculpe, preciso do seu nome. Qual é o seu nome?",
       "audio": "talk/dialogues/ordering-at-a-cafe/1d2bf8a1da62.mp3"
      }
     }
    ]
   },
   "end": {
    "speaker": "w",
    "text": "Thanks! Your order will be ready in a few minutes. Have a great day!",
    "pt": "Obrigada! Seu pedido fica pronto em alguns minutos. Tenha um ótimo dia!",
    "audio": "talk/dialogues/ordering-at-a-cafe/7e6336c5aa4b.mp3",
    "end": true
   }
  },
  "nudges": {
   "w": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/ordering-at-a-cafe/02def2e93f5e.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/ordering-at-a-cafe/b9dcdc8c63f9.mp3"
    }
   ]
  }
 },
 {
  "slug": "asking-for-directions",
  "title": "Asking for Directions",
  "level": "A1",
  "description": "Peça informação na rua em Londres.",
  "intro": "Primeiro dia em Londres. Você está na rua com o mapa na mão, meio perdido, quando um senhor simpático se aproxima.",
  "cast": {
   "m": {
    "name": "George",
    "role": "Morador de Londres"
   }
  },
  "start": "d1",
  "decisions": [
   4,
   5
  ],
  "nodes": {
   "d1": {
    "speaker": "m",
    "text": "Hello there. You look a little lost. Can I help you?",
    "pt": "Olá. Você parece um pouco perdido. Posso ajudar?",
    "audio": "talk/dialogues/asking-for-directions/c5baeccd7073.mp3",
    "options": [
     {
      "text": "Yes, please. Where is the train station?",
      "pt": "Sim, por favor. Onde fica a estação de trem?",
      "audio": "talk/dialogues/asking-for-directions/c6ecf12be4d5.mp3",
      "audioF": "talk/dialogues/asking-for-directions/457134976838.mp3",
      "next": "station"
     },
     {
      "text": "Yes! I'm looking for the Science Museum.",
      "pt": "Sim! Estou procurando o Museu de Ciências.",
      "audio": "talk/dialogues/asking-for-directions/715c1a1e5e43.mp3",
      "audioF": "talk/dialogues/asking-for-directions/3e2985ab02ef.mp3",
      "next": "museum"
     },
     {
      "text": "I had pizza for lunch.",
      "pt": "Comi pizza no almoço.",
      "audio": "talk/dialogues/asking-for-directions/0aaf48e00094.mp3",
      "audioF": "talk/dialogues/asking-for-directions/b03708572627.mp3",
      "next": null,
      "react": {
       "text": "Lovely! But do you need directions?",
       "pt": "Que ótimo! Mas você precisa de uma informação?",
       "audio": "talk/dialogues/asking-for-directions/50cf4cbf61dc.mp3"
      }
     }
    ]
   },
   "station": {
    "speaker": "m",
    "text": "The train station? It's not far. Are you walking or taking the bus?",
    "pt": "A estação de trem? Não é longe. Você vai a pé ou de ônibus?",
    "audio": "talk/dialogues/asking-for-directions/5203c9f1f1ae.mp3",
    "options": [
     {
      "text": "I'm walking.",
      "pt": "Vou a pé.",
      "audio": "talk/dialogues/asking-for-directions/ca0b8a2c82bd.mp3",
      "audioF": "talk/dialogues/asking-for-directions/08a0143a2622.mp3",
      "next": "walk"
     },
     {
      "text": "Is there a bus?",
      "pt": "Tem ônibus?",
      "audio": "talk/dialogues/asking-for-directions/dbe3c6d4244f.mp3",
      "audioF": "talk/dialogues/asking-for-directions/ace3ede9ca82.mp3",
      "next": "bus"
     },
     {
      "text": "At nine o'clock.",
      "pt": "Às nove horas.",
      "audio": "talk/dialogues/asking-for-directions/8e9f38f892b8.mp3",
      "audioF": "talk/dialogues/asking-for-directions/64071077e499.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean, are you going on foot or by bus?",
       "pt": "Desculpe, quero dizer: vai a pé ou de ônibus?",
       "audio": "talk/dialogues/asking-for-directions/f3ec86348237.mp3"
      }
     }
    ]
   },
   "walk": {
    "speaker": "m",
    "text": "Okay. Go straight down this street and turn left at the bank.",
    "pt": "Certo. Siga reto por esta rua e vire à esquerda no banco.",
    "audio": "talk/dialogues/asking-for-directions/585ef0d842d6.mp3",
    "next": "walk2"
   },
   "walk2": {
    "speaker": "m",
    "text": "Then walk for two blocks. The station is on your right. Got it?",
    "pt": "Depois ande duas quadras. A estação fica à sua direita. Entendeu?",
    "audio": "talk/dialogues/asking-for-directions/403d79dc5b81.mp3",
    "options": [
     {
      "text": "So, left at the bank, then two blocks?",
      "pt": "Então, esquerda no banco, depois duas quadras?",
      "audio": "talk/dialogues/asking-for-directions/aaa8aa9a6751.mp3",
      "audioF": "talk/dialogues/asking-for-directions/3759154a298f.mp3",
      "next": "confirm"
     },
     {
      "text": "Sorry, can you say that again, please?",
      "pt": "Desculpe, pode repetir, por favor?",
      "audio": "talk/dialogues/asking-for-directions/e4b3b6017342.mp3",
      "audioF": "talk/dialogues/asking-for-directions/dff0366da4e0.mp3",
      "next": "repeat"
     },
     {
      "text": "I've got two brothers.",
      "pt": "Eu tenho dois irmãos.",
      "audio": "talk/dialogues/asking-for-directions/807c6c9114ac.mp3",
      "audioF": "talk/dialogues/asking-for-directions/3fa84e5de5e7.mp3",
      "next": null,
      "react": {
       "text": "No, I mean, do you understand the directions?",
       "pt": "Não, quero dizer, você entendeu o caminho?",
       "audio": "talk/dialogues/asking-for-directions/3d25fa8e693e.mp3"
      }
     }
    ]
   },
   "repeat": {
    "speaker": "m",
    "text": "No problem. Straight on, left at the bank, two blocks, and it's on your right.",
    "pt": "Sem problema. Siga reto, esquerda no banco, duas quadras, e fica à sua direita.",
    "audio": "talk/dialogues/asking-for-directions/dda8a43f17bb.mp3",
    "next": "confirm"
   },
   "bus": {
    "speaker": "m",
    "text": "Yes, the number twelve stops right there, across the street. Do you have a travel card?",
    "pt": "Sim, o número doze para logo ali, do outro lado da rua. Você tem cartão de transporte?",
    "audio": "talk/dialogues/asking-for-directions/4de4afb51e27.mp3",
    "options": [
     {
      "text": "Yes, I have one.",
      "pt": "Sim, eu tenho.",
      "audio": "talk/dialogues/asking-for-directions/54ae4edcd8e8.mp3",
      "audioF": "talk/dialogues/asking-for-directions/ad63a97c602d.mp3",
      "next": "bus_stop"
     },
     {
      "text": "No. Where can I buy one?",
      "pt": "Não. Onde posso comprar um?",
      "audio": "talk/dialogues/asking-for-directions/b7071ae28670.mp3",
      "audioF": "talk/dialogues/asking-for-directions/3e78ef57c56c.mp3",
      "next": "buy"
     },
     {
      "text": "I prefer cats.",
      "pt": "Eu prefiro gatos.",
      "audio": "talk/dialogues/asking-for-directions/82cc34c74766.mp3",
      "audioF": "talk/dialogues/asking-for-directions/121a36164523.mp3",
      "next": null,
      "react": {
       "text": "Ha! Okay, but do you have a travel card for the bus?",
       "pt": "Rá! Tudo bem, mas você tem cartão de transporte para o ônibus?",
       "audio": "talk/dialogues/asking-for-directions/53f463e3cf2e.mp3"
      }
     }
    ]
   },
   "buy": {
    "speaker": "m",
    "text": "You can buy one at the little shop on the corner, the one with the red door.",
    "pt": "Você pode comprar na lojinha da esquina, aquela com a porta vermelha.",
    "audio": "talk/dialogues/asking-for-directions/5e0bb7569c99.mp3",
    "next": "bus_stop"
   },
   "bus_stop": {
    "speaker": "m",
    "text": "Get off at the third stop. The station is right in front of it. Okay?",
    "pt": "Desça na terceira parada. A estação fica bem em frente. Certo?",
    "audio": "talk/dialogues/asking-for-directions/146bc8195b8b.mp3",
    "options": [
     {
      "text": "The third stop. Got it, thanks.",
      "pt": "A terceira parada. Entendi, obrigado.",
      "audio": "talk/dialogues/asking-for-directions/323c949cf7e4.mp3",
      "audioF": "talk/dialogues/asking-for-directions/e0b0306d061e.mp3",
      "next": "confirm"
     },
     {
      "text": "Sorry, which stop?",
      "pt": "Desculpe, qual parada?",
      "audio": "talk/dialogues/asking-for-directions/7f13125389ab.mp3",
      "audioF": "talk/dialogues/asking-for-directions/b971edcc797c.mp3",
      "next": "bus_repeat"
     },
     {
      "text": "It's my birthday tomorrow.",
      "pt": "Amanhã é meu aniversário.",
      "audio": "talk/dialogues/asking-for-directions/a2801979f6a1.mp3",
      "audioF": "talk/dialogues/asking-for-directions/c5c5fb80d056.mp3",
      "next": null,
      "react": {
       "text": "Oh, happy birthday! But did you understand where to get off?",
       "pt": "Ah, feliz aniversário! Mas entendeu onde descer?",
       "audio": "talk/dialogues/asking-for-directions/b7796284d807.mp3"
      }
     }
    ]
   },
   "bus_repeat": {
    "speaker": "m",
    "text": "The third stop. Just count three stops.",
    "pt": "A terceira parada. É só contar três paradas.",
    "audio": "talk/dialogues/asking-for-directions/c7d78829b716.mp3",
    "next": "confirm"
   },
   "museum": {
    "speaker": "m",
    "text": "The Science Museum? That's quite far. You should take the underground. Do you know where the underground station is?",
    "pt": "O Museu de Ciências? É bem longe. É melhor pegar o metrô. Você sabe onde fica a estação de metrô?",
    "audio": "talk/dialogues/asking-for-directions/97a5f52bde10.mp3",
    "options": [
     {
      "text": "No, I don't. Where is it?",
      "pt": "Não sei. Onde fica?",
      "audio": "talk/dialogues/asking-for-directions/3f067ef8b1da.mp3",
      "audioF": "talk/dialogues/asking-for-directions/b9d291423f45.mp3",
      "next": "tube"
     },
     {
      "text": "Yes, it's over there, right?",
      "pt": "Sim, é ali, né?",
      "audio": "talk/dialogues/asking-for-directions/6dc6c41c14ef.mp3",
      "audioF": "talk/dialogues/asking-for-directions/9f5c6311c74f.mp3",
      "next": "tube_yes"
     },
     {
      "text": "I like science very much.",
      "pt": "Eu gosto muito de ciência.",
      "audio": "talk/dialogues/asking-for-directions/abdac84df8d1.mp3",
      "audioF": "talk/dialogues/asking-for-directions/87d68ca4ed77.mp3",
      "next": null,
      "react": {
       "text": "Me too! But do you know where the underground station is?",
       "pt": "Eu também! Mas você sabe onde fica a estação de metrô?",
       "audio": "talk/dialogues/asking-for-directions/9f4c91117b19.mp3"
      }
     }
    ]
   },
   "tube": {
    "speaker": "m",
    "text": "It's just around the corner, next to the post office.",
    "pt": "Fica logo virando a esquina, ao lado dos correios.",
    "audio": "talk/dialogues/asking-for-directions/d782f03e67f0.mp3",
    "next": "tube2"
   },
   "tube_yes": {
    "speaker": "m",
    "text": "That's right, next to the post office.",
    "pt": "Isso mesmo, ao lado dos correios.",
    "audio": "talk/dialogues/asking-for-directions/3654af3774ec.mp3",
    "next": "tube2"
   },
   "tube2": {
    "speaker": "m",
    "text": "Take the blue line and get off at South Kensington. Can you remember that?",
    "pt": "Pegue a linha azul e desça em South Kensington. Consegue lembrar?",
    "audio": "talk/dialogues/asking-for-directions/de4b100f53fb.mp3",
    "options": [
     {
      "text": "Blue line, South Kensington. Thanks!",
      "pt": "Linha azul, South Kensington. Obrigado!",
      "audio": "talk/dialogues/asking-for-directions/fc290d4f2960.mp3",
      "audioF": "talk/dialogues/asking-for-directions/4868850671f3.mp3",
      "next": "confirm"
     },
     {
      "text": "Can you write it down for me, please?",
      "pt": "Pode anotar para mim, por favor?",
      "audio": "talk/dialogues/asking-for-directions/30dd09ae5b9d.mp3",
      "audioF": "talk/dialogues/asking-for-directions/39e4a13655fc.mp3",
      "next": "write"
     },
     {
      "text": "My phone is new.",
      "pt": "Meu celular é novo.",
      "audio": "talk/dialogues/asking-for-directions/9217a52a865a.mp3",
      "audioF": "talk/dialogues/asking-for-directions/f1b9b53eefc6.mp3",
      "next": null,
      "react": {
       "text": "Nice! So, can you remember the station name?",
       "pt": "Legal! Então, consegue lembrar o nome da estação?",
       "audio": "talk/dialogues/asking-for-directions/da21027ce39f.mp3"
      }
     }
    ]
   },
   "write": {
    "speaker": "m",
    "text": "Sure, here you go. South Kensington, blue line.",
    "pt": "Claro, aqui está. South Kensington, linha azul.",
    "audio": "talk/dialogues/asking-for-directions/fff89e9af42d.mp3",
    "next": "confirm"
   },
   "confirm": {
    "speaker": "m",
    "text": "Exactly. Is there anything else I can help you with?",
    "pt": "Exatamente. Posso ajudar com mais alguma coisa?",
    "audio": "talk/dialogues/asking-for-directions/08ab1abc9fda.mp3",
    "options": [
     {
      "text": "Is there a coffee shop near there?",
      "pt": "Tem alguma cafeteria perto de lá?",
      "audio": "talk/dialogues/asking-for-directions/1d7cc8f32864.mp3",
      "audioF": "talk/dialogues/asking-for-directions/d557f303b274.mp3",
      "next": "coffee"
     },
     {
      "text": "No, that's all. Thank you so much!",
      "pt": "Não, é só isso. Muito obrigado!",
      "audio": "talk/dialogues/asking-for-directions/a52803369477.mp3",
      "audioF": "talk/dialogues/asking-for-directions/c3c7e88da58a.mp3",
      "next": "end"
     },
     {
      "text": "Yes, I'm a doctor.",
      "pt": "Sim, eu sou médico.",
      "audio": "talk/dialogues/asking-for-directions/25fe17e9addf.mp3",
      "audioF": "talk/dialogues/asking-for-directions/a401877c2948.mp3",
      "next": null,
      "react": {
       "text": "Oh, how nice! But do you need anything else?",
       "pt": "Ah, que bom! Mas precisa de mais alguma coisa?",
       "audio": "talk/dialogues/asking-for-directions/424904689427.mp3"
      }
     }
    ]
   },
   "coffee": {
    "speaker": "m",
    "text": "Yes, there's a nice one right next to it. They make great cakes.",
    "pt": "Sim, tem uma ótima bem do lado. Eles fazem bolos deliciosos.",
    "audio": "talk/dialogues/asking-for-directions/0eda1c5f429d.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "m",
    "text": "You're welcome. Enjoy your day in London!",
    "pt": "De nada. Aproveite o seu dia em Londres!",
    "audio": "talk/dialogues/asking-for-directions/40a77f1cd582.mp3",
    "end": true
   }
  },
  "nudges": {
   "m": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/asking-for-directions/75759147c884.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/asking-for-directions/b37319da9442.mp3"
    }
   ]
  }
 },
 {
  "slug": "hotel-check-in",
  "title": "Hotel Check-in",
  "level": "A2",
  "description": "Faça o check-in (com ou sem reserva).",
  "intro": "Depois de um voo longo, você chega à recepção do hotel à noite. A recepcionista Sophie levanta os olhos do computador.",
  "cast": {
   "r": {
    "name": "Sophie",
    "role": "Recepcionista"
   }
  },
  "start": "h1",
  "decisions": [
   6,
   8
  ],
  "nodes": {
   "h1": {
    "speaker": "r",
    "text": "Good evening, and welcome to the Grand Harbour Hotel.",
    "pt": "Boa noite e bem-vindo ao Grand Harbour Hotel.",
    "audio": "talk/dialogues/hotel-check-in/65f1e2e6ec13.mp3",
    "next": "h2"
   },
   "h2": {
    "speaker": "r",
    "text": "How can I help you this evening?",
    "pt": "Como posso ajudar esta noite?",
    "audio": "talk/dialogues/hotel-check-in/bf31199213ba.mp3",
    "options": [
     {
      "text": "Hi, I have a reservation. My name is Silva.",
      "pt": "Oi, tenho uma reserva. Meu nome é Silva.",
      "audio": "talk/dialogues/hotel-check-in/c82fcf8960a8.mp3",
      "audioF": "talk/dialogues/hotel-check-in/4e93bdd88501.mp3",
      "next": "res"
     },
     {
      "text": "Hello. Do you have any rooms available tonight?",
      "pt": "Olá. Vocês têm quarto disponível para hoje?",
      "audio": "talk/dialogues/hotel-check-in/f7f919e06bb5.mp3",
      "audioF": "talk/dialogues/hotel-check-in/c032224e8e8a.mp3",
      "next": "walkin"
     },
     {
      "text": "The weather was good on the plane.",
      "pt": "O tempo estava bom no avião.",
      "audio": "talk/dialogues/hotel-check-in/ad2754404d68.mp3",
      "audioF": "talk/dialogues/hotel-check-in/ad8e8b7e5a7f.mp3",
      "next": null,
      "react": {
       "text": "I'm glad to hear that! So, what can I do for you?",
       "pt": "Que bom saber! Então, o que posso fazer por você?",
       "audio": "talk/dialogues/hotel-check-in/3f554712c2da.mp3"
      }
     }
    ]
   },
   "res": {
    "speaker": "r",
    "text": "Let me check. Yes, here it is. A double room for three nights. Is that correct?",
    "pt": "Deixe-me ver. Sim, aqui está. Um quarto de casal por três noites. Está correto?",
    "audio": "talk/dialogues/hotel-check-in/ac30a8141ac8.mp3",
    "options": [
     {
      "text": "Yes, that's correct.",
      "pt": "Sim, está correto.",
      "audio": "talk/dialogues/hotel-check-in/9f7b5938c3a4.mp3",
      "audioF": "talk/dialogues/hotel-check-in/9fa4e74b96a2.mp3",
      "next": "passport"
     },
     {
      "text": "Actually, it's for four nights.",
      "pt": "Na verdade, é por quatro noites.",
      "audio": "talk/dialogues/hotel-check-in/7a4cade76c37.mp3",
      "audioF": "talk/dialogues/hotel-check-in/efe3e4c2c748.mp3",
      "next": "extra"
     },
     {
      "text": "No, I don't drink coffee.",
      "pt": "Não, eu não tomo café.",
      "audio": "talk/dialogues/hotel-check-in/df6036a9f808.mp3",
      "audioF": "talk/dialogues/hotel-check-in/28e2a0f446b0.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean the reservation. Three nights, correct?",
       "pt": "Desculpe, falo da reserva. Três noites, correto?",
       "audio": "talk/dialogues/hotel-check-in/e2d5f1a90783.mp3"
      }
     }
    ]
   },
   "extra": {
    "speaker": "r",
    "text": "Let me see. Good news, we can add one more night. It's one hundred and twenty dollars. Is that okay?",
    "pt": "Deixe-me ver. Boa notícia, podemos acrescentar mais uma noite. São cento e vinte dólares. Tudo bem?",
    "audio": "talk/dialogues/hotel-check-in/66401f4c0030.mp3",
    "options": [
     {
      "text": "Yes, that's fine.",
      "pt": "Sim, tudo bem.",
      "audio": "talk/dialogues/hotel-check-in/b19b4c0fbd85.mp3",
      "audioF": "talk/dialogues/hotel-check-in/fb3b8e2b6c53.mp3",
      "next": "passport"
     },
     {
      "text": "Does that include breakfast?",
      "pt": "Inclui café da manhã?",
      "audio": "talk/dialogues/hotel-check-in/bcb44239922b.mp3",
      "audioF": "talk/dialogues/hotel-check-in/d8c7d9203aea.mp3",
      "next": "bf_incl"
     },
     {
      "text": "I'm wearing a jacket.",
      "pt": "Estou de jaqueta.",
      "audio": "talk/dialogues/hotel-check-in/2aca936b4818.mp3",
      "audioF": "talk/dialogues/hotel-check-in/8d40a5cc165e.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Is the extra night okay for you?",
       "pt": "Como? A noite extra está boa para você?",
       "audio": "talk/dialogues/hotel-check-in/3de124c1d70f.mp3"
      }
     }
    ]
   },
   "bf_incl": {
    "speaker": "r",
    "text": "Yes, breakfast is included in all our rates.",
    "pt": "Sim, o café da manhã está incluído em todas as nossas diárias.",
    "audio": "talk/dialogues/hotel-check-in/0b02d44d0c4e.mp3",
    "next": "passport"
   },
   "walkin": {
    "speaker": "r",
    "text": "Let me check. We have one double room left. It's one hundred and forty dollars a night. Would you like it?",
    "pt": "Deixe-me ver. Sobrou um quarto de casal. São cento e quarenta dólares a diária. Gostaria de ficar com ele?",
    "audio": "talk/dialogues/hotel-check-in/9419183fdee9.mp3",
    "options": [
     {
      "text": "Yes, I'll take it.",
      "pt": "Sim, vou ficar com ele.",
      "audio": "talk/dialogues/hotel-check-in/9020e88b08f4.mp3",
      "audioF": "talk/dialogues/hotel-check-in/f51a1b29a92f.mp3",
      "next": "walkin_n"
     },
     {
      "text": "Do you have anything cheaper?",
      "pt": "Vocês têm algo mais barato?",
      "audio": "talk/dialogues/hotel-check-in/307c1d818950.mp3",
      "audioF": "talk/dialogues/hotel-check-in/957b961c646c.mp3",
      "next": "cheaper"
     },
     {
      "text": "I'm reading a good book.",
      "pt": "Estou lendo um bom livro.",
      "audio": "talk/dialogues/hotel-check-in/43b97656f25d.mp3",
      "audioF": "talk/dialogues/hotel-check-in/8e81e5044f8b.mp3",
      "next": null,
      "react": {
       "text": "How nice! But would you like the room?",
       "pt": "Que bom! Mas você gostaria do quarto?",
       "audio": "talk/dialogues/hotel-check-in/07f45477fb2e.mp3"
      }
     }
    ]
   },
   "cheaper": {
    "speaker": "r",
    "text": "I'm sorry, it's our last room tonight. But breakfast is included.",
    "pt": "Sinto muito, é o nosso último quarto hoje. Mas o café da manhã está incluído.",
    "audio": "talk/dialogues/hotel-check-in/83c703e0b2b6.mp3",
    "next": "walkin2"
   },
   "walkin2": {
    "speaker": "r",
    "text": "Would you like to take it?",
    "pt": "Quer ficar com ele?",
    "audio": "talk/dialogues/hotel-check-in/aef6a509caf2.mp3",
    "options": [
     {
      "text": "Okay, I'll take it.",
      "pt": "Tudo bem, vou ficar.",
      "audio": "talk/dialogues/hotel-check-in/6270a821b562.mp3",
      "audioF": "talk/dialogues/hotel-check-in/d847d28fa63f.mp3",
      "next": "walkin_n"
     },
     {
      "text": "Alright. Yes, please.",
      "pt": "Está bem. Sim, por favor.",
      "audio": "talk/dialogues/hotel-check-in/c344b4ab1e46.mp3",
      "audioF": "talk/dialogues/hotel-check-in/c15eceb87c68.mp3",
      "next": "walkin_n"
     },
     {
      "text": "I have a cat at home.",
      "pt": "Tenho um gato em casa.",
      "audio": "talk/dialogues/hotel-check-in/25b3985ce4cd.mp3",
      "audioF": "talk/dialogues/hotel-check-in/c50d8ddcc350.mp3",
      "next": null,
      "react": {
       "text": "Oh, lovely. But do you want the room?",
       "pt": "Ah, que fofo. Mas você quer o quarto?",
       "audio": "talk/dialogues/hotel-check-in/3d07d99a41c4.mp3"
      }
     }
    ]
   },
   "walkin_n": {
    "speaker": "r",
    "text": "How many nights will you stay?",
    "pt": "Quantas noites você vai ficar?",
    "audio": "talk/dialogues/hotel-check-in/ec89857e2139.mp3",
    "options": [
     {
      "text": "Just two nights.",
      "pt": "Só duas noites.",
      "audio": "talk/dialogues/hotel-check-in/5f9a843f5eac.mp3",
      "audioF": "talk/dialogues/hotel-check-in/4f1f7c1ed263.mp3",
      "next": "passport"
     },
     {
      "text": "Only tonight.",
      "pt": "Só esta noite.",
      "audio": "talk/dialogues/hotel-check-in/ae2b38b44b1a.mp3",
      "audioF": "talk/dialogues/hotel-check-in/ebcdabb5b209.mp3",
      "next": "passport"
     },
     {
      "text": "About five kilos.",
      "pt": "Uns cinco quilos.",
      "audio": "talk/dialogues/hotel-check-in/4d6ae4a7879e.mp3",
      "audioF": "talk/dialogues/hotel-check-in/fa2f2f53a851.mp3",
      "next": null,
      "react": {
       "text": "Sorry? How many nights would you like to stay?",
       "pt": "Como? Quantas noites você quer ficar?",
       "audio": "talk/dialogues/hotel-check-in/fa869434db3e.mp3"
      }
     }
    ]
   },
   "passport": {
    "speaker": "r",
    "text": "May I see your passport, please?",
    "pt": "Posso ver seu passaporte, por favor?",
    "audio": "talk/dialogues/hotel-check-in/f62f558dfd8f.mp3",
    "options": [
     {
      "text": "Of course. Here you are.",
      "pt": "Claro. Aqui está.",
      "audio": "talk/dialogues/hotel-check-in/bf94fc844622.mp3",
      "audioF": "talk/dialogues/hotel-check-in/c3a7b17add57.mp3",
      "next": "card"
     },
     {
      "text": "Sure, just a second.",
      "pt": "Claro, só um segundo.",
      "audio": "talk/dialogues/hotel-check-in/79edb424a961.mp3",
      "audioF": "talk/dialogues/hotel-check-in/f7237690f9f5.mp3",
      "next": "card"
     },
     {
      "text": "I'm sorry, I don't eat meat.",
      "pt": "Desculpe, eu não como carne.",
      "audio": "talk/dialogues/hotel-check-in/9dd62f6cc4ed.mp3",
      "audioF": "talk/dialogues/hotel-check-in/7e08201afac4.mp3",
      "next": null,
      "react": {
       "text": "Oh, I just need your passport, please.",
       "pt": "Ah, só preciso do seu passaporte, por favor.",
       "audio": "talk/dialogues/hotel-check-in/a7740d714709.mp3"
      }
     }
    ]
   },
   "card": {
    "speaker": "r",
    "text": "Thank you. I'll also need a credit card for any extras.",
    "pt": "Obrigada. Também vou precisar de um cartão de crédito para os extras.",
    "audio": "talk/dialogues/hotel-check-in/477b8eb1f954.mp3",
    "options": [
     {
      "text": "Here's my card.",
      "pt": "Aqui está meu cartão.",
      "audio": "talk/dialogues/hotel-check-in/d27320337d9e.mp3",
      "audioF": "talk/dialogues/hotel-check-in/2666a3c1cb76.mp3",
      "next": "breakfast"
     },
     {
      "text": "Can I pay in cash at the end?",
      "pt": "Posso pagar em dinheiro no final?",
      "audio": "talk/dialogues/hotel-check-in/5173c1a04f54.mp3",
      "audioF": "talk/dialogues/hotel-check-in/982dabf86b02.mp3",
      "next": "cash"
     },
     {
      "text": "I'm thirty-two.",
      "pt": "Tenho trinta e dois anos.",
      "audio": "talk/dialogues/hotel-check-in/caf7324b0105.mp3",
      "audioF": "talk/dialogues/hotel-check-in/12a422fdf4c4.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I need a credit card, or a cash deposit.",
       "pt": "Desculpe, preciso de um cartão de crédito, ou de um depósito em dinheiro.",
       "audio": "talk/dialogues/hotel-check-in/a7cda83a0379.mp3"
      }
     }
    ]
   },
   "cash": {
    "speaker": "r",
    "text": "Of course. Then we just need a small cash deposit of fifty dollars.",
    "pt": "Claro. Então só precisamos de um pequeno depósito de cinquenta dólares em dinheiro.",
    "audio": "talk/dialogues/hotel-check-in/63a3c53c9563.mp3",
    "next": "breakfast"
   },
   "breakfast": {
    "speaker": "r",
    "text": "Perfect. Breakfast is from seven to ten in the restaurant on the first floor. Would you like a wake-up call?",
    "pt": "Perfeito. O café da manhã é das sete às dez, no restaurante do primeiro andar. Gostaria de um serviço de despertador?",
    "audio": "talk/dialogues/hotel-check-in/d1e845af7fcc.mp3",
    "options": [
     {
      "text": "Yes, at seven, please.",
      "pt": "Sim, às sete, por favor.",
      "audio": "talk/dialogues/hotel-check-in/624c55a4405d.mp3",
      "audioF": "talk/dialogues/hotel-check-in/ebe5fa204d8b.mp3",
      "next": "key"
     },
     {
      "text": "No, thank you.",
      "pt": "Não, obrigado.",
      "audio": "talk/dialogues/hotel-check-in/8d3b0ef01faa.mp3",
      "audioF": "talk/dialogues/hotel-check-in/9966dafe0578.mp3",
      "next": "key"
     },
     {
      "text": "It's on the first floor.",
      "pt": "Fica no primeiro andar.",
      "audio": "talk/dialogues/hotel-check-in/36bce4e0eee0.mp3",
      "audioF": "talk/dialogues/hotel-check-in/665ff8f3e92b.mp3",
      "next": null,
      "react": {
       "text": "Yes, the restaurant is. But would you like a wake-up call?",
       "pt": "Sim, o restaurante fica. Mas você gostaria de ser acordado por telefone?",
       "audio": "talk/dialogues/hotel-check-in/4af3ea5cffb8.mp3"
      }
     }
    ]
   },
   "key": {
    "speaker": "r",
    "text": "Here's your key. You're in room five twelve, on the fifth floor. Do you have any questions?",
    "pt": "Aqui está sua chave. Você está no quarto quinhentos e doze, no quinto andar. Tem alguma pergunta?",
    "audio": "talk/dialogues/hotel-check-in/fbd962c34f6c.mp3",
    "options": [
     {
      "text": "What's the Wi-Fi password?",
      "pt": "Qual é a senha do Wi-Fi?",
      "audio": "talk/dialogues/hotel-check-in/33a17ce7b980.mp3",
      "audioF": "talk/dialogues/hotel-check-in/20cc9f2a6ea8.mp3",
      "next": "wifi"
     },
     {
      "text": "Where is the elevator?",
      "pt": "Onde fica o elevador?",
      "audio": "talk/dialogues/hotel-check-in/1400b0c42202.mp3",
      "audioF": "talk/dialogues/hotel-check-in/f8bd3b774266.mp3",
      "next": "elevator"
     },
     {
      "text": "No, that's everything. Thanks.",
      "pt": "Não, é só isso. Obrigado.",
      "audio": "talk/dialogues/hotel-check-in/c36442a4aa8a.mp3",
      "audioF": "talk/dialogues/hotel-check-in/389caa37660f.mp3",
      "next": "end"
     },
     {
      "text": "Five hundred dollars.",
      "pt": "Quinhentos dólares.",
      "audio": "talk/dialogues/hotel-check-in/3dc2ea547b66.mp3",
      "audioF": "talk/dialogues/hotel-check-in/5700f7a90939.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Do you have any questions about your stay?",
       "pt": "Como? Tem alguma pergunta sobre a sua estadia?",
       "audio": "talk/dialogues/hotel-check-in/35f22069ba7c.mp3"
      }
     }
    ]
   },
   "wifi": {
    "speaker": "r",
    "text": "It's harbour view, all lowercase, no spaces. It's on your key card too.",
    "pt": "É harbour view, tudo minúsculo e sem espaço. Também está no cartão da chave.",
    "audio": "talk/dialogues/hotel-check-in/294f8f0d967d.mp3",
    "next": "end"
   },
   "elevator": {
    "speaker": "r",
    "text": "The elevators are just behind you, on the left.",
    "pt": "Os elevadores ficam logo atrás de você, à esquerda.",
    "audio": "talk/dialogues/hotel-check-in/31937adfdb50.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "r",
    "text": "Enjoy your stay, and let us know if you need anything.",
    "pt": "Aproveite a estadia e nos avise se precisar de alguma coisa.",
    "audio": "talk/dialogues/hotel-check-in/7feb3f96925b.mp3",
    "end": true
   }
  },
  "nudges": {
   "r": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/hotel-check-in/ad61bfed008d.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/hotel-check-in/4c7bf3507ea3.mp3"
    }
   ]
  }
 },
 {
  "slug": "dinner-at-a-restaurant",
  "title": "Dinner at a Restaurant",
  "level": "A2",
  "description": "Do pedido da mesa até a conta.",
  "intro": "Sexta à noite. Você e um amigo chegam a um restaurante italiano movimentado. O garçom Marco vem até a porta.",
  "cast": {
   "w": {
    "name": "Marco",
    "role": "Garçom"
   }
  },
  "start": "r1",
  "decisions": [
   8,
   12
  ],
  "nodes": {
   "r1": {
    "speaker": "w",
    "text": "Good evening! Do you have a reservation?",
    "pt": "Boa noite! Vocês têm reserva?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/d809e8dc9990.mp3",
    "options": [
     {
      "text": "Yes, a table for two under Costa.",
      "pt": "Sim, uma mesa para dois no nome de Costa.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/dcf68a79ae16.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/b0b553d431e7.mp3",
      "next": "seat"
     },
     {
      "text": "No, we don't. Do you have a table for two?",
      "pt": "Não temos. Tem mesa para dois?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/63a9bc5d9b36.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/b42b80943bb8.mp3",
      "next": "wait"
     },
     {
      "text": "It's in my bag.",
      "pt": "Está na minha bolsa.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/a7fc3911a2d6.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/e17df45641a4.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Do you have a reservation with us?",
       "pt": "Como? Vocês têm reserva conosco?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/ed3de207227a.mp3"
      }
     }
    ]
   },
   "wait": {
    "speaker": "w",
    "text": "We're very busy tonight. There's a fifteen-minute wait. Is that okay?",
    "pt": "Estamos bem cheios hoje. A espera é de quinze minutos. Tudo bem?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/6c4d67a7579a.mp3",
    "options": [
     {
      "text": "That's fine, we can wait.",
      "pt": "Tudo bem, podemos esperar.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/75c5ada2e05c.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/6c04e6d6805d.mp3",
      "next": "seat"
     },
     {
      "text": "Can we sit outside instead?",
      "pt": "Podemos sentar lá fora?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/28f555ddafe4.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/941eabf663fe.mp3",
      "next": "outside"
     },
     {
      "text": "My brother is a teacher.",
      "pt": "Meu irmão é professor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/cfe89c86e2e9.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/04162bf1372e.mp3",
      "next": null,
      "react": {
       "text": "Oh, nice. But is a fifteen-minute wait okay?",
       "pt": "Ah, legal. Mas quinze minutos de espera estão bons?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/66f2a0072301.mp3"
      }
     }
    ]
   },
   "outside": {
    "speaker": "w",
    "text": "Sure, there's a free table on the terrace right now. Follow me.",
    "pt": "Claro, tem uma mesa livre no terraço agora. Me acompanhem.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/c26fd18f9bdc.mp3",
    "next": "drinks"
   },
   "seat": {
    "speaker": "w",
    "text": "Right this way, please. Here's your table, and here are the menus.",
    "pt": "Por aqui, por favor. Esta é a mesa de vocês, e aqui estão os cardápios.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/dc79fd3b4a79.mp3",
    "next": "drinks"
   },
   "drinks": {
    "speaker": "w",
    "text": "Can I get you something to drink?",
    "pt": "Posso trazer algo para beber?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/03c8068a0cc3.mp3",
    "options": [
     {
      "text": "A bottle of sparkling water, please.",
      "pt": "Uma garrafa de água com gás, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/4f0707deb214.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/e317c4c15814.mp3",
      "next": "special"
     },
     {
      "text": "Could we see the wine list?",
      "pt": "Podemos ver a carta de vinhos?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/3e8d4f75e016.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/1ea231a17a8b.mp3",
      "next": "wine"
     },
     {
      "text": "I live in São Paulo.",
      "pt": "Eu moro em São Paulo.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/bef9ed5cc5be.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/990db46ae2fe.mp3",
      "next": null,
      "react": {
       "text": "Lovely city! And what would you like to drink?",
       "pt": "Cidade linda! E o que vocês querem beber?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/61c3a085619b.mp3"
      }
     }
    ]
   },
   "wine": {
    "speaker": "w",
    "text": "Of course. Here you are. Our house red is very popular.",
    "pt": "Claro. Aqui está. Nosso tinto da casa é muito pedido.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/d958e3ae60ed.mp3",
    "next": "wine2"
   },
   "wine2": {
    "speaker": "w",
    "text": "Would you like to try it?",
    "pt": "Gostariam de experimentar?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/a8b7c06a3aa4.mp3",
    "options": [
     {
      "text": "Yes, two glasses of the house red, please.",
      "pt": "Sim, duas taças do tinto da casa, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/9b909e020e2c.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/66fdfc1bac82.mp3",
      "next": "special"
     },
     {
      "text": "No, just water for now, thanks.",
      "pt": "Não, só água por enquanto, obrigado.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/f9c4d6536d37.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/c04086eb0f12.mp3",
      "next": "special"
     },
     {
      "text": "Red is a beautiful color.",
      "pt": "Vermelho é uma cor linda.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/ccc2615780ea.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/a47745344c67.mp3",
      "next": null,
      "react": {
       "text": "It is! So, would you like to try the wine?",
       "pt": "É mesmo! Então, querem experimentar o vinho?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/17ab3be087b3.mp3"
      }
     }
    ]
   },
   "special": {
    "speaker": "w",
    "text": "Tonight's special is grilled salmon with potatoes. Are you ready to order, or do you need a few minutes?",
    "pt": "O prato do dia é salmão grelhado com batatas. Já querem pedir ou precisam de alguns minutos?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/0fa9ce2c6336.mp3",
    "options": [
     {
      "text": "I'll have the salmon, please.",
      "pt": "Vou querer o salmão, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/494c9c7edf6b.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/a3edbae01329.mp3",
      "next": "side"
     },
     {
      "text": "We need a few more minutes.",
      "pt": "Precisamos de mais alguns minutos.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/681dd46efa58.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/a162f47c7fb8.mp3",
      "next": "minutes"
     },
     {
      "text": "What do you recommend?",
      "pt": "O que você recomenda?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/110f60c95949.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/63d374fa31c0.mp3",
      "next": "recommend"
     },
     {
      "text": "Salmon is a fish.",
      "pt": "Salmão é um peixe.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/ec70fd4f4717.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/15e60ae005cb.mp3",
      "next": null,
      "react": {
       "text": "Ha, it is! But are you ready to order?",
       "pt": "Rá, é sim! Mas já querem pedir?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/d1a7d8bb3873.mp3"
      }
     }
    ]
   },
   "minutes": {
    "speaker": "w",
    "text": "Sure, take your time. I'll be back in a moment.",
    "pt": "Claro, fiquem à vontade. Já volto.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/3d277b9491c6.mp3",
    "next": "back"
   },
   "recommend": {
    "speaker": "w",
    "text": "The lasagna is our chef's favorite. It's homemade.",
    "pt": "A lasanha é a favorita do nosso chef. É caseira.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/63ed8649a262.mp3",
    "next": "back"
   },
   "back": {
    "speaker": "w",
    "text": "So, have you decided?",
    "pt": "E então, decidiram?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/f006239a1918.mp3",
    "options": [
     {
      "text": "Yes, I'd like the steak, please.",
      "pt": "Sim, eu quero o bife, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/2a3e997cfc59.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/edbdf5e169cc.mp3",
      "next": "steak"
     },
     {
      "text": "I'll try the lasagna.",
      "pt": "Vou experimentar a lasanha.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/0d8733c438ef.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/ae5fe053fe78.mp3",
      "next": "side"
     },
     {
      "text": "The salmon special, please.",
      "pt": "O salmão do dia, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/53c0fbf0a346.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/a166ab765112.mp3",
      "next": "side"
     },
     {
      "text": "Yes, I decided to study English.",
      "pt": "Sim, decidi estudar inglês.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/44d7c17731b2.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/1ce1de062ddc.mp3",
      "next": null,
      "react": {
       "text": "Good for you! But what would you like to eat?",
       "pt": "Que bom! Mas o que você vai querer comer?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/4107430ce177.mp3"
      }
     }
    ]
   },
   "steak": {
    "speaker": "w",
    "text": "How would you like your steak?",
    "pt": "Como você quer o seu bife?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/986e7d53c7a7.mp3",
    "options": [
     {
      "text": "Medium, please.",
      "pt": "Ao ponto, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/ccdf515f1347.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/2fb3f8059ad2.mp3",
      "next": "side"
     },
     {
      "text": "Well done, please.",
      "pt": "Bem passado, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/9e8cd0ff82c4.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/c480e94dc7ac.mp3",
      "next": "side"
     },
     {
      "text": "With my friends.",
      "pt": "Com os meus amigos.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/b3b6a9fcb25a.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/0fa1cf3a2f72.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean how do you want it cooked? Rare, medium, or well done?",
       "pt": "Desculpe, quero dizer, como quer o ponto? Mal passado, ao ponto ou bem passado?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/8535047db8df.mp3"
      }
     }
    ]
   },
   "side": {
    "speaker": "w",
    "text": "Excellent choice. Would you like a salad or fries on the side?",
    "pt": "Ótima escolha. Quer salada ou batata frita de acompanhamento?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/1abbacd7a647.mp3",
    "options": [
     {
      "text": "A salad, please.",
      "pt": "Salada, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/c5f119b8983a.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/cec36ab6b624.mp3",
      "next": "allergy"
     },
     {
      "text": "Fries, please.",
      "pt": "Batata frita, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/9e0716fbe597.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/8bfa0011a7d0.mp3",
      "next": "allergy"
     },
     {
      "text": "On the left side.",
      "pt": "Do lado esquerdo.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/13609861fae6.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/d34cb2947631.mp3",
      "next": null,
      "react": {
       "text": "Ha, no, I mean, salad or fries with your meal?",
       "pt": "Rá, não, quero dizer, salada ou fritas com o prato?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/3880f595b569.mp3"
      }
     }
    ]
   },
   "allergy": {
    "speaker": "w",
    "text": "Do you have any food allergies I should know about?",
    "pt": "Você tem alguma alergia alimentar que eu deva saber?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/31d52af12974.mp3",
    "options": [
     {
      "text": "No, none.",
      "pt": "Não, nenhuma.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/6a91e8e22f71.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/09433d0f1eb6.mp3",
      "next": "served"
     },
     {
      "text": "Yes, I'm allergic to nuts.",
      "pt": "Sim, tenho alergia a nozes e castanhas.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/cbbc6032e619.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/ddf5525f954c.mp3",
      "next": "nuts"
     },
     {
      "text": "Yes, I have two kids.",
      "pt": "Sim, tenho dois filhos.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/e29c61b62053.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/b3755f6410ac.mp3",
      "next": null,
      "react": {
       "text": "That's nice! But I mean, are you allergic to any food?",
       "pt": "Que bom! Mas quero dizer, você tem alergia a algum alimento?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/7882cbbb4efe.mp3"
      }
     }
    ]
   },
   "nuts": {
    "speaker": "w",
    "text": "Thank you for telling me. I'll let the chef know, and your dish will be nut-free.",
    "pt": "Obrigado por avisar. Vou falar com o chef, e o seu prato virá sem castanhas.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/948fa63f759f.mp3",
    "next": "served"
   },
   "served": {
    "speaker": "w",
    "text": "Here you are. Enjoy your meal! ... So, how was everything?",
    "pt": "Aqui está. Bom apetite! ... E então, estava tudo bom?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/8227db8e54a2.mp3",
    "options": [
     {
      "text": "It was delicious, thank you!",
      "pt": "Estava delicioso, obrigado!",
      "audio": "talk/dialogues/dinner-at-a-restaurant/16966a6933e5.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/149aea2ed255.mp3",
      "next": "dessert"
     },
     {
      "text": "It was good, but a little salty.",
      "pt": "Estava bom, mas um pouco salgado.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/06c20a2ffbd3.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/e9acdad1f481.mp3",
      "next": "salty"
     },
     {
      "text": "At eight o'clock.",
      "pt": "Às oito horas.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/1e11ede671c7.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/5a2031205616.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Did you enjoy the food?",
       "pt": "Como? Você gostou da comida?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/422a65d28d52.mp3"
      }
     }
    ]
   },
   "salty": {
    "speaker": "w",
    "text": "I'm sorry about that. I'll tell the chef. Dessert is on us tonight.",
    "pt": "Sinto muito por isso. Vou avisar o chef. A sobremesa hoje é por nossa conta.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/259ad7b61f8e.mp3",
    "next": "dessert"
   },
   "dessert": {
    "speaker": "w",
    "text": "Would you like to see the dessert menu?",
    "pt": "Gostariam de ver o cardápio de sobremesas?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/5bf6d8b11ea3.mp3",
    "options": [
     {
      "text": "Yes, please. Do you have chocolate cake?",
      "pt": "Sim, por favor. Vocês têm bolo de chocolate?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/d38e4d2a9594.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/0e6590639899.mp3",
      "next": "cake"
     },
     {
      "text": "No, thanks. Just the check, please.",
      "pt": "Não, obrigado. Só a conta, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/b20a18be2a1c.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/38d384c02fc5.mp3",
      "next": "check"
     },
     {
      "text": "I see my friend every week.",
      "pt": "Vejo meu amigo toda semana.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/c2fc8f6b7e00.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/eb1a38345666.mp3",
      "next": null,
      "react": {
       "text": "How nice! But would you like some dessert?",
       "pt": "Que bom! Mas vocês querem sobremesa?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/dd801627d8c1.mp3"
      }
     }
    ]
   },
   "cake": {
    "speaker": "w",
    "text": "We do! It's very popular. I'll bring it right away. ... And here's your check.",
    "pt": "Temos! É muito pedido. Já trago. ... E aqui está a conta.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/87ca57a5c0b5.mp3",
    "next": "check2"
   },
   "check": {
    "speaker": "w",
    "text": "Of course. Here's your check.",
    "pt": "Claro. Aqui está a conta.",
    "audio": "talk/dialogues/dinner-at-a-restaurant/f1643c74c76f.mp3",
    "next": "check2"
   },
   "check2": {
    "speaker": "w",
    "text": "Would you like to pay together or separately?",
    "pt": "Vocês querem pagar junto ou separado?",
    "audio": "talk/dialogues/dinner-at-a-restaurant/193c5dc1bf27.mp3",
    "options": [
     {
      "text": "Together, please.",
      "pt": "Junto, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/0bd0a74f565c.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/572d88623243.mp3",
      "next": "end"
     },
     {
      "text": "Separately, please.",
      "pt": "Separado, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/3249455e9e72.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/e16dc4be78c5.mp3",
      "next": "end"
     },
     {
      "text": "Yes, it's chocolate.",
      "pt": "Sim, é de chocolate.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/ed69f07a8ed3.mp3",
      "audioF": "talk/dialogues/dinner-at-a-restaurant/208a4383d5bc.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Will you pay together or separately?",
       "pt": "Como? Vão pagar junto ou separado?",
       "audio": "talk/dialogues/dinner-at-a-restaurant/68b95c039e28.mp3"
      }
     }
    ]
   },
   "end": {
    "speaker": "w",
    "text": "Thank you so much. Have a wonderful evening!",
    "pt": "Muito obrigado. Tenham uma noite maravilhosa!",
    "audio": "talk/dialogues/dinner-at-a-restaurant/8ed22d347d88.mp3",
    "end": true
   }
  },
  "nudges": {
   "w": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/dinner-at-a-restaurant/5dacad02feaa.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/dinner-at-a-restaurant/7b2215ee6d4e.mp3"
    }
   ]
  }
 },
 {
  "slug": "buying-a-jacket",
  "title": "Buying a Jacket",
  "level": "A2",
  "description": "Experimente e compre roupa numa loja.",
  "intro": "Está esfriando e você precisa de uma jaqueta. Você entra numa loja de roupas e a vendedora Lily vem falar com você.",
  "cast": {
   "s": {
    "name": "Lily",
    "role": "Vendedora"
   }
  },
  "start": "s1",
  "decisions": [
   7,
   8
  ],
  "nodes": {
   "s1": {
    "speaker": "s",
    "text": "Hi! Can I help you find anything?",
    "pt": "Oi! Posso ajudar você a encontrar alguma coisa?",
    "audio": "talk/dialogues/buying-a-jacket/a769b6dccb1e.mp3",
    "options": [
     {
      "text": "Yes, I'm looking for a jacket.",
      "pt": "Sim, estou procurando uma jaqueta.",
      "audio": "talk/dialogues/buying-a-jacket/b76f65b937a7.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/2f83a1480a5c.mp3",
      "next": "jacket"
     },
     {
      "text": "I'm just looking, thanks.",
      "pt": "Só estou olhando, obrigado.",
      "audio": "talk/dialogues/buying-a-jacket/420b133a6e77.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/2c2c84c3f0e7.mp3",
      "next": "look"
     },
     {
      "text": "I found my keys yesterday.",
      "pt": "Achei minhas chaves ontem.",
      "audio": "talk/dialogues/buying-a-jacket/cbcf902fb880.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/b7a7dbe34ddd.mp3",
      "next": null,
      "react": {
       "text": "Oh, good! But can I help you find something here?",
       "pt": "Ah, que bom! Mas posso ajudar você a achar algo aqui?",
       "audio": "talk/dialogues/buying-a-jacket/ac3b68ffe2c7.mp3"
      }
     }
    ]
   },
   "look": {
    "speaker": "s",
    "text": "No problem. That jacket on the mannequin is new this week, by the way.",
    "pt": "Sem problema. Aliás, aquela jaqueta no manequim chegou esta semana.",
    "audio": "talk/dialogues/buying-a-jacket/2ae0ef340fc9.mp3",
    "next": "look2"
   },
   "look2": {
    "speaker": "s",
    "text": "Would you like to try it on?",
    "pt": "Quer experimentar?",
    "audio": "talk/dialogues/buying-a-jacket/1bc30dd05d0b.mp3",
    "options": [
     {
      "text": "Yes, I'd love to.",
      "pt": "Sim, adoraria.",
      "audio": "talk/dialogues/buying-a-jacket/89277f5a9053.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/2661548d20c5.mp3",
      "next": "size"
     },
     {
      "text": "How much is it?",
      "pt": "Quanto custa?",
      "audio": "talk/dialogues/buying-a-jacket/a8697a5b2772.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/b851951bb632.mp3",
      "next": "price"
     },
     {
      "text": "I'm on vacation.",
      "pt": "Estou de férias.",
      "audio": "talk/dialogues/buying-a-jacket/139dc21a5e8e.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/2464bd0d4f7f.mp3",
      "next": null,
      "react": {
       "text": "Lucky you! So, would you like to try the jacket on?",
       "pt": "Que sorte! Então, quer experimentar a jaqueta?",
       "audio": "talk/dialogues/buying-a-jacket/2296f6963ec4.mp3"
      }
     }
    ]
   },
   "price": {
    "speaker": "s",
    "text": "It's sixty dollars, but it's twenty percent off today.",
    "pt": "Custa sessenta dólares, mas hoje está com vinte por cento de desconto.",
    "audio": "talk/dialogues/buying-a-jacket/9a8784355075.mp3",
    "next": "size"
   },
   "jacket": {
    "speaker": "s",
    "text": "Great. We have leather jackets and denim jackets. Which do you prefer?",
    "pt": "Ótimo. Temos jaquetas de couro e jaquetas jeans. Qual você prefere?",
    "audio": "talk/dialogues/buying-a-jacket/2d7a964f8ff3.mp3",
    "options": [
     {
      "text": "A denim jacket, please.",
      "pt": "Uma jaqueta jeans, por favor.",
      "audio": "talk/dialogues/buying-a-jacket/45eac205e64d.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/1bbf2d4d5ab8.mp3",
      "next": "size"
     },
     {
      "text": "Can I see the leather ones?",
      "pt": "Posso ver as de couro?",
      "audio": "talk/dialogues/buying-a-jacket/54b919e6458c.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/dcaec53b08ee.mp3",
      "next": "leather"
     },
     {
      "text": "I prefer summer.",
      "pt": "Prefiro o verão.",
      "audio": "talk/dialogues/buying-a-jacket/af7c35c20069.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/3041feeaccb4.mp3",
      "next": null,
      "react": {
       "text": "Me too! But which kind of jacket do you prefer?",
       "pt": "Eu também! Mas que tipo de jaqueta você prefere?",
       "audio": "talk/dialogues/buying-a-jacket/726a5a8388bc.mp3"
      }
     }
    ]
   },
   "leather": {
    "speaker": "s",
    "text": "Sure, they're over here. This black one is very popular.",
    "pt": "Claro, ficam aqui. Esta preta vende muito.",
    "audio": "talk/dialogues/buying-a-jacket/1855faccae0e.mp3",
    "next": "size"
   },
   "size": {
    "speaker": "s",
    "text": "What size are you?",
    "pt": "Qual é o seu tamanho?",
    "audio": "talk/dialogues/buying-a-jacket/977ea4edf0c9.mp3",
    "options": [
     {
      "text": "I'm a medium.",
      "pt": "Uso médio.",
      "audio": "talk/dialogues/buying-a-jacket/dc0f0396ccfd.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/d542c84b72f5.mp3",
      "next": "fitting"
     },
     {
      "text": "I think I'm a large.",
      "pt": "Acho que uso grande.",
      "audio": "talk/dialogues/buying-a-jacket/5669f2018ad6.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/fbbb04259612.mp3",
      "next": "fitting"
     },
     {
      "text": "I'm a software engineer.",
      "pt": "Sou engenheiro de software.",
      "audio": "talk/dialogues/buying-a-jacket/97013ddd7bd6.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/ef80d2644b86.mp3",
      "next": null,
      "react": {
       "text": "Oh, interesting! But what size do you wear? Small, medium or large?",
       "pt": "Ah, interessante! Mas que tamanho você usa? Pequeno, médio ou grande?",
       "audio": "talk/dialogues/buying-a-jacket/279301f43f4b.mp3"
      }
     }
    ]
   },
   "fitting": {
    "speaker": "s",
    "text": "Here you go. The fitting rooms are at the back, on the right.",
    "pt": "Aqui está. Os provadores ficam no fundo, à direita.",
    "audio": "talk/dialogues/buying-a-jacket/60b6e2bb4582.mp3",
    "next": "fit"
   },
   "fit": {
    "speaker": "s",
    "text": "So, how does it fit?",
    "pt": "E aí, como ficou?",
    "audio": "talk/dialogues/buying-a-jacket/7d4daf4bc6e1.mp3",
    "options": [
     {
      "text": "It's a bit too tight.",
      "pt": "Está um pouco apertada.",
      "audio": "talk/dialogues/buying-a-jacket/d4ce64b62691.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/5eda81b76abd.mp3",
      "next": "bigger"
     },
     {
      "text": "It fits perfectly!",
      "pt": "Ficou perfeita!",
      "audio": "talk/dialogues/buying-a-jacket/67101f91ea5d.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/e85e79deadd4.mp3",
      "next": "color"
     },
     {
      "text": "It's next to the door.",
      "pt": "Fica ao lado da porta.",
      "audio": "talk/dialogues/buying-a-jacket/8c788917be43.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/0d53f85ac5ba.mp3",
      "next": null,
      "react": {
       "text": "Sorry? I mean, is the size right for you?",
       "pt": "Como? Quero dizer, o tamanho ficou bom?",
       "audio": "talk/dialogues/buying-a-jacket/2f243601ae10.mp3"
      }
     }
    ]
   },
   "bigger": {
    "speaker": "s",
    "text": "Let me get you a bigger size. Here you go, this one should be better.",
    "pt": "Vou pegar um tamanho maior. Aqui está, esta deve ficar melhor.",
    "audio": "talk/dialogues/buying-a-jacket/15fde3792244.mp3",
    "next": "color"
   },
   "color": {
    "speaker": "s",
    "text": "It also comes in blue and green. Do you want to see the other colors?",
    "pt": "Também tem em azul e verde. Quer ver as outras cores?",
    "audio": "talk/dialogues/buying-a-jacket/12fc08c4efba.mp3",
    "options": [
     {
      "text": "No, I like this one.",
      "pt": "Não, gostei desta.",
      "audio": "talk/dialogues/buying-a-jacket/30b9d10d5a34.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/80c43f7379ca.mp3",
      "next": "more"
     },
     {
      "text": "Yes, can I see the blue one?",
      "pt": "Sim, posso ver a azul?",
      "audio": "talk/dialogues/buying-a-jacket/e8f8955c83c2.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/9c527f321c7e.mp3",
      "next": "blue"
     },
     {
      "text": "My eyes are brown.",
      "pt": "Meus olhos são castanhos.",
      "audio": "talk/dialogues/buying-a-jacket/a4495be15d9c.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/0d94e9561d88.mp3",
      "next": null,
      "react": {
       "text": "Nice! But would you like to see the other colors?",
       "pt": "Legal! Mas quer ver as outras cores?",
       "audio": "talk/dialogues/buying-a-jacket/24ebf97a15eb.mp3"
      }
     }
    ]
   },
   "blue": {
    "speaker": "s",
    "text": "Here it is. The blue looks really good on you!",
    "pt": "Aqui está. A azul ficou muito bem em você!",
    "audio": "talk/dialogues/buying-a-jacket/a296d50665ef.mp3",
    "next": "blue2"
   },
   "blue2": {
    "speaker": "s",
    "text": "Which one will you take?",
    "pt": "Qual você vai levar?",
    "audio": "talk/dialogues/buying-a-jacket/9f40f4446875.mp3",
    "options": [
     {
      "text": "I'll take the blue one.",
      "pt": "Vou levar a azul.",
      "audio": "talk/dialogues/buying-a-jacket/6b76efbd0498.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/1c4b7821f640.mp3",
      "next": "more"
     },
     {
      "text": "I'll stay with the first one.",
      "pt": "Vou ficar com a primeira.",
      "audio": "talk/dialogues/buying-a-jacket/eb0f812b4f33.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/f5822d9ee74d.mp3",
      "next": "more"
     },
     {
      "text": "I take the bus to work.",
      "pt": "Eu pego ônibus para o trabalho.",
      "audio": "talk/dialogues/buying-a-jacket/76ec79bb0c5f.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/e867749a75e3.mp3",
      "next": null,
      "react": {
       "text": "Ha, no, I mean, which jacket will you buy?",
       "pt": "Rá, não, quero dizer, qual jaqueta você vai comprar?",
       "audio": "talk/dialogues/buying-a-jacket/07e3c71318f5.mp3"
      }
     }
    ]
   },
   "more": {
    "speaker": "s",
    "text": "Great choice. Would you like anything else? Our scarves are on sale.",
    "pt": "Ótima escolha. Quer mais alguma coisa? Nossos cachecóis estão em promoção.",
    "audio": "talk/dialogues/buying-a-jacket/9522a47d2ba8.mp3",
    "options": [
     {
      "text": "No, just the jacket, thanks.",
      "pt": "Não, só a jaqueta, obrigado.",
      "audio": "talk/dialogues/buying-a-jacket/8cbd1c92114d.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/88a68612750a.mp3",
      "next": "bag"
     },
     {
      "text": "Sure, I'll take a scarf too.",
      "pt": "Claro, vou levar um cachecol também.",
      "audio": "talk/dialogues/buying-a-jacket/61c5a3c08539.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/503374a392fc.mp3",
      "next": "bag"
     },
     {
      "text": "Twenty-five degrees.",
      "pt": "Vinte e cinco graus.",
      "audio": "talk/dialogues/buying-a-jacket/975351ac28db.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/d83285c58d12.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Would you like anything else?",
       "pt": "Como? Quer mais alguma coisa?",
       "audio": "talk/dialogues/buying-a-jacket/ce57ef594760.mp3"
      }
     }
    ]
   },
   "bag": {
    "speaker": "s",
    "text": "Would you like a bag and a gift receipt?",
    "pt": "Quer uma sacola e um recibo de presente?",
    "audio": "talk/dialogues/buying-a-jacket/31a131ce4ca6.mp3",
    "options": [
     {
      "text": "Just a bag, please.",
      "pt": "Só a sacola, por favor.",
      "audio": "talk/dialogues/buying-a-jacket/b98e5c85ad4a.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/68e8cf9b6ee0.mp3",
      "next": "end"
     },
     {
      "text": "Yes, please. It's a gift for my brother.",
      "pt": "Sim, por favor. É um presente para o meu irmão.",
      "audio": "talk/dialogues/buying-a-jacket/4dde2dd70047.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/d8968f0fdaa2.mp3",
      "next": "gift"
     },
     {
      "text": "I can't swim.",
      "pt": "Eu não sei nadar.",
      "audio": "talk/dialogues/buying-a-jacket/8bbc2efa19bd.mp3",
      "audioF": "talk/dialogues/buying-a-jacket/256b4ed8b714.mp3",
      "next": null,
      "react": {
       "text": "Oh! But do you want a bag and a gift receipt?",
       "pt": "Ah! Mas você quer sacola e recibo de presente?",
       "audio": "talk/dialogues/buying-a-jacket/480ecb15678e.mp3"
      }
     }
    ]
   },
   "gift": {
    "speaker": "s",
    "text": "How nice! I'll put the receipt in the bag so he can exchange it.",
    "pt": "Que legal! Vou colocar o recibo na sacola para ele poder trocar.",
    "audio": "talk/dialogues/buying-a-jacket/26aafe5fa6fa.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "s",
    "text": "Here you go. You can return or exchange it within thirty days. Have a nice day!",
    "pt": "Aqui está. Você pode devolver ou trocar em até trinta dias. Tenha um bom dia!",
    "audio": "talk/dialogues/buying-a-jacket/fd42dcc2c3a9.mp3",
    "end": true
   }
  },
  "nudges": {
   "s": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/buying-a-jacket/a32af78d0431.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/buying-a-jacket/f3b4bac0f2f9.mp3"
    }
   ]
  }
 },
 {
  "slug": "at-the-airport",
  "title": "At the Airport",
  "level": "A2",
  "description": "Check-in, bagagem e raio-x.",
  "intro": "Seis da manhã no aeroporto. Você vai fazer o check-in no balcão e depois passar pela segurança.",
  "cast": {
   "a": {
    "name": "Daniel",
    "role": "Atendente da companhia"
   },
   "o": {
    "name": "Officer Sarah",
    "role": "Agente de segurança"
   }
  },
  "start": "a1",
  "decisions": [
   7,
   9
  ],
  "nodes": {
   "a1": {
    "speaker": "a",
    "text": "Good morning. Where are you flying to today?",
    "pt": "Bom dia. Para onde você vai voar hoje?",
    "audio": "talk/dialogues/at-the-airport/6f5d9ba9d644.mp3",
    "options": [
     {
      "text": "To New York.",
      "pt": "Para Nova York.",
      "audio": "talk/dialogues/at-the-airport/e69e1234198a.mp3",
      "audioF": "talk/dialogues/at-the-airport/ff198f77ac52.mp3",
      "next": "passport"
     },
     {
      "text": "I'm going to Lisbon.",
      "pt": "Vou para Lisboa.",
      "audio": "talk/dialogues/at-the-airport/4a35495741cc.mp3",
      "audioF": "talk/dialogues/at-the-airport/8a2579bdf9d1.mp3",
      "next": "passport"
     },
     {
      "text": "Since last Monday.",
      "pt": "Desde segunda passada.",
      "audio": "talk/dialogues/at-the-airport/60bfc17cbdab.mp3",
      "audioF": "talk/dialogues/at-the-airport/6088a1985ff3.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Where are you traveling to?",
       "pt": "Como? Para onde você está viajando?",
       "audio": "talk/dialogues/at-the-airport/1da480218e52.mp3"
      }
     }
    ]
   },
   "passport": {
    "speaker": "a",
    "text": "Can I see your passport and ticket, please?",
    "pt": "Posso ver seu passaporte e sua passagem, por favor?",
    "audio": "talk/dialogues/at-the-airport/cdad0303c387.mp3",
    "options": [
     {
      "text": "Here you are.",
      "pt": "Aqui estão.",
      "audio": "talk/dialogues/at-the-airport/4aaff6fa5bd2.mp3",
      "audioF": "talk/dialogues/at-the-airport/8d530eb35a84.mp3",
      "next": "bags"
     },
     {
      "text": "I have the ticket on my phone. Is that okay?",
      "pt": "Estou com a passagem no celular. Tudo bem?",
      "audio": "talk/dialogues/at-the-airport/5f9a0b152641.mp3",
      "audioF": "talk/dialogues/at-the-airport/563f17b32886.mp3",
      "next": "phone"
     },
     {
      "text": "I'm a little tired.",
      "pt": "Estou um pouco cansado.",
      "audio": "talk/dialogues/at-the-airport/235b14d68c3c.mp3",
      "audioF": "talk/dialogues/at-the-airport/e0bfc87d6dcf.mp3",
      "next": null,
      "react": {
       "text": "Early flights are tough! May I see your passport, please?",
       "pt": "Voo cedo é difícil! Posso ver seu passaporte, por favor?",
       "audio": "talk/dialogues/at-the-airport/828e184c4a59.mp3"
      }
     }
    ]
   },
   "phone": {
    "speaker": "a",
    "text": "That's fine. I just need your passport, then.",
    "pt": "Tudo bem. Então só preciso do seu passaporte.",
    "audio": "talk/dialogues/at-the-airport/bda00e86bfac.mp3",
    "next": "bags"
   },
   "bags": {
    "speaker": "a",
    "text": "Thank you. Are you checking any bags today?",
    "pt": "Obrigado. Vai despachar alguma mala hoje?",
    "audio": "talk/dialogues/at-the-airport/5984c5b6feb6.mp3",
    "options": [
     {
      "text": "Yes, just this suitcase.",
      "pt": "Sim, só esta mala.",
      "audio": "talk/dialogues/at-the-airport/ba89268de52d.mp3",
      "audioF": "talk/dialogues/at-the-airport/641e672333b7.mp3",
      "next": "weight"
     },
     {
      "text": "No, only my carry-on.",
      "pt": "Não, só a de mão.",
      "audio": "talk/dialogues/at-the-airport/c0853a0f67f1.mp3",
      "audioF": "talk/dialogues/at-the-airport/7648619a79d6.mp3",
      "next": "seat"
     },
     {
      "text": "I checked my email.",
      "pt": "Eu chequei meu e-mail.",
      "audio": "talk/dialogues/at-the-airport/32952f8865b6.mp3",
      "audioF": "talk/dialogues/at-the-airport/72f6cf7232b4.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean luggage. Are you checking any bags?",
       "pt": "Desculpe, falo da bagagem. Vai despachar alguma mala?",
       "audio": "talk/dialogues/at-the-airport/a6d2830701c1.mp3"
      }
     }
    ]
   },
   "weight": {
    "speaker": "a",
    "text": "Please put it on the scale. Hmm, it's twenty-five kilos. The limit is twenty-three.",
    "pt": "Coloque na balança, por favor. Hum, são vinte e cinco quilos. O limite é vinte e três.",
    "audio": "talk/dialogues/at-the-airport/e2e0fb6fd76e.mp3",
    "next": "weight2"
   },
   "weight2": {
    "speaker": "a",
    "text": "You can pay a fee, or take something out. What would you like to do?",
    "pt": "Você pode pagar uma taxa ou tirar alguma coisa. O que prefere?",
    "audio": "talk/dialogues/at-the-airport/e2d88fa9d4fa.mp3",
    "options": [
     {
      "text": "How much is the fee?",
      "pt": "Quanto é a taxa?",
      "audio": "talk/dialogues/at-the-airport/6ac5bf97db82.mp3",
      "audioF": "talk/dialogues/at-the-airport/11be32d1865c.mp3",
      "next": "fee"
     },
     {
      "text": "I'll take something out.",
      "pt": "Vou tirar alguma coisa.",
      "audio": "talk/dialogues/at-the-airport/43a16fe40cb7.mp3",
      "audioF": "talk/dialogues/at-the-airport/507e802fb7fe.mp3",
      "next": "repack"
     },
     {
      "text": "I'm on a diet.",
      "pt": "Estou de dieta.",
      "audio": "talk/dialogues/at-the-airport/335c69e5ed7b.mp3",
      "audioF": "talk/dialogues/at-the-airport/72576982f740.mp3",
      "next": null,
      "react": {
       "text": "Ha! No, I mean your suitcase is too heavy. What would you like to do?",
       "pt": "Rá! Não, quero dizer, sua mala está pesada demais. O que prefere fazer?",
       "audio": "talk/dialogues/at-the-airport/e77b8ddd4978.mp3"
      }
     }
    ]
   },
   "fee": {
    "speaker": "a",
    "text": "It's fifty dollars.",
    "pt": "São cinquenta dólares.",
    "audio": "talk/dialogues/at-the-airport/ee3202ef905d.mp3",
    "next": "fee2"
   },
   "fee2": {
    "speaker": "a",
    "text": "Would you like to pay it?",
    "pt": "Quer pagar?",
    "audio": "talk/dialogues/at-the-airport/0f2fd5893913.mp3",
    "options": [
     {
      "text": "Okay, I'll pay.",
      "pt": "Tudo bem, eu pago.",
      "audio": "talk/dialogues/at-the-airport/4b327f9a2423.mp3",
      "audioF": "talk/dialogues/at-the-airport/8cd6de26d1b9.mp3",
      "next": "seat"
     },
     {
      "text": "That's too much. I'll take some things out.",
      "pt": "É caro demais. Vou tirar algumas coisas.",
      "audio": "talk/dialogues/at-the-airport/2c9348339042.mp3",
      "audioF": "talk/dialogues/at-the-airport/94130e9ea101.mp3",
      "next": "repack"
     },
     {
      "text": "My bag is blue.",
      "pt": "Minha mala é azul.",
      "audio": "talk/dialogues/at-the-airport/f5bb0f71e00d.mp3",
      "audioF": "talk/dialogues/at-the-airport/834bbfbea4fe.mp3",
      "next": null,
      "react": {
       "text": "I can see that! But do you want to pay the fee?",
       "pt": "Estou vendo! Mas quer pagar a taxa?",
       "audio": "talk/dialogues/at-the-airport/35a700e8d34b.mp3"
      }
     }
    ]
   },
   "repack": {
    "speaker": "a",
    "text": "No problem. Perfect, it's twenty-two kilos now.",
    "pt": "Sem problema. Perfeito, agora são vinte e dois quilos.",
    "audio": "talk/dialogues/at-the-airport/ccd1aca5ac2c.mp3",
    "next": "seat"
   },
   "seat": {
    "speaker": "a",
    "text": "Would you prefer a window or an aisle seat?",
    "pt": "Prefere assento na janela ou no corredor?",
    "audio": "talk/dialogues/at-the-airport/46b49fd9140e.mp3",
    "options": [
     {
      "text": "A window seat, please.",
      "pt": "Na janela, por favor.",
      "audio": "talk/dialogues/at-the-airport/98063142e12b.mp3",
      "audioF": "talk/dialogues/at-the-airport/271a2c26f4e4.mp3",
      "next": "window"
     },
     {
      "text": "An aisle seat, please.",
      "pt": "No corredor, por favor.",
      "audio": "talk/dialogues/at-the-airport/9474e095af8c.mp3",
      "audioF": "talk/dialogues/at-the-airport/694932159345.mp3",
      "next": "boarding"
     },
     {
      "text": "I'd prefer a sandwich.",
      "pt": "Eu preferiria um sanduíche.",
      "audio": "talk/dialogues/at-the-airport/0b69bfefaac9.mp3",
      "audioF": "talk/dialogues/at-the-airport/8601a832f027.mp3",
      "next": null,
      "react": {
       "text": "Ha! The seat, I mean. Window or aisle?",
       "pt": "Rá! O assento, quero dizer. Janela ou corredor?",
       "audio": "talk/dialogues/at-the-airport/56cd032f70e3.mp3"
      }
     }
    ]
   },
   "window": {
    "speaker": "a",
    "text": "Seat fourteen A, by the window.",
    "pt": "Assento catorze A, na janela.",
    "audio": "talk/dialogues/at-the-airport/91c639f0b7ae.mp3",
    "next": "boarding"
   },
   "boarding": {
    "speaker": "a",
    "text": "Here's your boarding pass. Boarding starts at ten fifteen, at gate twenty-two. Any questions?",
    "pt": "Aqui está seu cartão de embarque. O embarque começa às dez e quinze, no portão vinte e dois. Alguma pergunta?",
    "audio": "talk/dialogues/at-the-airport/d2f7673201bf.mp3",
    "options": [
     {
      "text": "Where is gate twenty-two?",
      "pt": "Onde fica o portão vinte e dois?",
      "audio": "talk/dialogues/at-the-airport/6fc95e9a9981.mp3",
      "audioF": "talk/dialogues/at-the-airport/127b45372e08.mp3",
      "next": "gate"
     },
     {
      "text": "Is the flight on time?",
      "pt": "O voo está no horário?",
      "audio": "talk/dialogues/at-the-airport/3600621ffa07.mp3",
      "audioF": "talk/dialogues/at-the-airport/dfdaaea2c519.mp3",
      "next": "ontime"
     },
     {
      "text": "No, thank you.",
      "pt": "Não, obrigado.",
      "audio": "talk/dialogues/at-the-airport/8d3b0ef01faa.mp3",
      "audioF": "talk/dialogues/at-the-airport/9966dafe0578.mp3",
      "next": "security"
     },
     {
      "text": "At my grandmother's house.",
      "pt": "Na casa da minha avó.",
      "audio": "talk/dialogues/at-the-airport/c74d5daa52cb.mp3",
      "audioF": "talk/dialogues/at-the-airport/31f6a8f717d1.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Do you have any questions about your flight?",
       "pt": "Como? Tem alguma pergunta sobre o voo?",
       "audio": "talk/dialogues/at-the-airport/e8300820452f.mp3"
      }
     }
    ]
   },
   "gate": {
    "speaker": "a",
    "text": "Go through security and turn right. It's about a five-minute walk.",
    "pt": "Passe pela segurança e vire à direita. É uns cinco minutos a pé.",
    "audio": "talk/dialogues/at-the-airport/99b3e7b93703.mp3",
    "next": "security"
   },
   "ontime": {
    "speaker": "a",
    "text": "Yes, it's on time today. Have a nice flight.",
    "pt": "Sim, hoje está no horário. Faça uma boa viagem.",
    "audio": "talk/dialogues/at-the-airport/fe745bf80fef.mp3",
    "next": "security"
   },
   "security": {
    "speaker": "o",
    "text": "Next, please! Do you have any liquids or a laptop in your bag?",
    "pt": "Próximo, por favor! Tem líquidos ou notebook na bolsa?",
    "audio": "talk/dialogues/at-the-airport/7d6ee05ae835.mp3",
    "options": [
     {
      "text": "Yes, I have a laptop.",
      "pt": "Sim, tenho um notebook.",
      "audio": "talk/dialogues/at-the-airport/2b7e7d9f6598.mp3",
      "audioF": "talk/dialogues/at-the-airport/7daf648846ab.mp3",
      "next": "laptop"
     },
     {
      "text": "Just a small bottle of shampoo.",
      "pt": "Só um frasco pequeno de xampu.",
      "audio": "talk/dialogues/at-the-airport/02162ae09c28.mp3",
      "audioF": "talk/dialogues/at-the-airport/039c25f2f5db.mp3",
      "next": "liquid"
     },
     {
      "text": "No, nothing.",
      "pt": "Não, nada.",
      "audio": "talk/dialogues/at-the-airport/1806f0db1821.mp3",
      "audioF": "talk/dialogues/at-the-airport/1787fa39f57a.mp3",
      "next": "beep"
     },
     {
      "text": "I don't like flying.",
      "pt": "Eu não gosto de voar.",
      "audio": "talk/dialogues/at-the-airport/8ed0fbfda899.mp3",
      "audioF": "talk/dialogues/at-the-airport/3575f2ad3f93.mp3",
      "next": null,
      "react": {
       "text": "Many people don't! But do you have any liquids or a laptop in your bag?",
       "pt": "Muita gente não gosta! Mas tem líquidos ou notebook na bolsa?",
       "audio": "talk/dialogues/at-the-airport/e32822a6768c.mp3"
      }
     }
    ]
   },
   "laptop": {
    "speaker": "o",
    "text": "Please take it out and put it in a separate tray.",
    "pt": "Por favor, tire e coloque numa bandeja separada.",
    "audio": "talk/dialogues/at-the-airport/d5147625bae5.mp3",
    "next": "beep"
   },
   "liquid": {
    "speaker": "o",
    "text": "That's fine if it's under one hundred milliliters. Put it in this plastic bag, please.",
    "pt": "Tudo bem se for menos de cem mililitros. Coloque neste saquinho plástico, por favor.",
    "audio": "talk/dialogues/at-the-airport/84fcbb50ff38.mp3",
    "next": "beep"
   },
   "beep": {
    "speaker": "o",
    "text": "Now walk through, please. Oh, it's beeping. Do you have anything in your pockets?",
    "pt": "Agora passe, por favor. Ih, apitou. Tem alguma coisa nos bolsos?",
    "audio": "talk/dialogues/at-the-airport/ecb55a46b640.mp3",
    "options": [
     {
      "text": "Oh, sorry. My phone and keys.",
      "pt": "Ah, desculpe. Meu celular e as chaves.",
      "audio": "talk/dialogues/at-the-airport/838757155283.mp3",
      "audioF": "talk/dialogues/at-the-airport/bb94b9d78c42.mp3",
      "next": "end"
     },
     {
      "text": "I think it's my belt.",
      "pt": "Acho que é o meu cinto.",
      "audio": "talk/dialogues/at-the-airport/7c94fc543d2a.mp3",
      "audioF": "talk/dialogues/at-the-airport/8ff8b31f9c81.mp3",
      "next": "end"
     },
     {
      "text": "My pockets are blue.",
      "pt": "Meus bolsos são azuis.",
      "audio": "talk/dialogues/at-the-airport/2e9412170a95.mp3",
      "audioF": "talk/dialogues/at-the-airport/073ca19aaaec.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, is there anything metal in your pockets?",
       "pt": "Rá. Quero dizer, tem algo de metal nos bolsos?",
       "audio": "talk/dialogues/at-the-airport/466aad1b17ae.mp3"
      }
     }
    ]
   },
   "end": {
    "speaker": "o",
    "text": "Put them in the tray and walk through again. Okay, you're all set. Have a good flight!",
    "pt": "Coloque na bandeja e passe de novo. Pronto, está liberado. Boa viagem!",
    "audio": "talk/dialogues/at-the-airport/2242eb0756f2.mp3",
    "end": true
   }
  },
  "nudges": {
   "a": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/at-the-airport/14d04648e6a7.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/at-the-airport/595dbe8149bc.mp3"
    }
   ],
   "o": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/at-the-airport/6437aeb0ae7c.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/at-the-airport/61ca28873cf6.mp3"
    }
   ]
  }
 },
 {
  "slug": "at-the-doctor",
  "title": "At the Doctor's",
  "level": "B1",
  "description": "Explique sintomas e entenda a receita.",
  "intro": "Você não está se sentindo bem e vai à clínica de manhã cedo. Primeiro fala com a recepcionista, depois com a doutora Patel.",
  "cast": {
   "r": {
    "name": "Alice",
    "role": "Recepcionista"
   },
   "d": {
    "name": "Dr. Patel",
    "role": "Médica"
   }
  },
  "start": "m1",
  "decisions": [
   5,
   6
  ],
  "nodes": {
   "m1": {
    "speaker": "r",
    "text": "Good morning. Do you have an appointment?",
    "pt": "Bom dia. Você tem horário marcado?",
    "audio": "talk/dialogues/at-the-doctor/ddb4c9a266b2.mp3",
    "options": [
     {
      "text": "Yes, at nine thirty with Dr. Patel.",
      "pt": "Sim, às nove e meia com a doutora Patel.",
      "audio": "talk/dialogues/at-the-doctor/7fc8e3925fa7.mp3",
      "audioF": "talk/dialogues/at-the-doctor/6989e201ce57.mp3",
      "next": "wait"
     },
     {
      "text": "No, but I'm not feeling well. Can a doctor see me today?",
      "pt": "Não, mas não estou me sentindo bem. Algum médico pode me atender hoje?",
      "audio": "talk/dialogues/at-the-doctor/6e8f0c1604b6.mp3",
      "audioF": "talk/dialogues/at-the-doctor/b8721660a19f.mp3",
      "next": "walkin"
     },
     {
      "text": "I'm feeling much better than yesterday.",
      "pt": "Estou me sentindo bem melhor que ontem.",
      "audio": "talk/dialogues/at-the-doctor/bd8b32954cea.mp3",
      "audioF": "talk/dialogues/at-the-doctor/49f333f62501.mp3",
      "next": null,
      "react": {
       "text": "Glad to hear it! But do you have an appointment today?",
       "pt": "Que bom! Mas você tem horário marcado hoje?",
       "audio": "talk/dialogues/at-the-doctor/bee51a19478c.mp3"
      }
     }
    ]
   },
   "wait": {
    "speaker": "r",
    "text": "Thank you. Please take a seat. The doctor will call you shortly.",
    "pt": "Obrigada. Sente-se, por favor. A doutora já vai chamar.",
    "audio": "talk/dialogues/at-the-doctor/4b60b4ca00cc.mp3",
    "next": "doc"
   },
   "walkin": {
    "speaker": "r",
    "text": "Let me see. Dr. Patel has a cancellation at ten. Please take a seat.",
    "pt": "Deixe-me ver. A doutora Patel teve um cancelamento às dez. Sente-se, por favor.",
    "audio": "talk/dialogues/at-the-doctor/c9a8096812be.mp3",
    "next": "doc"
   },
   "doc": {
    "speaker": "d",
    "text": "Hello, come in. I'm Dr. Patel. What seems to be the problem?",
    "pt": "Olá, entre. Sou a doutora Patel. Qual parece ser o problema?",
    "audio": "talk/dialogues/at-the-doctor/1ea4e40f68b0.mp3",
    "options": [
     {
      "text": "I've had a sore throat and a fever for three days.",
      "pt": "Estou com dor de garganta e febre há três dias.",
      "audio": "talk/dialogues/at-the-doctor/a80920cf13fd.mp3",
      "audioF": "talk/dialogues/at-the-doctor/ae3d61276397.mp3",
      "next": "throat"
     },
     {
      "text": "I've had a terrible headache since yesterday.",
      "pt": "Estou com uma dor de cabeça terrível desde ontem.",
      "audio": "talk/dialogues/at-the-doctor/7d3720392029.mp3",
      "audioF": "talk/dialogues/at-the-doctor/c2e64b4603c7.mp3",
      "next": "head"
     },
     {
      "text": "I work from Monday to Friday.",
      "pt": "Trabalho de segunda a sexta.",
      "audio": "talk/dialogues/at-the-doctor/3d2408637ac2.mp3",
      "audioF": "talk/dialogues/at-the-doctor/8a240dd8bde1.mp3",
      "next": null,
      "react": {
       "text": "I see. But tell me, how are you feeling? What brings you here?",
       "pt": "Entendo. Mas me conte, como você está se sentindo? O que te traz aqui?",
       "audio": "talk/dialogues/at-the-doctor/8d8e3185175b.mp3"
      }
     }
    ]
   },
   "throat": {
    "speaker": "d",
    "text": "I see. Have you taken any medicine?",
    "pt": "Entendo. Você tomou algum remédio?",
    "audio": "talk/dialogues/at-the-doctor/f788423a27e9.mp3",
    "options": [
     {
      "text": "Just some paracetamol.",
      "pt": "Só um pouco de paracetamol.",
      "audio": "talk/dialogues/at-the-doctor/b4a34e0fdf44.mp3",
      "audioF": "talk/dialogues/at-the-doctor/d395217af1f6.mp3",
      "next": "examine"
     },
     {
      "text": "No, nothing yet.",
      "pt": "Não, nada ainda.",
      "audio": "talk/dialogues/at-the-doctor/4fcdde9927ec.mp3",
      "audioF": "talk/dialogues/at-the-doctor/727c07b0631e.mp3",
      "next": "examine"
     },
     {
      "text": "Yes, I take the bus.",
      "pt": "Sim, eu pego ônibus.",
      "audio": "talk/dialogues/at-the-doctor/d80198f900a3.mp3",
      "audioF": "talk/dialogues/at-the-doctor/0ae4cec645ba.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean medicine. Have you taken anything for the fever?",
       "pt": "Desculpe, falo de remédio. Você tomou algo para a febre?",
       "audio": "talk/dialogues/at-the-doctor/172e5317e989.mp3"
      }
     }
    ]
   },
   "examine": {
    "speaker": "d",
    "text": "Okay, let me have a look. Open your mouth and say ah. Yes, your throat is quite red.",
    "pt": "Certo, deixe-me ver. Abra a boca e diga ah. Sim, sua garganta está bem vermelha.",
    "audio": "talk/dialogues/at-the-doctor/a8452b9e2722.mp3",
    "next": "throat2"
   },
   "throat2": {
    "speaker": "d",
    "text": "It looks like an infection. Are you allergic to any antibiotics?",
    "pt": "Parece uma infecção. Você tem alergia a algum antibiótico?",
    "audio": "talk/dialogues/at-the-doctor/7a0b8801b975.mp3",
    "options": [
     {
      "text": "Yes, I'm allergic to penicillin.",
      "pt": "Sim, sou alérgico à penicilina.",
      "audio": "talk/dialogues/at-the-doctor/d96e64031d8f.mp3",
      "audioF": "talk/dialogues/at-the-doctor/1028baa72bd1.mp3",
      "next": "peni"
     },
     {
      "text": "No, not that I know of.",
      "pt": "Não, que eu saiba não.",
      "audio": "talk/dialogues/at-the-doctor/5fd54b2cba60.mp3",
      "audioF": "talk/dialogues/at-the-doctor/724d89732d14.mp3",
      "next": "presc"
     },
     {
      "text": "I'm allergic to my boss.",
      "pt": "Sou alérgico ao meu chefe.",
      "audio": "talk/dialogues/at-the-doctor/0805274e8703.mp3",
      "audioF": "talk/dialogues/at-the-doctor/e96f66fb4951.mp3",
      "next": null,
      "react": {
       "text": "Ha! I understand. But seriously, any allergies to medicine?",
       "pt": "Rá! Entendo. Mas falando sério, alergia a algum remédio?",
       "audio": "talk/dialogues/at-the-doctor/65f8039304bf.mp3"
      }
     }
    ]
   },
   "peni": {
    "speaker": "d",
    "text": "Good thing you told me. I'll prescribe a different antibiotic.",
    "pt": "Ainda bem que você falou. Vou receitar outro antibiótico.",
    "audio": "talk/dialogues/at-the-doctor/80a4d2ec400e.mp3",
    "next": "presc"
   },
   "presc": {
    "speaker": "d",
    "text": "Take one pill twice a day for seven days, after meals. Is that clear?",
    "pt": "Tome um comprimido duas vezes por dia, por sete dias, depois das refeições. Ficou claro?",
    "audio": "talk/dialogues/at-the-doctor/626e1858fee2.mp3",
    "options": [
     {
      "text": "Twice a day after meals. Got it.",
      "pt": "Duas vezes por dia depois das refeições. Entendi.",
      "audio": "talk/dialogues/at-the-doctor/d67f3e64e47e.mp3",
      "audioF": "talk/dialogues/at-the-doctor/50456b2d551a.mp3",
      "next": "rest"
     },
     {
      "text": "Can I take it with coffee?",
      "pt": "Posso tomar com café?",
      "audio": "talk/dialogues/at-the-doctor/068b66d73914.mp3",
      "audioF": "talk/dialogues/at-the-doctor/d02bd756e988.mp3",
      "next": "coffee"
     },
     {
      "text": "It's very clear outside today.",
      "pt": "O céu está bem limpo hoje.",
      "audio": "talk/dialogues/at-the-doctor/d6d9d2e9b9ce.mp3",
      "audioF": "talk/dialogues/at-the-doctor/edeba2579b14.mp3",
      "next": null,
      "react": {
       "text": "Ha, it is. But do you understand how to take the medicine?",
       "pt": "Rá, está mesmo. Mas você entendeu como tomar o remédio?",
       "audio": "talk/dialogues/at-the-doctor/d3b80393f7ad.mp3"
      }
     }
    ]
   },
   "coffee": {
    "speaker": "d",
    "text": "It's better with water. And please avoid alcohol while you're taking it.",
    "pt": "É melhor com água. E, por favor, evite bebida alcoólica enquanto estiver tomando.",
    "audio": "talk/dialogues/at-the-doctor/43e4f0d5111e.mp3",
    "next": "rest"
   },
   "rest": {
    "speaker": "d",
    "text": "You should also rest and drink plenty of fluids. Do you need a note for work?",
    "pt": "Você também deve descansar e beber bastante líquido. Precisa de um atestado para o trabalho?",
    "audio": "talk/dialogues/at-the-doctor/63f28d272481.mp3",
    "options": [
     {
      "text": "Yes, please. I can't work like this.",
      "pt": "Sim, por favor. Não consigo trabalhar assim.",
      "audio": "talk/dialogues/at-the-doctor/38732cbac6cb.mp3",
      "audioF": "talk/dialogues/at-the-doctor/b442489b2e2f.mp3",
      "next": "note"
     },
     {
      "text": "No, I work from home.",
      "pt": "Não, eu trabalho de casa.",
      "audio": "talk/dialogues/at-the-doctor/44a9106ab43f.mp3",
      "audioF": "talk/dialogues/at-the-doctor/78e0aed28d52.mp3",
      "next": "end"
     },
     {
      "text": "I wrote a note to my mother.",
      "pt": "Escrevi um bilhete para minha mãe.",
      "audio": "talk/dialogues/at-the-doctor/36c9ff821a5c.mp3",
      "audioF": "talk/dialogues/at-the-doctor/aa8fb91a9ff9.mp3",
      "next": null,
      "react": {
       "text": "That's sweet. But do you need a medical note for your job?",
       "pt": "Que fofo. Mas você precisa de atestado médico para o trabalho?",
       "audio": "talk/dialogues/at-the-doctor/386026b3d33c.mp3"
      }
     }
    ]
   },
   "note": {
    "speaker": "d",
    "text": "Here you go. I'm giving you three days off.",
    "pt": "Aqui está. Estou te dando três dias de afastamento.",
    "audio": "talk/dialogues/at-the-doctor/d6ae39ad72ee.mp3",
    "next": "end"
   },
   "head": {
    "speaker": "d",
    "text": "I'm sorry to hear that. Is it the first time you've had a headache like this?",
    "pt": "Sinto muito. É a primeira vez que você tem uma dor de cabeça assim?",
    "audio": "talk/dialogues/at-the-doctor/c2fa4ffdc80b.mp3",
    "options": [
     {
      "text": "Yes, it's the first time.",
      "pt": "Sim, é a primeira vez.",
      "audio": "talk/dialogues/at-the-doctor/afc77acbfafc.mp3",
      "audioF": "talk/dialogues/at-the-doctor/1096e34cfd6a.mp3",
      "next": "head2"
     },
     {
      "text": "No, I get them quite often.",
      "pt": "Não, eu tenho com frequência.",
      "audio": "talk/dialogues/at-the-doctor/674ef4493917.mp3",
      "audioF": "talk/dialogues/at-the-doctor/a7c988c7b918.mp3",
      "next": "often"
     },
     {
      "text": "My head is a normal size.",
      "pt": "Minha cabeça tem tamanho normal.",
      "audio": "talk/dialogues/at-the-doctor/a3471f787642.mp3",
      "audioF": "talk/dialogues/at-the-doctor/139bd4591141.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, have you had headaches like this before?",
       "pt": "Rá. Quero dizer, você já teve dores de cabeça assim antes?",
       "audio": "talk/dialogues/at-the-doctor/527f761dbe96.mp3"
      }
     }
    ]
   },
   "often": {
    "speaker": "d",
    "text": "Then we should try to find the cause.",
    "pt": "Então devemos tentar descobrir a causa.",
    "audio": "talk/dialogues/at-the-doctor/e1bf80934bf8.mp3",
    "next": "head2"
   },
   "head2": {
    "speaker": "d",
    "text": "Have you been sleeping well? And how many hours a day do you spend in front of a screen?",
    "pt": "Você tem dormido bem? E quantas horas por dia passa na frente de uma tela?",
    "audio": "talk/dialogues/at-the-doctor/8a57b6caf323.mp3",
    "options": [
     {
      "text": "Not really. And I spend about ten hours at the computer.",
      "pt": "Não muito. E passo umas dez horas no computador.",
      "audio": "talk/dialogues/at-the-doctor/74007378f99f.mp3",
      "audioF": "talk/dialogues/at-the-doctor/74fca5b064b0.mp3",
      "next": "screen"
     },
     {
      "text": "I sleep well, but I work at a computer all day.",
      "pt": "Durmo bem, mas trabalho no computador o dia inteiro.",
      "audio": "talk/dialogues/at-the-doctor/a627038554c4.mp3",
      "audioF": "talk/dialogues/at-the-doctor/0849c7befa5e.mp3",
      "next": "screen"
     },
     {
      "text": "I sleep in a very big bed.",
      "pt": "Durmo numa cama muito grande.",
      "audio": "talk/dialogues/at-the-doctor/7158d75a26b4.mp3",
      "audioF": "talk/dialogues/at-the-doctor/5b91495c4f1b.mp3",
      "next": null,
      "react": {
       "text": "Lucky you! But do you sleep well? And how much screen time do you have?",
       "pt": "Que sorte! Mas você dorme bem? E quanto tempo passa na tela?",
       "audio": "talk/dialogues/at-the-doctor/00767cb279c2.mp3"
      }
     }
    ]
   },
   "screen": {
    "speaker": "d",
    "text": "That could be it. Too much screen time and too little sleep often cause headaches.",
    "pt": "Pode ser isso. Tempo demais na tela e pouco sono costumam causar dor de cabeça.",
    "audio": "talk/dialogues/at-the-doctor/f508892b3dee.mp3",
    "next": "head3"
   },
   "head3": {
    "speaker": "d",
    "text": "I'd like you to take a break every hour and get your eyes checked. Can you do that?",
    "pt": "Quero que você faça uma pausa a cada hora e faça um exame de vista. Consegue fazer isso?",
    "audio": "talk/dialogues/at-the-doctor/72ff27ee8092.mp3",
    "options": [
     {
      "text": "Sure. Should I take anything for the pain?",
      "pt": "Claro. Devo tomar algo para a dor?",
      "audio": "talk/dialogues/at-the-doctor/2c8b56788900.mp3",
      "audioF": "talk/dialogues/at-the-doctor/35d864e90b73.mp3",
      "next": "painkiller"
     },
     {
      "text": "Yes, I'll book an eye test this week.",
      "pt": "Sim, vou marcar um exame de vista esta semana.",
      "audio": "talk/dialogues/at-the-doctor/52707180a2a9.mp3",
      "audioF": "talk/dialogues/at-the-doctor/0657ed912baf.mp3",
      "next": "end"
     },
     {
      "text": "I can do ten push-ups.",
      "pt": "Consigo fazer dez flexões.",
      "audio": "talk/dialogues/at-the-doctor/d7c566910920.mp3",
      "audioF": "talk/dialogues/at-the-doctor/18db4b5783ae.mp3",
      "next": null,
      "react": {
       "text": "Impressive! But can you take breaks and check your eyes?",
       "pt": "Impressionante! Mas consegue fazer pausas e examinar a vista?",
       "audio": "talk/dialogues/at-the-doctor/174ec5613d71.mp3"
      }
     }
    ]
   },
   "painkiller": {
    "speaker": "d",
    "text": "You can take ibuprofen, but no more than three times a day.",
    "pt": "Você pode tomar ibuprofeno, mas no máximo três vezes por dia.",
    "audio": "talk/dialogues/at-the-doctor/761cb441b122.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "d",
    "text": "If you don't feel better in a few days, come back and see me. Take care!",
    "pt": "Se não melhorar em alguns dias, volte para me ver. Se cuide!",
    "audio": "talk/dialogues/at-the-doctor/15480aa3574f.mp3",
    "end": true
   }
  },
  "nudges": {
   "r": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/at-the-doctor/4834c39117ec.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/at-the-doctor/8c4ea7d762d3.mp3"
    }
   ],
   "d": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/at-the-doctor/d1b9f1fcf51e.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/at-the-doctor/2d26998d4c8f.mp3"
    }
   ]
  }
 },
 {
  "slug": "job-interview",
  "title": "The Job Interview",
  "level": "B1",
  "description": "Entrevista com o RH e com o gerente.",
  "intro": "Hoje é a sua entrevista para uma vaga numa empresa de tecnologia. Primeiro você conversa com a Rachel, do RH. Depois o gerente Tom entra na sala.",
  "cast": {
   "r": {
    "name": "Rachel",
    "role": "Recrutadora (RH)"
   },
   "t": {
    "name": "Tom",
    "role": "Gerente de vendas"
   }
  },
  "start": "j1",
  "decisions": [
   10,
   10
  ],
  "nodes": {
   "j1": {
    "speaker": "r",
    "text": "Hi, thanks for coming in today. I'm Rachel from HR. Please, have a seat.",
    "pt": "Oi, obrigada por vir hoje. Sou a Rachel, do RH. Por favor, sente-se.",
    "audio": "talk/dialogues/job-interview/f7b6c290c444.mp3",
    "next": "j2"
   },
   "j2": {
    "speaker": "r",
    "text": "Did you find our office easily?",
    "pt": "Você achou nosso escritório com facilidade?",
    "audio": "talk/dialogues/job-interview/6761249d7d73.mp3",
    "options": [
     {
      "text": "Yes, it was easy. I took the subway.",
      "pt": "Sim, foi fácil. Vim de metrô.",
      "audio": "talk/dialogues/job-interview/87c245a5ed49.mp3",
      "audioF": "talk/dialogues/job-interview/8b36ddcdd7f1.mp3",
      "next": "j3"
     },
     {
      "text": "It took a while, but I made it!",
      "pt": "Demorou um pouco, mas cheguei!",
      "audio": "talk/dialogues/job-interview/6a8632aa9f3a.mp3",
      "audioF": "talk/dialogues/job-interview/f2e6b17b9513.mp3",
      "next": "j3"
     },
     {
      "text": "I've worked in sales for five years.",
      "pt": "Trabalho com vendas há cinco anos.",
      "audio": "talk/dialogues/job-interview/5d2098e52994.mp3",
      "audioF": "talk/dialogues/job-interview/5f3fe4b784b3.mp3",
      "next": null,
      "react": {
       "text": "We'll get to that! I just meant, was it easy to get here?",
       "pt": "Já vamos chegar nisso! Eu só quis saber se foi fácil chegar aqui.",
       "audio": "talk/dialogues/job-interview/04642a795f53.mp3"
      }
     }
    ]
   },
   "j3": {
    "speaker": "r",
    "text": "Great. So, tell me a little about yourself.",
    "pt": "Ótimo. Então, me fale um pouco sobre você.",
    "audio": "talk/dialogues/job-interview/f8d7a645a657.mp3",
    "options": [
     {
      "text": "I'm a marketing analyst with five years of experience.",
      "pt": "Sou analista de marketing com cinco anos de experiência.",
      "audio": "talk/dialogues/job-interview/b3dfbcbd0352.mp3",
      "audioF": "talk/dialogues/job-interview/fbbfb0638792.mp3",
      "next": "why"
     },
     {
      "text": "I studied business, and I've been working in sales for four years.",
      "pt": "Estudei administração e trabalho com vendas há quatro anos.",
      "audio": "talk/dialogues/job-interview/d16b09591a07.mp3",
      "audioF": "talk/dialogues/job-interview/1d565539e0ad.mp3",
      "next": "why"
     },
     {
      "text": "I'm fine, thank you.",
      "pt": "Estou bem, obrigado.",
      "audio": "talk/dialogues/job-interview/6a586b2c1b9d.mp3",
      "audioF": "talk/dialogues/job-interview/0a1efc545c89.mp3",
      "next": null,
      "react": {
       "text": "Good to hear! But I meant, tell me about your background.",
       "pt": "Que bom! Mas eu quis dizer, me conte sobre a sua trajetória.",
       "audio": "talk/dialogues/job-interview/8e5afff9c492.mp3"
      }
     }
    ]
   },
   "why": {
    "speaker": "r",
    "text": "And why do you want to work for our company?",
    "pt": "E por que você quer trabalhar na nossa empresa?",
    "audio": "talk/dialogues/job-interview/05be43a1a70c.mp3",
    "options": [
     {
      "text": "I really like your products and your values.",
      "pt": "Gosto muito dos produtos e dos valores de vocês.",
      "audio": "talk/dialogues/job-interview/d72910e6ae81.mp3",
      "audioF": "talk/dialogues/job-interview/f82fa06c4f9a.mp3",
      "next": "strength"
     },
     {
      "text": "I'm looking for new challenges and a chance to grow.",
      "pt": "Estou buscando novos desafios e uma chance de crescer.",
      "audio": "talk/dialogues/job-interview/dbb552c933b1.mp3",
      "audioF": "talk/dialogues/job-interview/e0eaf17cc978.mp3",
      "next": "strength"
     },
     {
      "text": "Because I don't like Mondays.",
      "pt": "Porque eu não gosto de segunda-feira.",
      "audio": "talk/dialogues/job-interview/ba75a9616c77.mp3",
      "audioF": "talk/dialogues/job-interview/0396ff58a9e0.mp3",
      "next": null,
      "react": {
       "text": "Ha! Nobody does. But what attracts you to our company?",
       "pt": "Rá! Ninguém gosta. Mas o que te atrai na nossa empresa?",
       "audio": "talk/dialogues/job-interview/50f6a00bc88a.mp3"
      }
     }
    ]
   },
   "strength": {
    "speaker": "r",
    "text": "What would you say is your greatest strength?",
    "pt": "Qual você diria que é o seu maior ponto forte?",
    "audio": "talk/dialogues/job-interview/a6b3e6927635.mp3",
    "options": [
     {
      "text": "I'm very organized, and I work well under pressure.",
      "pt": "Sou muito organizado e trabalho bem sob pressão.",
      "audio": "talk/dialogues/job-interview/7da14314c8ee.mp3",
      "audioF": "talk/dialogues/job-interview/4b4aa65611cf.mp3",
      "next": "weak"
     },
     {
      "text": "I'm a good communicator and a team player.",
      "pt": "Sou bom comunicador e gosto de trabalhar em equipe.",
      "audio": "talk/dialogues/job-interview/19ee8a27ff2c.mp3",
      "audioF": "talk/dialogues/job-interview/6dd7d96724c9.mp3",
      "next": "weak"
     },
     {
      "text": "I was born in Recife.",
      "pt": "Nasci em Recife.",
      "audio": "talk/dialogues/job-interview/860fff96e6ff.mp3",
      "audioF": "talk/dialogues/job-interview/bbb694bdf316.mp3",
      "next": null,
      "react": {
       "text": "Lovely! But what's your greatest professional strength?",
       "pt": "Que legal! Mas qual é o seu maior ponto forte profissional?",
       "audio": "talk/dialogues/job-interview/68f958388a80.mp3"
      }
     }
    ]
   },
   "weak": {
    "speaker": "r",
    "text": "And what about a weakness?",
    "pt": "E um ponto fraco?",
    "audio": "talk/dialogues/job-interview/302a6f97fc14.mp3",
    "options": [
     {
      "text": "Sometimes I'm too much of a perfectionist, but I'm working on it.",
      "pt": "Às vezes sou perfeccionista demais, mas estou trabalhando nisso.",
      "audio": "talk/dialogues/job-interview/88bb9d7f7584.mp3",
      "audioF": "talk/dialogues/job-interview/6dcf1770e815.mp3",
      "next": "meet"
     },
     {
      "text": "I find public speaking hard, so I'm taking a course.",
      "pt": "Acho difícil falar em público, então estou fazendo um curso.",
      "audio": "talk/dialogues/job-interview/ae5a99cd3c7b.mp3",
      "audioF": "talk/dialogues/job-interview/e84ba3199340.mp3",
      "next": "meet"
     },
     {
      "text": "Next Friday is fine.",
      "pt": "Sexta que vem está bom.",
      "audio": "talk/dialogues/job-interview/7ab5436543b8.mp3",
      "audioF": "talk/dialogues/job-interview/1712e131bd50.mp3",
      "next": null,
      "react": {
       "text": "Sorry? I asked about a weakness.",
       "pt": "Como? Eu perguntei sobre um ponto fraco.",
       "audio": "talk/dialogues/job-interview/44a323a23d79.mp3"
      }
     }
    ]
   },
   "meet": {
    "speaker": "r",
    "text": "Thank you. Now I'd like you to meet Tom, our sales manager.",
    "pt": "Obrigada. Agora quero que você conheça o Tom, nosso gerente de vendas.",
    "audio": "talk/dialogues/job-interview/12e43b5706a8.mp3",
    "next": "tom"
   },
   "tom": {
    "speaker": "t",
    "text": "Nice to meet you. Rachel tells me you have good experience. Can you give me an example of a problem you solved at work?",
    "pt": "Prazer. A Rachel me disse que você tem boa experiência. Pode me dar um exemplo de um problema que resolveu no trabalho?",
    "audio": "talk/dialogues/job-interview/bca27330d40d.mp3",
    "options": [
     {
      "text": "Once, a big client wanted to cancel, and I convinced them to stay.",
      "pt": "Uma vez, um cliente grande queria cancelar, e eu convenci ele a ficar.",
      "audio": "talk/dialogues/job-interview/b3e4e9a6c661.mp3",
      "audioF": "talk/dialogues/job-interview/1699dbffb9d9.mp3",
      "next": "client"
     },
     {
      "text": "Our team was missing deadlines, so I created a new schedule.",
      "pt": "Nossa equipe perdia prazos, então criei um novo cronograma.",
      "audio": "talk/dialogues/job-interview/6dcc4ce76f4c.mp3",
      "audioF": "talk/dialogues/job-interview/8b5828f98c6d.mp3",
      "next": "deadline"
     },
     {
      "text": "Yes, I solved a crossword yesterday.",
      "pt": "Sim, resolvi uma palavra cruzada ontem.",
      "audio": "talk/dialogues/job-interview/5ae7d78244a9.mp3",
      "audioF": "talk/dialogues/job-interview/fa973d12f004.mp3",
      "next": null,
      "react": {
       "text": "Ha! I meant a problem at work.",
       "pt": "Rá! Eu quis dizer um problema no trabalho.",
       "audio": "talk/dialogues/job-interview/4687925d6573.mp3"
      }
     }
    ]
   },
   "client": {
    "speaker": "t",
    "text": "Interesting. How did you do that?",
    "pt": "Interessante. Como você fez isso?",
    "audio": "talk/dialogues/job-interview/b19b00515315.mp3",
    "options": [
     {
      "text": "I listened to their complaints and offered them a better plan.",
      "pt": "Ouvi as reclamações e ofereci um plano melhor.",
      "audio": "talk/dialogues/job-interview/e39670705c49.mp3",
      "audioF": "talk/dialogues/job-interview/574c88e0c829.mp3",
      "next": "salary"
     },
     {
      "text": "I visited them in person and fixed the problem quickly.",
      "pt": "Fui pessoalmente até eles e resolvi o problema rápido.",
      "audio": "talk/dialogues/job-interview/819e8f848bd2.mp3",
      "audioF": "talk/dialogues/job-interview/e20abb9f8c09.mp3",
      "next": "salary"
     },
     {
      "text": "With a pen and paper.",
      "pt": "Com papel e caneta.",
      "audio": "talk/dialogues/job-interview/b06468e424fa.mp3",
      "audioF": "talk/dialogues/job-interview/1915f517f537.mp3",
      "next": null,
      "react": {
       "text": "Hmm. Can you explain how you convinced the client?",
       "pt": "Hum. Pode explicar como convenceu o cliente?",
       "audio": "talk/dialogues/job-interview/78c70682c603.mp3"
      }
     }
    ]
   },
   "deadline": {
    "speaker": "t",
    "text": "And did it work?",
    "pt": "E funcionou?",
    "audio": "talk/dialogues/job-interview/c3a4ada28965.mp3",
    "options": [
     {
      "text": "Yes, we delivered every project on time after that.",
      "pt": "Sim, entregamos todos os projetos no prazo depois disso.",
      "audio": "talk/dialogues/job-interview/a0087123d1f9.mp3",
      "audioF": "talk/dialogues/job-interview/79cb631465b1.mp3",
      "next": "salary"
     },
     {
      "text": "It took a few weeks, but now the team is much faster.",
      "pt": "Levou algumas semanas, mas agora a equipe está bem mais rápida.",
      "audio": "talk/dialogues/job-interview/f786fb7d66a5.mp3",
      "audioF": "talk/dialogues/job-interview/b763eab69417.mp3",
      "next": "salary"
     },
     {
      "text": "I work Monday to Friday.",
      "pt": "Trabalho de segunda a sexta.",
      "audio": "talk/dialogues/job-interview/6dc928b664e1.mp3",
      "audioF": "talk/dialogues/job-interview/661559134078.mp3",
      "next": null,
      "react": {
       "text": "Sure, but did the new schedule work?",
       "pt": "Certo, mas o novo cronograma funcionou?",
       "audio": "talk/dialogues/job-interview/794bbdc402b0.mp3"
      }
     }
    ]
   },
   "salary": {
    "speaker": "t",
    "text": "Good. What are your salary expectations?",
    "pt": "Bom. Qual é a sua pretensão salarial?",
    "audio": "talk/dialogues/job-interview/65510c40fb08.mp3",
    "options": [
     {
      "text": "Something between five and six thousand a month.",
      "pt": "Algo entre cinco e seis mil por mês.",
      "audio": "talk/dialogues/job-interview/afa8fba69f78.mp3",
      "audioF": "talk/dialogues/job-interview/e33383f61178.mp3",
      "next": "start"
     },
     {
      "text": "I'd like to know more about the benefits first.",
      "pt": "Gostaria de saber mais sobre os benefícios primeiro.",
      "audio": "talk/dialogues/job-interview/0d5ee865a08e.mp3",
      "audioF": "talk/dialogues/job-interview/865ef9ead63c.mp3",
      "next": "benefits"
     },
     {
      "text": "I expect it to rain later.",
      "pt": "Acho que vai chover mais tarde.",
      "audio": "talk/dialogues/job-interview/8501c46b1a80.mp3",
      "audioF": "talk/dialogues/job-interview/5a0d6f441be2.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, how much would you like to earn?",
       "pt": "Rá. Quero dizer, quanto você gostaria de ganhar?",
       "audio": "talk/dialogues/job-interview/d112b7fec4cb.mp3"
      }
     }
    ]
   },
   "benefits": {
    "speaker": "t",
    "text": "Of course. We offer health insurance, a yearly bonus, and two days a week working from home.",
    "pt": "Claro. Oferecemos plano de saúde, bônus anual e dois dias por semana de home office.",
    "audio": "talk/dialogues/job-interview/9dc87b95427c.mp3",
    "next": "start"
   },
   "start": {
    "speaker": "t",
    "text": "If we offer you the job, when could you start?",
    "pt": "Se oferecermos a vaga, quando você poderia começar?",
    "audio": "talk/dialogues/job-interview/13d3030021ae.mp3",
    "options": [
     {
      "text": "I could start in two weeks.",
      "pt": "Poderia começar em duas semanas.",
      "audio": "talk/dialogues/job-interview/0425760e7c2d.mp3",
      "audioF": "talk/dialogues/job-interview/d19996ff7e42.mp3",
      "next": "qs"
     },
     {
      "text": "I need to give one month's notice, so next month.",
      "pt": "Preciso cumprir um mês de aviso prévio, então no mês que vem.",
      "audio": "talk/dialogues/job-interview/9eb03d47ef07.mp3",
      "audioF": "talk/dialogues/job-interview/fd1b73f447f4.mp3",
      "next": "qs"
     },
     {
      "text": "I started at eight o'clock today.",
      "pt": "Comecei às oito horas hoje.",
      "audio": "talk/dialogues/job-interview/594e1021f187.mp3",
      "audioF": "talk/dialogues/job-interview/40d4b0e9e8bc.mp3",
      "next": null,
      "react": {
       "text": "I mean, if you get the job, when would you be available?",
       "pt": "Quero dizer, se conseguir a vaga, quando estaria disponível?",
       "audio": "talk/dialogues/job-interview/73e852e83fc0.mp3"
      }
     }
    ]
   },
   "qs": {
    "speaker": "r",
    "text": "Do you have any questions for us?",
    "pt": "Você tem alguma pergunta para nós?",
    "audio": "talk/dialogues/job-interview/b0823f7dd417.mp3",
    "options": [
     {
      "text": "What does a typical day look like?",
      "pt": "Como é um dia típico?",
      "audio": "talk/dialogues/job-interview/fc88fadce734.mp3",
      "audioF": "talk/dialogues/job-interview/ec820f0cd3c5.mp3",
      "next": "day"
     },
     {
      "text": "When will I hear back from you?",
      "pt": "Quando vocês me dão um retorno?",
      "audio": "talk/dialogues/job-interview/0c5ff5871c55.mp3",
      "audioF": "talk/dialogues/job-interview/864776b671c8.mp3",
      "next": "hear"
     },
     {
      "text": "Yes, I have two sisters.",
      "pt": "Sim, tenho duas irmãs.",
      "audio": "talk/dialogues/job-interview/b41ca361fda6.mp3",
      "audioF": "talk/dialogues/job-interview/d64882f69264.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean, any questions about the job?",
       "pt": "Rá! Quero dizer, alguma pergunta sobre a vaga?",
       "audio": "talk/dialogues/job-interview/963da482110b.mp3"
      }
     }
    ]
   },
   "day": {
    "speaker": "t",
    "text": "You'd spend the mornings with clients and the afternoons with the team.",
    "pt": "Você passaria as manhãs com clientes e as tardes com a equipe.",
    "audio": "talk/dialogues/job-interview/6eddcc96a04e.mp3",
    "next": "end"
   },
   "hear": {
    "speaker": "r",
    "text": "We'll let you know by the end of next week.",
    "pt": "Vamos te avisar até o fim da semana que vem.",
    "audio": "talk/dialogues/job-interview/7adf44acda3c.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "r",
    "text": "Thank you for your time. It was a pleasure to meet you.",
    "pt": "Obrigada pelo seu tempo. Foi um prazer te conhecer.",
    "audio": "talk/dialogues/job-interview/361d0e74b311.mp3",
    "end": true
   }
  },
  "nudges": {
   "r": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/job-interview/6437aeb0ae7c.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/job-interview/61ca28873cf6.mp3"
    }
   ],
   "t": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/job-interview/c08d73e8e69c.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/job-interview/a07d40a67f3e.mp3"
    }
   ]
  }
 },
 {
  "slug": "the-witness",
  "title": "The Witness",
  "level": "B1",
  "description": "Você viu um assalto. Ajude o detetive.",
  "intro": "Hoje de manhã uma joalheria do centro foi assaltada, e você estava lá. Uma policial pede que você espere: o detetive Harris quer fazer algumas perguntas.",
  "cast": {
   "o": {
    "name": "Officer Ruiz",
    "role": "Policial"
   },
   "h": {
    "name": "Detective Harris",
    "role": "Detetive"
   }
  },
  "start": "p1",
  "decisions": [
   5,
   8
  ],
  "nodes": {
   "p1": {
    "speaker": "o",
    "text": "Excuse me. I'm Officer Ruiz. Detective Harris would like to ask you a few questions about what happened this morning.",
    "pt": "Com licença. Sou a policial Ruiz. O detetive Harris gostaria de fazer algumas perguntas sobre o que aconteceu hoje de manhã.",
    "audio": "talk/dialogues/the-witness/65e53561cadf.mp3",
    "next": "p2"
   },
   "p2": {
    "speaker": "h",
    "text": "Thank you for staying. You were at the jewelry store at the time of the robbery, is that right?",
    "pt": "Obrigado por ficar. Você estava na joalheria na hora do assalto, certo?",
    "audio": "talk/dialogues/the-witness/d693156844b1.mp3",
    "options": [
     {
      "text": "Yes, I was buying a watch when it happened.",
      "pt": "Sim, eu estava comprando um relógio quando aconteceu.",
      "audio": "talk/dialogues/the-witness/2f266e55bb04.mp3",
      "audioF": "talk/dialogues/the-witness/d62b29f5c7a9.mp3",
      "next": "what"
     },
     {
      "text": "I was across the street, but I saw everything.",
      "pt": "Eu estava do outro lado da rua, mas vi tudo.",
      "audio": "talk/dialogues/the-witness/afbb11032703.mp3",
      "audioF": "talk/dialogues/the-witness/cf897d2a9157.mp3",
      "next": "what"
     },
     {
      "text": "I bought this jacket last year.",
      "pt": "Comprei esta jaqueta ano passado.",
      "audio": "talk/dialogues/the-witness/125b54be5ede.mp3",
      "audioF": "talk/dialogues/the-witness/c5b94b9a9756.mp3",
      "next": null,
      "react": {
       "text": "I'm asking about this morning. Were you at the store?",
       "pt": "Estou perguntando sobre hoje de manhã. Você estava na loja?",
       "audio": "talk/dialogues/the-witness/2dfbc8c69909.mp3"
      }
     }
    ]
   },
   "what": {
    "speaker": "h",
    "text": "Can you tell me what you saw?",
    "pt": "Pode me contar o que você viu?",
    "audio": "talk/dialogues/the-witness/e5b4a7800faf.mp3",
    "options": [
     {
      "text": "A man came in with a mask and asked for the money.",
      "pt": "Um homem entrou de máscara e pediu o dinheiro.",
      "audio": "talk/dialogues/the-witness/0056f4847aa3.mp3",
      "audioF": "talk/dialogues/the-witness/dcd1e3c08828.mp3",
      "next": "man"
     },
     {
      "text": "Two people ran out of the store and got into a car.",
      "pt": "Duas pessoas saíram correndo da loja e entraram num carro.",
      "audio": "talk/dialogues/the-witness/d1975fd4d1e6.mp3",
      "audioF": "talk/dialogues/the-witness/255b7597ab8a.mp3",
      "next": "car"
     },
     {
      "text": "I saw a great movie last night.",
      "pt": "Vi um filme ótimo ontem à noite.",
      "audio": "talk/dialogues/the-witness/8708e9ddf329.mp3",
      "audioF": "talk/dialogues/the-witness/076aa5337b95.mp3",
      "next": null,
      "react": {
       "text": "Let's focus on this morning, please. What did you see?",
       "pt": "Vamos focar em hoje de manhã, por favor. O que você viu?",
       "audio": "talk/dialogues/the-witness/6fea35ec63a6.mp3"
      }
     }
    ]
   },
   "man": {
    "speaker": "h",
    "text": "What did he look like?",
    "pt": "Como ele era?",
    "audio": "talk/dialogues/the-witness/939b48eb3138.mp3",
    "options": [
     {
      "text": "He was tall, and he was wearing a black hoodie.",
      "pt": "Ele era alto e usava um moletom preto com capuz.",
      "audio": "talk/dialogues/the-witness/ada62f9c5337.mp3",
      "audioF": "talk/dialogues/the-witness/aa0f9cc657bd.mp3",
      "next": "voice"
     },
     {
      "text": "I couldn't see his face, but he had a tattoo on his hand.",
      "pt": "Não consegui ver o rosto, mas ele tinha uma tatuagem na mão.",
      "audio": "talk/dialogues/the-witness/be9fa01f32cf.mp3",
      "audioF": "talk/dialogues/the-witness/3565f02c0088.mp3",
      "next": "tattoo"
     },
     {
      "text": "He likes football.",
      "pt": "Ele gosta de futebol.",
      "audio": "talk/dialogues/the-witness/07c83d91308c.mp3",
      "audioF": "talk/dialogues/the-witness/f89d17cb6729.mp3",
      "next": null,
      "react": {
       "text": "How would you know that? I mean, describe how he looked.",
       "pt": "Como você saberia disso? Quero dizer, descreva a aparência dele.",
       "audio": "talk/dialogues/the-witness/1151bcdda535.mp3"
      }
     }
    ]
   },
   "tattoo": {
    "speaker": "h",
    "text": "A tattoo? That's very useful. What was it?",
    "pt": "Uma tatuagem? Isso ajuda muito. Do que era?",
    "audio": "talk/dialogues/the-witness/6b65bda7cf82.mp3",
    "options": [
     {
      "text": "It looked like a snake.",
      "pt": "Parecia uma cobra.",
      "audio": "talk/dialogues/the-witness/765c4924315e.mp3",
      "audioF": "talk/dialogues/the-witness/706a06b70b37.mp3",
      "next": "voice"
     },
     {
      "text": "I'm not sure. Some kind of bird, I think.",
      "pt": "Não tenho certeza. Algum tipo de pássaro, acho.",
      "audio": "talk/dialogues/the-witness/6a75699e1828.mp3",
      "audioF": "talk/dialogues/the-witness/842b573c1174.mp3",
      "next": "voice"
     },
     {
      "text": "It was a Tuesday.",
      "pt": "Era uma terça-feira.",
      "audio": "talk/dialogues/the-witness/5f3d74d0af0a.mp3",
      "audioF": "talk/dialogues/the-witness/b64a37962f20.mp3",
      "next": null,
      "react": {
       "text": "No, the tattoo. What did it look like?",
       "pt": "Não, a tatuagem. Como ela era?",
       "audio": "talk/dialogues/the-witness/66070dcef0c0.mp3"
      }
     }
    ]
   },
   "voice": {
    "speaker": "h",
    "text": "Did he say anything? Did you notice an accent?",
    "pt": "Ele disse alguma coisa? Você notou algum sotaque?",
    "audio": "talk/dialogues/the-witness/2bea569f9261.mp3",
    "options": [
     {
      "text": "He shouted, hurry up, and he had a British accent.",
      "pt": "Ele gritou, anda logo, e tinha sotaque britânico.",
      "audio": "talk/dialogues/the-witness/3230171ae3d7.mp3",
      "audioF": "talk/dialogues/the-witness/1a53796b63cf.mp3",
      "next": "car"
     },
     {
      "text": "He didn't say much. He just pointed at the cash register.",
      "pt": "Ele não falou muito. Só apontou para o caixa.",
      "audio": "talk/dialogues/the-witness/c5a098f9ca0d.mp3",
      "audioF": "talk/dialogues/the-witness/6d99fc4f4a31.mp3",
      "next": "car"
     },
     {
      "text": "I speak English and Portuguese.",
      "pt": "Falo inglês e português.",
      "audio": "talk/dialogues/the-witness/5afe4a514d4c.mp3",
      "audioF": "talk/dialogues/the-witness/f7815258cd74.mp3",
      "next": null,
      "react": {
       "text": "Good, but I mean, did the robber say anything?",
       "pt": "Ótimo, mas quero dizer, o ladrão falou alguma coisa?",
       "audio": "talk/dialogues/the-witness/f98d6c97d090.mp3"
      }
     }
    ]
   },
   "car": {
    "speaker": "h",
    "text": "And did you see a car?",
    "pt": "E você viu algum carro?",
    "audio": "talk/dialogues/the-witness/80770c46b0da.mp3",
    "options": [
     {
      "text": "Yes, a white van. I think the plate started with K.",
      "pt": "Sim, uma van branca. Acho que a placa começava com K.",
      "audio": "talk/dialogues/the-witness/16811839bc74.mp3",
      "audioF": "talk/dialogues/the-witness/b6d304417649.mp3",
      "next": "plate"
     },
     {
      "text": "Yes, a small red car drove away very fast.",
      "pt": "Sim, um carro vermelho pequeno saiu em alta velocidade.",
      "audio": "talk/dialogues/the-witness/421d494c489d.mp3",
      "audioF": "talk/dialogues/the-witness/56f1ba363552.mp3",
      "next": "direction"
     },
     {
      "text": "I don't have a car.",
      "pt": "Eu não tenho carro.",
      "audio": "talk/dialogues/the-witness/7454db23e4ed.mp3",
      "audioF": "talk/dialogues/the-witness/454a4c1986c7.mp3",
      "next": null,
      "react": {
       "text": "I mean the robbers. Did they leave in a car?",
       "pt": "Falo dos ladrões. Eles fugiram de carro?",
       "audio": "talk/dialogues/the-witness/fcdea76affa1.mp3"
      }
     }
    ]
   },
   "plate": {
    "speaker": "o",
    "text": "Detective, a white van with a plate starting with K was just stopped on the highway.",
    "pt": "Detetive, uma van branca com placa começando com K acabou de ser parada na rodovia.",
    "audio": "talk/dialogues/the-witness/7a1d2ba31032.mp3",
    "next": "identify"
   },
   "identify": {
    "speaker": "h",
    "text": "Excellent. Would you be able to recognize the man if you saw him again?",
    "pt": "Excelente. Você conseguiria reconhecer o homem se o visse de novo?",
    "audio": "talk/dialogues/the-witness/0963f3d050ba.mp3",
    "options": [
     {
      "text": "Yes, I think so.",
      "pt": "Sim, acho que sim.",
      "audio": "talk/dialogues/the-witness/4b466f832253.mp3",
      "audioF": "talk/dialogues/the-witness/737299d3aa7f.mp3",
      "next": "photos"
     },
     {
      "text": "I'm not sure. It all happened so fast.",
      "pt": "Não tenho certeza. Foi tudo muito rápido.",
      "audio": "talk/dialogues/the-witness/a6884524cde3.mp3",
      "audioF": "talk/dialogues/the-witness/a5ba90868e60.mp3",
      "next": "photos"
     },
     {
      "text": "I saw him on TV last week.",
      "pt": "Vi ele na TV semana passada.",
      "audio": "talk/dialogues/the-witness/f8b0763898ec.mp3",
      "audioF": "talk/dialogues/the-witness/bfbff30c5ab9.mp3",
      "next": null,
      "react": {
       "text": "Really? Hmm, let's stay with this morning. Could you recognize him again?",
       "pt": "Sério? Hum, vamos ficar em hoje de manhã. Você conseguiria reconhecê-lo de novo?",
       "audio": "talk/dialogues/the-witness/2e9d5cd4e717.mp3"
      }
     }
    ]
   },
   "direction": {
    "speaker": "h",
    "text": "Which way did it go?",
    "pt": "Para que lado ele foi?",
    "audio": "talk/dialogues/the-witness/8f9ba30b0e81.mp3",
    "options": [
     {
      "text": "It turned left onto Main Street.",
      "pt": "Virou à esquerda na rua principal.",
      "audio": "talk/dialogues/the-witness/5732f25e4e90.mp3",
      "audioF": "talk/dialogues/the-witness/3a7ffcb79762.mp3",
      "next": "photos"
     },
     {
      "text": "It went towards the bridge.",
      "pt": "Foi em direção à ponte.",
      "audio": "talk/dialogues/the-witness/81905ac2905b.mp3",
      "audioF": "talk/dialogues/the-witness/ae341abd35df.mp3",
      "next": "photos"
     },
     {
      "text": "It went very well, thank you.",
      "pt": "Foi tudo muito bem, obrigado.",
      "audio": "talk/dialogues/the-witness/a20e15d309a2.mp3",
      "audioF": "talk/dialogues/the-witness/fdb704380315.mp3",
      "next": null,
      "react": {
       "text": "I mean the car. Which direction did it go?",
       "pt": "Falo do carro. Para que direção ele foi?",
       "audio": "talk/dialogues/the-witness/61870baf75df.mp3"
      }
     }
    ]
   },
   "photos": {
    "speaker": "h",
    "text": "Thank you. Could you come to the station tomorrow to look at some photos?",
    "pt": "Obrigado. Você poderia ir à delegacia amanhã para ver algumas fotos?",
    "audio": "talk/dialogues/the-witness/a071b6a91d01.mp3",
    "options": [
     {
      "text": "Of course. What time should I come?",
      "pt": "Claro. Que horas devo ir?",
      "audio": "talk/dialogues/the-witness/0b576ac8d7b0.mp3",
      "audioF": "talk/dialogues/the-witness/29f65c368293.mp3",
      "next": "time"
     },
     {
      "text": "I work tomorrow. Could I come on Saturday?",
      "pt": "Trabalho amanhã. Posso ir no sábado?",
      "audio": "talk/dialogues/the-witness/e56dd66ec9c6.mp3",
      "audioF": "talk/dialogues/the-witness/92b968f6c50a.mp3",
      "next": "saturday"
     },
     {
      "text": "I love taking photos.",
      "pt": "Adoro tirar fotos.",
      "audio": "talk/dialogues/the-witness/bc385473b675.mp3",
      "audioF": "talk/dialogues/the-witness/e0e5d2bc2efe.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, can you come to the police station to see some photos?",
       "pt": "Rá. Quero dizer, pode ir à delegacia ver algumas fotos?",
       "audio": "talk/dialogues/the-witness/6642fbcb35cf.mp3"
      }
     }
    ]
   },
   "time": {
    "speaker": "h",
    "text": "Any time after nine. Ask for me at the front desk.",
    "pt": "A qualquer hora depois das nove. Pergunte por mim na recepção.",
    "audio": "talk/dialogues/the-witness/61766de993ae.mp3",
    "next": "end"
   },
   "saturday": {
    "speaker": "h",
    "text": "Saturday is fine. Here's my card. Call me if you remember anything else.",
    "pt": "Sábado está ótimo. Aqui está meu cartão. Me ligue se lembrar de mais alguma coisa.",
    "audio": "talk/dialogues/the-witness/d17bacc309cd.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "h",
    "text": "You've been very helpful. Officer Ruiz will take your contact details. Thank you.",
    "pt": "Você ajudou muito. A policial Ruiz vai anotar seus contatos. Obrigado.",
    "audio": "talk/dialogues/the-witness/9f9a788480fc.mp3",
    "end": true
   }
  },
  "nudges": {
   "o": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/the-witness/16a6027ab079.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/the-witness/650340083360.mp3"
    }
   ],
   "h": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/the-witness/c76dcdfe46c4.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/the-witness/0502f93d572d.mp3"
    }
   ]
  }
 },
 {
  "slug": "the-team-meeting",
  "title": "The Team Meeting",
  "level": "B2",
  "description": "Reunião sobre um lançamento atrasado.",
  "intro": "Reunião de segunda-feira. O app novo da empresa precisa ser lançado em breve, mas os testes estão atrasados. Estão na sala a gerente Linda e o colega Kevin.",
  "cast": {
   "l": {
    "name": "Linda",
    "role": "Gerente de projeto"
   },
   "k": {
    "name": "Kevin",
    "role": "Colega de equipe"
   }
  },
  "start": "w1",
  "decisions": [
   5,
   7
  ],
  "nodes": {
   "w1": {
    "speaker": "l",
    "text": "Okay, everyone, let's get started. The main topic today is the launch of the new app.",
    "pt": "Bom, pessoal, vamos começar. O assunto principal hoje é o lançamento do app novo.",
    "audio": "talk/dialogues/the-team-meeting/430199f06f77.mp3",
    "next": "w2"
   },
   "w2": {
    "speaker": "l",
    "text": "Could you give us a quick update on your part?",
    "pt": "Você pode dar uma atualização rápida da sua parte?",
    "audio": "talk/dialogues/the-team-meeting/f70645a7ee19.mp3",
    "options": [
     {
      "text": "Sure. The design is finished, but testing is behind schedule.",
      "pt": "Claro. O design está pronto, mas os testes estão atrasados.",
      "audio": "talk/dialogues/the-team-meeting/21f93398f2d0.mp3",
      "audioF": "talk/dialogues/the-team-meeting/cd0a6938a61c.mp3",
      "next": "behind"
     },
     {
      "text": "Of course. Everything is on track, and we should finish by Friday.",
      "pt": "Claro. Está tudo dentro do prazo e devemos terminar até sexta.",
      "audio": "talk/dialogues/the-team-meeting/cdb990ebde0a.mp3",
      "audioF": "talk/dialogues/the-team-meeting/d7f1dedf328e.mp3",
      "next": "ontrack"
     },
     {
      "text": "I updated my phone last night.",
      "pt": "Atualizei meu celular ontem à noite.",
      "audio": "talk/dialogues/the-team-meeting/91f985a852cb.mp3",
      "audioF": "talk/dialogues/the-team-meeting/db4e9d6a09fa.mp3",
      "next": null,
      "react": {
       "text": "Ha! I meant an update on the project.",
       "pt": "Rá! Eu quis dizer uma atualização do projeto.",
       "audio": "talk/dialogues/the-team-meeting/87fdefaf86b1.mp3"
      }
     }
    ]
   },
   "ontrack": {
    "speaker": "k",
    "text": "Actually, I'm not sure that's right. The testing team found a lot of bugs yesterday.",
    "pt": "Na verdade, não sei se é bem assim. A equipe de testes encontrou muitos bugs ontem.",
    "audio": "talk/dialogues/the-team-meeting/82cba62e6768.mp3",
    "next": "true"
   },
   "true": {
    "speaker": "l",
    "text": "Is that true?",
    "pt": "Isso é verdade?",
    "audio": "talk/dialogues/the-team-meeting/2dc0ab7a174f.mp3",
    "options": [
     {
      "text": "You're right, Kevin. I hadn't seen that report yet.",
      "pt": "Você tem razão, Kevin. Eu ainda não tinha visto esse relatório.",
      "audio": "talk/dialogues/the-team-meeting/16b6bce01e9d.mp3",
      "audioF": "talk/dialogues/the-team-meeting/87f1a7fe59a5.mp3",
      "next": "behind"
     },
     {
      "text": "Yes, but most of them are minor and easy to fix.",
      "pt": "Sim, mas a maioria é pequena e fácil de corrigir.",
      "audio": "talk/dialogues/the-team-meeting/45f5031c2d38.mp3",
      "audioF": "talk/dialogues/the-team-meeting/1cde70d9ea25.mp3",
      "next": "minor"
     },
     {
      "text": "True, it's very sunny today.",
      "pt": "Verdade, está bem ensolarado hoje.",
      "audio": "talk/dialogues/the-team-meeting/3dc20283cb0f.mp3",
      "audioF": "talk/dialogues/the-team-meeting/7699131cbdaf.mp3",
      "next": null,
      "react": {
       "text": "I'm talking about the bugs. Did the testers find problems?",
       "pt": "Estou falando dos bugs. Os testadores acharam problemas?",
       "audio": "talk/dialogues/the-team-meeting/59c0f6d74a2c.mp3"
      }
     }
    ]
   },
   "minor": {
    "speaker": "k",
    "text": "Some of them are serious, though. The payment screen crashes on older phones.",
    "pt": "Mas alguns são graves. A tela de pagamento trava nos celulares mais antigos.",
    "audio": "talk/dialogues/the-team-meeting/6ac50632c58d.mp3",
    "next": "behind"
   },
   "behind": {
    "speaker": "l",
    "text": "Okay. So how much more time do you need?",
    "pt": "Certo. Então de quanto tempo a mais você precisa?",
    "audio": "talk/dialogues/the-team-meeting/01de03f85e95.mp3",
    "options": [
     {
      "text": "I think we need two more weeks.",
      "pt": "Acho que precisamos de mais duas semanas.",
      "audio": "talk/dialogues/the-team-meeting/c6fe4705123a.mp3",
      "audioF": "talk/dialogues/the-team-meeting/73dd89e472c3.mp3",
      "next": "delay"
     },
     {
      "text": "If we get one more tester, we can finish in a week.",
      "pt": "Se tivermos mais um testador, terminamos em uma semana.",
      "audio": "talk/dialogues/the-team-meeting/f79d99735f9d.mp3",
      "audioF": "talk/dialogues/the-team-meeting/f6b7fe10a22a.mp3",
      "next": "tester"
     },
     {
      "text": "Three o'clock is fine.",
      "pt": "Três horas está bom.",
      "audio": "talk/dialogues/the-team-meeting/69b755594914.mp3",
      "audioF": "talk/dialogues/the-team-meeting/a29aa5185168.mp3",
      "next": null,
      "react": {
       "text": "Sorry? I'm asking how much more time you need for testing.",
       "pt": "Como? Estou perguntando de quanto tempo a mais você precisa para os testes.",
       "audio": "talk/dialogues/the-team-meeting/1dad4389b533.mp3"
      }
     }
    ]
   },
   "delay": {
    "speaker": "l",
    "text": "Two weeks is a problem. The marketing campaign starts on the first.",
    "pt": "Duas semanas é um problema. A campanha de marketing começa no dia primeiro.",
    "audio": "talk/dialogues/the-team-meeting/cac851e5d337.mp3",
    "next": "fewer"
   },
   "fewer": {
    "speaker": "k",
    "text": "What if we launch with fewer features and add the rest later?",
    "pt": "E se lançarmos com menos funcionalidades e acrescentarmos o resto depois?",
    "audio": "talk/dialogues/the-team-meeting/11d598fd7668.mp3",
    "options": [
     {
      "text": "That's a good idea. We could launch a basic version first.",
      "pt": "Boa ideia. Poderíamos lançar uma versão básica primeiro.",
      "audio": "talk/dialogues/the-team-meeting/11eba686bbb7.mp3",
      "audioF": "talk/dialogues/the-team-meeting/1cc045994659.mp3",
      "next": "agree"
     },
     {
      "text": "I'm not sure. Users might be disappointed.",
      "pt": "Não sei. Os usuários podem ficar decepcionados.",
      "audio": "talk/dialogues/the-team-meeting/5713813df9ed.mp3",
      "audioF": "talk/dialogues/the-team-meeting/8bafb8d40891.mp3",
      "next": "disagree"
     },
     {
      "text": "I added sugar to my coffee.",
      "pt": "Coloquei açúcar no meu café.",
      "audio": "talk/dialogues/the-team-meeting/36d4b9edd063.mp3",
      "audioF": "talk/dialogues/the-team-meeting/1b08f287cb28.mp3",
      "next": null,
      "react": {
       "text": "Okay... but what do you think about launching with fewer features?",
       "pt": "Tá... mas o que você acha de lançar com menos funcionalidades?",
       "audio": "talk/dialogues/the-team-meeting/bb4d44af93e8.mp3"
      }
     }
    ]
   },
   "disagree": {
    "speaker": "k",
    "text": "I understand, but a late launch would be even worse for the campaign.",
    "pt": "Eu entendo, mas lançar atrasado seria ainda pior para a campanha.",
    "audio": "talk/dialogues/the-team-meeting/3a438a70426d.mp3",
    "next": "middle"
   },
   "middle": {
    "speaker": "l",
    "text": "Let's find a middle ground. What's the minimum we need for the launch?",
    "pt": "Vamos achar um meio-termo. Qual é o mínimo de que precisamos para o lançamento?",
    "audio": "talk/dialogues/the-team-meeting/33795f23b35c.mp3",
    "options": [
     {
      "text": "Login, payments, and the main menu.",
      "pt": "Login, pagamentos e o menu principal.",
      "audio": "talk/dialogues/the-team-meeting/570d3b8b129f.mp3",
      "audioF": "talk/dialogues/the-team-meeting/7748320e1b3b.mp3",
      "next": "agree"
     },
     {
      "text": "The payment screen has to work perfectly. The rest can wait.",
      "pt": "A tela de pagamento tem que funcionar perfeitamente. O resto pode esperar.",
      "audio": "talk/dialogues/the-team-meeting/5c29483c9c5e.mp3",
      "audioF": "talk/dialogues/the-team-meeting/909ee5a54f3f.mp3",
      "next": "agree"
     },
     {
      "text": "The ground floor is fine.",
      "pt": "O térreo está bom.",
      "audio": "talk/dialogues/the-team-meeting/d01da1918104.mp3",
      "audioF": "talk/dialogues/the-team-meeting/62452bb4a86b.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, which features are essential for launch day?",
       "pt": "Rá. Quero dizer, quais funcionalidades são essenciais para o dia do lançamento?",
       "audio": "talk/dialogues/the-team-meeting/657e93874a13.mp3"
      }
     }
    ]
   },
   "agree": {
    "speaker": "l",
    "text": "Good. So we launch the basic version on time, and add the extra features in the next update.",
    "pt": "Ótimo. Então lançamos a versão básica no prazo e acrescentamos o resto na próxima atualização.",
    "audio": "talk/dialogues/the-team-meeting/1b3857eaad7d.mp3",
    "next": "summary"
   },
   "tester": {
    "speaker": "l",
    "text": "I can ask Kevin's team to lend us someone.",
    "pt": "Posso pedir para a equipe do Kevin emprestar alguém.",
    "audio": "talk/dialogues/the-team-meeting/ba8d2db6cdab.mp3",
    "next": "tester2"
   },
   "tester2": {
    "speaker": "k",
    "text": "Sure, Maria could help from Monday. Would that work for you?",
    "pt": "Claro, a Maria pode ajudar a partir de segunda. Funciona para você?",
    "audio": "talk/dialogues/the-team-meeting/4d1b90cede37.mp3",
    "options": [
     {
      "text": "That would be perfect, thanks.",
      "pt": "Seria perfeito, obrigado.",
      "audio": "talk/dialogues/the-team-meeting/99e8089e8a93.mp3",
      "audioF": "talk/dialogues/the-team-meeting/dfcb671bd01c.mp3",
      "next": "summary"
     },
     {
      "text": "Could she start tomorrow instead?",
      "pt": "Ela poderia começar amanhã?",
      "audio": "talk/dialogues/the-team-meeting/90ac1a11dec8.mp3",
      "audioF": "talk/dialogues/the-team-meeting/4813b22faabd.mp3",
      "next": "tomorrow"
     },
     {
      "text": "I work out three times a week.",
      "pt": "Malho três vezes por semana.",
      "audio": "talk/dialogues/the-team-meeting/ec0f7cc3d50b.mp3",
      "audioF": "talk/dialogues/the-team-meeting/81f1304f72cc.mp3",
      "next": null,
      "react": {
       "text": "Good for you! But would Maria starting on Monday work?",
       "pt": "Parabéns! Mas a Maria começando na segunda funciona?",
       "audio": "talk/dialogues/the-team-meeting/96eec5c0df47.mp3"
      }
     }
    ]
   },
   "tomorrow": {
    "speaker": "k",
    "text": "Let me check with her after the meeting, but I think so.",
    "pt": "Vou confirmar com ela depois da reunião, mas acho que sim.",
    "audio": "talk/dialogues/the-team-meeting/22c62951731b.mp3",
    "next": "summary"
   },
   "summary": {
    "speaker": "l",
    "text": "Who's going to write the summary and send it to the team?",
    "pt": "Quem vai escrever o resumo e mandar para a equipe?",
    "audio": "talk/dialogues/the-team-meeting/94d8a2de14f2.mp3",
    "options": [
     {
      "text": "I can do that.",
      "pt": "Eu posso fazer isso.",
      "audio": "talk/dialogues/the-team-meeting/c2d9dcc9822c.mp3",
      "audioF": "talk/dialogues/the-team-meeting/9a39195499d7.mp3",
      "next": "thursday"
     },
     {
      "text": "Kevin, could you do it this time?",
      "pt": "Kevin, você pode fazer desta vez?",
      "audio": "talk/dialogues/the-team-meeting/e76f7ad32202.mp3",
      "audioF": "talk/dialogues/the-team-meeting/c41939e7c1eb.mp3",
      "next": "kevin"
     },
     {
      "text": "It's sunny outside.",
      "pt": "Está ensolarado lá fora.",
      "audio": "talk/dialogues/the-team-meeting/5fd73a6e7550.mp3",
      "audioF": "talk/dialogues/the-team-meeting/84c52bd5d242.mp3",
      "next": null,
      "react": {
       "text": "I mean, who will write the meeting summary?",
       "pt": "Quero dizer, quem vai escrever o resumo da reunião?",
       "audio": "talk/dialogues/the-team-meeting/358ecd333f2f.mp3"
      }
     }
    ]
   },
   "kevin": {
    "speaker": "k",
    "text": "No problem. I'll send it this afternoon.",
    "pt": "Sem problema. Mando hoje à tarde.",
    "audio": "talk/dialogues/the-team-meeting/339551b547ff.mp3",
    "next": "thursday"
   },
   "thursday": {
    "speaker": "l",
    "text": "Great. Let's meet again on Thursday to check progress. Does ten a.m. work for everyone?",
    "pt": "Ótimo. Vamos nos reunir de novo na quinta para ver o andamento. Dez da manhã funciona para todos?",
    "audio": "talk/dialogues/the-team-meeting/cb012b8c9687.mp3",
    "options": [
     {
      "text": "Ten works for me.",
      "pt": "Dez horas funciona para mim.",
      "audio": "talk/dialogues/the-team-meeting/571f754a787c.mp3",
      "audioF": "talk/dialogues/the-team-meeting/8caa6517a8a9.mp3",
      "next": "end"
     },
     {
      "text": "Could we make it eleven? I have a call at ten.",
      "pt": "Podemos fazer às onze? Tenho uma ligação às dez.",
      "audio": "talk/dialogues/the-team-meeting/e5f9d3e515c9.mp3",
      "audioF": "talk/dialogues/the-team-meeting/22195fde2e04.mp3",
      "next": "eleven"
     },
     {
      "text": "I have ten fingers.",
      "pt": "Tenho dez dedos.",
      "audio": "talk/dialogues/the-team-meeting/650097b66802.mp3",
      "audioF": "talk/dialogues/the-team-meeting/99f3f04f3ca9.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean, is Thursday at ten okay for you?",
       "pt": "Rá! Quero dizer, quinta às dez está bom para você?",
       "audio": "talk/dialogues/the-team-meeting/4c59ed76e76e.mp3"
      }
     }
    ]
   },
   "eleven": {
    "speaker": "l",
    "text": "Sure, eleven it is.",
    "pt": "Claro, fica às onze então.",
    "audio": "talk/dialogues/the-team-meeting/db0337b919dc.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "l",
    "text": "Thanks, everyone. Good meeting.",
    "pt": "Obrigada, pessoal. Boa reunião.",
    "audio": "talk/dialogues/the-team-meeting/e9773adc0170.mp3",
    "end": true
   }
  },
  "nudges": {
   "l": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/the-team-meeting/813b1388a6e6.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/the-team-meeting/a4e28fe395a3.mp3"
    }
   ],
   "k": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/the-team-meeting/723b4e03956c.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/the-team-meeting/02f14f91271d.mp3"
    }
   ]
  }
 },
 {
  "slug": "at-the-pharmacy",
  "title": "At the Pharmacy",
  "level": "A2",
  "description": "Compre um remédio para gripe ou dor de cabeça.",
  "intro": "Você acordou resfriado e com dor de cabeça. Passa na farmácia do bairro, e a farmacêutica Grace sorri do balcão.",
  "cast": {
   "p": {
    "name": "Grace",
    "role": "Farmacêutica"
   }
  },
  "start": "p1",
  "decisions": [
   7,
   8
  ],
  "nodes": {
   "p1": {
    "speaker": "p",
    "text": "Hi there. What can I get for you today?",
    "pt": "Olá. O que posso fazer por você hoje?",
    "audio": "talk/dialogues/at-the-pharmacy/fc383694caad.mp3",
    "options": [
     {
      "text": "I have a bad cold. Do you have anything for it?",
      "pt": "Estou com um resfriado forte. Vocês têm alguma coisa para isso?",
      "audio": "talk/dialogues/at-the-pharmacy/16eb256aee50.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/179c79c17954.mp3",
      "next": "cold"
     },
     {
      "text": "I need something for a headache, please.",
      "pt": "Preciso de algo para dor de cabeça, por favor.",
      "audio": "talk/dialogues/at-the-pharmacy/bd8ba32d8cee.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/f07812afc9ce.mp3",
      "next": "head"
     },
     {
      "text": "A coffee with milk, please.",
      "pt": "Um café com leite, por favor.",
      "audio": "talk/dialogues/at-the-pharmacy/9d6d3dbe93d1.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/c8462b0fbeab.mp3",
      "next": null,
      "react": {
       "text": "Ha, this is a pharmacy! What can I help you with?",
       "pt": "Rá, aqui é uma farmácia! Em que posso ajudar?",
       "audio": "talk/dialogues/at-the-pharmacy/3b330aa6173b.mp3"
      }
     }
    ]
   },
   "cold": {
    "speaker": "p",
    "text": "Oh dear. What are your symptoms?",
    "pt": "Ah, que chato. Quais são os seus sintomas?",
    "audio": "talk/dialogues/at-the-pharmacy/8f872a2da854.mp3",
    "options": [
     {
      "text": "A runny nose and a sore throat.",
      "pt": "Nariz escorrendo e dor de garganta.",
      "audio": "talk/dialogues/at-the-pharmacy/92213d25a30d.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/81294ce252f4.mp3",
      "next": "throat"
     },
     {
      "text": "I'm coughing a lot, especially at night.",
      "pt": "Estou tossindo muito, principalmente à noite.",
      "audio": "talk/dialogues/at-the-pharmacy/b4a41b2de66c.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/79c329833e22.mp3",
      "next": "cough"
     },
     {
      "text": "My symptoms are in my bag.",
      "pt": "Meus sintomas estão na minha bolsa.",
      "audio": "talk/dialogues/at-the-pharmacy/d7d87b9f91d9.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/a9ffb0e8c263.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean, how do you feel? A sore throat? A cough?",
       "pt": "Rá! Quero dizer, como você está se sentindo? Dor de garganta? Tosse?",
       "audio": "talk/dialogues/at-the-pharmacy/4b884d2ce9f8.mp3"
      }
     }
    ]
   },
   "throat": {
    "speaker": "p",
    "text": "Do you have a temperature as well?",
    "pt": "Você está com febre também?",
    "audio": "talk/dialogues/at-the-pharmacy/9912cff6e4b9.mp3",
    "options": [
     {
      "text": "No, I don't think so.",
      "pt": "Não, acho que não.",
      "audio": "talk/dialogues/at-the-pharmacy/7d83194e2780.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/0f7edb217b16.mp3",
      "next": "fever_no"
     },
     {
      "text": "Yes, a little. I feel hot and tired.",
      "pt": "Sim, um pouco. Estou com calor e cansaço.",
      "audio": "talk/dialogues/at-the-pharmacy/34e25c30db5c.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/eeb1f92ec3bd.mp3",
      "next": "fever_yes"
     },
     {
      "text": "It's about twenty degrees outside.",
      "pt": "Está uns vinte graus lá fora.",
      "audio": "talk/dialogues/at-the-pharmacy/90d3906d4dc9.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/a04e1f6d1f2f.mp3",
      "next": null,
      "react": {
       "text": "Ha, not the weather! I mean, do you have a fever?",
       "pt": "Rá, não o tempo! Quero dizer, você está com febre?",
       "audio": "talk/dialogues/at-the-pharmacy/6294ea7de090.mp3"
      }
     }
    ]
   },
   "fever_no": {
    "speaker": "p",
    "text": "Okay. These lozenges are good for a sore throat, and this spray helps with a blocked nose.",
    "pt": "Certo. Estas pastilhas são boas para dor de garganta, e este spray ajuda com o nariz entupido.",
    "audio": "talk/dialogues/at-the-pharmacy/701774eafdbd.mp3",
    "next": "allergy"
   },
   "fever_yes": {
    "speaker": "p",
    "text": "Then I'd recommend paracetamol. It helps with the fever and the pain.",
    "pt": "Então eu recomendo paracetamol. Ajuda com a febre e com a dor.",
    "audio": "talk/dialogues/at-the-pharmacy/d81b39bb2008.mp3",
    "next": "allergy"
   },
   "cough": {
    "speaker": "p",
    "text": "Is it a dry cough, or a chesty cough?",
    "pt": "É uma tosse seca ou com catarro?",
    "audio": "talk/dialogues/at-the-pharmacy/543af3e8569a.mp3",
    "options": [
     {
      "text": "It's dry. It just tickles my throat.",
      "pt": "É seca. Só fica coçando a garganta.",
      "audio": "talk/dialogues/at-the-pharmacy/054fa69ae55b.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/a1038fecafc4.mp3",
      "next": "dry"
     },
     {
      "text": "Chesty, I think. I can feel it in my chest.",
      "pt": "Com catarro, acho. Sinto no peito.",
      "audio": "talk/dialogues/at-the-pharmacy/c1012c376d72.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/f70a60205792.mp3",
      "next": "chesty"
     },
     {
      "text": "I play chess on Sundays.",
      "pt": "Eu jogo xadrez aos domingos.",
      "audio": "talk/dialogues/at-the-pharmacy/18ec77cb75b9.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/9b35697274c4.mp3",
      "next": null,
      "react": {
       "text": "Ha! Not chess. Is your cough dry, or do you feel it in your chest?",
       "pt": "Rá! Não é xadrez. Sua tosse é seca ou você sente no peito?",
       "audio": "talk/dialogues/at-the-pharmacy/9c12aea4400f.mp3"
      }
     }
    ]
   },
   "dry": {
    "speaker": "p",
    "text": "This syrup is good for dry coughs. It can make you a bit sleepy, though.",
    "pt": "Este xarope é bom para tosse seca. Mas pode dar um pouco de sono.",
    "audio": "talk/dialogues/at-the-pharmacy/e0e85d09851e.mp3",
    "next": "sleepy"
   },
   "sleepy": {
    "speaker": "p",
    "text": "Is that a problem? Do you need to drive or work today?",
    "pt": "Isso é um problema? Você precisa dirigir ou trabalhar hoje?",
    "audio": "talk/dialogues/at-the-pharmacy/9926bbe8add5.mp3",
    "options": [
     {
      "text": "Yes, I have to drive later.",
      "pt": "Sim, tenho que dirigir mais tarde.",
      "audio": "talk/dialogues/at-the-pharmacy/164d5136dd6c.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/2f04c36d5fbe.mp3",
      "next": "nondrowsy"
     },
     {
      "text": "No, that's fine. I'm staying at home today.",
      "pt": "Não, tudo bem. Vou ficar em casa hoje.",
      "audio": "talk/dialogues/at-the-pharmacy/75151d783bdf.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/94f45e8cd73c.mp3",
      "next": "allergy"
     },
     {
      "text": "I usually sleep about seven hours.",
      "pt": "Normalmente durmo umas sete horas.",
      "audio": "talk/dialogues/at-the-pharmacy/cf2ce17793d7.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/f753331ae0fe.mp3",
      "next": null,
      "react": {
       "text": "Good for you! But will you drive today? The syrup can make you sleepy.",
       "pt": "Que bom! Mas você vai dirigir hoje? O xarope pode dar sono.",
       "audio": "talk/dialogues/at-the-pharmacy/30dc1f22290d.mp3"
      }
     }
    ]
   },
   "nondrowsy": {
    "speaker": "p",
    "text": "No problem. This one won't make you sleepy.",
    "pt": "Sem problema. Este aqui não dá sono.",
    "audio": "talk/dialogues/at-the-pharmacy/c6a0cb919b01.mp3",
    "next": "allergy"
   },
   "chesty": {
    "speaker": "p",
    "text": "Then try this syrup. It helps to clear your chest.",
    "pt": "Então experimente este xarope. Ele ajuda a limpar o peito.",
    "audio": "talk/dialogues/at-the-pharmacy/47bf8dc4b7d6.mp3",
    "next": "allergy"
   },
   "head": {
    "speaker": "p",
    "text": "Oh, I'm sorry. How long have you had it?",
    "pt": "Ah, que pena. Há quanto tempo você está com ela?",
    "audio": "talk/dialogues/at-the-pharmacy/e523444d608f.mp3",
    "options": [
     {
      "text": "Since this morning.",
      "pt": "Desde hoje de manhã.",
      "audio": "talk/dialogues/at-the-pharmacy/4b627bd6dd0e.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/9c523e5b07ec.mp3",
      "next": "head_short"
     },
     {
      "text": "For about three days now.",
      "pt": "Já faz uns três dias.",
      "audio": "talk/dialogues/at-the-pharmacy/0a248aa83741.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/45d8ea76045c.mp3",
      "next": "head_long"
     },
     {
      "text": "I have long hair, yes.",
      "pt": "Tenho cabelo comprido, sim.",
      "audio": "talk/dialogues/at-the-pharmacy/640bc3f2af66.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/e57dfc4f592d.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean, when did the headache start?",
       "pt": "Rá! Quero dizer, quando a dor de cabeça começou?",
       "audio": "talk/dialogues/at-the-pharmacy/d204d72b1711.mp3"
      }
     }
    ]
   },
   "head_long": {
    "speaker": "p",
    "text": "Three days is quite a long time. Are you sleeping well? Drinking enough water?",
    "pt": "Três dias é bastante tempo. Você está dormindo bem? Bebendo água suficiente?",
    "audio": "talk/dialogues/at-the-pharmacy/2e73ac060f67.mp3",
    "options": [
     {
      "text": "Not really. I've been working late.",
      "pt": "Não muito. Tenho trabalhado até tarde.",
      "audio": "talk/dialogues/at-the-pharmacy/b198bd80a071.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/5ca6e70f75e2.mp3",
      "next": "water"
     },
     {
      "text": "Actually, I probably don't drink enough water.",
      "pt": "Na verdade, acho que não bebo água suficiente.",
      "audio": "talk/dialogues/at-the-pharmacy/a2780225244b.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/e8874e7610db.mp3",
      "next": "water"
     },
     {
      "text": "I sleep in a very big bed.",
      "pt": "Durmo numa cama bem grande.",
      "audio": "talk/dialogues/at-the-pharmacy/7158d75a26b4.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/5b91495c4f1b.mp3",
      "next": null,
      "react": {
       "text": "Lucky you! But are you getting enough sleep?",
       "pt": "Que sorte! Mas você está dormindo o suficiente?",
       "audio": "talk/dialogues/at-the-pharmacy/31f259b08614.mp3"
      }
     }
    ]
   },
   "water": {
    "speaker": "p",
    "text": "That can cause headaches. Drink more water, and see a doctor if it doesn't stop.",
    "pt": "Isso pode causar dor de cabeça. Beba mais água e procure um médico se não passar.",
    "audio": "talk/dialogues/at-the-pharmacy/da34c47c4119.mp3",
    "next": "head_short"
   },
   "head_short": {
    "speaker": "p",
    "text": "I'd suggest ibuprofen or paracetamol. Which one do you usually take?",
    "pt": "Eu sugiro ibuprofeno ou paracetamol. Qual você costuma tomar?",
    "audio": "talk/dialogues/at-the-pharmacy/a4237b4f56ab.mp3",
    "options": [
     {
      "text": "Ibuprofen usually works for me.",
      "pt": "Ibuprofeno costuma funcionar para mim.",
      "audio": "talk/dialogues/at-the-pharmacy/e8a8f41ce70d.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/fbb239b2b40e.mp3",
      "next": "allergy"
     },
     {
      "text": "Paracetamol, please. Ibuprofen hurts my stomach.",
      "pt": "Paracetamol, por favor. Ibuprofeno me faz mal ao estômago.",
      "audio": "talk/dialogues/at-the-pharmacy/c745c7a785e8.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/17db37d9cd18.mp3",
      "next": "stomach"
     },
     {
      "text": "I usually take the bus.",
      "pt": "Normalmente pego o ônibus.",
      "audio": "talk/dialogues/at-the-pharmacy/a8a1633140c0.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/9bcec5fb1ae8.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean the medicine. Ibuprofen or paracetamol?",
       "pt": "Rá! Falo do remédio. Ibuprofeno ou paracetamol?",
       "audio": "talk/dialogues/at-the-pharmacy/ef50df708c3c.mp3"
      }
     }
    ]
   },
   "stomach": {
    "speaker": "p",
    "text": "Good to know. Paracetamol is gentler on the stomach.",
    "pt": "Bom saber. O paracetamol é mais leve para o estômago.",
    "audio": "talk/dialogues/at-the-pharmacy/e3b4c7da005a.mp3",
    "next": "allergy"
   },
   "allergy": {
    "speaker": "p",
    "text": "Before I give you this, are you allergic to any medicines?",
    "pt": "Antes de te dar isto, você tem alergia a algum remédio?",
    "audio": "talk/dialogues/at-the-pharmacy/788418a162ab.mp3",
    "options": [
     {
      "text": "No, not that I know of.",
      "pt": "Não, que eu saiba, não.",
      "audio": "talk/dialogues/at-the-pharmacy/5fd54b2cba60.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/724d89732d14.mp3",
      "next": "other_meds"
     },
     {
      "text": "Yes, I'm allergic to penicillin.",
      "pt": "Sim, tenho alergia a penicilina.",
      "audio": "talk/dialogues/at-the-pharmacy/d96e64031d8f.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/1028baa72bd1.mp3",
      "next": "penicillin"
     },
     {
      "text": "I'm allergic to Mondays.",
      "pt": "Tenho alergia a segunda-feira.",
      "audio": "talk/dialogues/at-the-pharmacy/58898e7d576d.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/defc7fc6be48.mp3",
      "next": null,
      "react": {
       "text": "Ha! Me too. But are you allergic to any medicines?",
       "pt": "Rá! Eu também. Mas você tem alergia a algum remédio?",
       "audio": "talk/dialogues/at-the-pharmacy/9631c644df79.mp3"
      }
     }
    ]
   },
   "penicillin": {
    "speaker": "p",
    "text": "Thanks for telling me. There's no penicillin in this, so it's safe for you.",
    "pt": "Obrigada por avisar. Isto não tem penicilina, então é seguro para você.",
    "audio": "talk/dialogues/at-the-pharmacy/74a59d3ab7de.mp3",
    "next": "other_meds"
   },
   "other_meds": {
    "speaker": "p",
    "text": "And are you taking any other medicine at the moment?",
    "pt": "E você está tomando algum outro remédio no momento?",
    "audio": "talk/dialogues/at-the-pharmacy/7ff94b3fcee2.mp3",
    "options": [
     {
      "text": "No, nothing else.",
      "pt": "Não, mais nada.",
      "audio": "talk/dialogues/at-the-pharmacy/7800b3df9258.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/e1240bd39bac.mp3",
      "next": "dose"
     },
     {
      "text": "Just some vitamins.",
      "pt": "Só umas vitaminas.",
      "audio": "talk/dialogues/at-the-pharmacy/b4bdb11db402.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/4dd5615366c5.mp3",
      "next": "dose"
     },
     {
      "text": "Yes, I'm taking an English course.",
      "pt": "Sim, estou fazendo um curso de inglês.",
      "audio": "talk/dialogues/at-the-pharmacy/3859e3ac7a06.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/90a438330f1d.mp3",
      "next": null,
      "react": {
       "text": "Ha, good for you! But I meant pills or medicine. Anything?",
       "pt": "Rá, que ótimo! Mas eu quis dizer comprimidos ou remédios. Algum?",
       "audio": "talk/dialogues/at-the-pharmacy/921f83f739fe.mp3"
      }
     }
    ]
   },
   "dose": {
    "speaker": "p",
    "text": "Okay. Take it three times a day, after meals. Not more than that, please.",
    "pt": "Certo. Tome três vezes ao dia, depois das refeições. Não mais do que isso, por favor.",
    "audio": "talk/dialogues/at-the-pharmacy/7eb52f2c0c81.mp3",
    "next": "dose_q"
   },
   "dose_q": {
    "speaker": "p",
    "text": "Do you have any questions about how to take it?",
    "pt": "Tem alguma dúvida sobre como tomar?",
    "audio": "talk/dialogues/at-the-pharmacy/2fdbbe88cd02.mp3",
    "options": [
     {
      "text": "Can I take it on an empty stomach?",
      "pt": "Posso tomar em jejum?",
      "audio": "talk/dialogues/at-the-pharmacy/bf6611302b3e.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/0df6db60d127.mp3",
      "next": "empty"
     },
     {
      "text": "How long should I take it for?",
      "pt": "Por quanto tempo devo tomar?",
      "audio": "talk/dialogues/at-the-pharmacy/ea92db41d912.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/6ae9afe2f911.mp3",
      "next": "howlong"
     },
     {
      "text": "No, that's clear. Thank you.",
      "pt": "Não, está claro. Obrigado.",
      "audio": "talk/dialogues/at-the-pharmacy/1bcf1b458b08.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/19f2f0014287.mp3",
      "next": "pay"
     },
     {
      "text": "Can I take it to the beach?",
      "pt": "Posso levar para a praia?",
      "audio": "talk/dialogues/at-the-pharmacy/18a02261467b.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/f12c1f846af8.mp3",
      "next": null,
      "react": {
       "text": "Ha, you can take it anywhere! But any questions about the dose?",
       "pt": "Rá, pode levar para onde quiser! Mas alguma dúvida sobre a dose?",
       "audio": "talk/dialogues/at-the-pharmacy/4f9bdb282cee.mp3"
      }
     }
    ]
   },
   "empty": {
    "speaker": "p",
    "text": "Better not. Take it with food, or it might upset your stomach.",
    "pt": "Melhor não. Tome com comida, senão pode fazer mal ao estômago.",
    "audio": "talk/dialogues/at-the-pharmacy/ac4465a8e334.mp3",
    "next": "pay"
   },
   "howlong": {
    "speaker": "p",
    "text": "Up to five days. If you don't feel better by then, please see a doctor.",
    "pt": "Até cinco dias. Se não melhorar até lá, procure um médico, por favor.",
    "audio": "talk/dialogues/at-the-pharmacy/c6b5b34530c0.mp3",
    "next": "pay"
   },
   "pay": {
    "speaker": "p",
    "text": "That's six pounds fifty. Would you like a bag?",
    "pt": "São seis libras e cinquenta. Quer uma sacola?",
    "audio": "talk/dialogues/at-the-pharmacy/134ae0d326a8.mp3",
    "options": [
     {
      "text": "No, thanks. I'll put it in my pocket.",
      "pt": "Não, obrigado. Vou pôr no bolso.",
      "audio": "talk/dialogues/at-the-pharmacy/d84dd5272762.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/d83e4c61a821.mp3",
      "next": "end"
     },
     {
      "text": "Yes, please. Can I pay by card?",
      "pt": "Sim, por favor. Posso pagar com cartão?",
      "audio": "talk/dialogues/at-the-pharmacy/7a9c11056aab.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/acfb672ba2ca.mp3",
      "next": "card"
     },
     {
      "text": "Yes, a big bag of sweets, please.",
      "pt": "Sim, um saco grande de balas, por favor.",
      "audio": "talk/dialogues/at-the-pharmacy/be16556a825e.mp3",
      "audioF": "talk/dialogues/at-the-pharmacy/dffcdf231689.mp3",
      "next": null,
      "react": {
       "text": "Ha, no sweets here, sorry! Do you need a bag for your medicine?",
       "pt": "Rá, aqui não tem bala, desculpe! Precisa de uma sacola para o remédio?",
       "audio": "talk/dialogues/at-the-pharmacy/2c3be985c9c0.mp3"
      }
     }
    ]
   },
   "card": {
    "speaker": "p",
    "text": "Of course. Just tap it here.",
    "pt": "Claro. É só encostar aqui.",
    "audio": "talk/dialogues/at-the-pharmacy/0450e718eb8f.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "p",
    "text": "There you go. Get some rest, drink lots of water, and get well soon!",
    "pt": "Aqui está. Descanse, beba bastante água e melhoras!",
    "audio": "talk/dialogues/at-the-pharmacy/8a27b280698e.mp3",
    "end": true
   }
  },
  "nudges": {
   "p": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/at-the-pharmacy/b6e85f66b62f.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/at-the-pharmacy/c833c117ca8b.mp3"
    }
   ]
  }
 },
 {
  "slug": "a-phone-call-booking",
  "title": "Booking by Phone",
  "level": "A2",
  "description": "Reserve ou mude uma mesa por telefone.",
  "intro": "Você liga para o Rosa's Kitchen, um restaurante bem movimentado. Do outro lado da linha, com muito barulho ao fundo, atende o Jake.",
  "cast": {
   "h": {
    "name": "Jake",
    "role": "Atendente do restaurante"
   }
  },
  "start": "b1",
  "decisions": [
   4,
   9
  ],
  "nodes": {
   "b1": {
    "speaker": "h",
    "text": "Good evening, Rosa's Kitchen, Jake speaking. How can I help?",
    "pt": "Boa noite, Rosa's Kitchen, Jake falando. Como posso ajudar?",
    "audio": "talk/dialogues/a-phone-call-booking/9fd8f59a84d6.mp3",
    "options": [
     {
      "text": "Hi. I'd like to book a table, please.",
      "pt": "Oi. Eu gostaria de reservar uma mesa, por favor.",
      "audio": "talk/dialogues/a-phone-call-booking/ea156c4250d4.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/916cbcb7ec8c.mp3",
      "next": "book"
     },
     {
      "text": "Hi. I have a booking, but I need to change it.",
      "pt": "Oi. Tenho uma reserva, mas preciso mudar.",
      "audio": "talk/dialogues/a-phone-call-booking/4877086d841a.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/d9ced9790b35.mp3",
      "next": "change"
     },
     {
      "text": "Hi. I'd like to book a flight to Paris.",
      "pt": "Oi. Eu gostaria de reservar um voo para Paris.",
      "audio": "talk/dialogues/a-phone-call-booking/22f55db805a3.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/4a3f305fa1db.mp3",
      "next": null,
      "react": {
       "text": "Ha, this is a restaurant, not an airline! Would you like a table?",
       "pt": "Rá, aqui é um restaurante, não uma companhia aérea! Quer uma mesa?",
       "audio": "talk/dialogues/a-phone-call-booking/ae738d295d59.mp3"
      }
     }
    ]
   },
   "book": {
    "speaker": "h",
    "text": "Sure. Which day would you like?",
    "pt": "Claro. Para que dia?",
    "audio": "talk/dialogues/a-phone-call-booking/9b169dc87e2b.mp3",
    "options": [
     {
      "text": "This Friday, if possible.",
      "pt": "Esta sexta, se possível.",
      "audio": "talk/dialogues/a-phone-call-booking/7b803e9d5d30.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/17be3d350cc5.mp3",
      "next": "friday"
     },
     {
      "text": "Tomorrow night, please.",
      "pt": "Amanhã à noite, por favor.",
      "audio": "talk/dialogues/a-phone-call-booking/dad221084214.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/bf6ff3453b1f.mp3",
      "next": "tomorrow"
     },
     {
      "text": "Turn left after the bank.",
      "pt": "Vire à esquerda depois do banco.",
      "audio": "talk/dialogues/a-phone-call-booking/c92e498f82a4.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/5bc709b87767.mp3",
      "next": null,
      "react": {
       "text": "Ha, I know where we are! I mean, what day is the booking for?",
       "pt": "Rá, eu sei onde a gente fica! Quero dizer, a reserva é para que dia?",
       "audio": "talk/dialogues/a-phone-call-booking/15119bb33b9f.mp3"
      }
     }
    ]
   },
   "friday": {
    "speaker": "h",
    "text": "Sorry, it's really noisy here! Friday's busy, but I have seven o'clock or half past nine.",
    "pt": "Desculpe, está muito barulhento aqui! Sexta está cheio, mas tenho às sete ou às nove e meia.",
    "audio": "talk/dialogues/a-phone-call-booking/e1fd7a3c7b0c.mp3",
    "options": [
     {
      "text": "Seven o'clock is perfect.",
      "pt": "Às sete está perfeito.",
      "audio": "talk/dialogues/a-phone-call-booking/546f09516eb0.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/4d548154e812.mp3",
      "next": "people"
     },
     {
      "text": "Half past nine is fine.",
      "pt": "Às nove e meia está bom.",
      "audio": "talk/dialogues/a-phone-call-booking/8c695f5d4ba9.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/69076b67d541.mp3",
      "next": "people"
     },
     {
      "text": "Sorry, did you say nine or five?",
      "pt": "Desculpe, você disse nove ou cinco?",
      "audio": "talk/dialogues/a-phone-call-booking/e68067af6145.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/4d37a08dde77.mp3",
      "next": "repeat"
     },
     {
      "text": "Yes, my house is noisy too.",
      "pt": "Sim, minha casa também é barulhenta.",
      "audio": "talk/dialogues/a-phone-call-booking/f39b4a9d44db.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/2ec9f8bf524e.mp3",
      "next": null,
      "react": {
       "text": "Ha! So, seven, or half past nine?",
       "pt": "Rá! Então, às sete ou às nove e meia?",
       "audio": "talk/dialogues/a-phone-call-booking/f2f3274594fe.mp3"
      }
     }
    ]
   },
   "repeat": {
    "speaker": "h",
    "text": "Nine. Half past nine. Nine thirty.",
    "pt": "Nove. Nove e meia. Nove e trinta.",
    "audio": "talk/dialogues/a-phone-call-booking/2b2d151a6dc3.mp3",
    "next": "repeat_q"
   },
   "repeat_q": {
    "speaker": "h",
    "text": "So, seven or nine thirty?",
    "pt": "Então, sete ou nove e meia?",
    "audio": "talk/dialogues/a-phone-call-booking/30c3d75a6d54.mp3",
    "options": [
     {
      "text": "Seven, please.",
      "pt": "Às sete, por favor.",
      "audio": "talk/dialogues/a-phone-call-booking/ce6a1a52228f.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/8b4eaa24840b.mp3",
      "next": "people"
     },
     {
      "text": "Nine thirty is better for us.",
      "pt": "Nove e meia é melhor para nós.",
      "audio": "talk/dialogues/a-phone-call-booking/264a2fb38851.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/dbfaebd57240.mp3",
      "next": "people"
     },
     {
      "text": "Nineteen, please.",
      "pt": "Dezenove, por favor.",
      "audio": "talk/dialogues/a-phone-call-booking/41baab4f088b.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/9e4118c964a8.mp3",
      "next": null,
      "react": {
       "text": "Nineteen? We close at eleven! Seven, or nine thirty?",
       "pt": "Dezenove? A gente fecha às onze! Sete ou nove e meia?",
       "audio": "talk/dialogues/a-phone-call-booking/3e480208732f.mp3"
      }
     }
    ]
   },
   "tomorrow": {
    "speaker": "h",
    "text": "Tomorrow, let me see. I have a table at eight. Does that work?",
    "pt": "Amanhã, deixa eu ver. Tenho uma mesa às oito. Pode ser?",
    "audio": "talk/dialogues/a-phone-call-booking/514afc8372e7.mp3",
    "options": [
     {
      "text": "Yes, eight is great.",
      "pt": "Sim, às oito está ótimo.",
      "audio": "talk/dialogues/a-phone-call-booking/4371db62cbf2.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/39c8f0dc58a3.mp3",
      "next": "people"
     },
     {
      "text": "Do you have anything earlier?",
      "pt": "Vocês têm algo mais cedo?",
      "audio": "talk/dialogues/a-phone-call-booking/2189fa63be0a.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/4be7b7964977.mp3",
      "next": "earlier"
     },
     {
      "text": "Yes, I ate already, thanks.",
      "pt": "Sim, já comi, obrigado.",
      "audio": "talk/dialogues/a-phone-call-booking/08d50b297b5a.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/f19a685bc485.mp3",
      "next": null,
      "react": {
       "text": "Ha! No, eight o'clock, the time. Is a table at eight okay?",
       "pt": "Rá! Não, oito horas, o horário. Uma mesa às oito está bom?",
       "audio": "talk/dialogues/a-phone-call-booking/8694ac391e33.mp3"
      }
     }
    ]
   },
   "earlier": {
    "speaker": "h",
    "text": "Only at quarter past six, I'm afraid. Is that too early?",
    "pt": "Só às seis e quinze, infelizmente. É cedo demais?",
    "audio": "talk/dialogues/a-phone-call-booking/be7705f9d225.mp3",
    "options": [
     {
      "text": "No, quarter past six is fine.",
      "pt": "Não, seis e quinze está bom.",
      "audio": "talk/dialogues/a-phone-call-booking/6b3f66cca8fc.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/51f40375028d.mp3",
      "next": "people"
     },
     {
      "text": "That's a bit early. Let's keep eight.",
      "pt": "É um pouco cedo. Vamos manter às oito.",
      "audio": "talk/dialogues/a-phone-call-booking/fe7220f7cf91.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/93e90f847139.mp3",
      "next": "people"
     },
     {
      "text": "Six bottles of water, please.",
      "pt": "Seis garrafas de água, por favor.",
      "audio": "talk/dialogues/a-phone-call-booking/b1d33cb57a0b.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/75a179940978.mp3",
      "next": null,
      "react": {
       "text": "Ha, I'm just booking tables! Quarter past six, or eight?",
       "pt": "Rá, eu só faço reservas! Seis e quinze ou oito?",
       "audio": "talk/dialogues/a-phone-call-booking/b08c2aabff4b.mp3"
      }
     }
    ]
   },
   "people": {
    "speaker": "h",
    "text": "And how many people is it for?",
    "pt": "E é para quantas pessoas?",
    "audio": "talk/dialogues/a-phone-call-booking/ae5412c214a1.mp3",
    "options": [
     {
      "text": "Just two of us.",
      "pt": "Só duas pessoas.",
      "audio": "talk/dialogues/a-phone-call-booking/7700bd29b01c.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/dbed17801896.mp3",
      "next": "name"
     },
     {
      "text": "Six people. Is that okay?",
      "pt": "Seis pessoas. Tudo bem?",
      "audio": "talk/dialogues/a-phone-call-booking/31c161675dcc.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/13e4ae64562e.mp3",
      "next": "big"
     },
     {
      "text": "About two hours.",
      "pt": "Umas duas horas.",
      "audio": "talk/dialogues/a-phone-call-booking/7af6dc75aa3e.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/31cba66a92ab.mp3",
      "next": null,
      "react": {
       "text": "Ha, take your time! But how many people are coming?",
       "pt": "Rá, fique à vontade! Mas quantas pessoas vêm?",
       "audio": "talk/dialogues/a-phone-call-booking/c589079a3efa.mp3"
      }
     }
    ]
   },
   "big": {
    "speaker": "h",
    "text": "For six, I'll put two tables together. No problem.",
    "pt": "Para seis, eu junto duas mesas. Sem problema.",
    "audio": "talk/dialogues/a-phone-call-booking/41d3bf89f16b.mp3",
    "next": "name"
   },
   "name": {
    "speaker": "h",
    "text": "Great. Can I take a name for the booking?",
    "pt": "Ótimo. Pode me dar um nome para a reserva?",
    "audio": "talk/dialogues/a-phone-call-booking/ded25e15f04f.mp3",
    "options": [
     {
      "text": "Sure, it's Silva.",
      "pt": "Claro, é Silva.",
      "audio": "talk/dialogues/a-phone-call-booking/78c686ebb695.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/99a3506d7280.mp3",
      "next": "spell"
     },
     {
      "text": "It's Silva. S, I, L, V, A.",
      "pt": "É Silva. S, I, L, V, A.",
      "audio": "talk/dialogues/a-phone-call-booking/f4927f6dea5f.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/69b6f6a7ff3c.mp3",
      "next": "phone"
     },
     {
      "text": "Yes, you can take my coat.",
      "pt": "Sim, pode pegar meu casaco.",
      "audio": "talk/dialogues/a-phone-call-booking/788dc8385541.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/b58a50fe1b6e.mp3",
      "next": null,
      "react": {
       "text": "Ha! Just your name, please. Who's the booking for?",
       "pt": "Rá! Só o seu nome, por favor. A reserva é em nome de quem?",
       "audio": "talk/dialogues/a-phone-call-booking/605f2dc1fd01.mp3"
      }
     }
    ]
   },
   "spell": {
    "speaker": "h",
    "text": "Sorry, was that Silva with a V or a B?",
    "pt": "Desculpe, é Silva com V ou com B?",
    "audio": "talk/dialogues/a-phone-call-booking/d2ff53fd695b.mp3",
    "options": [
     {
      "text": "With a V. S, I, L, V, A.",
      "pt": "Com V. S, I, L, V, A.",
      "audio": "talk/dialogues/a-phone-call-booking/b1d8b1131da7.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/5a1a0ab31aa5.mp3",
      "next": "phone"
     },
     {
      "text": "V, like Victor.",
      "pt": "V, de Victor.",
      "audio": "talk/dialogues/a-phone-call-booking/06439957eb3b.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/f83a025cb9f7.mp3",
      "next": "phone"
     },
     {
      "text": "With a fork and knife.",
      "pt": "Com garfo e faca.",
      "audio": "talk/dialogues/a-phone-call-booking/41c49dc14ff3.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/7f3a670a6f87.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean the letter. Is it V, or B?",
       "pt": "Rá! Falo da letra. É V ou B?",
       "audio": "talk/dialogues/a-phone-call-booking/6c1acb2bf893.mp3"
      }
     }
    ]
   },
   "phone": {
    "speaker": "h",
    "text": "And a phone number, in case we need to call you?",
    "pt": "E um telefone, caso a gente precise ligar?",
    "audio": "talk/dialogues/a-phone-call-booking/43fc90c3048b.mp3",
    "options": [
     {
      "text": "Sure, it's the number I'm calling from.",
      "pt": "Claro, é o número de onde estou ligando.",
      "audio": "talk/dialogues/a-phone-call-booking/6295cdd2baa5.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/d0052c5d0d90.mp3",
      "next": "phone_ok"
     },
     {
      "text": "I don't have a local number yet. Is that a problem?",
      "pt": "Ainda não tenho um número daqui. Tem problema?",
      "audio": "talk/dialogues/a-phone-call-booking/990d92215654.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/c7bf9f074c69.mp3",
      "next": "nolocal"
     },
     {
      "text": "No, thanks. I already have a phone.",
      "pt": "Não, obrigado. Já tenho um celular.",
      "audio": "talk/dialogues/a-phone-call-booking/d410378e25d2.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/ddf57d212797.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean your number. Can we call you if we need to?",
       "pt": "Rá! Falo do seu número. Podemos te ligar se precisar?",
       "audio": "talk/dialogues/a-phone-call-booking/73ec7bf810a0.mp3"
      }
     }
    ]
   },
   "phone_ok": {
    "speaker": "h",
    "text": "Perfect, I can see it here.",
    "pt": "Perfeito, estou vendo aqui.",
    "audio": "talk/dialogues/a-phone-call-booking/3ba2cda60775.mp3",
    "next": "confirm"
   },
   "nolocal": {
    "speaker": "h",
    "text": "No problem. Any number is fine. We only call if something changes.",
    "pt": "Sem problema. Qualquer número serve. Só ligamos se algo mudar.",
    "audio": "talk/dialogues/a-phone-call-booking/2997429ff83d.mp3",
    "next": "confirm"
   },
   "confirm": {
    "speaker": "h",
    "text": "Great, you're all booked under Silva. Anything else?",
    "pt": "Ótimo, está tudo reservado em nome de Silva. Mais alguma coisa?",
    "audio": "talk/dialogues/a-phone-call-booking/fa56dc03e86a.mp3",
    "options": [
     {
      "text": "Do you have vegetarian options?",
      "pt": "Vocês têm opções vegetarianas?",
      "audio": "talk/dialogues/a-phone-call-booking/088bfc3da812.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/9137db6efdfe.mp3",
      "next": "veg"
     },
     {
      "text": "Is there parking near the restaurant?",
      "pt": "Tem estacionamento perto do restaurante?",
      "audio": "talk/dialogues/a-phone-call-booking/812afb046426.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/2af686d0103a.mp3",
      "next": "parking"
     },
     {
      "text": "No, that's everything. Thanks!",
      "pt": "Não, é só isso. Obrigado!",
      "audio": "talk/dialogues/a-phone-call-booking/134795c770ec.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/7b86f55e29d4.mp3",
      "next": "end"
     },
     {
      "text": "Yes, under my bed, please.",
      "pt": "Sim, debaixo da minha cama, por favor.",
      "audio": "talk/dialogues/a-phone-call-booking/e7b556e97d24.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/72fbe564d17c.mp3",
      "next": null,
      "react": {
       "text": "Ha! Under the name Silva, I mean. Can I help with anything else?",
       "pt": "Rá! Em nome de Silva, eu quis dizer. Posso ajudar em mais alguma coisa?",
       "audio": "talk/dialogues/a-phone-call-booking/9d59029a59e4.mp3"
      }
     }
    ]
   },
   "veg": {
    "speaker": "h",
    "text": "Yes, we have a few vegetarian dishes. The mushroom risotto is amazing.",
    "pt": "Sim, temos alguns pratos vegetarianos. O risoto de cogumelos é incrível.",
    "audio": "talk/dialogues/a-phone-call-booking/b28d389cca46.mp3",
    "next": "end"
   },
   "parking": {
    "speaker": "h",
    "text": "There's a car park behind the building. It's free after six.",
    "pt": "Tem um estacionamento atrás do prédio. É grátis depois das seis.",
    "audio": "talk/dialogues/a-phone-call-booking/bfa59f14b06f.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "h",
    "text": "Lovely. See you then. Bye for now!",
    "pt": "Ótimo. Até lá. Tchau!",
    "audio": "talk/dialogues/a-phone-call-booking/1475f5b38c8a.mp3",
    "end": true
   },
   "change": {
    "speaker": "h",
    "text": "No problem. What's the name on the booking?",
    "pt": "Sem problema. Em nome de quem está a reserva?",
    "audio": "talk/dialogues/a-phone-call-booking/956521d736f6.mp3",
    "options": [
     {
      "text": "It's Silva, for Saturday.",
      "pt": "É Silva, para sábado.",
      "audio": "talk/dialogues/a-phone-call-booking/6a46cb2f43f9.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/7876f346a9ff.mp3",
      "next": "change_found"
     },
     {
      "text": "Silva. S, I, L, V, A.",
      "pt": "Silva. S, I, L, V, A.",
      "audio": "talk/dialogues/a-phone-call-booking/bf3c78388fef.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/0ab2046a7f75.mp3",
      "next": "change_found"
     },
     {
      "text": "The restaurant is called Rosa's.",
      "pt": "O restaurante se chama Rosa's.",
      "audio": "talk/dialogues/a-phone-call-booking/190937bbbd78.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/c3a7a30f7487.mp3",
      "next": null,
      "react": {
       "text": "Ha, yes, I know! But whose name is the booking under?",
       "pt": "Rá, sim, eu sei! Mas a reserva está em nome de quem?",
       "audio": "talk/dialogues/a-phone-call-booking/cc2d939c1e17.mp3"
      }
     }
    ]
   },
   "change_found": {
    "speaker": "h",
    "text": "Got it. Saturday at eight, four people. What would you like to change?",
    "pt": "Achei. Sábado às oito, quatro pessoas. O que você quer mudar?",
    "audio": "talk/dialogues/a-phone-call-booking/24b8ca94a1c6.mp3",
    "options": [
     {
      "text": "Could we come at nine instead?",
      "pt": "Podemos ir às nove?",
      "audio": "talk/dialogues/a-phone-call-booking/0c0d4cdb8577.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/81bfa904311e.mp3",
      "next": "nine"
     },
     {
      "text": "We're actually six now, not four.",
      "pt": "Na verdade agora somos seis, não quatro.",
      "audio": "talk/dialogues/a-phone-call-booking/ddf7069cb7d9.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/e20301da0691.mp3",
      "next": "six"
     },
     {
      "text": "I need to cancel it, I'm afraid.",
      "pt": "Infelizmente, preciso cancelar.",
      "audio": "talk/dialogues/a-phone-call-booking/a4bd43cb5adc.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/9681bc4b8d3b.mp3",
      "next": "cancel"
     },
     {
      "text": "I'd like to change my shirt.",
      "pt": "Eu gostaria de trocar de camisa.",
      "audio": "talk/dialogues/a-phone-call-booking/9e10c8a62dc7.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/eeb4c6d9ff6b.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean the booking. The time, or the number of people?",
       "pt": "Rá! Falo da reserva. O horário ou o número de pessoas?",
       "audio": "talk/dialogues/a-phone-call-booking/fe1733228e28.mp3"
      }
     }
    ]
   },
   "nine": {
    "speaker": "h",
    "text": "Sorry, nine is fully booked. I can do half past eight.",
    "pt": "Desculpe, às nove está lotado. Consigo às oito e meia.",
    "audio": "talk/dialogues/a-phone-call-booking/b68ba53b1c3b.mp3",
    "options": [
     {
      "text": "Half past eight is fine.",
      "pt": "Oito e meia está bom.",
      "audio": "talk/dialogues/a-phone-call-booking/a6ab446f988b.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/1d24d1556b9f.mp3",
      "next": "change_ok"
     },
     {
      "text": "Then let's keep eight o'clock.",
      "pt": "Então vamos manter às oito.",
      "audio": "talk/dialogues/a-phone-call-booking/42611e697a87.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/a5fb913f64e6.mp3",
      "next": "change_ok"
     },
     {
      "text": "Eight and a half people?",
      "pt": "Oito pessoas e meia?",
      "audio": "talk/dialogues/a-phone-call-booking/e173f98f923d.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/7e4eec04dcc4.mp3",
      "next": null,
      "react": {
       "text": "Ha! No, half past eight, the time. Is that okay?",
       "pt": "Rá! Não, oito e meia, o horário. Tudo bem?",
       "audio": "talk/dialogues/a-phone-call-booking/196917a816ee.mp3"
      }
     }
    ]
   },
   "six": {
    "speaker": "h",
    "text": "Six, okay. Let me check. Yes, I can give you a bigger table.",
    "pt": "Seis, certo. Deixa eu ver. Sim, consigo uma mesa maior.",
    "audio": "talk/dialogues/a-phone-call-booking/80e4f206f545.mp3",
    "next": "change_ok"
   },
   "cancel": {
    "speaker": "h",
    "text": "Oh, that's a shame. Would you like to book another day instead?",
    "pt": "Ah, que pena. Quer reservar para outro dia?",
    "audio": "talk/dialogues/a-phone-call-booking/d2e6e1c66abd.mp3",
    "options": [
     {
      "text": "Yes, how about next Saturday?",
      "pt": "Sim, que tal no outro sábado?",
      "audio": "talk/dialogues/a-phone-call-booking/bfd35447c31b.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/7740d7a83e1c.mp3",
      "next": "nextsat"
     },
     {
      "text": "No, thanks. Maybe next time.",
      "pt": "Não, obrigado. Quem sabe numa próxima.",
      "audio": "talk/dialogues/a-phone-call-booking/39a73650c1a6.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/904f7fc21e02.mp3",
      "next": "end_cancel"
     },
     {
      "text": "Yes, another drink, please.",
      "pt": "Sim, mais uma bebida, por favor.",
      "audio": "talk/dialogues/a-phone-call-booking/6c20147ce432.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/9bf531787776.mp3",
      "next": null,
      "react": {
       "text": "Ha, we're on the phone! Do you want to book another day?",
       "pt": "Rá, a gente está no telefone! Quer reservar outro dia?",
       "audio": "talk/dialogues/a-phone-call-booking/caaed070f9d1.mp3"
      }
     }
    ]
   },
   "nextsat": {
    "speaker": "h",
    "text": "Next Saturday at eight is free. I'll move it for you.",
    "pt": "No outro sábado às oito está livre. Vou mudar para você.",
    "audio": "talk/dialogues/a-phone-call-booking/385e2587a015.mp3",
    "next": "change_ok"
   },
   "end_cancel": {
    "speaker": "h",
    "text": "No problem, your booking is cancelled. Hope to see you soon!",
    "pt": "Sem problema, sua reserva está cancelada. Esperamos ver você em breve!",
    "audio": "talk/dialogues/a-phone-call-booking/ec3507343385.mp3",
    "end": true
   },
   "change_ok": {
    "speaker": "h",
    "text": "Done, I've updated your booking. Anything else I can help with?",
    "pt": "Pronto, atualizei sua reserva. Posso ajudar em mais alguma coisa?",
    "audio": "talk/dialogues/a-phone-call-booking/6007696bafdb.mp3",
    "options": [
     {
      "text": "No, that's all. Thank you!",
      "pt": "Não, é só isso. Obrigado!",
      "audio": "talk/dialogues/a-phone-call-booking/dc423a9b1037.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/d2d64e5fd472.mp3",
      "next": "end"
     },
     {
      "text": "Can you send me a confirmation?",
      "pt": "Você pode me mandar uma confirmação?",
      "audio": "talk/dialogues/a-phone-call-booking/0a51603742d9.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/495472e545e0.mp3",
      "next": "text"
     },
     {
      "text": "Yes, can you help me with my homework?",
      "pt": "Sim, você pode me ajudar com a lição de casa?",
      "audio": "talk/dialogues/a-phone-call-booking/6ab9bf4102a6.mp3",
      "audioF": "talk/dialogues/a-phone-call-booking/03922a79bdbd.mp3",
      "next": null,
      "react": {
       "text": "Ha, I'm not a teacher! Anything else about the booking?",
       "pt": "Rá, eu não sou professor! Mais alguma coisa sobre a reserva?",
       "audio": "talk/dialogues/a-phone-call-booking/bed39b45698f.mp3"
      }
     }
    ]
   },
   "text": {
    "speaker": "h",
    "text": "Sure. We'll send you a text message in a few minutes.",
    "pt": "Claro. Vamos mandar uma mensagem de texto em alguns minutos.",
    "audio": "talk/dialogues/a-phone-call-booking/157e1858f872.mp3",
    "next": "end"
   }
  },
  "nudges": {
   "h": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/a-phone-call-booking/5721c30a5077.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/a-phone-call-booking/047af034c6c2.mp3"
    }
   ]
  }
 },
 {
  "slug": "returning-a-faulty-item",
  "title": "Returning Faulty Headphones",
  "level": "B1",
  "description": "Devolva um fone com defeito e negocie uma solução.",
  "intro": "Seus fones de ouvido novos pararam de funcionar depois de uma semana. Você volta à loja SoundZone, onde a atendente Megan está no balcão.",
  "cast": {
   "e": {
    "name": "Megan",
    "role": "Atendente da loja"
   },
   "m": {
    "name": "Oliver",
    "role": "Gerente da loja"
   }
  },
  "start": "r1",
  "decisions": [
   5,
   10
  ],
  "nodes": {
   "r1": {
    "speaker": "e",
    "text": "Hi, welcome to SoundZone. How can I help?",
    "pt": "Oi, boas-vindas à SoundZone. Como posso ajudar?",
    "audio": "talk/dialogues/returning-a-faulty-item/d26a6fb81fd8.mp3",
    "options": [
     {
      "text": "Hi. I bought these headphones last week, and they've stopped working.",
      "pt": "Oi. Comprei estes fones semana passada e eles pararam de funcionar.",
      "audio": "talk/dialogues/returning-a-faulty-item/e5ddf5c0862d.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/f39a719d5ed6.mp3",
      "next": "what"
     },
     {
      "text": "Hello. I'd like to return these headphones, please. They're faulty.",
      "pt": "Olá. Eu gostaria de devolver estes fones, por favor. Estão com defeito.",
      "audio": "talk/dialogues/returning-a-faulty-item/d39a53d251c4.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/b0b3960b4285.mp3",
      "next": "what"
     },
     {
      "text": "Hi. Could you turn the music up, please?",
      "pt": "Oi. Você pode aumentar a música, por favor?",
      "audio": "talk/dialogues/returning-a-faulty-item/4d83799c4c6b.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/27e5250b7d7a.mp3",
      "next": null,
      "react": {
       "text": "Ha, it's loud enough in here! What can I do for you?",
       "pt": "Rá, já está alto o suficiente aqui! O que posso fazer por você?",
       "audio": "talk/dialogues/returning-a-faulty-item/02a9bd20d8dd.mp3"
      }
     }
    ]
   },
   "what": {
    "speaker": "e",
    "text": "Oh no, I'm sorry to hear that. What exactly is the problem?",
    "pt": "Ah, não, sinto muito. Qual é exatamente o problema?",
    "audio": "talk/dialogues/returning-a-faulty-item/f057dbf63aa6.mp3",
    "options": [
     {
      "text": "The left side doesn't make any sound.",
      "pt": "O lado esquerdo não sai som nenhum.",
      "audio": "talk/dialogues/returning-a-faulty-item/35ba46fb5576.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/38a059e0fa9e.mp3",
      "next": "left"
     },
     {
      "text": "They won't charge anymore. The light doesn't come on.",
      "pt": "Não carregam mais. A luz não acende.",
      "audio": "talk/dialogues/returning-a-faulty-item/ec3322b97c74.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/f396bebbbdd6.mp3",
      "next": "charge"
     },
     {
      "text": "The problem is that I love them.",
      "pt": "O problema é que eu amo eles.",
      "audio": "talk/dialogues/returning-a-faulty-item/5de3b4ac76f8.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/6da0f215fb01.mp3",
      "next": null,
      "react": {
       "text": "Aw! But what's wrong with them, exactly?",
       "pt": "Own! Mas o que eles têm, exatamente?",
       "audio": "talk/dialogues/returning-a-faulty-item/7bfef8298e8d.mp3"
      }
     }
    ]
   },
   "left": {
    "speaker": "e",
    "text": "Let me try them. Hmm, you're right. Nothing on the left.",
    "pt": "Deixa eu testar. Hum, você tem razão. Nada no lado esquerdo.",
    "audio": "talk/dialogues/returning-a-faulty-item/42d4b7d19150.mp3",
    "next": "receipt"
   },
   "charge": {
    "speaker": "e",
    "text": "Let me plug them in. Yeah, nothing at all. That's definitely not normal.",
    "pt": "Deixa eu ligar na tomada. É, nada. Isso com certeza não é normal.",
    "audio": "talk/dialogues/returning-a-faulty-item/ba1e718cd41b.mp3",
    "next": "receipt"
   },
   "receipt": {
    "speaker": "e",
    "text": "Do you have the receipt with you?",
    "pt": "Você está com o recibo?",
    "audio": "talk/dialogues/returning-a-faulty-item/fe56db3ee6d6.mp3",
    "options": [
     {
      "text": "Yes, here it is.",
      "pt": "Sim, aqui está.",
      "audio": "talk/dialogues/returning-a-faulty-item/935c9a4ba36e.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/5cc82b7ca7b8.mp3",
      "next": "receipt_ok"
     },
     {
      "text": "I think it's in my email. Can I show you on my phone?",
      "pt": "Acho que está no meu e-mail. Posso te mostrar no celular?",
      "audio": "talk/dialogues/returning-a-faulty-item/9e12a90bc2c9.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/f414e9fcb9ae.mp3",
      "next": "email"
     },
     {
      "text": "Sorry, I've lost it.",
      "pt": "Desculpe, eu perdi.",
      "audio": "talk/dialogues/returning-a-faulty-item/1516e67fad86.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/46595eb39343.mp3",
      "next": "noreceipt"
     },
     {
      "text": "No, I don't have a recipe. I don't cook.",
      "pt": "Não, não tenho receita. Eu não cozinho.",
      "audio": "talk/dialogues/returning-a-faulty-item/585f1016ec63.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/18d318a037ef.mp3",
      "next": null,
      "react": {
       "text": "Ha! Not a recipe, a receipt. Proof that you bought them?",
       "pt": "Rá! Não receita, recibo. Um comprovante de que você comprou?",
       "audio": "talk/dialogues/returning-a-faulty-item/64d0e6be7dfd.mp3"
      }
     }
    ]
   },
   "email": {
    "speaker": "e",
    "text": "Sure, a digital receipt is fine.",
    "pt": "Claro, um recibo digital serve.",
    "audio": "talk/dialogues/returning-a-faulty-item/1ab902dd4710.mp3",
    "next": "receipt_ok"
   },
   "receipt_ok": {
    "speaker": "e",
    "text": "Great, you bought them eight days ago. So you can have a refund, an exchange, or store credit.",
    "pt": "Ótimo, você comprou há oito dias. Então pode escolher reembolso, troca ou crédito na loja.",
    "audio": "talk/dialogues/returning-a-faulty-item/440e22f1ee50.mp3",
    "options": [
     {
      "text": "I'd prefer a refund, please.",
      "pt": "Prefiro o reembolso, por favor.",
      "audio": "talk/dialogues/returning-a-faulty-item/d9ccbf964d0d.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/546121b9402c.mp3",
      "next": "refund"
     },
     {
      "text": "Could I just exchange them for a new pair?",
      "pt": "Posso só trocar por um par novo?",
      "audio": "talk/dialogues/returning-a-faulty-item/0c7ae3c0607f.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/a784f69c0cc6.mp3",
      "next": "exchange"
     },
     {
      "text": "What can I get with store credit?",
      "pt": "O que posso fazer com crédito na loja?",
      "audio": "talk/dialogues/returning-a-faulty-item/98e7e3a6e66a.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/a92ed2cb6839.mp3",
      "next": "credit"
     },
     {
      "text": "Can I have a refund and keep the headphones?",
      "pt": "Posso ter o reembolso e ficar com os fones?",
      "audio": "talk/dialogues/returning-a-faulty-item/480b6a7f0bd9.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/fcd63c99dc53.mp3",
      "next": null,
      "react": {
       "text": "Nice try! It's one or the other. A refund, an exchange, or credit?",
       "pt": "Boa tentativa! É um ou outro. Reembolso, troca ou crédito?",
       "audio": "talk/dialogues/returning-a-faulty-item/bfce025d3799.mp3"
      }
     }
    ]
   },
   "refund": {
    "speaker": "e",
    "text": "Of course. The money goes back on your card. It can take up to five days. Is that okay?",
    "pt": "Claro. O dinheiro volta para o seu cartão. Pode levar até cinco dias. Tudo bem?",
    "audio": "talk/dialogues/returning-a-faulty-item/f58d00f78733.mp3",
    "options": [
     {
      "text": "That's fine, thanks.",
      "pt": "Tudo bem, obrigado.",
      "audio": "talk/dialogues/returning-a-faulty-item/a657d3b4d27d.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/e48920484230.mp3",
      "next": "end_good"
     },
     {
      "text": "Actually, I paid in cash.",
      "pt": "Na verdade, paguei em dinheiro.",
      "audio": "talk/dialogues/returning-a-faulty-item/7b0a566b1388.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/895b4cf772ed.mp3",
      "next": "cash"
     },
     {
      "text": "I'm free on Tuesday.",
      "pt": "Estou livre na terça.",
      "audio": "talk/dialogues/returning-a-faulty-item/adb4f69196b9.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/ef3a16000a7b.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean, is it okay to wait up to five days for the money?",
       "pt": "Rá! Quero dizer, tudo bem esperar até cinco dias pelo dinheiro?",
       "audio": "talk/dialogues/returning-a-faulty-item/7494f59968d4.mp3"
      }
     }
    ]
   },
   "cash": {
    "speaker": "e",
    "text": "Oh, then I can give you the cash right now.",
    "pt": "Ah, então posso te dar o dinheiro agora mesmo.",
    "audio": "talk/dialogues/returning-a-faulty-item/66a957644674.mp3",
    "next": "end_good"
   },
   "exchange": {
    "speaker": "e",
    "text": "Let me check. Sorry, we're out of that model. The newer one is twenty pounds more.",
    "pt": "Deixa eu ver. Desculpe, esse modelo acabou. O mais novo custa vinte libras a mais.",
    "audio": "talk/dialogues/returning-a-faulty-item/1715dc3d59b9.mp3",
    "options": [
     {
      "text": "Could I have the new one for the same price?",
      "pt": "Eu poderia levar o novo pelo mesmo preço?",
      "audio": "talk/dialogues/returning-a-faulty-item/5b8987cea70b.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/f3e1dbe8d817.mp3",
      "next": "manager_ask"
     },
     {
      "text": "That's okay, I'll pay the difference.",
      "pt": "Tudo bem, eu pago a diferença.",
      "audio": "talk/dialogues/returning-a-faulty-item/e2d3c6612d75.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/6d260c98e5f8.mp3",
      "next": "pay_diff"
     },
     {
      "text": "Then I'll just take a refund.",
      "pt": "Então vou ficar com o reembolso.",
      "audio": "talk/dialogues/returning-a-faulty-item/1e7ccdf8febf.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/7504b7390909.mp3",
      "next": "refund"
     },
     {
      "text": "Twenty pounds? That's too heavy to carry!",
      "pt": "Vinte libras? É pesado demais para carregar!",
      "audio": "talk/dialogues/returning-a-faulty-item/0d2954e21f25.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/7b4d0fcc1056.mp3",
      "next": null,
      "react": {
       "text": "Ha! Pounds in money, not weight. Would you like the newer model?",
       "pt": "Rá! Libras em dinheiro, não em peso. Você quer o modelo mais novo?",
       "audio": "talk/dialogues/returning-a-faulty-item/e07fbc1fdc1c.mp3"
      }
     }
    ]
   },
   "pay_diff": {
    "speaker": "e",
    "text": "Great choice. The sound is much better on these.",
    "pt": "Ótima escolha. O som destes é muito melhor.",
    "audio": "talk/dialogues/returning-a-faulty-item/6d207f77c559.mp3",
    "next": "end_good"
   },
   "manager_ask": {
    "speaker": "e",
    "text": "I'm afraid I can't change prices myself. Let me call my manager.",
    "pt": "Infelizmente eu não posso mudar preços. Vou chamar meu gerente.",
    "audio": "talk/dialogues/returning-a-faulty-item/2a9df062bf16.mp3",
    "next": "mgr1"
   },
   "credit": {
    "speaker": "e",
    "text": "You can spend it on anything here, and it never expires. Would you like that?",
    "pt": "Você pode usar em qualquer coisa aqui, e nunca vence. Você quer?",
    "audio": "talk/dialogues/returning-a-faulty-item/2f42552a8a6b.mp3",
    "options": [
     {
      "text": "Yes, that works for me.",
      "pt": "Sim, para mim funciona.",
      "audio": "talk/dialogues/returning-a-faulty-item/9d42e5a888cd.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/9c607631642f.mp3",
      "next": "end_good"
     },
     {
      "text": "Hmm, I'd rather have my money back.",
      "pt": "Hum, prefiro meu dinheiro de volta.",
      "audio": "talk/dialogues/returning-a-faulty-item/941e30f4a33c.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/8c79fc3f0355.mp3",
      "next": "refund"
     },
     {
      "text": "Can I spend it on pizza?",
      "pt": "Posso gastar com pizza?",
      "audio": "talk/dialogues/returning-a-faulty-item/5d2f19487edb.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/39e36ceb83d5.mp3",
      "next": null,
      "react": {
       "text": "Ha, only if we start selling pizza! So, store credit or not?",
       "pt": "Rá, só se a gente começar a vender pizza! Então, crédito na loja ou não?",
       "audio": "talk/dialogues/returning-a-faulty-item/c182d46c4f6f.mp3"
      }
     }
    ]
   },
   "noreceipt": {
    "speaker": "e",
    "text": "Hmm. Without a receipt, I can only offer store credit, I'm afraid.",
    "pt": "Hum. Sem recibo, infelizmente só posso oferecer crédito na loja.",
    "audio": "talk/dialogues/returning-a-faulty-item/a9d9b2e275a5.mp3",
    "options": [
     {
      "text": "I paid by card. Can't you find it on your system?",
      "pt": "Paguei com cartão. Você não consegue achar no sistema?",
      "audio": "talk/dialogues/returning-a-faulty-item/dd9352358364.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/b3de0e19219d.mp3",
      "next": "system"
     },
     {
      "text": "That doesn't seem fair. Could I speak to the manager?",
      "pt": "Isso não me parece justo. Posso falar com o gerente?",
      "audio": "talk/dialogues/returning-a-faulty-item/bee77079265e.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/316a2c76628d.mp3",
      "next": "mgr1"
     },
     {
      "text": "Okay, store credit is fine.",
      "pt": "Tudo bem, crédito na loja serve.",
      "audio": "talk/dialogues/returning-a-faulty-item/dbb9cbd69bc1.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/1de5fbfed9c8.mp3",
      "next": "end_good"
     },
     {
      "text": "That's okay, I'm not afraid.",
      "pt": "Tudo bem, eu não tenho medo.",
      "audio": "talk/dialogues/returning-a-faulty-item/0df225d61fee.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/b8f03dba9ade.mp3",
      "next": null,
      "react": {
       "text": "Ha, good! But is store credit okay for you?",
       "pt": "Rá, que bom! Mas crédito na loja está bom para você?",
       "audio": "talk/dialogues/returning-a-faulty-item/84661c647617.mp3"
      }
     }
    ]
   },
   "system": {
    "speaker": "e",
    "text": "Let me try. Do you remember which day you bought them?",
    "pt": "Vou tentar. Você lembra em que dia comprou?",
    "audio": "talk/dialogues/returning-a-faulty-item/bcbc2ec4ddb3.mp3",
    "options": [
     {
      "text": "Last Saturday, in the afternoon.",
      "pt": "Sábado passado, à tarde.",
      "audio": "talk/dialogues/returning-a-faulty-item/e2fec544334a.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/a96b2f614f49.mp3",
      "next": "found"
     },
     {
      "text": "I think it was Friday, around lunchtime.",
      "pt": "Acho que foi na sexta, por volta da hora do almoço.",
      "audio": "talk/dialogues/returning-a-faulty-item/4b2e7baf14bd.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/23650b8002f9.mp3",
      "next": "found"
     },
     {
      "text": "Yes, I remember the song that was playing.",
      "pt": "Sim, lembro da música que estava tocando.",
      "audio": "talk/dialogues/returning-a-faulty-item/740932f291fa.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/65d5f3225f3d.mp3",
      "next": null,
      "react": {
       "text": "Ha, nice! But what day did you buy them?",
       "pt": "Rá, legal! Mas em que dia você comprou?",
       "audio": "talk/dialogues/returning-a-faulty-item/a4983c7077f8.mp3"
      }
     }
    ]
   },
   "found": {
    "speaker": "e",
    "text": "Found it! Okay, so you can choose a refund or an exchange.",
    "pt": "Achei! Certo, então você pode escolher reembolso ou troca.",
    "audio": "talk/dialogues/returning-a-faulty-item/379034da4cec.mp3",
    "options": [
     {
      "text": "A refund, please.",
      "pt": "Reembolso, por favor.",
      "audio": "talk/dialogues/returning-a-faulty-item/32486b18aff0.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/213f36f1ee7a.mp3",
      "next": "refund"
     },
     {
      "text": "An exchange, please.",
      "pt": "Troca, por favor.",
      "audio": "talk/dialogues/returning-a-faulty-item/81e4609d1bc3.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/675c409f2567.mp3",
      "next": "exchange"
     },
     {
      "text": "I'll choose the blue ones.",
      "pt": "Vou escolher os azuis.",
      "audio": "talk/dialogues/returning-a-faulty-item/db55b26bd104.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/9d75f36019c4.mp3",
      "next": null,
      "react": {
       "text": "Ha! First things first. A refund, or an exchange?",
       "pt": "Rá! Uma coisa de cada vez. Reembolso ou troca?",
       "audio": "talk/dialogues/returning-a-faulty-item/37e8b15d5410.mp3"
      }
     }
    ]
   },
   "mgr1": {
    "speaker": "m",
    "text": "Hello, I'm Oliver, the manager. What seems to be the problem?",
    "pt": "Olá, sou o Oliver, o gerente. Qual parece ser o problema?",
    "audio": "talk/dialogues/returning-a-faulty-item/603a935483e6.mp3",
    "options": [
     {
      "text": "These stopped working after a week, and I'd like a fair solution.",
      "pt": "Estes pararam de funcionar depois de uma semana, e eu gostaria de uma solução justa.",
      "audio": "talk/dialogues/returning-a-faulty-item/d7464d7f3404.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/768136fe92e0.mp3",
      "next": "mgr2"
     },
     {
      "text": "I'd just like working headphones, without paying extra.",
      "pt": "Eu só queria fones que funcionem, sem pagar a mais.",
      "audio": "talk/dialogues/returning-a-faulty-item/7e5b74c8f280.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/be4222a9d07d.mp3",
      "next": "mgr2"
     },
     {
      "text": "The problem is my neighbour's dog.",
      "pt": "O problema é o cachorro do meu vizinho.",
      "audio": "talk/dialogues/returning-a-faulty-item/eb71f882d165.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/f660b40cdce4.mp3",
      "next": null,
      "react": {
       "text": "Oh dear. But what's the problem with the headphones?",
       "pt": "Puxa. Mas qual é o problema com os fones?",
       "audio": "talk/dialogues/returning-a-faulty-item/7a6ff5625d3d.mp3"
      }
     }
    ]
   },
   "mgr2": {
    "speaker": "m",
    "text": "I understand. A week is far too soon for them to break.",
    "pt": "Entendo. Uma semana é cedo demais para quebrarem.",
    "audio": "talk/dialogues/returning-a-faulty-item/bf656ca7eb63.mp3",
    "next": "mgr3"
   },
   "mgr3": {
    "speaker": "m",
    "text": "Here's what I can do. The newer model at the same price. How does that sound?",
    "pt": "Olha o que posso fazer. O modelo mais novo pelo mesmo preço. O que acha?",
    "audio": "talk/dialogues/returning-a-faulty-item/c475b26d3888.mp3",
    "options": [
     {
      "text": "That sounds great. Thank you.",
      "pt": "Parece ótimo. Obrigado.",
      "audio": "talk/dialogues/returning-a-faulty-item/df8c2f4b798c.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/af9cf632e1d2.mp3",
      "next": "mgr_end"
     },
     {
      "text": "That's kind, but could I have a refund instead?",
      "pt": "É gentil, mas eu poderia ter o reembolso?",
      "audio": "talk/dialogues/returning-a-faulty-item/beb461993adf.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/3c7804a0b3e9.mp3",
      "next": "mgr_refund"
     },
     {
      "text": "It sounds like jazz.",
      "pt": "Parece jazz.",
      "audio": "talk/dialogues/returning-a-faulty-item/603f17fdab5e.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/3fe05a2bbeaa.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean, are you happy with that offer?",
       "pt": "Rá! Quero dizer, essa oferta te agrada?",
       "audio": "talk/dialogues/returning-a-faulty-item/8496c9a3ad19.mp3"
      }
     }
    ]
   },
   "mgr_refund": {
    "speaker": "m",
    "text": "Of course. Just this once, Megan will give you a full refund.",
    "pt": "Claro. Só desta vez, a Megan vai te dar o reembolso total.",
    "audio": "talk/dialogues/returning-a-faulty-item/49b8b8814252.mp3",
    "next": "end_good"
   },
   "mgr_end": {
    "speaker": "m",
    "text": "My pleasure. And sorry again for the trouble.",
    "pt": "O prazer é meu. E desculpe de novo pelo transtorno.",
    "audio": "talk/dialogues/returning-a-faulty-item/424688e1eefc.mp3",
    "next": "end_good"
   },
   "end_good": {
    "speaker": "e",
    "text": "All done. Is there anything else I can help you with?",
    "pt": "Tudo certo. Posso ajudar em mais alguma coisa?",
    "audio": "talk/dialogues/returning-a-faulty-item/c1cde78f2f6f.mp3",
    "options": [
     {
      "text": "No, that's all. Thanks for your help.",
      "pt": "Não, é só isso. Obrigado pela ajuda.",
      "audio": "talk/dialogues/returning-a-faulty-item/1d8a11668b58.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/8b1e56b5cea8.mp3",
      "next": "bye"
     },
     {
      "text": "Actually, do you sell cases for these?",
      "pt": "Aliás, vocês vendem estojo para estes?",
      "audio": "talk/dialogues/returning-a-faulty-item/9df98948fe88.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/99237786ae0a.mp3",
      "next": "case"
     },
     {
      "text": "Yes, can you fix my car too?",
      "pt": "Sim, você conserta meu carro também?",
      "audio": "talk/dialogues/returning-a-faulty-item/966ee7d9ba3f.mp3",
      "audioF": "talk/dialogues/returning-a-faulty-item/ed97a923d7a7.mp3",
      "next": null,
      "react": {
       "text": "Ha, we only do headphones! Anything else today?",
       "pt": "Rá, a gente só mexe com fones! Mais alguma coisa hoje?",
       "audio": "talk/dialogues/returning-a-faulty-item/ef6cf86f32a0.mp3"
      }
     }
    ]
   },
   "case": {
    "speaker": "e",
    "text": "Yes, right by the till. They're ten percent off this week.",
    "pt": "Sim, bem ao lado do caixa. Estão com dez por cento de desconto esta semana.",
    "audio": "talk/dialogues/returning-a-faulty-item/c982b6fdfb02.mp3",
    "next": "bye"
   },
   "bye": {
    "speaker": "e",
    "text": "Have a great day, and enjoy your music!",
    "pt": "Tenha um ótimo dia e aproveite sua música!",
    "audio": "talk/dialogues/returning-a-faulty-item/12942f1b0b85.mp3",
    "end": true
   }
  },
  "nudges": {
   "e": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/returning-a-faulty-item/9d7ca313afce.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/returning-a-faulty-item/7ea7d9d86c7b.mp3"
    }
   ],
   "m": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/returning-a-faulty-item/6785e2cb69b1.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/returning-a-faulty-item/dd92f36bd6c2.mp3"
    }
   ]
  }
 },
 {
  "slug": "renting-a-flat",
  "title": "Renting a Flat",
  "level": "B2",
  "description": "Visite um apartamento e negocie o aluguel.",
  "intro": "Você está procurando apartamento em Londres e marcou uma visita. O corretor James abre a porta, e a inquilina atual, Chloe, ainda está em casa.",
  "cast": {
   "a": {
    "name": "James",
    "role": "Corretor de imóveis"
   },
   "t": {
    "name": "Chloe",
    "role": "Inquilina atual"
   }
  },
  "start": "f1",
  "decisions": [
   8,
   10
  ],
  "nodes": {
   "f1": {
    "speaker": "a",
    "text": "You must be here for the viewing. I'm James, from Harbour Lettings. Come on in.",
    "pt": "Você deve ter vindo para a visita. Sou o James, da Harbour Lettings. Pode entrar.",
    "audio": "talk/dialogues/renting-a-flat/57da2e9ff713.mp3",
    "next": "f2"
   },
   "f2": {
    "speaker": "a",
    "text": "So, this is the living room. Loads of natural light, as you can see. What do you think so far?",
    "pt": "Então, esta é a sala. Bastante luz natural, como você pode ver. O que está achando até agora?",
    "audio": "talk/dialogues/renting-a-flat/514d196337c1.mp3",
    "options": [
     {
      "text": "It's lovely and bright. Is it furnished?",
      "pt": "É linda e bem clara. É mobiliado?",
      "audio": "talk/dialogues/renting-a-flat/33cc513df9a3.mp3",
      "audioF": "talk/dialogues/renting-a-flat/c33728d0c681.mp3",
      "next": "furnished"
     },
     {
      "text": "It's nice, but it's smaller than it looked in the photos.",
      "pt": "É legal, mas é menor do que parecia nas fotos.",
      "audio": "talk/dialogues/renting-a-flat/bd29e7c7b379.mp3",
      "audioF": "talk/dialogues/renting-a-flat/1de84d8ce2ec.mp3",
      "next": "photos"
     },
     {
      "text": "I think it's about half past two.",
      "pt": "Acho que são umas duas e meia.",
      "audio": "talk/dialogues/renting-a-flat/da2b16228012.mp3",
      "audioF": "talk/dialogues/renting-a-flat/f8af36790749.mp3",
      "next": null,
      "react": {
       "text": "Ha, it is! But what do you think of the flat?",
       "pt": "Rá, são mesmo! Mas o que você acha do apartamento?",
       "audio": "talk/dialogues/renting-a-flat/b2ece9074db2.mp3"
      }
     }
    ]
   },
   "furnished": {
    "speaker": "a",
    "text": "Fully furnished, yes, but the landlord can remove anything you don't need.",
    "pt": "Totalmente mobiliado, sim, mas o proprietário pode tirar o que você não precisar.",
    "audio": "talk/dialogues/renting-a-flat/b797385be049.mp3",
    "next": "rent"
   },
   "photos": {
    "speaker": "a",
    "text": "Ah, the wide-angle lens strikes again. But the bedroom's a good size, honestly.",
    "pt": "Ah, a lente grande-angular ataca de novo. Mas o quarto é de bom tamanho, sério.",
    "audio": "talk/dialogues/renting-a-flat/0dff771d0eea.mp3",
    "next": "rent"
   },
   "rent": {
    "speaker": "a",
    "text": "The rent is twelve hundred a month. Did you have a budget in mind?",
    "pt": "O aluguel é mil e duzentos por mês. Você tinha um orçamento em mente?",
    "audio": "talk/dialogues/renting-a-flat/6c0f2f2c90fe.mp3",
    "options": [
     {
      "text": "That's within my budget, but what does it include?",
      "pt": "Está dentro do meu orçamento, mas o que está incluído?",
      "audio": "talk/dialogues/renting-a-flat/d50985f92609.mp3",
      "audioF": "talk/dialogues/renting-a-flat/10c572dcd2e7.mp3",
      "next": "bills"
     },
     {
      "text": "To be honest, that's a bit over my budget.",
      "pt": "Sinceramente, está um pouco acima do meu orçamento.",
      "audio": "talk/dialogues/renting-a-flat/9ab74a2623f8.mp3",
      "audioF": "talk/dialogues/renting-a-flat/a12d8fa45c91.mp3",
      "next": "over"
     },
     {
      "text": "Yes, I have a budgie. He's called Kiwi.",
      "pt": "Sim, tenho um periquito. O nome dele é Kiwi.",
      "audio": "talk/dialogues/renting-a-flat/d315d9973be9.mp3",
      "audioF": "talk/dialogues/renting-a-flat/c4155e9bd7ce.mp3",
      "next": null,
      "react": {
       "text": "Ha! Lovely, but I meant budget. How much can you afford each month?",
       "pt": "Rá! Que fofo, mas eu disse orçamento. Quanto você pode pagar por mês?",
       "audio": "talk/dialogues/renting-a-flat/498f30165171.mp3"
      }
     }
    ]
   },
   "over": {
    "speaker": "a",
    "text": "I see. The landlord might be flexible for the right tenant. What were you hoping to pay?",
    "pt": "Entendi. O proprietário pode ser flexível com o inquilino certo. Quanto você esperava pagar?",
    "audio": "talk/dialogues/renting-a-flat/cadb40ef9a0a.mp3",
    "options": [
     {
      "text": "Would the landlord accept eleven hundred for a longer contract?",
      "pt": "O proprietário aceitaria mil e cem por um contrato mais longo?",
      "audio": "talk/dialogues/renting-a-flat/ec7773af4638.mp3",
      "audioF": "talk/dialogues/renting-a-flat/bc252d8c000d.mp3",
      "next": "offer"
     },
     {
      "text": "I could go up to eleven fifty, but that's my limit.",
      "pt": "Eu chegaria a mil cento e cinquenta, mas esse é meu limite.",
      "audio": "talk/dialogues/renting-a-flat/722f3049a82c.mp3",
      "audioF": "talk/dialogues/renting-a-flat/f3fca2c03473.mp3",
      "next": "offer"
     },
     {
      "text": "I was hoping to pay with a smile.",
      "pt": "Eu esperava pagar com um sorriso.",
      "audio": "talk/dialogues/renting-a-flat/bc8d27767c32.mp3",
      "audioF": "talk/dialogues/renting-a-flat/674b130be7c9.mp3",
      "next": null,
      "react": {
       "text": "If only! But seriously, what figure did you have in mind?",
       "pt": "Quem dera! Mas falando sério, que valor você tinha em mente?",
       "audio": "talk/dialogues/renting-a-flat/56022d36c4ff.mp3"
      }
     }
    ]
   },
   "offer": {
    "speaker": "a",
    "text": "I can't promise anything, but I'll put that to the landlord today.",
    "pt": "Não posso prometer nada, mas vou levar isso ao proprietário hoje.",
    "audio": "talk/dialogues/renting-a-flat/65e5d0ede595.mp3",
    "next": "bills"
   },
   "bills": {
    "speaker": "a",
    "text": "Water's included, but electricity, gas and internet are on top. Any questions about that?",
    "pt": "A água está incluída, mas luz, gás e internet são à parte. Alguma pergunta sobre isso?",
    "audio": "talk/dialogues/renting-a-flat/44f594c93b0e.mp3",
    "options": [
     {
      "text": "Roughly how much are the bills each month?",
      "pt": "Mais ou menos quanto dão as contas por mês?",
      "audio": "talk/dialogues/renting-a-flat/8d68bed3d383.mp3",
      "audioF": "talk/dialogues/renting-a-flat/af6468e8b217.mp3",
      "next": "ask_tenant"
     },
     {
      "text": "Is the heating gas or electric? Older flats can be expensive to heat.",
      "pt": "O aquecimento é a gás ou elétrico? Apartamentos antigos podem sair caros para aquecer.",
      "audio": "talk/dialogues/renting-a-flat/cb66fb5f1e0c.mp3",
      "audioF": "talk/dialogues/renting-a-flat/ca6f161a9709.mp3",
      "next": "heating"
     },
     {
      "text": "On top of the wardrobe?",
      "pt": "Em cima do guarda-roupa?",
      "audio": "talk/dialogues/renting-a-flat/d7540a91992c.mp3",
      "audioF": "talk/dialogues/renting-a-flat/6556013ebf12.mp3",
      "next": null,
      "react": {
       "text": "Ha! No, I mean you pay them separately. Any questions about the bills?",
       "pt": "Rá! Não, quero dizer que você paga à parte. Alguma pergunta sobre as contas?",
       "audio": "talk/dialogues/renting-a-flat/3af1554211f1.mp3"
      }
     }
    ]
   },
   "ask_tenant": {
    "speaker": "a",
    "text": "Good question. Actually, Chloe, the current tenant, would know better than me.",
    "pt": "Boa pergunta. Na verdade, a Chloe, a inquilina atual, sabe melhor do que eu.",
    "audio": "talk/dialogues/renting-a-flat/93bea3fac72e.mp3",
    "next": "chloe1"
   },
   "chloe1": {
    "speaker": "t",
    "text": "Hi! In winter it's about a hundred and fifty a month. Much less in summer.",
    "pt": "Oi! No inverno dá uns cento e cinquenta por mês. Bem menos no verão.",
    "audio": "talk/dialogues/renting-a-flat/da710ecea672.mp3",
    "next": "deposit"
   },
   "heating": {
    "speaker": "a",
    "text": "It's gas central heating, and the windows were replaced last year, so it stays warm.",
    "pt": "É aquecimento central a gás, e as janelas foram trocadas ano passado, então fica quentinho.",
    "audio": "talk/dialogues/renting-a-flat/76823f53081d.mp3",
    "next": "deposit"
   },
   "deposit": {
    "speaker": "a",
    "text": "There's also a deposit of five weeks' rent, protected in a government scheme.",
    "pt": "Também tem um depósito de cinco semanas de aluguel, protegido num programa do governo.",
    "audio": "talk/dialogues/renting-a-flat/aca5dd8a7434.mp3",
    "options": [
     {
      "text": "When would I get the deposit back?",
      "pt": "Quando eu receberia o depósito de volta?",
      "audio": "talk/dialogues/renting-a-flat/8080c9d3b95c.mp3",
      "audioF": "talk/dialogues/renting-a-flat/5c6495650def.mp3",
      "next": "deposit_back"
     },
     {
      "text": "Is there any way to pay it in instalments?",
      "pt": "Tem como pagar parcelado?",
      "audio": "talk/dialogues/renting-a-flat/445e4acf815b.mp3",
      "audioF": "talk/dialogues/renting-a-flat/8b6794d0b7af.mp3",
      "next": "instal"
     },
     {
      "text": "Five weeks? I'll be on holiday then.",
      "pt": "Cinco semanas? Vou estar de férias nessa época.",
      "audio": "talk/dialogues/renting-a-flat/160c7eb74159.mp3",
      "audioF": "talk/dialogues/renting-a-flat/e9095e8f8330.mp3",
      "next": null,
      "react": {
       "text": "Ha! No, five weeks' rent, paid as a deposit. Is that okay?",
       "pt": "Rá! Não, o valor de cinco semanas de aluguel, pago como depósito. Tudo bem?",
       "audio": "talk/dialogues/renting-a-flat/2567bacae199.mp3"
      }
     }
    ]
   },
   "deposit_back": {
    "speaker": "a",
    "text": "At the end of the tenancy, minus any damage beyond normal wear and tear.",
    "pt": "No fim do contrato, descontando qualquer dano além do desgaste normal.",
    "audio": "talk/dialogues/renting-a-flat/5955a2810511.mp3",
    "next": "contract"
   },
   "instal": {
    "speaker": "a",
    "text": "Not usually, but I can ask. Some landlords accept two payments.",
    "pt": "Normalmente não, mas posso perguntar. Alguns proprietários aceitam em duas vezes.",
    "audio": "talk/dialogues/renting-a-flat/036a068f055a.mp3",
    "next": "contract"
   },
   "contract": {
    "speaker": "a",
    "text": "The minimum contract is twelve months. Does that suit you?",
    "pt": "O contrato mínimo é de doze meses. Isso te serve?",
    "audio": "talk/dialogues/renting-a-flat/da2b9fb717f5.mp3",
    "options": [
     {
      "text": "Twelve months is fine. Is there a break clause?",
      "pt": "Doze meses está bom. Tem cláusula de rescisão?",
      "audio": "talk/dialogues/renting-a-flat/1644d23b1e74.mp3",
      "audioF": "talk/dialogues/renting-a-flat/f88e7a792579.mp3",
      "next": "break"
     },
     {
      "text": "I was hoping for six months, actually. My job might move me.",
      "pt": "Na verdade, eu esperava seis meses. Meu trabalho pode me transferir.",
      "audio": "talk/dialogues/renting-a-flat/bbb58b78b258.mp3",
      "audioF": "talk/dialogues/renting-a-flat/abbbb9356884.mp3",
      "next": "six"
     },
     {
      "text": "Yes, my suit is in the car.",
      "pt": "Sim, meu terno está no carro.",
      "audio": "talk/dialogues/renting-a-flat/f1e3690e14ca.mp3",
      "audioF": "talk/dialogues/renting-a-flat/a4e3b493fced.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean, does a one-year contract work for you?",
       "pt": "Rá! Quero dizer, um contrato de um ano funciona para você?",
       "audio": "talk/dialogues/renting-a-flat/98574278a336.mp3"
      }
     }
    ]
   },
   "break": {
    "speaker": "a",
    "text": "Yes. Either side can end it after six months, with two months' notice.",
    "pt": "Sim. Qualquer uma das partes pode encerrar depois de seis meses, com dois meses de aviso.",
    "audio": "talk/dialogues/renting-a-flat/dd8f1af55e86.mp3",
    "next": "nb"
   },
   "six": {
    "speaker": "a",
    "text": "Six is tricky. But a year with a break clause after six months might work.",
    "pt": "Seis é complicado. Mas um ano com cláusula de rescisão após seis meses pode funcionar.",
    "audio": "talk/dialogues/renting-a-flat/37e15983e449.mp3",
    "next": "nb"
   },
   "nb": {
    "speaker": "a",
    "text": "Anything else you'd like to know before we look at the bedroom?",
    "pt": "Mais alguma coisa que você queira saber antes de vermos o quarto?",
    "audio": "talk/dialogues/renting-a-flat/52e83f0966c5.mp3",
    "options": [
     {
      "text": "What are the neighbours like?",
      "pt": "Como são os vizinhos?",
      "audio": "talk/dialogues/renting-a-flat/e7bba925777b.mp3",
      "audioF": "talk/dialogues/renting-a-flat/1f4952a4107a.mp3",
      "next": "chloe_nb"
     },
     {
      "text": "Is the area safe at night?",
      "pt": "O bairro é seguro à noite?",
      "audio": "talk/dialogues/renting-a-flat/2e1702bb7f7e.mp3",
      "audioF": "talk/dialogues/renting-a-flat/be6b8d1c46ae.mp3",
      "next": "area"
     },
     {
      "text": "Can I put up pictures or paint the walls?",
      "pt": "Posso pendurar quadros ou pintar as paredes?",
      "audio": "talk/dialogues/renting-a-flat/3866ba1ab997.mp3",
      "audioF": "talk/dialogues/renting-a-flat/6a5ed529e200.mp3",
      "next": "walls"
     },
     {
      "text": "Is breakfast included, or is it extra per night?",
      "pt": "O café da manhã está incluído ou é à parte por noite?",
      "audio": "talk/dialogues/renting-a-flat/4864abfb1f2e.mp3",
      "audioF": "talk/dialogues/renting-a-flat/e0c967442f2d.mp3",
      "next": null,
      "react": {
       "text": "Ha, it's not a hotel! Any other questions about the flat?",
       "pt": "Rá, não é um hotel! Mais alguma pergunta sobre o apartamento?",
       "audio": "talk/dialogues/renting-a-flat/f8e4ed00e32e.mp3"
      }
     }
    ]
   },
   "chloe_nb": {
    "speaker": "t",
    "text": "Honestly? Lovely, apart from the man upstairs who practises the drums on Sundays.",
    "pt": "Sinceramente? Ótimos, tirando o homem lá de cima que treina bateria aos domingos.",
    "audio": "talk/dialogues/renting-a-flat/0beeed45bb24.mp3",
    "next": "chloe_q"
   },
   "chloe_q": {
    "speaker": "t",
    "text": "Do you play any instruments yourself?",
    "pt": "E você, toca algum instrumento?",
    "audio": "talk/dialogues/renting-a-flat/dc093bd40dab.mp3",
    "options": [
     {
      "text": "No, but I work from home, so noise really matters to me.",
      "pt": "Não, mas trabalho de casa, então barulho importa muito para mim.",
      "audio": "talk/dialogues/renting-a-flat/162d2650a91f.mp3",
      "audioF": "talk/dialogues/renting-a-flat/67c84fc9ac4a.mp3",
      "next": "drums"
     },
     {
      "text": "Only the guitar, and very quietly, I promise.",
      "pt": "Só violão, e bem baixinho, prometo.",
      "audio": "talk/dialogues/renting-a-flat/a4171066f7d4.mp3",
      "audioF": "talk/dialogues/renting-a-flat/6b3fb48ec6af.mp3",
      "next": "drums"
     },
     {
      "text": "Yes, I'm brilliant at the dishwasher.",
      "pt": "Sim, mando muito bem na lava-louças.",
      "audio": "talk/dialogues/renting-a-flat/9dd12efd1c35.mp3",
      "audioF": "talk/dialogues/renting-a-flat/1cca51bfdc31.mp3",
      "next": null,
      "react": {
       "text": "Ha! I meant music. Do you play anything?",
       "pt": "Rá! Eu quis dizer música. Você toca alguma coisa?",
       "audio": "talk/dialogues/renting-a-flat/79bc80206f80.mp3"
      }
     }
    ]
   },
   "drums": {
    "speaker": "t",
    "text": "Don't worry, he only plays for a couple of hours. The rest of the week it's dead quiet.",
    "pt": "Não se preocupe, ele só toca umas duas horas. No resto da semana é um silêncio total.",
    "audio": "talk/dialogues/renting-a-flat/eb7723bb6b2d.mp3",
    "next": "negotiate"
   },
   "area": {
    "speaker": "a",
    "text": "Very safe. There's a police station round the corner, and the high street is busy until late.",
    "pt": "Muito seguro. Tem uma delegacia na esquina, e a rua principal fica movimentada até tarde.",
    "audio": "talk/dialogues/renting-a-flat/7d85e37581b4.mp3",
    "next": "negotiate"
   },
   "walls": {
    "speaker": "a",
    "text": "Pictures, yes, with small nails. Painting needs the landlord's written permission.",
    "pt": "Quadros, sim, com pregos pequenos. Para pintar, precisa de autorização por escrito do proprietário.",
    "audio": "talk/dialogues/renting-a-flat/0d42cfde1915.mp3",
    "next": "negotiate"
   },
   "negotiate": {
    "speaker": "a",
    "text": "So, the flat's had a lot of interest. Would you like to make an offer today?",
    "pt": "Então, o apartamento teve muita procura. Você gostaria de fazer uma proposta hoje?",
    "audio": "talk/dialogues/renting-a-flat/19148dac06a4.mp3",
    "options": [
     {
      "text": "Yes. I'd like to go ahead, subject to contract.",
      "pt": "Sim. Quero seguir em frente, dependendo do contrato.",
      "audio": "talk/dialogues/renting-a-flat/b451ff218b0c.mp3",
      "audioF": "talk/dialogues/renting-a-flat/17c9142c9d70.mp3",
      "next": "yes"
     },
     {
      "text": "Could I have until tomorrow to think it over?",
      "pt": "Posso ter até amanhã para pensar?",
      "audio": "talk/dialogues/renting-a-flat/fe46f0485b04.mp3",
      "audioF": "talk/dialogues/renting-a-flat/cb1eac467f96.mp3",
      "next": "think"
     },
     {
      "text": "I'll offer the asking price if the landlord repaints the bedroom.",
      "pt": "Ofereço o valor pedido se o proprietário pintar o quarto de novo.",
      "audio": "talk/dialogues/renting-a-flat/6c2997853dab.mp3",
      "audioF": "talk/dialogues/renting-a-flat/157e14fce458.mp3",
      "next": "repaint"
     },
     {
      "text": "I'd like to make an omelette, actually.",
      "pt": "Na verdade, eu gostaria de fazer uma omelete.",
      "audio": "talk/dialogues/renting-a-flat/e40c9ac5ad2a.mp3",
      "audioF": "talk/dialogues/renting-a-flat/29c09a67abaa.mp3",
      "next": null,
      "react": {
       "text": "Ha! Not until you move in! Would you like to make an offer?",
       "pt": "Rá! Só depois da mudança! Você gostaria de fazer uma proposta?",
       "audio": "talk/dialogues/renting-a-flat/8f37c6384d71.mp3"
      }
     }
    ]
   },
   "repaint": {
    "speaker": "a",
    "text": "That's a fair request. I'll pass it on, and I'm fairly confident they'll agree.",
    "pt": "É um pedido justo. Vou repassar, e tenho quase certeza de que vão aceitar.",
    "audio": "talk/dialogues/renting-a-flat/f0b5288a9f3d.mp3",
    "next": "yes"
   },
   "yes": {
    "speaker": "a",
    "text": "Brilliant. I'll need some ID and a reference from your employer.",
    "pt": "Excelente. Vou precisar de um documento e de uma carta de referência do seu empregador.",
    "audio": "talk/dialogues/renting-a-flat/614c52a3cfd3.mp3",
    "options": [
     {
      "text": "No problem. I can email those tonight.",
      "pt": "Sem problema. Posso mandar por e-mail hoje à noite.",
      "audio": "talk/dialogues/renting-a-flat/cfae56a8421f.mp3",
      "audioF": "talk/dialogues/renting-a-flat/2b16ae3d9bc5.mp3",
      "next": "end_yes"
     },
     {
      "text": "My employer is abroad. Would a bank statement do?",
      "pt": "Meu empregador fica no exterior. Um extrato bancário serve?",
      "audio": "talk/dialogues/renting-a-flat/9e25e4014a05.mp3",
      "audioF": "talk/dialogues/renting-a-flat/d8cfc1da5e88.mp3",
      "next": "abroad"
     },
     {
      "text": "Sure, I can reference my favourite film.",
      "pt": "Claro, posso citar meu filme favorito.",
      "audio": "talk/dialogues/renting-a-flat/bff25e40fbb8.mp3",
      "audioF": "talk/dialogues/renting-a-flat/16f95ceb1234.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean a letter from your employer. Can you get one?",
       "pt": "Rá! Quero dizer uma carta do seu empregador. Você consegue uma?",
       "audio": "talk/dialogues/renting-a-flat/72e785b9a75a.mp3"
      }
     }
    ]
   },
   "abroad": {
    "speaker": "a",
    "text": "That should be fine, maybe with a couple of months' rent upfront.",
    "pt": "Deve servir, talvez com uns dois meses de aluguel adiantados.",
    "audio": "talk/dialogues/renting-a-flat/0dd063a3f3eb.mp3",
    "next": "end_yes"
   },
   "think": {
    "speaker": "a",
    "text": "Of course, but I can't hold it for long. There are two more viewings this afternoon.",
    "pt": "Claro, mas não consigo segurar por muito tempo. Tem mais duas visitas hoje à tarde.",
    "audio": "talk/dialogues/renting-a-flat/89f1d86abce8.mp3",
    "options": [
     {
      "text": "Understood. I'll call you by ten tomorrow morning.",
      "pt": "Entendido. Te ligo até as dez amanhã de manhã.",
      "audio": "talk/dialogues/renting-a-flat/5e8eb676e6aa.mp3",
      "audioF": "talk/dialogues/renting-a-flat/0d8fbfea4ca7.mp3",
      "next": "end_think"
     },
     {
      "text": "Fair enough. Could you call me if someone makes an offer?",
      "pt": "Justo. Você pode me ligar se alguém fizer uma proposta?",
      "audio": "talk/dialogues/renting-a-flat/6b835941ec33.mp3",
      "audioF": "talk/dialogues/renting-a-flat/3dc651192a7a.mp3",
      "next": "end_think"
     },
     {
      "text": "Two viewings? I'm watching two series as well.",
      "pt": "Duas visitas? Também estou assistindo duas séries.",
      "audio": "talk/dialogues/renting-a-flat/ce2ad01df78f.mp3",
      "audioF": "talk/dialogues/renting-a-flat/f4f7772a0024.mp3",
      "next": null,
      "react": {
       "text": "Ha! I mean other people are coming to see the flat. Will you decide soon?",
       "pt": "Rá! Quero dizer que outras pessoas vêm ver o apartamento. Você decide logo?",
       "audio": "talk/dialogues/renting-a-flat/bc51bae2b2de.mp3"
      }
     }
    ]
   },
   "end_yes": {
    "speaker": "a",
    "text": "Great. I'll draw up the paperwork. Welcome to the neighbourhood, hopefully!",
    "pt": "Ótimo. Vou preparar a papelada. Boas-vindas ao bairro, tomara!",
    "audio": "talk/dialogues/renting-a-flat/7c9cfd8c154a.mp3",
    "end": true
   },
   "end_think": {
    "speaker": "a",
    "text": "Perfect. Here's my card. Speak tomorrow.",
    "pt": "Perfeito. Aqui está meu cartão. Nos falamos amanhã.",
    "audio": "talk/dialogues/renting-a-flat/936c091ac5ea.mp3",
    "end": true
   }
  },
  "nudges": {
   "a": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/renting-a-flat/c08d73e8e69c.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/renting-a-flat/a07d40a67f3e.mp3"
    }
   ],
   "t": [
    {
     "text": "Take your time.",
     "pt": "Pode pensar com calma.",
     "audio": "talk/dialogues/renting-a-flat/405f517c19c1.mp3"
    },
    {
     "text": "Sorry, did you hear me?",
     "pt": "Desculpe, você me ouviu?",
     "audio": "talk/dialogues/renting-a-flat/f88af66c993e.mp3"
    }
   ]
  }
 }
];
