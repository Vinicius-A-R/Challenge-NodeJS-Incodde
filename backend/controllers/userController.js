const users = require('../database/index');
const User = require('../models/User');

const checkUserExists = async (req, res, next) => {
  //check if there is anything inside the body
  if (!req.body.username || !req.body.email) {
    return res.status(400).send({ error: 'User and email is required!' });
  }

  const { name, email } = req.body;

  const checkName = await User.findOne({ username: name });
  const checkEmail = await User.findOne({ email: email });

  if (checkName || checkEmail) {
    return res.status(400).send({ error: 'User or email already exists!' });
  }

  return next();
};

const checkUserInArray = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne(id);
  // const user = User.findById(id);

  if (!user) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  return next();
};

const getAllUsers = async (req, res) => {
  const users = await User.find();

  return res.json(users);
};

const getOneUser = async (req, res) => {
  const { index } = req.params;
  const user = await User.findById(index);

  return res.json(user);
};

const newUser = async (req, res) => {
  const { username, email } = req.body;

  const newUser = {};
  newUser.username = username;
  newUser.email = email;

  const user = await User.create(newUser);

  return res.json(user);
};

const deleteUser = async (req, res) => {
  const { index } = req.params;
  const user = await User.findById(index);

  if (!user) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  // users.splice(index, 1);
  await User.findByIdAndDelete(index);

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
