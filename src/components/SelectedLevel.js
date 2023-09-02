import { Fragment, useState } from 'react'
import { Combobox, Listbox, Transition } from '@headlessui/react'
import { ReactComponent as CheckIcon }  from '../icons/CheckIcon.svg'
import { ReactComponent as ChevronUpDownIcon }  from '../icons/ChevronUpDownIcon.svg'
 
const levels = ["A0 (Begginer)", "A1 (Elementary)", "A2 (Pre Intermediate)", "B1 (Intermediate)", "B2 (Upper Intermediate)", "C1 (Advanced)","C2 (Proficient)"];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectedLevel({setConstantInParent}) {
  const localStorageLevel = localStorage.getItem("izabraniNivo");
  const [selectedLevel, setSelectedLevel] = useState(localStorageLevel || levels[3],);
  
  setConstantInParent(selectedLevel);

  console.log(selectedLevel + " 2232323232323323");

  const handleLevelChange = (event) => {
    
    setSelectedLevel(event);
    
  };

  return (
    <div className="z-50 mb-5 shadow-sm w-1/3 mx-auto">
      <Listbox value={selectedLevel} onChange={handleLevelChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-md font-medium leading-6 text-gray-900">
              Izaberi nivo znanja Engleskog jezika!
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-md sm:leading-6 ">
                <span className="block truncate">{selectedLevel}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-50"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                
                  <Listbox.Options className=" text-start absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-md ">
                  <div className='w-1/2'></div>
                    {levels.map((level) => (
                      <Listbox.Option
                        key={level}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={level}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {level}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                    
                  </Listbox.Options>
                
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
