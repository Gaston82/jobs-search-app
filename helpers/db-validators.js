const User = require("../models/user");
const Rol = require("../models/role");

const doesRoleValid = async (role = "") => {
  const existeRol = await Rol.findOne({ role });
  if (!existeRol) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

//Verificar si el correo existe po el id

const doesUserExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`User with id:  ${id} doesn't exist`);
  }
};

const doesEmailExist = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`Email ${email} already exist`);
  }
};

module.exports = {
  doesRoleValid,
  doesEmailExist,
  doesUserExistById,
};
