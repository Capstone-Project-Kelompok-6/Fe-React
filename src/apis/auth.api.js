import axiosInstance from "../configs/axiosInstance";
import Auth from "../utils/auth";

const AuthAPI = {
	async login(data) {
		try {
			const response = await axiosInstance.post("/auth/login", data);
			Auth.storeUserInfoToCookie(response.data.data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default AuthAPI;
