import React from "react";
import { Helmet } from "react-helmet";
import Overview from "../../components/Admin/Overview";

const DashboardPage = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<Overview />
		</>
	);
};

export default DashboardPage;
