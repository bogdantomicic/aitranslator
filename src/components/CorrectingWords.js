import { useEffect } from 'react';

function CorrectingWords({
  translatedWord,
  setwordsWithoutCommas,
  setfirstSixWords,
}) {
  useEffect(() => {
    if (translatedWord) {
      const words = translatedWord.split(" ");
      const wordsWithoutCommas = words.map((word) =>
        word.slice(0, -1).toString()
      );
      const firstSixWords = words.slice(0, 6);
      setwordsWithoutCommas(wordsWithoutCommas);
      setfirstSixWords(firstSixWords);
    }
  }, [translatedWord]);

  return null;
}

export default CorrectingWords;
