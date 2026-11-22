import { QuestionCard } from "./QuestionCard";
import { useForm } from "react-hook-form";
import { Timer } from "./Timer";
import { verifyResultFromServer } from "../../services/testLinkServices";
import { useNavigate } from "react-router-dom";

export const TestQuestions = ({ Questions, setTestResult }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await verifyResultFromServer(data);
    setTestResult(result);
    navigate("/test/result");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Online Test</h1>
            <p className="text-sm text-gray-500 mt-1">
              Answer all the questions carefully.
            </p>
          </div>

          <div className="border rounded-lg px-4 py-2 bg-white">
            <p className="text-sm text-gray-500">Time Remaining</p>
            <Timer onTimeUp={handleSubmit(onSubmit)} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-2xl border rounded-lg p-6 shadow-sm space-y-5 bg-white"
          >
            {Questions?.map((question, index) => (
              <QuestionCard
                question={question}
                index={index + 1}
                register={register}
              />
            ))}

            <div className="flex justify-end mt-8">
              <button className="bg-blue-400 text-white px-6 py-2 rounded-sm">
                Submit Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
