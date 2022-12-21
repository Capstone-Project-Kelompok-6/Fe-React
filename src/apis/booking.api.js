import axiosInstance from "../configs/axiosInstance";

const BookingAPI = {
	// Offline Booking API
	async getOfflineBooking(limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get("/books/offline", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchOfflineBooking(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/books/offline?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async filterOfflineBooking(workout, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/books/offline?workout=${workout}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createOfflineBooking(data) {
		try {
			const response = await axiosInstance.post("/books/offline", data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async editOfflineBooking(data) {
		try {
			const book_id = data.book_id;
			const response = await axiosInstance.patch(`/books/offline/${book_id}`, data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async deleteOfflineBooking(book_id) {
		try {
			const response = await axiosInstance.delete(`/books/offline/${book_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},

	// Online Booking API
	async getOnlineBooking(limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get("/books/online", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchOnlineBooking(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/books/online?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async filterOnlineBooking(workout, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/books/online?workout=${workout}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async deleteOnlineBooking(data) {
		try {
			const book_id = data.book_id;
			const response = await axiosInstance.delete(`/books/online/${book_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default BookingAPI;
