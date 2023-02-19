import React from 'react'
import { IPomodoroSettings, Pomodoro } from './business/pomodoro'
import { PomodoroUX } from './form/pomodoroUX'

function App(): JSX.Element {
  const settings: IPomodoroSettings = {
    pomodoroTime: 0.5, // 25 minutes
    shortRestTime: 0.2, // 05 minutes
    longRestTime: 0.4, // 15 minutes
    cycles: 3, // 4 cycles to get 1 pomodoro
  }

  const pomodoro = new Pomodoro(settings)

  return (
    <div className="container">
      <PomodoroUX data={pomodoro} />
    </div>
  )
}

export default App
