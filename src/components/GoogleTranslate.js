import { useState } from "react";
import axios from "axios";

export function GoogleTranslate(props) {
  const [translatedWord, setTranslatedWord] = useState("");
  const { unknownWord, googleTranslateOn, classname } = props;

  const translateWord = async () => {
    try {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: unknownWord,
            source: "en",
            target: "bs",
            key: "AIzaSyCDSKkD5pZl7j40eIs2Tk5LzAV6vboXqZU",
          },
        }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedWord(translatedText);
    } catch (error) {
      console.error("Error translating word:", error);
    }
  };

  if (googleTranslateOn) {
    translateWord();
  }

  return (
    <div className={classname}>
      <div className="mt-5 py-1 rounded-lg border-indigo-500 border text-sm desktop:text-2xl bg-indigo-100">
        <h1>Google Translate prevod:</h1>
        <input
          className="hidden"
          type="text"
          value={unknownWord}
          onChange={() => {}}
          placeholder="Enter a word in English"
        />

        <button className="hidden" onClick={translateWord}></button>
        <div className="h-9">
        {translatedWord && <p>{translatedWord}</p>}
        </div>
      </div>
    </div>
  );
}
