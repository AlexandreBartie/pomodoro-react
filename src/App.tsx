import React from 'react'
import { Pomodoro } from './business/pomodoro'
import { PomodoroUX } from './form/pomodoroUX'

import { settingsDefault } from './business/pomodoroSettings'

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroUX data={new Pomodoro(settingsDefault)} />
    </div>
  )
}

export default App
