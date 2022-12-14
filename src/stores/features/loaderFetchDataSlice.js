import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const loaderFetchDataSlice = createSlice({
  name: "loaderFetchData",
  initialState,
  reducers: {
    setLoaderFetchData: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setLoaderFetchData } = loaderFetchDataSlice.actions;
export default loaderFetchDataSlice.reducer;
