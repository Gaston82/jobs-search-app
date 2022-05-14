const Role = require("../models/role");

const doesRoleValid = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

//Verificar si el correo existe

const doesEmailExist = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

module.exports = {
  doesRoleValid,
  doesEmailExist,
};
