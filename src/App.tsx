import React from 'react'
import { Pomodoro } from './business/pomodoro'
import { IPomodoroSettings } from './business/pomodoroContract'
import { PomodoroUX } from './form/pomodoroUX'

function App(): JSX.Element {
  const settings: IPomodoroSettings = {
    pomodoroTime: 0.3, // 25 minutes
    shortRestTime: 0.1, // 05 minutes
    longRestTime: 0.2, // 15 minutes
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
