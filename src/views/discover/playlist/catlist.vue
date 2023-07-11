<template>
	<el-popover placement="bottom-start" :width="450" trigger="click">
		<template #reference>
			<el-button type="success" round
				>{{ cat }}<el-icon class="el-icon--right"><ArrowRight /></el-icon
			></el-button>
		</template>
		<div class="popover">
			<h3 @click="handleClickAll">全部歌单</h3>
			<div class="popover-content">
				<ul class="catege">
					<li v-for="item in categories" :key="item.label">
						<Component :is="item.icon" size="22" />
						<span> {{ item.label }}</span>
					</li>
				</ul>
				<ul class="list">
					<li v-for="(item, index) in catlist" :key="index">
						<span
							v-for="sub in item"
							:key="sub"
							:class="sub.name == cat ? 'active' : ''"
							@click="handleClickSub(sub)"
						>
							{{ sub.name }}<el-divider direction="vertical" />
						</span>
					</li>
				</ul>
			</div>
		</div>
	</el-popover>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { getPlaylistCatlist } from '@/api/discover';
import { MusicOne, Piano, SmilingFace, Sphere, TeaDrink } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import { useDiscoverStore } from '@/store/discover';

const { cat } = storeToRefs(useDiscoverStore());
const { handleClickSub } = useDiscoverStore();

const categories = [
	{ icon: Sphere, label: '语种' },
	{ icon: Piano, label: '风格' },
	{ icon: TeaDrink, label: '场景' },
	{ icon: SmilingFace, label: '情感' },
	{ icon: MusicOne, label: '主题' },
];

const catlist = ref([[], [], [], [], []]);

function handleClickAll() {
	cat.value = '全部歌单';
}

const getData = async () => {
	const { sub } = await getPlaylistCatlist();
	sub.map((item) => {
		if (item.category === 0) {
			catlist.value[0].push({ name: item.name, hot: item.hot });
		} else if (item.category === 1) {
			catlist.value[1].push({ name: item.name, hot: item.hot });
		} else if (item.category === 2) {
			catlist.value[2].push({ name: item.name, hot: item.hot });
		} else if (item.category === 3) {
			catlist.value[3].push({ name: item.name, hot: item.hot });
		} else {
			catlist.value[4].push({ name: item.name, hot: item.hot });
		}
	});
};
onMounted(getData);
</script>

<style lang="scss" scoped>
.popover {
	h3 {
		border-bottom: 1px solid #dcdfe6;
		padding-bottom: 10px;
		margin-bottom: 10px;
		cursor: pointer;
	}
	.popover-content {
		display: flex;
		.catege {
			border-right: 1px solid #ccc;
			margin-right: 10px;
			li {
				width: 70px;
				padding: 6px 0;
				display: flex;
				align-items: center;
				span {
					margin-left: 5px;
				}
			}
			li:nth-child(3) {
				margin-top: 83px;
			}
			li:nth-child(4) {
				margin-top: 27px;
			}
			li:nth-child(5) {
				margin-top: 27px;
			}
		}
		.list {
			li {
				display: flex;
				flex-wrap: wrap;
				padding: 6px 0;
			}
			span {
				line-height: 27px;
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
}
</style>
