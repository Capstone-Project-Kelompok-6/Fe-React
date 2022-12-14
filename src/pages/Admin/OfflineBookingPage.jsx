import React from "react";
import { Helmet } from "react-helmet";
import OfflineBookingList from "../../components/Admin/Booking/OfflineBookingList";
import ToTop from "../../components/ToTop";

const OfflineBookingPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Offline Booking - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<OfflineBookingList />
			<ToTop />
		</>
	);
};

export default OfflineBookingPage;
