import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

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
		const decodedAccessToken = JSON.stringify(jwt_decode(data.access_token));
		const expireAccessToken = new Date(data.exp_access);
		const expireRefreshToken = new Date(data.exp_refresh);
		Cookies.set("token", data.access_token, { expires: expireAccessToken });
		Cookies.set("rt", data.refresh_token, { expires: expireRefreshToken });
		Cookies.set("sub", decodedAccessToken, { expires: expireRefreshToken });
		return data;
	},
};

export default Auth;
