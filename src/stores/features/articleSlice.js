import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ArticleAPI from "../../apis/article.api";

const initialState = {
	data: [],
	status: "idie",
	error: null,
	loading: false,
};

export const fetchArticle = createAsyncThunk("fetch/article", async (limit) => {
	try {
		const response = await ArticleAPI.getArticle(limit);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const createArticle = createAsyncThunk("create/article", async (data) => {
	try {
		const response = await ArticleAPI.createArticle(data);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const editArticle = createAsyncThunk("edit/article", async (data) => {
	try {
		const response = await ArticleAPI.editArticle(data);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

export const deleteArticle = createAsyncThunk("delete/article", async (article_id) => {
	try {
		const response = await ArticleAPI.deleteArticle(article_id);
		return response.data.data;
	} catch (error) {
		throw Error(error);
	}
});

const articleSlice = createSlice({
	name: "article",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticle.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchArticle.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchArticle.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(createArticle.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(editArticle.fulfilled, (state) => {
				state.loading = !state.loading;
			})
			.addCase(deleteArticle.fulfilled, (state) => {
				state.loading = !state.loading;
			});
	},
});

export default articleSlice.reducer;
