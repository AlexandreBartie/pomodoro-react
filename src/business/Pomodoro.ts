import { PomodoroAudio } from './pomodoroAudio'
import { IPomodoroSettings, ePomodoroStatus } from './pomodoroContract'
import { PomodoroControl } from './pomodoroContro'
import { PomodoroSettings } from './pomodoroSettings'

export class Pomodoro {
  protected audio: PomodoroAudio
  protected control: PomodoroControl
  protected settings: PomodoroSettings

  get timeCountDown(): number {
    return this.control.currentTime
  }

  get timeWorking(): number {
    return this.control.workingTime
  }

  get timeResting(): number {
    return this.control.restingTime
  }

  get cycleCounting(): number {
    return this.control.currentCycle
  }

  get pomoCounting(): number {
    return this.control.currentPomodoro
  }

  get status(): ePomodoroStatus {
    return this.control.status
  }

  get isWaiting(): boolean {
    return this.status === ePomodoroStatus.waiting
  }

  get isWorking(): boolean {
    return this.status === ePomodoroStatus.working
  }

  get isResting(): boolean {
    return this.status === ePomodoroStatus.resting
  }

  constructor(settings: IPomodoroSettings) {
    this.audio = new PomodoroAudio()
    this.control = new PomodoroControl(this)
    this.settings = new PomodoroSettings(settings)
  }

  startWork(): void {
    this.control.startWork(this.settings.secondsToWork())
    this.audio.startWork()
  }

  startRest(): void {
    this.control.startRest(this.settings.secondsToShortRest())
    this.audio.startRest()
  }

  startCycle(): void {
    this.control.startCycle(this.settings.secondsToLongRest())
  }

  tick(): number {
    return this.control.tick()
  }
}
