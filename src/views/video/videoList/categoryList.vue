<template>
	<div class="categort-list">
		<!-- 左侧弹出窗 所有分类 -->
		<el-popover placement="bottom-start" :width="450" trigger="click">
			<template #reference>
				<el-button type=""
					>{{ cat }}<el-icon class="el-icon--right"><ArrowRight /></el-icon
				></el-button>
			</template>
			<div class="video">
				<el-button
					class="item"
					:link="item.name !== cat"
					:type="item.name == cat ? 'success' : ''"
					round
					v-for="item in category"
					:key="item.id"
					@click="handleClickSub(item)"
					>{{ item.name }}</el-button
				>
			</div>
		</el-popover>
		<!-- 右侧热门分类 -->
		<ul class="hot-tags">
			<li v-for="item in group" :key="item.id" @click="handleClickSub(item)">
				<span :class="item.name == cat ? 'active' : ''">{{ item.name }}</span>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useVideoStore } from '@/store/video';

const { cat } = storeToRefs(useVideoStore());
const { handleClickSub } = useVideoStore();

defineProps(['category', 'group']);
</script>

<style lang="scss" scoped>
.categort-list {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
// 左侧弹出窗
.video {
	display: flex;
	flex-wrap: wrap;
	height: 400px;
	overflow-y: auto;
	.item {
		width: 25%;
		margin: 5px 0;
		// cursor: pointer;
	}
	.item.el-button + .el-button {
		margin-left: 0 !important;
	}
	//   .active {
	//   }
}

// 右侧热门分类
.hot-tags {
	display: flex;
	li {
		margin-left: 10px;
		cursor: pointer;
		&:hover {
			color: #34d399;
		}
		span:hover:not(.active) {
			color: #34d399;
			text-decoration: underline;
			cursor: pointer;
		}
		.active {
			color: #39c6ad;
		}
	}
}
</style>
