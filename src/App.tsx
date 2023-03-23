import React from 'react'

import { settingsDefault } from './business/pomodoroSettings'
import { PomodoroUX } from './form/pomodoroUX'
import { Pomodoro } from './business/pomodoro'

function App(): JSX.Element {
  return (
    <div className="container">
      <PomodoroUX data={new Pomodoro(settingsDefault)} />
    </div>
  )
}

export default App
