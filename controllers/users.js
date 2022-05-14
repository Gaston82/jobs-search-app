const bcryptjs = require("bcryptjs");
const { response } = require("express");

const User = require("../models/user");

const usersGet = (req, res = response) => {
  const { name, api_key } = req.query;
  res.json({
    msg: "get API",
    name,
    api_key,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, role, password } = req.body;
  const user = new User({ name, email, role, password });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  res.json({
    msg: "post API",
    user,
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "get API",
  });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API",
    id,
  });
};

module.exports = {
  usersDelete,
  usersGet,
  usersPost,
  usersPut,
};
