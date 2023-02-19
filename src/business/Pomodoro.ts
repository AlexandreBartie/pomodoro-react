import { PomodoroAudio } from './pomodoroAudio'
import { IPomodoroSettings, ePomodoroStatus } from './pomodoroContract'

class PomodoroSettings implements IPomodoroSettings {
  readonly pomodoroTime: number
  readonly shortRestTime: number
  readonly longRestTime: number
  readonly cycles: number

  constructor(args: IPomodoroSettings) {
    this.pomodoroTime = args.pomodoroTime
    this.shortRestTime = args.shortRestTime
    this.longRestTime = args.longRestTime
    this.cycles = args.cycles
  }

  secondsToWork(): number {
    return this.pomodoroTime * 60
  }

  secondsToShortRest(): number {
    return this.secondsToRest(false) * 60
  }

  secondsToLongRest(): number {
    return this.secondsToRest(true) * 60
  }

  private secondsToRest(long: boolean): number {
    if (long) return this.longRestTime
    return this.shortRestTime
  }
}

export class PomodoroControl {
  private pomodoro: Pomodoro

  public status = ePomodoroStatus.waiting

  public currentPomodoro = 0
  public currentCycle = 0

  public currentTime = 0
  public workingTime = 0
  public restingTime = 0

  get isEndTime(): boolean {
    return this.currentTime === 0
  }

  constructor(pomodoro: Pomodoro) {
    this.pomodoro = pomodoro
  }

  startWork(time: number): void {
    this.status = ePomodoroStatus.working
    this.currentTime = time
  }

  startRest(time: number): void {
    this.status = ePomodoroStatus.resting
    this.currentTime = time
  }

  startCycle(time: number): void {
    this.status = ePomodoroStatus.resting
    this.currentCycle = this.currentCycle + 1
    this.currentTime = time
  }

  tick(): number {
    if (this.pomodoro.isWorking) {
      this.workingTime = this.workingTime + 1
    }

    if (this.pomodoro.isResting) {
      this.restingTime = this.restingTime + 1
    }

    this.currentTime = this.currentTime - 1

    this.checkTime()

    return this.currentTime
  }

  private checkTime() {
    if (this.isEndTime) {
      if (this.pomodoro.isWorking) {
        this.pomodoro.startCycle()
      }

      if (this.pomodoro.isResting) {
        this.pomodoro.startWork()
      }
    }
  }
}

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
    this.audio.start
  }

  startRest(): void {
    this.control.startRest(this.settings.secondsToShortRest())
  }

  startCycle(): void {
    this.control.startCycle(this.settings.secondsToLongRest())
  }

  tick(): number {
    return this.control.tick()
  }
}
