import { useState } from "react";

export default function SelectedLevel1 ({setConstantInParent}) {
  const localStorageLevel = localStorage.getItem("izabraniNivo");
  const [selectedLevel, setSelectedLevel] = useState(localStorageLevel);

  setConstantInParent(selectedLevel);

  const levels = ["A0", "A1", "B1", "B1+", "C1", "C2"];
  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  return (
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
  );
}



