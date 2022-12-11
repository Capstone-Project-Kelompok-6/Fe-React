import React from "react";
import { Helmet } from "react-helmet";
import Overview from "../../components/Admin/Overview";

const DashboardPage = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<Overview />
		</>
	);
};

export default DashboardPage;
