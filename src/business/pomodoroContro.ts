import { Pomodoro } from './pomodoro'
import { ePomodoroStatus } from './pomodoroContract'

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
