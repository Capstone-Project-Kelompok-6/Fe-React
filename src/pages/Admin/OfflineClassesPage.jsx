import React from "react";
import { Helmet } from "react-helmet";
import OfflineClassesList from "../../components/Admin/Classes/OfflineClassesList";
import ToTop from "../../components/ToTop";
import audio from "../../assets/audio/notification.mp3";
import Pusher from "pusher-js";
import CONST from "../../utils/constants";
import Swal from "sweetalert2";

const OfflineClassesPage = () => {
	const playAudio = () => {
		const audioToPlay = new Audio(audio);
		audioToPlay.play();
	};

	const pusher = new Pusher(CONST.PUSHER_KEY, {
		cluster: "ap1",
	});

	const channel = pusher.subscribe("my-channel");

	channel.bind("notification", (data) => {
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});

		Toast.fire({
			icon: "success",
			title: data,
		});
		playAudio();
	});

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
