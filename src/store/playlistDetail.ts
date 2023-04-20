import { defineStore } from "pinia";
// import {getPlaylistDetail} from '@/api/api'
import router from "@/router";
// import { ElMessage } from "element-plus";

export const usePlaylistDetail = defineStore("playlistDetail", {
  state: () => {
    return {
      playlistId: router.currentRoute?.value.params.id,
      playlists: [],
    };
  },
  actions: {
    toPlaylist(id: number) {
      this.playlistId = id;
      // router.push(`/playlist/${id}`)
      router.push({
        name: "playlist",
        query: { id: id },
      });
    },
    // async getSongDetail(id:number){
    //     const res = await getPlaylistDetail(this.playlistId)
    //     console.log(res);

    // }
    // async playList() {
    //     const data =  await getPlaylistDetail(this.playlistId)
    //     if(data.code == 200){
    //         this.playlists = data.playlist
    //     }else{
    //         ElMessage.error(data.message)
    //     }

    //     //   if(res.code == 200){
    //     //       playlists.value = res.playlist
    //     //       // musicLists.value = res.data.playlist.tracks
    //     //   }
    // }
  },
});
