import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Html5Entities } from "html-entities";

const entities = new Html5Entities();

const Question = ({
  score,
  setScore,
  questions,
  correct,
  options,
  questNr,
  setQuestNr,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const navigate = useNavigate();

  const handleNext = () => {
    if (questNr > 8) {
      navigate("/result");
    } else if (selected) {
      setQuestNr(questNr + 1);
      setSelected();
    } else {
      setError("Please select an option!");
    }
  };

  const handleQuit = () => {
    setScore(0);
    navigate("/");
  };

  return (
    <div className="question">
      <h1>Question {questNr + 1}</h1>
      <div className="singleQuestion">
        {questions.length > 0 && questNr < questions.length && (
          <>
            <h2>{entities.decode(questions[questNr].question)}</h2>
            <div className="options">
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {options.map((i) => (
                <button
                  onClick={() => handleCheck(i)}
                  className={`singleOption ${selected && handleSelect(i)}`}
                  key={i}
                  disabled={selected}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="controls">
              <button className="quit" onClick={handleQuit}>
                QUIT
              </button>
              <button className="next" onClick={handleNext}>
                NEXT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Question;
