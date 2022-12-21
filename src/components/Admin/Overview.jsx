import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { fetchInstructor } from "../../stores/features/instructorSlice";
import { fetchMembership } from "../../stores/features/membershipSlice";
import { fetchOfflineClasses } from "../../stores/features/offlineClassesSlice";
import { fetchOnlineClasses } from "../../stores/features/onlineClassesSlice";
import { fetchOfflineBookingList } from "../../stores/features/offlineBookingSlice";
import { fetchWorkoutList } from "../../stores/features/workoutSlice";
import { fetchOnlineBookingList } from "../../stores/features/onlineBookingSlice";
import { PulseLoader } from "react-spinners";
import { fetchVideo } from "../../stores/features/videoSlice";
import randomColor from "randomcolor";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title);

const Overview = () => {
	const dispatch = useDispatch();
	const instructorList = useSelector((state) => state.instructor.data);
	const membershipList = useSelector((state) => state.membership.data);
	const offlineClassesList = useSelector((state) => state.offlineClasses.data);
	const onlineClassesList = useSelector((state) => state.onlineClasses.data);
	const bookingOfflineList = useSelector((state) => state.offlineBooking.data);
	const bookingOnlineList = useSelector((state) => state.onlineBooking.data);
	const videoList = useSelector((state) => state.video.data);
	const statusInstructor = useSelector((state) => state.instructor.status);
	const statusMembership = useSelector((state) => state.membership.status);
	const statusOfflineClasses = useSelector((state) => state.offlineClasses.status);
	const statusOnlineClasses = useSelector((state) => state.onlineClasses.status);
	const statusBookingOffline = useSelector((state) => state.offlineBooking.status);
	const statusBookingOnline = useSelector((state) => state.onlineBooking.status);
	const statusVideo = useSelector((state) => state.video.status);

	useEffect(() => {
		dispatch(fetchInstructor(4));
		dispatch(fetchMembership(4));
		dispatch(fetchOfflineClasses(1000));
		dispatch(fetchOnlineClasses(1000));
		dispatch(fetchOfflineBookingList(1000));
		dispatch(fetchWorkoutList(1000));
		dispatch(fetchOnlineBookingList(1000));
		dispatch(fetchVideo(1000));
	}, [dispatch]);

	const bookingOffline = new Set();
	const bookingOnline = new Set();

	bookingOfflineList.rows?.forEach(function (value) {
		bookingOffline.add(value.workout);
	});

	bookingOnlineList.rows?.forEach(function (value) {
		bookingOnline.add(value.workout);
	});

	const dataBookingOfflineClass = () => {
		const book = [];
		bookingOffline.forEach(function (val) {
			book[[...bookingOffline].indexOf(val)] = 0;
			bookingOfflineList.rows?.forEach(function (value) {
				if (val === value.workout) {
					book[[...bookingOffline].indexOf(val)] += 1;
				}
			});
		});
		return book;
	};

	const dataBookingOnlineClass = () => {
		const book = [];
		bookingOnline.forEach(function (val) {
			book[[...bookingOnline].indexOf(val)] = 0;
			bookingOnlineList.rows?.forEach(function (value) {
				if (val === value.workout) {
					book[[...bookingOnline].indexOf(val)] += 1;
				}
			});
		});
		return book;
	};

	const optionsBookingOffline = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			datalabels: {
				formatter: (ctx, value) => {
					let percentage =
						((ctx * 100) / value.dataset.data.reduce((sum, data) => sum + data, 0)).toFixed(2) +
						"%";
					return percentage;
				},
				color: "#fff",
			},
		},
	};

	const dataBookingOffline = {
		labels: Array.from(bookingOffline),
		datasets: [
			{
				label: "Total Booking",
				data: dataBookingOfflineClass(),
				backgroundColor: dataBookingOfflineClass().map(() =>
					randomColor({
						hue: "blue",
					})
				),
				borderColor: ["#FFFFFF", "#FFFFFF"],
				borderWidth: 1,
				fillColor: "rgba(151,187,205,0.2)",
				pointColor: "rgba(151,187,205,1)",
			},
		],
	};

	const optionsBookingOnline = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			datalabels: {
				formatter: (ctx, value) => {
					let percentage =
						((ctx * 100) / value.dataset.data.reduce((sum, data) => sum + data, 0)).toFixed(2) +
						"%";
					return percentage;
				},
				color: "#fff",
			},
		},
	};

	const dataBookingOnline = {
		labels: Array.from(bookingOnline),
		datasets: [
			{
				label: "Total Booking",
				data: dataBookingOnlineClass(),
				backgroundColor: dataBookingOnlineClass().map(() =>
					randomColor({
						hue: "blue",
					})
				),
				borderColor: ["#FFFFFF", "#FFFFFF"],
				borderWidth: 1,
				fillColor: "rgba(151,187,205,0.2)",
				pointColor: "rgba(151,187,205,1)",
			},
		],
	};

	const optionsClasses = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			datalabels: {
				formatter: (value, ctx) => {
					let dataset = ctx.chart.data.datasets.data;
					return dataset;
				},
				color: "#fff",
			},
		},
	};

	const dataClasses = {
		labels: ["Offline", "Online"],
		datasets: [
			{
				label: "Total Classes",
				data: [offlineClassesList.rows?.length, onlineClassesList.rows?.length],
				backgroundColor: ["#4793EB", "#135DB3"],
				borderColor: ["#FFFFFF", "#FFFFFF"],
				borderWidth: 1,
				fillColor: "rgba(151,187,205,0.2)",
				pointColor: "rgba(151,187,205,1)",
			},
		],
	};

	return (
		<div className="container mx-auto py-6 px-6">
			{statusMembership &&
			statusInstructor &&
			statusOfflineClasses &&
			statusOnlineClasses &&
			statusBookingOffline &&
			statusBookingOnline &&
			statusVideo === "loading" ? (
				<div className="my-0 mx-auto flex items-center justify-center pt-5">
					<PulseLoader size={10} color="#2563eb" />
				</div>
			) : (
				<div>
					<div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
						<div className="rounded-xl bg-white p-4 shadow-4">
							<div className="flex items-center space-x-4">
								<div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-violet bg-opacity-10 p-6">
									<span className="mt-1 text-xl">
										<i className="fi fi-sr-user text-primary-violet"></i>
									</span>
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-base font-medium text-neutral-80">Total Member</p>

									<p className="text-xl font-semibold text-secondary-navy">
										{membershipList.total_rows}
									</p>
								</div>
							</div>
						</div>
						<div className="rounded-xl bg-white p-4 shadow-4">
							<div className="flex items-center space-x-4">
								<div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-violet bg-opacity-10 p-6">
									<span className="mt-1 text-xl">
										<i className="fi fi-sr-gym text-primary-violet"></i>
									</span>
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-base font-medium text-neutral-80">Total Instructure</p>

									<p className="text-xl font-semibold text-secondary-navy">
										{instructorList.total_rows}
									</p>
								</div>
							</div>
						</div>
						<div className="rounded-xl bg-white p-4 shadow-4">
							<div className="flex items-center space-x-4">
								<div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-violet bg-opacity-10 p-6">
									<span className="mt-1 text-xl">
										<i className="fi fi-sr-user text-primary-violet"></i>
									</span>
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-base font-medium text-neutral-80">Total Video</p>

									<p className="text-xl font-semibold text-secondary-navy">
										{videoList.total_rows}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mb-6 grid gap-3 md:grid-cols-1 xl:grid-cols-12">
						<div className="rounded-xl bg-white p-4 shadow-4 lg:col-span-8">
							<div className="flex flex-col items-center space-x-4 md:flex-row">
								<div className="mb-4 min-w-0 flex-1 md:mb-0">
									<p className="text-center text-sm font-medium text-neutral-80 md:text-base">
										Booking Offline Class
									</p>
									<div className="flex items-center justify-center">
										<div className="h-72 w-72 text-white">
											<Doughnut data={dataBookingOffline} options={optionsBookingOffline} />
										</div>
									</div>
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-center text-sm font-medium text-neutral-80 md:text-base">
										Booking Online Class
									</p>
									<div className="flex items-center justify-center">
										<div className="h-72 w-72 text-white">
											<Doughnut data={dataBookingOnline} options={optionsBookingOnline} />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="rounded-xl bg-white p-4 shadow-4 lg:col-span-4">
							<div className="flex items-center space-x-4">
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-center">
										<Calendar prev2Label={false} next2Label={false} showFixedNumberOfWeeks={true} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mb-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
						<div className="rounded-xl bg-white p-4 shadow-4">
							<div className="flex items-center space-x-4">
								<div className="min-w-0 flex-1">
									<div className="mb-3 flex items-center justify-between">
										<p className="text-base font-medium text-neutral-80">Instructors</p>
										<Link
											to="/instructor"
											className="inline-flex items-center justify-center text-sm font-normal text-primary-violet hover:text-blue-600">
											View all
											<i className="fi fi-rr-angle-small-right ml-2 mt-1"></i>
										</Link>
									</div>
									<ul className="max-w-md">
										{instructorList.rows?.length > 0 ? (
											<ul className="max-w-md">
												{instructorList.rows?.map((item) => {
													return (
														<li className="pb-3" key={item.instructor_id}>
															<div className="flex items-center space-x-4">
																<div className="inline-flex flex-shrink-0 items-center justify-center">
																	<span className="text-sm font-semibold text-white">
																		<img
																			className="h-8 w-8 rounded-full object-cover"
																			src={item.instructor_image}
																			alt={item.image_name}
																		/>
																	</span>
																</div>
																<div className="min-w-0 flex-1">
																	<p className="text-sm font-medium text-neutral-80">
																		{item.instructor_name}
																	</p>
																</div>
															</div>
														</li>
													);
												})}
											</ul>
										) : (
											<div className="flex flex-wrap items-center justify-center py-4 px-6 text-xs font-semibold leading-7 text-neutral-80">
												<i className="fi fi-rr-info mr-3 text-sm"></i>
												Data instructor empty
											</div>
										)}
									</ul>
								</div>
							</div>
						</div>
						<div className="rounded-xl bg-white p-4 shadow-4">
							<div className="flex items-center space-x-4">
								<div className="min-w-0 flex-1">
									<div className="mb-3 flex items-center justify-between">
										<p className="text-base font-medium text-neutral-80">Members</p>
										<Link
											to="/membership"
											className="inline-flex items-center justify-center text-sm font-normal text-primary-violet hover:text-blue-600">
											View all
											<i className="fi fi-rr-angle-small-right ml-2 mt-1"></i>
										</Link>
									</div>
									<ul className="max-w-md">
										{membershipList.rows?.length > 0 ? (
											<ul className="max-w-md">
												{membershipList.rows?.map((item) => {
													return (
														<li className="pb-3" key={item.user_id}>
															<div className="flex items-center space-x-4">
																<div className="inline-flex flex-shrink-0 items-center justify-center">
																	<span className="text-sm font-semibold text-white">
																		<img
																			className="h-8 w-8 rounded-full object-cover"
																			src={item.image}
																			alt={item.image_name}
																		/>
																	</span>
																</div>
																<div className="min-w-0 flex-1">
																	<p className="text-sm font-medium text-neutral-80">
																		{item.full_name}
																	</p>
																</div>
															</div>
														</li>
													);
												})}
											</ul>
										) : (
											<div className="flex flex-wrap items-center justify-center py-4 px-6 text-xs font-semibold leading-7 text-neutral-80">
												<i className="fi fi-rr-info mr-3 text-sm"></i>
												Data membership empty
											</div>
										)}
									</ul>
								</div>
							</div>
						</div>
						<div className="rounded-xl bg-white p-4 shadow-4">
							<div className="flex items-center space-x-4">
								<div className="min-w-0 flex-1">
									<p className="mb-3 text-base font-medium text-neutral-80">Total Classes</p>
									<div className="flex items-center justify-center">
										<div className="h-40 w-40">
											<Doughnut data={dataClasses} options={optionsClasses} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Overview;
