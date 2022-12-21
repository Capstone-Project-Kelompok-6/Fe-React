import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import WorkoutAPI from "../../../apis/workout.api";
import { useSelector } from "react-redux";
import ModalCreateWorkout from "./ModalCreateWorkout";
import WorkoutListItem from "./WorkoutListItem";
import {
	addButton,
	nextButtonActive,
	nextButtonDisabled,
	previousButtonActive,
	previousButtonDisabled,
	searchInputForLgScreen,
	searchInputForSmScreen,
} from "../../../utils/globalVariable";
import useHook from "../../../hooks/useHook";

const Initial_Workout = {
	data: [],
	page: 0,
	status: false,
};

const WorkoutList = () => {
	const [workout, setWorkout] = useState(Initial_Workout);
	const {
		modalCreateTrigger,
		setModalCreateTrigger,
		keyword,
		setKeyword,
		debouncedKeyword,
		searchTrigger,
		setSearchTrigger,
	} = useHook();
	const loading = useSelector((state) => state.workout.loading);

	useEffect(() => {
		if (debouncedKeyword) {
			WorkoutAPI.searchWorkout(debouncedKeyword.toLowerCase(), 5).then((result) =>
				setWorkout({ status: true, data: result.data.data })
			);
		} else {
			WorkoutAPI.getWorkout(5).then((result) =>
				setWorkout({
					status: true,
					data: result.data.data,
					page: result.data.data.page ? 1 : result.data.data.page,
				})
			);
		}
	}, [loading, debouncedKeyword]);

	const handlePreviousPage = async (page) => {
		const result = await WorkoutAPI.getWorkout(5, page - 1);
		setWorkout({ status: true, data: result.data.data });
	};

	const handleNextPage = async (page) => {
		const result = await WorkoutAPI.getWorkout(5, page + 1);
		setWorkout({ status: true, data: result.data.data });
	};

	const handleModalCreateTrigger = () => {
		setModalCreateTrigger(!modalCreateTrigger);
	};

	const handleSearchTrigger = () => {
		setSearchTrigger(!searchTrigger);
	};

	return (
		<div>
			<div className="mx-auto px-6">
				<div className="fixed left-0 right-0 z-20 w-full bg-white bg-opacity-90 px-6 py-2 shadow-3 backdrop-blur-sm">
					<div className="flex items-center space-x-4">
						<div className="min-w-0 flex-1">
							<h2 className="text-sm font-medium text-neutral-100-2 md:pl-52 md:text-lg">
								Manage Workout
							</h2>
						</div>
						<div className="inline-flex items-center text-sm font-medium text-neutral-100-2">
							<div className="relative mt-1 mr-3 mb-1 hidden w-full md:block md:w-60 lg:w-80">
								<input
									type="text"
									className={searchInputForLgScreen}
									placeholder="Search by workout name"
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
			</div>
			<div className="container mx-auto py-6 px-6">
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
									placeholder="Search by workout name"
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
				<div className="pt-14">
					<div className="w-full rounded-xl bg-white py-6 px-6 shadow-4">
						{workout.status ? (
							<div>
								{workout.data.rows?.length > 0 ? (
									<div>
										<div className="w-full overflow-x-auto rounded-xl scrollbar-hide md:scrollbar-default">
											<table className="w-full text-left">
												<thead>
													<tr className="text-semibold w-full whitespace-nowrap rounded-xl border-x border-t border-primary-violet bg-primary-background text-xs text-primary-violet">
														<th scope="col" className="py-3 px-6">
															No
														</th>
														<th scope="col" className="py-3 px-6">
															Workout
														</th>
														<th scope="col" className="py-3 px-10">
															Updated
														</th>
														<th scope="col" className="py-3 px-6">
															Action
														</th>
													</tr>
												</thead>
												{workout.data.rows?.map((item, i) => {
													return (
														<WorkoutListItem
															key={item.workout_id}
															data={{
																...item,
																no: workout.data.page * 5 - 5 + 1 + i,
															}}
														/>
													);
												})}
											</table>
										</div>
										<nav
											className="flex flex-col items-center justify-between pt-4 md:flex-row lg:flex-row xl:flex-row"
											aria-label="Table navigation">
											<span className="text-sm font-normal text-neutral-80">
												<span>Showing </span>
												<span className="mr-1">page {workout.data.page}</span>
												of
												<span> {workout.data.total_rows} entries</span>
											</span>
											<ul className="mt-3 inline-flex items-center -space-x-px text-sm md:mt-0 lg:mt-0 xl:mt-0">
												<li>
													<button
														type="button"
														className={
															workout.data.page === 1
																? previousButtonDisabled
																: previousButtonActive
														}
														onClick={() => handlePreviousPage(workout.data.page)}
														disabled={workout.data.page === 1}>
														<span>Previous</span>
													</button>
												</li>

												<li>
													<button
														type="button"
														className={
															workout.data.page + 1 > workout.data.total_pages
																? nextButtonDisabled
																: nextButtonActive
														}
														onClick={() => handleNextPage(workout.data.page)}
														disabled={workout.data.page + 1 > workout.data.total_pages}>
														<span>Next</span>
													</button>
												</li>
											</ul>
										</nav>
									</div>
								) : (
									<div className="flex flex-wrap items-center justify-center text-xs font-semibold leading-7 text-neutral-80">
										<i className="fi fi-rr-info mr-3 text-sm"></i>
										Data workout not found{" "}
									</div>
								)}

								{modalCreateTrigger && (
									<ModalCreateWorkout handleModalCreateTrigger={handleModalCreateTrigger} />
								)}
							</div>
						) : (
							<div className="my-0 mx-auto flex items-center justify-center py-4 px-6">
								<PulseLoader size={10} color="#6FCBFD" />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WorkoutList;
