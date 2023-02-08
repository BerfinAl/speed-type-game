import React, { useState, useEffect, useRef } from "react";
import checkWord from "check-if-word"
import "./App.css";

function App() {
  const COUNTDOWN_TIME = 5;
  const words = checkWord('en');


  const [wordCount, setWordCount] = useState(0);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(COUNTDOWN_TIME);
  const [isGameStart, setIsGameStart] = useState(false);
  const textareaRef = useRef(null);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function countWords(text) {
    const wordsArr = text.split(" ").filter((word) => word !== "");
    const realWords = words.getValidWords([...wordsArr])
    setWordCount(realWords.length);
  }

  function startGame() {
    setIsGameStart(true);
    setInput("");
    setTimer(COUNTDOWN_TIME);
  }

  function endGame() {
    setIsGameStart(false);
    countWords(input);
  }

  useEffect(() => {
    if (isGameStart && timer > 0) {
      textareaRef.current.focus();
      setTimeout(() => {
        setTimer((prevState) => (prevState = prevState - 1));
      }, 1000);
    }
    if (timer === 0) {
      endGame();
    }
  }, [timer, isGameStart]);

  return (
    <div className="container">
      <h1>How fast can you type?</h1>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => handleChange(e)}
        disabled={!isGameStart}
      />
      <h4> Time remaining: {timer} </h4>
      <button onClick={startGame} disabled={isGameStart}>
        start
      </button>
      {timer === 0 && <h1>Word Count: {wordCount} </h1>}
    </div>
  );
}

export default App;
