const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  desc: String,
  progress: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Project", projectSchema);