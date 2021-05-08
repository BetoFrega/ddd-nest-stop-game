# language:pt

Funcionalidade: Usuário faz login

  Contexto:
    Dado existem os seguintes usuários na base:
      | email          | senha    |
      | user1@test.com | p455w0rd |
    E estou na página "login/".

  Cenário: Senha correta
    Quando preencho o campo de "email" com o valor "user1@test.com".
    E preencho o campo de "senha" com o valor "p455w0rd".
    E clico no botão escrito "Entrar".
    Então verifico que estou na página "/lobby".

  Cenário: Senha incorreta
    Quando preencho o campo de "email" com o valor "user1@test.com".
    E preencho o campo de "senha" com o valor "uma-senha-errada".
    E clico no botão escrito "Entrar".
    Então verifico que o campo de "senha" tem uma cor vermelha.
    E verifico a presença da mensagem "Senha incorreta".




