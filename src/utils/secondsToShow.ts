const zeroLeft = (n: number): string =>
  Math.floor(n).toString().padStart(2, '0')

export function secondsToMMSS(seconds: number): string {
  return secondsToShow(seconds, false)
}

export function secondsToHHMMSS(seconds: number): string {
  return secondsToShow(seconds, true)
}

function secondsToShow(seconds: number, full: boolean): string {
  const min = zeroLeft((seconds / 60) % 60)
  const sec = zeroLeft((seconds % 60) % 60)

  let time = `${min}m${sec}s`

  if (full) {
    const hours = zeroLeft(seconds / 3600)
    time = `${hours}h${time}`
  }

  return `${time}`
}
