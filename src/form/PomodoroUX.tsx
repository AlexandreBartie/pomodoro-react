import React, { useEffect, useState } from 'react'
import { useInterval } from '../hooks/useInterval'
import { secondsToHHMMSS } from '../utils/secondsToShow'
import { Button } from '../components/button'
import { Timer } from '../components/timer'
import { Pomodoro } from '../business/pomodoro'

export type PomodoroUXPropTypes = { data: Pomodoro }

export function PomodoroUX({ data }: PomodoroUXPropTypes): JSX.Element {
  const [time, setTime] = useState(data.timeCountDown)
  const [status, setStatus] = useState(data.status)

  function onStartWork() {
    data.startWork()
    setStatus(data.status)
  }

  function onStartRest() {
    data.startRest()
    setStatus(data.status)
  }

  useInterval(
    () => {
      setTime(data.tick())
    },
    data.isWaiting ? null : 1000,
  )

  useEffect(() => {
    document.body.classList.remove('working')
    document.body.classList.remove('resting')

    if (data.isWorking) document.body.classList.add('working')
    if (data.isResting) document.body.classList.add('resting')

    console.log(`Status: ${data.status} Time: ${data.timeCountDown}`)
  }, [data.status, data.timeCountDown, data.isWorking, data.isResting])

  return (
    <div className="pomodoro">
      <h2>You are {status}</h2>
      <Timer seconds={time} />
      <div className="controls">
        <Button
          text="Work"
          autoTest="Pomodoro.work"
          onClick={() => onStartWork()}
        ></Button>
        <Button
          text="Rest"
          autoTest="Pomodoro.rest"
          onClick={() => onStartRest()}
        ></Button>
      </div>

      <div className="details">
        <p>Pomodoros #: {data.pomoCounting}</p>
        <p>Cycles#: {data.cycleCounting}</p>
        <p>Working Time: {secondsToHHMMSS(data.timeWorking)}</p>
        <p>Resting Time: {secondsToHHMMSS(data.timeResting)}</p>
      </div>
    </div>
  )
}
