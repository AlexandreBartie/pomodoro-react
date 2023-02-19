import { IPomodoroSettings, ePomodoroStatus } from './pomodoroContract'
import { PomodoroControl } from './pomodoroControl'
import { PomodoroSettings } from './pomodoroSettings'

export class Pomodoro {
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

  get isEndCycle(): boolean {
    return this.cycleCounting === this.settings.cycles
  }

  constructor(settings: IPomodoroSettings) {
    this.control = new PomodoroControl(this)
    this.settings = new PomodoroSettings(settings)
  }

  startWork(): void {
    this.control.startWork(this.settings.secondsToWork())
    console.log('startWork ...')
  }

  startRest(): void {
    this.control.startRest(this.settings.secondsToShortRest())
    console.log('startRest ...')
  }

  startCycle(): void {
    this.control.startCycle(this.settings.secondsToShortRest())
    console.log('startCycle ...')
  }

  startPomodoro(): void {
    this.control.startPomodoro(this.settings.secondsToLongRest())
    console.log('startPomodoro ...')
  }

  tick(): number {
    return this.control.tick()
  }
}
