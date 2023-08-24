
import { useState } from 'react'
import wordList from './englishWords.json';
import './App.css';

const API_KEY = "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";

function App() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(""); // "Negative" or "Positive"
  const [sentiment2, setSentiment2] = useState(""); // "Negative" or "Positive"
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('');

  const levels = ['A0', 'A1', 'B1', 'B1+', 'C1', 'C2'];
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

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");

    // For 0-10
    // What is the sentiment of this tweet with a value between 0 and 10 (10 being its very positive)?

    setIsValid(inputValue in wordList);

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will receive a word in English, and your task is to translate it into Serbian.",
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

    const APIBody2 = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Give me an example of one sentence in English at " +selectedLevel+ "  level for the following word.",
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

  

  console.log(tweet);
  console.log(selectedLevel);
  return (
    <div className="flex h-screen w-full bg-black flex-col mx-auto justify-center items-center">
      <div>
        <div className="flex pb-3">
          <input
            className="w-72 h-12 bg-gray-500 px-4 text-center py-2 text-sm font-medium text-black transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-sm"
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
      <div className="overflow-hidden flex-row bg-white border divide-x rounded-sm rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          onClick={isValid  && selectedLevel ? callOpenAIAPI : noFunction}

        >
          Prevedi uz pomoc AI translatora
        </button>
      </div>


      <label className='text-white' htmlFor="levelSelect">Izaberite nivo:</label>
      <select id="levelSelect" value={selectedLevel} onChange={handleLevelChange}>
        <option value="">Izaberite nivo:</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      {selectedLevel && <p className='text-white'>Izabrali ste nivo: {selectedLevel}</p>}
     

      <div className="pt-2">
        <p className=" text-red-800 font-extrabold text-center">
          {isValid ? "" : "Neispravan text"}
        </p>
      </div>
      <div className="flex flex-col text-center text-white">
        {sentiment !== "" && isValid ? (
          <h3>
            Rijec "{tweet}" na srpskom znaci: {sentiment}
          </h3>
        ) : null}
        {sentiment2 !== "" && isValid ? (
          <h3>Primjer recenice na {selectedLevel} nivou engleskog: {sentiment2}</h3>
        ) : null}
      </div>
    </div>
  );
}
export default App;
