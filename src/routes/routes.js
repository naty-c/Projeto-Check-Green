const { Router } = require("express");

const userRoutes = require("./users.route");
const placeRoutes = require("./places.route");
const loginRoutes = require("./login.route");

const routes = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/users', userRoutes);
routes.use('/places', placeRoutes);
routes.use('/login', loginRoutes);

module.exports = routes;