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
1. Opção nº 1: `sequelize migration:generate --name nome_da_migracao`
2. Opção nº 2: `npx sequelize-cli migration:generate --name criar_tabela_alunos`

### Rodar migration
1. Opção nº 1: `sequelize db:migrate`
2. Opção nº 2: `npx sequelize db:migrate`

### Reverter última migration:
1. Opção nº 1: `sequelize-cli db:migrate:undo`
2. Opção nº 2: `npx sequelize-cli db:migrate:undo`

## Seeders

### Criar valores iniciais no banco de dados:
`npx sequelize-cli seed:generate --name demo-user`

### Rodar seeder
`npx sequelize-cli db:seed:all`

### Reverter última seeder, seeder específica ou todas:
1. Opção nº 1: `npx sequelize-cli db:seed:undo`
2. Opção nº 2: `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`
3. Opção nº 3: `npx sequelize-cli db:seed:undo:all`

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

1. "start:dev": "nodemon src/index.js",
2. "swagger": "node ./swagger.js",
3. "test-coordinates": "node src/service/test.coordinates.js"

### Para rodar o repositório em ambiente local
`npm run start:dev`

### Para atualizar e rodar o Swagger.json com autogen
`npm run swagger`

### Para gerar coordenadas com test.coordinates.js
Arquivo separado em service para buscar as coordenadas para o cadastro de novos lugares. Basta colocar o nome do lugar na const address e usar o comando `npm run test-coordinates` no terminal para ter acesso às informações de latitude e longitude

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
