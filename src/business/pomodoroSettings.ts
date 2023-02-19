import { IPomodoroSettings } from './pomodoroContract'

export class PomodoroSettings implements IPomodoroSettings {
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
