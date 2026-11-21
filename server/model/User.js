const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
});

module.exports = mongoose.model("User", User);
