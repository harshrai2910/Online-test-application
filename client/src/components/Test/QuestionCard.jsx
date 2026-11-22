export const QuestionCard = ({ question, index, register }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-5">
        {index}. {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              {...register(question._id)}
              name={question._id}
              value={option}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </>
  );
};
