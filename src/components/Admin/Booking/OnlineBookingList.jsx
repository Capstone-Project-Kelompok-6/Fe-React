import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingAPI from "../../../apis/booking.api";
import {
	activeTab,
	dataNotFound,
	notActiveTab,
	searchInputForLgScreen,
	searchInputForSmScreen,
} from "../../../utils/globalVariable";
import SkeletonLoadingTabs from "../SkeletonLoadingTabs";
import BookingTabs from "./BookingTabs";
import BookingHeader from "./BookingHeader";
import OnlineBookingListItem from "./OnlineBookingListItem";
import SkeletonLoadingBooking from "./SkeletonLoadingBooking";
import { setLoaderFetchData } from "../../../stores/features/loaderFetchDataSlice";
import useHook from "../../../hooks/useHook";

const Initial_Online_Booking = {
	data: [],
};

const OnlineBookingList = () => {
	const [onlineBooking, setOnlineBooking] = useState(Initial_Online_Booking);
	const [filterOnlineBooking, setFilterOnlineBooking] = useState(Initial_Online_Booking);
	const {
		keyword,
		setKeyword,
		debouncedKeyword,
		searchTrigger,
		setSearchTrigger,
		activeFilter,
		setActiveFilter,
	} = useHook();

	const dispatch = useDispatch();
	const loading = useSelector((state) => state.onlineBooking.loading);
	const loaderFetchData = useSelector((state) => state.loaderFetchData);

	const bookingOnline = new Set();
	const bookingOnlineFilter = new Set();

	onlineBooking.data.rows?.forEach((value) => {
		bookingOnline.add(value.workout);
	});

	filterOnlineBooking.data.rows?.forEach((value) => {
		bookingOnlineFilter.add(value.workout);
	});

	useEffect(() => {
		if (debouncedKeyword) {
			BookingAPI.searchOnlineBooking(debouncedKeyword.toLowerCase(), 1000).then((result) => {
				setOnlineBooking({ data: result.data.data });
				setActiveFilter(result.data.data.rows[0].workout);
			});
		} else {
			dispatch(setLoaderFetchData(true));
			BookingAPI.getOnlineBooking(1000).then((result) => {
				setOnlineBooking({
					data: result.data.data,
				});
				setActiveFilter(0);
				dispatch(setLoaderFetchData(false));
			});
		}
	}, [loading, debouncedKeyword]);

	useEffect(() => {
		BookingAPI.getOnlineBooking(1000).then((result) => {
			setFilterOnlineBooking({
				data: result.data.data,
			});
		});
	}, [loading]);

	const filterByWorkout = (workout) => {
		dispatch(setLoaderFetchData(true));
		BookingAPI.filterOnlineBooking(workout, 1000).then((result) => {
			setOnlineBooking({
				data: result.data.data,
			});
			setActiveFilter(workout);
			dispatch(setLoaderFetchData(false));
		});
	};

	const filterAll = () => {
		BookingAPI.getOnlineBooking(1000).then((result) => {
			setOnlineBooking({
				data: result.data.data,
			});
			setActiveFilter(0);
		});
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
							<div className="relative mt-1 mb-1 hidden w-full md:block md:w-48 lg:w-80">
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
										Array.from(bookingOnlineFilter).map((workout) => {
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
					<div className="fixed top-10 right-0 z-40 mr-10 mt-24 w-52 rounded-xl bg-white shadow-4 transition-all duration-300 md:hidden">
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
					{onlineBooking.data.rows?.length > 0 ? (
						<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:grid-cols-3">
							{onlineBooking.data.rows?.map((item) => {
								return <OnlineBookingListItem key={item.book_id} data={item} />;
							})}
						</div>
					) : (
						<div className="pt-36 pb-6">
							<div className={dataNotFound}>
								<i className="fi fi-rr-info mr-3 text-sm"></i>
								Data Online Booking not found
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default OnlineBookingList;
