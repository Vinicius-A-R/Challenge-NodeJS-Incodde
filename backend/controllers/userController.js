const users = require('../database/index');

function checkUserExists(req, res, next) {
  //check if there is anything inside the body
  if (!req.body.name && !req.body.email) {
    return res.status(400).send({ error: 'User and email is required!' });
  }

  const { name, email } = req.body;

  const checkName = users.filter((user) => user.name === name)[0];
  const checkEmail = users.filter((user) => user.email === email)[0];

  if (!checkName && !checkEmail) {
    return next();
  }

  return res.status(400).send({ error: 'User or email already exists!' });
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  console.log(user);
  if (!user) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  return next();
}

const getAllUsers = (req, res) => {
  return res.json(users);
};

const getOneUser = (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
};

const newUser = (req, res) => {
  const { name, email } = req.body;

  const id = Date.now();
  users.push({
    id,
    name,
    email,
  });

  return res.json(users);
};

const deleteUser = (req, res) => {
  const { index } = req.params;
  if (!users[index]) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  users.splice(index, 1);

  return res.status(204).send({ message: 'User was deleted' });
};

module.exports = {
  getAllUsers,
  getOneUser,
  newUser,
  deleteUser,
  checkUserExists,
  checkUserInArray,
};
