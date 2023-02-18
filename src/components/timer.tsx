import React from 'react'
import { secondsToMMSS } from '../utils/secondsToShow'

interface Props {
  seconds: number
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{secondsToMMSS(props.seconds)}</div>
}
