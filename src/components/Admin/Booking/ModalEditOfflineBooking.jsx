import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { editOfflineBooking } from "../../../stores/features/offlineBookingSlice";
import { cancelButton, disabledButton, saveButton, select } from "../../../utils/globalVariable";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { PulseLoader } from "react-spinners";

const ModalEditOfflineBooking = ({
	handleModalEditTrigger,
	handleActionDropdown,
	offlineClassesList,
	update,
}) => {
	const { book_id, class_id, user_id, workout, instructor_name } = update;
	const [selectedOfflineClasses, setSelectedOfflineClasses] = useState("");
	const dispatch = useDispatch();
	const loaderSubmit = useSelector((state) => state.loaderSubmit);

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(setLoaderSubmit(true));

		const formData = new FormData(e.target);
		const class_id = formData.get("class_id");
		dispatch(editOfflineBooking({ book_id, user_id, class_id })).then((result) => {
			if (!result.error) {
				handleModalEditTrigger();
				handleActionDropdown();
				setTimeout(
					() =>
						Swal.fire({
							icon: "success",
							title: "Updated",
							text: "Offline booking data successfully updated",
							showConfirmButton: false,
							timer: 2000,
							background: "#ffffff",
						}),
					1000
				);
				dispatch(setLoaderSubmit(false));
			} else {
				Swal.fire("Sorry", result.error.message.split(":")[1], "info");
				dispatch(setLoaderSubmit(false));
			}
		});
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-6 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Edit Offline Booking
								</h3>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<Select
										className={`z-30 ${select}`}
										options={offlineClassesList.rows
											?.map((item) => {
												return {
													value: item.class_id,
													label: `${item.workout} - ${item.instructor_name}`,
												};
											})
											.sort((a, b) => a.label.localeCompare(b.label))}
										name="class_id"
										defaultValue={{
											value: class_id,
											label: `${workout} - ${instructor_name}`,
										}}
										placeholder="Select offline classes"
										noOptionsMessage={() => "Offline classes data not found"}
										isClearable
										onChange={(e) => setSelectedOfflineClasses(e.value)}
									/>
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
										className={!selectedOfflineClasses ? disabledButton : saveButton}
										disabled={!selectedOfflineClasses}>
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

export default ModalEditOfflineBooking;
