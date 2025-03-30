# Serviço de backend utilizado para gestão de creche/escola

O serviço foi iniciado para atender a uma necessidade de agenda digital/rotina das crianças/alunos da creche/escola.

O serviço foi evoluindo com algumas outras features como notificação, eventos, cardápio entre outros.

**Tecnologias utilizadas:** NodeJS e framework [KoaJS](https://koajs.com/)

O serviço foi criado utilizando NodeJS (Javascript) com framework KoaJS.

Para a persistência de dadaos, foi utilizado um banco de dados relacional, o Postgresql.

No projeto foi utilizado o Awilix para injeção de dependência.

## Rotas

### Rotas de validação
- _GET -> /healthchek_: verifica se a aplicação está pronta para utilização

### Rotas de autenticação e validação
- _POST -> /login_: realiza o login na aplicação e devolve um JWT para validar a sessão
- _GET -> /authorization_: valida se o JWT está autorizado e a sessão do usuário é valida

### Rotas de usuários logado no sistema
- _GET -> /user/me_: retorna informações do usuário logado no sistema
- _PUT -> /user/me_: atualiza o cadastro do usuário logado no sistema
- _POST -> /user/me/updatePassword_: atualiza a senha do usuário logado no sistema

### Rotas para CRUD de usuário
- _POST -> /user_: cria um novo usuário no sistema
- _PUT -> /user/:id_: atualiza o cadastro de um usuário do sistema através do ID
- _DELETE -> /user/:id_: deleta logicamente um usuário do sistema através do ID
- _GET -> /user/:id_: retorna as informações de cadastro de um usuário do sistema através do ID
- _GET -> /user/cpf/:cpf_: retorna as informações de cadastro de um usuário do sistema através do CPF
- _GET -> /user_: retorna a lista de usuários cadastrados no sistema de forma paginada

...


