const express = require('express');
const userController = require('./controllers/userController');

const routes = express.Router();

routes.get('/users', userController.getAllUsers);

routes.get(
  '/users/:index',
  userController.checkUserInArray,
  userController.getOneUser
);

routes.post('/users', userController.checkUserExists, userController.newUser);
// routes.post('/users', userController.newUser);

routes.delete(
  '/users/:index',
  userController.checkUserInArray,
  userController.deleteUser
);

module.exports = routes;
