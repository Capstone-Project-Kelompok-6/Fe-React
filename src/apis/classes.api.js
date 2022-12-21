import axiosInstance from "../configs/axiosInstance";

const ClassesAPI = {
	// Offline Classes API
	async getOfflineClasses(limit, page) {
		try {
			const config = {
				params: {
					limit,
					page,
				},
			};
			const response = await axiosInstance.get("/classes/offline", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async getOfflineClassesByPrices(price) {
		try {
			const response = await axiosInstance.get(`/classes/offline?price=${price}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async serchOfflineClasses(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/classes/offline?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async filterOfflineClasses(workout, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/classes/offline?workout=${workout}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createOfflineClasses(data) {
		try {
			const response = await axiosInstance.post("/classes/offline", data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async editOfflineClasses(data) {
		try {
			const class_id = data.class_id;
			const response = await axiosInstance.patch(`/classes/offline/${class_id}`, data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async deleteOfflineClasses(class_id) {
		try {
			const response = await axiosInstance.delete(`/classes/offline/${class_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},

	// Online Classes API
	async getOnlineClasses(limit, page) {
		try {
			const config = {
				params: {
					limit,
					page,
				},
			};
			const response = await axiosInstance.get("/classes/online", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async serchOnlineClasses(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/classes/online?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async filterOnlineClasses(workout, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/classes/online?workout=${workout}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createOnlineClasses(data) {
		try {
			const response = await axiosInstance.post("/classes/online", data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createOnlineVideoClasses(data) {
		try {
			const response = await axiosInstance.put("/classes/online/video", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async editOnlineClasses(data) {
		try {
			const class_id = data.class_id;
			const response = await axiosInstance.patch(`/classes/online/${class_id}`, data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async editOnlineVideoClasses(data) {
		try {
			const response = await axiosInstance.put(`/classes/online/video`, data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async deleteOnlineClasses(class_id) {
		try {
			const response = await axiosInstance.delete(`/classes/online/${class_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default ClassesAPI;
