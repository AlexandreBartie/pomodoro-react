import { IPomodoroSettings } from './pomodoroContract'

export const settingsTest: IPomodoroSettings = {
  pomodoroTime: 0.3, // 18 seconds
  shortRestTime: 0.1, // 6 seconds
  longRestTime: 0.2, // 12 seconds
  cycles: 3, // 3 cycles to get 1 pomodoro
}

export const settingsDefault: IPomodoroSettings = {
  pomodoroTime: 25, // 25 minutes
  shortRestTime: 5, // 05 minutes
  longRestTime: 15, // 15 minutes
  cycles: 4, // 4 cycles to get 1 pomodoro
}

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
