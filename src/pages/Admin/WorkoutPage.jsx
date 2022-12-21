import React from "react";
import { Helmet } from "react-helmet";
import WorkoutList from "../../components/Admin/Workout/WorkoutList";

const WorkoutPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Workout - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<WorkoutList />
		</>
	);
};

export default WorkoutPage;
