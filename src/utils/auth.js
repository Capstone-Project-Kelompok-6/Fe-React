import Cookies from "js-cookie";

const Auth = {
	isAuthorization() {
		if (Cookies.get("token") || Cookies.get("rt")) return true;
		return null;
	},
	getRefreshToken() {
		return Cookies.get("rt");
	},
	getAccessToken() {
		return Cookies.get("token");
	},
	getUserDetail() {
		const user = JSON.parse(Cookies.get("sub"));
		return user;
	},
	removeRefreshToken() {
		Cookies.remove("rt");
		Cookies.remove("token");
	},
	signOut() {
		Cookies.remove("token");
		Cookies.remove("rt");
		Cookies.remove("sub");
	},
	storeUserInfoToCookie(data) {
		if (!data.access_token || !data.refresh_token) return null;
		const expireAccessToken = new Date(data.exp_access);
		const expireRefreshToken = new Date(data.exp_refresh);
		Cookies.set("token", data.access_token, { expires: expireAccessToken });
		Cookies.set("rt", data.refresh_token, { expires: expireRefreshToken });
		Cookies.set("sub", data.full_name, { expires: expireAccessToken });
		return data;
	},
};

export default Auth;