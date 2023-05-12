import axios from "@/http/request";

// 获取推荐歌曲
export async function recommendSongs(){
    return await axios.get('/recommend/songs')
}
