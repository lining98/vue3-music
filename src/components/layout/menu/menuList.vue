<script setup lang='ts'>
import {useMenu} from './useMenu'
// import {Camera} from '@icon-park/vue-next'
import IconPark from '@/components/common/iconPark.vue' //引入公共组件

const {menus} = useMenu();
</script>


<template>
    <div class="module-menu" v-for="(item,i) in menus" :key="i">
        <div class="title">{{item.name}}</div>
        <div class="menus" v-for="menu in item.menus" :key="menu.key">
            <!-- <Camera size='32' fill='#f60' /> -->
            <router-link :to="{name:menu.key}">
                <IconPark :icon="menu.icon" />{{menu.name}}
            </router-link>
        </div>

    </div>
</template>


<style lang='' scoped>

</style>