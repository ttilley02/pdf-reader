import React, { useState, useEffect, useRef } from "react";
import Tester from "./Tester";
import "./App.css";

const Epub = () => {
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chatperSelected, setChatperSelected] = useState(false);
  const [chapterDetail, setChapterDetail] = useState([""]);
  const [book, setBook] = useState(null);
  const [cover, setCover] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [paragraphIdx, setParagraphIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [paraInputValue, setParaInputValue] = useState([]);
  const [highlightedCharacters, setHighlightedCharacters] = useState("");
  const [wrongCharacters, setWrongCharacters] = useState("");
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [related, setRelated] = useState([{ extract: "" }]);
  const [error, setError] = useState("");
  const [random, setRandom] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [currentWordHighlight, setCurrentWordHighlight] = useState(0);
  const [wordsMaster, setWordsMaster] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [accuracy, setAccuracy] = useState(0);

  // const reset = () => {
  //   setParagraphIdx(0);
  //   setCurrentWordIndex(0);
  //   setInputValue("");
  //   setParaInputValue([]);
  //   setHighlightedCharacters("");
  // };

  // const getSubitems = (a, res = []) => {
  //   const result = [];
  //   console.log("this is a ", a);
  //   function processSubitems(obj) {
  //     if (Array.isArray(obj)) {
  //       obj.forEach((item) => {
  //         processSubitems(item);
  //       });
  //     } else if (typeof obj === "object" && obj !== null) {
  //       if (obj.hasOwnProperty("subitems")) {
  //         if (obj.subitems.length === 0) {
  //           result.push(obj);
  //         } else {
  //           processSubitems(obj.subitems);
  //         }
  //       }
  //     }
  //   }

  //   processSubitems(a);

  //   return result;
  // };

  // const uploadEPUB = (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = async (event) => {
  //       const fileData = event.target.result;
  //       const book = ePub(fileData);

  //       book.ready.then(async () => {
  //         console.log("book here ", book);
  //         // const rendition = book.renderTo("viewer", {
  //         //   width: "100%",
  //         //   height: "600px",
  //         // });
  //         // await rendition.display();
  //         const chaps = getSubitems(book.navigation.toc);
  //         setChapters(chaps);
  //         setBook(book);
  //         setCover(await book.coverUrl());
  //       });
  //     };

  //     reader.onerror = (event) => {
  //       console.error("Error reading file:", event.target.error);
  //     };

  //     reader.readAsArrayBuffer(file);
  //   } else {
  //     alert("Please select an EPUB file.");
  //   }
  // };

  // const getChapter = async (idx) => {
  //   reset();
  //   let href = chapters[idx].href.replace(/#.*/, "");
  //   book.load(href).then(function (content) {
  //     let temp = [];
  //     const paragraphs = content.body.querySelectorAll("p");
  //     if (paragraphs.length > 0) {
  //       for (let p of paragraphs) {
  //         temp.push(p.innerHTML);
  //       }
  //     } else {
  //       temp = [" "];
  //     }

  //     setChapterDetail(temp);
  //     setCurrentChapter(idx);
  //     setChatperSelected(true);
  //   });
  // };

  // const words = chapterDetail[paragraphIdx]
  //   .replace(/<span[^>]*>(.*?)<\/span>/g, "$1")
  //   .replace(/<em[^>]*>(.*?)<\/em>/g, "$1")
  //   .replace("–", "-")
  //   .replace("–", "-")
  //   .replace("—", "-")
  //   .split(/[\n\s]+/);

  // console.log(
  //   "ssssss ",
  //   chapterDetail[paragraphIdx]
  //     .replace(/<span[^>]*>(.*?)<\/span>/g, "$1")
  //     .replace(/<em[^>]*>(.*?)<\/em>/g, "$1")
  //     .replace("–", "-")
  //     .replace("–", "-")
  //     .replace("—", "-")
  //     .split(/[\n\s]+/)
  // );
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  // Test the letters for each word
  const words = related[random].extract.split(" ");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setWordsMaster(value);
    setInputValue(value);
    const currentWord = words[currentWordIndex];
    const typedWord = value.trim();
    for (let i = 0; i < typedWord.length; i++) {
      if (currentWord[i] === typedWord[i]) {
        setHighlightedCharacters(typedWord[i]);
      } else {
      }
    }
  };

  // accuracy
  useEffect(() => {
    const calculateAccuracy = () => {
      let correctCount = 0;
      for (let i = 0; i < related[random].extract.length; i++) {
        if (wordsMaster[i] === related[random].extract[i]) {
          correctCount++;
        }
      }
      const accuracyPercentage =
        (correctCount / related[random].extract.length) * 100;
      setAccuracy(accuracyPercentage.toFixed(2));
    };
    if (wordsMaster.length === related[random].extract.length && !endTime) {
      setEndTime(Date.now());
    }
    calculateAccuracy();
  }, [endTime, random, related, wordsMaster]);

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
    const correctText = related[random].extract;
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
    // if (inputText.length > correctText.length) {
    //   console.log("woah");
    //   const extraChars = inputText.slice(correctText.length);
    //   for (let i = 0; i < extraChars.length; i++) {
    //     highlightedChars.push(
    //       <span key={correctText.length + i} style={{ color: "red" }}>
    //         {extraChars[i]}
    //       </span>
    //     );
    //   }
    // }
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
      <div>Accuracy: {accuracy}%</div>
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
          disabled={isTestComplete}
          autoFocus
          style={{ width: "25%", height: "25px", marginTop: "15px" }}
        />
      </div>
      {/* <Tester text={related && related[random].extract} /> */}
    </>
  );
};

export default Epub;
