import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = ({ score, name, setScore }) => {
  const navigate = useNavigate();
  const [highScores, setHighScores] = useState([]);

  const location = useLocation();
  const category = location.state.category;
  const difficulty = location.state.difficulty;

  //console.log("Category:", category);
  //console.log("Difficulty:", difficulty);

  const handleBack = () => {
    setScore(0);
    navigate("/");
  };

  useEffect(() => {
    const newScore = {
      name: name,
      score: score,
      category: category,
      difficulty: difficulty,
    };

    const storedScores = JSON.parse(localStorage.getItem("highScores")) || [];
    storedScores.push(newScore);
    storedScores.sort((a, b) => b.score - a.score);
    const updatedHighScores = storedScores.slice(0, 5);
    localStorage.setItem("highScores", JSON.stringify(updatedHighScores));
    setHighScores(updatedHighScores);
  }, [name, score, category, difficulty]);

  return (
    <div className="result">
      <span className="result-title">
        Your Score: {score} ({(score / 10) * 100}%)
      </span>

      <div className="highScores">
        <h3>High Scores</h3>
        <p>Name - Category - Difficulty - Score</p>
        <div className="highscoreList">
          <ul>
            {highScores.map((score, index) => (
              <li key={index}>
                <span className="resultName">{score.name}</span>
                <span className="resultCategory">{score.category}</span>
                <span className="resultDifficulty">{score.difficulty}</span>
                <span className="resultScore">{score.score}</span>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={handleBack}>Home</button>
    </div>
  );
};

export default Result;
