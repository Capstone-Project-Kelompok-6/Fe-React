import axiosInstance from "../configs/axiosInstance";

const MembershipAPI = {
	async getMembership(limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get("/users", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchMembership(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/users?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createMembership(data) {
		try {
			const response = await axiosInstance.post("/auth/register", data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async editMembership(data) {
		try {
			const response = await axiosInstance.patch("/users/email", data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default MembershipAPI;
