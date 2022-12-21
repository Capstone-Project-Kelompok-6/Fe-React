import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClassesAPI from "../../../apis/classes.api";
import {
	activeTab,
	addButton,
	dataNotFound,
	notActiveTab,
	searchInputForLgScreen,
	searchInputForSmScreen,
} from "../../../utils/globalVariable";

import ClassesTabs from "./ClassesTabs";
import ClassesHeader from "./ClassesHeader";
import ModalCreateOnlineClasses from "./ModalCreateOnlineClasses";
import OnlineClassesListItem from "./OnlineClassesListItem";
import SkeletonLoadingOnlineClasses from "./SkeletonLoadingOnlineClasses";
import SkeletonLoadingTabs from "../SkeletonLoadingTabs";
import { setLoaderFetchData } from "../../../stores/features/loaderFetchDataSlice";
import useHook from "../../../hooks/useHook";

const Initial_Online_Classes = {
	data: [],
};

const OnlineClassesList = () => {
	const [onlineClasses, setOnlineClasses] = useState(Initial_Online_Classes);
	const [filterOnlineClasses, setFilterOnlineClasses] = useState(Initial_Online_Classes);
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
	const loading = useSelector((state) => state.onlineClasses.loading);
	const loaderFetchData = useSelector((state) => state.loaderFetchData);

	const classesOnline = new Set();
	const classesOnlineFilter = new Set();

	onlineClasses.data.rows?.forEach((value) => {
		classesOnline.add(value.workout);
	});

	filterOnlineClasses.data.rows?.forEach((value) => {
		classesOnlineFilter.add(value.workout);
	});

	useEffect(() => {
		if (debouncedKeyword) {
			ClassesAPI.serchOnlineClasses(debouncedKeyword.toLowerCase(), 1000).then((result) => {
				setOnlineClasses({ data: result.data.data });
				setActiveFilter(result.data.data.rows[0].workout);
			});
		} else {
			ClassesAPI.getOnlineClasses(1000).then((result) => {
				setOnlineClasses({
					data: result.data.data,
				});
				setActiveFilter(0);
				dispatch(setLoaderFetchData(false));
			});
		}
	}, [loading, debouncedKeyword]);

	useEffect(() => {
		ClassesAPI.getOnlineClasses(1000).then((result) => {
			setFilterOnlineClasses({
				data: result.data.data,
			});
			dispatch(setLoaderFetchData(false));
		});
	}, []);

	const filterByWorkout = (workout) => {
		dispatch(setLoaderFetchData(true));
		ClassesAPI.filterOnlineClasses(workout, 1000).then((result) => {
			setOnlineClasses({ data: result.data.data });
			setActiveFilter(workout);
			dispatch(setLoaderFetchData(false));
		});
	};

	const filterAll = () => {
		ClassesAPI.getOnlineClasses(1000).then((result) => {
			setOnlineClasses({ data: result.data.data });
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
				<ClassesHeader />
				<div className="md:pl-52">
					<div className="mb-2 flex items-center border-b border-gray-200">
						<div className="min-w-0 flex-1">
							<ClassesTabs />
						</div>
						<div className="inline-flex items-center text-sm font-medium text-neutral-100-2">
							<div className="relative mt-1 mr-3 mb-1 hidden w-full md:block md:w-48 lg:w-80">
								<input
									type="text"
									className={searchInputForLgScreen}
									placeholder="Search"
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
											Array.from(classesOnlineFilter).map((workout) => {
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
						<div className="fixed top-0 right-0 z-40 mr-32 mt-32 w-48 rounded-xl bg-white shadow-4 transition-all duration-300 md:hidden">
							<div className="relative">
								<input
									type="text"
									className={searchInputForSmScreen}
									placeholder="Search"
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
					<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
						<SkeletonLoadingOnlineClasses />
						<SkeletonLoadingOnlineClasses />
						<SkeletonLoadingOnlineClasses />
					</div>
				) : (
					<div>
						{onlineClasses.data.rows?.length > 0 ? (
							<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
								{onlineClasses.data.rows?.map((item) => {
									return <OnlineClassesListItem key={item.class_id} data={item} />;
								})}
							</div>
						) : (
							<div className="pt-36 pb-6">
								<div className={dataNotFound}>
									<i className="fi fi-rr-info mr-3 text-sm"></i>
									Data Online Classes not found
								</div>
							</div>
						)}
					</div>
				)}

				{modalCreateTrigger && (
					<ModalCreateOnlineClasses handleModalCreateTrigger={handleModalCreateTrigger} />
				)}
			</div>
		</div>
	);
};

export default OnlineClassesList;
