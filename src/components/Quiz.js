import React, { useState, useEffect } from 'react';
import './Quiz.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => setQuestions(data.results));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer(answer);
  };

  const isCorrectAnswer = (answer) => {
    return answer === currentQuestion.correct_answer;
  };

  const hasSelectedAnswer = selectedAnswer !== null;

  const getAnswerClass = (answer) => {
    if (!hasSelectedAnswer) {
      return '';
    }
    if (answer === currentQuestion.correct_answer) {
      return 'correct';
    }
    if (answer === selectedAnswer) {
      return 'incorrect';
    }
    return '';
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowScore(false);
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <h1>Quiz App</h1>
      {showScore ? (
        <div className="score-container">
          <h2>Your Score: {score}</h2>
          <button className="play-again-btn" onClick={handlePlayAgain}>Play Again</button>
        </div>
      ) : (
        <div className="question-container">
          <h3>{currentQuestion.question}</h3>
          <ul>
            {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort().map((option) => (
              <li
                key={option}
                className={`option ${getAnswerClass(option)}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          {hasSelectedAnswer && (
            <button className="next-question-btn" onClick={handleNextQuestion}>Next Question</button>
          )}
        </div>
      )}
      <button className="score-display">Score: {score} / {questions.length}</button>
    </div>
  );
  
}
export default Quiz;