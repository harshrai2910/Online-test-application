import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex flex-col mt-20 items-center justify-center px-6 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
        Online - TestNeck
      </h1>

      <p className="mt-5 max-w-lg text-sm md:text-lg text-gray-500">
        Test your knowledge, challenge yourself, and track your progress through
        interactive online assessments.
      </p>

      <Link
        to="/login"
        className="mt-8 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Get Started →
      </Link>
    </div>
  );
};
