import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
	cancelButton,
	inputNotError,
	labelNotError,
	saveButton,
	select,
} from "../../../utils/globalVariable";
import { fetchInstructor } from "../../../stores/features/instructorSlice";
import { fetchWorkoutList } from "../../../stores/features/workoutSlice";
import { editOfflineClasses } from "../../../stores/features/offlineClassesSlice";
import Swal from "sweetalert2";

const ModalEditOfflineClasses = ({ handleModalEditTrigger, handleActionDropdown, update }) => {
	const {
		class_id,
		instructor_name,
		instructor_id,
		workout_id,
		workout,
		class_dates,
		price,
		description,
	} = update;
	const dispatch = useDispatch();
	const workoutList = useSelector((state) => state.workout.data);
	const instructorList = useSelector((state) => state.instructor.data);
	const [selectedClassDates, setSelectedClassDates] = useState([]);

	useEffect(() => {
		dispatch(fetchWorkoutList());
		dispatch(fetchInstructor());
	}, [dispatch]);

	const handleChangeClassDates = (e) => {
		setSelectedClassDates(
			Array.isArray(e)
				? e.map((x) => x.value)
				: [
						class_dates.map((date) => {
							return { value: date, label: date };
						}),
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ]
		);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const workout_id = formData.get("workout_id");
		const instructor_id = formData.get("instructor_id");
		const price = Number(formData.get("price"));
		const description = formData.get("description");
		try {
			dispatch(
				editOfflineClasses({
					class_id,
					workout_id,
					instructor_id,
					class_dates: selectedClassDates,
					price,
					description,
				})
			).then((res) => {
				if (!res.error) {
					setTimeout(
						() =>
							Swal.fire({
								icon: "success",
								title: "Update",
								text: "Offline classes data successfully updated",
								showConfirmButton: false,
								timer: 2000,
								background: "#ffffff",
							}),
						1000
					);
					handleModalEditTrigger();
					handleActionDropdown();
				} else {
					Swal.fire("Sorry", "Classes already exists", "info");
				}
			});
		} catch (error) {
			Swal.fire("Sorry", error.message.split(":")[1], "info");
		}
	};

	const dataClassDates = [
		{
			label: "Sunday, 09:00 - 11:00",
			value: "Sunday, 09:00 - 11:00",
		},
		{
			label: "Wednesday, 13:00 - 15:00",
			value: "Wednesday, 13:00 - 15:00",
		},
		{
			label: "Friday, 14:00 - 18:00",
			value: "Friday, 14:00 - 18:00",
		},
	];

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Edit Offline Classes
								</h3>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<Select
										className={`z-50 ${select}`}
										options={workoutList.rows
											?.map((item) => {
												return { value: item.workout_id, label: item.workout };
											})
											.sort((a, b) => a.label.localeCompare(b.label))}
										name="workout_id"
										placeholder="Select workout category"
										noOptionsMessage={() => "Workout data not found"}
										defaultValue={{ value: workout_id, label: workout }}
										isClearable
									/>
								</div>
								<div className="relative">
									<Select
										className={`z-40 ${select}`}
										options={instructorList.rows
											?.map((item) => {
												return { value: item.instructor_id, label: item.instructor_name };
											})
											.sort((a, b) => a.label.localeCompare(b.label))}
										name="instructor_id"
										placeholder="Select instructure"
										noOptionsMessage={() => "Instructure data not found"}
										isClearable
										defaultValue={{ value: instructor_id, label: instructor_name }}
									/>
								</div>
								<div className="relative">
									<Select
										className={`z-30 ${select}`}
										options={dataClassDates}
										defaultValue={class_dates.map((date) => {
											return { value: date, label: date };
										})}
										name="class_dates"
										placeholder="Select schedule"
										noOptionsMessage={() => "Schedule data not found"}
										isMulti
										isClearable
										onChange={handleChangeClassDates}
									/>
								</div>
								<div className="relative">
									<input
										type="number"
										id="price"
										name="price"
										className={inputNotError}
										placeholder=" "
										defaultValue={price}
									/>
									<label htmlFor="price" className={labelNotError}>
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">
											Price
										</span>
									</label>
								</div>
								<div className="relative">
									<textarea
										id="description"
										name="description"
										rows="5"
										className={inputNotError}
										placeholder=" "
										defaultValue={description}></textarea>
									<label htmlFor="description" className={labelNotError}>
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">
											{" "}
											Information
										</span>
									</label>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 p-6">
								<button type="button" className={cancelButton} onClick={handleModalEditTrigger}>
									Cancel
								</button>
								<button type="submit" className={saveButton}>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalEditOfflineClasses;
