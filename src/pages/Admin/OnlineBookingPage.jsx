import React from "react";
import { Helmet } from "react-helmet";
import OnlineBookingList from "../../components/Admin/Booking/OnlineBookingList";
import ToTop from "../../components/ToTop";

const OnlineBookingPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Online Booking - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<OnlineBookingList />
			<ToTop />
		</>
	);
};

export default OnlineBookingPage;
