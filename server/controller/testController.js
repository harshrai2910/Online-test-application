const Questions = require("../model/Questions");
const History = require("../model/History");

exports.sendQuestions = async (req, res, _) => {
  try {
    const questions = await Questions.find().select("question options subject");
    res.json(questions);
  } catch (err) {
    res.json({ error: "Error while fetching questions" });
  }
};

exports.verifyResult = async (req, res, next) => {
  const data = req.body;
  const correctAns = await Questions.find().select("question correctAnswer");
  let totalQuestions = 0;
  let score = 0;
  let unattempted = 0;
  const results = [];
  Object.entries(data).forEach(([questionId, selectedAnswer]) => {
    const q = correctAns.find((q) => q._id.toString() == questionId);

    const isCorrect = selectedAnswer === q.correctAnswer;
    let attemptedResult = {
      question: q.question,
      selectedAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
    };

    if (isCorrect) score++;
    if (selectedAnswer === null) unattempted++;

    results.push(attemptedResult);

    totalQuestions++;
  });

  const historyOfQuestion = new History({
    userId: req.session.user.userId,
    score,
    totalQuestions,
    wrong: totalQuestions - score - unattempted,
    unattempted,
    results,
  });

  await historyOfQuestion.save();

  res.json({ totalQuestions, score, results, unattempted });
};

exports.testHistory = async (req, res, next) => {
  const id = req.session.user.userId;

  const userHistory = await History.find({ userId: id });

  res.json(userHistory);
};
