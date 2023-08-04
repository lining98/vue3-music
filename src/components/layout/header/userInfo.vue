<template>
	<div class="login">
		<el-dropdown style="" v-if="isLogin">
			<span class="el-dropdown-link">
				<ElAvatar size="default" round :src="profile?.avatarUrl ?? ''"></ElAvatar>

				<span class="user" style="margin-left: 5px; font-size: 15px">{{ profile.nickname }}</span>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item @click="quit"> 退出 </el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<el-link v-else class="user" type="primary" @click="showLoginModal">请登录</el-link>
	</div>

	<!-- 登录窗口 二维码 -->
	<el-dialog v-model="showLogin" title="登录" width="500" :close-on-click-modal="false" :before-close="handleClose">
		<div class="loginImg">
			<h3>{{ account.message }}</h3>
			<div v-if="!account.avatarUrl">
				<div v-loading="loading">
					<img :src="qrimg" title="点击刷新二维码" @click="changeImg" />
					<p>请用网易云App扫码登录！</p>
				</div>
			</div>
			<div v-else>
				<img :src="account.avatarUrl" alt="" />
				<p>{{ account.nickname }}</p>
			</div>
		</div>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getLogout, getKey, qrCreate, qrCheck, loginStatus } from '@/api/login';

const { getLikeList } = useUserStore();
const router = useRouter();

const { userId, isLogin, profile, showLogin } = storeToRefs(useUserStore());
const { getPlaylist } = useUserStore();

const qrimg = ref('');
let timer: NodeJS.Timer;


const checkStatus = async (key) => {
	return await qrCheck(key);
};
const getLoginStatus = async (cookie = '') => {
	const { data } = await loginStatus({ cookie: cookie });
	localStorage.setItem('USER', JSON.stringify(data.profile));
	profile.value = data.profile;
	userId.value = data.profile?.userId;
};

const loading = ref(false);
const account = reactive({
	message: '等待扫码',
	nickname: '',
	avatarUrl: '',
});

const showLoginModal = () => {
	showLogin.value = true;
	handleLogin();
};

const changeImg = () => {
	handleLogin();
};

const handleLogin = async () => {
	loading.value = true;
	const cookie = localStorage.getItem('cookie');
	getLoginStatus(cookie);
	const { code, unikey } = await getKey();
	const res: any = await qrCreate(unikey);
	qrimg.value = res.qrimg;
	loading.value = false;

	timer = setInterval(async () => {
		const statusRes: any = await checkStatus(unikey);
		account.message = statusRes.message;
		if (statusRes.code === 800) {
			ElMessage.error('二维码已过期,请重新获取');
			qrimg.value = '';
			clearInterval(timer);
		}
		if (statusRes.code === 802) {
			account.nickname = statusRes.nickname;
			account.avatarUrl = statusRes.avatarUrl;
		}
		if (statusRes.code === 803) {
			// 这一步会返回cookie
			await getLoginStatus(statusRes.cookie);
			localStorage.setItem('cookie', statusRes.cookie);
			getPlaylist(userId.value);
			getLikeList(userId.value);
			ElMessage.success('授权登录成功');
			clearInterval(timer);
			showLogin.value = false;
		}
	}, 3000);
};

const handleClose = (done: () => void) => {
	clearInterval(timer);
	showLogin.value = false;
};

const quit = () => {
	ElMessageBox.confirm('确定要退出登录吗?', '退出登录', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			logout();
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消退出登录',
			});
		});
};

const logout = async () => {
	const res = await getLogout();
	if (res.code === 200) {
		ElMessage.success('已退出登录');
		localStorage.clear();
		router.go(0);
	}
};

const getUser = () => {
	const details = JSON.parse(localStorage.getItem('USER'));
	profile.value = details;
	getPlaylist(details?.userId);
};

onMounted(() => {
	if (localStorage.getItem('cookie')) {
		getUser();
	}
});
</script>

<style lang="scss" scoped>
.login {
	font-size: 14px;
	display: flex;
	align-items: center;
	.el-dropdown-link {
		display: flex;
		align-items: center;
		outline: none;
	}
	.user {
		margin-left: 10px;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
}
.loginImg {
	min-height: 250px;
	text-align: center;
	padding-bottom: 20px;
	img {
		width: 250px;
		height: 250px;
		cursor: pointer;
	}
}
</style>
