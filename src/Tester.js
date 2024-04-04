import React, { useState, useEffect } from "react";
import "./App.css";

const Tester = ({ text = "" }) => {
  const [inputText, setInputText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  // const [wpm, setWpm] = useState(0);
  const correctText = "its john cena";
  const correctWordsCount = correctText.trim().split(/\s+/).length;

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    if (!startTime) {
      setStartTime(Date.now());
    }

    const inputWords = newText.trim().split(/\s+/);

    let correctWordsTyped = 0;
    for (let i = 0; i < correctWordsCount; i++) {
      if (inputWords[i] === correctText.split(/\s+/)[i]) {
        correctWordsTyped++;
      }
    }
    if (
      correctWordsTyped === correctWordsCount ||
      (inputText.split(/\s+/).length - 1 === correctWordsCount && !endTime)
    ) {
      setEndTime(Date.now());
      alert("its ova baby");
    }
  };

  // accuracy
  useEffect(() => {
    const calculateAccuracy = () => {
      let correctCount = 0;
      for (let i = 0; i < correctText.length; i++) {
        if (inputText[i] === correctText[i]) {
          correctCount++;
        }
      }
      const accuracyPercentage = (correctCount / correctText.length) * 100;
      setAccuracy(accuracyPercentage.toFixed(2));
    };
    if (inputText.length === correctText.length && !endTime) {
      setEndTime(Date.now());
    }
    calculateAccuracy();
  }, [correctText, inputText, endTime]);

  // words per min
  // useEffect(() => {
  //   if (endTime && startTime) {
  //     const timeDiffInSeconds = (endTime - startTime) / 1000;
  //     let correctWords = 0;
  //     const inputWords = inputText.trim().split(/\s+/);
  //     for (let i = 0; i < inputWords.length; i++) {
  //       if (inputWords[i] === correctText.split(/\s+/)[i]) {
  //         correctWords++;
  //       }
  //     }
  //     const cwpmValue = Math.round((correctWords / timeDiffInSeconds) * 60);
  //     console.log("Time taken:", timeDiffInSeconds.toFixed(2), "seconds");
  //     setWpm(cwpmValue);
  //   }
  // }, [endTime, startTime, inputText, correctText]);

  const startTest = () => {
    const userInput = document.getElementById("userInput");
    userInput.focus();
  };

  const highlightText = () => {
    const highlightedChars = [];
    for (let i = 0; i < correctText.length; i++) {
      let char = correctText[i];
      if (i < inputText.length) {
        if (inputText[i] === char) {
          highlightedChars.push(
            <span key={i} className="typed">
              {char}
            </span>
          );
        } else {
          highlightedChars.push(
            <span key={i} className="wrong">
              {inputText[i]}
            </span>
          );
        }
      } else {
        highlightedChars.push(
          <span key={i} className="notTyped">
            {char}
          </span>
        );
      }
    }
    if (inputText.length > correctText.length) {
      const extraChars = inputText.slice(correctText.length);
      for (let i = 0; i < extraChars.length; i++) {
        highlightedChars.push(
          <span key={correctText.length + i} style={{ color: "red" }}>
            {extraChars[i]}
          </span>
        );
      }
    }
    return highlightedChars;
  };

  return (
    <div className="writer">
      <div className="area ">
        {highlightText()}
        {/* <div>Accuracy: {accuracy}%</div> */}
        {/* <div>Words per minute: {wpm}</div> */}
        <br />
        <input type="text" value={inputText} onChange={handleInputChange} />
      </div>
      <div>
        <button className="startButton" onClick={startTest} />
      </div>
    </div>
  );
};

export default Tester;
