import React, { useState, useRef } from "react";
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
  const words = ["Bit", "stuff", "here"];
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  // Test the letters for each word
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

    // Test the word after each character

    if (value.endsWith(" ")) {
      let lastSubstring = value.trim();
      if (lastSubstring.includes(" ")) {
        lastSubstring = value.trim().split(" ").pop();
      }
      console.log(lastSubstring);
      if (lastSubstring.trim() === currentWord) {
        console.log("correct word");
        if (paraInputValue.length + 1 === words.length) {
          setParagraphIdx(paragraphIdx + 1);
          alert("next line");
          setParaInputValue([]);
          setCurrentWordIndex(0);
        } else {
          console.log("YUP");
          setParaInputValue([...paraInputValue, value.trim()]);
        }
      } else {
        console.log("NOPE");
        // Handle incorrect word here
      }
      if (currentWordIndex < words.length - 1)
        setCurrentWordIndex(currentWordIndex + 1);
      setHighlightedCharacters("");
    }
  };

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

  const highlightText = (idx = random) => {
    const correctText = related[idx].extract;
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
          <button className="search" onClick={handleRelatedSearch}>
            GO
          </button>
          <button
            className="search"
            onClick={() => {
              fetchWikipediaSummary(searchQuery);
            }}
          >
            NEW
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
      <div className="writer">
        <div className="area">{highlightText()}</div>
        <button className="startButton" onClick={startTest}></button>
        <textarea
          id="userInputs"
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
