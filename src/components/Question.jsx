import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

const Question = ({
  score,
  setScore,
  questions,
  correct,
  options,
  questNr,
  setQuestNr,
  category,
  difficulty,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [stop, setStop] = useState(false);
  const [timer, setTimer] = useState(30);

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
      navigate("/result", {
        state: { category: category, difficulty: difficulty },
      });
    } else if (selected || timer === 0) {
      setQuestNr(questNr + 1);
      setSelected("");
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
      <div className="question-timer">
        <h2>Question {questNr + 1}</h2>
        <h3 className="timer">
          <Timer
            timer={timer}
            setTimer={setTimer}
            setStop={setStop}
            questNr={questNr}
          />
        </h3>
      </div>
      <div className="singleQuestion">
        {questions.length > 0 && questNr < questions.length && (
          <>
            {stop ? (
              <h2 className="outOfTime">Out of Time!</h2>
            ) : (
              <h2>{questions[questNr].question}</h2>
            )}
            <div className="options">
              {error && timer > 0 && <ErrorMessage>{error}</ErrorMessage>}
              {options.map((i) => (
                <button
                  onClick={() => handleCheck(i)}
                  className={`singleOption ${selected && handleSelect(i)}`}
                  key={i}
                  disabled={stop || selected}
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
