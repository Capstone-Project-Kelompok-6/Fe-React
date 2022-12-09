import React from "react";
import Select from "react-select";

const ModalCreateOfflineBooking = ({ handleModalCreateTrigger }) => {
	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-6 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t border-b p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Add New Offline Booking</h3>
								<button
									type="button"
									className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
									data-modal-toggle="editUserModal"></button>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<Select
										className="z-50 block w-full cursor-pointer appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										name="user_id"
										placeholder="Select membership"
										noOptionsMessage={() => "Membership data not found"}
										isClearable
									/>
								</div>
								<div className="relative">
									<Select
										className="z-30 block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										name="class_id"
										placeholder="Select offline classes"
										noOptionsMessage={() => "Membership data not found"}
									/>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 border-t border-gray-200 p-6">
								<button
									data-modal-toggle="staticModal"
									type="button"
									className="w-full rounded-xl border border-secondary-navy bg-white px-5 py-2.5 text-sm font-medium text-primary-violet hover:bg-gray-100 hover:text-violet-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
									onClick={handleModalCreateTrigger}>
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

export default ModalCreateOfflineBooking;
