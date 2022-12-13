import axiosInstance from "../configs/axiosInstance";

const PaymentAPI = {
	async payment(data) {
		try {
			const book_id = data.book_id;
			const response = await axiosInstance.post(`/payments/${book_id}`, data);
			return response;
		} catch (error) {
			const { message } = error.response.data;
			throw new Error(message);
		}
	},
};

export default PaymentAPI;
