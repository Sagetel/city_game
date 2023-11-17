import { useEffect, useState, useRef } from 'react';
import CityMap from './listCity'

import clsx from 'clsx';

function GameProcess({ messages, addNewMessage, userMove, setUserMove, usedCityMap, setUsedCityMap, lastWord, setLastWord, usedCityMapSize }) {
  const [textMessage, setTextMessage] = useState('')
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setTextMessage(e.target.value);
  };
  const registrationСhoice = (text) => {
    const firstLetter = text.charAt(0)
    setUserMove(false)
    if (usedCityMap.has(firstLetter)) {
      const updatedArray = [...usedCityMap.get(firstLetter), text];
      setUsedCityMap(new Map(usedCityMap).set(firstLetter, updatedArray));
    } else {
      setUsedCityMap(new Map(usedCityMap).set(firstLetter, [text]));
    }
  }

  const sendNewMessage = () => {
    if (!userMove) return
    const nameCity = textMessage;
    const firstLetter = nameCity.charAt(0).toUpperCase()
    if (!nameCity) return
    if (!CityMap.has(firstLetter)) return alert("Нет такой буквы")
    if (CityMap.get(firstLetter).indexOf(nameCity.toUpperCase()) == -1) return alert("Нет такого города")
    if (usedCityMap.get(firstLetter)?.includes(nameCity.toUpperCase())) return alert("Такой город уже назван")
    if (lastWord && firstLetter != lastWord.replace(/[ЫЪЬ]/g, '').charAt(lastWord.replace(/[ЫЪЬ]/g, '').length - 1)) return alert("Город должен начинаться на букву предыдущего города")

    addNewMessage(nameCity.toLowerCase().replace(/(?:^|\s|-)\S/g, function (a) { return a.toUpperCase(); }), true)
    registrationСhoice(nameCity.toUpperCase())
    setLastWord(nameCity.toUpperCase())
    setTextMessage('')
  }

  const machineMakeAnswer = (nameCity, firstLetter) => {
    addNewMessage(nameCity.toLowerCase().replace(/(?:^|\s|-)\S/g, function (a) { return a.toUpperCase(); }), false)
    setLastWord(nameCity.toUpperCase())
    if (usedCityMap.has(firstLetter)) {
      const updatedArray = [...usedCityMap.get(firstLetter), nameCity.toUpperCase()];
      setUsedCityMap(prevMap => new Map(prevMap).set(firstLetter, updatedArray))
    } else {
      setUsedCityMap(new Map(usedCityMap).set(firstLetter, [nameCity.toUpperCase()]));
      setUsedCityMap(prevMap => new Map(prevMap).set(firstLetter, [nameCity.toUpperCase()]))
    }
    setUserMove(true)
  }

  const makeMoveComputer = (text) => {
    const world = text.replace(/[ЫЪЬ]/g, '')
    const lastLetter = world[world.length - 1]
    let availableCitis = CityMap.get(lastLetter)
    if (usedCityMap.get(lastLetter)) {
      availableCitis = CityMap.get(lastLetter).filter((city) => {
        return !usedCityMap.get(lastLetter).includes(city)
      }
      );
    }
    if (availableCitis.length > 0) machineMakeAnswer(availableCitis[0], lastLetter)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && userMove) {
      sendNewMessage();
    }
  };

  useEffect(() => {
    if (usedCityMap.size > 0 && !userMove) {
      setTimeout(() => {
        makeMoveComputer(lastWord);
      }, 3000); // типа компьютер думает

    }
  }, [usedCityMap])

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (userMove) {
      inputRef.current.focus();
    }
  }, [userMove]);
  return (
    <div className="flex flex-col" >
      <div className="min-h-[20rem] max-h-[25.313rem] px-6 flex flex-col justify-between">
        <div ref={messagesContainerRef} className={clsx('flex flex-col gap-13 overflow-y-auto', (messages.length == 0 && 'm-auto'))}>
          {messages.length == 0 ? <div className='text-gray-400'>Первый участник вспоминает города...</div> : messages.map((message, index) => (
            <div key={index} className={clsx('py-1.5 px-4 rounded-tl-xl rounded-tr-xl w-fit first:mt-13', (message.isUser ? "bg-violet-500 rounded-br-0 rounded-bl-xl self-end text-white" : 'bg-violet-50 rounded-br-xl rounded-bl-0 text-gray-700'))}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="text-gray-400 self-center">Всего перечислено городов: {usedCityMapSize}</div>
      </div>
      <div className="p-4">
        <div className="bg-gray-100 py-3.5 px-3 rounded-md flex relative pr-12">
          <input ref={inputRef} className={clsx("bg-gray-100 w-full placeholder:text-gray-700 p-0 text-base focus:outline-none focus:border-none max-h-fit", (userMove ? "text-gray-700" : "text-gray-400"))}
            type="text"
            placeholder={
              !userMove ?
                "Ожидаем ответа соперника..."
                : lastWord && userMove ? `Знаете город на букву "${lastWord.replace(/[ЫЪЬ]/g, '').charAt(lastWord.replace(/[ЫЪЬ]/g, '').length - 1)}"?` : "Напишите любой город, например: Где вы живете?"
            }
            value={textMessage}
            disabled={!userMove}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}

          />
          <div className={clsx("pt-1 pb-2 pl-2 pr-1 rounded-md flex justify-center items-center absolute right-2.5 top-2.5", (userMove ? 'cursor-pointer bg-violet-500' : 'bg-gray-400'))}
            onClick={() => { sendNewMessage() }}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              transform="rotate(45)">
              <path d="M10 17L19 19L10 1L1 19L10 17ZM10 17V9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameProcess

