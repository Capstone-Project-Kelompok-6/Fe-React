import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
	cancelButton,
	disabledButton,
	inputNotError,
	labelNotError,
	saveButton,
	select,
} from "../../../utils/globalVariable";
import { fetchInstructor } from "../../../stores/features/instructorSlice";
import { fetchWorkoutList } from "../../../stores/features/workoutSlice";
import { editOfflineClasses } from "../../../stores/features/offlineClassesSlice";
import Swal from "sweetalert2";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";
import { handleKeyDown } from "../../../utils/rmvHtmlTag";

const baseValues = {
	price: "",
	description: "",
};

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
	const [values, setValues] = useState(baseValues);
	const [selectedWorkout, setSelectedWorkout] = useState("");
	const [selectedInstructor, setSelectedInstructor] = useState("");
	const [selectedClassDates, setSelectedClassDates] = useState([]);
	const dispatch = useDispatch();
	const workoutList = useSelector((state) => state.workout.data);
	const instructorList = useSelector((state) => state.instructor.data);
	const loaderSubmit = useSelector((state) => state.loaderSubmit);

	useEffect(() => {
		dispatch(fetchWorkoutList(1000));
		dispatch(fetchInstructor(1000));
	}, [dispatch]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleChangeClassDates = (e) => {
		setSelectedClassDates(Array.isArray(e) ? e.map((item) => item.value) : []);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(setLoaderSubmit(true));

		const formData = new FormData(e.target);
		const workout_id = formData.get("workout_id");
		const instructor_id = formData.get("instructor_id");
		const price = Number(formData.get("price"));
		const description = formData.get("description");

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
				dispatch(setLoaderSubmit(false));
			} else {
				Swal.fire("Sorry", res.error.message.split(":")[1], "info");
				dispatch(setLoaderSubmit(false));
			}
		});
	};

	const dataClassDates = [
		{
			label: "Sunday (09:00 - 11:00)",
			value: "Sunday (09:00 - 11:00)",
		},
		{
			label: "Wednesday (13:00 - 15:00)",
			value: "Wednesday (13:00 - 15:00)",
		},
		{
			label: "Friday (14:00 - 18:00)",
			value: "Friday (14:00 - 18:00)",
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
										onChange={(e) => setSelectedWorkout(e.value)}
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
										placeholder="Select instructor"
										noOptionsMessage={() => "Instructor data not found"}
										isClearable
										defaultValue={{ value: instructor_id, label: instructor_name }}
										onChange={(e) => setSelectedInstructor(e.value)}
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
										onChange={handleChange}
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
										defaultValue={description}
										onKeyDown={handleKeyDown}
										onChange={handleChange}></textarea>
									<label htmlFor="description" className={labelNotError}>
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">
											Information
										</span>
									</label>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 p-6">
								<button type="button" className={cancelButton} onClick={handleModalEditTrigger}>
									Cancel
								</button>
								{loaderSubmit ? (
									<button className={saveButton}>
										<PulseLoader size={5} color={"#ffffff"} />
									</button>
								) : (
									<button
										type="submit"
										className={
											!selectedWorkout &&
											!selectedInstructor &&
											!values.price &&
											!values.description &&
											selectedClassDates.length === 0
												? disabledButton
												: saveButton
										}
										disabled={
											!selectedWorkout &&
											!selectedInstructor &&
											!values.price &&
											!values.description &&
											selectedClassDates.length === 0
										}>
										Save Changes
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalEditOfflineClasses;
