export enum ePomodoroStatus {
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
