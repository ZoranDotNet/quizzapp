import React, { useState } from "react";
import "../style.css";
import Categories from "../data/categories.js";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage.jsx";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };

  return (
    <div className="home-container">
      <div className="home-title">
        <h1>QUIZ APP</h1>
      </div>
      <div className="home-input">
        <h5>Enter Your Name</h5>
        {error && <ErrorMessage>Please fill in all the fields!</ErrorMessage>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="home-settings">
          <select
            type="text"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Select category">-- Select a Category --</option>
            {Categories.map((cat) => (
              <option key={cat.category} value={cat.value}>
                {cat.category}
              </option>
            ))}
          </select>

          <select
            type="text"
            name="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <option value="Select Difficulty">-- Select Difficulty --</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="button" onClick={handleSubmit}>
          START QUIZ
        </button>
      </div>
    </div>
  );
};

export default Home;
