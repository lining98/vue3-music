export function useFormatDuring(during: number) {
  if (!during) return "00:00";
  const s = Math.floor(during) % 60;
  during = Math.floor(during / 60);
  const m = during % 60;

  const minutes = m < 10 ? `0${m}` : m;
  const seconds = s < 10 ? `0${s}` : s;

  return minutes + ":" + seconds;
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
