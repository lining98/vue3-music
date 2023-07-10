<template>
	<!-- 封装专辑的组件 -->
	<ul class="album">
		<li
			v-for="item in albumlist"
			:key="item.id || item.data?.id"
			@click="router.push({ name: 'albumDetail', query: { id: item.id || item.data?.id } })"
		>
			<div class="img">
				<div class="coverall"></div>
				<el-image class="elimg" :src="item.blurPicUrl || item.data?.blurPicUrl || item.picUrl" style="width: 180px">
					<template #placeholder>
						<div class="image-slot">加载中<span class="dot">...</span></div>
					</template>
				</el-image>
				<div class="play">
					<IconPark class="icon" :icon="Play" size="50" />
				</div>
			</div>
			<p>{{ item.data?.name || item.name }}</p>
			<span></span>
		</li>
	</ul>
</template>

<script setup lang="ts">
import IconPark from '@/components/common/IconPark.vue';
import { Play } from '@icon-park/vue-next';
import { useRouter } from 'vue-router';
const router = useRouter();
const { albumlist } = defineProps(['albumlist']);
</script>

<style lang="scss" scoped>
.album {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	li {
		width: 220px;
		transition: all 0.3s;
		margin-right: 25px;
		margin-bottom: 25px;
		.img {
			width: 220px;
			height: 180px;
			position: relative;
			overflow: hidden;
			cursor: pointer;
			&:hover .play {
				display: block;
			}
			.coverall {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 220px;
				height: 180px;
				background-image: url('@/assets/img/coverall.png');
				background-position: 4px 510px;
			}
			.play {
				color: #ccc;
				position: absolute;
				right: 45px;
				bottom: 5px;
				display: none;
				&:hover {
					color: #bbb;
				}
			}
		}
		p {
			font-size: 14px;
		}
	}
}
</style>
