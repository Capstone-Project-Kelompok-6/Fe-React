import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PaymentAPI from "../../apis/payment.api";

const initialState = {
	data: [],
	status: "idie",
	error: null,
	loading: false,
};

export const createPayment = createAsyncThunk("create/payment", async (data) => {
	try {
		const response = await PaymentAPI.payment(data);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

const paymentSlice = createSlice({
	name: "payment",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(createPayment.fulfilled, (state) => {
			state.loading = !state.loading;
		});
	},
});

export default paymentSlice.reducer;
