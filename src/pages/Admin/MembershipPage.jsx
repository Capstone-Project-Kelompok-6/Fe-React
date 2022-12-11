import React from "react";
import { Helmet } from "react-helmet";
import MembershipList from "../../components/Admin/Membership/MembershipList";
import ToTop from "../../components/ToTop";

const MembershipPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Membership - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<MembershipList />
			<ToTop />
		</>
	);
};

export default MembershipPage;
