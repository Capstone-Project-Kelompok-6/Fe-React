import React from "react";
import { Helmet } from "react-helmet";
import VideoList from "../../components/Admin/Video/VideoList";
import ToTop from "../../components/ToTop";

const VideoPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Video - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<VideoList />
			<ToTop />
		</>
	);
};

export default VideoPage;
