import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BookingAPI from './../../apis/booking.api';

const initialState = {
    data: [],
    status: "idie",
    error: null,
    loading: false,
};

export const fetchOnlineBookingList = createAsyncThunk("fetch/booking/online", async () => {
    try {
        const response = await BookingAPI.getOnlineBooking();
        return response.data.data;
    } catch (error) {
        throw Error(Error);
    }
});

export const deleteOnlineBooking = createAsyncThunk("delete/booking/online", async (book_id) => {
    try {
        const response = await BookingAPI.deleteOnlineBooking(book_id);
        return response.data.data;
    } catch (error) {
        throw Error(Error);
    }
});

const onlineBookingSlice = createSlice({
    name: "onlineBooking",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchOnlineBookingList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOnlineBookingList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchOnlineBookingList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteOnlineBooking.fulfilled, (state) => {
                state.loading = !state.loading;
            });
    },
});

export default onlineBookingSlice.reducer;
