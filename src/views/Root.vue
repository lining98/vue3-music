<script setup lang='ts'>
import Menu from '@/components/layout/menu/index.vue'
import Footer from '@/components/layout/footer/index.vue'
import {ref} from 'vue'

</script>


<template>
    <div class="module">
        <div class="module-left">
            <Menu />
        </div>
        <div class="module-main">
            <router-view />
            <div>
                <Footer />
            </div>
        </div>
    </div>
</template>


<style lang='scss' scoped>

</style>