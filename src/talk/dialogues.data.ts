// GERADO por talk-tts/gen_dialogues.py a partir de talk-tts/dialogues/*.json. Não editar à mão.
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
      "audio": "talk/dialogues/ordering-at-a-cafe/92f025d50a70.mp3",
      "next": "coffee_size"
     },
     {
      "text": "Can I have a cup of tea?",
      "pt": "Pode me ver uma xícara de chá?",
      "audio": "talk/dialogues/ordering-at-a-cafe/dfd1ea4985dc.mp3",
      "next": "tea"
     },
     {
      "text": "An orange juice, please.",
      "pt": "Um suco de laranja, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/4fde5e5ce04f.mp3",
      "next": "juice"
     },
     {
      "text": "I'm twenty-five years old.",
      "pt": "Tenho vinte e cinco anos.",
      "audio": "talk/dialogues/ordering-at-a-cafe/5e5b61a63e5e.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/f5652e3a7753.mp3",
      "next": "coffee_milk"
     },
     {
      "text": "A large one, please.",
      "pt": "Um grande, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/69defc2aa019.mp3",
      "next": "coffee_milk"
     },
     {
      "text": "Yes, it's very cold today.",
      "pt": "Sim, está muito frio hoje.",
      "audio": "talk/dialogues/ordering-at-a-cafe/6c9fe0c871b4.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/4dd25964485c.mp3",
      "next": "coffee_sugar"
     },
     {
      "text": "No milk, thanks. Just black.",
      "pt": "Sem leite, obrigado. Só puro.",
      "audio": "talk/dialogues/ordering-at-a-cafe/7cfae96e9a23.mp3",
      "next": "food"
     },
     {
      "text": "It's on the table.",
      "pt": "Está na mesa.",
      "audio": "talk/dialogues/ordering-at-a-cafe/8bf37482a37a.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/7b0a22d8c3cc.mp3",
      "next": "food"
     },
     {
      "text": "No sugar, thank you.",
      "pt": "Sem açúcar, obrigado.",
      "audio": "talk/dialogues/ordering-at-a-cafe/ac46e1908871.mp3",
      "next": "food"
     },
     {
      "text": "My name is Lucas.",
      "pt": "Meu nome é Lucas.",
      "audio": "talk/dialogues/ordering-at-a-cafe/d7e6b002dc92.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/ee1098b43cda.mp3",
      "next": "tea_honey"
     },
     {
      "text": "Mint tea, please.",
      "pt": "Chá de hortelã, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/4f365a012605.mp3",
      "next": "tea_honey"
     },
     {
      "text": "I live near here.",
      "pt": "Eu moro aqui perto.",
      "audio": "talk/dialogues/ordering-at-a-cafe/fe0d5d2e55be.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/f10b81860108.mp3",
      "next": "food"
     },
     {
      "text": "A slice of lemon, please.",
      "pt": "Uma rodela de limão, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/161f1bf2b0d1.mp3",
      "next": "food"
     },
     {
      "text": "Every morning at seven.",
      "pt": "Toda manhã às sete.",
      "audio": "talk/dialogues/ordering-at-a-cafe/e40103443bb7.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/1170c4dcc2b0.mp3",
      "next": "food"
     },
     {
      "text": "No ice, thanks.",
      "pt": "Sem gelo, obrigado.",
      "audio": "talk/dialogues/ordering-at-a-cafe/e38820a6cd88.mp3",
      "next": "food"
     },
     {
      "text": "I don't like the beach.",
      "pt": "Eu não gosto de praia.",
      "audio": "talk/dialogues/ordering-at-a-cafe/2cf6dd4b4a0e.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/3a609ca96b33.mp3",
      "next": "here"
     },
     {
      "text": "What sandwiches do you have?",
      "pt": "Quais sanduíches vocês têm?",
      "audio": "talk/dialogues/ordering-at-a-cafe/3c31b3d88936.mp3",
      "next": "sandwich"
     },
     {
      "text": "No, thanks. That's all.",
      "pt": "Não, obrigado. É só isso.",
      "audio": "talk/dialogues/ordering-at-a-cafe/6907b1081053.mp3",
      "next": "here"
     },
     {
      "text": "I'm sorry, I'm late.",
      "pt": "Desculpe, estou atrasado.",
      "audio": "talk/dialogues/ordering-at-a-cafe/4b2b508a8f72.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/9f4f62bcc13c.mp3",
      "next": "here"
     },
     {
      "text": "The chicken salad sounds good.",
      "pt": "O de salada de frango parece bom.",
      "audio": "talk/dialogues/ordering-at-a-cafe/cc7dbf4d8307.mp3",
      "next": "here"
     },
     {
      "text": "It's next Tuesday.",
      "pt": "É na próxima terça.",
      "audio": "talk/dialogues/ordering-at-a-cafe/0e9882349365.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/c16f0b1d11de.mp3",
      "next": "pay"
     },
     {
      "text": "To go, please.",
      "pt": "Para levar, por favor.",
      "audio": "talk/dialogues/ordering-at-a-cafe/bcfb5ae9625e.mp3",
      "next": "pay"
     },
     {
      "text": "Yes, I'm from Brazil.",
      "pt": "Sim, sou do Brasil.",
      "audio": "talk/dialogues/ordering-at-a-cafe/37e34c1ae710.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/d2c1ef881039.mp3",
      "next": "card"
     },
     {
      "text": "Cash. Here's ten dollars.",
      "pt": "Dinheiro. Aqui estão dez dólares.",
      "audio": "talk/dialogues/ordering-at-a-cafe/da3934873044.mp3",
      "next": "cash"
     },
     {
      "text": "Blue is my favorite color.",
      "pt": "Azul é minha cor favorita.",
      "audio": "talk/dialogues/ordering-at-a-cafe/b321bba99364.mp3",
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
      "audio": "talk/dialogues/ordering-at-a-cafe/d7b980a32454.mp3",
      "next": "end"
     },
     {
      "text": "It's Ana. A, N, A.",
      "pt": "É Ana. A, N, A.",
      "audio": "talk/dialogues/ordering-at-a-cafe/aab62e08ddeb.mp3",
      "next": "end"
     },
     {
      "text": "Ten minutes ago.",
      "pt": "Dez minutos atrás.",
      "audio": "talk/dialogues/ordering-at-a-cafe/05e3c3269559.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/82fb5df3ad5a.mp3",
      "next": "station"
     },
     {
      "text": "Yes! I'm looking for the Science Museum.",
      "pt": "Sim! Estou procurando o Museu de Ciências.",
      "audio": "talk/dialogues/asking-for-directions/3d2f38d4b28c.mp3",
      "next": "museum"
     },
     {
      "text": "I had pizza for lunch.",
      "pt": "Comi pizza no almoço.",
      "audio": "talk/dialogues/asking-for-directions/ab1a8c7af4d8.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/3e682af91ac7.mp3",
      "next": "walk"
     },
     {
      "text": "Is there a bus?",
      "pt": "Tem ônibus?",
      "audio": "talk/dialogues/asking-for-directions/fc08ea0ddffb.mp3",
      "next": "bus"
     },
     {
      "text": "At nine o'clock.",
      "pt": "Às nove horas.",
      "audio": "talk/dialogues/asking-for-directions/542f0cb8fee4.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/e608a98fa3ea.mp3",
      "next": "confirm"
     },
     {
      "text": "Sorry, can you say that again, please?",
      "pt": "Desculpe, pode repetir, por favor?",
      "audio": "talk/dialogues/asking-for-directions/5f710c8bfe00.mp3",
      "next": "repeat"
     },
     {
      "text": "I've got two brothers.",
      "pt": "Eu tenho dois irmãos.",
      "audio": "talk/dialogues/asking-for-directions/4fd179649ff8.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/ae6e994e6052.mp3",
      "next": "bus_stop"
     },
     {
      "text": "No. Where can I buy one?",
      "pt": "Não. Onde posso comprar um?",
      "audio": "talk/dialogues/asking-for-directions/3e394a5decac.mp3",
      "next": "buy"
     },
     {
      "text": "I prefer cats.",
      "pt": "Eu prefiro gatos.",
      "audio": "talk/dialogues/asking-for-directions/a1fe1c85e863.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/3acb62456746.mp3",
      "next": "confirm"
     },
     {
      "text": "Sorry, which stop?",
      "pt": "Desculpe, qual parada?",
      "audio": "talk/dialogues/asking-for-directions/f51a7ed043d5.mp3",
      "next": "bus_repeat"
     },
     {
      "text": "It's my birthday tomorrow.",
      "pt": "Amanhã é meu aniversário.",
      "audio": "talk/dialogues/asking-for-directions/46baa2c3900f.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/47e928b81893.mp3",
      "next": "tube"
     },
     {
      "text": "Yes, it's over there, right?",
      "pt": "Sim, é ali, né?",
      "audio": "talk/dialogues/asking-for-directions/3fd17f9134d5.mp3",
      "next": "tube_yes"
     },
     {
      "text": "I like science very much.",
      "pt": "Eu gosto muito de ciência.",
      "audio": "talk/dialogues/asking-for-directions/5829e8b3e7d2.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/52336d237066.mp3",
      "next": "confirm"
     },
     {
      "text": "Can you write it down for me, please?",
      "pt": "Pode anotar para mim, por favor?",
      "audio": "talk/dialogues/asking-for-directions/e407f1bfd888.mp3",
      "next": "write"
     },
     {
      "text": "My phone is new.",
      "pt": "Meu celular é novo.",
      "audio": "talk/dialogues/asking-for-directions/051b6a120ba1.mp3",
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
      "audio": "talk/dialogues/asking-for-directions/5a1c3ce8f181.mp3",
      "next": "coffee"
     },
     {
      "text": "No, that's all. Thank you so much!",
      "pt": "Não, é só isso. Muito obrigado!",
      "audio": "talk/dialogues/asking-for-directions/932202836af1.mp3",
      "next": "end"
     },
     {
      "text": "Yes, I'm a doctor.",
      "pt": "Sim, eu sou médico.",
      "audio": "talk/dialogues/asking-for-directions/364cabe27640.mp3",
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
    "audio": "talk/dialogues/hotel-check-in/0251db25410f.mp3",
    "next": "h2"
   },
   "h2": {
    "speaker": "r",
    "text": "How can I help you this evening?",
    "pt": "Como posso ajudar esta noite?",
    "audio": "talk/dialogues/hotel-check-in/e639b1158466.mp3",
    "options": [
     {
      "text": "Hi, I have a reservation. My name is Silva.",
      "pt": "Oi, tenho uma reserva. Meu nome é Silva.",
      "audio": "talk/dialogues/hotel-check-in/5a70c7e9619b.mp3",
      "next": "res"
     },
     {
      "text": "Hello. Do you have any rooms available tonight?",
      "pt": "Olá. Vocês têm quarto disponível para hoje?",
      "audio": "talk/dialogues/hotel-check-in/b47274d69d99.mp3",
      "next": "walkin"
     },
     {
      "text": "The weather was good on the plane.",
      "pt": "O tempo estava bom no avião.",
      "audio": "talk/dialogues/hotel-check-in/648ec3e48f13.mp3",
      "next": null,
      "react": {
       "text": "I'm glad to hear that! So, what can I do for you?",
       "pt": "Que bom saber! Então, o que posso fazer por você?",
       "audio": "talk/dialogues/hotel-check-in/3897f04c2a8a.mp3"
      }
     }
    ]
   },
   "res": {
    "speaker": "r",
    "text": "Let me check. Yes, here it is. A double room for three nights. Is that correct?",
    "pt": "Deixe-me ver. Sim, aqui está. Um quarto de casal por três noites. Está correto?",
    "audio": "talk/dialogues/hotel-check-in/ebe5a18907ec.mp3",
    "options": [
     {
      "text": "Yes, that's correct.",
      "pt": "Sim, está correto.",
      "audio": "talk/dialogues/hotel-check-in/4f560839479f.mp3",
      "next": "passport"
     },
     {
      "text": "Actually, it's for four nights.",
      "pt": "Na verdade, é por quatro noites.",
      "audio": "talk/dialogues/hotel-check-in/1c10b7a772f3.mp3",
      "next": "extra"
     },
     {
      "text": "No, I don't drink coffee.",
      "pt": "Não, eu não tomo café.",
      "audio": "talk/dialogues/hotel-check-in/88ee80b096fd.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean the reservation. Three nights, correct?",
       "pt": "Desculpe, falo da reserva. Três noites, correto?",
       "audio": "talk/dialogues/hotel-check-in/aeecbbc8db64.mp3"
      }
     }
    ]
   },
   "extra": {
    "speaker": "r",
    "text": "Let me see. Good news, we can add one more night. It's one hundred and twenty dollars. Is that okay?",
    "pt": "Deixe-me ver. Boa notícia, podemos acrescentar mais uma noite. São cento e vinte dólares. Tudo bem?",
    "audio": "talk/dialogues/hotel-check-in/e69525d1fa93.mp3",
    "options": [
     {
      "text": "Yes, that's fine.",
      "pt": "Sim, tudo bem.",
      "audio": "talk/dialogues/hotel-check-in/2cdab14b5737.mp3",
      "next": "passport"
     },
     {
      "text": "Does that include breakfast?",
      "pt": "Inclui café da manhã?",
      "audio": "talk/dialogues/hotel-check-in/740c7241bd52.mp3",
      "next": "bf_incl"
     },
     {
      "text": "I'm wearing a jacket.",
      "pt": "Estou de jaqueta.",
      "audio": "talk/dialogues/hotel-check-in/fcd3a859b726.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Is the extra night okay for you?",
       "pt": "Como? A noite extra está boa para você?",
       "audio": "talk/dialogues/hotel-check-in/9a00828ab17f.mp3"
      }
     }
    ]
   },
   "bf_incl": {
    "speaker": "r",
    "text": "Yes, breakfast is included in all our rates.",
    "pt": "Sim, o café da manhã está incluído em todas as nossas diárias.",
    "audio": "talk/dialogues/hotel-check-in/55b3f532d4ec.mp3",
    "next": "passport"
   },
   "walkin": {
    "speaker": "r",
    "text": "Let me check. We have one double room left. It's one hundred and forty dollars a night. Would you like it?",
    "pt": "Deixe-me ver. Sobrou um quarto de casal. São cento e quarenta dólares a diária. Gostaria de ficar com ele?",
    "audio": "talk/dialogues/hotel-check-in/b09a62b8d3fb.mp3",
    "options": [
     {
      "text": "Yes, I'll take it.",
      "pt": "Sim, vou ficar com ele.",
      "audio": "talk/dialogues/hotel-check-in/0b327bc33921.mp3",
      "next": "walkin_n"
     },
     {
      "text": "Do you have anything cheaper?",
      "pt": "Vocês têm algo mais barato?",
      "audio": "talk/dialogues/hotel-check-in/cf03566ad235.mp3",
      "next": "cheaper"
     },
     {
      "text": "I'm reading a good book.",
      "pt": "Estou lendo um bom livro.",
      "audio": "talk/dialogues/hotel-check-in/2df21d3547b3.mp3",
      "next": null,
      "react": {
       "text": "How nice! But would you like the room?",
       "pt": "Que bom! Mas você gostaria do quarto?",
       "audio": "talk/dialogues/hotel-check-in/06b8ce7a6cd6.mp3"
      }
     }
    ]
   },
   "cheaper": {
    "speaker": "r",
    "text": "I'm sorry, it's our last room tonight. But breakfast is included.",
    "pt": "Sinto muito, é o nosso último quarto hoje. Mas o café da manhã está incluído.",
    "audio": "talk/dialogues/hotel-check-in/ab7a14531a03.mp3",
    "next": "walkin2"
   },
   "walkin2": {
    "speaker": "r",
    "text": "Would you like to take it?",
    "pt": "Quer ficar com ele?",
    "audio": "talk/dialogues/hotel-check-in/0f637ee09b8b.mp3",
    "options": [
     {
      "text": "Okay, I'll take it.",
      "pt": "Tudo bem, vou ficar.",
      "audio": "talk/dialogues/hotel-check-in/a5742699edfd.mp3",
      "next": "walkin_n"
     },
     {
      "text": "Alright. Yes, please.",
      "pt": "Está bem. Sim, por favor.",
      "audio": "talk/dialogues/hotel-check-in/93f145282a01.mp3",
      "next": "walkin_n"
     },
     {
      "text": "I have a cat at home.",
      "pt": "Tenho um gato em casa.",
      "audio": "talk/dialogues/hotel-check-in/9c62d3bb7964.mp3",
      "next": null,
      "react": {
       "text": "Oh, lovely. But do you want the room?",
       "pt": "Ah, que fofo. Mas você quer o quarto?",
       "audio": "talk/dialogues/hotel-check-in/948fb129c979.mp3"
      }
     }
    ]
   },
   "walkin_n": {
    "speaker": "r",
    "text": "How many nights will you stay?",
    "pt": "Quantas noites você vai ficar?",
    "audio": "talk/dialogues/hotel-check-in/554e4761e8de.mp3",
    "options": [
     {
      "text": "Just two nights.",
      "pt": "Só duas noites.",
      "audio": "talk/dialogues/hotel-check-in/3fa3e6c7341d.mp3",
      "next": "passport"
     },
     {
      "text": "Only tonight.",
      "pt": "Só esta noite.",
      "audio": "talk/dialogues/hotel-check-in/818330cecde0.mp3",
      "next": "passport"
     },
     {
      "text": "About five kilos.",
      "pt": "Uns cinco quilos.",
      "audio": "talk/dialogues/hotel-check-in/34231bc0d0f2.mp3",
      "next": null,
      "react": {
       "text": "Sorry? How many nights would you like to stay?",
       "pt": "Como? Quantas noites você quer ficar?",
       "audio": "talk/dialogues/hotel-check-in/c99186942723.mp3"
      }
     }
    ]
   },
   "passport": {
    "speaker": "r",
    "text": "May I see your passport, please?",
    "pt": "Posso ver seu passaporte, por favor?",
    "audio": "talk/dialogues/hotel-check-in/668569a059a1.mp3",
    "options": [
     {
      "text": "Of course. Here you are.",
      "pt": "Claro. Aqui está.",
      "audio": "talk/dialogues/hotel-check-in/5cd33d7f6689.mp3",
      "next": "card"
     },
     {
      "text": "Sure, just a second.",
      "pt": "Claro, só um segundo.",
      "audio": "talk/dialogues/hotel-check-in/c1c7d784c3ff.mp3",
      "next": "card"
     },
     {
      "text": "I'm sorry, I don't eat meat.",
      "pt": "Desculpe, eu não como carne.",
      "audio": "talk/dialogues/hotel-check-in/4f48b82ccf89.mp3",
      "next": null,
      "react": {
       "text": "Oh, I just need your passport, please.",
       "pt": "Ah, só preciso do seu passaporte, por favor.",
       "audio": "talk/dialogues/hotel-check-in/84749992e5be.mp3"
      }
     }
    ]
   },
   "card": {
    "speaker": "r",
    "text": "Thank you. I'll also need a credit card for any extras.",
    "pt": "Obrigada. Também vou precisar de um cartão de crédito para os extras.",
    "audio": "talk/dialogues/hotel-check-in/dc7d08782c5b.mp3",
    "options": [
     {
      "text": "Here's my card.",
      "pt": "Aqui está meu cartão.",
      "audio": "talk/dialogues/hotel-check-in/0e0b4d4e9557.mp3",
      "next": "breakfast"
     },
     {
      "text": "Can I pay in cash at the end?",
      "pt": "Posso pagar em dinheiro no final?",
      "audio": "talk/dialogues/hotel-check-in/9c87bfad1644.mp3",
      "next": "cash"
     },
     {
      "text": "I'm thirty-two.",
      "pt": "Tenho trinta e dois anos.",
      "audio": "talk/dialogues/hotel-check-in/f150a69a1b77.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I need a credit card, or a cash deposit.",
       "pt": "Desculpe, preciso de um cartão de crédito, ou de um depósito em dinheiro.",
       "audio": "talk/dialogues/hotel-check-in/8df690e37937.mp3"
      }
     }
    ]
   },
   "cash": {
    "speaker": "r",
    "text": "Of course. Then we just need a small cash deposit of fifty dollars.",
    "pt": "Claro. Então só precisamos de um pequeno depósito de cinquenta dólares em dinheiro.",
    "audio": "talk/dialogues/hotel-check-in/505004187d43.mp3",
    "next": "breakfast"
   },
   "breakfast": {
    "speaker": "r",
    "text": "Perfect. Breakfast is from seven to ten in the restaurant on the first floor. Would you like a wake-up call?",
    "pt": "Perfeito. O café da manhã é das sete às dez, no restaurante do primeiro andar. Gostaria de um serviço de despertador?",
    "audio": "talk/dialogues/hotel-check-in/2d6291c3c770.mp3",
    "options": [
     {
      "text": "Yes, at seven, please.",
      "pt": "Sim, às sete, por favor.",
      "audio": "talk/dialogues/hotel-check-in/d12ce809c81c.mp3",
      "next": "key"
     },
     {
      "text": "No, thank you.",
      "pt": "Não, obrigado.",
      "audio": "talk/dialogues/hotel-check-in/cfddcb5c9c1f.mp3",
      "next": "key"
     },
     {
      "text": "It's on the first floor.",
      "pt": "Fica no primeiro andar.",
      "audio": "talk/dialogues/hotel-check-in/fb5a988586f1.mp3",
      "next": null,
      "react": {
       "text": "Yes, the restaurant is. But would you like a wake-up call?",
       "pt": "Sim, o restaurante fica. Mas você gostaria de ser acordado por telefone?",
       "audio": "talk/dialogues/hotel-check-in/5b8fd83b8383.mp3"
      }
     }
    ]
   },
   "key": {
    "speaker": "r",
    "text": "Here's your key. You're in room five twelve, on the fifth floor. Do you have any questions?",
    "pt": "Aqui está sua chave. Você está no quarto quinhentos e doze, no quinto andar. Tem alguma pergunta?",
    "audio": "talk/dialogues/hotel-check-in/baff65c3b736.mp3",
    "options": [
     {
      "text": "What's the Wi-Fi password?",
      "pt": "Qual é a senha do Wi-Fi?",
      "audio": "talk/dialogues/hotel-check-in/33bb710213a0.mp3",
      "next": "wifi"
     },
     {
      "text": "Where is the elevator?",
      "pt": "Onde fica o elevador?",
      "audio": "talk/dialogues/hotel-check-in/261d40766d2c.mp3",
      "next": "elevator"
     },
     {
      "text": "No, that's everything. Thanks.",
      "pt": "Não, é só isso. Obrigado.",
      "audio": "talk/dialogues/hotel-check-in/9fb4658a1520.mp3",
      "next": "end"
     },
     {
      "text": "Five hundred dollars.",
      "pt": "Quinhentos dólares.",
      "audio": "talk/dialogues/hotel-check-in/1820c911e7d4.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Do you have any questions about your stay?",
       "pt": "Como? Tem alguma pergunta sobre a sua estadia?",
       "audio": "talk/dialogues/hotel-check-in/cdbd9724978f.mp3"
      }
     }
    ]
   },
   "wifi": {
    "speaker": "r",
    "text": "It's harbour view, all lowercase, no spaces. It's on your key card too.",
    "pt": "É harbour view, tudo minúsculo e sem espaço. Também está no cartão da chave.",
    "audio": "talk/dialogues/hotel-check-in/1b25aa2ac6a8.mp3",
    "next": "end"
   },
   "elevator": {
    "speaker": "r",
    "text": "The elevators are just behind you, on the left.",
    "pt": "Os elevadores ficam logo atrás de você, à esquerda.",
    "audio": "talk/dialogues/hotel-check-in/8fec6f4762b5.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "r",
    "text": "Enjoy your stay, and let us know if you need anything.",
    "pt": "Aproveite a estadia e nos avise se precisar de alguma coisa.",
    "audio": "talk/dialogues/hotel-check-in/c764ba5f0929.mp3",
    "end": true
   }
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/fd9a6ee7186d.mp3",
      "next": "seat"
     },
     {
      "text": "No, we don't. Do you have a table for two?",
      "pt": "Não temos. Tem mesa para dois?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/4d42c9fbd3e6.mp3",
      "next": "wait"
     },
     {
      "text": "It's in my bag.",
      "pt": "Está na minha bolsa.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/529dfa3f30a3.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/eec2b2d60c03.mp3",
      "next": "seat"
     },
     {
      "text": "Can we sit outside instead?",
      "pt": "Podemos sentar lá fora?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/757cf0fc0fbe.mp3",
      "next": "outside"
     },
     {
      "text": "My brother is a teacher.",
      "pt": "Meu irmão é professor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/5239ccf9c310.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/e71f5c1cb321.mp3",
      "next": "special"
     },
     {
      "text": "Could we see the wine list?",
      "pt": "Podemos ver a carta de vinhos?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/c44710595a7b.mp3",
      "next": "wine"
     },
     {
      "text": "I live in São Paulo.",
      "pt": "Eu moro em São Paulo.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/071bc0b43785.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/e1ab4ad89e03.mp3",
      "next": "special"
     },
     {
      "text": "No, just water for now, thanks.",
      "pt": "Não, só água por enquanto, obrigado.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/d77e2abf9282.mp3",
      "next": "special"
     },
     {
      "text": "Red is a beautiful color.",
      "pt": "Vermelho é uma cor linda.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/3b07354152b7.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/0441356a56e2.mp3",
      "next": "side"
     },
     {
      "text": "We need a few more minutes.",
      "pt": "Precisamos de mais alguns minutos.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/7d94702ebbdc.mp3",
      "next": "minutes"
     },
     {
      "text": "What do you recommend?",
      "pt": "O que você recomenda?",
      "audio": "talk/dialogues/dinner-at-a-restaurant/d8efdee7a5ac.mp3",
      "next": "recommend"
     },
     {
      "text": "Salmon is a fish.",
      "pt": "Salmão é um peixe.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/851567099443.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/3649ac6d235d.mp3",
      "next": "steak"
     },
     {
      "text": "I'll try the lasagna.",
      "pt": "Vou experimentar a lasanha.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/e039b5b5edf9.mp3",
      "next": "side"
     },
     {
      "text": "The salmon special, please.",
      "pt": "O salmão do dia, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/02d48b2a16ad.mp3",
      "next": "side"
     },
     {
      "text": "Yes, I decided to study English.",
      "pt": "Sim, decidi estudar inglês.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/8724e2cf8f1c.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/f5652e3a7753.mp3",
      "next": "side"
     },
     {
      "text": "Well done, please.",
      "pt": "Bem passado, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/0528e0f37f90.mp3",
      "next": "side"
     },
     {
      "text": "With my friends.",
      "pt": "Com os meus amigos.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/9244dbb125e3.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/2a1305cf0c02.mp3",
      "next": "allergy"
     },
     {
      "text": "Fries, please.",
      "pt": "Batata frita, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/68181e4a54f2.mp3",
      "next": "allergy"
     },
     {
      "text": "On the left side.",
      "pt": "Do lado esquerdo.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/c205410e46bb.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/442afd443773.mp3",
      "next": "served"
     },
     {
      "text": "Yes, I'm allergic to nuts.",
      "pt": "Sim, tenho alergia a nozes e castanhas.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/aef8c46d0c41.mp3",
      "next": "nuts"
     },
     {
      "text": "Yes, I have two kids.",
      "pt": "Sim, tenho dois filhos.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/3d04c47e9688.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/7c2f17781c7b.mp3",
      "next": "dessert"
     },
     {
      "text": "It was good, but a little salty.",
      "pt": "Estava bom, mas um pouco salgado.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/7fac338d62cd.mp3",
      "next": "salty"
     },
     {
      "text": "At eight o'clock.",
      "pt": "Às oito horas.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/ca4e009977b1.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/34ef5b044d19.mp3",
      "next": "cake"
     },
     {
      "text": "No, thanks. Just the check, please.",
      "pt": "Não, obrigado. Só a conta, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/ea60d7674e6c.mp3",
      "next": "check"
     },
     {
      "text": "I see my friend every week.",
      "pt": "Vejo meu amigo toda semana.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/e57a43b2c1ab.mp3",
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
      "audio": "talk/dialogues/dinner-at-a-restaurant/0b67b976161e.mp3",
      "next": "end"
     },
     {
      "text": "Separately, please.",
      "pt": "Separado, por favor.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/292bf61dca05.mp3",
      "next": "end"
     },
     {
      "text": "Yes, it's chocolate.",
      "pt": "Sim, é de chocolate.",
      "audio": "talk/dialogues/dinner-at-a-restaurant/1b0e1385e7a8.mp3",
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
    "audio": "talk/dialogues/buying-a-jacket/ec5281db4a83.mp3",
    "options": [
     {
      "text": "Yes, I'm looking for a jacket.",
      "pt": "Sim, estou procurando uma jaqueta.",
      "audio": "talk/dialogues/buying-a-jacket/109cad14e108.mp3",
      "next": "jacket"
     },
     {
      "text": "I'm just looking, thanks.",
      "pt": "Só estou olhando, obrigado.",
      "audio": "talk/dialogues/buying-a-jacket/52d0070fa01e.mp3",
      "next": "look"
     },
     {
      "text": "I found my keys yesterday.",
      "pt": "Achei minhas chaves ontem.",
      "audio": "talk/dialogues/buying-a-jacket/c3e77d31e54b.mp3",
      "next": null,
      "react": {
       "text": "Oh, good! But can I help you find something here?",
       "pt": "Ah, que bom! Mas posso ajudar você a achar algo aqui?",
       "audio": "talk/dialogues/buying-a-jacket/20efcfc9cfb3.mp3"
      }
     }
    ]
   },
   "look": {
    "speaker": "s",
    "text": "No problem. That jacket on the mannequin is new this week, by the way.",
    "pt": "Sem problema. Aliás, aquela jaqueta no manequim chegou esta semana.",
    "audio": "talk/dialogues/buying-a-jacket/194f149d6d2b.mp3",
    "next": "look2"
   },
   "look2": {
    "speaker": "s",
    "text": "Would you like to try it on?",
    "pt": "Quer experimentar?",
    "audio": "talk/dialogues/buying-a-jacket/f82aef3f5dbc.mp3",
    "options": [
     {
      "text": "Yes, I'd love to.",
      "pt": "Sim, adoraria.",
      "audio": "talk/dialogues/buying-a-jacket/15fa80b06b48.mp3",
      "next": "size"
     },
     {
      "text": "How much is it?",
      "pt": "Quanto custa?",
      "audio": "talk/dialogues/buying-a-jacket/227b45786bcd.mp3",
      "next": "price"
     },
     {
      "text": "I'm on vacation.",
      "pt": "Estou de férias.",
      "audio": "talk/dialogues/buying-a-jacket/7d6b32b210d4.mp3",
      "next": null,
      "react": {
       "text": "Lucky you! So, would you like to try the jacket on?",
       "pt": "Que sorte! Então, quer experimentar a jaqueta?",
       "audio": "talk/dialogues/buying-a-jacket/c3d36e9bbe12.mp3"
      }
     }
    ]
   },
   "price": {
    "speaker": "s",
    "text": "It's sixty dollars, but it's twenty percent off today.",
    "pt": "Custa sessenta dólares, mas hoje está com vinte por cento de desconto.",
    "audio": "talk/dialogues/buying-a-jacket/f88d807687bb.mp3",
    "next": "size"
   },
   "jacket": {
    "speaker": "s",
    "text": "Great. We have leather jackets and denim jackets. Which do you prefer?",
    "pt": "Ótimo. Temos jaquetas de couro e jaquetas jeans. Qual você prefere?",
    "audio": "talk/dialogues/buying-a-jacket/d5a560560fdb.mp3",
    "options": [
     {
      "text": "A denim jacket, please.",
      "pt": "Uma jaqueta jeans, por favor.",
      "audio": "talk/dialogues/buying-a-jacket/d5cb7d974988.mp3",
      "next": "size"
     },
     {
      "text": "Can I see the leather ones?",
      "pt": "Posso ver as de couro?",
      "audio": "talk/dialogues/buying-a-jacket/106695d8202a.mp3",
      "next": "leather"
     },
     {
      "text": "I prefer summer.",
      "pt": "Prefiro o verão.",
      "audio": "talk/dialogues/buying-a-jacket/1c98561f12d8.mp3",
      "next": null,
      "react": {
       "text": "Me too! But which kind of jacket do you prefer?",
       "pt": "Eu também! Mas que tipo de jaqueta você prefere?",
       "audio": "talk/dialogues/buying-a-jacket/3fa3df7a641a.mp3"
      }
     }
    ]
   },
   "leather": {
    "speaker": "s",
    "text": "Sure, they're over here. This black one is very popular.",
    "pt": "Claro, ficam aqui. Esta preta vende muito.",
    "audio": "talk/dialogues/buying-a-jacket/514ff650f8e7.mp3",
    "next": "size"
   },
   "size": {
    "speaker": "s",
    "text": "What size are you?",
    "pt": "Qual é o seu tamanho?",
    "audio": "talk/dialogues/buying-a-jacket/0eaa399c231a.mp3",
    "options": [
     {
      "text": "I'm a medium.",
      "pt": "Uso médio.",
      "audio": "talk/dialogues/buying-a-jacket/447535e17ae1.mp3",
      "next": "fitting"
     },
     {
      "text": "I think I'm a large.",
      "pt": "Acho que uso grande.",
      "audio": "talk/dialogues/buying-a-jacket/2f38db121ea9.mp3",
      "next": "fitting"
     },
     {
      "text": "I'm a software engineer.",
      "pt": "Sou engenheiro de software.",
      "audio": "talk/dialogues/buying-a-jacket/970d4aa392fb.mp3",
      "next": null,
      "react": {
       "text": "Oh, interesting! But what size do you wear? Small, medium or large?",
       "pt": "Ah, interessante! Mas que tamanho você usa? Pequeno, médio ou grande?",
       "audio": "talk/dialogues/buying-a-jacket/8b51eb8b35eb.mp3"
      }
     }
    ]
   },
   "fitting": {
    "speaker": "s",
    "text": "Here you go. The fitting rooms are at the back, on the right.",
    "pt": "Aqui está. Os provadores ficam no fundo, à direita.",
    "audio": "talk/dialogues/buying-a-jacket/7d4522d15cc1.mp3",
    "next": "fit"
   },
   "fit": {
    "speaker": "s",
    "text": "So, how does it fit?",
    "pt": "E aí, como ficou?",
    "audio": "talk/dialogues/buying-a-jacket/27d85b6e2236.mp3",
    "options": [
     {
      "text": "It's a bit too tight.",
      "pt": "Está um pouco apertada.",
      "audio": "talk/dialogues/buying-a-jacket/9aea80f7bddd.mp3",
      "next": "bigger"
     },
     {
      "text": "It fits perfectly!",
      "pt": "Ficou perfeita!",
      "audio": "talk/dialogues/buying-a-jacket/ff020628e8f5.mp3",
      "next": "color"
     },
     {
      "text": "It's next to the door.",
      "pt": "Fica ao lado da porta.",
      "audio": "talk/dialogues/buying-a-jacket/a0397e325cd4.mp3",
      "next": null,
      "react": {
       "text": "Sorry? I mean, is the size right for you?",
       "pt": "Como? Quero dizer, o tamanho ficou bom?",
       "audio": "talk/dialogues/buying-a-jacket/81beeb1a913e.mp3"
      }
     }
    ]
   },
   "bigger": {
    "speaker": "s",
    "text": "Let me get you a bigger size. Here you go, this one should be better.",
    "pt": "Vou pegar um tamanho maior. Aqui está, esta deve ficar melhor.",
    "audio": "talk/dialogues/buying-a-jacket/d44896acf022.mp3",
    "next": "color"
   },
   "color": {
    "speaker": "s",
    "text": "It also comes in blue and green. Do you want to see the other colors?",
    "pt": "Também tem em azul e verde. Quer ver as outras cores?",
    "audio": "talk/dialogues/buying-a-jacket/34a83c00f077.mp3",
    "options": [
     {
      "text": "No, I like this one.",
      "pt": "Não, gostei desta.",
      "audio": "talk/dialogues/buying-a-jacket/bf89d6e9aad8.mp3",
      "next": "more"
     },
     {
      "text": "Yes, can I see the blue one?",
      "pt": "Sim, posso ver a azul?",
      "audio": "talk/dialogues/buying-a-jacket/f5b73ef956c3.mp3",
      "next": "blue"
     },
     {
      "text": "My eyes are brown.",
      "pt": "Meus olhos são castanhos.",
      "audio": "talk/dialogues/buying-a-jacket/805391ccaa01.mp3",
      "next": null,
      "react": {
       "text": "Nice! But would you like to see the other colors?",
       "pt": "Legal! Mas quer ver as outras cores?",
       "audio": "talk/dialogues/buying-a-jacket/8dbe4f4eea48.mp3"
      }
     }
    ]
   },
   "blue": {
    "speaker": "s",
    "text": "Here it is. The blue looks really good on you!",
    "pt": "Aqui está. A azul ficou muito bem em você!",
    "audio": "talk/dialogues/buying-a-jacket/d14f4f143174.mp3",
    "next": "blue2"
   },
   "blue2": {
    "speaker": "s",
    "text": "Which one will you take?",
    "pt": "Qual você vai levar?",
    "audio": "talk/dialogues/buying-a-jacket/4a566b0ee0a5.mp3",
    "options": [
     {
      "text": "I'll take the blue one.",
      "pt": "Vou levar a azul.",
      "audio": "talk/dialogues/buying-a-jacket/c0f7a1d45b2a.mp3",
      "next": "more"
     },
     {
      "text": "I'll stay with the first one.",
      "pt": "Vou ficar com a primeira.",
      "audio": "talk/dialogues/buying-a-jacket/06dde15eb244.mp3",
      "next": "more"
     },
     {
      "text": "I take the bus to work.",
      "pt": "Eu pego ônibus para o trabalho.",
      "audio": "talk/dialogues/buying-a-jacket/e65217a42090.mp3",
      "next": null,
      "react": {
       "text": "Ha, no, I mean, which jacket will you buy?",
       "pt": "Rá, não, quero dizer, qual jaqueta você vai comprar?",
       "audio": "talk/dialogues/buying-a-jacket/11c7fd450a68.mp3"
      }
     }
    ]
   },
   "more": {
    "speaker": "s",
    "text": "Great choice. Would you like anything else? Our scarves are on sale.",
    "pt": "Ótima escolha. Quer mais alguma coisa? Nossos cachecóis estão em promoção.",
    "audio": "talk/dialogues/buying-a-jacket/1b7863267b21.mp3",
    "options": [
     {
      "text": "No, just the jacket, thanks.",
      "pt": "Não, só a jaqueta, obrigado.",
      "audio": "talk/dialogues/buying-a-jacket/76371e6fc0c5.mp3",
      "next": "bag"
     },
     {
      "text": "Sure, I'll take a scarf too.",
      "pt": "Claro, vou levar um cachecol também.",
      "audio": "talk/dialogues/buying-a-jacket/5c99833b851e.mp3",
      "next": "bag"
     },
     {
      "text": "Twenty-five degrees.",
      "pt": "Vinte e cinco graus.",
      "audio": "talk/dialogues/buying-a-jacket/d1e74d07f5fb.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Would you like anything else?",
       "pt": "Como? Quer mais alguma coisa?",
       "audio": "talk/dialogues/buying-a-jacket/3277930493ff.mp3"
      }
     }
    ]
   },
   "bag": {
    "speaker": "s",
    "text": "Would you like a bag and a gift receipt?",
    "pt": "Quer uma sacola e um recibo de presente?",
    "audio": "talk/dialogues/buying-a-jacket/a53ebae1453e.mp3",
    "options": [
     {
      "text": "Just a bag, please.",
      "pt": "Só a sacola, por favor.",
      "audio": "talk/dialogues/buying-a-jacket/b1327a93c27e.mp3",
      "next": "end"
     },
     {
      "text": "Yes, please. It's a gift for my brother.",
      "pt": "Sim, por favor. É um presente para o meu irmão.",
      "audio": "talk/dialogues/buying-a-jacket/57f105a64737.mp3",
      "next": "gift"
     },
     {
      "text": "I can't swim.",
      "pt": "Eu não sei nadar.",
      "audio": "talk/dialogues/buying-a-jacket/78ed0c63f0a5.mp3",
      "next": null,
      "react": {
       "text": "Oh! But do you want a bag and a gift receipt?",
       "pt": "Ah! Mas você quer sacola e recibo de presente?",
       "audio": "talk/dialogues/buying-a-jacket/e597f0d2a103.mp3"
      }
     }
    ]
   },
   "gift": {
    "speaker": "s",
    "text": "How nice! I'll put the receipt in the bag so he can exchange it.",
    "pt": "Que legal! Vou colocar o recibo na sacola para ele poder trocar.",
    "audio": "talk/dialogues/buying-a-jacket/ef23992fc074.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "s",
    "text": "Here you go. You can return or exchange it within thirty days. Have a nice day!",
    "pt": "Aqui está. Você pode devolver ou trocar em até trinta dias. Tenha um bom dia!",
    "audio": "talk/dialogues/buying-a-jacket/bcb3dbcbc64a.mp3",
    "end": true
   }
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
    "audio": "talk/dialogues/at-the-airport/958be1c1be2f.mp3",
    "options": [
     {
      "text": "To New York.",
      "pt": "Para Nova York.",
      "audio": "talk/dialogues/at-the-airport/d8e0b401eabd.mp3",
      "next": "passport"
     },
     {
      "text": "I'm going to Lisbon.",
      "pt": "Vou para Lisboa.",
      "audio": "talk/dialogues/at-the-airport/cf9d0c15f430.mp3",
      "next": "passport"
     },
     {
      "text": "Since last Monday.",
      "pt": "Desde segunda passada.",
      "audio": "talk/dialogues/at-the-airport/d211518c9962.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Where are you traveling to?",
       "pt": "Como? Para onde você está viajando?",
       "audio": "talk/dialogues/at-the-airport/11abc2f81a34.mp3"
      }
     }
    ]
   },
   "passport": {
    "speaker": "a",
    "text": "Can I see your passport and ticket, please?",
    "pt": "Posso ver seu passaporte e sua passagem, por favor?",
    "audio": "talk/dialogues/at-the-airport/ab0f5a02fc8d.mp3",
    "options": [
     {
      "text": "Here you are.",
      "pt": "Aqui estão.",
      "audio": "talk/dialogues/at-the-airport/42608d37c43a.mp3",
      "next": "bags"
     },
     {
      "text": "I have the ticket on my phone. Is that okay?",
      "pt": "Estou com a passagem no celular. Tudo bem?",
      "audio": "talk/dialogues/at-the-airport/520209cbed0c.mp3",
      "next": "phone"
     },
     {
      "text": "I'm a little tired.",
      "pt": "Estou um pouco cansado.",
      "audio": "talk/dialogues/at-the-airport/cd9d01f89fa0.mp3",
      "next": null,
      "react": {
       "text": "Early flights are tough! May I see your passport, please?",
       "pt": "Voo cedo é difícil! Posso ver seu passaporte, por favor?",
       "audio": "talk/dialogues/at-the-airport/69dadb04e929.mp3"
      }
     }
    ]
   },
   "phone": {
    "speaker": "a",
    "text": "That's fine. I just need your passport, then.",
    "pt": "Tudo bem. Então só preciso do seu passaporte.",
    "audio": "talk/dialogues/at-the-airport/2b8848017319.mp3",
    "next": "bags"
   },
   "bags": {
    "speaker": "a",
    "text": "Thank you. Are you checking any bags today?",
    "pt": "Obrigado. Vai despachar alguma mala hoje?",
    "audio": "talk/dialogues/at-the-airport/fed1a41d318e.mp3",
    "options": [
     {
      "text": "Yes, just this suitcase.",
      "pt": "Sim, só esta mala.",
      "audio": "talk/dialogues/at-the-airport/24dcef4cd804.mp3",
      "next": "weight"
     },
     {
      "text": "No, only my carry-on.",
      "pt": "Não, só a de mão.",
      "audio": "talk/dialogues/at-the-airport/7722cba6af9d.mp3",
      "next": "seat"
     },
     {
      "text": "I checked my email.",
      "pt": "Eu chequei meu e-mail.",
      "audio": "talk/dialogues/at-the-airport/4ae13ebb2280.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean luggage. Are you checking any bags?",
       "pt": "Desculpe, falo da bagagem. Vai despachar alguma mala?",
       "audio": "talk/dialogues/at-the-airport/bd9937f04c69.mp3"
      }
     }
    ]
   },
   "weight": {
    "speaker": "a",
    "text": "Please put it on the scale. Hmm, it's twenty-five kilos. The limit is twenty-three.",
    "pt": "Coloque na balança, por favor. Hum, são vinte e cinco quilos. O limite é vinte e três.",
    "audio": "talk/dialogues/at-the-airport/03c9b3a67465.mp3",
    "next": "weight2"
   },
   "weight2": {
    "speaker": "a",
    "text": "You can pay a fee, or take something out. What would you like to do?",
    "pt": "Você pode pagar uma taxa ou tirar alguma coisa. O que prefere?",
    "audio": "talk/dialogues/at-the-airport/33675cbaf03d.mp3",
    "options": [
     {
      "text": "How much is the fee?",
      "pt": "Quanto é a taxa?",
      "audio": "talk/dialogues/at-the-airport/d44545d8d34c.mp3",
      "next": "fee"
     },
     {
      "text": "I'll take something out.",
      "pt": "Vou tirar alguma coisa.",
      "audio": "talk/dialogues/at-the-airport/753116522a1c.mp3",
      "next": "repack"
     },
     {
      "text": "I'm on a diet.",
      "pt": "Estou de dieta.",
      "audio": "talk/dialogues/at-the-airport/18eafdfc0e71.mp3",
      "next": null,
      "react": {
       "text": "Ha! No, I mean your suitcase is too heavy. What would you like to do?",
       "pt": "Rá! Não, quero dizer, sua mala está pesada demais. O que prefere fazer?",
       "audio": "talk/dialogues/at-the-airport/4b6c895c9d84.mp3"
      }
     }
    ]
   },
   "fee": {
    "speaker": "a",
    "text": "It's fifty dollars.",
    "pt": "São cinquenta dólares.",
    "audio": "talk/dialogues/at-the-airport/f7a1ffd44671.mp3",
    "next": "fee2"
   },
   "fee2": {
    "speaker": "a",
    "text": "Would you like to pay it?",
    "pt": "Quer pagar?",
    "audio": "talk/dialogues/at-the-airport/86b048e48eb3.mp3",
    "options": [
     {
      "text": "Okay, I'll pay.",
      "pt": "Tudo bem, eu pago.",
      "audio": "talk/dialogues/at-the-airport/30092f5e2366.mp3",
      "next": "seat"
     },
     {
      "text": "That's too much. I'll take some things out.",
      "pt": "É caro demais. Vou tirar algumas coisas.",
      "audio": "talk/dialogues/at-the-airport/7eca74ba15eb.mp3",
      "next": "repack"
     },
     {
      "text": "My bag is blue.",
      "pt": "Minha mala é azul.",
      "audio": "talk/dialogues/at-the-airport/11cb12e176a5.mp3",
      "next": null,
      "react": {
       "text": "I can see that! But do you want to pay the fee?",
       "pt": "Estou vendo! Mas quer pagar a taxa?",
       "audio": "talk/dialogues/at-the-airport/79afa0f6afa0.mp3"
      }
     }
    ]
   },
   "repack": {
    "speaker": "a",
    "text": "No problem. Perfect, it's twenty-two kilos now.",
    "pt": "Sem problema. Perfeito, agora são vinte e dois quilos.",
    "audio": "talk/dialogues/at-the-airport/b51bb707fd1a.mp3",
    "next": "seat"
   },
   "seat": {
    "speaker": "a",
    "text": "Would you prefer a window or an aisle seat?",
    "pt": "Prefere assento na janela ou no corredor?",
    "audio": "talk/dialogues/at-the-airport/1c3cf6649164.mp3",
    "options": [
     {
      "text": "A window seat, please.",
      "pt": "Na janela, por favor.",
      "audio": "talk/dialogues/at-the-airport/413b6afc1a1e.mp3",
      "next": "window"
     },
     {
      "text": "An aisle seat, please.",
      "pt": "No corredor, por favor.",
      "audio": "talk/dialogues/at-the-airport/e0708ae6141a.mp3",
      "next": "boarding"
     },
     {
      "text": "I'd prefer a sandwich.",
      "pt": "Eu preferiria um sanduíche.",
      "audio": "talk/dialogues/at-the-airport/6f2aa63134c3.mp3",
      "next": null,
      "react": {
       "text": "Ha! The seat, I mean. Window or aisle?",
       "pt": "Rá! O assento, quero dizer. Janela ou corredor?",
       "audio": "talk/dialogues/at-the-airport/5273e16deb3d.mp3"
      }
     }
    ]
   },
   "window": {
    "speaker": "a",
    "text": "Seat fourteen A, by the window.",
    "pt": "Assento catorze A, na janela.",
    "audio": "talk/dialogues/at-the-airport/1a607367b5a6.mp3",
    "next": "boarding"
   },
   "boarding": {
    "speaker": "a",
    "text": "Here's your boarding pass. Boarding starts at ten fifteen, at gate twenty-two. Any questions?",
    "pt": "Aqui está seu cartão de embarque. O embarque começa às dez e quinze, no portão vinte e dois. Alguma pergunta?",
    "audio": "talk/dialogues/at-the-airport/9d5b13221b58.mp3",
    "options": [
     {
      "text": "Where is gate twenty-two?",
      "pt": "Onde fica o portão vinte e dois?",
      "audio": "talk/dialogues/at-the-airport/ce9731c61da6.mp3",
      "next": "gate"
     },
     {
      "text": "Is the flight on time?",
      "pt": "O voo está no horário?",
      "audio": "talk/dialogues/at-the-airport/25628e3613dd.mp3",
      "next": "ontime"
     },
     {
      "text": "No, thank you.",
      "pt": "Não, obrigado.",
      "audio": "talk/dialogues/at-the-airport/cfddcb5c9c1f.mp3",
      "next": "security"
     },
     {
      "text": "At my grandmother's house.",
      "pt": "Na casa da minha avó.",
      "audio": "talk/dialogues/at-the-airport/eb28340aaafd.mp3",
      "next": null,
      "react": {
       "text": "Sorry? Do you have any questions about your flight?",
       "pt": "Como? Tem alguma pergunta sobre o voo?",
       "audio": "talk/dialogues/at-the-airport/3f8f19a46425.mp3"
      }
     }
    ]
   },
   "gate": {
    "speaker": "a",
    "text": "Go through security and turn right. It's about a five-minute walk.",
    "pt": "Passe pela segurança e vire à direita. É uns cinco minutos a pé.",
    "audio": "talk/dialogues/at-the-airport/3a44399c0736.mp3",
    "next": "security"
   },
   "ontime": {
    "speaker": "a",
    "text": "Yes, it's on time today. Have a nice flight.",
    "pt": "Sim, hoje está no horário. Faça uma boa viagem.",
    "audio": "talk/dialogues/at-the-airport/047f89d16ac0.mp3",
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
      "audio": "talk/dialogues/at-the-airport/ab3aab188e2d.mp3",
      "next": "laptop"
     },
     {
      "text": "Just a small bottle of shampoo.",
      "pt": "Só um frasco pequeno de xampu.",
      "audio": "talk/dialogues/at-the-airport/d20dd2b16799.mp3",
      "next": "liquid"
     },
     {
      "text": "No, nothing.",
      "pt": "Não, nada.",
      "audio": "talk/dialogues/at-the-airport/651da5982ecc.mp3",
      "next": "beep"
     },
     {
      "text": "I don't like flying.",
      "pt": "Eu não gosto de voar.",
      "audio": "talk/dialogues/at-the-airport/4cd7beaf7268.mp3",
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
      "audio": "talk/dialogues/at-the-airport/191b6188a7d1.mp3",
      "next": "end"
     },
     {
      "text": "I think it's my belt.",
      "pt": "Acho que é o meu cinto.",
      "audio": "talk/dialogues/at-the-airport/f09cc2ac626b.mp3",
      "next": "end"
     },
     {
      "text": "My pockets are blue.",
      "pt": "Meus bolsos são azuis.",
      "audio": "talk/dialogues/at-the-airport/037418e79cb1.mp3",
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
    "audio": "talk/dialogues/at-the-doctor/9691663d2b9b.mp3",
    "options": [
     {
      "text": "Yes, at nine thirty with Dr. Patel.",
      "pt": "Sim, às nove e meia com a doutora Patel.",
      "audio": "talk/dialogues/at-the-doctor/189362676191.mp3",
      "next": "wait"
     },
     {
      "text": "No, but I'm not feeling well. Can a doctor see me today?",
      "pt": "Não, mas não estou me sentindo bem. Algum médico pode me atender hoje?",
      "audio": "talk/dialogues/at-the-doctor/a33c404196b4.mp3",
      "next": "walkin"
     },
     {
      "text": "I'm feeling much better than yesterday.",
      "pt": "Estou me sentindo bem melhor que ontem.",
      "audio": "talk/dialogues/at-the-doctor/4793f0d89cdd.mp3",
      "next": null,
      "react": {
       "text": "Glad to hear it! But do you have an appointment today?",
       "pt": "Que bom! Mas você tem horário marcado hoje?",
       "audio": "talk/dialogues/at-the-doctor/9f56c81a0c8d.mp3"
      }
     }
    ]
   },
   "wait": {
    "speaker": "r",
    "text": "Thank you. Please take a seat. The doctor will call you shortly.",
    "pt": "Obrigada. Sente-se, por favor. A doutora já vai chamar.",
    "audio": "talk/dialogues/at-the-doctor/bf3657b49199.mp3",
    "next": "doc"
   },
   "walkin": {
    "speaker": "r",
    "text": "Let me see. Dr. Patel has a cancellation at ten. Please take a seat.",
    "pt": "Deixe-me ver. A doutora Patel teve um cancelamento às dez. Sente-se, por favor.",
    "audio": "talk/dialogues/at-the-doctor/2bb02bc5e904.mp3",
    "next": "doc"
   },
   "doc": {
    "speaker": "d",
    "text": "Hello, come in. I'm Dr. Patel. What seems to be the problem?",
    "pt": "Olá, entre. Sou a doutora Patel. Qual parece ser o problema?",
    "audio": "talk/dialogues/at-the-doctor/17c8f18e526b.mp3",
    "options": [
     {
      "text": "I've had a sore throat and a fever for three days.",
      "pt": "Estou com dor de garganta e febre há três dias.",
      "audio": "talk/dialogues/at-the-doctor/1becf0ac2898.mp3",
      "next": "throat"
     },
     {
      "text": "I've had a terrible headache since yesterday.",
      "pt": "Estou com uma dor de cabeça terrível desde ontem.",
      "audio": "talk/dialogues/at-the-doctor/4f6f75a9e156.mp3",
      "next": "head"
     },
     {
      "text": "I work from Monday to Friday.",
      "pt": "Trabalho de segunda a sexta.",
      "audio": "talk/dialogues/at-the-doctor/8b97093c66a3.mp3",
      "next": null,
      "react": {
       "text": "I see. But tell me, how are you feeling? What brings you here?",
       "pt": "Entendo. Mas me conte, como você está se sentindo? O que te traz aqui?",
       "audio": "talk/dialogues/at-the-doctor/fec3d1d63213.mp3"
      }
     }
    ]
   },
   "throat": {
    "speaker": "d",
    "text": "I see. Have you taken any medicine?",
    "pt": "Entendo. Você tomou algum remédio?",
    "audio": "talk/dialogues/at-the-doctor/7f6182097a88.mp3",
    "options": [
     {
      "text": "Just some paracetamol.",
      "pt": "Só um pouco de paracetamol.",
      "audio": "talk/dialogues/at-the-doctor/9dc0c92b65df.mp3",
      "next": "examine"
     },
     {
      "text": "No, nothing yet.",
      "pt": "Não, nada ainda.",
      "audio": "talk/dialogues/at-the-doctor/e499022077cd.mp3",
      "next": "examine"
     },
     {
      "text": "Yes, I take the bus.",
      "pt": "Sim, eu pego ônibus.",
      "audio": "talk/dialogues/at-the-doctor/9b18b7f6011b.mp3",
      "next": null,
      "react": {
       "text": "Sorry, I mean medicine. Have you taken anything for the fever?",
       "pt": "Desculpe, falo de remédio. Você tomou algo para a febre?",
       "audio": "talk/dialogues/at-the-doctor/5461ba77ebbd.mp3"
      }
     }
    ]
   },
   "examine": {
    "speaker": "d",
    "text": "Okay, let me have a look. Open your mouth and say ah. Yes, your throat is quite red.",
    "pt": "Certo, deixe-me ver. Abra a boca e diga ah. Sim, sua garganta está bem vermelha.",
    "audio": "talk/dialogues/at-the-doctor/90026119ccc7.mp3",
    "next": "throat2"
   },
   "throat2": {
    "speaker": "d",
    "text": "It looks like an infection. Are you allergic to any antibiotics?",
    "pt": "Parece uma infecção. Você tem alergia a algum antibiótico?",
    "audio": "talk/dialogues/at-the-doctor/75826d523a80.mp3",
    "options": [
     {
      "text": "Yes, I'm allergic to penicillin.",
      "pt": "Sim, sou alérgico à penicilina.",
      "audio": "talk/dialogues/at-the-doctor/fe34b0ff64e1.mp3",
      "next": "peni"
     },
     {
      "text": "No, not that I know of.",
      "pt": "Não, que eu saiba não.",
      "audio": "talk/dialogues/at-the-doctor/9ab11a2701d0.mp3",
      "next": "presc"
     },
     {
      "text": "I'm allergic to my boss.",
      "pt": "Sou alérgico ao meu chefe.",
      "audio": "talk/dialogues/at-the-doctor/4005a0f327d4.mp3",
      "next": null,
      "react": {
       "text": "Ha! I understand. But seriously, any allergies to medicine?",
       "pt": "Rá! Entendo. Mas falando sério, alergia a algum remédio?",
       "audio": "talk/dialogues/at-the-doctor/293112434a65.mp3"
      }
     }
    ]
   },
   "peni": {
    "speaker": "d",
    "text": "Good thing you told me. I'll prescribe a different antibiotic.",
    "pt": "Ainda bem que você falou. Vou receitar outro antibiótico.",
    "audio": "talk/dialogues/at-the-doctor/ff9b8ea86285.mp3",
    "next": "presc"
   },
   "presc": {
    "speaker": "d",
    "text": "Take one pill twice a day for seven days, after meals. Is that clear?",
    "pt": "Tome um comprimido duas vezes por dia, por sete dias, depois das refeições. Ficou claro?",
    "audio": "talk/dialogues/at-the-doctor/a3f51c4ca5e0.mp3",
    "options": [
     {
      "text": "Twice a day after meals. Got it.",
      "pt": "Duas vezes por dia depois das refeições. Entendi.",
      "audio": "talk/dialogues/at-the-doctor/85033466c178.mp3",
      "next": "rest"
     },
     {
      "text": "Can I take it with coffee?",
      "pt": "Posso tomar com café?",
      "audio": "talk/dialogues/at-the-doctor/38184d376a1c.mp3",
      "next": "coffee"
     },
     {
      "text": "It's very clear outside today.",
      "pt": "O céu está bem limpo hoje.",
      "audio": "talk/dialogues/at-the-doctor/e2cf40a58e46.mp3",
      "next": null,
      "react": {
       "text": "Ha, it is. But do you understand how to take the medicine?",
       "pt": "Rá, está mesmo. Mas você entendeu como tomar o remédio?",
       "audio": "talk/dialogues/at-the-doctor/b50ae7c036eb.mp3"
      }
     }
    ]
   },
   "coffee": {
    "speaker": "d",
    "text": "It's better with water. And please avoid alcohol while you're taking it.",
    "pt": "É melhor com água. E, por favor, evite bebida alcoólica enquanto estiver tomando.",
    "audio": "talk/dialogues/at-the-doctor/0b5c180cdeff.mp3",
    "next": "rest"
   },
   "rest": {
    "speaker": "d",
    "text": "You should also rest and drink plenty of fluids. Do you need a note for work?",
    "pt": "Você também deve descansar e beber bastante líquido. Precisa de um atestado para o trabalho?",
    "audio": "talk/dialogues/at-the-doctor/d491857a0ce1.mp3",
    "options": [
     {
      "text": "Yes, please. I can't work like this.",
      "pt": "Sim, por favor. Não consigo trabalhar assim.",
      "audio": "talk/dialogues/at-the-doctor/ade1c6f19143.mp3",
      "next": "note"
     },
     {
      "text": "No, I work from home.",
      "pt": "Não, eu trabalho de casa.",
      "audio": "talk/dialogues/at-the-doctor/ccfd9be20804.mp3",
      "next": "end"
     },
     {
      "text": "I wrote a note to my mother.",
      "pt": "Escrevi um bilhete para minha mãe.",
      "audio": "talk/dialogues/at-the-doctor/c39580ac46c7.mp3",
      "next": null,
      "react": {
       "text": "That's sweet. But do you need a medical note for your job?",
       "pt": "Que fofo. Mas você precisa de atestado médico para o trabalho?",
       "audio": "talk/dialogues/at-the-doctor/3e487a78c84d.mp3"
      }
     }
    ]
   },
   "note": {
    "speaker": "d",
    "text": "Here you go. I'm giving you three days off.",
    "pt": "Aqui está. Estou te dando três dias de afastamento.",
    "audio": "talk/dialogues/at-the-doctor/f371064ab8b7.mp3",
    "next": "end"
   },
   "head": {
    "speaker": "d",
    "text": "I'm sorry to hear that. Is it the first time you've had a headache like this?",
    "pt": "Sinto muito. É a primeira vez que você tem uma dor de cabeça assim?",
    "audio": "talk/dialogues/at-the-doctor/feb023b06b03.mp3",
    "options": [
     {
      "text": "Yes, it's the first time.",
      "pt": "Sim, é a primeira vez.",
      "audio": "talk/dialogues/at-the-doctor/c722ce6b36d5.mp3",
      "next": "head2"
     },
     {
      "text": "No, I get them quite often.",
      "pt": "Não, eu tenho com frequência.",
      "audio": "talk/dialogues/at-the-doctor/a03f042132b7.mp3",
      "next": "often"
     },
     {
      "text": "My head is a normal size.",
      "pt": "Minha cabeça tem tamanho normal.",
      "audio": "talk/dialogues/at-the-doctor/3c50409d0e95.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, have you had headaches like this before?",
       "pt": "Rá. Quero dizer, você já teve dores de cabeça assim antes?",
       "audio": "talk/dialogues/at-the-doctor/9f12c8a58d17.mp3"
      }
     }
    ]
   },
   "often": {
    "speaker": "d",
    "text": "Then we should try to find the cause.",
    "pt": "Então devemos tentar descobrir a causa.",
    "audio": "talk/dialogues/at-the-doctor/0c8d72305fd4.mp3",
    "next": "head2"
   },
   "head2": {
    "speaker": "d",
    "text": "Have you been sleeping well? And how many hours a day do you spend in front of a screen?",
    "pt": "Você tem dormido bem? E quantas horas por dia passa na frente de uma tela?",
    "audio": "talk/dialogues/at-the-doctor/f065b54c3951.mp3",
    "options": [
     {
      "text": "Not really. And I spend about ten hours at the computer.",
      "pt": "Não muito. E passo umas dez horas no computador.",
      "audio": "talk/dialogues/at-the-doctor/383e92ba0171.mp3",
      "next": "screen"
     },
     {
      "text": "I sleep well, but I work at a computer all day.",
      "pt": "Durmo bem, mas trabalho no computador o dia inteiro.",
      "audio": "talk/dialogues/at-the-doctor/0e63b5a8503c.mp3",
      "next": "screen"
     },
     {
      "text": "I sleep in a very big bed.",
      "pt": "Durmo numa cama muito grande.",
      "audio": "talk/dialogues/at-the-doctor/c77e093a49b4.mp3",
      "next": null,
      "react": {
       "text": "Lucky you! But do you sleep well? And how much screen time do you have?",
       "pt": "Que sorte! Mas você dorme bem? E quanto tempo passa na tela?",
       "audio": "talk/dialogues/at-the-doctor/a9c9b49eb776.mp3"
      }
     }
    ]
   },
   "screen": {
    "speaker": "d",
    "text": "That could be it. Too much screen time and too little sleep often cause headaches.",
    "pt": "Pode ser isso. Tempo demais na tela e pouco sono costumam causar dor de cabeça.",
    "audio": "talk/dialogues/at-the-doctor/d5b528b0f131.mp3",
    "next": "head3"
   },
   "head3": {
    "speaker": "d",
    "text": "I'd like you to take a break every hour and get your eyes checked. Can you do that?",
    "pt": "Quero que você faça uma pausa a cada hora e faça um exame de vista. Consegue fazer isso?",
    "audio": "talk/dialogues/at-the-doctor/8376bd60606c.mp3",
    "options": [
     {
      "text": "Sure. Should I take anything for the pain?",
      "pt": "Claro. Devo tomar algo para a dor?",
      "audio": "talk/dialogues/at-the-doctor/034895463e0f.mp3",
      "next": "painkiller"
     },
     {
      "text": "Yes, I'll book an eye test this week.",
      "pt": "Sim, vou marcar um exame de vista esta semana.",
      "audio": "talk/dialogues/at-the-doctor/ebd354538c1e.mp3",
      "next": "end"
     },
     {
      "text": "I can do ten push-ups.",
      "pt": "Consigo fazer dez flexões.",
      "audio": "talk/dialogues/at-the-doctor/27887896a08f.mp3",
      "next": null,
      "react": {
       "text": "Impressive! But can you take breaks and check your eyes?",
       "pt": "Impressionante! Mas consegue fazer pausas e examinar a vista?",
       "audio": "talk/dialogues/at-the-doctor/2de42f427b78.mp3"
      }
     }
    ]
   },
   "painkiller": {
    "speaker": "d",
    "text": "You can take ibuprofen, but no more than three times a day.",
    "pt": "Você pode tomar ibuprofeno, mas no máximo três vezes por dia.",
    "audio": "talk/dialogues/at-the-doctor/f87cc77e658c.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "d",
    "text": "If you don't feel better in a few days, come back and see me. Take care!",
    "pt": "Se não melhorar em alguns dias, volte para me ver. Se cuide!",
    "audio": "talk/dialogues/at-the-doctor/0796e15d7433.mp3",
    "end": true
   }
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
      "audio": "talk/dialogues/job-interview/beb96a9eaa7d.mp3",
      "next": "j3"
     },
     {
      "text": "It took a while, but I made it!",
      "pt": "Demorou um pouco, mas cheguei!",
      "audio": "talk/dialogues/job-interview/2064b3acc952.mp3",
      "next": "j3"
     },
     {
      "text": "I've worked in sales for five years.",
      "pt": "Trabalho com vendas há cinco anos.",
      "audio": "talk/dialogues/job-interview/8c92bc01ba77.mp3",
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
      "audio": "talk/dialogues/job-interview/7afc83b3cad0.mp3",
      "next": "why"
     },
     {
      "text": "I studied business, and I've been working in sales for four years.",
      "pt": "Estudei administração e trabalho com vendas há quatro anos.",
      "audio": "talk/dialogues/job-interview/bf7f0792e8ae.mp3",
      "next": "why"
     },
     {
      "text": "I'm fine, thank you.",
      "pt": "Estou bem, obrigado.",
      "audio": "talk/dialogues/job-interview/75dc314ba1f8.mp3",
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
      "audio": "talk/dialogues/job-interview/b510b3992968.mp3",
      "next": "strength"
     },
     {
      "text": "I'm looking for new challenges and a chance to grow.",
      "pt": "Estou buscando novos desafios e uma chance de crescer.",
      "audio": "talk/dialogues/job-interview/41469a668a10.mp3",
      "next": "strength"
     },
     {
      "text": "Because I don't like Mondays.",
      "pt": "Porque eu não gosto de segunda-feira.",
      "audio": "talk/dialogues/job-interview/77c3ce25f9ff.mp3",
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
      "audio": "talk/dialogues/job-interview/9c8f14a810a6.mp3",
      "next": "weak"
     },
     {
      "text": "I'm a good communicator and a team player.",
      "pt": "Sou bom comunicador e gosto de trabalhar em equipe.",
      "audio": "talk/dialogues/job-interview/780766d5751b.mp3",
      "next": "weak"
     },
     {
      "text": "I was born in Recife.",
      "pt": "Nasci em Recife.",
      "audio": "talk/dialogues/job-interview/0bf4ce5e7113.mp3",
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
      "audio": "talk/dialogues/job-interview/5c8bb0020f36.mp3",
      "next": "meet"
     },
     {
      "text": "I find public speaking hard, so I'm taking a course.",
      "pt": "Acho difícil falar em público, então estou fazendo um curso.",
      "audio": "talk/dialogues/job-interview/5d3c4a916215.mp3",
      "next": "meet"
     },
     {
      "text": "Next Friday is fine.",
      "pt": "Sexta que vem está bom.",
      "audio": "talk/dialogues/job-interview/92cdd9a523b8.mp3",
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
    "audio": "talk/dialogues/job-interview/265b5ec1b6bc.mp3",
    "options": [
     {
      "text": "Once, a big client wanted to cancel, and I convinced them to stay.",
      "pt": "Uma vez, um cliente grande queria cancelar, e eu convenci ele a ficar.",
      "audio": "talk/dialogues/job-interview/dd1ab8bca40a.mp3",
      "next": "client"
     },
     {
      "text": "Our team was missing deadlines, so I created a new schedule.",
      "pt": "Nossa equipe perdia prazos, então criei um novo cronograma.",
      "audio": "talk/dialogues/job-interview/3d8d002c816b.mp3",
      "next": "deadline"
     },
     {
      "text": "Yes, I solved a crossword yesterday.",
      "pt": "Sim, resolvi uma palavra cruzada ontem.",
      "audio": "talk/dialogues/job-interview/c1d37eb4abd5.mp3",
      "next": null,
      "react": {
       "text": "Ha! I meant a problem at work.",
       "pt": "Rá! Eu quis dizer um problema no trabalho.",
       "audio": "talk/dialogues/job-interview/4a752f1946fc.mp3"
      }
     }
    ]
   },
   "client": {
    "speaker": "t",
    "text": "Interesting. How did you do that?",
    "pt": "Interessante. Como você fez isso?",
    "audio": "talk/dialogues/job-interview/a31b2265909f.mp3",
    "options": [
     {
      "text": "I listened to their complaints and offered them a better plan.",
      "pt": "Ouvi as reclamações e ofereci um plano melhor.",
      "audio": "talk/dialogues/job-interview/35843044f683.mp3",
      "next": "salary"
     },
     {
      "text": "I visited them in person and fixed the problem quickly.",
      "pt": "Fui pessoalmente até eles e resolvi o problema rápido.",
      "audio": "talk/dialogues/job-interview/96b76142277d.mp3",
      "next": "salary"
     },
     {
      "text": "With a pen and paper.",
      "pt": "Com papel e caneta.",
      "audio": "talk/dialogues/job-interview/ec04bdc90e05.mp3",
      "next": null,
      "react": {
       "text": "Hmm. Can you explain how you convinced the client?",
       "pt": "Hum. Pode explicar como convenceu o cliente?",
       "audio": "talk/dialogues/job-interview/9b1402d884cc.mp3"
      }
     }
    ]
   },
   "deadline": {
    "speaker": "t",
    "text": "And did it work?",
    "pt": "E funcionou?",
    "audio": "talk/dialogues/job-interview/00dccda58a3c.mp3",
    "options": [
     {
      "text": "Yes, we delivered every project on time after that.",
      "pt": "Sim, entregamos todos os projetos no prazo depois disso.",
      "audio": "talk/dialogues/job-interview/b7beec4186c7.mp3",
      "next": "salary"
     },
     {
      "text": "It took a few weeks, but now the team is much faster.",
      "pt": "Levou algumas semanas, mas agora a equipe está bem mais rápida.",
      "audio": "talk/dialogues/job-interview/9512669cc15a.mp3",
      "next": "salary"
     },
     {
      "text": "I work Monday to Friday.",
      "pt": "Trabalho de segunda a sexta.",
      "audio": "talk/dialogues/job-interview/463f2a1ae569.mp3",
      "next": null,
      "react": {
       "text": "Sure, but did the new schedule work?",
       "pt": "Certo, mas o novo cronograma funcionou?",
       "audio": "talk/dialogues/job-interview/db283e918480.mp3"
      }
     }
    ]
   },
   "salary": {
    "speaker": "t",
    "text": "Good. What are your salary expectations?",
    "pt": "Bom. Qual é a sua pretensão salarial?",
    "audio": "talk/dialogues/job-interview/819c80136c2b.mp3",
    "options": [
     {
      "text": "Something between five and six thousand a month.",
      "pt": "Algo entre cinco e seis mil por mês.",
      "audio": "talk/dialogues/job-interview/bf47f3e19850.mp3",
      "next": "start"
     },
     {
      "text": "I'd like to know more about the benefits first.",
      "pt": "Gostaria de saber mais sobre os benefícios primeiro.",
      "audio": "talk/dialogues/job-interview/852b60bc5f0c.mp3",
      "next": "benefits"
     },
     {
      "text": "I expect it to rain later.",
      "pt": "Acho que vai chover mais tarde.",
      "audio": "talk/dialogues/job-interview/d6ee5a288d3b.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, how much would you like to earn?",
       "pt": "Rá. Quero dizer, quanto você gostaria de ganhar?",
       "audio": "talk/dialogues/job-interview/5b6c81867d7b.mp3"
      }
     }
    ]
   },
   "benefits": {
    "speaker": "t",
    "text": "Of course. We offer health insurance, a yearly bonus, and two days a week working from home.",
    "pt": "Claro. Oferecemos plano de saúde, bônus anual e dois dias por semana de home office.",
    "audio": "talk/dialogues/job-interview/26c3dc64aa78.mp3",
    "next": "start"
   },
   "start": {
    "speaker": "t",
    "text": "If we offer you the job, when could you start?",
    "pt": "Se oferecermos a vaga, quando você poderia começar?",
    "audio": "talk/dialogues/job-interview/30241f6ede1e.mp3",
    "options": [
     {
      "text": "I could start in two weeks.",
      "pt": "Poderia começar em duas semanas.",
      "audio": "talk/dialogues/job-interview/7f4b784e0d17.mp3",
      "next": "qs"
     },
     {
      "text": "I need to give one month's notice, so next month.",
      "pt": "Preciso cumprir um mês de aviso prévio, então no mês que vem.",
      "audio": "talk/dialogues/job-interview/221addd65296.mp3",
      "next": "qs"
     },
     {
      "text": "I started at eight o'clock today.",
      "pt": "Comecei às oito horas hoje.",
      "audio": "talk/dialogues/job-interview/ea03dad1c64a.mp3",
      "next": null,
      "react": {
       "text": "I mean, if you get the job, when would you be available?",
       "pt": "Quero dizer, se conseguir a vaga, quando estaria disponível?",
       "audio": "talk/dialogues/job-interview/99372d81b6d1.mp3"
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
      "audio": "talk/dialogues/job-interview/28de30fef65f.mp3",
      "next": "day"
     },
     {
      "text": "When will I hear back from you?",
      "pt": "Quando vocês me dão um retorno?",
      "audio": "talk/dialogues/job-interview/73b4aed89d45.mp3",
      "next": "hear"
     },
     {
      "text": "Yes, I have two sisters.",
      "pt": "Sim, tenho duas irmãs.",
      "audio": "talk/dialogues/job-interview/8b029f1b3888.mp3",
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
    "audio": "talk/dialogues/job-interview/9737c9eb18bb.mp3",
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
    "audio": "talk/dialogues/the-witness/2d24f324b6ef.mp3",
    "next": "p2"
   },
   "p2": {
    "speaker": "h",
    "text": "Thank you for staying. You were at the jewelry store at the time of the robbery, is that right?",
    "pt": "Obrigado por ficar. Você estava na joalheria na hora do assalto, certo?",
    "audio": "talk/dialogues/the-witness/bfdb11467959.mp3",
    "options": [
     {
      "text": "Yes, I was buying a watch when it happened.",
      "pt": "Sim, eu estava comprando um relógio quando aconteceu.",
      "audio": "talk/dialogues/the-witness/20aabffafab5.mp3",
      "next": "what"
     },
     {
      "text": "I was across the street, but I saw everything.",
      "pt": "Eu estava do outro lado da rua, mas vi tudo.",
      "audio": "talk/dialogues/the-witness/8d7da380226f.mp3",
      "next": "what"
     },
     {
      "text": "I bought this jacket last year.",
      "pt": "Comprei esta jaqueta ano passado.",
      "audio": "talk/dialogues/the-witness/5491a4ee892f.mp3",
      "next": null,
      "react": {
       "text": "I'm asking about this morning. Were you at the store?",
       "pt": "Estou perguntando sobre hoje de manhã. Você estava na loja?",
       "audio": "talk/dialogues/the-witness/54e0c28dcb0a.mp3"
      }
     }
    ]
   },
   "what": {
    "speaker": "h",
    "text": "Can you tell me what you saw?",
    "pt": "Pode me contar o que você viu?",
    "audio": "talk/dialogues/the-witness/0b2163bbcca2.mp3",
    "options": [
     {
      "text": "A man came in with a mask and asked for the money.",
      "pt": "Um homem entrou de máscara e pediu o dinheiro.",
      "audio": "talk/dialogues/the-witness/d2f081ebcb5d.mp3",
      "next": "man"
     },
     {
      "text": "Two people ran out of the store and got into a car.",
      "pt": "Duas pessoas saíram correndo da loja e entraram num carro.",
      "audio": "talk/dialogues/the-witness/d697ba55a04b.mp3",
      "next": "car"
     },
     {
      "text": "I saw a great movie last night.",
      "pt": "Vi um filme ótimo ontem à noite.",
      "audio": "talk/dialogues/the-witness/bdd1142f2808.mp3",
      "next": null,
      "react": {
       "text": "Let's focus on this morning, please. What did you see?",
       "pt": "Vamos focar em hoje de manhã, por favor. O que você viu?",
       "audio": "talk/dialogues/the-witness/d76102a56692.mp3"
      }
     }
    ]
   },
   "man": {
    "speaker": "h",
    "text": "What did he look like?",
    "pt": "Como ele era?",
    "audio": "talk/dialogues/the-witness/53e96cc2644d.mp3",
    "options": [
     {
      "text": "He was tall, and he was wearing a black hoodie.",
      "pt": "Ele era alto e usava um moletom preto com capuz.",
      "audio": "talk/dialogues/the-witness/d708062d8f6b.mp3",
      "next": "voice"
     },
     {
      "text": "I couldn't see his face, but he had a tattoo on his hand.",
      "pt": "Não consegui ver o rosto, mas ele tinha uma tatuagem na mão.",
      "audio": "talk/dialogues/the-witness/dd47ea5ea602.mp3",
      "next": "tattoo"
     },
     {
      "text": "He likes football.",
      "pt": "Ele gosta de futebol.",
      "audio": "talk/dialogues/the-witness/30a87cfc7721.mp3",
      "next": null,
      "react": {
       "text": "How would you know that? I mean, describe how he looked.",
       "pt": "Como você saberia disso? Quero dizer, descreva a aparência dele.",
       "audio": "talk/dialogues/the-witness/0b5433d0b4db.mp3"
      }
     }
    ]
   },
   "tattoo": {
    "speaker": "h",
    "text": "A tattoo? That's very useful. What was it?",
    "pt": "Uma tatuagem? Isso ajuda muito. Do que era?",
    "audio": "talk/dialogues/the-witness/1f142c8ef83c.mp3",
    "options": [
     {
      "text": "It looked like a snake.",
      "pt": "Parecia uma cobra.",
      "audio": "talk/dialogues/the-witness/e6d69849f90f.mp3",
      "next": "voice"
     },
     {
      "text": "I'm not sure. Some kind of bird, I think.",
      "pt": "Não tenho certeza. Algum tipo de pássaro, acho.",
      "audio": "talk/dialogues/the-witness/b2a3a70cd5da.mp3",
      "next": "voice"
     },
     {
      "text": "It was a Tuesday.",
      "pt": "Era uma terça-feira.",
      "audio": "talk/dialogues/the-witness/3a374d55590b.mp3",
      "next": null,
      "react": {
       "text": "No, the tattoo. What did it look like?",
       "pt": "Não, a tatuagem. Como ela era?",
       "audio": "talk/dialogues/the-witness/1b1a6282a887.mp3"
      }
     }
    ]
   },
   "voice": {
    "speaker": "h",
    "text": "Did he say anything? Did you notice an accent?",
    "pt": "Ele disse alguma coisa? Você notou algum sotaque?",
    "audio": "talk/dialogues/the-witness/4c50c3fd24d0.mp3",
    "options": [
     {
      "text": "He shouted, hurry up, and he had a British accent.",
      "pt": "Ele gritou, anda logo, e tinha sotaque britânico.",
      "audio": "talk/dialogues/the-witness/84e5612063c2.mp3",
      "next": "car"
     },
     {
      "text": "He didn't say much. He just pointed at the cash register.",
      "pt": "Ele não falou muito. Só apontou para o caixa.",
      "audio": "talk/dialogues/the-witness/4f26a16cc10e.mp3",
      "next": "car"
     },
     {
      "text": "I speak English and Portuguese.",
      "pt": "Falo inglês e português.",
      "audio": "talk/dialogues/the-witness/586fe09c9d68.mp3",
      "next": null,
      "react": {
       "text": "Good, but I mean, did the robber say anything?",
       "pt": "Ótimo, mas quero dizer, o ladrão falou alguma coisa?",
       "audio": "talk/dialogues/the-witness/580736b9b791.mp3"
      }
     }
    ]
   },
   "car": {
    "speaker": "h",
    "text": "And did you see a car?",
    "pt": "E você viu algum carro?",
    "audio": "talk/dialogues/the-witness/1a8e27a47693.mp3",
    "options": [
     {
      "text": "Yes, a white van. I think the plate started with K.",
      "pt": "Sim, uma van branca. Acho que a placa começava com K.",
      "audio": "talk/dialogues/the-witness/a87fe63db787.mp3",
      "next": "plate"
     },
     {
      "text": "Yes, a small red car drove away very fast.",
      "pt": "Sim, um carro vermelho pequeno saiu em alta velocidade.",
      "audio": "talk/dialogues/the-witness/e5233bed78cf.mp3",
      "next": "direction"
     },
     {
      "text": "I don't have a car.",
      "pt": "Eu não tenho carro.",
      "audio": "talk/dialogues/the-witness/1e8e23e986e5.mp3",
      "next": null,
      "react": {
       "text": "I mean the robbers. Did they leave in a car?",
       "pt": "Falo dos ladrões. Eles fugiram de carro?",
       "audio": "talk/dialogues/the-witness/1285d29802e2.mp3"
      }
     }
    ]
   },
   "plate": {
    "speaker": "o",
    "text": "Detective, a white van with a plate starting with K was just stopped on the highway.",
    "pt": "Detetive, uma van branca com placa começando com K acabou de ser parada na rodovia.",
    "audio": "talk/dialogues/the-witness/3a863707e0ec.mp3",
    "next": "identify"
   },
   "identify": {
    "speaker": "h",
    "text": "Excellent. Would you be able to recognize the man if you saw him again?",
    "pt": "Excelente. Você conseguiria reconhecer o homem se o visse de novo?",
    "audio": "talk/dialogues/the-witness/4daf723be900.mp3",
    "options": [
     {
      "text": "Yes, I think so.",
      "pt": "Sim, acho que sim.",
      "audio": "talk/dialogues/the-witness/bcc812016f16.mp3",
      "next": "photos"
     },
     {
      "text": "I'm not sure. It all happened so fast.",
      "pt": "Não tenho certeza. Foi tudo muito rápido.",
      "audio": "talk/dialogues/the-witness/6a140e79e0a7.mp3",
      "next": "photos"
     },
     {
      "text": "I saw him on TV last week.",
      "pt": "Vi ele na TV semana passada.",
      "audio": "talk/dialogues/the-witness/8c272b3be057.mp3",
      "next": null,
      "react": {
       "text": "Really? Hmm, let's stay with this morning. Could you recognize him again?",
       "pt": "Sério? Hum, vamos ficar em hoje de manhã. Você conseguiria reconhecê-lo de novo?",
       "audio": "talk/dialogues/the-witness/d7828b404ae2.mp3"
      }
     }
    ]
   },
   "direction": {
    "speaker": "h",
    "text": "Which way did it go?",
    "pt": "Para que lado ele foi?",
    "audio": "talk/dialogues/the-witness/859c5016f337.mp3",
    "options": [
     {
      "text": "It turned left onto Main Street.",
      "pt": "Virou à esquerda na rua principal.",
      "audio": "talk/dialogues/the-witness/60ae7e8c945c.mp3",
      "next": "photos"
     },
     {
      "text": "It went towards the bridge.",
      "pt": "Foi em direção à ponte.",
      "audio": "talk/dialogues/the-witness/74a127562bc2.mp3",
      "next": "photos"
     },
     {
      "text": "It went very well, thank you.",
      "pt": "Foi tudo muito bem, obrigado.",
      "audio": "talk/dialogues/the-witness/b874c46b2ce1.mp3",
      "next": null,
      "react": {
       "text": "I mean the car. Which direction did it go?",
       "pt": "Falo do carro. Para que direção ele foi?",
       "audio": "talk/dialogues/the-witness/ecfccb27e38c.mp3"
      }
     }
    ]
   },
   "photos": {
    "speaker": "h",
    "text": "Thank you. Could you come to the station tomorrow to look at some photos?",
    "pt": "Obrigado. Você poderia ir à delegacia amanhã para ver algumas fotos?",
    "audio": "talk/dialogues/the-witness/29668bb9f2fd.mp3",
    "options": [
     {
      "text": "Of course. What time should I come?",
      "pt": "Claro. Que horas devo ir?",
      "audio": "talk/dialogues/the-witness/2c6b86d89d17.mp3",
      "next": "time"
     },
     {
      "text": "I work tomorrow. Could I come on Saturday?",
      "pt": "Trabalho amanhã. Posso ir no sábado?",
      "audio": "talk/dialogues/the-witness/1dbc331961a6.mp3",
      "next": "saturday"
     },
     {
      "text": "I love taking photos.",
      "pt": "Adoro tirar fotos.",
      "audio": "talk/dialogues/the-witness/a0ef57eafece.mp3",
      "next": null,
      "react": {
       "text": "Ha. I mean, can you come to the police station to see some photos?",
       "pt": "Rá. Quero dizer, pode ir à delegacia ver algumas fotos?",
       "audio": "talk/dialogues/the-witness/29ad532d3bd9.mp3"
      }
     }
    ]
   },
   "time": {
    "speaker": "h",
    "text": "Any time after nine. Ask for me at the front desk.",
    "pt": "A qualquer hora depois das nove. Pergunte por mim na recepção.",
    "audio": "talk/dialogues/the-witness/36ca66ac77c2.mp3",
    "next": "end"
   },
   "saturday": {
    "speaker": "h",
    "text": "Saturday is fine. Here's my card. Call me if you remember anything else.",
    "pt": "Sábado está ótimo. Aqui está meu cartão. Me ligue se lembrar de mais alguma coisa.",
    "audio": "talk/dialogues/the-witness/d7b654d0cb0e.mp3",
    "next": "end"
   },
   "end": {
    "speaker": "h",
    "text": "You've been very helpful. Officer Ruiz will take your contact details. Thank you.",
    "pt": "Você ajudou muito. A policial Ruiz vai anotar seus contatos. Obrigado.",
    "audio": "talk/dialogues/the-witness/8f04b69c5d02.mp3",
    "end": true
   }
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
      "audio": "talk/dialogues/the-team-meeting/82b379daabab.mp3",
      "next": "behind"
     },
     {
      "text": "Of course. Everything is on track, and we should finish by Friday.",
      "pt": "Claro. Está tudo dentro do prazo e devemos terminar até sexta.",
      "audio": "talk/dialogues/the-team-meeting/4c1b6d6b6dad.mp3",
      "next": "ontrack"
     },
     {
      "text": "I updated my phone last night.",
      "pt": "Atualizei meu celular ontem à noite.",
      "audio": "talk/dialogues/the-team-meeting/6a802c90570e.mp3",
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
      "audio": "talk/dialogues/the-team-meeting/cdada66dde27.mp3",
      "next": "behind"
     },
     {
      "text": "Yes, but most of them are minor and easy to fix.",
      "pt": "Sim, mas a maioria é pequena e fácil de corrigir.",
      "audio": "talk/dialogues/the-team-meeting/31c7d2e8e47f.mp3",
      "next": "minor"
     },
     {
      "text": "True, it's very sunny today.",
      "pt": "Verdade, está bem ensolarado hoje.",
      "audio": "talk/dialogues/the-team-meeting/2d16a4405921.mp3",
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
      "audio": "talk/dialogues/the-team-meeting/739375b1739f.mp3",
      "next": "delay"
     },
     {
      "text": "If we get one more tester, we can finish in a week.",
      "pt": "Se tivermos mais um testador, terminamos em uma semana.",
      "audio": "talk/dialogues/the-team-meeting/c05689d613d7.mp3",
      "next": "tester"
     },
     {
      "text": "Three o'clock is fine.",
      "pt": "Três horas está bom.",
      "audio": "talk/dialogues/the-team-meeting/c4a4e45dd591.mp3",
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
      "audio": "talk/dialogues/the-team-meeting/beb6bec136b1.mp3",
      "next": "agree"
     },
     {
      "text": "I'm not sure. Users might be disappointed.",
      "pt": "Não sei. Os usuários podem ficar decepcionados.",
      "audio": "talk/dialogues/the-team-meeting/5e05f0e6ff87.mp3",
      "next": "disagree"
     },
     {
      "text": "I added sugar to my coffee.",
      "pt": "Coloquei açúcar no meu café.",
      "audio": "talk/dialogues/the-team-meeting/a493dc739622.mp3",
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
      "audio": "talk/dialogues/the-team-meeting/766068bef20a.mp3",
      "next": "agree"
     },
     {
      "text": "The payment screen has to work perfectly. The rest can wait.",
      "pt": "A tela de pagamento tem que funcionar perfeitamente. O resto pode esperar.",
      "audio": "talk/dialogues/the-team-meeting/e971ec931e00.mp3",
      "next": "agree"
     },
     {
      "text": "The ground floor is fine.",
      "pt": "O térreo está bom.",
      "audio": "talk/dialogues/the-team-meeting/2cf20cc38a8e.mp3",
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
      "audio": "talk/dialogues/the-team-meeting/6f90fc2fb709.mp3",
      "next": "summary"
     },
     {
      "text": "Could she start tomorrow instead?",
      "pt": "Ela poderia começar amanhã?",
      "audio": "talk/dialogues/the-team-meeting/35d4c8ee19cd.mp3",
      "next": "tomorrow"
     },
     {
      "text": "I work out three times a week.",
      "pt": "Malho três vezes por semana.",
      "audio": "talk/dialogues/the-team-meeting/92d028c95616.mp3",
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
      "audio": "talk/dialogues/the-team-meeting/e2fb0d87f292.mp3",
      "next": "thursday"
     },
     {
      "text": "Kevin, could you do it this time?",
      "pt": "Kevin, você pode fazer desta vez?",
      "audio": "talk/dialogues/the-team-meeting/fbf39ad29826.mp3",
      "next": "kevin"
     },
     {
      "text": "It's sunny outside.",
      "pt": "Está ensolarado lá fora.",
      "audio": "talk/dialogues/the-team-meeting/5bee3c33c721.mp3",
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
      "audio": "talk/dialogues/the-team-meeting/12092b0cbc28.mp3",
      "next": "end"
     },
     {
      "text": "Could we make it eleven? I have a call at ten.",
      "pt": "Podemos fazer às onze? Tenho uma ligação às dez.",
      "audio": "talk/dialogues/the-team-meeting/84be9bc61863.mp3",
      "next": "eleven"
     },
     {
      "text": "I have ten fingers.",
      "pt": "Tenho dez dedos.",
      "audio": "talk/dialogues/the-team-meeting/4db9892af80f.mp3",
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
  }
 }
];
