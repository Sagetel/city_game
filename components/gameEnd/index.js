import clsx from "clsx"

function GameEnd({setGameStage, gameStage, usedCityMapSize, lastWord,dataReset}) {
  const userWin = gameStage == 3
  return (
    <div className="p-10 flex gap-8 flex-col">
      {userWin ?
      <div className="text-center text-xl">
        <div>Поздравляем тебя с победой!</div>
        <div>Твой противник не вспомнил нужный город!</div>
      </div>
      : 
      <div className="text-center text-xl">
        <div>К сожалению твое время вышло!</div>
        <div>Твой противник победил!</div>
      </div>
      
      }
      <div className={clsx("text-center font-medium text-3xl", (userWin? 'text-green-600' : 'text-red-600'))}>00:00</div>
      <div className="text-center text-xl">
        <div>
          Всего было перечислено городов: {usedCityMapSize}
        </div>
        <div>
          Очень не плохой результат!
        </div>
      </div>
      <div className="text-center">
        <div className="text-xl">
          Последний город названный победителем
        </div>
        <div className="font-medium text-2xl">
          {lastWord}
        </div>
      </div>
      <button className="flex items-center gap-10 px-4 py-2 bg-violet-600 text-white rounded w-max self-center font-medium" onClick={()=>{setGameStage(1); dataReset()}}>
        Начать новую игру
      </button>
    </div>
  )
}

export default GameEnd