const { Router } = require('express'); 
const { auth } = require('../middlewares/auth');
const UserController = require('../controllers/UserController');

const userRoutes = new Router();

userRoutes.post('/', UserController.create);   
userRoutes.get('/', auth, UserController.showAll);
userRoutes.get('/:id', auth, UserController.showOne);
userRoutes.put('/:id', auth, UserController.update);
userRoutes.delete('/:id', auth, UserController.delete);

module.exports = userRoutes;

