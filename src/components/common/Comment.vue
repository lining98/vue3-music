<template>
	<!-- 封装评论组件 -->
	<div class="comment">
		<!-- 评论区 -->
		<div class="submitComment" v-if="isLogin">
			<el-input
				ref="commentTextarea"
				v-model="content"
				type="textarea"
				show-word-limit
				maxlength="140"
				placeholder="留下你的评论"
			></el-input>
			<el-button type="primary" @click="sendComment">评论</el-button>
		</div>
		<div>
			<div v-if="type === 0">
				<CommentList title="热门评论" :comments="hotComents" :isHot="true" :isSong="true" />
				<CommentList title="最新评论" :comments="newComents" :isHot="false" :isSong="true" />
			</div>
			<div v-else>
				<CommentList
					title="热门评论"
					:comments="hotComents"
					:isHot="true"
					:isSong="false"
					:reply="(item) => toReply(item)"
				/>
				<CommentList
					title="最新评论"
					:comments="newComents"
					:isHot="false"
					:isSong="false"
					:reply="(item) => toReply(item)"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useCommentStore } from '@/store/comment';
import { comment } from '@/api/comment';
import { ElMessage } from 'element-plus';
import { throttle } from '@/utils/utils';
import CommentList from './CommentList.vue';

const isLogin: boolean = Boolean(localStorage.getItem('cookie'));

const { commentNew, commentSongNew } = useCommentStore();
const { id, type, hotComents, newComents } = defineProps(['id', 'type', 'hotComents', 'newComents']);
const content = ref('');
const commentTextarea = ref('');
const params = reactive({
	t: 1,
	id: id,
	type: type,
	content: content.value,
});
const replyParams = reactive({
	t: 2,
	type: type,
	id: id,
	commentId: 0,
	content: content.value,
});
// 发送评论
const sendComment = throttle(async () => {
	let res;
	if (content.value.indexOf('回复') == -1) {
		params.content = content.value;
		res = await comment(params);
	} else {
		replyParams.content = content.value.split('：')[1];
		res = await comment(replyParams);
	}
	if (res.code === 200) {
		ElMessage.success('评论成功');
		setTimeout(() => {
			params.type === 0 ? commentSongNew({ id: id, type: type }) : commentNew({ id: id, type: type });
		}, 500);

		content.value = '';
	} else {
		ElMessage.error(res.message);
	}
}, 800);

// 回复
const toReply = async (item) => {
	content.value = `回复 - ${item.user.nickname}：`;
	commentTextarea.value.focus();
	replyParams.commentId = item.commentId;
};
</script>

<style lang="scss" scoped>
.comment {
	margin-top: 15px;
	//   评论区
	.submitComment {
		overflow: hidden;
		button {
			float: right;
			margin-top: 10px;
		}
	}
}
</style>
