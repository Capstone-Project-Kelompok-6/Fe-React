import axiosInstance from "../configs/axiosInstance";

const VideoAPI = {
	async getVideo(limit, page) {
		try {
			const config = {
				params: {
					limit,
					page,
				},
			};
			const response = await axiosInstance.get("/contents", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchVideo(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/contents?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createVideoTitle(data) {
		try {
			const response = await axiosInstance.post("/contents", data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createVideo(data) {
		try {
			const video_content_id = data.video_content_id;
			const response = await axiosInstance.patch(`/contents/videos/${video_content_id}`, data, {
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
	async editVideoTitle(data) {
		try {
			const video_content_id = data.video_content_id;
			const response = await axiosInstance.patch(`/contents/${video_content_id}`, data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async editVideo(data) {
		try {
			const video_content_id = data.video_content_id;
			const response = await axiosInstance.patch(`/contents/videos/${video_content_id}`, data, {
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
	async deleteVideo(video_content_id) {
		try {
			const response = await axiosInstance.delete(`/contents/${video_content_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default VideoAPI;
