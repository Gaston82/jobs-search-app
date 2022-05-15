const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");
const {
  doesEmailExist,
  doesRoleValid,
  doesUserExistById,
} = require("../helpers/db-validators");
const { checkFields } = require("../middlewares/check-fields");
const { checkJWT } = require("../middlewares/check-jwt");
const { isAdminRol } = require("../middlewares/check-rols");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("password", "Password should have at least 6 characters").isLength({
      min: 6,
    }),
    check("email", "Email not valid").isEmail(),
    check("email").custom(doesEmailExist),
    //check("correo", "El correo no es válido").isEmail(),
    //check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(doesRoleValid),
    checkFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", " id not valid").isMongoId(),
    check("id").custom(doesUserExistById),
    check("role").custom(doesRoleValid),
    checkFields,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    checkJWT,
    isAdminRol,
    check("id", " id not valid").isMongoId(),
    check("id").custom(doesUserExistById),
    checkFields,
  ],
  usersDelete
);

module.exports = router;
