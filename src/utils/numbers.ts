export function useFormatDuring(during: number) {
  if(!during) return '00:00'
  const s = Math.floor(during) % 60;
  during = Math.floor(during / 60);
  const m = during % 60;

  const minutes = m < 10 ? `0${m}` : m;
  const seconds = s < 10 ? `0${s}` : s;

  return minutes + ":" + seconds;
}
