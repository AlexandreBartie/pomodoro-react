import React from 'react'
import { IPomodoroSettings, Pomodoro } from './business/pomodoro'
import { PomodoroUX } from './form/PomodoroUX'

function App(): JSX.Element {
  const settings: IPomodoroSettings = {
    pomodoroTime: 25, // 25 minutes
    shortRestTime: 5, // 05 minutes
    longRestTime: 15, // 15 minutes
    cycles: 4, // 4 cycles to get 1 pomodoro
  }

  const pomodoro = new Pomodoro(settings)

  return (
    <div className="container">
      <PomodoroUX data={pomodoro} />
    </div>
  )
}

export default App
