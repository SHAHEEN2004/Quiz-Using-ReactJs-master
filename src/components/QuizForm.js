import React, { useState } from 'react';
import './QuizForm.css'
import {  useNavigate } from 'react-router-dom';

function QuizForm() {
  const [numQuestions, setNumQuestions] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };
function quizquestion(){
    navigate('/quiz')
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="numQuestions">Number of Questions:</label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          required
        />

        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        >
          <option value="">--Select Difficulty--</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>

        <button onClick={quizquestion} type="submit">Generate Quiz</button>
      </form>
    </div>
  );
}

export default QuizForm;
