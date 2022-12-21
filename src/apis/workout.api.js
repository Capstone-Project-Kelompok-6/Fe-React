import axiosInstance from "../configs/axiosInstance";

const WorkoutAPI = {
	async getWorkout(limit, page) {
		try {
			const config = {
				params: {
					limit,
					page,
				},
			};
			const response = await axiosInstance.get("/workouts", config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async searchWorkout(keyword, limit) {
		try {
			const config = {
				params: {
					limit,
				},
			};
			const response = await axiosInstance.get(`/workouts?query=${keyword}`, config);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
	async createWorkout(data) {
		try {
			const response = await axiosInstance.post("/workouts", data, {
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
	async editWorkout(data) {
		try {
			const workout_id = data.workout_id;
			const response = await axiosInstance.patch(`/workouts/${workout_id}`, data, {
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
	async deleteWorkout(workout_id) {
		try {
			const response = await axiosInstance.delete(`/workouts/${workout_id}`);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default WorkoutAPI;
