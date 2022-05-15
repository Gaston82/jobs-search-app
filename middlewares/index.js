const checkFields = require("../middlewares/check-fields");
const checkJWT = require("../middlewares/check-jwt");
const checkRols = require("../middlewares/check-rols");

module.exports = {
  ...checkRols,
  ...checkFields,
  ...checkJWT,
};
