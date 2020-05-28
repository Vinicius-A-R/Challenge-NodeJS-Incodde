const express = require('express');
const userController = require('./controllers/userController');

const routes = express.Router();

routes.get('/users', userController.getAllUsers);

routes.get(
  '/users/:id',
  userController.checkUserInArray,
  userController.getOneUser
);

routes.post('/users', userController.checkUserExists, userController.newUser);

routes.put(
  '/users/:id',
  userController.checkUserInArray,
  userController.changeUser
);

routes.delete(
  '/users/:id',
  userController.checkUserInArray,
  userController.deleteUser
);

module.exports = routes;
