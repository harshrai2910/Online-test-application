const mongoose = require("mongoose");

const Questions = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [String],
    correctAnswer: { type: String },
    subject: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Questions", Questions);
