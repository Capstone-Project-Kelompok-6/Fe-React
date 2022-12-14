import React from "react";
import { Helmet } from "react-helmet";
import InstructorList from "../../components/Admin/Instructor/InstructorList";

const InstructorPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Instructor - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<InstructorList />
		</>
	);
};

export default InstructorPage;
