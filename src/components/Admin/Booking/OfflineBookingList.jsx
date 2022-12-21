import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	activeTab,
	addButton,
	dataNotFound,
	notActiveTab,
	searchInputForLgScreen,
	searchInputForSmScreen,
} from "../../../utils/globalVariable";
import BookingHeader from "./BookingHeader";
import BookingTabs from "./BookingTabs";
import BookingAPI from "./../../../apis/booking.api";
import OfflineBookingListItem from "./OfflineBookingListItem";
import SkeletonLoadingBooking from "./SkeletonLoadingBooking";
import ModalCreateOfflineBooking from "./ModalCreateOfflineBooking";
import SkeletonLoadingTabs from "../SkeletonLoadingTabs";
import { setLoaderFetchData } from "../../../stores/features/loaderFetchDataSlice";
import useHook from "../../../hooks/useHook";

const Initial_Offline_Booking = {
	data: [],
};

const OfflineBookingList = () => {
	const [offlineBooking, setOfflineBooking] = useState(Initial_Offline_Booking);
	const [filterOfflineBooking, setFilterOfflineBooking] = useState(Initial_Offline_Booking);
	const {
		modalCreateTrigger,
		setModalCreateTrigger,
		keyword,
		setKeyword,
		debouncedKeyword,
		searchTrigger,
		setSearchTrigger,
		activeFilter,
		setActiveFilter,
	} = useHook();

	const dispatch = useDispatch();
	const loading = useSelector((state) => state.offlineBooking.loading);
	const loadingPayment = useSelector((state) => state.payment.loading);
	const loaderFetchData = useSelector((state) => state.loaderFetchData);

	const bookingOffline = new Set();
	const bookingOfflineFilter = new Set();

	offlineBooking.data.rows?.forEach((value) => {
		bookingOffline.add(value.workout);
	});

	filterOfflineBooking.data.rows?.forEach((value) => {
		bookingOfflineFilter.add(value.workout);
	});

	useEffect(() => {
		if (debouncedKeyword) {
			BookingAPI.searchOfflineBooking(debouncedKeyword.toLowerCase(), 1000).then((result) => {
				setOfflineBooking({ data: result.data.data });
				setActiveFilter(result.data.data.rows[0].workout);
			});
		} else {
			dispatch(setLoaderFetchData(true));
			BookingAPI.getOfflineBooking(1000).then((result) => {
				setOfflineBooking({
					data: result.data.data,
				});
				setActiveFilter(0);
				dispatch(setLoaderFetchData(false));
			});
		}
	}, [loading, debouncedKeyword, loadingPayment]);

	useEffect(() => {
		BookingAPI.getOfflineBooking(1000).then((result) => {
			setFilterOfflineBooking({
				data: result.data.data,
			});
		});
	}, [loading]);

	const filterByWorkout = (workout) => {
		dispatch(setLoaderFetchData(true));
		BookingAPI.filterOfflineBooking(workout, 1000).then((result) => {
			setOfflineBooking({
				data: result.data.data,
			});
			setActiveFilter(workout);
			dispatch(setLoaderFetchData(false));
		});
	};

	const filterAll = () => {
		BookingAPI.getOfflineBooking(1000).then((result) => {
			setOfflineBooking({
				data: result.data.data,
			});
			setActiveFilter(0);
		});
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
					<div className="grid grid-cols-1 gap-4 lg:col-span-3">
						<div className="relative">
							<div className="sm:block">
								<ul className="-mb-px flex list-none overflow-x-scroll whitespace-nowrap text-center text-xs font-medium scrollbar-hide">
									<li className="mr-2">
										<button
											className={activeFilter === 0 ? activeTab : notActiveTab}
											onClick={() => {
												filterAll();
											}}>
											All
										</button>
									</li>
									{loaderFetchData ? (
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
									) : (
										Array.from(bookingOfflineFilter).map((workout) => {
											return (
												<li className="mr-2" key={workout}>
													<button
														className={activeFilter === workout ? activeTab : notActiveTab}
														onClick={() => filterByWorkout(workout)}>
														{workout}
													</button>
												</li>
											);
										})
									)}
								</ul>
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
			{loaderFetchData ? (
				<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:grid-cols-3">
					<SkeletonLoadingBooking />
					<SkeletonLoadingBooking />
					<SkeletonLoadingBooking />
				</div>
			) : (
				<div>
					{offlineBooking.data.rows?.length > 0 ? (
						<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:grid-cols-3">
							{offlineBooking.data.rows?.map((item) => {
								return <OfflineBookingListItem key={item.book_id} data={item} />;
							})}
						</div>
					) : (
						<div className="pt-36 pb-6">
							<div className={dataNotFound}>
								<i className="fi fi-rr-info mr-3 text-sm"></i>
								Data Offline Booking not found
							</div>
						</div>
					)}
				</div>
			)}

			{modalCreateTrigger && (
				<ModalCreateOfflineBooking handleModalCreateTrigger={handleModalCreateTrigger} />
			)}
		</div>
	);
};

export default OfflineBookingList;
