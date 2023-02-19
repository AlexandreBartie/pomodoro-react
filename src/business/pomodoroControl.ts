import { Pomodoro } from './pomodoro'
import { PomodoroAudio } from './pomodoroAudio'
import { ePomodoroStatus } from './pomodoroContract'

export class PomodoroControl {
  private pomodoro: Pomodoro

  private audio: PomodoroAudio

  public status = ePomodoroStatus.waiting

  public currentPomodoro = 0
  public currentCycle = 0

  public currentTime = 0
  public workingTime = 0
  public restingTime = 0

  get isEndTime(): boolean {
    return this.currentTime === 0
  }

  get isEndCycle(): boolean {
    return this.pomodoro.isEndCycle
  }

  constructor(pomodoro: Pomodoro) {
    this.pomodoro = pomodoro
    this.audio = new PomodoroAudio()
  }

  startWork(time: number): void {
    this.status = ePomodoroStatus.working
    this.currentTime = time
    this.audio.startWork()
  }

  startRest(time: number): void {
    this.status = ePomodoroStatus.resting
    this.currentTime = time
    this.audio.startRest()
  }

  startCycle(time: number): void {
    this.status = ePomodoroStatus.resting
    this.currentCycle = this.currentCycle + 1
    this.currentTime = time
    this.audio.startRest()
    this.audio.startRest()
  }

  startPomodoro(time: number): void {
    this.status = ePomodoroStatus.resting
    this.currentPomodoro = this.currentPomodoro + 1
    this.currentCycle = 0
    this.currentTime = time
    this.audio.startRest()
    this.audio.startRest()
    this.audio.startRest()
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
        if (this.isEndCycle) this.pomodoro.startPomodoro()
        else this.pomodoro.startCycle()
      } else if (this.pomodoro.isResting) {
        this.pomodoro.startWork()
      }
    }
  }
}
