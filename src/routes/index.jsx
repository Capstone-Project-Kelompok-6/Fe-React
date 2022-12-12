import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutBooking from "../components/Admin/Booking/LayoutBooking";
import LayoutClasses from "../components/Admin/Classes/LayoutClasses";
import MainLayout from "../components/Admin/MainLayout";
import {
	DashboardPage,
	InstructorPage,
	LandingPage,
	LoginPage,
	MembershipPage,
	NotFoundPage,
	OfflineClassesPage,
	OnlineClassesPage,
	WorkoutPage,
	OfflineBookingPage,
	OnlineBookingPage,
	ArticlePage,
	VideoPage,
} from "../pages";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Route>
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<MainLayout />}>
							<Route path="dashboard" element={<DashboardPage />} />
							<Route path="membership" element={<MembershipPage />} />
							<Route path="instructor" element={<InstructorPage />} />
							<Route path="workout" element={<WorkoutPage />} />
							<Route path="classes" element={<LayoutClasses />}>
								<Route path="offline" element={<OfflineClassesPage />} />
								<Route path="online" element={<OnlineClassesPage />} />
							</Route>
							<Route path="booking" element={<LayoutBooking />}>
								<Route path="offline" element={<OfflineBookingPage />} />
								<Route path="online" element={<OnlineBookingPage />} />
							</Route>
							<Route path="article" element={<ArticlePage />} />
							<Route path="video" element={<VideoPage />} />
						</Route>
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
