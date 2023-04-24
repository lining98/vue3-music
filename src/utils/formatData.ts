// 格式化歌词
export function formatLyric(lyricStr: string) {
  return lyricStr.split(/\n/gis).map((item) => {
    let fen = item.slice(1, 3);
    let miao = item.slice(4, 6);
    let haoMiao = item.slice(7, 10);
    return {
      fen,
      miao,
      haoMiao,
      lyric: item.slice(10, item.length).replace(/]/g, ""),
      item,
      time:
        parseInt(haoMiao) + parseInt(miao) * 1000 + parseInt(fen) * 60 * 1000,
    };
  });
}
