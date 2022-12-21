import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./features";

const store = configureStore({
	reducer: rootReducer,
	devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;
