import React, { useState } from "react";

const TypingTest = ({ paragraphs = [" "] }) => {
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [typingErrors, setTypingErrors] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);

  // NOTES:
  // work on implementing the timer and the actual test metrics from TypingTest

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTypedText(value);
    const noNew = paragraphs[currentParagraphIndex].replace(/\n/g, "");
    if (value === noNew.trim()) {
      console.log("testing");
      console.log(currentParagraphIndex, paragraphs.length - 1);
      if (currentParagraphIndex === paragraphs.length - 1) {
        const endTime = new Date();
        const durationInSeconds = (endTime - startTime) / 1000;
        setIsTestComplete(true);
        alert(
          `Typing test completed!\nTime taken: ${durationInSeconds} seconds\nErrors: ${typingErrors}`
        );
      } else {
        setCurrentParagraphIndex(currentParagraphIndex + 1);
        setTypedText("");
      }
    } else if (
      value.length > 0 &&
      value[value.length - 1] !== " " &&
      value !== paragraphs[currentParagraphIndex].slice(0, value.length)
    ) {
      setTypingErrors(typingErrors + 1);
    }
  };

  const startTest = () => {
    setCurrentParagraphIndex(0);
    setTypedText("");
    setStartTime(new Date());
    setTypingErrors(0);
    setIsTestComplete(false);
  };

  const renderHighlightedText = (paragraph, typedText) => {
    return (
      <div>
        {paragraph.split("").map((char, index) => (
          <span key={index} style={{ color: getColor(char, typedText, index) }}>
            {char}
          </span>
        ))}
      </div>
    );
  };

  const getColor = (char, typedText, index) => {
    if (index >= typedText.length) return ""; // Default color
    return char === typedText[index] ? "green" : "red";
  };

  return (
    <div>
      <h1>Typing Test</h1>
      <div>
        {paragraphs.map((paragraph, index) => (
          <div
            key={index}
            style={{
              display: index === currentParagraphIndex ? "block" : "none",
            }}
          >
            {renderHighlightedText(paragraph, typedText)}
          </div>
        ))}
      </div>
      <textarea
        value={typedText}
        onChange={handleInputChange}
        disabled={isTestComplete}
        placeholder="Start typing here..."
        style={{ width: "100%", height: "100px", marginTop: "10px" }}
      />
      <button onClick={startTest} disabled={!isTestComplete}>
        Start Test
      </button>
    </div>
  );
};
// *******************************************************************************************

export default TypingTest;
