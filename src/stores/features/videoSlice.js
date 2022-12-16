import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VideoAPI from "../../apis/video.api";

const initialState = {
	data: [],
	status: "idie",
	error: null,
	loading: false,
};

export const fetchVideo = createAsyncThunk("fetch/video", async (limit) => {
	try {
		const response = await VideoAPI.getVideo(limit);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const createVideoTitle = createAsyncThunk("create/video/title", async (data) => {
	try {
		const response = await VideoAPI.createVideoTitle(data);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const createVideo = createAsyncThunk("create/video", async (data) => {
	try {
		const response = await VideoAPI.createVideo(data);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const editVideoTitle = createAsyncThunk("edit/video/title", async (data) => {
	try {
		const response = await VideoAPI.editVideoTitle(data);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const editVideoContent = createAsyncThunk("edit/video", async (data) => {
	try {
		const response = await VideoAPI.editVideo(data);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

export const deleteVideo = createAsyncThunk("delete/video", async (video_content_id) => {
	try {
		const response = await VideoAPI.deleteVideo(video_content_id);
		return response.data.data;
	} catch (error) {
		throw Error(Error);
	}
});

const videoSlice = createSlice({
	name: "video",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideo.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchVideo.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchVideo.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createVideoTitle.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(createVideo.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(editVideoTitle.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(editVideoContent.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(deleteVideo.fulfilled, (state) => {
				state.loading = !state.loading;
			});
	},
});

export default videoSlice.reducer;
