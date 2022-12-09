import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Admin/MainLayout";
import { DashboardPage, LandingPage, LoginPage, NotFoundPage } from "../pages";
import MembershipPage from "../pages/Admin/MembershipPage";
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
						</Route>
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
