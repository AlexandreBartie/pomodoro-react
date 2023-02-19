/* eslint-disable @typescript-eslint/no-var-requires */
const bellWork = require('../sounds/bell-start.mp3')
const bellRest = require('../sounds/bell-finish.mp3')

export class PomodoroAudio {
  private audioStart = new Audio(bellWork)
  private audioFinish = new Audio(bellRest)

  startWork(): void {
    this.audioStart.play
  }

  startRest(): void {
    this.audioFinish.play
  }
}
