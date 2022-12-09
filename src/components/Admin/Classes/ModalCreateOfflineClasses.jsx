import React from "react";
import Select from "react-select";

const ModalCreateOfflineClasses = ({ handleModalCreateTrigger }) => {
	const dataDayTime = [
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
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t border-b p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Add New Offline Classes</h3>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<Select
										className="z-50 block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										name="workout_id"
										placeholder="Select workout category"
										noOptionsMessage={() => "Workout data not found"}
									/>
								</div>
								<div className="relative">
									<Select
										className="z-40 block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										name="instructor_id"
										placeholder="Select instructure"
										noOptionsMessage={() => "Instructure data not found"}
									/>
								</div>
								<div className="relative">
									<Select
										className="z-30 block w-full appearance-none rounded-lg border border-neutral-60 bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										options={dataDayTime}
										name="class_dates"
										placeholder="Select day & time"
										noOptionsMessage={() => "No options"}
										isMulti
									/>
								</div>
								<div className="relative">
									<input
										type="number"
										id="price"
										name="price"
										min="1"
										className="peer block w-full appearance-none rounded-lg border border-neutral-60 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
										placeholder=" "
									/>
									<label
										htmlFor="price"
										className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-neutral-60 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Price</span>
									</label>
								</div>
								<div className="relative">
									<textarea
										id="description"
										name="description"
										rows="5"
										className="peer w-full rounded-lg border border-neutral-60 bg-white p-2.5 text-sm text-gray-900 first-line:block focus:border-blue-500 focus:ring-blue-500"
										placeholder=" "></textarea>
									<label
										htmlFor="description"
										className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-neutral-60 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
										<span className="block after:ml-1 after:text-red-500 after:content-['*']"> Description</span>
									</label>
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

export default ModalCreateOfflineClasses;
