import React from "react";
import Select from "react-select";
import { cancelButton, inputNotError, labelNotError, saveButton } from "../../../utils/globalVariable";

const ModalEditOfflineClasses = ({ handleModalEditTrigger }) => {
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
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Edit Offline Classes</h3>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<Select
										className="z-50 block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										name="workout_id"
										placeholder="Select workout category"
										noOptionsMessage={() => "Workout data not found"}
										isClearable
									/>
								</div>
								<div className="relative">
									<Select
										className="z-40 block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										name="instructor_id"
										placeholder="Select instructure"
										noOptionsMessage={() => "Instructure data not found"}
										isClearable
									/>
								</div>
								<div className="relative">
									<Select
										className="z-30 block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
										options={dataDayTime}
										name="class_dates"
										placeholder="Select day & time"
										noOptionsMessage={() => "No options"}
										isMulti
										isClearable
									/>
								</div>
								<div className="relative">
									<input type="number" id="price" name="price" className={inputNotError} placeholder=" " />
									<label htmlFor="price" className={labelNotError}>
										<span className="block after:ml-1 after:text-red-500 after:content-['*']">Price</span>
									</label>
								</div>
								<div className="relative">
									<textarea id="description" name="description" rows="5" className={inputNotError} placeholder=" "></textarea>
									<label htmlFor="description" className={labelNotError}>
										<span className="block after:ml-1 after:text-red-500 after:content-['*']"> Description</span>
									</label>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 border-t border-gray-200 p-6">
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
