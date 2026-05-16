const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  desc: String,
  status: String,
  due: String,
  assignee: String,
  project: String,
});

module.exports = mongoose.model("Task", taskSchema);