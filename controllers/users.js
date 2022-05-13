const { response } = require("express");

const usersGet = (req, res = response) => {
  res.json({
    msg: "get API",
  });
};

const usersPost = (req, res = response) => {
  res.json({
    msg: "post API",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "get API",
  });
};

const usersPut = (req, res = response) => {
  res.json({
    msg: "get API",
  });
};

module.exports = {
  usersDelete,
  usersGet,
  usersPost,
  usersPut,
};
