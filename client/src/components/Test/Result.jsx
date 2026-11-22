export const Result = ({ TestResult }) => {
  const { totalQuestions, score, unattempted, results } = TestResult;

  const wrong = totalQuestions - score - unattempted;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Result Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Test Completed!</h1>

          <p className="text-5xl font-bold text-blue-600 my-5">
            {score}/{totalQuestions}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-2xl font-semibold text-green-600">{score}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-2xl font-semibold text-red-600">{wrong}</p>
              <p className="text-sm text-gray-600">Wrong</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-2xl font-semibold text-yellow-600">
                {unattempted}
              </p>
              <p className="text-sm text-gray-600">Unattempted</p>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Question Review</h2>

          {results?.map((item, index) => (
            <div
              key={index}
              className={`bg-white border rounded-lg p-5 shadow-sm`}
            >
              <div className="flex justify-between gap-3 mb-4">
                <h3 className="font-semibold text-gray-800">
                  Q{index + 1}. {item.question}
                </h3>

                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    item.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  Your Answer:
                  <span className="font-medium text-gray-800">
                    {item.selectedAnswer || "Not Attempted"}
                  </span>
                </p>

                <p className="text-gray-600">
                  Correct Answer:
                  <span className="font-medium text-green-600">
                    {item.correctAnswer}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
