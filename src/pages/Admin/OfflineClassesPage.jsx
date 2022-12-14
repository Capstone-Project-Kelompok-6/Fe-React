import React from "react";
import { Helmet } from "react-helmet";
import OfflineClassesList from "../../components/Admin/Classes/OfflineClassesList";
import ToTop from "../../components/ToTop";

const OfflineClassesPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Offline Classes - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<OfflineClassesList />
			<ToTop />
		</>
	);
};

export default OfflineClassesPage;
