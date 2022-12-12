import axiosInstance from "../configs/axiosInstance";

const ArticleAPI = {
	async getArticle() {
		try {
			const response = await axiosInstance.get("/articles");
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchArticle(keyword) {
		try {
			const response = await axiosInstance.get(`/articles?query=${keyword}`);
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
