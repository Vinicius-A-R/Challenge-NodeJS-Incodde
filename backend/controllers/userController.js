const User = require('../models/User');
const mongoose = require('mongoose');

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
  const { index } = req.params;
  const user = await User.findOne(index);
  // const user = User.findById(index);

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
  const { id } = req.params;
  const user = await User.findById(id);

  return res.json(user);
};

const newUser = async (req, res) => {
  const { username, email } = req.body;

  const newUser = {
    username: username,
    email: email,
  };

  const user = await User.create(newUser);

  return res.json(user);
};

const changeUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  let userEdit = {};

  let user = await User.findById(id);

  if (!user) {
    return res.status(400).send({ error: 'User does not exists!' });
  }
  if (email !== '' && username !== '') {
    userEdit = {
      username,
      email,
    };

    user = await User.findByIdAndUpdate(user, userEdit, {
      new: true,
    });
  } else {
    if (email === '') {
      userEdit = {
        username,
      };

      user = await User.findByIdAndUpdate(user, userEdit, {
        new: true,
      });
    }

    if (username === '') {
      userEdit = {
        email,
      };

      user = await User.findByIdAndUpdate(user, userEdit, {
        new: true,
      });
    }
  }

  return res.status(204).send({ message: 'User or email was chenged!' });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(400).send({ error: 'User does not exists!' });
  }

  // users.splice(id, 1);
  await User.findByIdAndDelete(id);

  return res.status(204).send({ message: 'User was deleted' });
};

module.exports = {
  getAllUsers,
  getOneUser,
  newUser,
  changeUser,
  deleteUser,
  checkUserExists,
  checkUserInArray,
};
