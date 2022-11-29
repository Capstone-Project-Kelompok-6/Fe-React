import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage, LoginPage } from "../pages";

const Router = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
