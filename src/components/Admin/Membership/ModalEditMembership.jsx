import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { editMembership } from "../../../stores/features/membershipSlice";

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
					Swal.fire("Sorry", res.error.message.split(":")[1], "error");
				}
			});
		} catch (error) {
			Swal.fire("Sorry", error.message, "error");
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-4 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t border-b p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Edit Membership</h3>
								<button
									type="button"
									className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
									data-modal-toggle="editUserModal"></button>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<input
										type="email"
										id="email"
										name="email"
										className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
										placeholder=" "
										required
										defaultValue={email}
									/>
									<label
										htmlFor="email"
										className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Email</span>
									</label>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 rounded-b border-t border-gray-200 p-6">
								<button
									data-modal-toggle="staticModal"
									type="button"
									className="w-full rounded-xl border border-secondary-navy bg-white px-5 py-2.5 text-sm font-medium text-primary-violet hover:bg-gray-100 hover:text-violet-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
									onClick={handleModalEditTrigger}>
									Cancel
								</button>
								<button
									data-modal-toggle="staticModal"
									type="submit"
									className="w-full rounded-xl bg-secondary-navy px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
