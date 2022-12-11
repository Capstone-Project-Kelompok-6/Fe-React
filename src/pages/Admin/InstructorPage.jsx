import React from "react";
import { Helmet } from "react-helmet";
import InstructorList from "../../components/Admin/Instructor/InstructorList";

const InstructorPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Instructor - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<InstructorList />
		</>
	);
};

export default InstructorPage;
