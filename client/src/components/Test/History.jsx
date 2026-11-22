import { useEffect, useState } from "react";
import { testHistoryFromServer } from "../../services/testLinkServices";

export const History = () => {
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    testHistoryFromServer()
      .then((data) => {
        setTestHistory(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Test History
          </h1>

          {testHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No test attempts found.
            </p>
          ) : (
            <div className="space-y-4">
              {testHistory.map((attempt) => (
                <div
                  key={attempt._id}
                  className="bg-white border rounded-xl p-5 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        Test Attempt
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(attempt.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {attempt.score}/{attempt.totalQuestions}
                      </p>
                      <p className="text-xs text-gray-500">Score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xl font-semibold text-green-600">
                        {attempt.score}
                      </p>
                      <p className="text-xs text-gray-600">Correct</p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xl font-semibold text-red-600">
                        {attempt.wrong}
                      </p>
                      <p className="text-xs text-gray-600">Wrong</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3">
                      <p className="text-xl font-semibold text-yellow-600">
                        {attempt.unattempted}
                      </p>
                      <p className="text-xs text-gray-600">Unattempted</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
