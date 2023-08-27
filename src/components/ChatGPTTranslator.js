import { useState } from "react";
import wordList from '../englishWords.json';

export function ChatGPTTranslator () {

    async function callOpenAIAPI() {
      console.log("Calling the OpenAI API");

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
      <div>
        <div className="overflow-hidden flex-row bg-white border divide-x rounded-sm rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700 mt-5">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            onClick={isValid && selectedLevel ? handleButtonClick : noFunction}
          >
            Prevedi uz pomoc AI translatora
          </button>
        </div>
      </div>
    );
}

