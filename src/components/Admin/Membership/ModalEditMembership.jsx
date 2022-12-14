import React from "react";
import { useDispatch } from "react-redux";
import { editMembership } from "../../../stores/features/membershipSlice";
import {
	cancelButton,
	inputNotError,
	labelNotError,
	saveButton,
} from "../../../utils/globalVariable";

import Swal from "sweetalert2";

const ModalEditMembership = ({ handleModalEditTrigger, handleActionDrowpdon, update }) => {
	const { user_id, email } = update;
	const dispatch = useDispatch();

	const handleUpdate = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const email = formData.get("email");

		try {
			dispatch(editMembership({ user_id, email })).then((res) => {
				if (!res.error) {
					setTimeout(
						() =>
							Swal.fire({
								icon: "success",
								title: "Updated",
								text: "Membership data successfully updated",
								showConfirmButton: false,
								timer: 2000,
								background: "#ffffff",
							}),
						1000
					);

					handleModalEditTrigger();
					handleActionDrowpdon();
				} else {
					Swal.fire("Sorry", "Email is already exists", "error");
				}
			});
		} catch (error) {
			Swal.fire("Sorry", error.message, "error");
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-4 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Edit Membership
								</h3>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<input
										type="email"
										id="email"
										name="email"
										className={inputNotError}
										placeholder=" "
										required
										defaultValue={email}
									/>
									<label htmlFor="email" className={labelNotError}>
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">
											Email
										</span>
									</label>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 rounded-b p-6">
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

export default ModalEditMembership;
