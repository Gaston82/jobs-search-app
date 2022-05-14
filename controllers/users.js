const { response } = require("express");
const bcryptjs = require("bcryptjs");

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

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  const deleteUser = await User.findByIdAndUpdate(id, { status: false });
  res.json({
    deleteUser,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...data } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data);
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
