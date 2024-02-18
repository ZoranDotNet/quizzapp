import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ score, name, setScore }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
  }, [name]);

  const handleBack = () => {
    setScore(0);
    navigate("/");
  };

  return (
    <div className="result">
      <span className="resultTitle">
        Final Score: {score} ({(score / 10) * 100}%)
      </span>
      <button onClick={handleBack}>Home</button>
    </div>
  );
};

export default Result;
