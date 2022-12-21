import axiosInstance from "../configs/axiosInstance";

const InstructorAPI = {
	async getInstructor(limit, page) {
		try {
			const config = {
				params: {
					limit,
					page,
				},
			};
			const response = await axiosInstance.get("/instructors", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchInstructor(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/instructors?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createInstructor(data) {
		try {
			const response = await axiosInstance.post("/instructors", data, {
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
	async editInstructor(data) {
		try {
			const instructor_id = data.instructor_id;
			const response = await axiosInstance.patch(`/instructors/${instructor_id}`, data, {
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
	async deleteInstructor(instructor_id) {
		try {
			const response = await axiosInstance.delete(`/instructors/${instructor_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default InstructorAPI;
