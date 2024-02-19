import React, { useEffect, useState } from "react";
import "../style.css";
import CircleLoader from "react-spinners/CircleLoader";
import Question from "../components/Question";

const Quiz = ({ name, questions, score, setScore }) => {
  const [options, setOptions] = useState([]);
  const [questNr, setQuestNr] = useState(0);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    //console.log(questions);
    if (questions.length > 0 && questNr < questions.length) {
      const currentQuestion = questions[questNr];
      const options = [
        currentQuestion?.correct_answer,
        ...currentQuestion?.incorrect_answers,
      ];
      const shuffledOptions = handleShuffle(options);
      setOptions(shuffledOptions);
      setCategory(currentQuestion.category);
      setDifficulty(currentQuestion.difficulty);
      //console.log(category);
      //console.log(difficulty);
    }
  }, [questions, questNr]);

  //console.log(options);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="greeting">Welcome, {name}</span>

      {questions.length > 0 && questNr < questions.length ? (
        <>
          <div className="quizInfo">
            <span>{questions[questNr].category}</span>
            <span>{questions[questNr].difficulty}</span>
            <span>Score: {score}</span>
          </div>
          <Question
            questNr={questNr}
            setQuestNr={setQuestNr}
            questions={questions}
            options={options}
            correct={questions[questNr]?.correct_answer}
            score={score}
            setScore={setScore}
            difficulty={difficulty}
            category={category}
          />
        </>
      ) : (
        <>
          <p className="spinnerText">Loading...</p>
          <CircleLoader className="spinner" color="#36d7b7" size={71} />
        </>
      )}
    </div>
  );
};

export default Quiz;
