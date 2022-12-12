import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InstructorAPI from "../../apis/instructor.api";

const initialState = {
    data: [],
    status: "idie",
    error: null,
    loading: false,
};

export const fetchInstructor = createAsyncThunk("fetch/instructor", async (limit) => {
    try {
        const response = await InstructorAPI.getInstructor(limit);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

export const createInstructor = createAsyncThunk("create/instructor", async (data) => {
    try {
        const response = await InstructorAPI.createInstructor(data);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

export const editInstructor = createAsyncThunk("edit/instructor", async (data) => {
    try {
        const response = await InstructorAPI.editInstructor(data);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

export const deleteInstructor = createAsyncThunk("delete/instructor", async (instructor_id) => {
    try {
        const response = await InstructorAPI.deleteInstructor(instructor_id);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

const instructorSlice = createSlice({
    name: "instructor",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstructor.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInstructor.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchInstructor.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createInstructor.fulfilled, (state) => {
                state.loading = !state.loading;
            })
            .addCase(createInstructor.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(editInstructor.fulfilled, (state) => {
                state.loading = !state.loading;
            })
            .addCase(deleteInstructor.fulfilled, (state) => {
                state.loading = !state.loading;
            });
    },
});

export default instructorSlice.reducer;
