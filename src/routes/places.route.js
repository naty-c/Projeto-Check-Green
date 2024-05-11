const { Router } = require('express');
const { auth } = require('../middlewares/auth');
const PlaceController = require('../controllers/PlaceController');

const placeRoutes = new Router();

placeRoutes.post('/', auth, PlaceController.create);
placeRoutes.get('/', auth, PlaceController.showAll);
placeRoutes.get('/:id', auth, PlaceController.showOne);   
placeRoutes.put('/:id', auth, PlaceController.update);
placeRoutes.delete('/:id', auth, PlaceController.delete);

module.exports = placeRoutes;