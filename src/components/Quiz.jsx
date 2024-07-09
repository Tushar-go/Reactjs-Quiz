import React, { useEffect, useState } from 'react';
import Question from './Questions';


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showScore, setShowScore] = useState(false);
    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          let randomNumber = Math.floor(Math.random() * 32) + 1;
          const response = await fetch(`https://opentdb.com/api.php?amount=8&category=${randomNumber}&difficulty=easy&type=multiple`);
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
  
          let questionDB = data.results.map((item) => ({
            question: item.question,
            options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
            answer: item.correct_answer,
          }));
  
          setQuestions(questionDB);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
  
      fetchQuestions();
    }, [setScore]);
  
    const handleAnswer = (option) => {
      setSelectedAnswer(option);
      if (option === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    };
  
    const handleNextQuestion = () => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    };
  
    const resetQuiz = () => {
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowScore(false);
      
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen">
        {showScore ? (
          <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold">Your Score</h2>
            <p className="text-xl">{score} out of {questions.length}</p>
            <button onClick={resetQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Restart Quiz
            </button>
          </div>
        ) : questions.length > 0 ? (
          <Question
            key={currentQuestion} 
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            selectedAnswer={selectedAnswer}
            correctAnswer={questions[currentQuestion].answer}
            handleAnswer={handleAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        ) : (
          <p className=' text-3xl font-semibold' >Loading...</p>  
        )}
      </div>
    );
  };
  
  export default Quiz;