export function useFormatDuring(during: number) {
  if(!during) return '00:00'
  let duration = Math.floor(during / 1000)
  let minute: number | string = Math.floor(duration / 60)
  let second: number | string = Math.floor(duration % 60)
  if (minute < 10) {
    minute = `0${minute}`
  }
  if (second < 10) {
    second = `0${second}`
  }
  return `${minute}:${second}`
}

export function useNumberFormat(number: number): string | number {
  if (number > 100000000) {
    return Number((number / 100000000).toFixed(1)) + " 亿";
  }

  if (number > 10000000) {
    return Number((number / 10000000).toFixed(1)) + " 千万";
  }

  if (number > 10000) {
    return Number((number / 10000).toFixed(1)) + " 万";
  }

  return number;
}
