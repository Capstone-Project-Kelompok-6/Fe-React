import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoAPI from "../../../apis/video.api";
import useHook from "../../../hooks/useHook";
import {
	addButton,
	dataNotFound,
	searchInputForLgScreen,
	searchInputForSmScreen,
} from "../../../utils/globalVariable";
import ModalCreateVideo from "./ModalCreateVideo";
import SkeletonLoadingVideo from "./SkeletonLoadingVideo";
import VideoListItem from "./VideoListItem";

const Initial_Video = {
	data: [],
	status: false,
};

const VideoList = () => {
	const [video, setVideo] = useState(Initial_Video);
	const {
		modalCreateTrigger,
		setModalCreateTrigger,
		keyword,
		setKeyword,
		debouncedKeyword,
		searchTrigger,
		setSearchTrigger,
	} = useHook();
	const loading = useSelector((state) => state.video.loading);

	useEffect(() => {
		if (debouncedKeyword) {
			VideoAPI.searchVideo(debouncedKeyword.toLowerCase(), 1000).then((result) =>
				setVideo({ status: true, data: result.data.data })
			);
		} else {
			VideoAPI.getVideo(1000).then((result) => setVideo({ status: true, data: result.data.data }));
		}
	}, [loading, debouncedKeyword]);

	const handleModalCreateTrigger = () => {
		setModalCreateTrigger(!modalCreateTrigger);
	};

	const handleSearchTrigger = () => {
		setSearchTrigger(!searchTrigger);
	};

	return (
		<div className="container mx-auto px-6">
			<div className="fixed left-0 right-0 z-20 w-full bg-white bg-opacity-90 px-6 py-2 shadow-3 backdrop-blur-sm">
				<div className="flex items-center space-x-4">
					<div className="min-w-0 flex-1">
						<h2 className="text-sm font-medium text-neutral-100-2 md:pl-52 md:text-lg">
							Manage Video
						</h2>
					</div>
					<div className="inline-flex items-center text-sm font-medium text-neutral-100-2">
						<div className="relative mt-1 mr-3 mb-1 hidden w-full md:block md:w-48 lg:w-80">
							<input
								type="text"
								className={searchInputForLgScreen}
								placeholder="Search by video title"
								required
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
							/>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-dark-4">
								<i className="fi fi-rr-search mt-1 text-sm"></i>
							</div>
						</div>
						<div className="mt-1 mr-5 md:hidden">
							<button
								type="button"
								className="inset-y-0 flex items-center"
								onClick={handleSearchTrigger}>
								<i className="fi fi-rr-search mt-1 text-lg"></i>
							</button>
						</div>
						<button type="button" className={addButton} onClick={handleModalCreateTrigger}>
							<i className="fi fi-rr-plus-small mr-1 mt-1 text-sm md:text-lg"></i>
							<span className="text-xs">Add New</span>
						</button>
					</div>
				</div>
			</div>
			<div>
				{searchTrigger && (
					<div>
						<div
							className={
								searchTrigger
									? "pointer-events-auto fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
									: "pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
							}
							onClick={handleSearchTrigger}></div>
						<div className="fixed top-0 right-0 z-40 mr-32 mt-24 w-48 rounded-xl bg-white shadow-4 transition-all duration-300 md:hidden">
							<div className="relative">
								<input
									type="text"
									className={searchInputForSmScreen}
									placeholder="Search by video name"
									required
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-dark-4">
									<i className="fi fi-rr-search mt-1 text-sm"></i>
								</div>
							</div>
						</div>
					</div>
				)}
				{video.status ? (
					<div>
						{video.data.rows?.length > 0 ? (
							<div className="mb-6 grid grid-cols-1 gap-3 pt-20 pb-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
								{video.data.rows?.map((item) => {
									return <VideoListItem key={item.video_content_id} data={item} />;
								})}
							</div>
						) : (
							<div className="pt-20 pb-6">
								<div className={dataNotFound}>
									<i className="fi fi-rr-info mr-3 text-sm"></i>
									Video not found
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="mb-6 grid grid-cols-1 gap-3 pt-20 pb-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
						<SkeletonLoadingVideo />
						<SkeletonLoadingVideo />
						<SkeletonLoadingVideo />
					</div>
				)}
				{modalCreateTrigger && (
					<ModalCreateVideo handleModalCreateTrigger={handleModalCreateTrigger} />
				)}
			</div>
		</div>
	);
};

export default VideoList;
