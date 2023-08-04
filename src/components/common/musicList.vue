<template>
	<div class="songlist">
		<el-table
			:data="musicArr"
			style="width: 100%"
			:row-class-name="tableRowClassName"
			@row-dblclick="playSong"
			@row-contextmenu="contextmenu"
		>
			<el-table-column type="index" width="50">
				<template #default="scope, index">
					<IconPark v-if="scope.row.id === song.id" :icon="VolumeSmall" theme="filled" />
					<span v-else>{{ scope.row.index }}</span>
				</template>
			</el-table-column>
			<el-table-column width="50" v-if="isLogin && showLike">
				<template #default="scope">
					<IconPark :icon="Like" size="16" :class="scope.row.like ? 'like' : ''" @click="like(scope.row.id)" />
				</template>
			</el-table-column>
			<el-table-column prop="name" label="音乐标题" min-width="300" />
			<el-table-column v-if="showArName" prop="ar[0].name" label="歌手" min-width="160">
				<template #default="scope">
					<span v-for="(author, index) in scope.row.ar" :key="author.id">
						<span class="clickable" @click="toSingerDetails(author.id)">
							{{ author.name }}
						</span>
						<!-- 最后一个歌手后面不加分隔符 -->
						<span v-if="index != scope.row.ar.length - 1">/</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="al.name" label="专辑" min-width="260">
				<template #default="scope">
					<span class="clickable" @click="toAlbumDetails(scope.row.al.id)">{{ scope.row.al.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="dt" label="时间" min-width="80">
				<template #default="scope">
					<span>{{ useFormatDuring(scope.row.dt) }}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import IconPark from '@/components/common/IconPark.vue';
import { Like, VolumeSmall } from '@icon-park/vue-next';
import { useFormatDuring } from '@/utils/format';
import { usePlayerStore } from '@/store/player';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';

const props = defineProps<{
	musicArr?: [];
	showArName: boolean;
	showLike: boolean;
	like?: () => void;
}>();

const router = useRouter();
const isLogin: boolean = Boolean(localStorage.getItem('cookie'));
const { song } = storeToRefs(usePlayerStore());
const { play, pushPlayList } = usePlayerStore();
const playSong = (row: any) => {
	play(row.id);
	if (props.musicArr) {
		pushPlayList(true, ...props.musicArr);
	}
};

function tableRowClassName({ row, rowIndex }: { row: any; rowIndex: number }) {
	if (row.id == song.value.id) {
		return 'active';
	}
}

function toSingerDetails(id: number) {
	if (id) {
		router.push({
			name: 'artistDetail',
			query: { id: id },
		});
	} else {
		ElMessage.error('无相关艺人');
	}
}
function toAlbumDetails(id: number) {
	router.push({
		name: 'albumDetail',
		query: { id: id },
	});
}

// 右键点击事件
function contextmenu(row, column, event) {
	// location.assign('http://121.40.174.152/music')
	// console.log(row);
	// console.log(column);
	// console.log(event);
	// event.preventDefault()
}
</script>

<style lang="scss" scoped>
.songlist {
	.title {
		display: flex;
		align-items: flex-end;
		border-bottom: 3px solid #34d399;
		h3 {
			font-size: 22px;
			margin-right: 10px;
		}
	}
	.like {
		color: red;
	}
	:deep(.cell) {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
