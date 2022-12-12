import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { cancelButton, saveButton, select } from "../../../utils/globalVariable";
import { fetchMembership } from "./../../../stores/features/membershipSlice";
import { fetchOfflineClasses } from "../../../stores/features/offlineClassesSlice";
import { createOfflineBooking } from "./../../../stores/features/offlineBookingSlice";

const ModalCreateOfflineBooking = ({ handleModalCreateTrigger }) => {
	const dispatch = useDispatch();
	const membershipList = useSelector((state) => state.membership.data);
	const offlineClassesList = useSelector((state) => state.offlineClasses.data);

	useEffect(() => {
		dispatch(fetchMembership());
		dispatch(fetchOfflineClasses());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const user_id = formData.get("user_id");
		const class_id = formData.get("class_id");

		try {
			dispatch(createOfflineBooking({ user_id, class_id })).then((res) => {
				if (!res.error) {
					handleModalCreateTrigger();
					setTimeout(
						() =>
							Swal.fire({
								icon: "success",
								title: "Saved",
								text: "Offline booking data successfully saved",
								showConfirmButton: false,
								timer: 2000,
								background: "#ffffff",
							}),
						1000
					);
				} else {
					Swal.fire("Sorry", res.error.message.split(":")[1], "info");
				}
			});
		} catch (error) {
			Swal.fire("Sorry", error.message.split(":")[1], "info");
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-6 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleSubmit} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Add New Offline Booking
								</h3>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<Select
										className={`z-50 ${select}`}
										options={membershipList.rows
											?.map((item) => {
												return {
													value: item.user_id,
													label: item.full_name,
												};
											})
											.sort((a, b) => a.label.localeCompare(b.label))}
										name="user_id"
										placeholder="Select membership"
										noOptionsMessage={() => "Membership data not found"}
										isClearable
									/>
								</div>
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
										placeholder="Select offline classes"
										noOptionsMessage={() => "Offline Class data not found"}
									/>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 p-6">
								<button type="button" className={cancelButton} onClick={handleModalCreateTrigger}>
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

export default ModalCreateOfflineBooking;
