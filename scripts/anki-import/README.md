# Importar baralhos do Anki desktop para o Tunely

Leva baralhos do Anki (texto, áudio e **histórico de revisões**) para baralhos próprios de um usuário.

1. Copie a coleção (não use a original com o Anki aberto):
   `cp ~/Library/Application\ Support/Anki2/<Perfil>/collection.anki2* /tmp/anki/`
2. Gere o pacote (frente/verso sem HTML, áudios e agendamento convertidos para o dia do Tunely):
   `python3 -I build_bundle.py /tmp/anki/collection.anki2 ~/Library/Application\ Support/Anki2/<Perfil>/collection.media /tmp/bundle`
   (assume virada do dia às 4h e fuso UTC−3, como no Anki do usuário — ajuste TZ/ROLL no script se for diferente)
3. No servidor, dentro do container da API (cwd /app):
   `node import-anki-bundle.mjs /tmp/bundle <email>`
   Reexecutar substitui os baralhos próprios de mesmo nome.

Backup antes: `pg_dump` do banco.
