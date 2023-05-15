import axios from "@/http/request";

// 获取推荐歌单
export async function getGersonalized(){
    return await axios.get('/personalized')
}


// 获取推荐歌曲
export async function recommendSongs(){
    return await axios.get('/recommend/songs')
}
