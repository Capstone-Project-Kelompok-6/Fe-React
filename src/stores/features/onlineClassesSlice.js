import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClassesAPI from "../../apis/classes.api";
const initialState = {
	data: [],
	status: "idie",
	error: null,
	loading: false,
};

export const fetchOnlineClasses = createAsyncThunk("fetch/classes/online", async (limit) => {
	try {
		const response = await ClassesAPI.getOnlineClasses(limit);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const fetchOnlineClassesByPrice = createAsyncThunk(
	"fetch/classes/online/byprice",
	async (price) => {
		try {
			const response = await ClassesAPI.getOnlineClassesByPrices(price);
			return response.data.data;
		} catch (error) {
			throw Error(Error);
		}
	}
);

export const createOnlineClasses = createAsyncThunk("create/classes/online", async (data) => {
	try {
		const response = await ClassesAPI.createOnlineClasses(data);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const createOnlineVideoClasses = createAsyncThunk(
	"create/classes/online/video",
	async (data) => {
		try {
			const response = await ClassesAPI.createOnlineVideoClasses(data);
			return response.data.data;
		} catch (error) {
			throw Error(Error);
		}
	}
);

export const editOnlineClasses = createAsyncThunk("edit/classes/online", async (data) => {
	try {
		const response = await ClassesAPI.editOnlineClasses(data);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const editOnlineVideoClasses = createAsyncThunk(
	"edit/classes/online/video",
	async (data) => {
		try {
			const response = await ClassesAPI.editOnlineVideoClasses(data);
			return response.data.data;
		} catch (error) {
			throw Error(Error);
		}
	}
);

export const deleteOnlineClasses = createAsyncThunk("delete/classes/online", async (class_id) => {
	try {
		const response = await ClassesAPI.deleteOnlineClasses(class_id);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

const classesSlice = createSlice({
	name: "onlineClasses",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchOnlineClasses.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchOnlineClasses.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchOnlineClasses.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(fetchOnlineClassesByPrice.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchOnlineClassesByPrice.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchOnlineClassesByPrice.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createOnlineClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(createOnlineVideoClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(editOnlineClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(editOnlineVideoClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(deleteOnlineClasses.fulfilled, (state) => {
				state.loading = !state.loading;
			});
	},
});

export default classesSlice.reducer;
