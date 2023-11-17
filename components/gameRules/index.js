


function GameRules({setGameStage}) {
  return (
    <div className="flex flex-col p-6">
      <div>Цель: Назвать как можно больше реальных городов.</div>
      <ul className="p-6 list-disc">
        <li>Запрещается повторение городов.</li>
        <li>Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.</li>
        <li>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим</li>
      </ul>
      <button className="flex items-center gap-10 px-4 py-2 bg-violet-600 text-white rounded w-max self-center font-medium" onClick={()=>{setGameStage(1)}}>
        Начать игру
      </button>
    </div>
  )
}

export default GameRules