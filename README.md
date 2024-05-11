# Project-Check-Green

Final project for #teamTRIP #FuturoDEV FMT Module 1 - Back-End [Viagem365]

MVP for an API Rest connecting travelers to share sustainable experiences

## How to run the repository

### Dependencies needed when accessing the project for the first time:
1. `npm init-y` for Node.js
2. `npm install express --save` for Express
3. `npm install sequelize pg pg-hstore jsonwebtoken bcryptjs cors` for the starting libraries, as well as referencing Pg Admin (PostgreSQL)
4. `npm install nodemon dotenv --save-dev` to enable server and load environment variables
5. `cp .env_example .env` example for .env configuration 

## Migrations

### Create migration
1. Option nº 1: `sequelize migration:generate --name nome_da_migracao`
2. Option nº 2: `npx sequelize-cli migration:generate --name criar_tabela_alunos`

### Run migration
1. Option nº 1: `sequelize db:migrate`
2. Option nº 2: `npx sequelize db:migrate`

### Revert last migration:
1. Option nº 1: `sequelize-cli db:migrate:undo`
2. Option nº 2: `npx sequelize-cli db:migrate:undo`

## Seeders

### Create initial values in the database:
`npx sequelize-cli seed:generate --name demo-user`

### Run seeder
`npx sequelize-cli db:seed:all`

### Revert last seeder, specific seeder or all:
1. Option nº 1: `npx sequelize-cli db:seed:undo`
2. Option nº 2: `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`
3. Option nº 3: `npx sequelize-cli db:seed:undo:all`

## Documentation

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

## Additional scripts in package.json:

1. "start:dev": "nodemon src/index.js",
2. "swagger": "node ./swagger.js",
3. "test-coordinates": "node src/service/test.coordinates.js"

### To run the repository in a local environment:
`npm run start:dev`

### To update and run Swagger.json with autogen:
`npm run swagger`

### Para gerar coordenadas com test.coordinates.js
Separate file in service folder to search for coordinates when registering new places. Add the name of a place using the const address and type the command `npm run test-coordinates` in the terminal to access the latitude and longitude information

## Libraries used

### Sequelize
`npm install sequelize` 

### PostgreSQL Drive
`npm install pg pg-hstore` 

### Sequelize CLI
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
