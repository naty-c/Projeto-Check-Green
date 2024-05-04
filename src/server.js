const express = require('express');
const cors = require('cors');
const { connection } = require('./database/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/swagger.json');

const { auth } = require('./middlewares/auth');

const routes = require('./routes/routes');

const PORT_API = process.env.PORT_API;

class Server {
    constructor(server = express()) {
        this.middlewares(server);
        this.database();
        this.initializeServer(server);
        this.allRoutes(server);
        this.swaggerConfig(server);
    }

    async middlewares(app) {
        app.use(cors());
        app.use(express.json());
    }

    async database() {
        try {
            await connection.authenticate();
            console.log('Successful connection!');
        } catch (error) {
            console.error('Unable to connect to the database.', error);
            throw error;
        }
    }

    async initializeServer(app) {
        app.listen(PORT_API, () => console.log(`Server running on port ${PORT_API}`));
    }

    async allRoutes(app) {
        app.use(routes);
    }

    async swaggerConfig(app) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
      }
}

module.exports = { Server };
