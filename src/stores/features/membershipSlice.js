import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MembershipAPI from "../../apis/membership.api";

const initialState = {
    data: [],
    status: "idie",
    error: null,
    loading: false,
};

export const fetchMembership = createAsyncThunk("fetch/membership", async (limit) => {
    try {
        const response = await MembershipAPI.getMembership(limit);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

export const createMembership = createAsyncThunk("create/membership", async (data) => {
    try {
        const response = await MembershipAPI.createMembership(data);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

export const editMembership = createAsyncThunk("edit/membership", async (data) => {
    try {
        const response = await MembershipAPI.editMembership(data);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

const membershipSlice = createSlice({
    name: "membership",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembership.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMembership.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchMembership.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createMembership.fulfilled, (state) => {
                state.loading = !state.loading;
            })
            .addCase(editMembership.fulfilled, (state) => {
                state.loading = !state.loading;
            });
    },
});

export default membershipSlice.reducer;
