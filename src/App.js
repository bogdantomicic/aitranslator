import { useState } from 'react'
import wordList from './englishWords.json';
import './App.css';
import { VoiceRecording } from "./components/VoiceRecording";
import { GoogleTranslate } from './components/GoogleTranslate';
import SelectedLevel from "./components/SelectedLevel";
import CorrectingWords from './components/CorrectingWords';
import { ExerciseTrainingButton } from "./components/ExerciseTrainingButton";

const API_KEY = process.env.REACT_APP_CHATGPT_API_KEY;

function App() {
  const [unknownWord, setUnknownWord] = useState("");
  const [translatedWord, setTranslatedWord] = useState("");
  const [exampleSentance, setExampleSentance] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [googleTranslateOn, setGoogleTranslateOn] = useState(false);
  const [tryWord, setTryWord] = useState();
  const [selectedLevel, setConstantValue] = useState("");
  const [wordsWithoutCommas, setWordsWithoutCommas] = useState("");
  const [firstSixWords, setFirstSixWords] = useState("");
  const [ofOn, setOfOn] = useState("");
  const [onOf, setOnOf] = useState("");

  const setselectedLevelInParent = (value) => {
    setConstantValue(value);
  };
  const setwordsWithoutCommas = (value) => {
    setWordsWithoutCommas(value);
  };
  const setfirstSixWords = (value) => {
    setFirstSixWords(value);
  };
  const setofOn = (value) => {
    setOfOn(value);
  };
  const setonOf = (value) => {
    setOnOf(value);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const words = newValue.trim().split(/\s+/);
    setInputValue(words[0]);
  };

  function youGuessed() {
    if (wordsWithoutCommas.includes(tryWord.toLowerCase())) {
      alert("BRAVO!");
    } else {
      alert("Probaj ponovo.");
    }
  }

  function noFunction() {
    alert("NEISPRAVAN TEXt");
  }

  const handleButtonClick = () => {
    setGoogleTranslateOn(true);
    callOpenAIAPI();
  };

  async function callOpenAIAPI() {
    localStorage.setItem("selectedLevelStorage", selectedLevel.toString());

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
          content: unknownWord,
        },
      ],
      temperature: 0,
      max_tokens: 500,
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
        setTranslatedWord(data.choices[0].message.content);
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
          content: unknownWord,
        },
      ],
      temperature: 0.7,
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
        setExampleSentance(data.choices[0].message.content);
      });
  }

  return (
    <div className="flex h-screen w-full flex-col mx-auto justify-start items-center pt-20 bg-white">
      {/* <Resources></Resources> */}
      <CorrectingWords
        translatedWord={translatedWord}
        setwordsWithoutCommas={setwordsWithoutCommas}
        setfirstSixWords={setfirstSixWords}
      ></CorrectingWords>

      {/* BUTTON ZA BIRANJE VJEZBA/PREVOD */}
      <ExerciseTrainingButton
        setofOn={setofOn}
        setonOf={setonOf}
      ></ExerciseTrainingButton>
      {/* BUTTON ZA BIRANJE VJEZBA/PREVOD */}

      {/* SELECTED LEVEL */}
      <div className=" w-11/12 desktop:w-2/3 mx-auto text-center z-10 rounded-xl rounded-t-none border-indigo-600  border-t-0 border-[1px] bg-white p-4 shadow-2xl mt-16">
        <SelectedLevel
          setselectedLevelInParent={setselectedLevelInParent}
        ></SelectedLevel>
        {/* SELECTED LEVEL */}

        {/* INPUT RIJECI KAO I BUTTON ZA POKRETANJE */}
        <div className="flex border rounded-lg border-indigo-900 shadow-xl">
          <div className="flex w-3/4 border rounded-lg">
            <input
              className="py-6 px-4 text-center placeholder:text-sm desktop:placeholder:text-2xl text-sm desktop:text-2xl text-black transition-colors duration-200 sm:px-6 hover:bg-indigo-100 w-full rounded-lg rounded-r-none"
              id="a2"
              type="text"
              minLength="2"
              maxLength="20"
              autoFocus
              value={inputValue.toLowerCase()}
              onInput={handleInputChange}
              onChange={(e) => setUnknownWord(e.target.value)}
              placeholder="Unesis nepoznatu rijec ovdje!"
              cols={50}
              rows={10}
            />
          </div>

          <div className=" w-1/4 h-1/1 overflow-hidden border divide-x rtl:flex-row-reverse right-[317px]  rounded-lg bg-indigo-600 rounded-l-none">
            <button
              className="desktop:py-6 py-2 w-full h-full px-2 desktop:px-4 text-sm desktop:text-2xl  text-white transition-colors duration-200  sm:px-6 hover:bg-indigo-500"
              onClick={
                isValid && selectedLevel ? handleButtonClick : noFunction
              }
            >
              Pokreni AI translatora
            </button>
          </div>
        </div>
        {/* INPUT RIJECI KAO I BUTTON ZA POKRETANJE */}

        {/* NEISPRAVAN TEXT */}
        <div className="pt-2">
          <p className=" text-[#a0404e] font-extrabold text-center">
            {isValid ? "" : "NEISPRAVAN TEXT, PROBAJTE PONOVO"}
          </p>
        </div>
        {/* NEISPRAVAN TEXT */}

        {/* AI ODGOVORI */}
        <div className="flex flex-col justify-center text-center text-black w-full desktop:h-40 h-40 items-center shadow-lg mt-5 rounded-lg bg-indigo-100 border-indigo-600 border-[1px] text-sm desktop:text-2xl px-3">
          {translatedWord !== "" && isValid ? (
            <h3 className={onOf}>
              Rijec "{unknownWord}" na srpskom moze da znaci sledece:{" "}
              {firstSixWords}
            </h3>
          ) : null}
          {exampleSentance !== "" && isValid ? (
            <h3 className=" pt-5">
              Primjer recenice na {selectedLevel} nivou engleskog:{" "}
              {exampleSentance}
            </h3>
          ) : null}
        </div>
        {/* AI ODGOVORI */}

        {/* GOOGLE TRANSLATOR */}
        <div className={onOf}>
          <GoogleTranslate
            unknownWord={unknownWord}
            googleTranslateOn={googleTranslateOn}
          ></GoogleTranslate>
          <VoiceRecording></VoiceRecording>
        </div>
        {/* GOOGLE TRANSLATOR */}

        {/* PROBAJ DA POGODIS PREVOD*/}
        <div
          className={
            ofOn +
            " flex border rounded-lg border-indigo-900 shadow-xl mt-5 text-sm desktop:text-2xl h-20"
          }
        >
          <input
            onChange={(e) => {
              setTryWord(e.target.value);
            }}
            placeholder={"Pogodi koji je prevod za rijec '" + unknownWord + "'"}
            className=" flex w-3/4 border rounded-lg rounded-r-none text-center hover:bg-indigo-100 transition-colors duration-200"
            type="text"
          />
          <button
            onClick={youGuessed}
            className="w-1/4 h-full overflow-hidden border divide-x rtl:flex-row-reverse right-[317px]  rounded-lg bg-indigo-600 rounded-l-none text-white hover:bg-indigo-500 transition-colors duration-200"
          >
            Pogodi prevod
          </button>
        </div>
        {/* PROBAJ DA POGODIS PREVOD*/}
      </div>
    </div>
  );
}
export default App;
