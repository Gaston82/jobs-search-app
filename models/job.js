const { Schema, model } = require("mongoose");

const JobSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  salary: {
    type: Number,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

JobSchema.methods.toJSON = function () {
  const { __v, _id, status, user, ...data } = this.toObject();
  //Ahora cada vez que cree un usuario aparecerá con uid en lugar de _id
  data.uid = _id;
  return data;
};

module.exports = model("Job", JobSchema);
