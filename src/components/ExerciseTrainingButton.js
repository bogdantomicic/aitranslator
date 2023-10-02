import { useState } from "react";



    export function ExerciseTrainingButton ({setonOf, setofOn}) {
        const localStorageTask = localStorage.getItem("izabraniTask");
        const [exercise, setExercise] = useState(localStorageTask || true);

      function exerciseOn() {
        setExercise("true");
      }
      function trainingOn() {
        setExercise("false");
      }

      localStorage.setItem("izabraniTask", exercise);

      let onOf;
      let marked1;
      let marked2;
      if (exercise === "true") {
        onOf = "hidden";
        marked1 = "bg-indigo-600 transition duration-300";
      } else {
        onOf = "block";
        marked2 = "bg-indigo-600 transition duration-300";
      }

      let ofOn;
      if (exercise === "true") {
        ofOn = "block";
      } else {
        ofOn = "hidden";
      }

      setonOf(onOf);
      setofOn(ofOn);

      return (
        <div className="w-full h-full flex left-0 align-super rounded-lg  shadow-sm border mb-10 absolute top-[0px] z-10">
          <button
            onClick={trainingOn}
            className={"w-full h-full rounded-l-lg " + marked2}
          >
            <div className="h-20 w-1/2 top-[15px] desktop:top-[0px] absolute">
              <p className="flex items-center justify-end h-full font-semibold pt-[115px] pr-[1px] ">
                <span className="w-11/12 desktop:w-2/3 h-8 desktop:h-14  flex justify-center items-center bg-indigo-600 rounded-lg rounded-b-none text-sm desktop:text-2xl shadow-2xl hover:bg-indigo-400 transition duration-150 text-white border-white border">
                  PRIKAZI PREVOD
                </span>
              </p>
            </div>
          </button>{" "}
          <button
            onClick={exerciseOn}
            className={"w-full h-full rounded-r-lg " + marked1}
          >
            <div className="h-20 w-1/2 top-[15px] desktop:top-[0px] absolute mx-auto">
              <p className="flex items-center justify-start h-full  font-semibold pt-[115px] pl-[1px]">
                <span className="w-11/12 desktop:w-2/3 h-8 desktop:h-14  flex justify-center items-center bg-indigo-600 rounded-lg rounded-b-none text-sm desktop:text-2xl shadow-2xl hover:bg-indigo-400 transition duration-150 text-white border-white border">
                  VJEZBAJ
                </span>
              </p>
            </div>
          </button>
        </div>
      );
    }