// GERADO por talk-tts/gen_dialogues.py. Não editar à mão.
import type { TalkTownSeason } from './types';

export const TALK_TOWN: TalkTownSeason = {
 "season": 1,
 "title": "O mistério de Millbrook",
 "subtitle": "Sua primeira semana numa cidadezinha inglesa à beira-mar. Um pote de doações desaparece, e você, recém-contratado(a) pelo jornal da cidade, vai descobrir o que aconteceu ouvindo as pessoas.",
 "clues": {
  "red_jacket": {
   "title": "Jaqueta vermelha",
   "note": "Na hora em que o pote sumiu, alguém de jaqueta vermelha saiu do café com pressa."
  },
  "heavy_bag": {
   "title": "Sacola que tilintava",
   "note": "O Sr. Hughes viu um rapaz correndo para a High Street com uma sacola pesada que fazia barulho de moedas."
  },
  "bank_holiday": {
   "title": "Banco fechado",
   "note": "Segunda-feira era feriado bancário: o banco da cidade passou o dia fechado."
  },
  "coins": {
   "title": "Troca de moedas",
   "note": "Um rapaz educado, de boné, trocou muitas moedas por notas na loja do Ravi naquela manhã."
  },
  "jar_idea": {
   "title": "A ideia do pote",
   "note": "O pote de doações para o parquinho novo foi ideia do Sam, o irmão da Emma."
  },
  "time_window": {
   "title": "Entre 9h10 e 9h20",
   "note": "O pote sumiu entre 9h10 e 9h20. A câmera do café só mostra uma manga vermelha."
  },
  "bank_question": {
   "title": "Pergunta estranha",
   "note": "Na segunda de manhã, o Sam perguntou ao Leo se o banco estava aberto, mesmo sendo feriado."
  },
  "kevin_alibi": {
   "title": "O álibi do Kevin",
   "note": "O Kevin também tem uma jaqueta vermelha, mas às 9h estava no dentista. Ele tem o recibo."
  }
 },
 "episodes": [
  {
   "slug": "town-01-a-new-start",
   "title": "A New Start",
   "level": "A1",
   "description": "Seu primeiro café em Millbrook. E um pote de doações some.",
   "intro": "Você acabou de se mudar para Millbrook, uma cidadezinha inglesa à beira-mar, para trabalhar no jornal local. É sua primeira manhã, e você entra no Corner Café.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "e": {
     "name": "Emma",
     "role": "Dona do Corner Café",
     "side": "left"
    },
    "s": {
     "name": "Sam",
     "role": "Irmão da Emma",
     "side": "right"
    }
   },
   "start": "n1",
   "decisions": [
    9,
    11
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "It's Monday morning. You are new in Millbrook, a little town by the sea.",
     "pt": "É segunda de manhã. Você acabou de chegar a Millbrook, uma cidadezinha à beira-mar.",
     "audio": "talk/town/town-01-a-new-start/7bea86b5c69e.mp3",
     "next": "n2"
    },
    "n2": {
     "speaker": "n",
     "text": "You open the door of the Corner Café. It smells of fresh bread.",
     "pt": "Você abre a porta do Corner Café. Tem cheiro de pão fresquinho.",
     "audio": "talk/town/town-01-a-new-start/508695ef010d.mp3",
     "next": "e1"
    },
    "e1": {
     "speaker": "e",
     "text": "Hi there! Welcome to the Corner Café. I'm Emma.",
     "pt": "Oi! Boas-vindas ao Corner Café. Eu sou a Emma.",
     "audio": "talk/town/town-01-a-new-start/fef55d02b067.mp3",
     "options": [
      {
       "text": "Hi, Emma. I'm new in town.",
       "pt": "Oi, Emma. Acabei de chegar na cidade.",
       "audio": "talk/town/town-01-a-new-start/c2bd8b2d0038.mp3",
       "audioF": "talk/town/town-01-a-new-start/2ce94f0bb560.mp3",
       "next": "e_new"
      },
      {
       "text": "Good morning! Nice to meet you.",
       "pt": "Bom dia! Prazer em te conhecer.",
       "audio": "talk/town/town-01-a-new-start/78d26306f77b.mp3",
       "audioF": "talk/town/town-01-a-new-start/43ee05c431cb.mp3",
       "next": "e_nice"
      },
      {
       "text": "Thanks, I'm Emma too.",
       "pt": "Valeu, eu também me chamo Emma.",
       "audio": "talk/town/town-01-a-new-start/53a6e4e95852.mp3",
       "audioF": "talk/town/town-01-a-new-start/127d9fb8d169.mp3",
       "next": null,
       "react": {
        "text": "Really? Two Emmas? I don't think so! Let's try again. Hi, I'm Emma!",
        "pt": "Sério? Duas Emmas? Acho que não! Vamos de novo. Oi, eu sou a Emma!",
        "audio": "talk/town/town-01-a-new-start/d4e41a771e2c.mp3"
       }
      }
     ]
    },
    "e_new": {
     "speaker": "e",
     "text": "New in town? Welcome to Millbrook! Where are you from?",
     "pt": "Chegou agora? Boas-vindas a Millbrook! De onde você é?",
     "audio": "talk/town/town-01-a-new-start/c91eb7a30378.mp3",
     "options": [
      {
       "text": "I'm from Brazil.",
       "pt": "Sou do Brasil.",
       "audio": "talk/town/town-01-a-new-start/02fcee559bbb.mp3",
       "audioF": "talk/town/town-01-a-new-start/962f681ec7f5.mp3",
       "next": "e_brazil"
      },
      {
       "text": "Guess!",
       "pt": "Adivinha!",
       "audio": "talk/town/town-01-a-new-start/2317d3cb8d99.mp3",
       "audioF": "talk/town/town-01-a-new-start/5d851f0f5643.mp3",
       "next": "e_guess"
      },
      {
       "text": "I'm from nine o'clock.",
       "pt": "Sou das nove horas.",
       "audio": "talk/town/town-01-a-new-start/1dbbe51816a0.mp3",
       "audioF": "talk/town/town-01-a-new-start/a4797c788b6d.mp3",
       "next": null,
       "react": {
        "text": "From nine o'clock? Ha! No, which country are you from?",
        "pt": "Das nove horas? Rá! Não, de que país você é?",
        "audio": "talk/town/town-01-a-new-start/c1d2d36990ad.mp3"
       }
      }
     ]
    },
    "e_nice": {
     "speaker": "e",
     "text": "Nice to meet you too! I don't know your face. Are you visiting?",
     "pt": "Prazer também! Não conheço seu rosto. Está de visita?",
     "audio": "talk/town/town-01-a-new-start/48744be3037f.mp3",
     "options": [
      {
       "text": "No, I live here now. I'm from Brazil.",
       "pt": "Não, agora moro aqui. Sou do Brasil.",
       "audio": "talk/town/town-01-a-new-start/ae0da836d594.mp3",
       "audioF": "talk/town/town-01-a-new-start/1cf68de52e1f.mp3",
       "next": "e_brazil"
      },
      {
       "text": "No, I have a new job here. At the newspaper.",
       "pt": "Não, tenho um emprego novo aqui. No jornal.",
       "audio": "talk/town/town-01-a-new-start/85d0b05875fd.mp3",
       "audioF": "talk/town/town-01-a-new-start/324f198fa8bd.mp3",
       "next": "e_job"
      },
      {
       "text": "Yes, I'm visiting the toilet.",
       "pt": "Sim, estou visitando o banheiro.",
       "audio": "talk/town/town-01-a-new-start/e79064af83e0.mp3",
       "audioF": "talk/town/town-01-a-new-start/a6220dfa1210.mp3",
       "next": null,
       "react": {
        "text": "Ha! It's over there. But really, are you visiting Millbrook?",
        "pt": "Rá! É ali. Mas sério, você está visitando Millbrook?",
        "audio": "talk/town/town-01-a-new-start/3098a43a266c.mp3"
       }
      }
     ]
    },
    "e_guess": {
     "speaker": "e",
     "text": "Hmm. Spain? No? Italy? Brazil! I knew it!",
     "pt": "Hum. Espanha? Não? Itália? Brasil! Eu sabia!",
     "audio": "talk/town/town-01-a-new-start/937012497c57.mp3",
     "next": "e_brazil"
    },
    "e_brazil": {
     "speaker": "e",
     "text": "Brazil! Wow. I'm from America. So, what brings you to Millbrook?",
     "pt": "Brasil! Uau. Eu sou dos Estados Unidos. E o que te traz a Millbrook?",
     "audio": "talk/town/town-01-a-new-start/c9a62dc2f6f5.mp3",
     "options": [
      {
       "text": "I have a new job at the newspaper.",
       "pt": "Tenho um emprego novo no jornal.",
       "audio": "talk/town/town-01-a-new-start/503fac074b87.mp3",
       "audioF": "talk/town/town-01-a-new-start/fb987120cf46.mp3",
       "next": "e_job"
      },
      {
       "text": "I love the sea.",
       "pt": "Eu amo o mar.",
       "audio": "talk/town/town-01-a-new-start/f3060d9c9ede.mp3",
       "audioF": "talk/town/town-01-a-new-start/96349cc41b6a.mp3",
       "next": "e_sea"
      },
      {
       "text": "I'm bringing my suitcase.",
       "pt": "Estou trazendo minha mala.",
       "audio": "talk/town/town-01-a-new-start/a4ae971de249.mp3",
       "audioF": "talk/town/town-01-a-new-start/1ddb7c434c1a.mp3",
       "next": null,
       "react": {
        "text": "I can see that! Ha. But why Millbrook? Work? Holiday?",
        "pt": "Dá pra ver! Rá. Mas por que Millbrook? Trabalho? Férias?",
        "audio": "talk/town/town-01-a-new-start/11cf1febfe8a.mp3"
       }
      }
     ]
    },
    "e_sea": {
     "speaker": "e",
     "text": "Me too. Wait. Are you the new reporter? Maggie from the Gazette told me about you!",
     "pt": "Eu também. Espera. Você é a pessoa nova do jornal? A Maggie, do Gazette, me falou de você!",
     "audio": "talk/town/town-01-a-new-start/b4031c3d542a.mp3",
     "next": "e_maggie"
    },
    "e_job": {
     "speaker": "e",
     "text": "The newspaper? The Millbrook Gazette! My friend Maggie is the boss there.",
     "pt": "O jornal? O Millbrook Gazette! Minha amiga Maggie é a chefe lá.",
     "audio": "talk/town/town-01-a-new-start/12d5d3fc199b.mp3",
     "next": "e_maggie"
    },
    "e_maggie": {
     "speaker": "e",
     "text": "She's funny, but she's tough. Okay! What can I get for you?",
     "pt": "Ela é engraçada, mas é durona. Bom! O que vai querer?",
     "audio": "talk/town/town-01-a-new-start/9177d366d4de.mp3",
     "options": [
      {
       "text": "A coffee, please.",
       "pt": "Um café, por favor.",
       "audio": "talk/town/town-01-a-new-start/92f025d50a70.mp3",
       "audioF": "talk/town/town-01-a-new-start/3271d6147852.mp3",
       "next": "e_coffee",
       "set": {
        "drink": "coffee"
       }
      },
      {
       "text": "A cup of tea, please.",
       "pt": "Uma xícara de chá, por favor.",
       "audio": "talk/town/town-01-a-new-start/546a21a40d11.mp3",
       "audioF": "talk/town/town-01-a-new-start/cd6371dd789e.mp3",
       "next": "e_tea",
       "set": {
        "drink": "tea"
       }
      },
      {
       "text": "A hot chocolate, please.",
       "pt": "Um chocolate quente, por favor.",
       "audio": "talk/town/town-01-a-new-start/10ca36dc7c49.mp3",
       "audioF": "talk/town/town-01-a-new-start/f6c1023c0bb2.mp3",
       "next": "e_choc",
       "set": {
        "drink": "hot_chocolate"
       }
      },
      {
       "text": "I can get the bus.",
       "pt": "Eu posso pegar o ônibus.",
       "audio": "talk/town/town-01-a-new-start/451b8c100708.mp3",
       "audioF": "talk/town/town-01-a-new-start/2f8dbf6c9b3a.mp3",
       "next": null,
       "react": {
        "text": "Ha, the bus stop is outside! But what would you like to drink?",
        "pt": "Rá, o ponto de ônibus é ali fora! Mas o que você quer beber?",
        "audio": "talk/town/town-01-a-new-start/a4fa32213b75.mp3"
       }
      }
     ]
    },
    "e_coffee": {
     "speaker": "e",
     "text": "Coffee. Good choice. With milk?",
     "pt": "Café. Boa escolha. Com leite?",
     "audio": "talk/town/town-01-a-new-start/2188b25f9516.mp3",
     "options": [
      {
       "text": "Yes, a little milk, please.",
       "pt": "Sim, um pouco de leite, por favor.",
       "audio": "talk/town/town-01-a-new-start/4dd25964485c.mp3",
       "audioF": "talk/town/town-01-a-new-start/d9f5496fd2ea.mp3",
       "next": "e_food"
      },
      {
       "text": "No, black, please.",
       "pt": "Não, puro, por favor.",
       "audio": "talk/town/town-01-a-new-start/e8a3e9c1155d.mp3",
       "audioF": "talk/town/town-01-a-new-start/9aab22bfff1c.mp3",
       "next": "e_food"
      },
      {
       "text": "Yes, with my cat.",
       "pt": "Sim, com o meu gato.",
       "audio": "talk/town/town-01-a-new-start/649657884bd7.mp3",
       "audioF": "talk/town/town-01-a-new-start/6c25bbc49ac4.mp3",
       "next": null,
       "react": {
        "text": "Your cat? Ha! No, I mean milk. Milk in your coffee?",
        "pt": "Seu gato? Rá! Não, digo leite. Leite no café?",
        "audio": "talk/town/town-01-a-new-start/a6cdfc4fe853.mp3"
       }
      }
     ]
    },
    "e_tea": {
     "speaker": "e",
     "text": "Tea! You're very British already. Milk or lemon?",
     "pt": "Chá! Você já tem alma britânica. Leite ou limão?",
     "audio": "talk/town/town-01-a-new-start/0529906eb4d5.mp3",
     "options": [
      {
       "text": "Milk, please.",
       "pt": "Com leite, por favor.",
       "audio": "talk/town/town-01-a-new-start/053b7d67be38.mp3",
       "audioF": "talk/town/town-01-a-new-start/ed28463e4abf.mp3",
       "next": "e_food"
      },
      {
       "text": "Lemon, please.",
       "pt": "Com limão, por favor.",
       "audio": "talk/town/town-01-a-new-start/044ebecb0485.mp3",
       "audioF": "talk/town/town-01-a-new-start/621022cf7a42.mp3",
       "next": "e_food"
      },
      {
       "text": "Melon, please.",
       "pt": "Melão, por favor.",
       "audio": "talk/town/town-01-a-new-start/2b3dfb37b358.mp3",
       "audioF": "talk/town/town-01-a-new-start/32d6cc7b4c79.mp3",
       "next": null,
       "react": {
        "text": "Melon? In tea? Ha! No. Milk or lemon?",
        "pt": "Melão? No chá? Rá! Não. Leite ou limão?",
        "audio": "talk/town/town-01-a-new-start/e34aae937e16.mp3"
       }
      }
     ]
    },
    "e_choc": {
     "speaker": "e",
     "text": "Hot chocolate! My favorite. With cream on top?",
     "pt": "Chocolate quente! Meu preferido. Com chantili em cima?",
     "audio": "talk/town/town-01-a-new-start/29da5ce6d7ad.mp3",
     "options": [
      {
       "text": "Yes, lots of cream!",
       "pt": "Sim, bastante chantili!",
       "audio": "talk/town/town-01-a-new-start/337beb32594d.mp3",
       "audioF": "talk/town/town-01-a-new-start/69bc6e179f4b.mp3",
       "next": "e_food"
      },
      {
       "text": "No cream, thanks.",
       "pt": "Sem chantili, valeu.",
       "audio": "talk/town/town-01-a-new-start/f9588633ec54.mp3",
       "audioF": "talk/town/town-01-a-new-start/e1257892e9a9.mp3",
       "next": "e_food"
      },
      {
       "text": "Yes, it's on top of the hill.",
       "pt": "Sim, fica no alto do morro.",
       "audio": "talk/town/town-01-a-new-start/43b2a9170d9f.mp3",
       "audioF": "talk/town/town-01-a-new-start/3ad0af681d69.mp3",
       "next": null,
       "react": {
        "text": "Ha! No, I mean cream. Do you want cream on your hot chocolate?",
        "pt": "Rá! Não, digo chantili. Quer chantili no chocolate quente?",
        "audio": "talk/town/town-01-a-new-start/859d2345bc6e.mp3"
       }
      }
     ]
    },
    "e_food": {
     "speaker": "e",
     "text": "Anything to eat? Our scones are famous.",
     "pt": "Algo pra comer? Nossos scones são famosos.",
     "audio": "talk/town/town-01-a-new-start/6b7dc4e60896.mp3",
     "options": [
      {
       "text": "A scone, please.",
       "pt": "Um scone, por favor.",
       "audio": "talk/town/town-01-a-new-start/1fff8fcdba07.mp3",
       "audioF": "talk/town/town-01-a-new-start/053f8f8624be.mp3",
       "next": "e_scone"
      },
      {
       "text": "What's a scone?",
       "pt": "O que é um scone?",
       "audio": "talk/town/town-01-a-new-start/8c387d4461c6.mp3",
       "audioF": "talk/town/town-01-a-new-start/94d7a51ab18f.mp3",
       "next": "e_whatscone"
      },
      {
       "text": "No, thanks. Just the drink.",
       "pt": "Não, valeu. Só a bebida.",
       "audio": "talk/town/town-01-a-new-start/af072d5ccd1c.mp3",
       "audioF": "talk/town/town-01-a-new-start/ca18223b493a.mp3",
       "next": "e_sam"
      },
      {
       "text": "Yes, I'm famous in Brazil.",
       "pt": "Sim, sou uma celebridade no Brasil.",
       "audio": "talk/town/town-01-a-new-start/e18fc8111aca.mp3",
       "audioF": "talk/town/town-01-a-new-start/f38b620ef331.mp3",
       "next": null,
       "react": {
        "text": "Oh, really? Ha! But do you want a scone?",
        "pt": "Ah, é? Rá! Mas você quer um scone?",
        "audio": "talk/town/town-01-a-new-start/4289c50ebf27.mp3"
       }
      }
     ]
    },
    "e_whatscone": {
     "speaker": "e",
     "text": "It's like a little bread cake. With jam and cream. You'll love it.",
     "pt": "É tipo um bolinho de pão. Com geleia e creme. Você vai amar.",
     "audio": "talk/town/town-01-a-new-start/f1d1675b78b2.mp3",
     "next": "e_scone"
    },
    "e_scone": {
     "speaker": "e",
     "text": "One scone, coming up! Sam! Can you help me, please?",
     "pt": "Um scone saindo! Sam! Pode me ajudar, por favor?",
     "audio": "talk/town/town-01-a-new-start/be3595e6646b.mp3",
     "next": "n_sam"
    },
    "e_sam": {
     "speaker": "e",
     "text": "No problem. Sam! Can you take this to the table, please?",
     "pt": "Sem problema. Sam! Pode levar isso pra mesa, por favor?",
     "audio": "talk/town/town-01-a-new-start/59b163d6c334.mp3",
     "next": "n_sam"
    },
    "n_sam": {
     "speaker": "n",
     "text": "A teenage boy comes out of the kitchen. He has a guitar on his back.",
     "pt": "Um garoto adolescente sai da cozinha. Ele tem um violão nas costas.",
     "audio": "talk/town/town-01-a-new-start/a8548345566d.mp3",
     "next": "drink_br"
    },
    "drink_br": {
     "branch": [
      {
       "if": "drink=coffee",
       "next": "s_coffee"
      },
      {
       "if": "drink=tea",
       "next": "s_tea"
      },
      {
       "if": null,
       "next": "s_choc"
      }
     ]
    },
    "s_coffee": {
     "speaker": "s",
     "text": "Here's your coffee. Er, sorry. I'm in a hurry today.",
     "pt": "Aqui está seu café. Hã, desculpa. Estou com pressa hoje.",
     "audio": "talk/town/town-01-a-new-start/d5acc687f0d1.mp3",
     "next": "s_q"
    },
    "s_tea": {
     "speaker": "s",
     "text": "Here's your tea. Er, sorry. I'm in a hurry today.",
     "pt": "Aqui está seu chá. Hã, desculpa. Estou com pressa hoje.",
     "audio": "talk/town/town-01-a-new-start/b6779e395462.mp3",
     "next": "s_q"
    },
    "s_choc": {
     "speaker": "s",
     "text": "Here's your hot chocolate. Er, sorry. I'm in a hurry today.",
     "pt": "Aqui está seu chocolate quente. Hã, desculpa. Estou com pressa hoje.",
     "audio": "talk/town/town-01-a-new-start/c17dc2e88011.mp3",
     "next": "s_q"
    },
    "s_q": {
     "speaker": "s",
     "text": "I'm Sam. Emma's brother. Er, enjoy!",
     "pt": "Sou o Sam. Irmão da Emma. Hã, aproveite!",
     "audio": "talk/town/town-01-a-new-start/2e63ea1f5d69.mp3",
     "options": [
      {
       "text": "Thanks, Sam. Are you okay?",
       "pt": "Valeu, Sam. Tudo bem com você?",
       "audio": "talk/town/town-01-a-new-start/34d79fa4c5a7.mp3",
       "audioF": "talk/town/town-01-a-new-start/b7183d84ecbe.mp3",
       "next": "s_ok"
      },
      {
       "text": "Thank you. Is that your guitar?",
       "pt": "Valeu. Esse violão é seu?",
       "audio": "talk/town/town-01-a-new-start/9d8bed868d7f.mp3",
       "audioF": "talk/town/town-01-a-new-start/2b365f9b79d2.mp3",
       "next": "s_guitar"
      },
      {
       "text": "No, I don't want a brother.",
       "pt": "Não, eu não quero um irmão.",
       "audio": "talk/town/town-01-a-new-start/c56056eb8c88.mp3",
       "audioF": "talk/town/town-01-a-new-start/4eecba1f57a9.mp3",
       "next": null,
       "react": {
        "text": "Ha, no! I'M Emma's brother. I said: enjoy your drink!",
        "pt": "Rá, não! EU sou o irmão da Emma. Eu disse: aproveite a bebida!",
        "audio": "talk/town/town-01-a-new-start/981c2e1f5f3c.mp3"
       }
      }
     ]
    },
    "s_ok": {
     "speaker": "s",
     "text": "Me? Yes! Fine! Totally fine. I just have to go somewhere.",
     "pt": "Eu? Sim! Tô bem! Superbem. Só preciso ir num lugar.",
     "audio": "talk/town/town-01-a-new-start/2fef7a6e6282.mp3",
     "next": "s_go"
    },
    "s_guitar": {
     "speaker": "s",
     "text": "Yeah. I play a bit, with my friend Leo. Sorry, I really have to go.",
     "pt": "É. Toco um pouco, com meu amigo Leo. Desculpa, preciso mesmo ir.",
     "audio": "talk/town/town-01-a-new-start/11cc7b88cf59.mp3",
     "next": "s_go"
    },
    "s_go": {
     "speaker": "s",
     "text": "Bye, Emma! See you later!",
     "pt": "Tchau, Emma! Até mais!",
     "audio": "talk/town/town-01-a-new-start/685ba3ef670b.mp3",
     "next": "e_jar"
    },
    "e_jar": {
     "speaker": "e",
     "text": "Teenagers! Hey, do you see that big jar on the counter? It's for the new playground.",
     "pt": "Adolescentes! Ei, tá vendo aquele pote grande no balcão? É pro parquinho novo.",
     "audio": "talk/town/town-01-a-new-start/193778627429.mp3",
     "options": [
      {
       "text": "Can I put in a pound?",
       "pt": "Posso colocar uma libra?",
       "audio": "talk/town/town-01-a-new-start/1eac442eba21.mp3",
       "audioF": "talk/town/town-01-a-new-start/4cc5063040bb.mp3",
       "next": "e_donate",
       "set": {
        "donated": "yes"
       }
      },
      {
       "text": "A playground? That's a lovely idea.",
       "pt": "Um parquinho? Que ideia linda.",
       "audio": "talk/town/town-01-a-new-start/2fd11b4fba80.mp3",
       "audioF": "talk/town/town-01-a-new-start/ccaf16483783.mp3",
       "next": "e_idea"
      },
      {
       "text": "Yes, I love jam.",
       "pt": "Sim, eu amo geleia.",
       "audio": "talk/town/town-01-a-new-start/7dee8749e21e.mp3",
       "audioF": "talk/town/town-01-a-new-start/2b968eaed909.mp3",
       "next": null,
       "react": {
        "text": "Jam? Ha! Not jam, the jar! The glass jar, with the money in it.",
        "pt": "Geleia? Rá! Não é geleia, é o pote! O pote de vidro, com o dinheiro dentro.",
        "audio": "talk/town/town-01-a-new-start/68fb92982a04.mp3"
       }
      }
     ]
    },
    "e_donate": {
     "speaker": "e",
     "text": "Aw, thank you! It's almost full. Lots of coins. It's so heavy now!",
     "pt": "Ah, obrigada! Tá quase cheio. Um monte de moedas. Tá pesadíssimo!",
     "audio": "talk/town/town-01-a-new-start/383c1e046b39.mp3",
     "next": "n_phone"
    },
    "e_idea": {
     "speaker": "e",
     "text": "Isn't it? The whole town gives a little. It's full of coins now. So heavy!",
     "pt": "Né? A cidade toda dá um pouquinho. Agora tá cheio de moedas. Pesadíssimo!",
     "audio": "talk/town/town-01-a-new-start/95afad908776.mp3",
     "next": "n_phone"
    },
    "n_phone": {
     "speaker": "n",
     "text": "The phone rings in the kitchen. Emma runs to answer it.",
     "pt": "O telefone toca na cozinha. A Emma corre pra atender.",
     "audio": "talk/town/town-01-a-new-start/371d06b7fb62.mp3",
     "next": "n_quiet"
    },
    "n_quiet": {
     "speaker": "n",
     "text": "You sit by the window with your drink. The café is quiet.",
     "pt": "Você senta perto da janela com sua bebida. O café está tranquilo.",
     "audio": "talk/town/town-01-a-new-start/c1ed3718fbe5.mp3",
     "next": "n_red"
    },
    "n_red": {
     "speaker": "n",
     "text": "Suddenly, someone in a red jacket walks past your table, fast, and out of the door.",
     "pt": "De repente, alguém de jaqueta vermelha passa rápido pela sua mesa e sai pela porta.",
     "audio": "talk/town/town-01-a-new-start/8b52000467c7.mp3",
     "next": "e_back"
    },
    "e_back": {
     "speaker": "e",
     "text": "Sorry, sorry! That was the bread man. So, is everything okay?",
     "pt": "Desculpa, desculpa! Era o moço do pão. E aí, tudo certo?",
     "audio": "talk/town/town-01-a-new-start/14224356a9be.mp3",
     "options": [
      {
       "text": "It's delicious, thanks!",
       "pt": "Está uma delícia, valeu!",
       "audio": "talk/town/town-01-a-new-start/e16c84616607.mp3",
       "audioF": "talk/town/town-01-a-new-start/ff46e3435582.mp3",
       "next": "e_gone"
      },
      {
       "text": "It's great. This café is really nice.",
       "pt": "Ótimo. Este café é muito bacana.",
       "audio": "talk/town/town-01-a-new-start/88d94751cb39.mp3",
       "audioF": "talk/town/town-01-a-new-start/8ef8fa745214.mp3",
       "next": "e_thanks"
      },
      {
       "text": "Everything is in my suitcase.",
       "pt": "Tudo está na minha mala.",
       "audio": "talk/town/town-01-a-new-start/4d8dfffcc093.mp3",
       "audioF": "talk/town/town-01-a-new-start/803f2e78f4d6.mp3",
       "next": null,
       "react": {
        "text": "Ha! I mean your drink. Is it good?",
        "pt": "Rá! Digo a bebida. Tá boa?",
        "audio": "talk/town/town-01-a-new-start/623ec0948f06.mp3"
       }
      }
     ]
    },
    "e_gone": {
     "speaker": "e",
     "text": "Good! Wait. Where's the jar? The jar is gone!",
     "pt": "Que bom! Espera. Cadê o pote? O pote sumiu!",
     "audio": "talk/town/town-01-a-new-start/be6ae70850ec.mp3",
     "next": "e_saw"
    },
    "e_thanks": {
     "speaker": "e",
     "text": "Thank you! I love this little place. Wait. Where's the jar?",
     "pt": "Obrigada! Eu amo este lugarzinho. Espera. Cadê o pote?",
     "audio": "talk/town/town-01-a-new-start/5c4ab8b81720.mp3",
     "next": "e_saw"
    },
    "e_saw": {
     "speaker": "e",
     "text": "It was right here on the counter! Did you see anybody?",
     "pt": "Ele estava bem aqui no balcão! Você viu alguém?",
     "audio": "talk/town/town-01-a-new-start/ad1563173613.mp3",
     "options": [
      {
       "text": "Yes! Someone in a red jacket left fast.",
       "pt": "Sim! Alguém de jaqueta vermelha saiu rápido.",
       "audio": "talk/town/town-01-a-new-start/ff325128a6e7.mp3",
       "audioF": "talk/town/town-01-a-new-start/2bae47acea8d.mp3",
       "next": "e_red"
      },
      {
       "text": "No, sorry. I didn't see anything.",
       "pt": "Não, desculpa. Não vi nada.",
       "audio": "talk/town/town-01-a-new-start/eb29d7be1e89.mp3",
       "audioF": "talk/town/town-01-a-new-start/bd6dad004187.mp3",
       "next": "e_think"
      },
      {
       "text": "Maybe Sam put it in the kitchen?",
       "pt": "Será que o Sam colocou na cozinha?",
       "audio": "talk/town/town-01-a-new-start/8893a19182f8.mp3",
       "audioF": "talk/town/town-01-a-new-start/57cda6c4d18c.mp3",
       "next": "e_kitchen"
      },
      {
       "text": "Yes, the jar is very pretty.",
       "pt": "Sim, o pote é muito bonito.",
       "audio": "talk/town/town-01-a-new-start/802b25ba7814.mp3",
       "audioF": "talk/town/town-01-a-new-start/720fe08ee47e.mp3",
       "next": null,
       "react": {
        "text": "It WAS pretty! Now it's gone! Did you see anyone near the counter?",
        "pt": "ERA bonito! Agora sumiu! Você viu alguém perto do balcão?",
        "audio": "talk/town/town-01-a-new-start/e2ee48166300.mp3"
       }
      }
     ]
    },
    "e_kitchen": {
     "speaker": "e",
     "text": "Let me look. No. It's not in the kitchen. Think! Did anybody walk past you?",
     "pt": "Deixa eu ver. Não. Não tá na cozinha. Pensa! Alguém passou por você?",
     "audio": "talk/town/town-01-a-new-start/168fac439d7c.mp3",
     "options": [
      {
       "text": "Yes, someone in a red jacket.",
       "pt": "Sim, alguém de jaqueta vermelha.",
       "audio": "talk/town/town-01-a-new-start/4441434d2174.mp3",
       "audioF": "talk/town/town-01-a-new-start/4c9e707e7c12.mp3",
       "next": "e_red"
      },
      {
       "text": "I don't remember, sorry.",
       "pt": "Não lembro, desculpa.",
       "audio": "talk/town/town-01-a-new-start/e03fe7123448.mp3",
       "audioF": "talk/town/town-01-a-new-start/dec885f609e5.mp3",
       "next": "e_nothing"
      },
      {
       "text": "Yes, I walk every day.",
       "pt": "Sim, eu caminho todo dia.",
       "audio": "talk/town/town-01-a-new-start/f4a53646055d.mp3",
       "audioF": "talk/town/town-01-a-new-start/14bdbf252e88.mp3",
       "next": null,
       "react": {
        "text": "Good for you! But did anybody walk past your table just now?",
        "pt": "Que bom! Mas alguém passou pela sua mesa agora há pouco?",
        "audio": "talk/town/town-01-a-new-start/837cd70badf5.mp3"
       }
      }
     ]
    },
    "e_think": {
     "speaker": "e",
     "text": "Are you sure? Somebody walked past your table. I heard the door.",
     "pt": "Tem certeza? Alguém passou pela sua mesa. Eu ouvi a porta.",
     "audio": "talk/town/town-01-a-new-start/6dba074333fb.mp3",
     "options": [
      {
       "text": "Oh, yes! Someone in a red jacket.",
       "pt": "Ah, é! Alguém de jaqueta vermelha.",
       "audio": "talk/town/town-01-a-new-start/4d567a39aebd.mp3",
       "audioF": "talk/town/town-01-a-new-start/231e3da4306a.mp3",
       "next": "e_red"
      },
      {
       "text": "Sorry, I was looking at my phone.",
       "pt": "Desculpa, eu estava olhando o celular.",
       "audio": "talk/town/town-01-a-new-start/101b7b2601e9.mp3",
       "audioF": "talk/town/town-01-a-new-start/ac33c8522d8a.mp3",
       "next": "e_nothing"
      },
      {
       "text": "Yes, the door is blue.",
       "pt": "Sim, a porta é azul.",
       "audio": "talk/town/town-01-a-new-start/bfd21eb3a0bb.mp3",
       "audioF": "talk/town/town-01-a-new-start/9993db3da166.mp3",
       "next": null,
       "react": {
        "text": "The door? I mean the person! Who walked out of the door?",
        "pt": "A porta? Digo a pessoa! Quem saiu pela porta?",
        "audio": "talk/town/town-01-a-new-start/fedc318275a3.mp3"
       }
      }
     ]
    },
    "e_red": {
     "speaker": "e",
     "text": "A red jacket. Okay. I'll tell the police. Thank you!",
     "pt": "Uma jaqueta vermelha. Certo. Vou contar pra polícia. Obrigada!",
     "audio": "talk/town/town-01-a-new-start/3121898f44e2.mp3",
     "clue": "red_jacket",
     "next": "e_police"
    },
    "e_nothing": {
     "speaker": "e",
     "text": "Oh, it's okay. It's not your fault. I'll call the police.",
     "pt": "Ah, tudo bem. Não é culpa sua. Vou chamar a polícia.",
     "audio": "talk/town/town-01-a-new-start/93b5ee9b6d26.mp3",
     "next": "e_police"
    },
    "e_police": {
     "speaker": "e",
     "text": "Wait. You work for the newspaper, right? Maybe this is your first story!",
     "pt": "Espera. Você trabalha no jornal, né? Talvez essa seja sua primeira matéria!",
     "audio": "talk/town/town-01-a-new-start/a61260b0208c.mp3",
     "next": "n_end"
    },
    "n_end": {
     "speaker": "n",
     "text": "Your first morning in Millbrook. And already, there's a mystery.",
     "pt": "Sua primeira manhã em Millbrook. E já tem um mistério.",
     "audio": "talk/town/town-01-a-new-start/5a2b376a5a69.mp3",
     "end": true
    }
   },
   "nudges": {
    "e": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-01-a-new-start/02def2e93f5e.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-01-a-new-start/b9dcdc8c63f9.mp3"
     }
    ],
    "s": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-01-a-new-start/5721c30a5077.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-01-a-new-start/047af034c6c2.mp3"
     }
    ]
   },
   "ambience": "cafe",
   "place": "cafe",
   "time": "Segunda · 9h",
   "episode": 1
  },
  {
   "slug": "town-02-rose-street",
   "title": "Rose Street",
   "level": "A1",
   "description": "Ache sua casa nova e conheça o vizinho rabugento.",
   "intro": "O pote de doações do café sumiu, e alguém de jaqueta vermelha saiu com pressa. Agora você procura sua casa nova: Rose Street, número 12.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "h": {
     "name": "Mr. Hughes",
     "role": "Vizinho do nº 14",
     "side": "left"
    }
   },
   "start": "n1",
   "decisions": [
    5,
    7
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "It's eleven o'clock. You walk down Rose Street with your big suitcase.",
     "pt": "São onze horas. Você desce a Rose Street com sua mala grande.",
     "audio": "talk/town/town-02-rose-street/064fe9c0c576.mp3",
     "next": "n2"
    },
    "n2": {
     "speaker": "n",
     "text": "Number eight, number ten. Where is number twelve?",
     "pt": "Número oito, número dez. Cadê o número doze?",
     "audio": "talk/town/town-02-rose-street/2311b73b1907.mp3",
     "next": "h1"
    },
    "h1": {
     "speaker": "h",
     "text": "Biscuit! Biscuit! Where are you, you silly dog?",
     "pt": "Biscuit! Biscuit! Cadê você, cachorro bobo?",
     "audio": "talk/town/town-02-rose-street/dc075e552fd1.mp3",
     "next": "n3"
    },
    "n3": {
     "speaker": "n",
     "text": "An old man stands at a garden gate. He looks angry. And worried.",
     "pt": "Um senhor está parado no portão de um jardim. Ele parece bravo. E preocupado.",
     "audio": "talk/town/town-02-rose-street/6cb9bf8d50a9.mp3",
     "next": "h2"
    },
    "h2": {
     "speaker": "h",
     "text": "You there! Have you seen a little brown dog?",
     "pt": "Você aí! Viu um cachorrinho marrom?",
     "audio": "talk/town/town-02-rose-street/01e01551e7dc.mp3",
     "options": [
      {
       "text": "No, sorry. I just arrived.",
       "pt": "Não, desculpe. Acabei de chegar.",
       "audio": "talk/town/town-02-rose-street/589853dc9bc6.mp3",
       "audioF": "talk/town/town-02-rose-street/8ff1b9d5c8e2.mp3",
       "next": "h_arrived"
      },
      {
       "text": "A brown dog? What's his name?",
       "pt": "Um cachorro marrom? Qual o nome dele?",
       "audio": "talk/town/town-02-rose-street/e93afbfb4a65.mp3",
       "audioF": "talk/town/town-02-rose-street/bf7a9150dd6d.mp3",
       "next": "h_name"
      },
      {
       "text": "Yes, I'd like a biscuit, please.",
       "pt": "Sim, eu queria um biscoito, por favor.",
       "audio": "talk/town/town-02-rose-street/e58cd64e3def.mp3",
       "audioF": "talk/town/town-02-rose-street/56b22e22c0a3.mp3",
       "next": null,
       "react": {
        "text": "Not a biscuit to eat! Biscuit is my dog. Have you seen him?",
        "pt": "Não é biscoito de comer! Biscuit é meu cachorro. Você viu ele?",
        "audio": "talk/town/town-02-rose-street/9b29de2ef769.mp3"
       }
      }
     ]
    },
    "h_name": {
     "speaker": "h",
     "text": "Biscuit. He's small, brown and very naughty. Like all dogs.",
     "pt": "Biscuit. Ele é pequeno, marrom e muito levado. Como todo cachorro.",
     "audio": "talk/town/town-02-rose-street/a1127a2cc471.mp3",
     "next": "h_who"
    },
    "h_arrived": {
     "speaker": "h",
     "text": "Just arrived? Hmph. With a suitcase. Yes, I can see that.",
     "pt": "Acabou de chegar? Hunf. Com uma mala. É, estou vendo.",
     "audio": "talk/town/town-02-rose-street/bcfe10444dee.mp3",
     "next": "h_who"
    },
    "h_who": {
     "speaker": "h",
     "text": "And who are you, then?",
     "pt": "E quem é você, afinal?",
     "audio": "talk/town/town-02-rose-street/5f43447f3e7f.mp3",
     "options": [
      {
       "text": "I'm your new neighbour. I live at number twelve.",
       "pt": "Vou morar aqui do lado. No número doze.",
       "audio": "talk/town/town-02-rose-street/a4370bec5e52.mp3",
       "audioF": "talk/town/town-02-rose-street/52d3fe775a30.mp3",
       "next": "h_neighbour"
      },
      {
       "text": "I'm looking for number twelve.",
       "pt": "Estou procurando o número doze.",
       "audio": "talk/town/town-02-rose-street/5cc8111b7db5.mp3",
       "audioF": "talk/town/town-02-rose-street/f6693827cfbc.mp3",
       "next": "h_twelve"
      },
      {
       "text": "I'm twelve years old.",
       "pt": "Tenho doze anos.",
       "audio": "talk/town/town-02-rose-street/8380da3061ea.mp3",
       "audioF": "talk/town/town-02-rose-street/e0ac229f5c01.mp3",
       "next": null,
       "react": {
        "text": "Twelve? You look older than twelve! Who are you?",
        "pt": "Doze? Você parece ter mais de doze! Quem é você?",
        "audio": "talk/town/town-02-rose-street/f5e313e11cc9.mp3"
       }
      }
     ]
    },
    "h_neighbour": {
     "speaker": "h",
     "text": "Number twelve? So you're the new one. I'm Arthur Hughes. Number fourteen.",
     "pt": "Número doze? Então é você a pessoa nova. Sou Arthur Hughes. Número catorze.",
     "audio": "talk/town/town-02-rose-street/9db9ea159c80.mp3",
     "next": "h_leg"
    },
    "h_twelve": {
     "speaker": "h",
     "text": "It's right there. The blue door, next to mine. I'm Arthur Hughes. Number fourteen.",
     "pt": "É bem ali. A porta azul, do lado da minha. Sou Arthur Hughes. Número catorze.",
     "audio": "talk/town/town-02-rose-street/1d4bbe43543e.mp3",
     "next": "h_leg"
    },
    "h_leg": {
     "speaker": "h",
     "text": "Biscuit ran away this morning. And I can't walk fast. My leg, you see.",
     "pt": "O Biscuit fugiu hoje de manhã. E eu não ando rápido. Minha perna, sabe.",
     "audio": "talk/town/town-02-rose-street/ba97428c1a0d.mp3",
     "options": [
      {
       "text": "I can help you look for him.",
       "pt": "Posso te ajudar a procurar.",
       "audio": "talk/town/town-02-rose-street/163c9ccbe8ff.mp3",
       "audioF": "talk/town/town-02-rose-street/91b8ea2d1ad7.mp3",
       "next": "h_help",
       "set": {
        "helped_hughes": "yes"
       }
      },
      {
       "text": "Sorry, I need to take my bags inside.",
       "pt": "Desculpe, preciso levar minhas malas pra dentro.",
       "audio": "talk/town/town-02-rose-street/c23d71cdc0ee.mp3",
       "audioF": "talk/town/town-02-rose-street/44eefe8e659e.mp3",
       "next": "h_nohelp",
       "set": {
        "helped_hughes": "no"
       }
      },
      {
       "text": "Oh no! Is your dog's leg okay?",
       "pt": "Ah, não! A perna do seu cachorro está bem?",
       "audio": "talk/town/town-02-rose-street/d477808f4f63.mp3",
       "audioF": "talk/town/town-02-rose-street/d26061b68f49.mp3",
       "next": null,
       "react": {
        "text": "Not the dog's leg! MY leg. His legs are fine. That's the problem! He runs everywhere.",
        "pt": "Não é a perna do cachorro! A MINHA perna. As dele estão ótimas. Esse é o problema! Ele corre pra todo lado.",
        "audio": "talk/town/town-02-rose-street/288dfe702353.mp3"
       }
      }
     ]
    },
    "h_help": {
     "speaker": "h",
     "text": "You'd help? Well. Thank you. He likes the park at the end of the street.",
     "pt": "Você ajudaria? Bom. Obrigado. Ele gosta do parque no fim da rua.",
     "audio": "talk/town/town-02-rose-street/b46e714b357a.mp3",
     "next": "n_park"
    },
    "n_park": {
     "speaker": "n",
     "text": "You leave your suitcase by the blue door. You walk to the park together.",
     "pt": "Você deixa a mala na porta azul. Vocês vão juntos até o parque.",
     "audio": "talk/town/town-02-rose-street/669875e7fe5f.mp3",
     "next": "h_park"
    },
    "h_park": {
     "speaker": "h",
     "text": "Where is that dog? Where do we look first?",
     "pt": "Cadê esse cachorro? Onde procuramos primeiro?",
     "audio": "talk/town/town-02-rose-street/3e8694e2ff68.mp3",
     "options": [
      {
       "text": "Let's look under the trees.",
       "pt": "Vamos olhar embaixo das árvores.",
       "audio": "talk/town/town-02-rose-street/38bd110fb231.mp3",
       "audioF": "talk/town/town-02-rose-street/7e3aba1e2094.mp3",
       "next": "n_trees"
      },
      {
       "text": "Let's call his name together.",
       "pt": "Vamos chamar o nome dele juntos.",
       "audio": "talk/town/town-02-rose-street/5a397d2ce1f7.mp3",
       "audioF": "talk/town/town-02-rose-street/2493f96bc6ce.mp3",
       "next": "n_call"
      },
      {
       "text": "Let's look in the bank.",
       "pt": "Vamos procurar no banco.",
       "audio": "talk/town/town-02-rose-street/6e8acb2c74f0.mp3",
       "audioF": "talk/town/town-02-rose-street/a7679d1078cf.mp3",
       "next": null,
       "react": {
        "text": "The bank? Biscuit hasn't got any money! Where do we look?",
        "pt": "No banco? O Biscuit não tem dinheiro nenhum! Onde procuramos?",
        "audio": "talk/town/town-02-rose-street/b2c0e3627832.mp3"
       }
      }
     ]
    },
    "n_trees": {
     "speaker": "n",
     "text": "You look under the trees. No dog. Just a lot of leaves.",
     "pt": "Você olha embaixo das árvores. Nada de cachorro. Só um monte de folhas.",
     "audio": "talk/town/town-02-rose-street/2fca1ca5295c.mp3",
     "next": "h_busy"
    },
    "n_call": {
     "speaker": "n",
     "text": "You shout together: Biscuit! Biscuit! A woman with a baby laughs. But no dog.",
     "pt": "Vocês gritam juntos: Biscuit! Biscuit! Uma mulher com um bebê ri. Mas nada do cachorro.",
     "audio": "talk/town/town-02-rose-street/db78eb844ab9.mp3",
     "next": "h_busy"
    },
    "h_busy": {
     "speaker": "h",
     "text": "Hmph. This town is too busy today. This morning a boy ran past my house like a train.",
     "pt": "Hunf. Esta cidade está agitada demais hoje. De manhã, um rapaz passou pela minha casa feito um trem.",
     "audio": "talk/town/town-02-rose-street/a7d91bec1d5f.mp3",
     "options": [
      {
       "text": "A boy? What did he look like?",
       "pt": "Um rapaz? Como ele era?",
       "audio": "talk/town/town-02-rose-street/57c9c7cb567b.mp3",
       "audioF": "talk/town/town-02-rose-street/c029565fd9c2.mp3",
       "next": "h_look"
      },
      {
       "text": "Where was he going?",
       "pt": "Para onde ele ia?",
       "audio": "talk/town/town-02-rose-street/078b77cd6af5.mp3",
       "audioF": "talk/town/town-02-rose-street/0d3d1d729e9e.mp3",
       "next": "h_where"
      },
      {
       "text": "Was it a fast train?",
       "pt": "Era um trem rápido?",
       "audio": "talk/town/town-02-rose-street/57894700d08a.mp3",
       "audioF": "talk/town/town-02-rose-street/022770121ae8.mp3",
       "next": null,
       "react": {
        "text": "Not a real train! A boy. Running. Are you listening?",
        "pt": "Não um trem de verdade! Um rapaz. Correndo. Você está prestando atenção?",
        "audio": "talk/town/town-02-rose-street/1f82fdcfef04.mp3"
       }
      }
     ]
    },
    "h_look": {
     "speaker": "h",
     "text": "Young. Fast. I didn't see his face. But he had a heavy bag. It went clink, clink, clink.",
     "pt": "Jovem. Rápido. Não vi o rosto. Mas ele tinha uma sacola pesada. Fazia tlim, tlim, tlim.",
     "audio": "talk/town/town-02-rose-street/9abde6f7ea32.mp3",
     "clue": "heavy_bag",
     "next": "h_coins"
    },
    "h_where": {
     "speaker": "h",
     "text": "To the High Street. With a big, heavy bag. Clink, clink, clink. Like coins.",
     "pt": "Pra High Street. Com uma sacola grande e pesada. Tlim, tlim, tlim. Tipo moedas.",
     "audio": "talk/town/town-02-rose-street/a08d233103dc.mp3",
     "clue": "heavy_bag",
     "next": "h_when"
    },
    "h_coins": {
     "speaker": "h",
     "text": "Like a bag of coins. Strange, isn't it?",
     "pt": "Feito uma sacola de moedas. Estranho, não?",
     "audio": "talk/town/town-02-rose-street/aecb6e0978f1.mp3",
     "options": [
      {
       "text": "Very strange. A jar of coins disappeared this morning.",
       "pt": "Muito estranho. Um pote de moedas sumiu hoje de manhã.",
       "audio": "talk/town/town-02-rose-street/467bed97a810.mp3",
       "audioF": "talk/town/town-02-rose-street/f1fbb93cf1c7.mp3",
       "next": "h_jar"
      },
      {
       "text": "What time was that?",
       "pt": "Que horas foi isso?",
       "audio": "talk/town/town-02-rose-street/5a7cc8a2b05f.mp3",
       "audioF": "talk/town/town-02-rose-street/635042df5695.mp3",
       "next": "h_when"
      },
      {
       "text": "Yes, I like strange dogs.",
       "pt": "Sim, eu gosto de cachorros estranhos.",
       "audio": "talk/town/town-02-rose-street/f62e9a93cc95.mp3",
       "audioF": "talk/town/town-02-rose-street/13136e15dfa1.mp3",
       "next": null,
       "react": {
        "text": "My dog is not strange! The bag was strange. Don't you think?",
        "pt": "Meu cachorro não é estranho! A sacola é que era estranha. Não acha?",
        "audio": "talk/town/town-02-rose-street/43d9decab090.mp3"
       }
      }
     ]
    },
    "h_when": {
     "speaker": "h",
     "text": "After nine. I was eating my breakfast. Toast and marmalade. Every day.",
     "pt": "Depois das nove. Eu estava tomando café. Torrada com geleia de laranja. Todo dia.",
     "audio": "talk/town/town-02-rose-street/160eb37aa536.mp3",
     "next": "n_bark"
    },
    "h_jar": {
     "speaker": "h",
     "text": "A jar? From the café? Hmph. Not my business. I want my dog.",
     "pt": "Um pote? Do café? Hunf. Não é da minha conta. Eu quero meu cachorro.",
     "audio": "talk/town/town-02-rose-street/cfc5f90b0b27.mp3",
     "next": "n_bark"
    },
    "n_bark": {
     "speaker": "n",
     "text": "Suddenly you hear a happy bark. A little brown dog runs out of a bush.",
     "pt": "De repente você ouve um latido feliz. Um cachorrinho marrom sai correndo de um arbusto.",
     "audio": "talk/town/town-02-rose-street/7e01911cf885.mp3",
     "next": "h_found"
    },
    "h_found": {
     "speaker": "h",
     "text": "Biscuit! You bad, bad dog. Oh, I missed you.",
     "pt": "Biscuit! Seu cachorro levado. Ai, que saudade.",
     "audio": "talk/town/town-02-rose-street/d1eeacc15db8.mp3",
     "next": "h_thanks"
    },
    "h_thanks": {
     "speaker": "h",
     "text": "Thank you, number twelve. You're not bad. For a new person.",
     "pt": "Obrigado, número doze. Você não é de todo mal. Pra quem acabou de chegar.",
     "audio": "talk/town/town-02-rose-street/88125389d6b1.mp3",
     "options": [
      {
       "text": "You're welcome, Mr. Hughes.",
       "pt": "De nada, Sr. Hughes.",
       "audio": "talk/town/town-02-rose-street/cd77f3de156a.mp3",
       "audioF": "talk/town/town-02-rose-street/9554c1f6ea0c.mp3",
       "next": "h_tea"
      },
      {
       "text": "Call me if he runs away again!",
       "pt": "Me chama se ele fugir de novo!",
       "audio": "talk/town/town-02-rose-street/b3874a5ee54a.mp3",
       "audioF": "talk/town/town-02-rose-street/578e18103f22.mp3",
       "next": "h_again"
      },
      {
       "text": "Yes, I'm not bad at tennis.",
       "pt": "Sim, não sou ruim no tênis.",
       "audio": "talk/town/town-02-rose-street/c2e464fc76be.mp3",
       "audioF": "talk/town/town-02-rose-street/33a52b8b48c8.mp3",
       "next": null,
       "react": {
        "text": "Tennis? I said YOU are not bad. It's a compliment. Take it.",
        "pt": "Tênis? Eu disse que VOCÊ não é de todo mal. É um elogio. Aceite.",
        "audio": "talk/town/town-02-rose-street/248b222d134b.mp3"
       }
      }
     ]
    },
    "h_again": {
     "speaker": "h",
     "text": "Oh, he will. He always does. Hmph.",
     "pt": "Ah, ele vai fugir. Sempre foge. Hunf.",
     "audio": "talk/town/town-02-rose-street/675563611828.mp3",
     "next": "h_tea"
    },
    "h_tea": {
     "speaker": "h",
     "text": "Come for tea one day. Not today. Biscuit needs a bath.",
     "pt": "Venha tomar um chá um dia. Hoje não. O Biscuit precisa de um banho.",
     "audio": "talk/town/town-02-rose-street/af2aedc292fd.mp3",
     "next": "n_end"
    },
    "h_nohelp": {
     "speaker": "h",
     "text": "Fine. Everybody's in a hurry today. Like that boy this morning.",
     "pt": "Tudo bem. Todo mundo está com pressa hoje. Igual àquele rapaz hoje de manhã.",
     "audio": "talk/town/town-02-rose-street/cc044f806fb9.mp3",
     "options": [
      {
       "text": "What boy?",
       "pt": "Que rapaz?",
       "audio": "talk/town/town-02-rose-street/94a806a0a181.mp3",
       "audioF": "talk/town/town-02-rose-street/fd2050c0e3b6.mp3",
       "next": "h_boy"
      },
      {
       "text": "Sorry. I hope you find Biscuit.",
       "pt": "Desculpe. Espero que você ache o Biscuit.",
       "audio": "talk/town/town-02-rose-street/dea35e530643.mp3",
       "audioF": "talk/town/town-02-rose-street/5da5d0ff7fc5.mp3",
       "next": "h_bye"
      },
      {
       "text": "Yes, it's a lovely morning.",
       "pt": "Sim, que manhã linda.",
       "audio": "talk/town/town-02-rose-street/c28463f2259c.mp3",
       "audioF": "talk/town/town-02-rose-street/53067bb7ac2e.mp3",
       "next": null,
       "react": {
        "text": "Lovely? My dog is lost! Didn't you hear me? That boy, this morning!",
        "pt": "Linda? Meu cachorro sumiu! Não me ouviu? Aquele rapaz, hoje de manhã!",
        "audio": "talk/town/town-02-rose-street/eb03b5ac8048.mp3"
       }
      }
     ]
    },
    "h_boy": {
     "speaker": "h",
     "text": "He ran past my house to the High Street. With a heavy bag. Clink, clink, clink.",
     "pt": "Ele passou correndo pela minha casa, rumo à High Street. Com uma sacola pesada. Tlim, tlim, tlim.",
     "audio": "talk/town/town-02-rose-street/7fd13a01e9d6.mp3",
     "clue": "heavy_bag",
     "next": "h_bye2"
    },
    "h_bye": {
     "speaker": "h",
     "text": "Hmph. Go on, then. Run, like that boy this morning. With his noisy bag of coins.",
     "pt": "Hunf. Pode ir, então. Corra, igual àquele rapaz hoje cedo. Com a sacola barulhenta de moedas.",
     "audio": "talk/town/town-02-rose-street/c89bce9c3c57.mp3",
     "clue": "heavy_bag",
     "next": "n_door"
    },
    "h_bye2": {
     "speaker": "h",
     "text": "Very strange. Now go on. Take your bags inside.",
     "pt": "Muito estranho. Agora vá. Leve suas malas pra dentro.",
     "audio": "talk/town/town-02-rose-street/3ce361d3ae34.mp3",
     "next": "n_door"
    },
    "n_door": {
     "speaker": "n",
     "text": "You walk to the blue door. A little brown dog is asleep on your doormat!",
     "pt": "Você vai até a porta azul. Um cachorrinho marrom está dormindo no seu capacho!",
     "audio": "talk/town/town-02-rose-street/954a5baca5ee.mp3",
     "next": "n_door2"
    },
    "n_door2": {
     "speaker": "n",
     "text": "What do you do?",
     "pt": "O que você faz?",
     "audio": "talk/town/town-02-rose-street/c1f69be093ea.mp3",
     "options": [
      {
       "text": "Mr. Hughes! Is this Biscuit?",
       "pt": "Sr. Hughes! Este é o Biscuit?",
       "audio": "talk/town/town-02-rose-street/ec6ecabe3e2e.mp3",
       "audioF": "talk/town/town-02-rose-street/edb01ccd096b.mp3",
       "next": "h_found2",
       "set": {
        "helped_hughes": "yes"
       }
      },
      {
       "text": "Shh, little dog. Go home.",
       "pt": "Psiu, cachorrinho. Vai pra casa.",
       "audio": "talk/town/town-02-rose-street/9b74806b7e4b.mp3",
       "audioF": "talk/town/town-02-rose-street/2f790efd327b.mp3",
       "next": "n_gohome"
      },
      {
       "text": "Hello, doormat. Nice to meet you.",
       "pt": "Olá, capacho. Prazer em te conhecer.",
       "audio": "talk/town/town-02-rose-street/d13b8238a254.mp3",
       "audioF": "talk/town/town-02-rose-street/72f5d93f8a72.mp3",
       "next": null,
       "react": {
        "text": "The doormat can't talk. But the dog is waking up. What do you do?",
        "pt": "O capacho não fala. Mas o cachorro está acordando. O que você faz?",
        "audio": "talk/town/town-02-rose-street/8ac27912ff03.mp3"
       }
      }
     ]
    },
    "h_found2": {
     "speaker": "h",
     "text": "Biscuit! There you are! Hmph. Thank you, number twelve. Maybe you're not so bad.",
     "pt": "Biscuit! Aí está você! Hunf. Obrigado, número doze. Talvez você não seja tão mal assim.",
     "audio": "talk/town/town-02-rose-street/6d3b65e71773.mp3",
     "next": "n_end"
    },
    "n_gohome": {
     "speaker": "n",
     "text": "The dog runs down the street. You go inside. Through the wall, you hear: Biscuit!",
     "pt": "O cachorro sai correndo pela rua. Você entra. Pela parede, você ouve: Biscuit!",
     "audio": "talk/town/town-02-rose-street/e84addb95d3e.mp3",
     "next": "n_end"
    },
    "n_end": {
     "speaker": "n",
     "text": "Your new home is small and cold. And you keep thinking: clink, clink. A bag of coins.",
     "pt": "Sua casa nova é pequena e fria. E você não para de pensar: tlim, tlim. Uma sacola de moedas.",
     "audio": "talk/town/town-02-rose-street/a869716f1dee.mp3",
     "next": "n_end2"
    },
    "n_end2": {
     "speaker": "n",
     "text": "Your fridge is empty. Later, you need to visit the shop on the corner.",
     "pt": "Sua geladeira está vazia. Mais tarde, você precisa ir à lojinha da esquina.",
     "audio": "talk/town/town-02-rose-street/93036948ddf4.mp3",
     "end": true
    }
   },
   "nudges": {
    "h": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-02-rose-street/75759147c884.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-02-rose-street/b37319da9442.mp3"
     }
    ]
   },
   "ambience": "street",
   "place": "street",
   "time": "Segunda · 11h",
   "episode": 2
  },
  {
   "slug": "town-03-corner-shop",
   "title": "The Corner Shop",
   "level": "A2",
   "description": "Faça compras e ouça a fofoca do dono da loja.",
   "intro": "Seu vizinho, o Sr. Hughes, viu um rapaz correndo com uma sacola que fazia barulho de moedas. Agora é fim de tarde, a geladeira está vazia, e você vai à loja da esquina.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "r": {
     "name": "Ravi",
     "role": "Dono da loja da esquina",
     "side": "right"
    }
   },
   "start": "n1",
   "decisions": [
    8,
    11
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "It's five in the afternoon. You go into the little shop on the corner. A bell rings.",
     "pt": "São cinco da tarde. Você entra na lojinha da esquina. Um sininho toca.",
     "audio": "talk/town/town-03-corner-shop/632949021041.mp3",
     "next": "r1"
    },
    "r1": {
     "speaker": "r",
     "text": "Hello, hello! Welcome to Shah's! I'm Ravi. You must be the new person at number twelve!",
     "pt": "Olá, olá! Boas-vindas à Shah's! Sou o Ravi. Você deve ser a pessoa nova do número doze!",
     "audio": "talk/town/town-03-corner-shop/c39513cad06f.mp3",
     "options": [
      {
       "text": "Yes! How do you know that?",
       "pt": "Sim! Como você sabe?",
       "audio": "talk/town/town-03-corner-shop/0006bc39a18b.mp3",
       "audioF": "talk/town/town-03-corner-shop/7824b247c4c8.mp3",
       "next": "r_how"
      },
      {
       "text": "That's right. I need a few things.",
       "pt": "Isso mesmo. Preciso de algumas coisas.",
       "audio": "talk/town/town-03-corner-shop/a4e5ee74e3c6.mp3",
       "audioF": "talk/town/town-03-corner-shop/e8ee5b476e5c.mp3",
       "next": "r_need"
      },
      {
       "text": "Twelve eggs, please.",
       "pt": "Doze ovos, por favor.",
       "audio": "talk/town/town-03-corner-shop/6f73707de2e0.mp3",
       "audioF": "talk/town/town-03-corner-shop/89d375454a09.mp3",
       "next": null,
       "react": {
        "text": "Ha! The eggs are over there. But you live at number twelve, yes? On Rose Street?",
        "pt": "Rá! Os ovos ficam ali. Mas você mora no número doze, né? Na Rose Street?",
        "audio": "talk/town/town-03-corner-shop/f163a76bb1da.mp3"
       }
      }
     ]
    },
    "r_how": {
     "speaker": "r",
     "text": "Mr. Hughes told me. Well, he told Biscuit. I was just standing next to them.",
     "pt": "O Sr. Hughes me contou. Bom, ele contou pro Biscuit. Eu só estava do lado.",
     "audio": "talk/town/town-03-corner-shop/b16177c52bee.mp3",
     "next": "r_news"
    },
    "r_news": {
     "speaker": "r",
     "text": "In Millbrook, news travels faster than the bus. Much faster. The bus is terrible.",
     "pt": "Em Millbrook, a notícia corre mais rápido que o ônibus. Bem mais. O ônibus é péssimo.",
     "audio": "talk/town/town-03-corner-shop/de3086e4e1ea.mp3",
     "next": "r_need"
    },
    "r_need": {
     "speaker": "r",
     "text": "Bread, milk, eggs, gossip. I've got everything. What do you need?",
     "pt": "Pão, leite, ovos, fofoca. Tenho de tudo. Do que você precisa?",
     "audio": "talk/town/town-03-corner-shop/bf3b7d650367.mp3",
     "options": [
      {
       "text": "Some bread and milk, please.",
       "pt": "Pão e leite, por favor.",
       "audio": "talk/town/town-03-corner-shop/87fd6febfd12.mp3",
       "audioF": "talk/town/town-03-corner-shop/537ea5fe6280.mp3",
       "next": "r_bread"
      },
      {
       "text": "Do you sell SIM cards? My phone doesn't work here.",
       "pt": "Vocês vendem chip? Meu celular não funciona aqui.",
       "audio": "talk/town/town-03-corner-shop/0878b48e9156.mp3",
       "audioF": "talk/town/town-03-corner-shop/2e94a9b25ea7.mp3",
       "next": "r_sim"
      },
      {
       "text": "I need a holiday!",
       "pt": "Eu preciso de férias!",
       "audio": "talk/town/town-03-corner-shop/5e2523e01abf.mp3",
       "audioF": "talk/town/town-03-corner-shop/c310c9f0f824.mp3",
       "next": null,
       "react": {
        "text": "Don't we all! But in the shop, what can I get you?",
        "pt": "Quem não precisa! Mas aqui na loja, o que eu te arrumo?",
        "audio": "talk/town/town-03-corner-shop/19f128c466f0.mp3"
       }
      }
     ]
    },
    "r_sim": {
     "speaker": "r",
     "text": "Of course! Pay as you go. Ten pounds, with lots of internet. Is that okay?",
     "pt": "Claro! Pré-pago. Dez libras, com bastante internet. Pode ser?",
     "audio": "talk/town/town-03-corner-shop/22738e61357b.mp3",
     "options": [
      {
       "text": "Perfect. I'll take it.",
       "pt": "Perfeito. Vou levar.",
       "audio": "talk/town/town-03-corner-shop/6900fee4590b.mp3",
       "audioF": "talk/town/town-03-corner-shop/06dfe376a619.mp3",
       "next": "r_sim_ok",
       "set": {
        "has_sim": "yes"
       }
      },
      {
       "text": "Ten pounds? Is there a cheaper one?",
       "pt": "Dez libras? Tem um mais barato?",
       "audio": "talk/town/town-03-corner-shop/9f32c47ed124.mp3",
       "audioF": "talk/town/town-03-corner-shop/685d67c37b15.mp3",
       "next": "r_cheap",
       "set": {
        "has_sim": "yes"
       }
      },
      {
       "text": "No, I don't want to go.",
       "pt": "Não, eu não quero ir.",
       "audio": "talk/town/town-03-corner-shop/1ac8336e876d.mp3",
       "audioF": "talk/town/town-03-corner-shop/b9468d528864.mp3",
       "next": null,
       "react": {
        "text": "Ha! Not you go. Pay as you go! You pay for what you use. Ten pounds. Okay?",
        "pt": "Rá! Não é você ir. É pré-pago! Você paga pelo que usa. Dez libras. Pode ser?",
        "audio": "talk/town/town-03-corner-shop/2a3ee832101b.mp3"
       }
      }
     ]
    },
    "r_cheap": {
     "speaker": "r",
     "text": "There's a five-pound one. But the internet is slow. Like a snail on holiday. Take the ten!",
     "pt": "Tem um de cinco. Mas a internet é lenta. Tipo lesma de férias. Leva o de dez!",
     "audio": "talk/town/town-03-corner-shop/539d449eb920.mp3",
     "next": "r_sim_ok"
    },
    "r_sim_ok": {
     "speaker": "r",
     "text": "There you go. Put it in your phone. Now you're a real Millbrook person! Anything to eat?",
     "pt": "Prontinho. Coloca no celular. Agora você é de Millbrook de verdade! Algo pra comer?",
     "audio": "talk/town/town-03-corner-shop/672d67d10ded.mp3",
     "next": "r_bread"
    },
    "r_bread": {
     "speaker": "r",
     "text": "White bread or brown? And the milk: a small bottle or a big one?",
     "pt": "Pão branco ou integral? E o leite: garrafa pequena ou grande?",
     "audio": "talk/town/town-03-corner-shop/9312bdb35db7.mp3",
     "options": [
      {
       "text": "Brown bread and a small bottle, please.",
       "pt": "Pão integral e uma garrafa pequena, por favor.",
       "audio": "talk/town/town-03-corner-shop/1d14e9785c81.mp3",
       "audioF": "talk/town/town-03-corner-shop/094299feab33.mp3",
       "next": "r_drink"
      },
      {
       "text": "White bread and a big bottle. I'm really hungry!",
       "pt": "Pão branco e uma garrafa grande. Estou morrendo de fome!",
       "audio": "talk/town/town-03-corner-shop/c72ac260a045.mp3",
       "audioF": "talk/town/town-03-corner-shop/71c9acac4535.mp3",
       "next": "r_hungry"
      },
      {
       "text": "A big bottle of bread, please.",
       "pt": "Uma garrafa grande de pão, por favor.",
       "audio": "talk/town/town-03-corner-shop/a6882f6d11b2.mp3",
       "audioF": "talk/town/town-03-corner-shop/169d2ee73a6e.mp3",
       "next": null,
       "react": {
        "text": "A bottle of bread? Ha! Bread comes in a bag! White or brown? And what size milk?",
        "pt": "Garrafa de pão? Rá! Pão vem no saco! Branco ou integral? E o leite, de que tamanho?",
        "audio": "talk/town/town-03-corner-shop/54d08f6f172b.mp3"
       }
      }
     ]
    },
    "r_hungry": {
     "speaker": "r",
     "text": "Hungry? Here, have a banana. It's free. Welcome to Millbrook!",
     "pt": "Com fome? Toma, uma banana. É de graça. Boas-vindas a Millbrook!",
     "audio": "talk/town/town-03-corner-shop/6ee790b1e274.mp3",
     "next": "r_drink"
    },
    "r_drink": {
     "branch": [
      {
       "if": "drink=coffee",
       "next": "r_coffee"
      },
      {
       "if": "drink=tea",
       "next": "r_tea"
      },
      {
       "if": null,
       "next": "r_choc"
      }
     ]
    },
    "r_coffee": {
     "speaker": "r",
     "text": "And Emma says you're a coffee person! I've got a lovely Italian coffee. Want some?",
     "pt": "E a Emma disse que você é do time do café! Tenho um café italiano ótimo. Quer?",
     "audio": "talk/town/town-03-corner-shop/4e8ef0966aef.mp3",
     "options": [
      {
       "text": "Yes, please! How much is it?",
       "pt": "Quero, por favor! Quanto custa?",
       "audio": "talk/town/town-03-corner-shop/feb2190336af.mp3",
       "audioF": "talk/town/town-03-corner-shop/0a4abebbee3d.mp3",
       "next": "r_price"
      },
      {
       "text": "Wait. Emma told you about my coffee?",
       "pt": "Peraí. A Emma te contou do meu café?",
       "audio": "talk/town/town-03-corner-shop/bf67dc708175.mp3",
       "audioF": "talk/town/town-03-corner-shop/2156d6e07267.mp3",
       "next": "r_emma"
      },
      {
       "text": "No, thanks. I'll have my coffee at the café.",
       "pt": "Não, valeu. Vou tomar meu café lá no café.",
       "audio": "talk/town/town-03-corner-shop/ed8ed0e91d93.mp3",
       "audioF": "talk/town/town-03-corner-shop/5f96e6b1ec71.mp3",
       "next": "r_after_drink"
      },
      {
       "text": "Yes, I'm a person.",
       "pt": "Sim, eu sou uma pessoa.",
       "audio": "talk/town/town-03-corner-shop/e483e0a70a05.mp3",
       "audioF": "talk/town/town-03-corner-shop/010dca39c239.mp3",
       "next": null,
       "react": {
        "text": "Ha! I can see that! I mean, do you want some coffee for home?",
        "pt": "Rá! Dá pra ver! Digo, quer café pra levar pra casa?",
        "audio": "talk/town/town-03-corner-shop/e8791d0860be.mp3"
       }
      }
     ]
    },
    "r_tea": {
     "speaker": "r",
     "text": "And Emma says you drink tea! Very good. Do you want a box of tea bags?",
     "pt": "E a Emma disse que você toma chá! Muito bem. Quer uma caixa de sachês de chá?",
     "audio": "talk/town/town-03-corner-shop/aefb38802b6e.mp3",
     "options": [
      {
       "text": "Yes, please! How much is it?",
       "pt": "Quero, por favor! Quanto custa?",
       "audio": "talk/town/town-03-corner-shop/feb2190336af.mp3",
       "audioF": "talk/town/town-03-corner-shop/0a4abebbee3d.mp3",
       "next": "r_price"
      },
      {
       "text": "Wait. Emma told you about my tea?",
       "pt": "Peraí. A Emma te contou do meu chá?",
       "audio": "talk/town/town-03-corner-shop/7f4fef8d4eb8.mp3",
       "audioF": "talk/town/town-03-corner-shop/5283819bde5b.mp3",
       "next": "r_emma"
      },
      {
       "text": "No, thanks. I'll have my tea at the café.",
       "pt": "Não, valeu. Vou tomar meu chá lá no café.",
       "audio": "talk/town/town-03-corner-shop/502c12af8cf3.mp3",
       "audioF": "talk/town/town-03-corner-shop/04a3c65365db.mp3",
       "next": "r_after_drink"
      },
      {
       "text": "Yes, I'm a box.",
       "pt": "Sim, eu sou uma caixa.",
       "audio": "talk/town/town-03-corner-shop/d0923919102d.mp3",
       "audioF": "talk/town/town-03-corner-shop/951cb560e16d.mp3",
       "next": null,
       "react": {
        "text": "A box? Ha! You're funny! I mean, do you want tea bags for home?",
        "pt": "Uma caixa? Rá! Que figura! Digo, quer sachês de chá pra casa?",
        "audio": "talk/town/town-03-corner-shop/98cf04314521.mp3"
       }
      }
     ]
    },
    "r_choc": {
     "speaker": "r",
     "text": "And Emma says you love hot chocolate! I've got the best one in town. Want a tin?",
     "pt": "E a Emma disse que você ama chocolate quente! Tenho o melhor da cidade. Quer uma lata?",
     "audio": "talk/town/town-03-corner-shop/3deeaecfe06f.mp3",
     "options": [
      {
       "text": "Yes, please! How much is it?",
       "pt": "Quero, por favor! Quanto custa?",
       "audio": "talk/town/town-03-corner-shop/feb2190336af.mp3",
       "audioF": "talk/town/town-03-corner-shop/0a4abebbee3d.mp3",
       "next": "r_price"
      },
      {
       "text": "Wait. Emma told you about my hot chocolate?",
       "pt": "Peraí. A Emma te contou do meu chocolate quente?",
       "audio": "talk/town/town-03-corner-shop/c37edd2ee07a.mp3",
       "audioF": "talk/town/town-03-corner-shop/c9f5b885eecb.mp3",
       "next": "r_emma"
      },
      {
       "text": "No, thanks. I'll have it at the café.",
       "pt": "Não, valeu. Vou tomar lá no café.",
       "audio": "talk/town/town-03-corner-shop/7be9af1f6f47.mp3",
       "audioF": "talk/town/town-03-corner-shop/e25ce48410af.mp3",
       "next": "r_after_drink"
      },
      {
       "text": "Yes, I want a tin of town.",
       "pt": "Sim, quero uma lata de cidade.",
       "audio": "talk/town/town-03-corner-shop/bf9027ffd8f6.mp3",
       "audioF": "talk/town/town-03-corner-shop/e5e01b6e061c.mp3",
       "next": null,
       "react": {
        "text": "A tin of town? Ha! No, a tin of hot chocolate. For home. Yes?",
        "pt": "Lata de cidade? Rá! Não, uma lata de chocolate quente. Pra casa. Quer?",
        "audio": "talk/town/town-03-corner-shop/6a73d02f6696.mp3"
       }
      }
     ]
    },
    "r_price": {
     "speaker": "r",
     "text": "Three pounds. For you, two pounds fifty. It's a welcome present!",
     "pt": "Três libras. Pra você, duas e cinquenta. É presente de boas-vindas!",
     "audio": "talk/town/town-03-corner-shop/e0d0eb81ef4c.mp3",
     "next": "r_after_drink"
    },
    "r_emma": {
     "speaker": "r",
     "text": "Of course! Emma tells me everything. I tell everybody everything. It's a system.",
     "pt": "Claro! A Emma me conta tudo. Eu conto tudo pra todo mundo. É um sistema.",
     "audio": "talk/town/town-03-corner-shop/e694536f0a18.mp3",
     "next": "r_after_drink"
    },
    "r_after_drink": {
     "branch": [
      {
       "if": "has_sim=yes",
       "next": "r_jar"
      },
      {
       "if": null,
       "next": "r_simoffer"
      }
     ]
    },
    "r_simoffer": {
     "speaker": "r",
     "text": "Anything else? Phone cards, stamps, batteries?",
     "pt": "Mais alguma coisa? Chip de celular, selos, pilhas?",
     "audio": "talk/town/town-03-corner-shop/ee8906805381.mp3",
     "options": [
      {
       "text": "Yes, a SIM card, please. My phone doesn't work here.",
       "pt": "Sim, um chip, por favor. Meu celular não funciona aqui.",
       "audio": "talk/town/town-03-corner-shop/fa79ccc73324.mp3",
       "audioF": "talk/town/town-03-corner-shop/bacb933cfd7d.mp3",
       "next": "r_sim2",
       "set": {
        "has_sim": "yes"
       }
      },
      {
       "text": "No, that's everything, thanks.",
       "pt": "Não, é só isso, valeu.",
       "audio": "talk/town/town-03-corner-shop/6e1fc94dc295.mp3",
       "audioF": "talk/town/town-03-corner-shop/2ca253b52b66.mp3",
       "next": "r_jar"
      },
      {
       "text": "I'd like a phone call, please.",
       "pt": "Eu queria um telefonema, por favor.",
       "audio": "talk/town/town-03-corner-shop/c63203c02e6d.mp3",
       "audioF": "talk/town/town-03-corner-shop/db672433d7a0.mp3",
       "next": null,
       "react": {
        "text": "A phone call? I'm not a telephone! Ha! Do you need anything else?",
        "pt": "Um telefonema? Eu não sou telefone! Rá! Precisa de mais alguma coisa?",
        "audio": "talk/town/town-03-corner-shop/debd6f72e76a.mp3"
       }
      }
     ]
    },
    "r_sim2": {
     "speaker": "r",
     "text": "Ten pounds, pay as you go. Here you are. Now you're a real Millbrook person!",
     "pt": "Dez libras, pré-pago. Aqui está. Agora você é de Millbrook de verdade!",
     "audio": "talk/town/town-03-corner-shop/891e6f5ecbdc.mp3",
     "next": "r_jar"
    },
    "r_jar": {
     "speaker": "r",
     "text": "So! You were in the café this morning, yes? When the jar disappeared?",
     "pt": "Então! Você estava no café hoje de manhã, né? Quando o pote sumiu?",
     "audio": "talk/town/town-03-corner-shop/d3f5d949059c.mp3",
     "options": [
      {
       "text": "Yes, I was there. It was very strange.",
       "pt": "Sim, eu estava lá. Foi muito estranho.",
       "audio": "talk/town/town-03-corner-shop/14aeb72f18fc.mp3",
       "audioF": "talk/town/town-03-corner-shop/4b1078890b3b.mp3",
       "next": "r_terrible"
      },
      {
       "text": "How do you know about that?",
       "pt": "Como você sabe disso?",
       "audio": "talk/town/town-03-corner-shop/9bc5901d94d4.mp3",
       "audioF": "talk/town/town-03-corner-shop/66f913b0a5e3.mp3",
       "next": "r_knows"
      },
      {
       "text": "No, the jar was in the café.",
       "pt": "Não, o pote estava no café.",
       "audio": "talk/town/town-03-corner-shop/20a048cc259e.mp3",
       "audioF": "talk/town/town-03-corner-shop/cff84cfbd4b2.mp3",
       "next": null,
       "react": {
        "text": "Yes, I know the jar was in the café! But were YOU there?",
        "pt": "Sim, eu sei que o pote estava no café! Mas VOCÊ estava lá?",
        "audio": "talk/town/town-03-corner-shop/4675015622d8.mp3"
       }
      }
     ]
    },
    "r_knows": {
     "speaker": "r",
     "text": "It's Millbrook! Everybody knows everything. Except who took the jar, of course.",
     "pt": "É Millbrook! Todo mundo sabe de tudo. Menos quem pegou o pote, claro.",
     "audio": "talk/town/town-03-corner-shop/36bf06d428b7.mp3",
     "next": "r_police"
    },
    "r_terrible": {
     "speaker": "r",
     "text": "Terrible! Poor Emma. All that money for the playground.",
     "pt": "Que horror! Coitada da Emma. Todo aquele dinheiro pro parquinho.",
     "audio": "talk/town/town-03-corner-shop/cc791b61268c.mp3",
     "next": "r_police"
    },
    "r_police": {
     "speaker": "r",
     "text": "The police came to the café. Officer Ruiz. Very serious. Did you talk to her?",
     "pt": "A polícia foi ao café. A policial Ruiz. Muito séria. Você falou com ela?",
     "audio": "talk/town/town-03-corner-shop/2ff090363049.mp3",
     "options": [
      {
       "text": "Not yet. I need to go to the bank first.",
       "pt": "Ainda não. Preciso ir ao banco primeiro.",
       "audio": "talk/town/town-03-corner-shop/75009bdb0a20.mp3",
       "audioF": "talk/town/town-03-corner-shop/4b40c9d04aba.mp3",
       "next": "r_bh"
      },
      {
       "text": "No. Did anything strange happen here today?",
       "pt": "Não. Aconteceu algo estranho aqui hoje?",
       "audio": "talk/town/town-03-corner-shop/5623c624302c.mp3",
       "audioF": "talk/town/town-03-corner-shop/b7225f0f4a77.mp3",
       "next": "r_strange"
      },
      {
       "text": "Yes, I talk to my plants.",
       "pt": "Sim, eu converso com minhas plantas.",
       "audio": "talk/town/town-03-corner-shop/a7dd606456ee.mp3",
       "audioF": "talk/town/town-03-corner-shop/040897f46eaa.mp3",
       "next": null,
       "react": {
        "text": "Ha! Me too! But I mean Officer Ruiz. Did you talk to the police?",
        "pt": "Rá! Eu também! Mas falo da policial Ruiz. Você falou com a polícia?",
        "audio": "talk/town/town-03-corner-shop/4f2cf1b706a6.mp3"
       }
      }
     ]
    },
    "r_bh": {
     "speaker": "r",
     "text": "The bank? Not today! It's a bank holiday. The bank is closed all day.",
     "pt": "O banco? Hoje não! É feriado bancário. O banco fica fechado o dia todo.",
     "audio": "talk/town/town-03-corner-shop/f22ce74c94ca.mp3",
     "clue": "bank_holiday",
     "next": "r_bh2"
    },
    "r_bh2": {
     "speaker": "r",
     "text": "Banks, offices, everything is closed. Well, not my shop. Ravi never closes!",
     "pt": "Bancos, escritórios, tudo fechado. Bom, minha loja não. O Ravi nunca fecha!",
     "audio": "talk/town/town-03-corner-shop/f90ab0801cbe.mp3",
     "next": "r_funny"
    },
    "r_funny": {
     "speaker": "r",
     "text": "Oh! And a funny thing happened this morning. Do you want to hear?",
     "pt": "Ah! E aconteceu uma coisa curiosa hoje de manhã. Quer ouvir?",
     "audio": "talk/town/town-03-corner-shop/84c36b9630ae.mp3",
     "options": [
      {
       "text": "Of course! Tell me.",
       "pt": "Claro! Conta.",
       "audio": "talk/town/town-03-corner-shop/c20e0b508975.mp3",
       "audioF": "talk/town/town-03-corner-shop/ba5524096cf7.mp3",
       "next": "r_coins"
      },
      {
       "text": "Is it about the jar?",
       "pt": "É sobre o pote?",
       "audio": "talk/town/town-03-corner-shop/c4e96b853f09.mp3",
       "audioF": "talk/town/town-03-corner-shop/69e7465f6788.mp3",
       "next": "r_maybe"
      },
      {
       "text": "No, I can hear very well.",
       "pt": "Não, eu ouço muito bem.",
       "audio": "talk/town/town-03-corner-shop/8f3a75fb93a9.mp3",
       "audioF": "talk/town/town-03-corner-shop/cfe08b210caa.mp3",
       "next": null,
       "react": {
        "text": "Ha! Good! So, do you want to hear my story?",
        "pt": "Rá! Ótimo! Então, quer ouvir minha história?",
        "audio": "talk/town/town-03-corner-shop/809563c8e29e.mp3"
       }
      }
     ]
    },
    "r_maybe": {
     "speaker": "r",
     "text": "Maybe! Maybe not! I'm not the police. I just sell bread. And listen.",
     "pt": "Talvez! Talvez não! Não sou da polícia. Eu só vendo pão. E escuto.",
     "audio": "talk/town/town-03-corner-shop/3cd17adc8f7c.mp3",
     "next": "r_coins"
    },
    "r_strange": {
     "speaker": "r",
     "text": "Strange? Oh, yes. Very strange. Let me tell you.",
     "pt": "Estranho? Ah, sim. Muito estranho. Deixa eu te contar.",
     "audio": "talk/town/town-03-corner-shop/f3116075438f.mp3",
     "next": "r_coins"
    },
    "r_coins": {
     "speaker": "r",
     "text": "This morning a polite young man came in. With a cap. And a bag full of coins!",
     "pt": "Hoje de manhã entrou um rapaz educado. De boné. E com uma sacola cheia de moedas!",
     "audio": "talk/town/town-03-corner-shop/83e0b1d964c2.mp3",
     "next": "r_notes"
    },
    "r_notes": {
     "speaker": "r",
     "text": "He wanted notes for his coins. So many coins! I counted for twenty minutes.",
     "pt": "Ele queria trocar as moedas por notas. Quanta moeda! Fiquei vinte minutos contando.",
     "audio": "talk/town/town-03-corner-shop/907becf42108.mp3",
     "clue": "coins",
     "next": "r_who_q"
    },
    "r_who_q": {
     "speaker": "r",
     "text": "Who was he? I don't know. His cap was very low. Nice boy, though.",
     "pt": "Quem era? Não sei. O boné estava bem baixo. Mas um bom rapaz.",
     "audio": "talk/town/town-03-corner-shop/cd6efeaa43bd.mp3",
     "options": [
      {
       "text": "Did he say his name?",
       "pt": "Ele disse o nome?",
       "audio": "talk/town/town-03-corner-shop/f4ba0588fbb4.mp3",
       "audioF": "talk/town/town-03-corner-shop/ae6406a9f836.mp3",
       "next": "r_name"
      },
      {
       "text": "Was he wearing a red jacket?",
       "pt": "Ele estava de jaqueta vermelha?",
       "audio": "talk/town/town-03-corner-shop/41f867a5922f.mp3",
       "audioF": "talk/town/town-03-corner-shop/a498456b552c.mp3",
       "next": "r_jacket"
      },
      {
       "text": "How much money was it?",
       "pt": "Quanto dinheiro era?",
       "audio": "talk/town/town-03-corner-shop/06d56eacca0c.mp3",
       "audioF": "talk/town/town-03-corner-shop/e4619fb7651e.mp3",
       "next": "r_much"
      },
      {
       "text": "A cap? I'd like a cup of tea.",
       "pt": "Boné? Eu queria uma xícara de chá.",
       "audio": "talk/town/town-03-corner-shop/b5c4d7eaa502.mp3",
       "audioF": "talk/town/town-03-corner-shop/19a67722614d.mp3",
       "next": null,
       "react": {
        "text": "A cup? No, a CAP! On his head! Ha! Do you want to know more?",
        "pt": "Xícara? Não, BONÉ! Na cabeça! Rá! Quer saber mais?",
        "audio": "talk/town/town-03-corner-shop/1719e503cb92.mp3"
       }
      }
     ]
    },
    "r_name": {
     "speaker": "r",
     "text": "No. He just said thank you. Twice. Very polite. Not like Kevin from the Gazette.",
     "pt": "Não. Só disse obrigado. Duas vezes. Muito educado. Não é igual ao Kevin do Gazette.",
     "audio": "talk/town/town-03-corner-shop/1d2d5bbcb452.mp3",
     "next": "r_pay_bank"
    },
    "r_jacket": {
     "speaker": "r",
     "text": "A jacket? Hmm. Maybe red. Maybe brown. I was looking at the coins!",
     "pt": "Jaqueta? Hum. Talvez vermelha. Talvez marrom. Eu estava olhando as moedas!",
     "audio": "talk/town/town-03-corner-shop/d1639c3eec24.mp3",
     "next": "r_pay_bank"
    },
    "r_much": {
     "speaker": "r",
     "text": "Oh, a lot. Maybe eighty pounds. In coins! My arms still hurt.",
     "pt": "Ah, muito. Umas oitenta libras. Em moedas! Meus braços ainda doem.",
     "audio": "talk/town/town-03-corner-shop/43f537247a38.mp3",
     "next": "r_pay_bank"
    },
    "r_pay_bank": {
     "branch": [
      {
       "if": "clue_bank_holiday",
       "next": "r_pay_br"
      },
      {
       "if": null,
       "next": "r_why_me"
      }
     ]
    },
    "r_why_me": {
     "speaker": "r",
     "text": "And why did he come to me? Because the bank is closed. Today is a bank holiday!",
     "pt": "E por que ele veio aqui? Porque o banco está fechado. Hoje é feriado bancário!",
     "audio": "talk/town/town-03-corner-shop/083f18ac7e71.mp3",
     "clue": "bank_holiday",
     "next": "r_pay_br"
    },
    "r_pay_br": {
     "branch": [
      {
       "if": "has_sim=yes",
       "next": "r_pay_sim"
      },
      {
       "if": null,
       "next": "r_pay_food"
      }
     ]
    },
    "r_pay_sim": {
     "speaker": "r",
     "text": "Right! With the SIM card, that's fourteen pounds, please.",
     "pt": "Beleza! Com o chip, dá catorze libras, por favor.",
     "audio": "talk/town/town-03-corner-shop/bdb9030a8c1d.mp3",
     "options": [
      {
       "text": "Here's a twenty-pound note.",
       "pt": "Aqui, uma nota de vinte.",
       "audio": "talk/town/town-03-corner-shop/73e4e72062d5.mp3",
       "audioF": "talk/town/town-03-corner-shop/78495c24587a.mp3",
       "next": "r_change"
      },
      {
       "text": "Can I pay by card?",
       "pt": "Posso pagar no cartão?",
       "audio": "talk/town/town-03-corner-shop/373ba687b1b9.mp3",
       "audioF": "talk/town/town-03-corner-shop/5de220d96564.mp3",
       "next": "r_card"
      },
      {
       "text": "Fourteen pounds? I'm not that heavy!",
       "pt": "Catorze libras? Eu não sou tão pesado assim!",
       "audio": "talk/town/town-03-corner-shop/e2306de68da9.mp3",
       "audioF": "talk/town/town-03-corner-shop/de3f0e00cae4.mp3",
       "next": null,
       "react": {
        "text": "Ha! Pounds are money here, not your weight! Cash or card?",
        "pt": "Rá! Libra aqui é dinheiro, não o seu peso! Dinheiro ou cartão?",
        "audio": "talk/town/town-03-corner-shop/65c6a2327406.mp3"
       }
      }
     ]
    },
    "r_pay_food": {
     "speaker": "r",
     "text": "Right! That's four pounds, please.",
     "pt": "Beleza! Dá quatro libras, por favor.",
     "audio": "talk/town/town-03-corner-shop/5346bf40d475.mp3",
     "options": [
      {
       "text": "Here's a twenty-pound note.",
       "pt": "Aqui, uma nota de vinte.",
       "audio": "talk/town/town-03-corner-shop/73e4e72062d5.mp3",
       "audioF": "talk/town/town-03-corner-shop/78495c24587a.mp3",
       "next": "r_change"
      },
      {
       "text": "Can I pay by card?",
       "pt": "Posso pagar no cartão?",
       "audio": "talk/town/town-03-corner-shop/373ba687b1b9.mp3",
       "audioF": "talk/town/town-03-corner-shop/5de220d96564.mp3",
       "next": "r_card"
      },
      {
       "text": "Four pounds of bread? That's a lot!",
       "pt": "Quatro libras de pão? É muita coisa!",
       "audio": "talk/town/town-03-corner-shop/a9ddbadd1b96.mp3",
       "audioF": "talk/town/town-03-corner-shop/5db1fdacd7b9.mp3",
       "next": null,
       "react": {
        "text": "Ha! Pounds are money here, not weight! Cash or card?",
        "pt": "Rá! Libra aqui é dinheiro, não peso! Dinheiro ou cartão?",
        "audio": "talk/town/town-03-corner-shop/0c623247b48f.mp3"
       }
      }
     ]
    },
    "r_card": {
     "speaker": "r",
     "text": "Oh no, the card machine is broken again! Never mind. Pay me tomorrow. I trust you, number twelve!",
     "pt": "Ah, não, a maquininha quebrou de novo! Deixa pra lá. Me paga amanhã. Confio em você, número doze!",
     "audio": "talk/town/town-03-corner-shop/ae77471e578f.mp3",
     "next": "n_end1"
    },
    "r_change": {
     "speaker": "r",
     "text": "Thank you! And here's your change. In coins, of course. I have SO many coins today!",
     "pt": "Obrigado! E aqui seu troco. Em moedas, claro. Tenho TANTAS moedas hoje!",
     "audio": "talk/town/town-03-corner-shop/b36db0ed93ed.mp3",
     "next": "n_end1"
    },
    "n_end1": {
     "speaker": "n",
     "text": "You walk home with your shopping. The street is quiet now.",
     "pt": "Você volta pra casa com suas compras. A rua agora está tranquila.",
     "audio": "talk/town/town-03-corner-shop/34b605afe387.mp3",
     "next": "n_end2"
    },
    "n_end2": {
     "speaker": "n",
     "text": "A bag of coins. A boy in a cap. A closed bank. Tomorrow, you start at the Gazette.",
     "pt": "Uma sacola de moedas. Um rapaz de boné. Um banco fechado. Amanhã você começa no Gazette.",
     "audio": "talk/town/town-03-corner-shop/f2e67123f93c.mp3",
     "end": true
    }
   },
   "nudges": {
    "r": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-03-corner-shop/5dacad02feaa.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-03-corner-shop/7b2215ee6d4e.mp3"
     }
    ]
   },
   "ambience": "shop",
   "place": "shop",
   "time": "Segunda · 17h",
   "episode": 3
  },
  {
   "slug": "town-04-the-gazette",
   "title": "The Gazette",
   "level": "A2",
   "description": "Primeiro dia no jornal: a chefe, o colega piadista e a sua primeira pauta.",
   "intro": "O Ravi contou que segunda era feriado bancário e que um rapaz de boné trocou muitas moedas na loja dele. Hoje é seu primeiro dia no The Millbrook Gazette.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "m": {
     "name": "Maggie",
     "role": "Editora-chefe do Gazette",
     "side": "left"
    },
    "k": {
     "name": "Kevin",
     "role": "Fotógrafo do Gazette",
     "side": "right"
    }
   },
   "start": "n1",
   "decisions": [
    6,
    8
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "Tuesday morning, nine o'clock. The Gazette office is small, busy and full of paper.",
     "pt": "Terça de manhã, nove horas. A redação do Gazette é pequena, agitada e cheia de papel.",
     "audio": "talk/town/town-04-the-gazette/be05ca39aea5.mp3",
     "next": "m1"
    },
    "m1": {
     "speaker": "m",
     "text": "Ah. You must be our new reporter. I'm Maggie Brennan, the editor.",
     "pt": "Ah. Você deve ser a pessoa nova da reportagem. Sou Maggie Brennan, a editora.",
     "audio": "talk/town/town-04-the-gazette/363ffdeb9d31.mp3",
     "next": "m1b"
    },
    "m1b": {
     "speaker": "m",
     "text": "And you're on time. That's already better than half the office.",
     "pt": "E chegou na hora. Isso já é melhor que metade da redação.",
     "audio": "talk/town/town-04-the-gazette/91904ded17f3.mp3",
     "options": [
      {
       "text": "Nice to meet you, Maggie. Where do I sit?",
       "pt": "Prazer, Maggie. Onde eu sento?",
       "audio": "talk/town/town-04-the-gazette/fbb4daacd274.mp3",
       "audioF": "talk/town/town-04-the-gazette/c22094839a85.mp3",
       "next": "m_desk"
      },
      {
       "text": "Good morning! I'm really excited to start.",
       "pt": "Bom dia! Estou com muita vontade de começar.",
       "audio": "talk/town/town-04-the-gazette/645a5f541f9d.mp3",
       "audioF": "talk/town/town-04-the-gazette/98b98731ab54.mp3",
       "next": "m_excited"
      },
      {
       "text": "Thanks. Is the other half on holiday?",
       "pt": "Valeu. A outra metade está de férias?",
       "audio": "talk/town/town-04-the-gazette/17d6dbee6563.mp3",
       "audioF": "talk/town/town-04-the-gazette/1232c21094bf.mp3",
       "next": "m_half"
      },
      {
       "text": "Yes, I ate half a cake.",
       "pt": "Sim, comi meio bolo.",
       "audio": "talk/town/town-04-the-gazette/539b412f1949.mp3",
       "audioF": "talk/town/town-04-the-gazette/cf4fcc59c15c.mp3",
       "next": null,
       "react": {
        "text": "Lovely. Not relevant, but lovely. Shall we start again? Good morning.",
        "pt": "Que lindo. Nada a ver, mas lindo. Vamos recomeçar? Bom dia.",
        "audio": "talk/town/town-04-the-gazette/0d98d5b8827a.mp3"
       }
      }
     ]
    },
    "m_desk": {
     "speaker": "m",
     "text": "Over there. Next to Kevin, our photographer. Try not to encourage him.",
     "pt": "Ali. Do lado do Kevin, nosso fotógrafo. Tente não dar corda pra ele.",
     "audio": "talk/town/town-04-the-gazette/83c89bd2232e.mp3",
     "next": "m_kevin"
    },
    "m_excited": {
     "speaker": "m",
     "text": "Excited. Lovely. That usually lasts about a week. Your desk is over there.",
     "pt": "Empolgação. Que lindo. Isso costuma durar uma semana. Sua mesa é ali.",
     "audio": "talk/town/town-04-the-gazette/290eaa20cfad.mp3",
     "next": "m_kevin"
    },
    "m_half": {
     "speaker": "m",
     "text": "Ha! I like that. No, the other half is Kevin. He's always late. Except today, strangely.",
     "pt": "Rá! Gostei. Não, a outra metade é o Kevin. Sempre se atrasa. Menos hoje, estranhamente.",
     "audio": "talk/town/town-04-the-gazette/bdfe64a26289.mp3",
     "next": "m_kevin"
    },
    "m_kevin": {
     "speaker": "m",
     "text": "Kevin! Come and say hello. And no jokes.",
     "pt": "Kevin! Vem dar oi. E nada de piadas.",
     "audio": "talk/town/town-04-the-gazette/93a3bf7a6cac.mp3",
     "next": "k1"
    },
    "k1": {
     "speaker": "k",
     "text": "Hey! Welcome to the Gazette! I'm Kevin. Want to hear a joke?",
     "pt": "E aí! Boas-vindas ao Gazette! Sou o Kevin. Quer ouvir uma piada?",
     "audio": "talk/town/town-04-the-gazette/2bdef0d3b308.mp3",
     "options": [
      {
       "text": "Sure, go on!",
       "pt": "Claro, manda!",
       "audio": "talk/town/town-04-the-gazette/fa93286bec18.mp3",
       "audioF": "talk/town/town-04-the-gazette/b81314994fa8.mp3",
       "next": "k_joke"
      },
      {
       "text": "Maybe later. I want to start work.",
       "pt": "Talvez depois. Quero começar a trabalhar.",
       "audio": "talk/town/town-04-the-gazette/cf093ba0c7b7.mp3",
       "audioF": "talk/town/town-04-the-gazette/526ccd0fb9c1.mp3",
       "next": "k_later",
       "set": {
        "kevin_friend": "no"
       }
      },
      {
       "text": "Yes, a Coke, please.",
       "pt": "Sim, uma Coca, por favor.",
       "audio": "talk/town/town-04-the-gazette/7413c8c3510f.mp3",
       "audioF": "talk/town/town-04-the-gazette/c8f87b8710a6.mp3",
       "next": null,
       "react": {
        "text": "A Coke? Ha! No, a JOKE. Something funny. Do you want one?",
        "pt": "Uma Coca? Rá! Não, uma PIADA. Algo engraçado. Quer ouvir uma?",
        "audio": "talk/town/town-04-the-gazette/f51ace1f62c1.mp3"
       }
      }
     ]
    },
    "k_joke": {
     "speaker": "k",
     "text": "Why did the newspaper go to the doctor? It had too many issues!",
     "pt": "Por que o jornal foi ao médico? Tinha 'issues' demais! (issues = edições e também problemas)",
     "audio": "talk/town/town-04-the-gazette/708ccf7d566d.mp3",
     "options": [
      {
       "text": "Ha! That's a good one!",
       "pt": "Rá! Essa foi boa!",
       "audio": "talk/town/town-04-the-gazette/230adf9ba3d6.mp3",
       "audioF": "talk/town/town-04-the-gazette/f1691405b91d.mp3",
       "next": "k_happy",
       "set": {
        "kevin_friend": "yes"
       }
      },
      {
       "text": "Oh no, that's terrible. Tell me another one!",
       "pt": "Ai, não, que horrível. Conta outra!",
       "audio": "talk/town/town-04-the-gazette/c6f0acd17ca7.mp3",
       "audioF": "talk/town/town-04-the-gazette/df9013082bf4.mp3",
       "next": "k_another",
       "set": {
        "kevin_friend": "yes"
       }
      },
      {
       "text": "Please, no more jokes.",
       "pt": "Por favor, chega de piadas.",
       "audio": "talk/town/town-04-the-gazette/97355a39807f.mp3",
       "audioF": "talk/town/town-04-the-gazette/df691d2e49e6.mp3",
       "next": "k_later",
       "set": {
        "kevin_friend": "no"
       }
      },
      {
       "text": "Oh, I'm sorry. Is the newspaper okay now?",
       "pt": "Ah, que pena. O jornal está bem agora?",
       "audio": "talk/town/town-04-the-gazette/26474b8dfd09.mp3",
       "audioF": "talk/town/town-04-the-gazette/2b8ee51e9d52.mp3",
       "next": null,
       "react": {
        "text": "Ha! It's a joke! The newspaper isn't sick! Issues! Get it?",
        "pt": "Rá! É piada! O jornal não está doente! Issues! Entendeu?",
        "audio": "talk/town/town-04-the-gazette/cf4bcf81bea3.mp3"
       }
      }
     ]
    },
    "k_happy": {
     "speaker": "k",
     "text": "See, Maggie? Somebody likes my jokes! We're going to be great friends.",
     "pt": "Viu, Maggie? Alguém gosta das minhas piadas! A gente vai se dar muito bem.",
     "audio": "talk/town/town-04-the-gazette/92b8313d4366.mp3",
     "next": "n_jacket"
    },
    "k_another": {
     "speaker": "k",
     "text": "A fan! Okay. What's black and white and read all over? A newspaper!",
     "pt": "Tenho público! Lá vai. O que é preto e branco e 'red' por todo lado? Um jornal! (read, lido, soa como red, vermelho)",
     "audio": "talk/town/town-04-the-gazette/d5de1c84a020.mp3",
     "next": "n_jacket"
    },
    "k_later": {
     "speaker": "k",
     "text": "Oh. Okay. A serious one. Got it. I'll save my jokes for Maggie.",
     "pt": "Ah. Tá. Pessoa séria. Entendi. Guardo minhas piadas pra Maggie.",
     "audio": "talk/town/town-04-the-gazette/a2d885beaf54.mp3",
     "next": "n_jacket"
    },
    "n_jacket": {
     "speaker": "n",
     "text": "Kevin sits down. He's wearing a bright red jacket.",
     "pt": "O Kevin se senta. Ele está usando uma jaqueta vermelha bem chamativa.",
     "audio": "talk/town/town-04-the-gazette/7f7c26c96cf7.mp3",
     "next": "jacket_br"
    },
    "jacket_br": {
     "branch": [
      {
       "if": "clue_red_jacket",
       "next": "n_jacket_red"
      },
      {
       "if": null,
       "next": "m_meeting"
      }
     ]
    },
    "n_jacket_red": {
     "speaker": "n",
     "text": "A red jacket. Just like yesterday, at the café. What do you say?",
     "pt": "Uma jaqueta vermelha. Igualzinho a ontem, no café. O que você diz?",
     "audio": "talk/town/town-04-the-gazette/735a8ab034f1.mp3",
     "options": [
      {
       "text": "Nice jacket, Kevin. Where were you yesterday at nine?",
       "pt": "Bela jaqueta, Kevin. Onde você estava ontem às nove?",
       "audio": "talk/town/town-04-the-gazette/571d66bc4847.mp3",
       "audioF": "talk/town/town-04-the-gazette/b1f691205a1d.mp3",
       "next": "k_where",
       "set": {
        "asked_kevin": "yes"
       }
      },
      {
       "text": "Hey, Kevin. Nice jacket!",
       "pt": "Ei, Kevin. Bela jaqueta!",
       "audio": "talk/town/town-04-the-gazette/4b284a5674f6.mp3",
       "audioF": "talk/town/town-04-the-gazette/610086320d8f.mp3",
       "next": "k_nice"
      },
      {
       "text": "My jacket is at the dentist.",
       "pt": "Minha jaqueta está no dentista.",
       "audio": "talk/town/town-04-the-gazette/d3aa4c7e43aa.mp3",
       "audioF": "talk/town/town-04-the-gazette/8005e2910bdb.mp3",
       "next": null,
       "react": {
        "text": "Kevin looks at you strangely. Try again. What do you say?",
        "pt": "O Kevin te olha com estranheza. Tente de novo. O que você diz?",
        "audio": "talk/town/town-04-the-gazette/c89147131100.mp3"
       }
      }
     ]
    },
    "k_where": {
     "speaker": "k",
     "text": "Whoa! Is this an interview? I was busy. Very busy. Ha.",
     "pt": "Opa! Isso é uma entrevista? Eu estava ocupado. Muito ocupado. Rá.",
     "audio": "talk/town/town-04-the-gazette/9d5e77d52f03.mp3",
     "next": "m_sus"
    },
    "m_sus": {
     "speaker": "m",
     "text": "Kevin, you've gone red. That's never happened before.",
     "pt": "Kevin, você ficou vermelho. Isso nunca aconteceu antes.",
     "audio": "talk/town/town-04-the-gazette/42894ca742ae.mp3",
     "next": "m_meeting"
    },
    "k_nice": {
     "speaker": "k",
     "text": "Thanks! It's my lucky jacket. Well, not very lucky this week.",
     "pt": "Valeu! É minha jaqueta da sorte. Bom, não muito sortuda essa semana.",
     "audio": "talk/town/town-04-the-gazette/b07026747903.mp3",
     "next": "m_meeting"
    },
    "m_meeting": {
     "speaker": "m",
     "text": "Right. Story meeting. Thursday is the harbour festival, and I want a special edition.",
     "pt": "Certo. Reunião de pauta. Quinta é o festival do porto, e quero uma edição especial.",
     "audio": "talk/town/town-04-the-gazette/c2c55cf9fba6.mp3",
     "next": "m_jar"
    },
    "m_jar": {
     "speaker": "m",
     "text": "And the big story is the missing jar from the Corner Café.",
     "pt": "E a grande matéria é o pote que sumiu do Corner Café.",
     "audio": "talk/town/town-04-the-gazette/7c235fa3467b.mp3",
     "options": [
      {
       "text": "I know! I was there when it disappeared.",
       "pt": "Eu sei! Eu estava lá quando ele sumiu.",
       "audio": "talk/town/town-04-the-gazette/2670ec54d40d.mp3",
       "audioF": "talk/town/town-04-the-gazette/0381b4c28afc.mp3",
       "next": "m_there"
      },
      {
       "text": "Why is a jar a big story?",
       "pt": "Por que um pote é uma grande matéria?",
       "audio": "talk/town/town-04-the-gazette/6df962800404.mp3",
       "audioF": "talk/town/town-04-the-gazette/8b11b2ba8be8.mp3",
       "next": "m_why"
      },
      {
       "text": "Kevin should write it. He's got the red jacket.",
       "pt": "O Kevin devia escrever. Ele tem a jaqueta vermelha.",
       "audio": "talk/town/town-04-the-gazette/0a1d867d599f.mp3",
       "audioF": "talk/town/town-04-the-gazette/72468fb83910.mp3",
       "next": "k_hey"
      },
      {
       "text": "The car? I didn't see a car.",
       "pt": "O carro? Não vi carro nenhum.",
       "audio": "talk/town/town-04-the-gazette/349a2afa601c.mp3",
       "audioF": "talk/town/town-04-the-gazette/26de7b6d8129.mp3",
       "next": null,
       "react": {
        "text": "Not a car. A JAR. Glass. Full of coins. Do keep up.",
        "pt": "Não é carro. É POTE. De vidro. Cheio de moedas. Acompanhe, por favor.",
        "audio": "talk/town/town-04-the-gazette/f1a9b03141eb.mp3"
       }
      }
     ]
    },
    "m_there": {
     "speaker": "m",
     "text": "You were there? A witness, on your second day. Brilliant. Poor Emma.",
     "pt": "Você estava lá? Testemunha, já no segundo dia. Brilhante. Coitada da Emma.",
     "audio": "talk/town/town-04-the-gazette/0e8549d35d96.mp3",
     "next": "m_why2"
    },
    "m_why": {
     "speaker": "m",
     "text": "Because in Millbrook, nothing happens. A missing jar is our crime of the century.",
     "pt": "Porque em Millbrook nada acontece. Um pote sumido é nosso crime do século.",
     "audio": "talk/town/town-04-the-gazette/910c5f1de1f8.mp3",
     "next": "m_why2"
    },
    "k_hey": {
     "speaker": "k",
     "text": "Hey! I'm a photographer, not a thief! And not a writer, either.",
     "pt": "Ei! Sou fotógrafo, não ladrão! E também não sou escritor.",
     "audio": "talk/town/town-04-the-gazette/d5f5e12a25c2.mp3",
     "next": "m_hey"
    },
    "m_hey": {
     "speaker": "m",
     "text": "True. Kevin can't write a shopping list. The story is yours.",
     "pt": "Verdade. O Kevin não sabe escrever nem lista de compras. A matéria é sua.",
     "audio": "talk/town/town-04-the-gazette/636e089dc78e.mp3",
     "next": "m_why2"
    },
    "m_why2": {
     "speaker": "m",
     "text": "And it's not just money, you know. That jar was a little dream.",
     "pt": "E não é só dinheiro, sabe. Aquele pote era um pequeno sonho.",
     "audio": "talk/town/town-04-the-gazette/39f42e6f9dbd.mp3",
     "next": "m_notebook"
    },
    "m_notebook": {
     "speaker": "m",
     "text": "Now. First rule of the Gazette: always carry a notebook. Have you got one?",
     "pt": "Agora. Primeira regra do Gazette: sempre ande com um caderninho. Você tem um?",
     "audio": "talk/town/town-04-the-gazette/48d162dfb4d4.mp3",
     "options": [
      {
       "text": "Yes, right here.",
       "pt": "Tenho, está aqui.",
       "audio": "talk/town/town-04-the-gazette/35773784f2f3.mp3",
       "audioF": "talk/town/town-04-the-gazette/4a01428cd141.mp3",
       "next": "m_idea_q"
      },
      {
       "text": "No. Can I borrow one?",
       "pt": "Não. Posso pegar um emprestado?",
       "audio": "talk/town/town-04-the-gazette/7b42623eb54c.mp3",
       "audioF": "talk/town/town-04-the-gazette/badc14bb9897.mp3",
       "next": "k_notebook"
      },
      {
       "text": "Yes, I've got a note. Ten pounds.",
       "pt": "Sim, tenho uma nota. De dez libras.",
       "audio": "talk/town/town-04-the-gazette/0dd1bd52161c.mp3",
       "audioF": "talk/town/town-04-the-gazette/e3971d813015.mp3",
       "next": null,
       "react": {
        "text": "Not a banknote. A NOTEBOOK. For writing. Have you got one?",
        "pt": "Nota de dinheiro, não. Um CADERNO. Pra escrever. Você tem?",
        "audio": "talk/town/town-04-the-gazette/34bc740cb48b.mp3"
       }
      }
     ]
    },
    "k_notebook": {
     "speaker": "k",
     "text": "Take mine! Careful, the last pages are full of jokes.",
     "pt": "Pega o meu! Cuidado, as últimas páginas estão cheias de piadas.",
     "audio": "talk/town/town-04-the-gazette/8e6914302e42.mp3",
     "next": "m_idea_q"
    },
    "m_idea_q": {
     "speaker": "m",
     "text": "Good. Write this down. Do you know whose idea the jar was?",
     "pt": "Ótimo. Anote isso. Sabe de quem foi a ideia do pote?",
     "audio": "talk/town/town-04-the-gazette/62e54ff0133e.mp3",
     "options": [
      {
       "text": "Emma's, I think?",
       "pt": "Da Emma, acho?",
       "audio": "talk/town/town-04-the-gazette/4e79d83e9292.mp3",
       "audioF": "talk/town/town-04-the-gazette/7ba0663295ad.mp3",
       "next": "m_notemma"
      },
      {
       "text": "No. Whose idea was it?",
       "pt": "Não. De quem foi?",
       "audio": "talk/town/town-04-the-gazette/40ddf67f6998.mp3",
       "audioF": "talk/town/town-04-the-gazette/e14849113fd0.mp3",
       "next": "m_idea"
      },
      {
       "text": "Does it matter? I just want to find the jar.",
       "pt": "Isso importa? Eu só quero achar o pote.",
       "audio": "talk/town/town-04-the-gazette/839703b510ff.mp3",
       "audioF": "talk/town/town-04-the-gazette/4b8f9cd3aaec.mp3",
       "next": "m_matter"
      },
      {
       "text": "It was a glass idea.",
       "pt": "Foi uma ideia de vidro.",
       "audio": "talk/town/town-04-the-gazette/c2b97cb4859c.mp3",
       "audioF": "talk/town/town-04-the-gazette/9528e4eb990b.mp3",
       "next": null,
       "react": {
        "text": "A glass idea. Goodness. No. Whose idea was it? Which person?",
        "pt": "Uma ideia de vidro. Minha nossa. Não. De quem foi a ideia? Que pessoa?",
        "audio": "talk/town/town-04-the-gazette/54091908fd04.mp3"
       }
      }
     ]
    },
    "m_notemma": {
     "speaker": "m",
     "text": "Good guess. Wrong, but good. It was Sam's idea. Emma's little brother.",
     "pt": "Bom palpite. Errado, mas bom. Foi ideia do Sam. O irmão mais novo da Emma.",
     "audio": "talk/town/town-04-the-gazette/8195afe1d7e8.mp3",
     "clue": "jar_idea",
     "next": "k_sam"
    },
    "m_idea": {
     "speaker": "m",
     "text": "Sam's. Emma's brother. He's seventeen. He made the jar, the sign, everything.",
     "pt": "Do Sam. O irmão da Emma. Ele tem dezessete. Fez o pote, a placa, tudo.",
     "audio": "talk/town/town-04-the-gazette/e07dac7056e4.mp3",
     "clue": "jar_idea",
     "next": "k_sam"
    },
    "k_sam": {
     "speaker": "k",
     "text": "Sam's a good kid. He plays guitar at the market with Leo. Not as funny as me.",
     "pt": "O Sam é um bom garoto. Toca violão na feira com o Leo. Não é tão engraçado quanto eu.",
     "audio": "talk/town/town-04-the-gazette/84d31872103e.mp3",
     "next": "m_plan"
    },
    "m_matter": {
     "speaker": "m",
     "text": "Everything matters. That's journalism. But fine. Go and find your jar.",
     "pt": "Tudo importa. Isso é jornalismo. Mas tudo bem. Vá achar seu pote.",
     "audio": "talk/town/town-04-the-gazette/68369953b4c7.mp3",
     "next": "m_plan"
    },
    "m_plan": {
     "speaker": "m",
     "text": "So. How do you want to start?",
     "pt": "Então. Como você quer começar?",
     "audio": "talk/town/town-04-the-gazette/6f2fbf6c85af.mp3",
     "options": [
      {
       "text": "I'd like to talk to the police.",
       "pt": "Eu queria falar com a polícia.",
       "audio": "talk/town/town-04-the-gazette/81426115d081.mp3",
       "audioF": "talk/town/town-04-the-gazette/0f9bab1d5a36.mp3",
       "next": "m_police"
      },
      {
       "text": "I'll talk to people in town first.",
       "pt": "Vou falar com o pessoal da cidade primeiro.",
       "audio": "talk/town/town-04-the-gazette/2ff2ac4ffbb7.mp3",
       "audioF": "talk/town/town-04-the-gazette/947c0cb2b632.mp3",
       "next": "m_town"
      },
      {
       "text": "Can Kevin come with me? For photos.",
       "pt": "O Kevin pode ir comigo? Pras fotos.",
       "audio": "talk/town/town-04-the-gazette/ed767de9940d.mp3",
       "audioF": "talk/town/town-04-the-gazette/789d25c11953.mp3",
       "next": "k_photos"
      },
      {
       "text": "On Tuesday, at nine.",
       "pt": "Na terça, às nove.",
       "audio": "talk/town/town-04-the-gazette/791b3813c9ef.mp3",
       "audioF": "talk/town/town-04-the-gazette/667cf84d7914.mp3",
       "next": null,
       "react": {
        "text": "It IS Tuesday at nine. I mean, who do you talk to first?",
        "pt": "Já É terça, nove horas. Quero dizer, com quem você fala primeiro?",
        "audio": "talk/town/town-04-the-gazette/7f68a50d95a1.mp3"
       }
      }
     ]
    },
    "m_police": {
     "speaker": "m",
     "text": "Good. Officer Ruiz will see you at two. She's very precise. Don't waste her time.",
     "pt": "Ótimo. A policial Ruiz te recebe às duas. Ela é muito precisa. Não desperdice o tempo dela.",
     "audio": "talk/town/town-04-the-gazette/9e768643ac44.mp3",
     "next": "k_bye"
    },
    "m_town": {
     "speaker": "m",
     "text": "Talk to everyone. But start with the police. Officer Ruiz, at two o'clock.",
     "pt": "Fale com todo mundo. Mas comece pela polícia. Policial Ruiz, às duas.",
     "audio": "talk/town/town-04-the-gazette/d61e1ec045c9.mp3",
     "next": "k_bye"
    },
    "k_photos": {
     "speaker": "k",
     "text": "Me? Today? Er, sorry. I've got a thing. A dentist thing. Again.",
     "pt": "Eu? Hoje? Hã, desculpa. Tenho uma coisa. Coisa de dentista. De novo.",
     "audio": "talk/town/town-04-the-gazette/0365df85aee3.mp3",
     "next": "m_teeth"
    },
    "m_teeth": {
     "speaker": "m",
     "text": "Kevin and his teeth. Go on your own. Officer Ruiz will see you at two.",
     "pt": "O Kevin e seus dentes. Vá sem ele. A policial Ruiz te recebe às duas.",
     "audio": "talk/town/town-04-the-gazette/990667035a06.mp3",
     "next": "k_bye"
    },
    "k_bye": {
     "branch": [
      {
       "if": "kevin_friend=yes",
       "next": "k_bye_friend"
      },
      {
       "if": null,
       "next": "k_bye_cold"
      }
     ]
    },
    "k_bye_friend": {
     "speaker": "k",
     "text": "Good luck, detective! And stop looking at my jacket. Ha!",
     "pt": "Boa sorte, detetive! E pare de olhar pra minha jaqueta. Rá!",
     "audio": "talk/town/town-04-the-gazette/e4d449e4d0af.mp3",
     "next": "n_end"
    },
    "k_bye_cold": {
     "speaker": "k",
     "text": "Bye, then. Good luck with the jar.",
     "pt": "Tchau, então. Boa sorte com o pote.",
     "audio": "talk/town/town-04-the-gazette/79f7fed201f8.mp3",
     "next": "n_end"
    },
    "n_end": {
     "speaker": "n",
     "text": "Your first story. At two o'clock, you walk to the police station.",
     "pt": "Sua primeira matéria. Às duas, você vai até a delegacia.",
     "audio": "talk/town/town-04-the-gazette/8f62cdd64dbd.mp3",
     "end": true
    }
   },
   "nudges": {
    "m": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-04-the-gazette/2ec231f8f022.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-04-the-gazette/f93d11464f9f.mp3"
     }
    ],
    "k": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-04-the-gazette/723b4e03956c.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-04-the-gazette/02f14f91271d.mp3"
     }
    ]
   },
   "ambience": "office",
   "place": "office",
   "time": "Terça · 9h",
   "episode": 4
  },
  {
   "slug": "town-05-police-station",
   "title": "The Police Station",
   "level": "B1",
   "description": "Entreviste a policial Ruiz: só fatos, nada de palpites.",
   "intro": "A Maggie te deu sua primeira pauta: o pote sumido, para a edição do festival. E contou que o pote foi ideia do Sam. Agora você entrevista a policial Ruiz.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "o": {
     "name": "Officer Ruiz",
     "role": "Policial da cidade",
     "side": "left"
    }
   },
   "start": "n1",
   "decisions": [
    5,
    10
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "The police station is small and very quiet. A clock ticks on the wall.",
     "pt": "A delegacia é pequena e bem silenciosa. Um relógio faz tique-taque na parede.",
     "audio": "talk/town/town-05-police-station/0229020757a7.mp3",
     "next": "n2"
    },
    "n2": {
     "speaker": "n",
     "text": "At exactly two o'clock, a woman in uniform comes out of her office.",
     "pt": "Às duas em ponto, uma mulher de uniforme sai da sala dela.",
     "audio": "talk/town/town-05-police-station/cc5a9a8356d0.mp3",
     "next": "o1"
    },
    "o1": {
     "speaker": "o",
     "text": "Good afternoon. I'm Officer Lucy Ruiz. Maggie told me you'd be coming. Have a seat.",
     "pt": "Boa tarde. Sou a policial Lucy Ruiz. A Maggie avisou que você vinha. Sente-se.",
     "audio": "talk/town/town-05-police-station/f0f065be52ff.mp3",
     "options": [
      {
       "text": "Thanks for seeing me. I'm writing about the missing jar.",
       "pt": "Agradeço por me receber. Estou escrevendo sobre o pote sumido.",
       "audio": "talk/town/town-05-police-station/d9756c041c1e.mp3",
       "audioF": "talk/town/town-05-police-station/b2a0acbf5d4b.mp3",
       "next": "o_story"
      },
      {
       "text": "Thank you. Is this still a good time?",
       "pt": "Agradeço. Ainda é uma boa hora?",
       "audio": "talk/town/town-05-police-station/32c21b963666.mp3",
       "audioF": "talk/town/town-05-police-station/ed59501f8967.mp3",
       "next": "o_time"
      },
      {
       "text": "Thanks, I'll take the seat home.",
       "pt": "Valeu, vou levar a cadeira pra casa.",
       "audio": "talk/town/town-05-police-station/b27bf9fa9e25.mp3",
       "audioF": "talk/town/town-05-police-station/e05dca9eb56c.mp3",
       "next": null,
       "react": {
        "text": "Please don't take the furniture. Just sit down. What can I do for you?",
        "pt": "Por favor, não leve os móveis. Só sente. Em que posso ajudar?",
        "audio": "talk/town/town-05-police-station/030a4bef7e44.mp3"
       }
      }
     ]
    },
    "o_story": {
     "speaker": "o",
     "text": "The jar. Of course. Half of Millbrook has phoned me about it.",
     "pt": "O pote. Claro. Metade de Millbrook já me ligou por causa dele.",
     "audio": "talk/town/town-05-police-station/9fa2144b77c9.mp3",
     "next": "o_record"
    },
    "o_time": {
     "speaker": "o",
     "text": "For the Gazette, I have ten minutes. Exactly ten. It's about the jar, I suppose?",
     "pt": "Pro Gazette, eu tenho dez minutos. Exatamente dez. É sobre o pote, imagino?",
     "audio": "talk/town/town-05-police-station/70ffa45b19bf.mp3",
     "next": "o_record"
    },
    "o_record": {
     "speaker": "o",
     "text": "Before we start. You can quote me, but only on facts. No guesses. Agreed?",
     "pt": "Antes de começar. Pode me citar, mas só em fatos. Nada de palpites. Combinado?",
     "audio": "talk/town/town-05-police-station/3fd587cb180a.mp3",
     "options": [
      {
       "text": "Agreed. Only facts.",
       "pt": "Combinado. Só fatos.",
       "audio": "talk/town/town-05-police-station/4d7019368303.mp3",
       "audioF": "talk/town/town-05-police-station/ad2adc65030b.mp3",
       "next": "o_ask"
      },
      {
       "text": "Can I record our conversation?",
       "pt": "Posso gravar nossa conversa?",
       "audio": "talk/town/town-05-police-station/5c9001b4fc2f.mp3",
       "audioF": "talk/town/town-05-police-station/e23c4ea8d6e0.mp3",
       "next": "o_rec"
      },
      {
       "text": "Okay, no geese in the story.",
       "pt": "Tá, nada de gansos na matéria.",
       "audio": "talk/town/town-05-police-station/226d2b67889f.mp3",
       "audioF": "talk/town/town-05-police-station/b0a00d1b8a31.mp3",
       "next": null,
       "react": {
        "text": "Geese? Guesses! No guessing. Only facts. Agreed?",
        "pt": "Gansos? Palpites! Nada de chutes. Só fatos. Combinado?",
        "audio": "talk/town/town-05-police-station/01fe576dc295.mp3"
       }
      }
     ]
    },
    "o_rec": {
     "speaker": "o",
     "text": "Yes, that's fine. I prefer it, actually. Fewer mistakes.",
     "pt": "Sim, pode. Prefiro, na verdade. Menos erros.",
     "audio": "talk/town/town-05-police-station/ee9d4468f486.mp3",
     "next": "o_ask"
    },
    "o_ask": {
     "speaker": "o",
     "text": "Go ahead. What would you like to know?",
     "pt": "Pode perguntar. O que você gostaria de saber?",
     "audio": "talk/town/town-05-police-station/adde3fba2459.mp3",
     "options": [
      {
       "text": "What do you know so far?",
       "pt": "O que vocês sabem até agora?",
       "audio": "talk/town/town-05-police-station/01bc7a11a49e.mp3",
       "audioF": "talk/town/town-05-police-station/2c727e439616.mp3",
       "next": "o_window"
      },
      {
       "text": "Was there a camera in the café?",
       "pt": "Tinha câmera no café?",
       "audio": "talk/town/town-05-police-station/d1b0ddcf3bc9.mp3",
       "audioF": "talk/town/town-05-police-station/ad3da3405f55.mp3",
       "next": "o_camera"
      },
      {
       "text": "Do you have any suspects?",
       "pt": "Vocês têm algum suspeito?",
       "audio": "talk/town/town-05-police-station/a11660659ecb.mp3",
       "audioF": "talk/town/town-05-police-station/a64bdd525fa5.mp3",
       "next": "o_suspects"
      },
      {
       "text": "I'd like to know English, please.",
       "pt": "Eu queria saber inglês, por favor.",
       "audio": "talk/town/town-05-police-station/feab4a126aa4.mp3",
       "audioF": "talk/town/town-05-police-station/8924dd479c4f.mp3",
       "next": null,
       "react": {
        "text": "You're doing fine. Ask me about the case. What do you want to know?",
        "pt": "Você está indo bem. Me pergunte sobre o caso. O que quer saber?",
        "audio": "talk/town/town-05-police-station/992e9a48b793.mp3"
       }
      }
     ]
    },
    "o_window": {
     "speaker": "o",
     "text": "The jar disappeared between ten past nine and twenty past nine. Emma is sure about that.",
     "pt": "O pote sumiu entre nove e dez e nove e vinte. A Emma tem certeza disso.",
     "audio": "talk/town/town-05-police-station/62567d827208.mp3",
     "clue": "time_window",
     "next": "o_window2"
    },
    "o_window2": {
     "speaker": "o",
     "text": "At ten past, she put a coin in it herself. At twenty past, it was gone.",
     "pt": "Às nove e dez, ela mesma pôs uma moeda nele. Às nove e vinte, tinha sumido.",
     "audio": "talk/town/town-05-police-station/b0425ad42515.mp3",
     "next": "o_camera_q"
    },
    "o_camera_q": {
     "speaker": "o",
     "text": "There's also the café camera. Would you like to hear about that?",
     "pt": "Tem também a câmera do café. Quer saber sobre ela?",
     "audio": "talk/town/town-05-police-station/2370a95f693d.mp3",
     "options": [
      {
       "text": "Yes, please. What does it show?",
       "pt": "Sim, por favor. O que ela mostra?",
       "audio": "talk/town/town-05-police-station/46426efb969b.mp3",
       "audioF": "talk/town/town-05-police-station/45e99f352c10.mp3",
       "next": "o_camera2"
      },
      {
       "text": "First, can I tell you what I saw?",
       "pt": "Antes, posso te contar o que eu vi?",
       "audio": "talk/town/town-05-police-station/3121df3f0a2e.mp3",
       "audioF": "talk/town/town-05-police-station/c807b7e1286c.mp3",
       "next": "o_saw_first"
      },
      {
       "text": "No, thanks. I've got a camera on my phone.",
       "pt": "Não, valeu. Tenho câmera no celular.",
       "audio": "talk/town/town-05-police-station/045c21bf4adf.mp3",
       "audioF": "talk/town/town-05-police-station/613935244964.mp3",
       "next": null,
       "react": {
        "text": "I'm sure it's lovely. I mean the café's camera. Do you want to hear?",
        "pt": "Imagino que seja ótima. Falo da câmera do café. Quer ouvir?",
        "audio": "talk/town/town-05-police-station/a1d2ddc91d4e.mp3"
       }
      }
     ]
    },
    "o_suspects": {
     "speaker": "o",
     "text": "I can't name suspects. But a lot of people have called about one person.",
     "pt": "Não posso citar suspeitos. Mas muita gente ligou falando de uma pessoa.",
     "audio": "talk/town/town-05-police-station/2b4494d2dc5f.mp3",
     "next": "o_kevin"
    },
    "o_kevin": {
     "speaker": "o",
     "text": "Kevin Moore, your photographer. Because of his red jacket. Half the town has one, though.",
     "pt": "Kevin Moore, o fotógrafo de vocês. Por causa da jaqueta vermelha. Mas metade da cidade tem uma.",
     "audio": "talk/town/town-05-police-station/226dcdec1ae9.mp3",
     "options": [
      {
       "text": "Why a red jacket? What did people see?",
       "pt": "Por que jaqueta vermelha? O que as pessoas viram?",
       "audio": "talk/town/town-05-police-station/9fc7f7ba5093.mp3",
       "audioF": "talk/town/town-05-police-station/d88a06bc1e6b.mp3",
       "next": "o_camera"
      },
      {
       "text": "Kevin? He tells bad jokes, but he's not a thief.",
       "pt": "O Kevin? Ele conta piadas ruins, mas não é ladrão.",
       "audio": "talk/town/town-05-police-station/10700a16b228.mp3",
       "audioF": "talk/town/town-05-police-station/d586473f894b.mp3",
       "next": "o_kevin2"
      },
      {
       "text": "Half the town has a Kevin?",
       "pt": "Metade da cidade tem um Kevin?",
       "audio": "talk/town/town-05-police-station/2ff9e171763f.mp3",
       "audioF": "talk/town/town-05-police-station/d366a9d55e3f.mp3",
       "next": null,
       "react": {
        "text": "No. Half the town has a red jacket. One Kevin is enough. Any questions about that?",
        "pt": "Não. Metade da cidade tem uma jaqueta vermelha. Um Kevin já basta. Alguma pergunta sobre isso?",
        "audio": "talk/town/town-05-police-station/e102405faf48.mp3"
       }
      }
     ]
    },
    "o_kevin2": {
     "speaker": "o",
     "text": "Bad jokes aren't a crime. Not yet, anyway. Let me tell you what we know.",
     "pt": "Piada ruim não é crime. Pelo menos ainda não. Deixe-me contar o que sabemos.",
     "audio": "talk/town/town-05-police-station/b1df6c741210.mp3",
     "next": "o_window"
    },
    "o_camera": {
     "speaker": "o",
     "text": "There's one camera, above the café door. It's old. The picture is terrible.",
     "pt": "Tem uma câmera em cima da porta do café. É velha. A imagem é horrível.",
     "audio": "talk/town/town-05-police-station/fff11677b25f.mp3",
     "next": "o_camera2"
    },
    "o_camera2": {
     "speaker": "o",
     "text": "It only shows a red sleeve. An arm in a red jacket, near the counter. That's all.",
     "pt": "Só mostra uma manga vermelha. Um braço de jaqueta vermelha, perto do balcão. Só isso.",
     "audio": "talk/town/town-05-police-station/ed635b294e3f.mp3",
     "next": "o_cam_after"
    },
    "o_cam_after": {
     "branch": [
      {
       "if": "clue_time_window",
       "next": "o_saw"
      },
      {
       "if": null,
       "next": "o_window_late"
      }
     ]
    },
    "o_window_late": {
     "speaker": "o",
     "text": "And one more fact. The jar disappeared between ten past nine and twenty past nine.",
     "pt": "E mais um fato. O pote sumiu entre nove e dez e nove e vinte.",
     "audio": "talk/town/town-05-police-station/a51079e3ba51.mp3",
     "clue": "time_window",
     "next": "o_saw"
    },
    "o_saw": {
     "speaker": "o",
     "text": "Emma says you were sitting by the window. Did you see anything?",
     "pt": "A Emma disse que você estava perto da janela. Viu alguma coisa?",
     "audio": "talk/town/town-05-police-station/d04cbe701994.mp3",
     "next": "o_saw_br"
    },
    "o_saw_first": {
     "speaker": "o",
     "text": "Please, go ahead. Emma says you were by the window.",
     "pt": "Por favor, pode falar. A Emma disse que você estava perto da janela.",
     "audio": "talk/town/town-05-police-station/f72ba19743ba.mp3",
     "next": "o_saw_br"
    },
    "o_saw_br": {
     "branch": [
      {
       "if": "clue_red_jacket",
       "next": "o_saw_yes"
      },
      {
       "if": null,
       "next": "o_saw_no"
      }
     ]
    },
    "o_saw_yes": {
     "speaker": "o",
     "text": "Take your time. Anything at all can help.",
     "pt": "Com calma. Qualquer detalhe pode ajudar.",
     "audio": "talk/town/town-05-police-station/54cc5b5e21fb.mp3",
     "options": [
      {
       "text": "Yes. Someone in a red jacket walked out in a hurry.",
       "pt": "Sim. Alguém de jaqueta vermelha saiu com pressa.",
       "audio": "talk/town/town-05-police-station/736430c03e66.mp3",
       "audioF": "talk/town/town-05-police-station/1161cb1d16c9.mp3",
       "next": "o_witness",
       "set": {
        "told_ruiz": "yes"
       }
      },
      {
       "text": "Not much, sorry. I was looking at my phone.",
       "pt": "Pouca coisa, desculpe. Eu estava olhando o celular.",
       "audio": "talk/town/town-05-police-station/a05379fab5d8.mp3",
       "audioF": "talk/town/town-05-police-station/6cda6f5d6ce9.mp3",
       "next": "o_nothing",
       "set": {
        "told_ruiz": "no"
       }
      },
      {
       "text": "Yes, the window was very clean.",
       "pt": "Sim, a janela estava bem limpa.",
       "audio": "talk/town/town-05-police-station/2e4148dee9f1.mp3",
       "audioF": "talk/town/town-05-police-station/4d848ed71208.mp3",
       "next": null,
       "react": {
        "text": "Good to know. But did you see a person? Anyone near the counter?",
        "pt": "Bom saber. Mas você viu alguma pessoa? Alguém perto do balcão?",
        "audio": "talk/town/town-05-police-station/78aaa91fadf8.mp3"
       }
      }
     ]
    },
    "o_saw_no": {
     "speaker": "o",
     "text": "Take your time. Anything at all can help.",
     "pt": "Com calma. Qualquer detalhe pode ajudar.",
     "audio": "talk/town/town-05-police-station/54cc5b5e21fb.mp3",
     "options": [
      {
       "text": "Not really. Someone left, but I didn't look.",
       "pt": "Na verdade, não. Alguém saiu, mas eu não olhei.",
       "audio": "talk/town/town-05-police-station/dee6ae64531a.mp3",
       "audioF": "talk/town/town-05-police-station/d4c095ec8679.mp3",
       "next": "o_nothing",
       "set": {
        "told_ruiz": "no"
       }
      },
      {
       "text": "No. But I heard some interesting things in town.",
       "pt": "Não. Mas ouvi umas coisas interessantes pela cidade.",
       "audio": "talk/town/town-05-police-station/7f727f9e7062.mp3",
       "audioF": "talk/town/town-05-police-station/2612b64c8d83.mp3",
       "next": "o_extra_br",
       "set": {
        "told_ruiz": "no"
       }
      },
      {
       "text": "Yes, the window was very clean.",
       "pt": "Sim, a janela estava bem limpa.",
       "audio": "talk/town/town-05-police-station/2e4148dee9f1.mp3",
       "audioF": "talk/town/town-05-police-station/4d848ed71208.mp3",
       "next": null,
       "react": {
        "text": "Good to know. But did you see a person? Anyone near the counter?",
        "pt": "Bom saber. Mas você viu alguma pessoa? Alguém perto do balcão?",
        "audio": "talk/town/town-05-police-station/78aaa91fadf8.mp3"
       }
      }
     ]
    },
    "o_witness": {
     "speaker": "o",
     "text": "A red jacket, leaving fast. That matches the camera. Thank you. That's very useful.",
     "pt": "Uma jaqueta vermelha, saindo rápido. Bate com a câmera. Obrigada. Isso é muito útil.",
     "audio": "talk/town/town-05-police-station/04f23f60adbc.mp3",
     "next": "o_face"
    },
    "o_face": {
     "speaker": "o",
     "text": "Did you see the face? Or how tall the person was?",
     "pt": "Você viu o rosto? Ou a altura da pessoa?",
     "audio": "talk/town/town-05-police-station/3d1e9cfdfad5.mp3",
     "options": [
      {
       "text": "No face. But I think the person was young. And very quick.",
       "pt": "Rosto, não. Mas acho que a pessoa era jovem. E bem ágil.",
       "audio": "talk/town/town-05-police-station/c02fe349e25d.mp3",
       "audioF": "talk/town/town-05-police-station/813e2ae7589e.mp3",
       "next": "o_young"
      },
      {
       "text": "No, sorry. It all happened so fast.",
       "pt": "Não, desculpe. Foi tudo muito rápido.",
       "audio": "talk/town/town-05-police-station/40a31b78fee6.mp3",
       "audioF": "talk/town/town-05-police-station/0b0a5912c49b.mp3",
       "next": "o_extra_intro"
      },
      {
       "text": "Tall? No, I ordered a medium.",
       "pt": "Tall? Não, eu pedi um médio.",
       "audio": "talk/town/town-05-police-station/21c6e53015d9.mp3",
       "audioF": "talk/town/town-05-police-station/647fd48248c7.mp3",
       "next": null,
       "react": {
        "text": "This isn't a coffee shop. How tall was the person? Did you see the face?",
        "pt": "Aqui não é cafeteria. Qual era a altura da pessoa? Viu o rosto?",
        "audio": "talk/town/town-05-police-station/ec14340bf554.mp3"
       }
      }
     ]
    },
    "o_young": {
     "speaker": "o",
     "text": "Young and quick. That's helpful. Kevin Moore is thirty-eight, by the way.",
     "pt": "Jovem e ágil. Isso ajuda. O Kevin Moore tem trinta e oito, aliás.",
     "audio": "talk/town/town-05-police-station/da8aa0962f73.mp3",
     "next": "o_extra_intro"
    },
    "o_nothing": {
     "speaker": "o",
     "text": "That's fine. An honest witness is better than an imaginative one.",
     "pt": "Tudo bem. Testemunha honesta é melhor que testemunha criativa.",
     "audio": "talk/town/town-05-police-station/2fcf2d7aea15.mp3",
     "next": "o_extra_intro"
    },
    "o_extra_intro": {
     "speaker": "o",
     "text": "Have you heard anything else around town? Gossip counts. I'll check it.",
     "pt": "Ouviu mais alguma coisa pela cidade? Fofoca vale. Eu confiro.",
     "audio": "talk/town/town-05-police-station/b445295013f1.mp3",
     "next": "o_extra_br"
    },
    "o_extra_br": {
     "branch": [
      {
       "if": "clue_coins",
       "next": "o_ex_coins"
      },
      {
       "if": "clue_heavy_bag",
       "next": "o_ex_bag"
      },
      {
       "if": null,
       "next": "o_ex_none"
      }
     ]
    },
    "o_ex_coins": {
     "speaker": "o",
     "text": "Go on. What did you hear?",
     "pt": "Pode falar. O que você ouviu?",
     "audio": "talk/town/town-05-police-station/9381e50d84be.mp3",
     "options": [
      {
       "text": "Ravi says a young man changed lots of coins for notes.",
       "pt": "O Ravi disse que um rapaz trocou muitas moedas por notas.",
       "audio": "talk/town/town-05-police-station/0d3100d87723.mp3",
       "audioF": "talk/town/town-05-police-station/bd090d355914.mp3",
       "next": "o_coins"
      },
      {
       "text": "Ravi says lots of things. Mostly about Biscuit.",
       "pt": "O Ravi fala de tudo. Principalmente do Biscuit.",
       "audio": "talk/town/town-05-police-station/02a3c6f76733.mp3",
       "audioF": "talk/town/town-05-police-station/6071c8961264.mp3",
       "next": "o_ravi"
      },
      {
       "text": "I heard a song on the radio.",
       "pt": "Ouvi uma música no rádio.",
       "audio": "talk/town/town-05-police-station/243a816462f6.mp3",
       "audioF": "talk/town/town-05-police-station/246b73e24a7e.mp3",
       "next": null,
       "react": {
        "text": "Lovely. But about the jar? Did you hear anything useful?",
        "pt": "Que bom. Mas sobre o pote? Ouviu algo útil?",
        "audio": "talk/town/town-05-police-station/40e7985bd924.mp3"
       }
      }
     ]
    },
    "o_coins": {
     "speaker": "o",
     "text": "Coins for notes. On a bank holiday, when the bank is shut. Interesting.",
     "pt": "Moedas por notas. Num feriado bancário, com o banco fechado. Interessante.",
     "audio": "talk/town/town-05-police-station/17f49eb18c38.mp3",
     "next": "o_coins_br"
    },
    "o_coins_br": {
     "branch": [
      {
       "if": "clue_heavy_bag",
       "next": "o_more"
      },
      {
       "if": null,
       "next": "o_tip"
      }
     ]
    },
    "o_more": {
     "speaker": "o",
     "text": "Anything else?",
     "pt": "Mais alguma coisa?",
     "audio": "talk/town/town-05-police-station/239818348aaa.mp3",
     "options": [
      {
       "text": "Mr. Hughes saw a boy running with a heavy bag. It sounded like coins.",
       "pt": "O Sr. Hughes viu um rapaz correndo com uma sacola pesada. Parecia moeda.",
       "audio": "talk/town/town-05-police-station/a83bec6b1510.mp3",
       "audioF": "talk/town/town-05-police-station/b9f97bdc9051.mp3",
       "next": "o_link"
      },
      {
       "text": "No, I think that's everything.",
       "pt": "Não, acho que é tudo.",
       "audio": "talk/town/town-05-police-station/e661f313eb74.mp3",
       "audioF": "talk/town/town-05-police-station/0cc93d045a1e.mp3",
       "next": "o_tip"
      },
      {
       "text": "Yes, I'd like a glass of water.",
       "pt": "Sim, eu queria um copo d'água.",
       "audio": "talk/town/town-05-police-station/b7b9796e2f2a.mp3",
       "audioF": "talk/town/town-05-police-station/b352166438fe.mp3",
       "next": null,
       "react": {
        "text": "There's a machine in the corridor. But anything else about the case?",
        "pt": "Tem uma máquina no corredor. Mas mais alguma coisa sobre o caso?",
        "audio": "talk/town/town-05-police-station/36279226b164.mp3"
       }
      }
     ]
    },
    "o_link": {
     "speaker": "o",
     "text": "A heavy bag, and coins changed at the shop. Now that's starting to look like a pattern.",
     "pt": "Uma sacola pesada, e moedas trocadas na loja. Isso já começa a parecer um padrão.",
     "audio": "talk/town/town-05-police-station/d91505ccc331.mp3",
     "next": "o_tip"
    },
    "o_ex_bag": {
     "speaker": "o",
     "text": "Go on. What did you hear?",
     "pt": "Pode falar. O que você ouviu?",
     "audio": "talk/town/town-05-police-station/9381e50d84be.mp3",
     "options": [
      {
       "text": "Mr. Hughes saw a boy running with a heavy bag. It went clink.",
       "pt": "O Sr. Hughes viu um rapaz correndo com uma sacola pesada. Fazia tlim.",
       "audio": "talk/town/town-05-police-station/769c6f493f7f.mp3",
       "audioF": "talk/town/town-05-police-station/573c89a51f86.mp3",
       "next": "o_bag"
      },
      {
       "text": "Not much. Mr. Hughes mostly talked about his dog.",
       "pt": "Pouca coisa. O Sr. Hughes falou mais do cachorro.",
       "audio": "talk/town/town-05-police-station/df763e086352.mp3",
       "audioF": "talk/town/town-05-police-station/61bcdc806867.mp3",
       "next": "o_tip"
      },
      {
       "text": "I heard a song on the radio.",
       "pt": "Ouvi uma música no rádio.",
       "audio": "talk/town/town-05-police-station/243a816462f6.mp3",
       "audioF": "talk/town/town-05-police-station/246b73e24a7e.mp3",
       "next": null,
       "react": {
        "text": "Lovely. But about the jar? Did you hear anything useful?",
        "pt": "Que bom. Mas sobre o pote? Ouviu algo útil?",
        "audio": "talk/town/town-05-police-station/40e7985bd924.mp3"
       }
      }
     ]
    },
    "o_bag": {
     "speaker": "o",
     "text": "A bag that went clink. Coins are heavy. A whole jar of coins, even heavier.",
     "pt": "Uma sacola que tilintava. Moeda pesa. Um pote inteiro de moedas, mais ainda.",
     "audio": "talk/town/town-05-police-station/f4b4c2861e90.mp3",
     "next": "o_tip"
    },
    "o_ex_none": {
     "speaker": "o",
     "text": "Nothing? That's fine. Keep your ears open. This town talks a lot.",
     "pt": "Nada? Tudo bem. Fique de ouvidos abertos. Esta cidade fala muito.",
     "audio": "talk/town/town-05-police-station/d2903fd25e63.mp3",
     "next": "o_tip"
    },
    "o_ravi": {
     "speaker": "o",
     "text": "Yes. Ravi is lovely, but he's not what I'd call a reliable source.",
     "pt": "É. O Ravi é um amor, mas não é o que eu chamaria de fonte confiável.",
     "audio": "talk/town/town-05-police-station/9fea59af70cf.mp3",
     "next": "o_tip"
    },
    "o_tip": {
     "speaker": "o",
     "text": "One piece of advice. Write the facts. Not the gossip. And not Kevin's name.",
     "pt": "Um conselho. Escreva os fatos. Não a fofoca. E não o nome do Kevin.",
     "audio": "talk/town/town-05-police-station/92fc4b586d0f.mp3",
     "options": [
      {
       "text": "Don't worry. I'll only write the facts.",
       "pt": "Pode deixar. Só vou escrever os fatos.",
       "audio": "talk/town/town-05-police-station/19f0ba90bf59.mp3",
       "audioF": "talk/town/town-05-police-station/93e1fb34c40d.mp3",
       "next": "o_bye"
      },
      {
       "text": "So you don't think Kevin did it?",
       "pt": "Então você não acha que foi o Kevin?",
       "audio": "talk/town/town-05-police-station/d8a74a5cc21b.mp3",
       "audioF": "talk/town/town-05-police-station/773dba1b09fd.mp3",
       "next": "o_nocomment"
      },
      {
       "text": "Kevin's name is Kevin.",
       "pt": "O nome do Kevin é Kevin.",
       "audio": "talk/town/town-05-police-station/e901b0c5cbec.mp3",
       "audioF": "talk/town/town-05-police-station/3adff5052083.mp3",
       "next": null,
       "react": {
        "text": "Yes. Thank you. I mean, don't put him in the story without facts. Clear?",
        "pt": "Sim. Obrigada. Quero dizer: não ponha ele na matéria sem fatos. Entendido?",
        "audio": "talk/town/town-05-police-station/1e64f66346e2.mp3"
       }
      }
     ]
    },
    "o_nocomment": {
     "speaker": "o",
     "text": "No comment. That's a fact too. You can quote it.",
     "pt": "Sem comentários. Isso também é um fato. Pode citar.",
     "audio": "talk/town/town-05-police-station/2b90016c365c.mp3",
     "next": "o_bye"
    },
    "o_bye": {
     "speaker": "o",
     "text": "My ten minutes are up. If you hear anything, call me. Not Ravi. Me.",
     "pt": "Meus dez minutos acabaram. Se souber de algo, me ligue. Não o Ravi. Eu.",
     "audio": "talk/town/town-05-police-station/2b9558e24630.mp3",
     "next": "n_end"
    },
    "n_end": {
     "speaker": "n",
     "text": "Between ten past and twenty past nine. A red sleeve. Tomorrow is market day.",
     "pt": "Entre nove e dez e nove e vinte. Uma manga vermelha. Amanhã é dia de feira.",
     "audio": "talk/town/town-05-police-station/6842be67b537.mp3",
     "end": true
    }
   },
   "nudges": {
    "o": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-05-police-station/7b3d34bbfd83.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-05-police-station/1c0a116df90a.mp3"
     }
    ]
   },
   "ambience": "police",
   "place": "police",
   "time": "Terça · 14h",
   "episode": 5
  },
  {
   "slug": "town-06-market-day",
   "title": "Market Day",
   "level": "B1",
   "description": "Na feira, um músico de rua conta algo estranho sobre o Sam.",
   "intro": "A policial Ruiz confirmou: o pote sumiu entre 9h10 e 9h20, e a câmera só mostra uma manga vermelha. Hoje é dia de feira na praça do mercado.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "l": {
     "name": "Leo",
     "role": "Músico de rua, amigo do Sam",
     "side": "right"
    },
    "h": {
     "name": "Mr. Hughes",
     "role": "Vizinho do nº 14",
     "side": "left"
    }
   },
   "start": "n1",
   "decisions": [
    6,
    8
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "Wednesday is market day. The square is full of colour, noise and the smell of fresh bread.",
     "pt": "Quarta é dia de feira. A praça está cheia de cor, barulho e cheiro de pão fresco.",
     "audio": "talk/town/town-06-market-day/cbc4929fe1ec.mp3",
     "next": "n2"
    },
    "n2": {
     "speaker": "n",
     "text": "Next to the fountain, a young man with long hair is playing the guitar.",
     "pt": "Ao lado da fonte, um rapaz de cabelo comprido está tocando violão.",
     "audio": "talk/town/town-06-market-day/bf416bf4221b.mp3",
     "next": "l1"
    },
    "l1": {
     "speaker": "l",
     "text": "Cheers for stopping! Any requests? I know three songs. Well, two and a half.",
     "pt": "Valeu por parar! Algum pedido? Sei três músicas. Bom, duas e meia.",
     "audio": "talk/town/town-06-market-day/4d081426b6ee.mp3",
     "options": [
      {
       "text": "Play your favourite one!",
       "pt": "Toca a sua favorita!",
       "audio": "talk/town/town-06-market-day/02a1b0b19911.mp3",
       "audioF": "talk/town/town-06-market-day/cd55be700efd.mp3",
       "next": "n_play"
      },
      {
       "text": "Actually, I'm from the Gazette. Can I ask you a few questions?",
       "pt": "Na verdade, sou do Gazette. Posso te fazer umas perguntas?",
       "audio": "talk/town/town-06-market-day/1baebfc518a8.mp3",
       "audioF": "talk/town/town-06-market-day/2013de5413f3.mp3",
       "next": "l_gazette"
      },
      {
       "text": "Two and a half kilos, please.",
       "pt": "Dois quilos e meio, por favor.",
       "audio": "talk/town/town-06-market-day/3484b8fbfd7a.mp3",
       "audioF": "talk/town/town-06-market-day/d05b96cf6050.mp3",
       "next": null,
       "react": {
        "text": "Ha! This isn't the fruit stall! I mean, do you want a song?",
        "pt": "Rá! Aqui não é a barraca de frutas! Quer dizer, quer uma música?",
        "audio": "talk/town/town-06-market-day/3be45d7d98e7.mp3"
       }
      }
     ]
    },
    "n_play": {
     "speaker": "n",
     "text": "Leo plays a happy, fast song. A few people stop and clap.",
     "pt": "O Leo toca uma música alegre e rápida. Algumas pessoas param e batem palmas.",
     "audio": "talk/town/town-06-market-day/d7f6052ab61c.mp3",
     "next": "l_intro"
    },
    "l_intro": {
     "speaker": "l",
     "text": "Thank you, thank you! I'm Leo. You're the new reporter, right? Everyone's talking about you.",
     "pt": "Obrigado, obrigado! Sou o Leo. Você é a pessoa nova do jornal, né? Todo mundo está falando de você.",
     "audio": "talk/town/town-06-market-day/7fb8c47157ad.mp3",
     "next": "l_ask"
    },
    "l_gazette": {
     "speaker": "l",
     "text": "The Gazette! Am I going to be famous? I'm Leo. Ask away.",
     "pt": "O Gazette! Vou ficar famoso? Sou o Leo. Pode perguntar.",
     "audio": "talk/town/town-06-market-day/c0ff825defd4.mp3",
     "next": "l_ask"
    },
    "l_ask": {
     "speaker": "l",
     "text": "So, what do you want to know?",
     "pt": "Então, o que você quer saber?",
     "audio": "talk/town/town-06-market-day/f1278f9eb687.mp3",
     "options": [
      {
       "text": "Do you know Sam from the Corner Café?",
       "pt": "Você conhece o Sam do Corner Café?",
       "audio": "talk/town/town-06-market-day/ee45d3b75850.mp3",
       "audioF": "talk/town/town-06-market-day/cfe0ec684530.mp3",
       "next": "l_sam"
      },
      {
       "text": "Have you heard about the missing jar?",
       "pt": "Ficou sabendo do pote que sumiu?",
       "audio": "talk/town/town-06-market-day/ff1603e7fc67.mp3",
       "audioF": "talk/town/town-06-market-day/b5e9fec610c4.mp3",
       "next": "l_jar"
      },
      {
       "text": "How long have you been playing here?",
       "pt": "Há quanto tempo você toca aqui?",
       "audio": "talk/town/town-06-market-day/4d13413cacda.mp3",
       "audioF": "talk/town/town-06-market-day/ee5148989a2a.mp3",
       "next": "l_long"
      },
      {
       "text": "I want to know three songs too.",
       "pt": "Eu também quero saber três músicas.",
       "audio": "talk/town/town-06-market-day/025c87d96dd9.mp3",
       "audioF": "talk/town/town-06-market-day/01ca34cee27b.mp3",
       "next": null,
       "react": {
        "text": "Ha! I can teach you. Later. But what did you want to ask me?",
        "pt": "Rá! Posso te ensinar. Depois. Mas o que você queria me perguntar?",
        "audio": "talk/town/town-06-market-day/231b38673e69.mp3"
       }
      }
     ]
    },
    "l_long": {
     "speaker": "l",
     "text": "Every Wednesday for two years. Usually with Sam, from the café. But not this week.",
     "pt": "Toda quarta, há dois anos. Normalmente com o Sam, do café. Mas essa semana não.",
     "audio": "talk/town/town-06-market-day/14c7bdede3d6.mp3",
     "next": "l_sam2"
    },
    "l_sam": {
     "speaker": "l",
     "text": "Sam? He's my best mate. We've played together since we were kids. He's better than me.",
     "pt": "O Sam? É meu melhor amigo. A gente toca junto desde criança. Ele é melhor que eu.",
     "audio": "talk/town/town-06-market-day/ab4ff62fa4ed.mp3",
     "next": "l_sam2"
    },
    "l_jar": {
     "speaker": "l",
     "text": "Everyone has. Poor Emma. And poor Sam. He was so proud of that jar.",
     "pt": "Todo mundo ficou. Coitada da Emma. E coitado do Sam. Ele tinha tanto orgulho daquele pote.",
     "audio": "talk/town/town-06-market-day/66b6252c829b.mp3",
     "next": "l_proud_q"
    },
    "l_proud_q": {
     "speaker": "l",
     "text": "Did you know the jar was his idea?",
     "pt": "Você sabia que o pote foi ideia dele?",
     "audio": "talk/town/town-06-market-day/27c3eb6eea91.mp3",
     "options": [
      {
       "text": "Yes, Maggie told me.",
       "pt": "Sim, a Maggie me contou.",
       "audio": "talk/town/town-06-market-day/eeb4ac3703b7.mp3",
       "audioF": "talk/town/town-06-market-day/a453c01f8a27.mp3",
       "next": "l_sam2"
      },
      {
       "text": "Really? I thought it was Emma's.",
       "pt": "Sério? Achei que fosse da Emma.",
       "audio": "talk/town/town-06-market-day/5838b3057caa.mp3",
       "audioF": "talk/town/town-06-market-day/4b4316e614b6.mp3",
       "next": "l_idea"
      },
      {
       "text": "Yes, he's a jar.",
       "pt": "Sim, ele é um pote.",
       "audio": "talk/town/town-06-market-day/db8fa686fc76.mp3",
       "audioF": "talk/town/town-06-market-day/8afa325da9e7.mp3",
       "next": null,
       "react": {
        "text": "Ha! No, the jar was his IDEA. Sam's idea. Did you know that?",
        "pt": "Rá! Não, o pote foi IDEIA dele. Ideia do Sam. Você sabia?",
        "audio": "talk/town/town-06-market-day/cee9c83adfc7.mp3"
       }
      }
     ]
    },
    "l_idea": {
     "speaker": "l",
     "text": "No, it was Sam's idea. He even painted the sign himself. For the new playground.",
     "pt": "Não, foi ideia do Sam. Ele mesmo pintou a placa. Pro parquinho novo.",
     "audio": "talk/town/town-06-market-day/b17a92b8ae75.mp3",
     "clue": "jar_idea",
     "next": "l_sam2"
    },
    "l_sam2": {
     "speaker": "l",
     "text": "But he's been acting weird since Monday. Really quiet. Not like him.",
     "pt": "Mas ele está agindo estranho desde segunda. Bem calado. Não é do feitio dele.",
     "audio": "talk/town/town-06-market-day/858f357027f2.mp3",
     "next": "l_monday_q"
    },
    "l_monday_q": {
     "speaker": "l",
     "text": "Oh, wait. Something strange happened on Monday morning. Want to hear it?",
     "pt": "Ah, peraí. Aconteceu uma coisa estranha na segunda de manhã. Quer ouvir?",
     "audio": "talk/town/town-06-market-day/2e7abd2e1453.mp3",
     "options": [
      {
       "text": "Yes. What happened on Monday?",
       "pt": "Quero. O que aconteceu na segunda?",
       "audio": "talk/town/town-06-market-day/21d174a72fb8.mp3",
       "audioF": "talk/town/town-06-market-day/c48a34142575.mp3",
       "next": "l_bank"
      },
      {
       "text": "Is it about the jar?",
       "pt": "É sobre o pote?",
       "audio": "talk/town/town-06-market-day/c4e96b853f09.mp3",
       "audioF": "talk/town/town-06-market-day/69e7465f6788.mp3",
       "next": "l_notsure"
      },
      {
       "text": "Did Sam leave the café in a hurry?",
       "pt": "O Sam saiu do café com pressa?",
       "audio": "talk/town/town-06-market-day/f06dce2438e2.mp3",
       "audioF": "talk/town/town-06-market-day/78651a5e7064.mp3",
       "next": "l_hurry"
      },
      {
       "text": "Yes, Monday is a strange day.",
       "pt": "Sim, segunda é um dia estranho.",
       "audio": "talk/town/town-06-market-day/d9965c437125.mp3",
       "audioF": "talk/town/town-06-market-day/2da0ad8a4ac5.mp3",
       "next": null,
       "react": {
        "text": "Ha, true! But listen. Something strange happened on Monday. Want to hear?",
        "pt": "Rá, verdade! Mas escuta. Aconteceu algo estranho na segunda. Quer ouvir?",
        "audio": "talk/town/town-06-market-day/f5fccc742a3d.mp3"
       }
      }
     ]
    },
    "l_bank": {
     "speaker": "l",
     "text": "Sam phoned me in the morning. He asked me: is the bank open today?",
     "pt": "O Sam me ligou de manhã. Perguntou: o banco está aberto hoje?",
     "audio": "talk/town/town-06-market-day/3349bcf9498e.mp3",
     "next": "l_bank2"
    },
    "l_notsure": {
     "speaker": "l",
     "text": "Maybe. I don't know. But that morning he phoned me. He asked if the bank was open.",
     "pt": "Talvez. Não sei. Mas naquela manhã ele me ligou. Perguntou se o banco estava aberto.",
     "audio": "talk/town/town-06-market-day/f13feeb5ff61.mp3",
     "next": "l_bank2"
    },
    "l_bank2": {
     "speaker": "l",
     "text": "On a bank holiday! I said, mate, it's Monday. Bank holiday. Everything's shut.",
     "pt": "Num feriado bancário! Eu disse: cara, é segunda. Feriado bancário. Tá tudo fechado.",
     "audio": "talk/town/town-06-market-day/9eba4072811d.mp3",
     "clue": "bank_question",
     "next": "l_bank_q"
    },
    "l_hurry": {
     "speaker": "l",
     "text": "Yeah! He ran into the square at about twenty past nine. Totally out of breath.",
     "pt": "Sim! Ele chegou correndo na praça lá pelas nove e vinte. Totalmente sem fôlego.",
     "audio": "talk/town/town-06-market-day/da74eddd983c.mp3",
     "next": "l_hurry2"
    },
    "l_hurry2": {
     "speaker": "l",
     "text": "And he asked me if the bank was open. On a bank holiday! I said, it's shut, mate.",
     "pt": "E me perguntou se o banco estava aberto. Num feriado bancário! Eu disse: tá fechado, cara.",
     "audio": "talk/town/town-06-market-day/933c11c54b0b.mp3",
     "clue": "bank_question",
     "next": "l_bank_q"
    },
    "l_bank_q": {
     "speaker": "l",
     "text": "Why would Sam need the bank? He's seventeen. He hasn't got any money.",
     "pt": "Pra que o Sam precisaria do banco? Ele tem dezessete. Não tem dinheiro nenhum.",
     "audio": "talk/town/town-06-market-day/a7b689e1c1dd.mp3",
     "options": [
      {
       "text": "Maybe he had a lot of coins to change.",
       "pt": "Talvez ele tivesse muitas moedas pra trocar.",
       "audio": "talk/town/town-06-market-day/bae64a73c6db.mp3",
       "audioF": "talk/town/town-06-market-day/bbe5a4c7372e.mp3",
       "next": "l_coins"
      },
      {
       "text": "I don't know. That's a good question.",
       "pt": "Não sei. Boa pergunta.",
       "audio": "talk/town/town-06-market-day/7aeeb3b8df2c.mp3",
       "audioF": "talk/town/town-06-market-day/6393bec79e49.mp3",
       "next": "l_defend"
      },
      {
       "text": "Do you think Sam took the jar?",
       "pt": "Você acha que o Sam pegou o pote?",
       "audio": "talk/town/town-06-market-day/253c4ea07ec7.mp3",
       "audioF": "talk/town/town-06-market-day/cae8a6f11cd7.mp3",
       "next": "l_angry"
      },
      {
       "text": "He can sit on a bench in the park.",
       "pt": "Ele pode sentar num banco da praça.",
       "audio": "talk/town/town-06-market-day/385b0b56ee9c.mp3",
       "audioF": "talk/town/town-06-market-day/102197ae2c69.mp3",
       "next": null,
       "react": {
        "text": "Ha! Not that kind of bank! The money bank. Why would Sam need it?",
        "pt": "Rá! Não esse tipo de banco! O banco de dinheiro. Pra que o Sam precisaria dele?",
        "audio": "talk/town/town-06-market-day/476a268f2229.mp3"
       }
      }
     ]
    },
    "l_coins": {
     "speaker": "l",
     "text": "Coins? Sam? Hmm. He did have a really heavy backpack. Oh no. You don't think he took it?",
     "pt": "Moedas? O Sam? Hum. Ele estava mesmo com uma mochila bem pesada. Ai, não. Você não acha que ele pegou, acha?",
     "audio": "talk/town/town-06-market-day/1480d7bd66d4.mp3",
     "next": "l_defend"
    },
    "l_angry": {
     "speaker": "l",
     "text": "Sam? No way. He's the most honest person I know. He'd never steal anything.",
     "pt": "O Sam? De jeito nenhum. É a pessoa mais honesta que eu conheço. Nunca roubaria nada.",
     "audio": "talk/town/town-06-market-day/f767d769ed8d.mp3",
     "next": "l_defend_q"
    },
    "l_defend": {
     "speaker": "l",
     "text": "Look, Sam's a good guy. If he did something, there's a good reason.",
     "pt": "Olha, o Sam é gente boa. Se ele fez alguma coisa, tem um bom motivo.",
     "audio": "talk/town/town-06-market-day/40e1364d0ee8.mp3",
     "next": "l_defend_q"
    },
    "l_defend_q": {
     "speaker": "l",
     "text": "Promise me you'll talk to him before you write anything.",
     "pt": "Promete que vai falar com ele antes de escrever qualquer coisa?",
     "audio": "talk/town/town-06-market-day/e5e24e9df477.mp3",
     "options": [
      {
       "text": "I promise. I want the truth, not gossip.",
       "pt": "Prometo. Quero a verdade, não fofoca.",
       "audio": "talk/town/town-06-market-day/44ba2fb1ff3a.mp3",
       "audioF": "talk/town/town-06-market-day/5bf982afd1bb.mp3",
       "next": "l_thanks",
       "set": {
        "promised_leo": "yes"
       }
      },
      {
       "text": "I can't promise. But I'll be fair.",
       "pt": "Não posso prometer. Mas vou agir com justiça.",
       "audio": "talk/town/town-06-market-day/04b767c21378.mp3",
       "audioF": "talk/town/town-06-market-day/28c245464020.mp3",
       "next": "l_fair",
       "set": {
        "promised_leo": "no"
       }
      },
      {
       "text": "I promise to buy a guitar.",
       "pt": "Prometo comprar um violão.",
       "audio": "talk/town/town-06-market-day/26998759fb32.mp3",
       "audioF": "talk/town/town-06-market-day/be23404b6f0f.mp3",
       "next": null,
       "react": {
        "text": "Ha! Buy two. But promise me: talk to Sam first. Okay?",
        "pt": "Rá! Compra dois. Mas promete: fala com o Sam primeiro. Pode ser?",
        "audio": "talk/town/town-06-market-day/951e8da7364a.mp3"
       }
      }
     ]
    },
    "l_thanks": {
     "speaker": "l",
     "text": "Thanks. He'll be at the quiz tonight, at The Anchor. Come along!",
     "pt": "Valeu. Ele vai estar no quiz hoje à noite, no The Anchor. Aparece lá!",
     "audio": "talk/town/town-06-market-day/3b1832c9874f.mp3",
     "next": "n_dog"
    },
    "l_fair": {
     "speaker": "l",
     "text": "Fair enough. He'll be at the quiz tonight, at The Anchor. Ask him yourself.",
     "pt": "Justo. Ele vai estar no quiz hoje à noite, no The Anchor. Pergunta pra ele.",
     "audio": "talk/town/town-06-market-day/186b07721804.mp3",
     "next": "n_dog"
    },
    "n_dog": {
     "speaker": "n",
     "text": "Suddenly, a small brown dog runs across the square, barking.",
     "pt": "De repente, um cachorrinho marrom atravessa a praça latindo.",
     "audio": "talk/town/town-06-market-day/381d604c1306.mp3",
     "next": "hughes_br"
    },
    "hughes_br": {
     "branch": [
      {
       "if": "helped_hughes=yes",
       "next": "h_warm"
      },
      {
       "if": null,
       "next": "h_cold"
      }
     ]
    },
    "h_warm": {
     "speaker": "h",
     "text": "Biscuit! Slow down! Oh, it's you, number twelve. Look, he remembers you. He's wagging his tail.",
     "pt": "Biscuit! Mais devagar! Ah, é você, número doze. Olha, ele lembra de você. Está abanando o rabo.",
     "audio": "talk/town/town-06-market-day/f1185e443648.mp3",
     "next": "h_warm2"
    },
    "h_warm2": {
     "speaker": "h",
     "text": "Thank you again for Monday. I don't say that often. Ask Ravi.",
     "pt": "Obrigado de novo pela segunda. Não digo isso com frequência. Pergunte ao Ravi.",
     "audio": "talk/town/town-06-market-day/2df11965269d.mp3",
     "options": [
      {
       "text": "It was a pleasure. How is Biscuit?",
       "pt": "Foi um prazer. Como está o Biscuit?",
       "audio": "talk/town/town-06-market-day/0828c606484b.mp3",
       "audioF": "talk/town/town-06-market-day/59a23bd2b382.mp3",
       "next": "h_biscuit"
      },
      {
       "text": "Mr. Hughes, can I ask you about the boy with the bag?",
       "pt": "Sr. Hughes, posso perguntar sobre o rapaz da sacola?",
       "audio": "talk/town/town-06-market-day/bce373614df5.mp3",
       "audioF": "talk/town/town-06-market-day/698734112929.mp3",
       "next": "h_boy"
      },
      {
       "text": "Monday? No, today is Wednesday.",
       "pt": "Segunda? Não, hoje é quarta.",
       "audio": "talk/town/town-06-market-day/4dcc83a593ee.mp3",
       "audioF": "talk/town/town-06-market-day/d2d066d4cdd6.mp3",
       "next": null,
       "react": {
        "text": "I know what day it is! I'm old, not silly. I said thank you. For Monday.",
        "pt": "Eu sei que dia é hoje! Sou velho, não bobo. Eu disse obrigado. Pela segunda.",
        "audio": "talk/town/town-06-market-day/18b19070a295.mp3"
       }
      }
     ]
    },
    "h_biscuit": {
     "speaker": "h",
     "text": "Naughty as ever. He ate my newspaper this morning. Your newspaper, actually.",
     "pt": "Levado como sempre. Comeu meu jornal hoje de manhã. O seu jornal, na verdade.",
     "audio": "talk/town/town-06-market-day/b79c2c511c29.mp3",
     "next": "h_boy"
    },
    "h_boy": {
     "speaker": "h",
     "text": "I've been thinking about that boy with the bag. I think I know who it was.",
     "pt": "Andei pensando naquele rapaz da sacola. Acho que sei quem era.",
     "audio": "talk/town/town-06-market-day/ef34412cc727.mp3",
     "options": [
      {
       "text": "Who? Please tell me.",
       "pt": "Quem? Por favor, me conta.",
       "audio": "talk/town/town-06-market-day/16b95c37cabc.mp3",
       "audioF": "talk/town/town-06-market-day/53b300d0f974.mp3",
       "next": "h_notsure"
      },
      {
       "text": "You don't have to tell me. Only if you're sure.",
       "pt": "Não precisa me contar. Só se tiver certeza.",
       "audio": "talk/town/town-06-market-day/e4eee0dcb7af.mp3",
       "audioF": "talk/town/town-06-market-day/97e4d11c3b4b.mp3",
       "next": "h_respect",
       "set": {
        "hughes_trust": "yes"
       }
      },
      {
       "text": "Was it Biscuit?",
       "pt": "Era o Biscuit?",
       "audio": "talk/town/town-06-market-day/f3287eedf95f.mp3",
       "audioF": "talk/town/town-06-market-day/ad2a95754c87.mp3",
       "next": null,
       "react": {
        "text": "Biscuit can't carry a bag! He can barely carry himself. No, a boy. I think I know him.",
        "pt": "O Biscuit não carrega sacola! Mal carrega a si mesmo. Não, um rapaz. Acho que conheço.",
        "audio": "talk/town/town-06-market-day/e46272775368.mp3"
       }
      }
     ]
    },
    "h_notsure": {
     "speaker": "h",
     "text": "No. Not until I'm sure. I won't put a young man's name in the newspaper without proof.",
     "pt": "Não. Não antes de ter certeza. Não vou pôr o nome de um rapaz no jornal sem prova.",
     "audio": "talk/town/town-06-market-day/27fda413dc95.mp3",
     "next": "h_festival"
    },
    "h_respect": {
     "speaker": "h",
     "text": "Hmph. Good answer. You're a sensible one. Most reporters aren't.",
     "pt": "Hunf. Boa resposta. Você tem juízo. A maioria dos repórteres não tem.",
     "audio": "talk/town/town-06-market-day/89d1d3ffa38f.mp3",
     "next": "h_festival"
    },
    "h_festival": {
     "speaker": "h",
     "text": "Find me at the festival tomorrow. Maybe I'll be sure by then. Come on, Biscuit.",
     "pt": "Me procure no festival amanhã. Talvez até lá eu tenha certeza. Vamos, Biscuit.",
     "audio": "talk/town/town-06-market-day/843db2123fef.mp3",
     "next": "n_end"
    },
    "h_cold": {
     "speaker": "h",
     "text": "Biscuit! Come here! Oh. It's you. Number twelve.",
     "pt": "Biscuit! Vem cá! Ah. É você. Número doze.",
     "audio": "talk/town/town-06-market-day/09f97c9c8729.mp3",
     "options": [
      {
       "text": "Hello, Mr. Hughes. I'm sorry I didn't help you on Monday.",
       "pt": "Olá, Sr. Hughes. Desculpe não ter te ajudado na segunda.",
       "audio": "talk/town/town-06-market-day/fa080da2d5c6.mp3",
       "audioF": "talk/town/town-06-market-day/5ba6c37e6d3f.mp3",
       "next": "h_sorry",
       "set": {
        "helped_hughes": "yes"
       }
      },
      {
       "text": "Hello. So you found Biscuit on Monday?",
       "pt": "Olá. Então você achou o Biscuit na segunda?",
       "audio": "talk/town/town-06-market-day/54705c68c443.mp3",
       "audioF": "talk/town/town-06-market-day/c6f793c91ed1.mp3",
       "next": "h_found"
      },
      {
       "text": "Yes, it's twelve o'clock.",
       "pt": "Sim, é meio-dia.",
       "audio": "talk/town/town-06-market-day/677cbba80fb0.mp3",
       "audioF": "talk/town/town-06-market-day/a655905f4b1b.mp3",
       "next": null,
       "react": {
        "text": "It's eleven, actually. And I said number twelve. Your house. Well? Anything to say?",
        "pt": "São onze, na verdade. E eu disse número doze. Sua casa. E então? Algo a dizer?",
        "audio": "talk/town/town-06-market-day/85f5cad5b0c2.mp3"
       }
      }
     ]
    },
    "h_sorry": {
     "speaker": "h",
     "text": "Hmph. An apology. That's rare these days. Biscuit forgives you. I'm still thinking about it.",
     "pt": "Hunf. Um pedido de desculpas. Coisa rara hoje em dia. O Biscuit te perdoa. Eu ainda estou pensando.",
     "audio": "talk/town/town-06-market-day/acaf0bc82a46.mp3",
     "next": "n_end"
    },
    "h_found": {
     "speaker": "h",
     "text": "Obviously. He's right here, isn't he? Good day.",
     "pt": "Obviamente. Ele está bem aqui, não está? Passar bem.",
     "audio": "talk/town/town-06-market-day/90ae6f4b8aaf.mp3",
     "next": "n_end"
    },
    "n_end": {
     "speaker": "n",
     "text": "Sam asked if the bank was open. On a bank holiday. Tonight, Sam will be at the quiz.",
     "pt": "O Sam perguntou se o banco estava aberto. Num feriado bancário. Hoje à noite, o Sam vai estar no quiz.",
     "audio": "talk/town/town-06-market-day/2d351970a135.mp3",
     "end": true
    }
   },
   "nudges": {
    "l": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-06-market-day/901baf5b8b42.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-06-market-day/9ac90ea4fee2.mp3"
     }
    ],
    "h": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-06-market-day/75759147c884.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-06-market-day/b37319da9442.mp3"
     }
    ]
   },
   "ambience": "market",
   "place": "market",
   "time": "Quarta · 11h",
   "episode": 6
  },
  {
   "slug": "town-07-quiz-night",
   "title": "Quiz Night",
   "level": "B1",
   "description": "Noite de quiz no pub: um álibi, um copo quebrado e um segredo quase revelado.",
   "intro": "O Leo contou que, na segunda de manhã, o Sam perguntou se o banco estava aberto, mesmo sendo feriado. Hoje à noite tem quiz no pub The Anchor, e o Sam vai estar lá.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "k": {
     "name": "Kevin",
     "role": "Fotógrafo do Gazette",
     "side": "right"
    },
    "e": {
     "name": "Emma",
     "role": "Dona do Corner Café",
     "side": "left"
    },
    "s": {
     "name": "Sam",
     "role": "Irmão da Emma",
     "side": "right"
    }
   },
   "start": "n1",
   "decisions": [
    7,
    8
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "Wednesday night. The Anchor is warm and loud. It seems the whole of Millbrook is here.",
     "pt": "Quarta à noite. O Anchor está quentinho e barulhento. Parece que Millbrook inteira está aqui.",
     "audio": "talk/town/town-07-quiz-night/fbe8ecaa6452.mp3",
     "next": "kf_br"
    },
    "kf_br": {
     "branch": [
      {
       "if": "kevin_friend=yes",
       "next": "k_team"
      },
      {
       "if": null,
       "next": "k_cold"
      }
     ]
    },
    "k_team": {
     "speaker": "k",
     "text": "Hey! Over here! You're on my team. We're called The Front Page. Emma and Sam are with us!",
     "pt": "Ei! Aqui! Você é do meu time. A gente se chama The Front Page. A Emma e o Sam estão com a gente!",
     "audio": "talk/town/town-07-quiz-night/f97e711210d3.mp3",
     "next": "drink_br"
    },
    "k_cold": {
     "speaker": "k",
     "text": "Oh, hi. I'm playing with the football lot tonight. Sorry, no room at our table.",
     "pt": "Ah, oi. Hoje vou jogar com o pessoal do futebol. Desculpa, não tem lugar na nossa mesa.",
     "audio": "talk/town/town-07-quiz-night/236bc49d74cc.mp3",
     "next": "e_invite"
    },
    "e_invite": {
     "speaker": "e",
     "text": "Hey! Come and sit with us! We need a brain. Sam's brain is on holiday.",
     "pt": "Ei! Vem sentar com a gente! Precisamos de um cérebro. O do Sam está de férias.",
     "audio": "talk/town/town-07-quiz-night/7010c6ddfe84.mp3",
     "next": "drink_br"
    },
    "drink_br": {
     "branch": [
      {
       "if": "drink=coffee",
       "next": "e_coffee"
      },
      {
       "if": "drink=tea",
       "next": "e_tea"
      },
      {
       "if": null,
       "next": "e_choc"
      }
     ]
    },
    "e_coffee": {
     "speaker": "e",
     "text": "I got you a coffee! I remember from Monday. Sorry, the coffee here is terrible.",
     "pt": "Peguei um café pra você! Lembro de segunda. Desculpa, o café daqui é horrível.",
     "audio": "talk/town/town-07-quiz-night/b7d3f89b73dd.mp3",
     "options": [
      {
       "text": "You remembered! Thank you, Emma.",
       "pt": "Você lembrou! Valeu, Emma.",
       "audio": "talk/town/town-07-quiz-night/55100dadfbb1.mp3",
       "audioF": "talk/town/town-07-quiz-night/e36a3bb868e3.mp3",
       "next": "e_remember"
      },
      {
       "text": "That's so kind. How are you feeling about the jar?",
       "pt": "Que gentileza. Como você está com essa história do pote?",
       "audio": "talk/town/town-07-quiz-night/e6ce304fd0ea.mp3",
       "audioF": "talk/town/town-07-quiz-night/1d3a71af886d.mp3",
       "next": "e_feel"
      },
      {
       "text": "I always order a taxi.",
       "pt": "Eu sempre peço um táxi.",
       "audio": "talk/town/town-07-quiz-night/c2111ac33e91.mp3",
       "audioF": "talk/town/town-07-quiz-night/652563d51d9a.mp3",
       "next": null,
       "react": {
        "text": "A taxi? Ha! It's just a drink! Do you want it or not?",
        "pt": "Um táxi? Rá! É só uma bebida! Quer ou não?",
        "audio": "talk/town/town-07-quiz-night/274ed8abcb01.mp3"
       }
      }
     ]
    },
    "e_tea": {
     "speaker": "e",
     "text": "I got you a cup of tea! I remember from Monday. A good café owner never forgets.",
     "pt": "Peguei um chá pra você! Lembro de segunda. Uma boa dona de café nunca esquece.",
     "audio": "talk/town/town-07-quiz-night/75bb9d927f9d.mp3",
     "options": [
      {
       "text": "You remembered! Thank you, Emma.",
       "pt": "Você lembrou! Valeu, Emma.",
       "audio": "talk/town/town-07-quiz-night/55100dadfbb1.mp3",
       "audioF": "talk/town/town-07-quiz-night/e36a3bb868e3.mp3",
       "next": "e_remember"
      },
      {
       "text": "That's so kind. How are you feeling about the jar?",
       "pt": "Que gentileza. Como você está com essa história do pote?",
       "audio": "talk/town/town-07-quiz-night/e6ce304fd0ea.mp3",
       "audioF": "talk/town/town-07-quiz-night/1d3a71af886d.mp3",
       "next": "e_feel"
      },
      {
       "text": "I always order a taxi.",
       "pt": "Eu sempre peço um táxi.",
       "audio": "talk/town/town-07-quiz-night/c2111ac33e91.mp3",
       "audioF": "talk/town/town-07-quiz-night/652563d51d9a.mp3",
       "next": null,
       "react": {
        "text": "A taxi? Ha! It's just a cup of tea! Do you want it or not?",
        "pt": "Um táxi? Rá! É só um chá! Quer ou não?",
        "audio": "talk/town/town-07-quiz-night/b18505f2761c.mp3"
       }
      }
     ]
    },
    "e_choc": {
     "speaker": "e",
     "text": "I got you a hot chocolate! They don't usually make it here, but I asked nicely.",
     "pt": "Peguei um chocolate quente pra você! Aqui eles não costumam fazer, mas pedi com jeitinho.",
     "audio": "talk/town/town-07-quiz-night/45aed3bca660.mp3",
     "options": [
      {
       "text": "You remembered! Thank you, Emma.",
       "pt": "Você lembrou! Valeu, Emma.",
       "audio": "talk/town/town-07-quiz-night/55100dadfbb1.mp3",
       "audioF": "talk/town/town-07-quiz-night/e36a3bb868e3.mp3",
       "next": "e_remember"
      },
      {
       "text": "That's so kind. How are you feeling about the jar?",
       "pt": "Que gentileza. Como você está com essa história do pote?",
       "audio": "talk/town/town-07-quiz-night/e6ce304fd0ea.mp3",
       "audioF": "talk/town/town-07-quiz-night/1d3a71af886d.mp3",
       "next": "e_feel"
      },
      {
       "text": "I always order a taxi.",
       "pt": "Eu sempre peço um táxi.",
       "audio": "talk/town/town-07-quiz-night/c2111ac33e91.mp3",
       "audioF": "talk/town/town-07-quiz-night/652563d51d9a.mp3",
       "next": null,
       "react": {
        "text": "A taxi? Ha! It's just a hot chocolate! Do you want it or not?",
        "pt": "Um táxi? Rá! É só um chocolate quente! Quer ou não?",
        "audio": "talk/town/town-07-quiz-night/073cb3fe631c.mp3"
       }
      }
     ]
    },
    "e_remember": {
     "speaker": "e",
     "text": "Of course! Small town, good memory. Even with all this jar drama.",
     "pt": "Claro! Cidade pequena, memória boa. Mesmo com todo esse drama do pote.",
     "audio": "talk/town/town-07-quiz-night/746e0a4fe3f5.mp3",
     "next": "e_feel"
    },
    "e_feel": {
     "speaker": "e",
     "text": "Honestly? I'm sad. And Sam is even sadder. He won't talk about it.",
     "pt": "Sinceramente? Estou triste. E o Sam está mais ainda. Ele nem quer falar disso.",
     "audio": "talk/town/town-07-quiz-night/fdbc7034b600.mp3",
     "next": "s_hi"
    },
    "s_hi": {
     "speaker": "s",
     "text": "Emma, please. Not tonight. Hi. Er, nice to see you again.",
     "pt": "Emma, por favor. Hoje não. Oi. Hã, bom te ver de novo.",
     "audio": "talk/town/town-07-quiz-night/22f79d6cdd51.mp3",
     "next": "k_alibi_intro"
    },
    "k_alibi_intro": {
     "speaker": "k",
     "text": "Hey. Before the quiz starts. I know people are talking about my red jacket. Maybe even you.",
     "pt": "Ei. Antes do quiz começar. Sei que estão falando da minha jaqueta vermelha. Talvez até você.",
     "audio": "talk/town/town-07-quiz-night/4e739bc51321.mp3",
     "next": "asked_br"
    },
    "asked_br": {
     "branch": [
      {
       "if": "asked_kevin=yes",
       "next": "k_asked"
      },
      {
       "if": null,
       "next": "k_alibi"
      }
     ]
    },
    "k_asked": {
     "speaker": "k",
     "text": "You asked me where I was on Monday morning. Well, here's your answer.",
     "pt": "Você me perguntou onde eu estava na segunda de manhã. Bom, aqui está a resposta.",
     "audio": "talk/town/town-07-quiz-night/4b9c78492729.mp3",
     "next": "k_alibi"
    },
    "k_alibi": {
     "speaker": "k",
     "text": "On Monday at nine, I was at the dentist. Look, here's the receipt. Nine o'clock, one filling.",
     "pt": "Na segunda às nove, eu estava no dentista. Olha, aqui o recibo. Nove horas, uma obturação.",
     "audio": "talk/town/town-07-quiz-night/e0421c5ce9ba.mp3",
     "clue": "kevin_alibi",
     "next": "k_alibi_q"
    },
    "k_alibi_q": {
     "speaker": "k",
     "text": "So. Am I still a suspect?",
     "pt": "E aí. Ainda sou suspeito?",
     "audio": "talk/town/town-07-quiz-night/8ffe3f57fc6c.mp3",
     "options": [
      {
       "text": "No. Sorry, Kevin. I believe you.",
       "pt": "Não. Desculpa, Kevin. Acredito em você.",
       "audio": "talk/town/town-07-quiz-night/440d72e5ae08.mp3",
       "audioF": "talk/town/town-07-quiz-night/96338dc00c05.mp3",
       "next": "n_quiz"
      },
      {
       "text": "Can I see the receipt?",
       "pt": "Posso ver o recibo?",
       "audio": "talk/town/town-07-quiz-night/d934c2adcddd.mp3",
       "audioF": "talk/town/town-07-quiz-night/181683d17c14.mp3",
       "next": "k_receipt"
      },
      {
       "text": "Why didn't you say this before?",
       "pt": "Por que não disse isso antes?",
       "audio": "talk/town/town-07-quiz-night/c322a5844c95.mp3",
       "audioF": "talk/town/town-07-quiz-night/1b4ce8dce5d7.mp3",
       "next": "k_why"
      },
      {
       "text": "No, you're a dentist.",
       "pt": "Não, você é dentista.",
       "audio": "talk/town/town-07-quiz-night/1b7c50b85e5e.mp3",
       "audioF": "talk/town/town-07-quiz-night/314c839f2932.mp3",
       "next": null,
       "react": {
        "text": "I'm a photographer! I just VISITED the dentist. So, am I still a suspect?",
        "pt": "Sou fotógrafo! Eu só FUI ao dentista. Então, ainda sou suspeito?",
        "audio": "talk/town/town-07-quiz-night/609027015634.mp3"
       }
      }
     ]
    },
    "k_receipt": {
     "speaker": "k",
     "text": "Of course. Careful, it's a bit sticky. The dentist gave me a lollipop. Funny, right?",
     "pt": "Claro. Cuidado, tá meio grudento. O dentista me deu um pirulito. Engraçado, né?",
     "audio": "talk/town/town-07-quiz-night/20e56ecd28d8.mp3",
     "next": "n_quiz"
    },
    "k_why": {
     "speaker": "k",
     "text": "Because it's embarrassing! I'm thirty-eight and I'm scared of dentists.",
     "pt": "Porque é vergonhoso! Tenho trinta e oito anos e morro de medo de dentista.",
     "audio": "talk/town/town-07-quiz-night/0878da2bed33.mp3",
     "next": "n_quiz"
    },
    "n_quiz": {
     "speaker": "n",
     "text": "A bell rings. The quiz host takes the microphone. Question one: what is the capital of Australia?",
     "pt": "Um sino toca. O apresentador pega o microfone. Pergunta um: qual é a capital da Austrália?",
     "audio": "talk/town/town-07-quiz-night/89e2c26d7e31.mp3",
     "next": "e_q1"
    },
    "e_q1": {
     "speaker": "e",
     "text": "Oh no. Is it Sydney? Do you know?",
     "pt": "Ai, não. É Sydney? Você sabe?",
     "audio": "talk/town/town-07-quiz-night/6e07db4f3237.mp3",
     "options": [
      {
       "text": "It's Canberra!",
       "pt": "É Camberra!",
       "audio": "talk/town/town-07-quiz-night/1530a7223c22.mp3",
       "audioF": "talk/town/town-07-quiz-night/c5f70d27bf98.mp3",
       "next": "e_right"
      },
      {
       "text": "I think you're right. Sydney.",
       "pt": "Acho que você tem razão. Sydney.",
       "audio": "talk/town/town-07-quiz-night/ee136de37a55.mp3",
       "audioF": "talk/town/town-07-quiz-night/337644d2091a.mp3",
       "next": "s_canberra"
      },
      {
       "text": "It's a big kangaroo.",
       "pt": "É um canguru grande.",
       "audio": "talk/town/town-07-quiz-night/7b63d9ef89b7.mp3",
       "audioF": "talk/town/town-07-quiz-night/fc78eaf3da5e.mp3",
       "next": null,
       "react": {
        "text": "Ha! The capital, not the animal! Which city?",
        "pt": "Rá! A capital, não o bicho! Qual cidade?",
        "audio": "talk/town/town-07-quiz-night/9a0eba5a12ad.mp3"
       }
      }
     ]
    },
    "e_right": {
     "speaker": "e",
     "text": "Canberra! Yes! Sam, write it down! We've got a genius on the team!",
     "pt": "Camberra! Isso! Sam, anota! Temos uma mente brilhante no time!",
     "audio": "talk/town/town-07-quiz-night/f9a04ff8ef60.mp3",
     "next": "e_q2"
    },
    "s_canberra": {
     "speaker": "s",
     "text": "Er, actually, it's Canberra. Everyone thinks Sydney. I'll write Canberra.",
     "pt": "Hã, na verdade é Camberra. Todo mundo acha que é Sydney. Vou escrever Camberra.",
     "audio": "talk/town/town-07-quiz-night/541dcba336b4.mp3",
     "next": "e_q2"
    },
    "e_q2": {
     "speaker": "e",
     "text": "Question two: how many strings on a guitar? Sam plays the guitar! Sam? Hello?",
     "pt": "Pergunta dois: quantas cordas tem um violão? O Sam toca violão! Sam? Alô?",
     "audio": "talk/town/town-07-quiz-night/e11ac16e7829.mp3",
     "options": [
      {
       "text": "Six!",
       "pt": "Seis!",
       "audio": "talk/town/town-07-quiz-night/3b6f3501e9ca.mp3",
       "audioF": "talk/town/town-07-quiz-night/28fe14cb7c5a.mp3",
       "next": "e_six"
      },
      {
       "text": "Ask Sam again. He's not listening.",
       "pt": "Pergunta de novo pro Sam. Ele não está ouvindo.",
       "audio": "talk/town/town-07-quiz-night/2aa1a2f44011.mp3",
       "audioF": "talk/town/town-07-quiz-night/ef27443292f2.mp3",
       "next": "s_distracted"
      },
      {
       "text": "It has a lot of songs.",
       "pt": "Ele tem muitas músicas.",
       "audio": "talk/town/town-07-quiz-night/7854dbe9d046.mp3",
       "audioF": "talk/town/town-07-quiz-night/0a389fe2322e.mp3",
       "next": null,
       "react": {
        "text": "Ha! Not songs. Strings! The things you play! How many?",
        "pt": "Rá! Músicas, não. Cordas! Aquilo que você toca! Quantas?",
        "audio": "talk/town/town-07-quiz-night/e395c62d1225.mp3"
       }
      }
     ]
    },
    "e_six": {
     "speaker": "e",
     "text": "Six! Correct! Sam, you play the guitar. Why didn't you say anything?",
     "pt": "Seis! Certo! Sam, você toca violão. Por que não falou nada?",
     "audio": "talk/town/town-07-quiz-night/079d151a545b.mp3",
     "next": "s_distracted"
    },
    "s_distracted": {
     "speaker": "s",
     "text": "What? Sorry. Six. Yes. Six strings.",
     "pt": "O quê? Desculpa. Seis. É. Seis cordas.",
     "audio": "talk/town/town-07-quiz-night/e8799639617a.mp3",
     "next": "n_q3"
    },
    "n_q3": {
     "speaker": "n",
     "text": "The host says: all tonight's money goes to the new playground. Because of the missing jar.",
     "pt": "O apresentador diz: todo o dinheiro desta noite vai pro parquinho novo. Por causa do pote sumido.",
     "audio": "talk/town/town-07-quiz-night/f2bb75fe793a.mp3",
     "next": "n_glass"
    },
    "n_glass": {
     "speaker": "n",
     "text": "Crash! Sam drops his glass. Everyone looks at him. His face is red.",
     "pt": "Crash! O Sam derruba o copo. Todo mundo olha pra ele. O rosto dele está vermelho.",
     "audio": "talk/town/town-07-quiz-night/a8b8230698cc.mp3",
     "next": "s_sorry"
    },
    "s_sorry": {
     "speaker": "s",
     "text": "Sorry! Sorry. I'm fine. I just need some air.",
     "pt": "Desculpa! Desculpa. Tô bem. Só preciso tomar um ar.",
     "audio": "talk/town/town-07-quiz-night/208c49e39061.mp3",
     "options": [
      {
       "text": "I'll come with you, Sam.",
       "pt": "Vou com você, Sam.",
       "audio": "talk/town/town-07-quiz-night/78450ae93f5b.mp3",
       "audioF": "talk/town/town-07-quiz-night/b6b9de5c7620.mp3",
       "next": "n_outside"
      },
      {
       "text": "Sam, sit down for a minute. Are you okay?",
       "pt": "Sam, senta um minuto. Você tá bem?",
       "audio": "talk/town/town-07-quiz-night/d2a113b51b53.mp3",
       "audioF": "talk/town/town-07-quiz-night/64b60ce62fba.mp3",
       "next": "s_inside"
      },
      {
       "text": "Air? Do you need a plane?",
       "pt": "Ar? Você precisa de um avião?",
       "audio": "talk/town/town-07-quiz-night/0d286a91d413.mp3",
       "audioF": "talk/town/town-07-quiz-night/4f2c61bc724d.mp3",
       "next": null,
       "react": {
        "text": "Ha. No. Just fresh air. Outside. I'm okay, really.",
        "pt": "Rá. Não. Só um ar fresco. Lá fora. Tô bem, sério.",
        "audio": "talk/town/town-07-quiz-night/e2bf08fed644.mp3"
       }
      }
     ]
    },
    "s_inside": {
     "speaker": "s",
     "text": "I'm okay. Really. It's just the jar. It was my idea, you know.",
     "pt": "Tô bem. Sério. É só o pote. Foi ideia minha, sabe.",
     "audio": "talk/town/town-07-quiz-night/ccf6be9dae38.mp3",
     "clue": "jar_idea",
     "next": "s_inside_q"
    },
    "s_inside_q": {
     "speaker": "s",
     "text": "Everyone thinks I'm just sad. But it's not that. It's something else.",
     "pt": "Todo mundo acha que eu só estou triste. Mas não é isso. É outra coisa.",
     "audio": "talk/town/town-07-quiz-night/7a54e61e6c6a.mp3",
     "options": [
      {
       "text": "It's what, Sam? You can tell me.",
       "pt": "É o quê, Sam? Pode me contar.",
       "audio": "talk/town/town-07-quiz-night/490bbb121fa0.mp3",
       "audioF": "talk/town/town-07-quiz-night/52aced3bf1e4.mp3",
       "next": "s_almost"
      },
      {
       "text": "Do you want to go outside and talk?",
       "pt": "Quer ir lá fora conversar?",
       "audio": "talk/town/town-07-quiz-night/feeee2dbfdf1.mp3",
       "audioF": "talk/town/town-07-quiz-night/be5cf44833e5.mp3",
       "next": "n_outside"
      },
      {
       "text": "It's eight o'clock.",
       "pt": "São oito horas.",
       "audio": "talk/town/town-07-quiz-night/5c1864b85290.mp3",
       "audioF": "talk/town/town-07-quiz-night/e024dd611938.mp3",
       "next": null,
       "react": {
        "text": "Ha. Yeah. But no, I mean... It's hard to explain. Never mind.",
        "pt": "Rá. É. Mas não, quero dizer... É difícil de explicar. Deixa pra lá.",
        "audio": "talk/town/town-07-quiz-night/5c9760a9a310.mp3"
       }
      }
     ]
    },
    "n_outside": {
     "speaker": "n",
     "text": "You follow Sam outside. The harbour is dark and quiet. Sam looks at the sea.",
     "pt": "Você segue o Sam lá pra fora. O porto está escuro e silencioso. O Sam olha pro mar.",
     "audio": "talk/town/town-07-quiz-night/4a2f73575c1e.mp3",
     "next": "s_out"
    },
    "s_out": {
     "speaker": "s",
     "text": "You're writing about the jar, aren't you? For the Gazette.",
     "pt": "Você está escrevendo sobre o pote, né? Pro Gazette.",
     "audio": "talk/town/town-07-quiz-night/9263277a253e.mp3",
     "next": "s_out_br"
    },
    "s_out_br": {
     "branch": [
      {
       "if": "clue_bank_question",
       "next": "s_out_q_bank"
      },
      {
       "if": null,
       "next": "s_out_q"
      }
     ]
    },
    "s_out_q_bank": {
     "speaker": "s",
     "text": "It's okay. You can ask me. Everyone else does.",
     "pt": "Tudo bem. Pode me perguntar. Todo mundo pergunta.",
     "audio": "talk/town/town-07-quiz-night/d0ae07c3d42f.mp3",
     "options": [
      {
       "text": "Yes. But I want the truth, not gossip.",
       "pt": "Sim. Mas eu quero a verdade, não fofoca.",
       "audio": "talk/town/town-07-quiz-night/2bd03c9f3c3b.mp3",
       "audioF": "talk/town/town-07-quiz-night/80e9c9f06990.mp3",
       "next": "s_almost"
      },
      {
       "text": "Leo told me you asked about the bank on Monday.",
       "pt": "O Leo me contou que você perguntou do banco na segunda.",
       "audio": "talk/town/town-07-quiz-night/d048933983b7.mp3",
       "audioF": "talk/town/town-07-quiz-night/bce2dc27ff2e.mp3",
       "next": "s_bank"
      },
      {
       "text": "Sam, do you know something about the jar?",
       "pt": "Sam, você sabe alguma coisa sobre o pote?",
       "audio": "talk/town/town-07-quiz-night/580ad01c33e5.mp3",
       "audioF": "talk/town/town-07-quiz-night/b13554e614d8.mp3",
       "next": "s_defensive"
      },
      {
       "text": "Yes, I write with my left hand.",
       "pt": "Sim, eu escrevo com a mão esquerda.",
       "audio": "talk/town/town-07-quiz-night/18c705be7791.mp3",
       "audioF": "talk/town/town-07-quiz-night/bbeceb083159.mp3",
       "next": null,
       "react": {
        "text": "Ha. Okay. But I mean the jar. You're writing a story about it?",
        "pt": "Rá. Tá. Mas eu falo do pote. Você está escrevendo uma matéria sobre ele?",
        "audio": "talk/town/town-07-quiz-night/724da31c7c0d.mp3"
       }
      }
     ]
    },
    "s_out_q": {
     "speaker": "s",
     "text": "It's okay. You can ask me. Everyone else does.",
     "pt": "Tudo bem. Pode me perguntar. Todo mundo pergunta.",
     "audio": "talk/town/town-07-quiz-night/d0ae07c3d42f.mp3",
     "options": [
      {
       "text": "Yes. But I want the truth, not gossip.",
       "pt": "Sim. Mas eu quero a verdade, não fofoca.",
       "audio": "talk/town/town-07-quiz-night/2bd03c9f3c3b.mp3",
       "audioF": "talk/town/town-07-quiz-night/80e9c9f06990.mp3",
       "next": "s_almost"
      },
      {
       "text": "Sam, do you know something about the jar?",
       "pt": "Sam, você sabe alguma coisa sobre o pote?",
       "audio": "talk/town/town-07-quiz-night/580ad01c33e5.mp3",
       "audioF": "talk/town/town-07-quiz-night/b13554e614d8.mp3",
       "next": "s_defensive"
      },
      {
       "text": "Yes, I write with my left hand.",
       "pt": "Sim, eu escrevo com a mão esquerda.",
       "audio": "talk/town/town-07-quiz-night/18c705be7791.mp3",
       "audioF": "talk/town/town-07-quiz-night/bbeceb083159.mp3",
       "next": null,
       "react": {
        "text": "Ha. Okay. But I mean the jar. You're writing a story about it?",
        "pt": "Rá. Tá. Mas eu falo do pote. Você está escrevendo uma matéria sobre ele?",
        "audio": "talk/town/town-07-quiz-night/724da31c7c0d.mp3"
       }
      }
     ]
    },
    "s_defensive": {
     "speaker": "s",
     "text": "What? Why does everybody look at me like that? Sorry. I didn't mean to shout.",
     "pt": "O quê? Por que todo mundo me olha desse jeito? Desculpa. Não quis gritar.",
     "audio": "talk/town/town-07-quiz-night/363445974de7.mp3",
     "next": "s_almost"
    },
    "s_bank": {
     "speaker": "s",
     "text": "Leo told you? Of course he did. Yes, I asked. But I'm not a thief. I promise.",
     "pt": "O Leo te contou? Claro que contou. Sim, perguntei. Mas não sou ladrão. Juro.",
     "audio": "talk/town/town-07-quiz-night/7b2c09fdedc3.mp3",
     "next": "s_almost"
    },
    "s_almost": {
     "speaker": "s",
     "text": "Can I tell you something? About Monday. I wanted to...",
     "pt": "Posso te contar uma coisa? Sobre segunda. Eu queria...",
     "audio": "talk/town/town-07-quiz-night/7ba16494bb8a.mp3",
     "next": "e_interrupt"
    },
    "e_interrupt": {
     "speaker": "e",
     "text": "Sam! There you are! Come on, it's the music round! We need you!",
     "pt": "Sam! Aí está você! Vem, é a rodada de música! Precisamos de você!",
     "audio": "talk/town/town-07-quiz-night/b0f569dabd92.mp3",
     "next": "s_never"
    },
    "s_never": {
     "speaker": "s",
     "text": "Coming! Look, forget it. Please. Tomorrow, at the festival, I'll explain everything.",
     "pt": "Já vou! Olha, esquece. Por favor. Amanhã, no festival, eu explico tudo.",
     "audio": "talk/town/town-07-quiz-night/47f7b02f5958.mp3",
     "options": [
      {
       "text": "Okay, Sam. Tomorrow.",
       "pt": "Tá bom, Sam. Amanhã.",
       "audio": "talk/town/town-07-quiz-night/caf97969ce69.mp3",
       "audioF": "talk/town/town-07-quiz-night/565fccd21ea8.mp3",
       "next": "n_end_ok"
      },
      {
       "text": "Sam, wait! Just tell me one thing. Is the money safe?",
       "pt": "Sam, espera! Só me diz uma coisa. O dinheiro está seguro?",
       "audio": "talk/town/town-07-quiz-night/536eef0e904a.mp3",
       "audioF": "talk/town/town-07-quiz-night/1a870453dd76.mp3",
       "next": "s_safe"
      },
      {
       "text": "Tomorrow? No, today is Wednesday.",
       "pt": "Amanhã? Não, hoje é quarta.",
       "audio": "talk/town/town-07-quiz-night/5f9e32e84986.mp3",
       "audioF": "talk/town/town-07-quiz-night/54420a64b0cc.mp3",
       "next": null,
       "react": {
        "text": "I know! I mean tomorrow. Thursday. The festival. Okay?",
        "pt": "Eu sei! Falo de amanhã. Quinta. O festival. Pode ser?",
        "audio": "talk/town/town-07-quiz-night/faee0e6b7234.mp3"
       }
      }
     ]
    },
    "s_safe": {
     "speaker": "s",
     "text": "The money? Yes. It's safe. Every penny. Please don't tell Emma. Not yet.",
     "pt": "O dinheiro? Sim. Está seguro. Cada centavo. Por favor, não conta pra Emma. Ainda não.",
     "audio": "talk/town/town-07-quiz-night/76ace3e0adc5.mp3",
     "set": {
      "sam_safe": "yes"
     },
     "next": "n_final"
    },
    "n_end_ok": {
     "speaker": "n",
     "text": "Sam runs back inside. Through the window, you see his red jacket.",
     "pt": "O Sam volta correndo pra dentro. Pela janela, você vê a jaqueta vermelha dele.",
     "audio": "talk/town/town-07-quiz-night/6a0349335f3f.mp3",
     "next": "n_final"
    },
    "n_final": {
     "speaker": "n",
     "text": "Tomorrow is the harbour festival. And the front page is still empty.",
     "pt": "Amanhã é o festival do porto. E a primeira página continua vazia.",
     "audio": "talk/town/town-07-quiz-night/2c4b53a72dae.mp3",
     "end": true
    }
   },
   "nudges": {
    "k": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-07-quiz-night/723b4e03956c.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-07-quiz-night/02f14f91271d.mp3"
     }
    ],
    "e": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-07-quiz-night/02def2e93f5e.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-07-quiz-night/b9dcdc8c63f9.mp3"
     }
    ],
    "s": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-07-quiz-night/5721c30a5077.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-07-quiz-night/047af034c6c2.mp3"
     }
    ]
   },
   "ambience": "pub",
   "place": "pub",
   "time": "Quarta · 20h",
   "episode": 7
  },
  {
   "slug": "town-08-the-festival",
   "title": "The Festival",
   "level": "B1",
   "description": "O grande final: conte o que você descobriu e feche a primeira página.",
   "intro": "No quiz, o Kevin provou que estava no dentista, e o Sam quase contou um segredo. Ele prometeu explicar tudo no festival. A primeira página fecha às nove.",
   "cast": {
    "n": {
     "name": "Narrator",
     "role": "Narrador",
     "side": "center"
    },
    "m": {
     "name": "Maggie",
     "role": "Editora-chefe do Gazette",
     "side": "left"
    },
    "e": {
     "name": "Emma",
     "role": "Dona do Corner Café",
     "side": "left"
    },
    "s": {
     "name": "Sam",
     "role": "Irmão da Emma",
     "side": "right"
    },
    "o": {
     "name": "Officer Ruiz",
     "role": "Policial da cidade",
     "side": "left"
    },
    "h": {
     "name": "Mr. Hughes",
     "role": "Vizinho do nº 14",
     "side": "left"
    }
   },
   "start": "n1",
   "decisions": [
    5,
    7
   ],
   "nodes": {
    "n1": {
     "speaker": "n",
     "text": "Thursday evening. The harbour is full of lights, music and the smell of fish and chips.",
     "pt": "Quinta à noite. O porto está cheio de luzes, música e cheiro de peixe com batata frita.",
     "audio": "talk/town/town-08-the-festival/6f2feea36289.mp3",
     "next": "n2"
    },
    "n2": {
     "speaker": "n",
     "text": "There's a little stage by the boats. A small brown dog runs up to you.",
     "pt": "Tem um palquinho perto dos barcos. Um cachorrinho marrom corre até você.",
     "audio": "talk/town/town-08-the-festival/ec3603094361.mp3",
     "next": "h_br"
    },
    "h_br": {
     "branch": [
      {
       "if": "helped_hughes=yes",
       "next": "h_warm"
      },
      {
       "if": null,
       "next": "h_cold"
      }
     ]
    },
    "h_warm": {
     "speaker": "h",
     "text": "Number twelve! Biscuit wanted to see you. And I've got something to tell you.",
     "pt": "Número doze! O Biscuit queria te ver. E eu tenho uma coisa pra te contar.",
     "audio": "talk/town/town-08-the-festival/4e355abff97f.mp3",
     "options": [
      {
       "text": "Is it about the boy with the bag?",
       "pt": "É sobre o rapaz da sacola?",
       "audio": "talk/town/town-08-the-festival/d53aa7637447.mp3",
       "audioF": "talk/town/town-08-the-festival/eae73529b34f.mp3",
       "next": "h_tip"
      },
      {
       "text": "Hello, Biscuit! Good boy! What is it, Mr. Hughes?",
       "pt": "Oi, Biscuit! Bom garoto! O que foi, Sr. Hughes?",
       "audio": "talk/town/town-08-the-festival/b187e13c7808.mp3",
       "audioF": "talk/town/town-08-the-festival/10ba70d650d0.mp3",
       "next": "h_biscuit"
      },
      {
       "text": "Yes, I'd like fish and chips, please.",
       "pt": "Sim, quero peixe com batata, por favor.",
       "audio": "talk/town/town-08-the-festival/455acb618b43.mp3",
       "audioF": "talk/town/town-08-the-festival/627118668f10.mp3",
       "next": null,
       "react": {
        "text": "I'm not selling fish! I said I've got something to TELL you. Listen.",
        "pt": "Eu não vendo peixe! Eu disse que tenho uma coisa pra te CONTAR. Escuta.",
        "audio": "talk/town/town-08-the-festival/57f220c09204.mp3"
       }
      }
     ]
    },
    "h_biscuit": {
     "speaker": "h",
     "text": "Biscuit first, of course. Everybody likes him more than me. Listen.",
     "pt": "O Biscuit primeiro, claro. Todo mundo gosta mais dele do que de mim. Escuta.",
     "audio": "talk/town/town-08-the-festival/bac65cca421a.mp3",
     "next": "h_tip"
    },
    "h_tip": {
     "speaker": "h",
     "text": "That boy with the bag. I'm sure now. It was Sam Clarke. Be kind to him.",
     "pt": "Aquele rapaz da sacola. Agora tenho certeza. Era o Sam Clarke. Seja gentil com ele.",
     "audio": "talk/town/town-08-the-festival/7bb9144a591d.mp3",
     "set": {
      "hughes_tip": "yes"
     },
     "next": "m1"
    },
    "h_cold": {
     "speaker": "h",
     "text": "Biscuit! Leave the reporter alone. Hmph. Evening, number twelve.",
     "pt": "Biscuit! Deixa a pessoa do jornal em paz. Hunf. Boa noite, número doze.",
     "audio": "talk/town/town-08-the-festival/fc66bcfde023.mp3",
     "next": "m1"
    },
    "m1": {
     "speaker": "m",
     "text": "There you are. The front page closes at nine. So, what have you got?",
     "pt": "Aí está você. A primeira página fecha às nove. E então, o que você tem?",
     "audio": "talk/town/town-08-the-festival/e0b3822b94ff.mp3",
     "options": [
      {
       "text": "I know what happened to the jar. And it's not a crime.",
       "pt": "Eu sei o que aconteceu com o pote. E não é crime.",
       "audio": "talk/town/town-08-the-festival/e385dc831df9.mp3",
       "audioF": "talk/town/town-08-the-festival/2d13ffef6838.mp3",
       "next": "m_notcrime"
      },
      {
       "text": "I think it was Kevin. The red jacket!",
       "pt": "Acho que foi o Kevin. A jaqueta vermelha!",
       "audio": "talk/town/town-08-the-festival/d99c203c87b3.mp3",
       "audioF": "talk/town/town-08-the-festival/f0394429d317.mp3",
       "next": "m_kevin",
       "set": {
        "accused_kevin": "yes"
       }
      },
      {
       "text": "Honestly, I'm not sure yet.",
       "pt": "Sinceramente, ainda não tenho certeza.",
       "audio": "talk/town/town-08-the-festival/8b5c73017b4c.mp3",
       "audioF": "talk/town/town-08-the-festival/b55d28ce8181.mp3",
       "next": "m_unsure"
      },
      {
       "text": "I've got two hands.",
       "pt": "Tenho duas mãos.",
       "audio": "talk/town/town-08-the-festival/f7bbad433468.mp3",
       "audioF": "talk/town/town-08-the-festival/6f47185ddc22.mp3",
       "next": null,
       "react": {
        "text": "Marvellous. Use them to write. What have you got for the story?",
        "pt": "Maravilha. Use-as pra escrever. O que você tem pra matéria?",
        "audio": "talk/town/town-08-the-festival/1d9ec0110ee2.mp3"
       }
      }
     ]
    },
    "m_kevin": {
     "speaker": "m",
     "text": "Kevin? Kevin was at the dentist, having a filling. He's shown everyone the receipt. Twice.",
     "pt": "O Kevin? O Kevin estava no dentista, fazendo uma obturação. Já mostrou o recibo pra todo mundo. Duas vezes.",
     "audio": "talk/town/town-08-the-festival/064b2855b42e.mp3",
     "options": [
      {
       "text": "Oh no. You're right. Sorry, that was a silly guess.",
       "pt": "Ai, não. Você tem razão. Desculpa, foi um palpite bobo.",
       "audio": "talk/town/town-08-the-festival/67bcce7e9a50.mp3",
       "audioF": "talk/town/town-08-the-festival/2dc193340fe9.mp3",
       "next": "m_restart"
      },
      {
       "text": "Okay, forget Kevin. Let me just give you the facts.",
       "pt": "Tá, esquece o Kevin. Deixa eu só te passar os fatos.",
       "audio": "talk/town/town-08-the-festival/c6113debcc6a.mp3",
       "audioF": "talk/town/town-08-the-festival/5f24dc62fb19.mp3",
       "next": "m_unsure"
      },
      {
       "text": "Then I'll put his teeth on the front page.",
       "pt": "Então vou pôr os dentes dele na primeira página.",
       "audio": "talk/town/town-08-the-festival/8078f38b39c0.mp3",
       "audioF": "talk/town/town-08-the-festival/dfcd9f8c466a.mp3",
       "next": null,
       "react": {
        "text": "Kevin's teeth. On my front page. Absolutely not. Try again. What have you really got?",
        "pt": "Os dentes do Kevin. Na minha primeira página. De jeito nenhum. Tente de novo. O que você tem de verdade?",
        "audio": "talk/town/town-08-the-festival/54b1ad060f59.mp3"
       }
      }
     ]
    },
    "m_restart": {
     "speaker": "m",
     "text": "Don't worry. Every reporter gets one wrong. Mine was about a stolen goose. So: who took the jar?",
     "pt": "Relaxa. Todo repórter erra uma. A minha foi sobre um ganso roubado. Então: quem pegou o pote?",
     "audio": "talk/town/town-08-the-festival/ea8af08f1342.mp3",
     "next": "who_br"
    },
    "m_unsure": {
     "speaker": "m",
     "text": "Good. No guessing. Facts, one at a time. First: who took the jar?",
     "pt": "Ótimo. Nada de chute. Fatos, um de cada vez. Primeiro: quem pegou o pote?",
     "audio": "talk/town/town-08-the-festival/6ca97ce81263.mp3",
     "next": "who_br"
    },
    "m_notcrime": {
     "speaker": "m",
     "text": "Not a crime? Now I'm interested. Facts first, though. Who took the jar?",
     "pt": "Não é crime? Agora fiquei interessada. Mas fatos primeiro. Quem pegou o pote?",
     "audio": "talk/town/town-08-the-festival/cc889d41f8b5.mp3",
     "next": "who_br"
    },
    "who_br": {
     "branch": [
      {
       "if": "hughes_tip",
       "next": "who_yes"
      },
      {
       "if": "clue_jar_idea",
       "next": "who_yes"
      },
      {
       "if": "clue_red_jacket",
       "next": "who_yes"
      },
      {
       "if": null,
       "next": "who_no"
      }
     ]
    },
    "who_yes": {
     "speaker": "m",
     "text": "Take your time. A name, if you've got one.",
     "pt": "Com calma. Um nome, se você tiver.",
     "audio": "talk/town/town-08-the-festival/94d4bdb4944b.mp3",
     "options": [
      {
       "text": "Sam Clarke. Emma's brother.",
       "pt": "Sam Clarke. O irmão da Emma.",
       "audio": "talk/town/town-08-the-festival/9ed61c45d86a.mp3",
       "audioF": "talk/town/town-08-the-festival/2317d2d1b4ef.mp3",
       "next": "why_br",
       "set": {
        "f_who": "yes"
       }
      },
      {
       "text": "Someone in a red jacket. I don't know who.",
       "pt": "Alguém de jaqueta vermelha. Não sei quem.",
       "audio": "talk/town/town-08-the-festival/ccdd64e55e6f.mp3",
       "audioF": "talk/town/town-08-the-festival/d6130bc2f08e.mp3",
       "next": "why_br"
      },
      {
       "text": "The jar is made of glass.",
       "pt": "O pote é de vidro.",
       "audio": "talk/town/town-08-the-festival/329f8c5b6394.mp3",
       "audioF": "talk/town/town-08-the-festival/02f96b06481d.mp3",
       "next": null,
       "react": {
        "text": "Thank you, Sherlock. Not WHAT. WHO. Which person took it?",
        "pt": "Obrigada, Sherlock. Não é O QUÊ. É QUEM. Que pessoa pegou?",
        "audio": "talk/town/town-08-the-festival/8aba64193b2c.mp3"
       }
      }
     ]
    },
    "who_no": {
     "speaker": "m",
     "text": "Anything at all? A name? A description?",
     "pt": "Qualquer coisa? Um nome? Uma descrição?",
     "audio": "talk/town/town-08-the-festival/079cd18de64b.mp3",
     "options": [
      {
       "text": "I really don't know. I'm sorry.",
       "pt": "Sinceramente, não sei. Desculpa.",
       "audio": "talk/town/town-08-the-festival/addbaa92ccf9.mp3",
       "audioF": "talk/town/town-08-the-festival/c4d8e0546cba.mp3",
       "next": "why_br"
      },
      {
       "text": "Someone who was in the café that morning?",
       "pt": "Alguém que estava no café naquela manhã?",
       "audio": "talk/town/town-08-the-festival/d70734fad7ab.mp3",
       "audioF": "talk/town/town-08-the-festival/abe833cfdcec.mp3",
       "next": "why_br"
      },
      {
       "text": "The jar is made of glass.",
       "pt": "O pote é de vidro.",
       "audio": "talk/town/town-08-the-festival/329f8c5b6394.mp3",
       "audioF": "talk/town/town-08-the-festival/02f96b06481d.mp3",
       "next": null,
       "react": {
        "text": "Thank you, Sherlock. Not WHAT. WHO. Which person took it?",
        "pt": "Obrigada, Sherlock. Não é O QUÊ. É QUEM. Que pessoa pegou?",
        "audio": "talk/town/town-08-the-festival/8aba64193b2c.mp3"
       }
      }
     ]
    },
    "why_br": {
     "branch": [
      {
       "if": "clue_coins",
       "next": "why_yes"
      },
      {
       "if": "clue_bank_question",
       "next": "why_yes"
      },
      {
       "if": "clue_heavy_bag",
       "next": "why_yes"
      },
      {
       "if": null,
       "next": "why_no"
      }
     ]
    },
    "why_yes": {
     "speaker": "m",
     "text": "Next question. Why take a jar for a playground? What was the plan?",
     "pt": "Próxima pergunta. Por que pegar um pote de parquinho? Qual era o plano?",
     "audio": "talk/town/town-08-the-festival/67c1284173db.mp3",
     "options": [
      {
       "text": "It was full of heavy coins. The plan was to change them for notes.",
       "pt": "Estava cheio de moedas pesadas. O plano era trocar por notas.",
       "audio": "talk/town/town-08-the-festival/4086118e2f61.mp3",
       "audioF": "talk/town/town-08-the-festival/e5cccd648f75.mp3",
       "next": "bank_br",
       "set": {
        "f_why": "yes"
       }
      },
      {
       "text": "To keep the money, I suppose.",
       "pt": "Pra ficar com o dinheiro, imagino.",
       "audio": "talk/town/town-08-the-festival/8e4194a38176.mp3",
       "audioF": "talk/town/town-08-the-festival/d8d72746c98c.mp3",
       "next": "bank_br"
      },
      {
       "text": "Jam, I think.",
       "pt": "Geleia, eu acho.",
       "audio": "talk/town/town-08-the-festival/8d8a418abbf2.mp3",
       "audioF": "talk/town/town-08-the-festival/5f7c325b0f38.mp3",
       "next": null,
       "react": {
        "text": "Jam. Wonderful. No. Think about the money in the jar. What was the plan?",
        "pt": "Geleia. Maravilha. Não. Pense no dinheiro do pote. Qual era o plano?",
        "audio": "talk/town/town-08-the-festival/1172352d4162.mp3"
       }
      }
     ]
    },
    "why_no": {
     "speaker": "m",
     "text": "Next question. Why take a jar for a playground? Any idea?",
     "pt": "Próxima pergunta. Por que pegar um pote de parquinho? Alguma ideia?",
     "audio": "talk/town/town-08-the-festival/81134aec0803.mp3",
     "options": [
      {
       "text": "To keep the money, I suppose.",
       "pt": "Pra ficar com o dinheiro, imagino.",
       "audio": "talk/town/town-08-the-festival/8e4194a38176.mp3",
       "audioF": "talk/town/town-08-the-festival/d8d72746c98c.mp3",
       "next": "bank_br"
      },
      {
       "text": "I don't know. It doesn't make sense.",
       "pt": "Não sei. Não faz sentido.",
       "audio": "talk/town/town-08-the-festival/3b37ee5f50eb.mp3",
       "audioF": "talk/town/town-08-the-festival/10e7d827b011.mp3",
       "next": "bank_br"
      },
      {
       "text": "Jam, I think.",
       "pt": "Geleia, eu acho.",
       "audio": "talk/town/town-08-the-festival/8d8a418abbf2.mp3",
       "audioF": "talk/town/town-08-the-festival/5f7c325b0f38.mp3",
       "next": null,
       "react": {
        "text": "Jam. Wonderful. No. Think about the money in the jar. Any idea?",
        "pt": "Geleia. Maravilha. Não. Pense no dinheiro do pote. Alguma ideia?",
        "audio": "talk/town/town-08-the-festival/56feeaac7391.mp3"
       }
      }
     ]
    },
    "bank_br": {
     "branch": [
      {
       "if": "clue_bank_holiday",
       "next": "bank_yes"
      },
      {
       "if": "clue_bank_question",
       "next": "bank_yes"
      },
      {
       "if": null,
       "next": "bank_no"
      }
     ]
    },
    "bank_yes": {
     "speaker": "m",
     "text": "Last question. Money problems usually mean the bank. Why not just go to the bank?",
     "pt": "Última pergunta. Problema com dinheiro, normalmente, é no banco. Por que não ir direto ao banco?",
     "audio": "talk/town/town-08-the-festival/4ce819ab76f4.mp3",
     "options": [
      {
       "text": "Because Monday was a bank holiday. The bank was closed all day.",
       "pt": "Porque segunda foi feriado bancário. O banco ficou fechado o dia todo.",
       "audio": "talk/town/town-08-the-festival/805314afa03d.mp3",
       "audioF": "talk/town/town-08-the-festival/cf0534740a70.mp3",
       "next": "end_br1",
       "set": {
        "f_bank": "yes"
       }
      },
      {
       "text": "Maybe the bank was too busy?",
       "pt": "Talvez o banco estivesse cheio demais?",
       "audio": "talk/town/town-08-the-festival/0e28fa2ff583.mp3",
       "audioF": "talk/town/town-08-the-festival/871801ebe189.mp3",
       "next": "end_br1"
      },
      {
       "text": "The bank was in the park.",
       "pt": "O banco estava no parque.",
       "audio": "talk/town/town-08-the-festival/24e35e7e1810.mp3",
       "audioF": "talk/town/town-08-the-festival/b95136011615.mp3",
       "next": null,
       "react": {
        "text": "That's a bench. Lovely for sitting. Useless for money. Why not go to the bank?",
        "pt": "Isso é banco de praça. Ótimo pra sentar. Inútil pra dinheiro. Por que não ir ao banco?",
        "audio": "talk/town/town-08-the-festival/dfff27972727.mp3"
       }
      }
     ]
    },
    "bank_no": {
     "speaker": "m",
     "text": "Last question. Money problems usually mean the bank. Why not just go to the bank?",
     "pt": "Última pergunta. Problema com dinheiro, normalmente, é no banco. Por que não ir direto ao banco?",
     "audio": "talk/town/town-08-the-festival/4ce819ab76f4.mp3",
     "options": [
      {
       "text": "Maybe the bank was too busy?",
       "pt": "Talvez o banco estivesse cheio demais?",
       "audio": "talk/town/town-08-the-festival/0e28fa2ff583.mp3",
       "audioF": "talk/town/town-08-the-festival/871801ebe189.mp3",
       "next": "end_br1"
      },
      {
       "text": "I'm not sure. I was new in town.",
       "pt": "Não tenho certeza. Eu tinha acabado de chegar.",
       "audio": "talk/town/town-08-the-festival/b806757eaba8.mp3",
       "audioF": "talk/town/town-08-the-festival/1188063c246c.mp3",
       "next": "end_br1"
      },
      {
       "text": "The bank was in the park.",
       "pt": "O banco estava no parque.",
       "audio": "talk/town/town-08-the-festival/24e35e7e1810.mp3",
       "audioF": "talk/town/town-08-the-festival/b95136011615.mp3",
       "next": null,
       "react": {
        "text": "That's a bench. Lovely for sitting. Useless for money. Why not go to the bank?",
        "pt": "Isso é banco de praça. Ótimo pra sentar. Inútil pra dinheiro. Por que não ir ao banco?",
        "audio": "talk/town/town-08-the-festival/dfff27972727.mp3"
       }
      }
     ]
    },
    "end_br1": {
     "branch": [
      {
       "if": "f_why=yes",
       "next": "end_br2"
      },
      {
       "if": null,
       "next": "end_basic"
      }
     ]
    },
    "end_br2": {
     "branch": [
      {
       "if": "f_who=yes",
       "next": "end_br3"
      },
      {
       "if": null,
       "next": "end_good"
      }
     ]
    },
    "end_br3": {
     "branch": [
      {
       "if": "f_bank=yes",
       "next": "end_best"
      },
      {
       "if": null,
       "next": "end_good"
      }
     ]
    },
    "end_best": {
     "speaker": "m",
     "text": "Sam took his own jar to change the coins. But the bank was closed. So where's the money?",
     "pt": "O Sam pegou o próprio pote pra trocar as moedas. Mas o banco estava fechado. Então, cadê o dinheiro?",
     "audio": "talk/town/town-08-the-festival/f4c3f27f36bb.mp3",
     "next": "s_best"
    },
    "s_best": {
     "speaker": "s",
     "text": "Right here. You worked it all out. Yes. It was me.",
     "pt": "Bem aqui. Você descobriu tudo. Sim. Fui eu.",
     "audio": "talk/town/town-08-the-festival/33e1faa60701.mp3",
     "next": "s_reveal"
    },
    "end_good": {
     "speaker": "m",
     "text": "You've got pieces, not the whole picture. Monday was a bank holiday, you know. Oh, look.",
     "pt": "Você tem peças, não o quadro todo. Segunda foi feriado bancário, sabia? Ah, olha.",
     "audio": "talk/town/town-08-the-festival/05b515251dfc.mp3",
     "next": "s_basic"
    },
    "end_basic": {
     "speaker": "m",
     "text": "Well. We've got a mystery, not a story. Wait. Who's that on the stage?",
     "pt": "Bom. Temos um mistério, não uma matéria. Espera. Quem é aquele no palco?",
     "audio": "talk/town/town-08-the-festival/10e98e83cbbb.mp3",
     "next": "s_basic"
    },
    "s_basic": {
     "speaker": "s",
     "text": "Excuse me! Can everyone listen, please? I've got something to say.",
     "pt": "Com licença! Todo mundo pode escutar, por favor? Tenho uma coisa pra dizer.",
     "audio": "talk/town/town-08-the-festival/aed251fa3acf.mp3",
     "next": "s_reveal"
    },
    "s_reveal": {
     "speaker": "s",
     "text": "I took the jar. It was my idea, and I wanted to surprise everyone.",
     "pt": "Eu peguei o pote. Era ideia minha, e eu queria fazer uma surpresa pra todo mundo.",
     "audio": "talk/town/town-08-the-festival/b50394f46a28.mp3",
     "next": "s_reveal2"
    },
    "s_reveal2": {
     "speaker": "s",
     "text": "It was so heavy. I wanted to change the coins at the bank, for a giant cheque.",
     "pt": "Estava pesado demais. Eu queria trocar as moedas no banco, por um cheque gigante.",
     "audio": "talk/town/town-08-the-festival/8d9135990ec4.mp3",
     "next": "s_reveal3"
    },
    "s_reveal3": {
     "speaker": "s",
     "text": "But the bank was closed. Ravi helped me. Then the police came, and I panicked.",
     "pt": "Mas o banco estava fechado. O Ravi me ajudou. Aí a polícia apareceu, e eu entrei em pânico.",
     "audio": "talk/town/town-08-the-festival/5360aa35d657.mp3",
     "next": "n_cheque"
    },
    "n_cheque": {
     "speaker": "n",
     "text": "Sam holds up a giant cardboard cheque. The whole harbour goes quiet.",
     "pt": "O Sam levanta um cheque gigante de papelão. O porto inteiro fica em silêncio.",
     "audio": "talk/town/town-08-the-festival/9e6d5d5f62c0.mp3",
     "next": "s_savings"
    },
    "s_savings": {
     "speaker": "s",
     "text": "It's all here. Plus my savings. Two years of guitar money. I'm so sorry, Emma.",
     "pt": "Está tudo aqui. Mais as minhas economias. Dois anos de dinheiro do violão. Me desculpa, Emma.",
     "audio": "talk/town/town-08-the-festival/f7b2e4906719.mp3",
     "next": "donated_br"
    },
    "donated_br": {
     "branch": [
      {
       "if": "donated=yes",
       "next": "s_pound"
      },
      {
       "if": null,
       "next": "e_cry"
      }
     ]
    },
    "s_pound": {
     "speaker": "s",
     "text": "And your pound from Monday is in there too. Thank you for that.",
     "pt": "E a sua libra de segunda está aí também. Obrigado por isso.",
     "audio": "talk/town/town-08-the-festival/d470dd9db79f.mp3",
     "next": "e_cry"
    },
    "e_cry": {
     "speaker": "e",
     "text": "Sam! You silly, wonderful boy! Why didn't you just tell me?",
     "pt": "Sam! Seu bobo maravilhoso! Por que você simplesmente não me contou?",
     "audio": "talk/town/town-08-the-festival/af6bf390383a.mp3",
     "next": "o_close"
    },
    "o_close": {
     "speaker": "o",
     "text": "Well. Nobody stole anything. So, officially: case closed. Happily.",
     "pt": "Bom. Ninguém roubou nada. Então, oficialmente: caso encerrado. Com final feliz.",
     "audio": "talk/town/town-08-the-festival/3f139b295d67.mp3",
     "next": "e_you"
    },
    "e_you": {
     "speaker": "e",
     "text": "And you! You've been asking questions all week. What do you want to say to Sam?",
     "pt": "E você! Passou a semana fazendo perguntas. O que quer dizer pro Sam?",
     "audio": "talk/town/town-08-the-festival/b1066d6b0f03.mp3",
     "options": [
      {
       "text": "Sam, that was brave. Thank you for telling the truth.",
       "pt": "Sam, isso foi corajoso. Valeu por contar a verdade.",
       "audio": "talk/town/town-08-the-festival/56d31e29f17a.mp3",
       "audioF": "talk/town/town-08-the-festival/f4dbf11316b1.mp3",
       "next": "s_thanks"
      },
      {
       "text": "Can I interview you for the Gazette, Sam?",
       "pt": "Posso te entrevistar pro Gazette, Sam?",
       "audio": "talk/town/town-08-the-festival/cf4c9e713719.mp3",
       "audioF": "talk/town/town-08-the-festival/7fd684bfa8db.mp3",
       "next": "s_interview"
      },
      {
       "text": "I'd like a giant cheese, please.",
       "pt": "Eu queria um queijo gigante, por favor.",
       "audio": "talk/town/town-08-the-festival/5e58786df2a6.mp3",
       "audioF": "talk/town/town-08-the-festival/1a0db71b9794.mp3",
       "next": null,
       "react": {
        "text": "A cheese? It's a CHEQUE! Ha! Oh, I'm laughing and crying. What do you want to tell Sam?",
        "pt": "Um queijo? É um CHEQUE! Rá! Ai, estou rindo e chorando. O que quer dizer pro Sam?",
        "audio": "talk/town/town-08-the-festival/1bd2ecd89896.mp3"
       }
      }
     ]
    },
    "s_thanks": {
     "speaker": "s",
     "text": "Thanks. And thanks for not writing gossip. Leo said you'd be fair.",
     "pt": "Valeu. E obrigado por não escrever fofoca. O Leo disse que você ia agir com justiça.",
     "audio": "talk/town/town-08-the-festival/67cbaa8700bb.mp3",
     "next": "m_final_br"
    },
    "s_interview": {
     "speaker": "s",
     "text": "Me? On the front page? Okay. But please use a nice photo. Not one of Kevin's.",
     "pt": "Eu? Na primeira página? Tá bom. Mas usa uma foto bonita, por favor. Não uma do Kevin.",
     "audio": "talk/town/town-08-the-festival/8ef4d4f79bae.mp3",
     "next": "m_final_br"
    },
    "m_final_br": {
     "branch": [
      {
       "if": "accused_kevin",
       "next": "m_kevin_joke"
      },
      {
       "if": null,
       "next": "m_final"
      }
     ]
    },
    "m_kevin_joke": {
     "speaker": "m",
     "text": "And next time, leave Kevin's teeth out of it.",
     "pt": "E da próxima vez, deixe os dentes do Kevin fora disso.",
     "audio": "talk/town/town-08-the-festival/9f8703644bfd.mp3",
     "next": "m_final"
    },
    "m_final": {
     "speaker": "m",
     "text": "A missing jar, a bank holiday and a boy with a guitar. That's our front page.",
     "pt": "Um pote sumido, um feriado bancário e um garoto com um violão. Essa é a nossa primeira página.",
     "audio": "talk/town/town-08-the-festival/94d8f188d581.mp3",
     "next": "n_end"
    },
    "n_end": {
     "speaker": "n",
     "text": "Your first week in Millbrook is over. You came for a job. You found a home.",
     "pt": "Sua primeira semana em Millbrook acabou. Você veio por um emprego. Encontrou um lar.",
     "audio": "talk/town/town-08-the-festival/3752af30f128.mp3",
     "end": true
    }
   },
   "nudges": {
    "m": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-08-the-festival/2ec231f8f022.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-08-the-festival/f93d11464f9f.mp3"
     }
    ],
    "e": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-08-the-festival/02def2e93f5e.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-08-the-festival/b9dcdc8c63f9.mp3"
     }
    ],
    "s": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-08-the-festival/5721c30a5077.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-08-the-festival/047af034c6c2.mp3"
     }
    ],
    "o": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-08-the-festival/7b3d34bbfd83.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-08-the-festival/1c0a116df90a.mp3"
     }
    ],
    "h": [
     {
      "text": "Take your time.",
      "pt": "Pode pensar com calma.",
      "audio": "talk/town/town-08-the-festival/75759147c884.mp3"
     },
     {
      "text": "Sorry, did you hear me?",
      "pt": "Desculpe, você me ouviu?",
      "audio": "talk/town/town-08-the-festival/b37319da9442.mp3"
     }
    ]
   },
   "ambience": "festival",
   "place": "festival",
   "time": "Quinta · 18h",
   "episode": 8
  }
 ]
};
