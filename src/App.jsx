import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./components/Result";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home name={name} setName={setName} fetchQuestions={fetchQuestions} />
        }
      />
      <Route
        path="/quiz"
        element={
          <Quiz
            questions={questions}
            name={name}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        }
      />
      <Route
        path="/result"
        element={<Result score={score} name={name} setScore={setScore} />}
      />
    </Routes>
  );
}

export default App;
