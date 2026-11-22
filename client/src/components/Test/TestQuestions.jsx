import { QuestionCard } from "./QuestionCard";
import { useForm } from "react-hook-form";
import { Timer } from "./Timer";
import { verifyResultFromServer } from "../../services/testLinkServices";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const readSavedAnswers = () => {
  try {
    const saved = sessionStorage.getItem("selectedAnswers");
    return saved ? JSON.parse(saved) : {};
  } catch {
    sessionStorage.removeItem("selectedAnswers");
    return {};
  }
};

export const TestQuestions = ({ Questions, testStartTime, finishTest }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const submittedRef = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({ defaultValues: readSavedAnswers() });

  const onSubmit = async (data) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setError("");

    try {
      const result = await verifyResultFromServer(data);
      finishTest(result);
      navigate("/test/result", { replace: true });
    } catch (err) {
      console.error(err);
      submittedRef.current = false; // allow retry
      setError("Could not submit your test. Please try again.");
    }
  };

  useEffect(() => {
    const subscription = watch((data) => {
      if (submittedRef.current) return;
      sessionStorage.setItem("selectedAnswers", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  if (Questions.length === 0 && !submittedRef.current) {
    return <Navigate to="/test" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Online Test</h1>
            <p className="text-sm text-gray-500 mt-1">
              Answer all the questions carefully.
            </p>
          </div>

          <div className="border rounded-lg px-4 py-2 bg-white">
            <p className="text-sm text-gray-500">Time Remaining</p>
            <Timer
              onTimeUp={handleSubmit(onSubmit)}
              startTime={testStartTime}
              duration={600}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl border rounded-lg p-6 shadow-sm space-y-5 bg-white"
          >
            {Questions.map((question, index) => (
              <QuestionCard
                key={question._id}
                question={question}
                index={index + 1}
                register={register}
              />
            ))}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-400 text-white px-6 py-2 rounded-sm disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
