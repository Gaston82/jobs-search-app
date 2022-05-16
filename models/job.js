const { Schema, model } = require("mongoose");

const JobSchema = Schema({
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
});

module.exports = model("Job", JobSchema);
