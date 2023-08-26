import { useState } from "react";
import  axios  from "axios";





export function GoogleTranslate (props) {
  const [translatedWord, setTranslatedWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const { tweet, googleTranslateOn } = props;

  const translateWord = async () => {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: tweet,
            source: "en",
            target: "sr",
            key: "AIzaSyCDSKkD5pZl7j40eIs2Tk5LzAV6vboXqZU",
          },
        }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedWord(translatedText);
    } catch (error) {
      console.error("Error translating word:", error);
    }
    console.log(googleTranslateOn + "ssd");
  };

  if (googleTranslateOn) {
    translateWord()
  }



  return (
    <div className="bg-white mt-5">
      <h1>English to Serbian Translation</h1>
      <input
        type="text"
        value={tweet}
        onChange={(e) => setInputWord(e.target.value)}
        placeholder="Enter a word in English"
      />

      <button onClick={translateWord}>Translate</button>
      {translatedWord && <p>Translated: {translatedWord}</p>}
    </div>
  );
}