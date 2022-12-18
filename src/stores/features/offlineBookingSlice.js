import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookingAPI from "./../../apis/booking.api";

const initialState = {
	data: [],
	status: "idie",
	error: null,
	loading: false,
};

export const fetchOfflineBookingList = createAsyncThunk("fetch/booking/offline", async (limit) => {
	try {
		const response = await BookingAPI.getOfflineBooking(limit);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const createOfflineBooking = createAsyncThunk("create/booking/offline", async (data) => {
	try {
		const response = await BookingAPI.createOfflineBooking(data);
		return response.data;
	} catch (error) {
		throw Error(error);
	}
});

export const editOfflineBooking = createAsyncThunk("edit/booking/offline", async (data) => {
	try {
		const response = await BookingAPI.editOfflineBooking(data);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const deleteOfflineBooking = createAsyncThunk("delete/booking/offline", async (book_id) => {
	try {
		const response = await BookingAPI.deleteOfflineBooking(book_id);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

const onlineBookingSlice = createSlice({
	name: "offlineBooking",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchOfflineBookingList.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchOfflineBookingList.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchOfflineBookingList.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createOfflineBooking.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(editOfflineBooking.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(deleteOfflineBooking.fulfilled, (state) => {
				state.loading = !state.loading;
			});
	},
});

export default onlineBookingSlice.reducer;
