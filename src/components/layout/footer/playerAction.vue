<template>
    <div class="player-action">
        {{useFormatDuring(currentTime)}}/{{useFormatDuring(duration)}}
    </div>
</template>

<script setup lang='ts'>
import {ref, reactive} from 'vue'
import {useFormatDuring} from '@/utils/numbers'
import {usePlayerStore} from '@/store/player'
import IconPark from '@/components/common/iconPark.vue'
import {storeToRefs} from 'pinia'

const {currentTime,duration,playListCount,showPlayList} = storeToRefs(usePlayerStore())

</script>




<style lang='scss' scoped>
.player-action{
    margin-right: 20px;
}
</style>