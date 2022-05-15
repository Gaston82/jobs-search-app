const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Request need a token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    //Verificamos usuario null
    if (!user) {
      return res.status(401).json({
        msg: " Invalid Token",
      });
    }

    //Verificar si el uid tienen estado true
    if (!user.status) {
      return res.status(401).json({
        msg: " Invalid Token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
};

module.exports = {
  checkJWT,
};
