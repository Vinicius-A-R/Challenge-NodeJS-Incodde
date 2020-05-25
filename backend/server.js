const express = require('express');
const cors = require('cors');

const userController = require('./controllers/userController');
const host = 'http://localhost:';
const port = 5000;

const server = express();

const corsOptions = {
  origin: `${host}${port}/users`,
};

// server.use(cors(corsOptions));
server.use(cors());
server.use(express.json());

server.get('/users', userController.getAllUsers);

server.get(
  '/users/:index',
  userController.checkUserInArray,
  userController.getOneUser
);

server.post('/users', userController.checkUserExists, userController.newUser);

server.delete(
  '/users/:index',
  userController.checkUserInArray,
  userController.deleteUser
);

server.listen(port, () => {
  console.log(`Access server: ${host}${port}`);
});
