import React from "react";
import { Helmet } from "react-helmet";
import WorkoutList from "../../components/Admin/Workout/WorkoutList";

const WorkoutPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Workout - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<WorkoutList />
		</>
	);
};

export default WorkoutPage;
