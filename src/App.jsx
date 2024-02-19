import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./components/Result";
import { useState } from "react";
import axios from "axios";
import "./style.css";
import { decode } from "html-entities";
import Footer from "./components/Footer";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=10${
          category && `&category=${category}`
        }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
      );

      const decodedQuestions = data.results.map((question) => ({
        ...question,
        question: decode(question.question),

        correct_answer: decode(question.correct_answer),

        incorrect_answers: question.incorrect_answers.map((answer) =>
          decode(answer)
        ),
      }));

      setQuestions(decodedQuestions);
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
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
      <Footer />
    </>
  );
}

export default App;
