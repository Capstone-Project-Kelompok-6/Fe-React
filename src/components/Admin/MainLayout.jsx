import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import audio from "../../assets/audio/notification.mp3";
import Pusher from "pusher-js";
import CONST from "../../utils/constants";
import Swal from "sweetalert2";

const MainLayout = () => {
	const [drawerTrigger, setdrawerTrigger] = useState(false);
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

	const handledrawerTrigger = () => {
		setdrawerTrigger(!drawerTrigger);
	};

	return (
		<>
			<div className="flex h-full overflow-y-auto">
				<Sidebar />
				<Drawer drawerTrigger={drawerTrigger} handledrawerTrigger={handledrawerTrigger} />
				<div className="flex w-full flex-1 flex-col">
					<Header handledrawerTrigger={handledrawerTrigger} />
					<div className="pl-0 pt-14 md:pl-52 lg:pl-52">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default MainLayout;
