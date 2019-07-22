# Twitter nodejs test

Um exemplo de um código back-end que simula as algumas funções de uma aplicação como o twitter

## Instalação

Antes de iniciar é necessário definir as variáveis de ambientes utilizadas na aplicação.
Nesse repositório contém o arquivo setenv.sh com as informações utilizadas no desenvolvimento.

```sh
source ./setenv.sh
```

Após basta executar,

```sh
npm install
```

e para iniciar o servidor

```sh
npm start
```

## Utilização da api

Esta api foi definida para enviar e receber mensagens no formato json.
Para executar durante os testes de usuário, utilizei o comando curl, abaixo irei explicar as rotas da api
e junto, contará com um exemplo.
A aplicação para as rotas autenticadas procura pelo cabeçalho http ``x-access-token``.

### Rotas da api que não precisam auth

*Criação de usuário: POST /user
    * Essa rota é responsável por criação de um usuário. É enviado enviado para o servidor o email, nome e duas senhas, se elas forem iguais o novo usuário é criado, caso ao contrário retorna um erro.

```sh
curl -d '{"email":"christian@gmail.com", "name":"christian tavares","password1":"123445" ,"password2":"123445"}' -H "Content-Type: application/json" -X POST http://localhost:3000/user/
```

* Login no twitter: POST /login
    * Nessa rota é enviado a senha e o email do usuário que quer fazer o login, contendo no banco as informações é retornado um token. Esse
    token deve ser armazenado no cabeçalho http ``x-access-token``.

```sh
curl -d '{"email":"christian@gmail.com", "password":"123445"}' -H "Content-Type: application/json" -X POST http://localhost:3000/login
```

### Rotas USER da api que precisam autenticação

* Editar nome e email de usuário: PUT /user
    * Enviado os novos nome e email do usuário;

```sh
curl  -H x-access-token:"SEU-TOKEN" -d '{"email":"tavares@hotmail.com", "name":"roberto souza"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/user/
```

* Editar senha do usuário: PUT /user/password
    * Enviado a senha antiga e duas novas senhas que devem ser iguais. O servidor verifica se a senha antiga é igual a senha registrada no banco, caso seja, verifica se as duas senhas enviadas são iguas, sendo, o banco é atualizado;

```sh
curl  -H x-access-token:"SEU-TOKEN" -d '{"oldpassword":"123445","password1":"123","password2":"123"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/user/password
```

* Deletar conta do usuário: DELETE /user
    * Deleta tudo referente ao usuário

```sh
curl  -H x-access-token:"SEU-TOKEN" -X DELETE http://localhost:3000/user
```

*Obter user info: GET /user
    * Obtem as informações do usuário

```sh
curl  -H x-access-token:"SEU-TOKEN" -X GET http://localhost:3000/user
```

### Rotas Posts da api que utilizam autenticação

* Adicionar post: POST /posts
    * Enviado o conteudo a ser postado.

```sh
curl  -H x-access-token:"SEU-TOKEN"  -d '{"content":"Partiu tomar mate da donja"}' -H "Content-Type: application/json" -X POST http://localhost:3000/posts
```

* Obter post id: GET /posts/:id
    * Retorna o post com o id definido na rota.

```sh
curl  -H x-access-token:"SEU-TOKEN"  -X GET http://localhost:3000/posts/1
```

* Obter os comentários contidos em determinado post: GET /posts/:id/comments
    * Retorna todos os comentários contidos no post id, definido na rota.

```sh
curl  -H x-access-token:"SEU-TOKEN"  -X GET http://localhost:3000/posts/1/comments
```

* Delete post: DELETE /posts/:id
    * Deleta o post com o id definido na rota, mas, somente o próprio criador do post poderá deletar.

```sh
curl  -H x-access-token:"SEU-TOKEN"  -X DELETE http://localhost:3000/posts/2
```

* Editar o conteúdo do post: PUT /posts/:id
    * O conteúdo do post é alterado para o novo conteúdo enviado. Porém só o dono do post pode altera-lo.

```sh
curl  -H x-access-token:"SEU-TOKEN"  -d '{"content":"Partiu quadrado"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/posts/1
```

### Rotas Comments da api que utilizam autenticação

* Adicionar post: POST /comments/:id
    * Novo comentário é adicionado no post de id definido pela rota

```sh
curl  -H x-access-token:"SEU-TOKEN"  -d '{"content":"Vamos tomar sim"}' -H "Content-Type: application/json" -X POST http://localhost:3000/comments/1
```

* Obter post id: GET /comments/:id
    * Retorna o comentário com o id definido na rota.

```sh
curl  -H x-access-token:"SEU-TOKEN"   -X GET http://localhost:3000/comments/1
```

* Editar o conteúdo do post: PUT /comments/:id
    * O conteúdo do comentário é alterado para o novo conteúdo enviado. Porém só o dono do post pode altera-lo.

```sh
curl  -H x-access-token:"SEU-TOKEN"  -d '{"content":"Muito bom o dia"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/comments/2
```

* Delete post: DELETE /comments/:id
    * Deleta o comentário com o id definido na rota, mas, somente o próprio criador do comentário poderá deletar.

```sh
curl  -H x-access-token:"SEU-TOKEN" -X DELETE http://localhost:3000/comments/1
```

### Outras Rotas da api que utilizam autenticação

* Home: GET /
    * Retorna todos os posts em ordem de data. o mais novo antes.

```sh
curl  -H x-access-token:"SEU-TOKEN" -X GET http://localhost:3000/
```

* Logout: GET /logout
    * Remove o token.

```sh
curl  -H x-access-token:"SEU-TOKEN" -X GET http://localhost:3000/logout
```

## Considerações

* Não possuia contato com a programação em nodejs.
* Percebi no final do desenvolvimento que poderia utilizar um ORM para nodejs, facilitaria minha vida na manipulação com o banco de dados.
* Não mudei para o ORM pois o prazo determinado para a entrega estava se encerrando.
* Por ter desenvolvido de forma rápida, os commits não estão organizados como eu gostaria. Portanto gostaria que eles não fossem levados em conta.
* Muito obrigado pela oportunidade de participar da seleção.
