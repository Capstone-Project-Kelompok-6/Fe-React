import React from "react";
import { Helmet } from "react-helmet";
import OnlineClassesList from "../../components/Admin/Classes/OnlineClassesList";
import ToTop from "../../components/ToTop";

const OnlineClassesPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Online Classes - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<OnlineClassesList />
			<ToTop />
		</>
	);
};

export default OnlineClassesPage;
