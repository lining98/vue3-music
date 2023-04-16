export interface IUserProfile {
  loginType: number;
  account: Account;
  token: string;
  profile: Profile;
  bindings: Bingdings[];
  cookie: string;
}

interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  salt: string;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  viptypeVersion: number;
  uninitialized: boolean;
  anonimousUser: boolean;
}

interface Profile {
  backgroundImgIdStr: string;
  avatarImgIdStr: string;
  followed: boolean;
  backgroundUrl: string;
  defaultAvatar: boolean;
  mutual: boolean;
  remarkName?: any;
  userType: number;
  vipType: number;
  authStatus: number;
  djStatus: number;
  detailDescription: "";
  experts: {};
  expertTags?: any;
  accountStatus: number;
  nickname: string;
  birthday: number;
  gender: number;
  province: number;
  city: number;
  avatarImgId: number;
  backgroundImgId: number;
  avatarUrl: string;
  description: string;
  signature: string;
  authority: number;
  avatarImgId_str: string;
  followeds: number;
  follows: number;
  eventCount: number;
  avatarDetail?: any;
  playlistCount: number;
  playlistBeSubscribedCount: number;
}

interface Bingdings {
  bindingTime: number;
  refreshTime: number;
  tokenJsonStr: string;
  expiresIn: number;
  expired: boolean;
  url: string;
  userId: number;
  id: number;
  type: number;
}

export interface UserProfile {
	userId: number;
	userType: number;
	nickname: string;
	avatarImgId: number;
	avatarUrl: string;
	backgroundImgId: number;
	backgroundUrl: string;
	signature?: any;
	createTime: number;
	userName: string;
	accountType: number;
	shortUserName: string;
	birthday: number;
	authority: number;
	gender: number;
	accountStatus: number;
	province: number;
	city: number;
	authStatus: number;
	description?: any;
	detailDescription?: any;
	defaultAvatar: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	locationStatus: number;
	vipType: number;
	followed: boolean;
	mutual: boolean;
	authenticated: boolean;
	lastLoginTime: number;
	lastLoginIP: string;
	remarkName?: any;
	viptypeVersion: number;
	authenticationTypes: number;
	avatarDetail?: any;
	anchor: boolean;
}

