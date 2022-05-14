const { Router } = require("express");
const { check } = require("express-validator");

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");
const { doesEmailExist, doesRoleValid } = require("../helpers/db-validators");
const { checkFields } = require("../middlewares/check-fields");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("email", "Email not valid").isEmail(),
    check("password", "Password should have at least 6 characters").isLength({
      min: 6,
    }),
    check("name", "Name is mandatory").not().isEmpty(),
    check("email").custom(doesEmailExist),
    //check("correo", "El correo no es válido").isEmail(),
    //check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(doesRoleValid),
    checkFields,
  ],
  usersPost
);

router.put("/:id", usersPut);

router.delete("/", usersDelete);

module.exports = router;
