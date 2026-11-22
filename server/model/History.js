const mongoose = require("mongoose");

const History = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    wrong: { type: Number, required: true },
    unattempted: { type: Number, required: true },
    results: [
      {
        question: String,
        selectedAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("History", History);
