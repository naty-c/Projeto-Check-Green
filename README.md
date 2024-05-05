# Projeto-Check-Green

Final project for #FuturoDEV FMT Module 1 [Viagem365]

## Como rodar o repositório

### Dependências ao acessar o projeto pela primeira vez:
1. `npm init-y` para o Node.js
2. `npm install express --save` para o Express
3. `npm install sequelize pg pg-hstore jsonwebtoken bcryptjs cors` para as bibliotecas iniciais, além de referenciar o Pg Admin
4. `npm install nodemon dotenv --save-dev` para habilitar server e carregar variáveis de ambiente
5. `cp .env_example .env` para exemplo de configuração do .env

## Migrations

### Criar migration
Opção nº 1: `sequelize migration:generate --name nome_da_migracao`
Opção nº 2: `npx sequelize-cli migration:generate --name criar_tabela_alunos`

### Rodar migration
Opção nº 1: `sequelize db:migrate`
Opção nº 2: `npx sequelize db:migrate`

### Reverter última migration:
Opção nº 1: `sequelize-cli db:migrate:undo`
Opção nº 2: `npx sequelize-cli db:migrate:undo`

## Seeders

### Criar valores iniciais no banco de dados:
`npx sequelize-cli seed:generate --name demo-user`

### Rodar seeder
`npx sequelize-cli db:seed:all`

### Reverter última seeder:
Opção nº 1: `npx sequelize-cli db:seed:undo`
Opção nº 2: `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`
Opção nº 3: `npx sequelize-cli db:seed:undo:all`

## Documentação

### Sequelize
https://sequelize.org/docs/v6/core-concepts/model-basics/

### Seeders
https://sequelize.org/docs/v6/other-topics/migrations/

### Swagger
https://swagger-autogen.github.io/docs/swagger-2/parameters/

### Swagger API Documentation
http://localhost:3033/api-docs/

### Validator
https://www.npmjs.com/package/validator

### API OpenStreetMap
https://www.openstreetmap.org/help

## Scripts adicionais no package.json:

"start:dev": "nodemon src/index.js",
"swagger": "node ./swagger.js",
"test-coordinates": "node src/service/test.coordinates.js"

### Para rodar o repositório em ambiente local
`npm run start:dev`

### Para atualizar e rodar o Swagger.json com autogen
`npm run swagger`

### Para gerar coordenadas com test.coordinates.js
`npm run test-coordinates`

## Bibliotecas utilizadas

### Sequelize
`npm install sequelize` 

### Driver do PostgreSQL
`npm install pg pg-hstore` 

### CLI do Sequelize
`npm install -g sequelize-cli` 

### Dotenv
`npm install dotenv`

### Json Web Token (JWT)
`npm install jsonwebtoken`

### bcryptjs
`npm install bcryptjs`

### Axios
`npm install axios`

### Swagger UI
`npm install swagger-ui-express swagger-jsdoc`

### Swagger AutoGen
`npm install swagger-autogen`
