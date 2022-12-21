import React from "react";
import { Helmet } from "react-helmet";
import VideoList from "../../components/Admin/Video/VideoList";
import ToTop from "../../components/ToTop";

const VideoPage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Video - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<VideoList />
			<ToTop />
		</>
	);
};

export default VideoPage;
