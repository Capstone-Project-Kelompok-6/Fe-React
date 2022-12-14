import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import {
	activeTab,
	addButton,
	dataNotFound,
	notActiveTab,
	searchInputForLgScreen,
	searchInputForSmScreen,
} from "../../../utils/globalVariable";
import ClassesHeader from "./ClassesHeader";
import OfflineClassesListItem from "./OfflineClassesListItem";
import ModalCreateOfflineClasses from "./ModalCreateOfflineClasses";
import ClassesTabs from "./ClassesTabs";
import ClassesAPI from "../../../apis/classes.api";
import SkeletonLoadingOfflineClasses from "./SkeletonLoadingOfflineClasses";
import SkeletonLoadingTabs from "../SkeletonLoadingTabs";

const Initial_Offline_Classes = {
	data: [],
};

const OfflineClassesList = () => {
	const [offlineClasses, setOfflineClasses] = useState(Initial_Offline_Classes);
	const [filterOfflineClasses, setFilterOfflineClasses] = useState(Initial_Offline_Classes);
	const [modalCreateTrigger, setModalCreateTrigger] = useState(false);
	const [searchTrigger, setSearchTrigger] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [active, setActive] = useState(0);
	const loading = useSelector((state) => state.offlineClasses.loading);
	const [debouncedKeyword] = useDebounce(keyword, 1300);
	const [load, setLoad] = useState(true);

	const classesOffline = new Set();
	const classesOfflineFilter = new Set();

	offlineClasses.data.rows?.forEach((value) => {
		classesOffline.add(value.workout);
	});

	filterOfflineClasses.data.rows?.forEach((value) => {
		classesOfflineFilter.add(value.workout);
	});

	useEffect(() => {
		if (debouncedKeyword) {
			ClassesAPI.serchOfflineClasses(debouncedKeyword.toLowerCase()).then((result) => {
				setOfflineClasses({ data: result.data.data });
				setActive(result.data.data.rows[0].workout);
			});
		} else {
			setLoad(true);
			ClassesAPI.getOfflineClasses(10).then((result) => {
				setOfflineClasses({
					data: result.data.data,
				});
				setActive(0);
				setLoad(false);
			});
		}
	}, [loading, debouncedKeyword]);

	useEffect(() => {
		ClassesAPI.getOfflineClasses(1000).then((result) => {
			setFilterOfflineClasses({
				data: result.data.data,
			});
		});
	}, [loading]);

	const filterItem = (workout) => {
		setLoad(true);
		ClassesAPI.filterOfflineClasses(workout).then((result) => {
			setOfflineClasses({ data: result.data.data });
			setActive(workout);
			setLoad(false);
		});
	};

	const filterAll = () => {
		setLoad(true);
		ClassesAPI.getOfflineClasses().then((result) => {
			setOfflineClasses({ data: result.data.data });
			setActive(0);
			setLoad(false);
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
												className={active === 0 ? activeTab : notActiveTab}
												onClick={() => {
													filterAll();
												}}>
												All
											</button>
										</li>
										{load ? (
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
											Array.from(classesOfflineFilter).map((workout) => {
												return (
													<li className="mr-2" key={workout}>
														<button
															className={active === workout ? activeTab : notActiveTab}
															onClick={() => filterItem(workout)}>
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
				{load ? (
					<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
						<SkeletonLoadingOfflineClasses />
						<SkeletonLoadingOfflineClasses />
						<SkeletonLoadingOfflineClasses />
					</div>
				) : (
					<div>
						{offlineClasses.data.rows?.length > 0 ? (
							<div className="mb-6 grid grid-cols-1 gap-3 pt-36 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
								{offlineClasses.data.rows?.map((item) => {
									return <OfflineClassesListItem data={item} key={item.class_id} />;
								})}
							</div>
						) : (
							<div className="pt-36 pb-6">
								<div className={dataNotFound}>
									<i className="fi fi-rr-info mr-3 text-sm"></i>
									Data Offline Classes not found
								</div>
							</div>
						)}
					</div>
				)}

				{modalCreateTrigger && (
					<ModalCreateOfflineClasses handleModalCreateTrigger={handleModalCreateTrigger} />
				)}
			</div>
		</div>
	);
};

export default OfflineClassesList;
