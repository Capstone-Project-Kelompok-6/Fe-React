import { combineReducers } from "@reduxjs/toolkit";

import workoutSlice from "./workoutSlice";
import instructorSlice from "./instructorSlice";
import offlineClassesSlice from "./offlineClassesSlice";
import onlineClassesSlice from "./onlineClassesSlice";
import offlineBookingSlice from "./offlineBookingSlice";
import membershipSlice from "./membershipSlice";
import onlineBookingSlice from "./onlineBookingSlice";

export const rootReducer = combineReducers({
	workout: workoutSlice,
	instructor: instructorSlice,
	offlineClasses: offlineClassesSlice,
	onlineClasses: onlineClassesSlice,
	offlineBooking: offlineBookingSlice,
	onlineBooking: onlineBookingSlice,
	membership: membershipSlice,
});
