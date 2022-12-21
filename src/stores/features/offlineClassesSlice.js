import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClassesAPI from "../../apis/classes.api";
const initialState = {
	data: [],
	status: "idie",
	error: null,
	loading: false,
};

export const fetchOfflineClasses = createAsyncThunk("fetch/classes/offline", async (limit) => {
	try {
		const response = await ClassesAPI.getOfflineClasses(limit);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const fetchOfflineClassesByPrice = createAsyncThunk(
	"fetch/classes/offline/byprice",
	async (price) => {
		try {
			const response = await ClassesAPI.getOfflineClassesByPrices(price);
			return response.data.data;
		} catch (error) {
			throw Error(error);
		}
	}
);

export const createOfflineClasses = createAsyncThunk("create/classes/offline", async (data) => {
	try {
		const response = await ClassesAPI.createOfflineClasses(data);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const editOfflineClasses = createAsyncThunk("edit/classes/offline", async (data) => {
	try {
		const response = await ClassesAPI.editOfflineClasses(data);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const deleteOfflineClasses = createAsyncThunk("delete/classes/offline", async (class_id) => {
	try {
		const response = await ClassesAPI.deleteOfflineClasses(class_id);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

const offlineClassesSlice = createSlice({
	name: "offlineClasses",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchOfflineClasses.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchOfflineClasses.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchOfflineClasses.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(fetchOfflineClassesByPrice.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchOfflineClassesByPrice.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchOfflineClassesByPrice.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createOfflineClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(editOfflineClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(deleteOfflineClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			});
	},
});

export default offlineClassesSlice.reducer;
