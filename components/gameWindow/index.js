import { useEffect, useState } from 'react';
import GameHeader from './../gameHeader';
import GameRules from '@/gameRules';
import GameEnd from '@/gameEnd';
import GameProcess from '@/gameProcess';


function GameWindow() {
  const [messages, setMesages] = useState([])
  const [gameStage, setGameStage] = useState(0)
  const [usedCityMap, setUsedCityMap] = useState(new Map())
  const [usedCityMapSize, setUsedCityMapSize] = useState(0)
  const [lastWord, setLastWord] = useState('')
  const [progressTimer, setProgressTimer] = useState(0)
  const [valueTimer, setValueTimer] = useState('02:00')
  const [userMove, setUserMove] = useState(true)

  const timeValue = 120

  

  const dataReset = () => {
    setUsedCityMap(new Map())
    setMesages([])
    setLastWord('')
  }

  function Message(text, isUser) {
    this.text = text;
    this.isUser = isUser;
  }
  const addNewMessage = (text, isUser) => {
    const newMessage = new Message(text, isUser)
    setMesages(messages => [...messages, newMessage])
  }

  const selectStageGame = () => {
    switch (gameStage) {
      case 0:
        return (
          <div>
            <GameHeader gameStage={gameStage} />
            <GameRules setGameStage={setGameStage} />
          </div>
        )
      case 1:
        return (
          <div>
            <GameHeader gameStage={gameStage} progress={progressTimer} valueTimer={valueTimer} userMove={userMove} />
            <GameProcess messages={messages} addNewMessage={addNewMessage} setGameStage={setGameStage} userMove={userMove}
              setUserMove={setUserMove} usedCityMap={usedCityMap}
              setUsedCityMap={setUsedCityMap} lastWord={lastWord}
              setLastWord={setLastWord} usedCityMapSize={usedCityMapSize}/>
          </div>
        )
      case 2:
      case 3:
        return <GameEnd setGameStage={setGameStage} gameStage={gameStage} usedCityMapSize={usedCityMapSize} lastWord={lastWord} dataReset={dataReset} />
      default:
        break;
    }
  }
  useEffect(() => {
    if (gameStage !== 1) return;

    let currentTime = new Date().getTime() + timeValue * 1000;

    const timer = setInterval(function () {
      let now = new Date().getTime();
      let distance = currentTime - now;
      let minutes = Math.floor(distance / (1000 * 60));
      let seconds = Math.round((distance % (1000 * 60)) / 1000);
      if (seconds === 60) {
        minutes += 1;
        seconds = 0;
      }
      setValueTimer(`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
      setProgressTimer(distance <= 0 ? 0 : ((minutes * 60 + seconds) / timeValue).toFixed(3) * 100);

      if (distance < 0) {
        clearInterval(timer);
        setValueTimer('Запуск');

        if (userMove) {
          setGameStage(2);
        } else {
          setGameStage(3);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [gameStage, timeValue, userMove]);

  useEffect(()=>{
    let totalCount = 0;

    for (let value of usedCityMap.values()) {
        totalCount += value.length;
    }
    setUsedCityMapSize(totalCount)
  },[usedCityMap])
  useEffect(() => { selectStageGame() }, [gameStage])
  return (
    <div className={`max-w-xl min-w-[36rem] rounded-2xl bg-white`}>
      {selectStageGame()}
    </div>
  )
}

export default GameWindow