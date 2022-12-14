import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loaderSubmitSlice = createSlice({
  name: "loaderSubmit",
  initialState,
  reducers: {
    setLoaderSubmit: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setLoaderSubmit } = loaderSubmitSlice.actions;
export default loaderSubmitSlice.reducer;
