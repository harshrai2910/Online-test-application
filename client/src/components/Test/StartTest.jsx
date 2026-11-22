import { Link } from "react-router-dom";

export const StartTest = ({ handleStartTest }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <h1 className="text-2xl font-semibold">Ready to Start?</h1>
      <p className="text-gray-500">You have 10 minutes to complete the test.</p>

      <Link
        to="/test/questions"
        onClick={handleStartTest}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Start Test
      </Link>
    </div>
  );
};
