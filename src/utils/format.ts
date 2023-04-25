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

// 格式化歌词
export function formatLyric(lyricStr: string) {
    let lyricArr = lyricStr.split(/[(\r\n)\r\n]+/).map((item: string) => {
        const min = item.slice(1, 3); // 分
        const sec = item.slice(4, 6); // 秒
        let mill: number | string = Number(item.slice(7, 10))
        let lrc = item.slice(11, item.length)
        // 如果毫秒为两位
        if (isNaN(Number(mill))) {
          mill = Number(item.slice(7, 9)) * 10
          lrc = item.slice(10, item.length)
        }
        // 统计每段歌词出现的时间
        const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + mill
        return { time, lrc, next: 0 }
      });
      // 每个歌词记录下一句歌词出现时间
      lyricArr.forEach((item, i) => {
        if (i === lyricArr.length - 1 || isNaN(lyricArr[i + 1].time)) {
          // 异常歌词显示到下下句 或者直接只显示1.5s
          item.next = lyricArr[i + 2] ? lyricArr[i + 2].time : item.time + 1500
        } else {
          item.next = lyricArr[i + 1].time
        }
      })
      return lyricArr
}
