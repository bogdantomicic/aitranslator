import classNames from "classnames";
import { useState } from 'react'
import wordList from './englishWords.json';
import './App.css';
import { VoiceRecording } from "./components/VoiceRecording";
import { GoogleTranslate } from './components/GoogleTranslate';
import { Resources } from "./components/Resources";

// const GOOGLE_API_KEY = "AIzaSyCDSKkD5pZl7j40eIs2Tk5LzAV6vboXqZU";
const API_KEY = "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";



function App() {
 
  


  const localStorageLevel = localStorage.getItem('izabraniNivo');
  const localStorageTask = localStorage.getItem('izabraniTask');


  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(""); // "Negative" or "Positive"
  const [sentiment2, setSentiment2] = useState(""); // "Negative" or "Positive"
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(localStorageLevel);
  const [googleTranslateOn, setGoogleTranslateOn] = useState(false);
  const [exercise, setExercise] = useState(localStorageTask);
  const [tryWord, setTryWord] = useState();


  const reci = sentiment.split(" ");

  let  reciBezZareza = [];
  for (let i = 0; i < reci.length; i++) {
    reciBezZareza[i] = reci[i].slice(0, -1).toString();
  }

  let prvaTriUNizu = reci.slice(0, 3);


  // let objekatReci = [];
  // for (let i = 0; i < reci.length; i++) {
  //   objekatReci[`rijec_${i + 1}`] = reci[i];
  // }
  // console.log(objekatReci);

  

  function youGuessed () {
    if (reciBezZareza.includes(tryWord.toLowerCase())) {
      alert("bravo");
    } else {
      alert("probaj ponovo");
    }
  }
  

  function exerciseOn () {
  setExercise("true")
  }
  function trainingOn () {
  setExercise("false");
  }

  localStorage.setItem('izabraniTask', exercise);
 

  console.log(exercise);
  console.log(tweet);

  let onOf;
  let marked1;
  let marked2;
  if (exercise == "true") {
    onOf = "hidden"
    marked1 = "bg-slate-400"
  }else{
    onOf = "block"
    marked2= "bg-slate-400"
  }

  let ofOn;
  if (exercise == "true") {
    ofOn = "block"
    
  }else{
    ofOn = "hidden"
    
  }


 


  const levels = ["A0", "A1", "B1", "B1+", "C1", "C2"];
  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const words = newValue.trim().split(/\s+/);
    setInputValue(words[0]);
  };

  function noFunction() {
    console.log("NE RADI");
  }

 
  const handleButtonClick = () => {
    setGoogleTranslateOn(true);
    callOpenAIAPI();
  };




  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");

    localStorage.setItem("izabraniNivo", selectedLevel.toString());
    console.log(selectedLevel);
    // For 0-10
    // What is the sentiment of this tweet with a value between 0 and 10 (10 being its very positive)?

    setIsValid(inputValue in wordList);

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will receive a word in English, and your task is to translate it into Bosnian. Give me all the words in Bosnian, how that word can be translated.",
        },
        {
          role: "user",
          content: tweet,
        },
      ],
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setSentiment(data.choices[0].message.content); // Positive or negative
      });



    const APIBody2 = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Give me an example of one sentence in English at " +
            selectedLevel +
            "  level for the following word.",
        },
        {
          role: "user",
          content: tweet,
        },
      ],
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody2),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setSentiment2(data.choices[0].message.content); // Positive or negative
      });
  }

  return (
    <div className="flex h-screen w-full bg-black flex-col mx-auto justify-start items-center pt-20">
      <Resources className="z-0"></Resources>
      <div className="w-full desktop:w-1/2 text-center mb-10 !z-10">
        <p className="w-full">
          {selectedLevel ? (
            ""
          ) : (
            <label
              className="text-red-800 font-extrabold text-center w-full"
              htmlFor="levelSelect"
            >
              Izaberite nivo jezika:
            </label>
          )}
        </p>
        <select
          className=" w-1/2 text-center h-5"
          id="levelSelect"
          value={selectedLevel}
          onChange={handleLevelChange}
        >
          <option value="">A0, A1, B1 ...</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {selectedLevel && (
          <p className="text-white">Izabrali ste nivo: {selectedLevel}</p>
        )}
      </div>

      <div className=" w-full desktop:w-1/2 mx-auto text-center z-10">
        <div className="w-full h-10 bg-slate-200 flex justify-around align-super">
          <button onClick={trainingOn} className={"w-full h-ful " + marked2}>
            Translating
          </button>{" "}
          <button onClick={exerciseOn} className={"w-full h-full " + marked1}>
            Exercise
          </button>
        </div>
        <div>
          <div className="flex pb-3">
            <input
              className="h-12 bg-gray-500 px-4 text-center py-2 text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-sm w-full mt-5"
              id="a2"
              type="text"
              minLength="2"
              maxLength="20"
              autoFocus
              value={inputValue.toLowerCase()}
              onInput={handleInputChange}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="Kopirajte svoju rijec ovdje!"
              cols={50}
              rows={10}
            />
          </div>
        </div>

        <div className="overflow-hidden flex-row bg-white border divide-x rounded-sm rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700 mt-5">
          <button
            className=" w-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            onClick={isValid && selectedLevel ? handleButtonClick : noFunction}
          >
            Pokreni AI translatora
          </button>
        </div>
        <div className={onOf}>
          <GoogleTranslate
            tweet={tweet}
            googleTranslateOn={googleTranslateOn}
          ></GoogleTranslate>
          <VoiceRecording></VoiceRecording>
        </div>

        <div className="pt-2">
          <p className=" text-red-800 font-extrabold text-center">
            {isValid ? "" : "Neispravan text"}
          </p>
        </div>
        <div className="flex flex-col text-center text-white">
          {sentiment !== "" && isValid ? (
            <h3 className={onOf}>
              Rijec "{tweet}" na srpskom moze da znaci sledece: {prvaTriUNizu}
            </h3>
          ) : null}
          {sentiment2 !== "" && isValid ? (
            <h3>
              Primjer recenice na {selectedLevel} nivou engleskog: {sentiment2}
            </h3>
          ) : null}
        </div>
        <input
          onChange={(e) => {
            setTryWord(e.target.value);
          }}
          placeholder="Unesi rijec"
          className={ofOn + " w-full text-center h-10 mt-5"}
          type="text"
        />
        <button
          onClick={youGuessed}
          className={ofOn + " bg-white p-2 mt-3 w-full"}
        >
          Pogodi prevod
        </button>
      </div>
      
    </div>
  );
}
export default App;
