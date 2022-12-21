import axiosInstance from "../configs/axiosInstance";

const ArticleAPI = {
	async getArticle(limit, page) {
		try {
			const config = {
				params: {
					limit,
					page,
				},
			};
			const response = await axiosInstance.get("/articles", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchArticle(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/articles?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createArticle(data) {
		try {
			const response = await axiosInstance.post("/articles", data, {
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
	async editArticle(data) {
		try {
			const article_id = data.article_id;
			const response = await axiosInstance.patch(`/articles/${article_id}`, data, {
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
	async deleteArticle(article_id) {
		try {
			const response = await axiosInstance.delete(`/articles/${article_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default ArticleAPI;
