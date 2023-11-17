import React from 'react'
import clsx from 'clsx'
function GameHeader({ gameStage, progress, valueTimer, userMove }) {
  return (
    <div className='w-full' >
      <div className={clsx('py-1.1 px-4')}>
        {gameStage ?
          <div className={clsx((gameStage && 'flex justify-between'))}>
            {userMove ? <div>Сейчас ваша очередь</div> :
              <div>Сейчас очередь соперника</div>}
            <div className='text-xl font-medium'>{valueTimer}</div>
          </div>
          :
          <div className="w-full text-center">Игра в города на время</div>
        }
      </div>
      <div className='w-full h-1 bg-gray-100'>
        {progress ?
          <div className='h-full bg-purple-300 transition-all duration-1000 ease-linear' style={{ width: `${progress}%` }}></div>
          : ''
        }
      </div>
    </div>
  )
}

export default GameHeader