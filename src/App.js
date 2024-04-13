import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const TypingTest = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [related, setRelated] = useState([{ extract: "" }]);
  const [testStarted, setTestStarted] = useState(false);
  const [wordsMaster, setWordsMaster] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [accuracy, setAccuracy] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setWordsMaster(value);
    setInputValue(value);
  };

  // cursor
  useEffect(() => {
    const firstSpan = document.getElementsByClassName("notTyped");
    if (firstSpan.length > 0) {
      Array.from(firstSpan).forEach((element) =>
        element.classList.remove("pulsating-cursor")
      );
      firstSpan[0].classList.add("pulsating-cursor");
    }
  });

  // regarding the shuffle before the highlighting
  // currently setting random zero and never changing it.  In the
  // meantime, using an array shuffler instead so that idx 0 is
  // is never null, avoiding render error.  Later on will make a button
  // that will change the idx dynamically instead of shuffling

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index between 0 and i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
    }
    return array;
  };

  const highlightText = () => {
    const correctText = related[0].extract;
    const inputText = wordsMaster;
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
            <span key={i} className="typed wrong">
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
    return highlightedChars;
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRelatedSearch = () => {
    const randomIdx = Math.floor(Math.random() * related.length);
    setSearchQuery("");
    fetchWikipediaSummary(related[randomIdx].title.trim());
  };

  const fetchWikipediaSummary = async (query) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/related/${query}`
      );

      if (!response.ok) {
        throw new Error("Error: Unable to fetch data");
      }
      setSearchQuery("");
      const data = await response.json();
      setRelated(shuffleArray(data.pages));
    } catch (error) {
      setRelated([{ extract: "Nothing found try again..." }]);
    }
  };

  const startTest = () => {
    setTestStarted(!testStarted);
    const userInput = document.getElementById("userInput");
    userInput.focus();
  };

  return (
    <>
      <h1>WikiType</h1>
      <div className="wiki">
        <input
          className="searchInput"
          type="text"
          placeholder="Type a new topic..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="buttonGroup">
          {related[0].extract === "" ||
          related[0].extract === "Nothing found try again..." ? (
            <button
              className="search"
              onClick={() => {
                fetchWikipediaSummary(searchQuery);
              }}
            >
              SEARCH
            </button>
          ) : (
            <>
              <button className="search related" onClick={handleRelatedSearch}>
                RELATED
              </button>
              <button
                className="search new"
                onClick={() => {
                  fetchWikipediaSummary(searchQuery);
                }}
              >
                NEW
              </button>
            </>
          )}
        </div>
      </div>
      <div className="writer">
        <div id="letter-container" className="area">
          {highlightText()}
        </div>
        <button className="startButton" onClick={startTest}>
          START
        </button>
        <textarea
          id="userInput"
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
          style={{ width: "25%", height: "25px", marginTop: "15px" }}
        />
      </div>
    </>
  );
};

export default TypingTest;
