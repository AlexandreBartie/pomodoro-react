/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useEffect, useState, useCallback } from 'react'
import { useInterval } from '../hooks/useInterval'
import { secondsToHHMMSS } from '../utils/secondsToShow'
import { Button } from '../components/button'
import { Timer } from '../components/timer'
import { Pomodoro } from '../business/pomodoro'

const bellStart = require('../sounds/bell-start.mp3')
const bellFinish = require('../sounds/bell-finish.mp3')

const audioStartWorking = new Audio(bellStart)
const audioStopWorking = new Audio(bellFinish)

export type PomodoroUXPropTypes = { data: Pomodoro }

export function PomodoroUX({ data }: PomodoroUXPropTypes): JSX.Element {
  const [time, setTime] = useState(data.timeCountDown)
  const [status, setStatus] = useState(data.status)


  // const [counting, setCounting] = useState(false)
  // const [working, setWorking] = useState(false)
  // const [resting, setResting] = useState(false)
  // const [cyclesQtdManager, setCyclesQtdManager] = useState(pomodoro.cyclesCount)

  // const [completedCycles, setCompletedCycles] = useState(0)
  // const [fullWorkingTime, setFullWorkingTime] = useState(0)
  // const [numberOfPomodoros, setNumberOfPomodoros] = useState(0)

  function onStartWork() {
    data.startWork()
  }

  function onStartRest(long: false) {
    data.startRest(long)
  }

  useInterval(
    () => {
      setTime(data.tick())
      if (working) setFullWorkingTime(fullWorkingTime + 1)
    },
    counting ? 1000 : null,
  )

  // const configureWork = useCallback(() => {
  //   setCounting(true)
  //   setWorking(true)
  //   setResting(false)
  //   setTime(props.pomodoroTime)
  //   audioStartWorking.play()
  // }, [setCounting, setWorking, setResting, setTime, props.pomodoroTime])

  // const configureRest = useCallback(
  //   (long: boolean) => {
  //     setCounting(true)
  //     setWorking(false)
  //     setResting(true)

  //     if (long) {
  //       setTime(props.longRestTime)
  //     } else {
  //       setTime(props.shortRestTime)
  //     }

  //     audioStopWorking.play()
  //   },
  //   [
  //     setCounting,
  //     setWorking,
  //     setResting,
  //     setTime,
  //     props.longRestTime,
  //     props.shortRestTime,
  //   ],
  // )

  // useEffect(() => {
  //   if (working) document.body.classList.add('working')
  //   if (resting) document.body.classList.remove('working')

  //   if (time > 0) return

  //   if (working && cyclesQtdManager.length > 0) {
  //     configureRest(false)
  //     cyclesQtdManager.pop()
  //   } else if (working && cyclesQtdManager.length <= 0) {
  //     configureRest(true)
  //     setCyclesQtdManager(new Array(props.cycles - 1).fill(true))
  //     setCompletedCycles(completedCycles + 1)
  //   }

  //   if (working) setNumberOfPomodoros(numberOfPomodoros + 1)
  //   if (resting) configureWork()
  // }, [
  //   working,
  //   resting,
  //   time,
  //   cyclesQtdManager,
  //   numberOfPomodoros,
  //   completedCycles,
  //   configureRest,
  //   setCyclesQtdManager,
  //   configureWork,
  //   props.cycles,
  // ])

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer seconds={time} />

      <div className="controls">
        <Button text="Work" onClick={() => onStartWork()}></Button>
        <Button text="Rest" onClick={() => onStartRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={counting ? 'Pause' : 'Play'}
          onClick={() => setCounting(!counting)}
        ></Button>
      </div>

      <div className="details">
        <p>Ended Cycles: {completedCycles}</p>
        <p>Ended Pomodoros: {numberOfPomodoros}</p>
        <p>Worked Time: {secondsToHHMMSS(fullWorkingTime)}</p>
      </div>
    </div>
  )
}