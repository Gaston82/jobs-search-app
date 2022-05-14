const { Schema, model } = require("mongoose");

const RolSchema = Schema({
  role: {
    type: String,
    required: [true, " rol is mandatory"],
  },
});

module.exports = model("Rol", RolSchema);
