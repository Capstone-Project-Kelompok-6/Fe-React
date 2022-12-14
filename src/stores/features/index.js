import { combineReducers } from "@reduxjs/toolkit";

import articleSlice from "./articleSlice";
import workoutSlice from "./workoutSlice";
import instructorSlice from "./instructorSlice";
import offlineClassesSlice from "./offlineClassesSlice";
import onlineClassesSlice from "./onlineClassesSlice";
import offlineBookingSlice from "./offlineBookingSlice";
import membershipSlice from "./membershipSlice";
import onlineBookingSlice from "./onlineBookingSlice";
import videoSlice from "./videoSlice";
import paymentSlice from "./paymentSlice";
import loaderFetchDataSlice from "./loaderFetchDataSlice";
import loaderSubmitSlice from "./loaderSubmitSlice";

export const rootReducer = combineReducers({
  article: articleSlice,
  workout: workoutSlice,
  instructor: instructorSlice,
  loaderFetchData: loaderFetchDataSlice,
  loaderSubmit: loaderSubmitSlice,
  offlineClasses: offlineClassesSlice,
  onlineClasses: onlineClassesSlice,
  offlineBooking: offlineBookingSlice,
  onlineBooking: onlineBookingSlice,
  membership: membershipSlice,
  payment: paymentSlice,
  video: videoSlice,
});
