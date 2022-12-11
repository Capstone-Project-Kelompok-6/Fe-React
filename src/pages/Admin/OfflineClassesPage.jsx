import React from "react";
import { Helmet } from "react-helmet";
import OfflineClassesList from "../../components/Admin/Classes/OfflineClassesList";
import ToTop from "../../components/ToTop";

const OfflineClassesPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Offline Classes - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<OfflineClassesList />
			<ToTop />
		</>
	);
};

export default OfflineClassesPage;
