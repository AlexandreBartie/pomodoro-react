enum ePomodoroStatus {
  waiting = 'Waiting',
  working = 'Working',
  resting = 'Resting',
}

export interface IPomodoroSettings {
  pomodoroTime: number
  shortRestTime: number
  longRestTime: number
  cycles: number
}

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

  timeToRest(long: boolean): number {
    if (long) return this.longRestTime
    return this.shortRestTime
  }
}

export class PomodoroControl {
  private pomodoro: Pomodoro

  public status = ePomodoroStatus.waiting

  private time = 0

  constructor(pomodoro: Pomodoro) {
    this.pomodoro = pomodoro
  }

  startWork(time: number): void {
    this.status = ePomodoroStatus.working
    this.time = time
  }

  startRest(time: number): void {
    this.status = ePomodoroStatus.resting
    this.time = time
  }
}

export class Pomodoro {
  protected control: PomodoroControl

  protected settings: PomodoroSettings

  private cycles = 0

  get timeCountDown(): number {
    return this.control.t
  }

  get cyclesCount(): number {
    return this.cycles
  }

  get status(): string {
    return this.control.status
  }

  constructor(settings: IPomodoroSettings) {
    this.control = new PomodoroControl(this)
    this.settings = new PomodoroSettings(settings)
  }

  startWork(): void {
    this.control.startWork(this.timeToWork())
  }

  startRest(long: boolean): void {
    this.control.startRest(this.timeToRest(long))
  }

  tick(): void {
    this.control.tick()
  }

  private timeToWork(): number {
    return this.settings.pomodoroTime * 60
  }

  private timeToRest(long: boolean): number {
    return this.settings.timeToRest(long) * 60
  }
}
