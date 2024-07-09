import React from 'react';

const Questions = ({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  handleAnswer,
  handleNextQuestion,
}) => {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">{question}</h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`block w-full  text-left px-4 py-2 border rounded ${
              selectedAnswer
                ? option === correctAnswer
                  ? 'bg-green-200'
                  : option === selectedAnswer
                  ? 'bg-red-200'
                  : 'hover:bg-blue-100'
                : 'hover:bg-blue-100'
            }`}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      <div className=' flex flex-row justify-center font-medium'>

      {selectedAnswer && (
        <button
          onClick={handleNextQuestion}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
        >
          Next
        </button>
      )}
      </div>
    </div>
  );
};

export default Questions;
