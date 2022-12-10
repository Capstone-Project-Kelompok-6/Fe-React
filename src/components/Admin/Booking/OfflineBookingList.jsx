import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import { activeTab, addButton, dataNotFound, notActiveTab, searchInputForLgScreen, searchInputForSmScreen } from "../../../utils/globalVariable";
import BookingHeader from "./BookingHeader";
import BookingTabs from "./BookingTabs";
import BookingAPI from "./../../../apis/booking.api";
import OfflineBookingListItem from "./OfflineBookingListItem";
import SkeletonLoadingBooking from "./SkeletonLoadingBooking";
import ModalCreateOfflineBooking from "./ModalCreateOfflineBooking";
import WorkoutAPI from "../../../apis/workout.api";
import SkeletonLoadingTabs from "../SkeletonLoadingTabs";

const Initial_Offline_Booking = {
	data: [],
	page: 0,
	status: false,
};

const OfflineBookingList = () => {
	const [offlineBooking, setOfflineBooking] = useState(Initial_Offline_Booking);
	const [workout, setWorkout] = useState(Initial_Offline_Booking);
	const [modalCreateTrigger, setModalCreateTrigger] = useState(false);
	const [searchTrigger, setSearchTrigger] = useState(false);
	const [keyword, setKeyword] = useState("");
	const loading = useSelector((state) => state.offlineBooking.loading);
	const [debouncedKeyword] = useDebounce(keyword, 1300);
	const loadingWorkout = useSelector((state) => state.workout.loading);
	const [active, setActive] = useState(0);

	useEffect(() => {
		if (debouncedKeyword) {
			BookingAPI.searchOfflineBooking(debouncedKeyword.toLowerCase()).then((result) => setOfflineBooking({ status: true, data: result.data.data }));
		} else {
			setTimeout(
				() =>
					BookingAPI.getOfflineBooking().then((result) =>
						setOfflineBooking({
							status: true,
							data: result.data.data,
						})
					),
				1300
			);
		}
	}, [loading, debouncedKeyword]);

	useEffect(() => {
		setTimeout(() => WorkoutAPI.getWorkout().then((result) => setWorkout({ status: true, data: result.data.data })), 1300);
	}, [loadingWorkout]);

	const filterItem = (workout_id) => {
		setTimeout(
			() =>
				BookingAPI.filterOfflineBooking(workout_id).then((result) =>
					setOfflineBooking({
						status: true,
						data: result.data.data,
					})
				),
			500
		);
		setActive(workout_id);
	};

	const filterAll = () => {
		setActive(0);
	};

	const handleModalCreateTrigger = () => {
		setModalCreateTrigger(!modalCreateTrigger);
	};

	const handleSearchTrigger = () => {
		setSearchTrigger(!searchTrigger);
	};

	return (
		<div className="container mx-auto px-6">
			<div className="fixed left-0 right-0 z-20 w-full bg-white bg-opacity-90 px-6 py-2 shadow-3 backdrop-blur-sm">
				<BookingHeader />
				<div className="md:pl-52">
					<div className="mb-2 flex items-center border-b border-gray-200">
						<div className="min-w-0 flex-1">
							<BookingTabs />
						</div>
						<div className="inline-flex items-center text-sm font-medium text-neutral-100-2">
							<div className="relative mt-1 mr-3 mb-1 hidden w-full md:block md:w-48 lg:w-80">
								<input
									type="text"
									className={searchInputForLgScreen}
									placeholder="Search by membership name"
									required
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-dark-4">
									<i className="fi fi-rr-search mt-1 text-sm"></i>
								</div>
							</div>
							<div className="mt-1 mr-5 md:hidden">
								<button type="button" className="inset-y-0 flex items-center" onClick={handleSearchTrigger}>
									<i className="fi fi-rr-search mt-1 text-lg"></i>
								</button>
							</div>
							<button type="button" className={addButton} onClick={handleModalCreateTrigger}>
								<i className="fi fi-rr-plus-small mr-1 mt-1 text-sm md:text-lg"></i>
								<span className="text-xs">Add New</span>
							</button>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 lg:col-span-3">
						<div className="relative">
							<div className="relative">
								<div className="sm:block">
									<ul className="-mb-px flex list-none overflow-x-scroll whitespace-nowrap text-center text-xs font-medium scrollbar-hide">
										<li className="mr-2">
											<button
												className={active === 0 ? activeTab : notActiveTab}
												onClick={() => {
													filterAll();
													setTimeout(
														() =>
															BookingAPI.getOfflineBooking().then((result) =>
																setOfflineBooking({
																	status: true,
																	data: result.data.data,
																})
															),
														500
													);
												}}>
												All
											</button>
										</li>
										{offlineBooking.status ? (
											workout.data.rows?.map((item) => {
												return (
													<li className="mr-2" key={item.workout_id}>
														<button className={active === item.workout_id ? activeTab : notActiveTab} onClick={() => filterItem(item.workout_id)}>
															{item.workout}
														</button>
													</li>
												);
											})
										) : (
											<ul className="-mb-px flex list-none text-center">
												<li className="mr-2">
													<SkeletonLoadingTabs />
												</li>
												<li className="mr-2">
													<SkeletonLoadingTabs />
												</li>
												<li className="mr-2">
													<SkeletonLoadingTabs />
												</li>
												<li className="mr-2">
													<SkeletonLoadingTabs />
												</li>
											</ul>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{searchTrigger && (
				<div>
					<div
						className={
							searchTrigger
								? "pointer-events-auto fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
								: "pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
						}
						onClick={handleSearchTrigger}></div>
					<div className="fixed top-10 right-0 z-40 mr-32 mt-24 w-48 rounded-xl bg-white shadow-4 transition-all duration-300 md:hidden">
						<div className="relative">
							<input
								type="text"
								className={searchInputForSmScreen}
								placeholder="Search by membership name"
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
			{offlineBooking.status ? (
				<div>
					{offlineBooking.data.rows?.length > 0 ? (
						<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
							{offlineBooking.data.rows?.map((item) => {
								return <OfflineBookingListItem data={item} key={item.book_id} />;
							})}
						</div>
					) : (
						<div className="pt-40 pb-6">
							<div className={dataNotFound}>
								<i className="fi fi-rr-info mr-3 text-sm"></i>
								Data Offline Booking not found
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
					<SkeletonLoadingBooking />
					<SkeletonLoadingBooking />
					<SkeletonLoadingBooking />
				</div>
			)}

			{modalCreateTrigger && <ModalCreateOfflineBooking handleModalCreateTrigger={handleModalCreateTrigger} />}
		</div>
	);
};

export default OfflineBookingList;
