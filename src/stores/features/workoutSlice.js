import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WorkoutAPI from "../../apis/workout.api";

const initialState = {
    data: [],
    status: "idie",
    error: null,
    loading: false,
};

export const fetchWorkoutList = createAsyncThunk("fetch/workoutList", async (limit) => {
    try {
        const response = await WorkoutAPI.getWorkout(limit);
        return response.data.data;
    } catch (error) {
        throw Error(Error);
    }
});

export const createWorkout = createAsyncThunk("create/workout", async (data) => {
    try {
        const response = await WorkoutAPI.createWorkout(data);
        return response.data.data;
    } catch (error) {
        throw Error(error);
    }
});

export const editWorkout = createAsyncThunk("edit/workout", async (data) => {
    try {
        const response = await WorkoutAPI.editWorkout(data);
        return response.data.data;
    } catch (error) {
        throw Error(Error);
    }
});

export const deleteWorkout = createAsyncThunk("delete/workout", async (workout_id) => {
    try {
        const response = await WorkoutAPI.deleteWorkout(workout_id);
        return response.data.data;
    } catch (error) {
        throw Error(Error);
    }
});

const workoutSlice = createSlice({
    name: "workout",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkoutList.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWorkoutList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchWorkoutList.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createWorkout.fulfilled, (state) => {
                state.loading = !state.loading;
            })
            .addCase(editWorkout.fulfilled, (state) => {
                state.loading = !state.loading;
            })
            .addCase(deleteWorkout.fulfilled, (state) => {
                state.loading = !state.loading;
            })
    },
});

export default workoutSlice.reducer;
