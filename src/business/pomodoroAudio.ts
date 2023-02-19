/* eslint-disable @typescript-eslint/no-var-requires */
const bellWork = require('../sounds/bellWork.mp3')
const bellRest = require('../sounds/bellRest.mp3')

export class PomodoroAudio {
  private audioStart: HTMLAudioElement
  private audioFinish: HTMLAudioElement

  constructor() {
    this.audioStart = new Audio(bellWork)
    this.audioFinish = new Audio(bellRest)
  }

  startWork(): void {
    this.audioStart.play()
  }

  startRest(): void {
    this.audioFinish.play()
  }
}
