import React, { useEffect, useState } from "react";
import { inputError, inputNotError, labelError, labelNotError, regexNameValidation } from "../../../utils/globalVariable";

const baseValues = {
	workout: "",
	image: "",
};

const baseErrors = {
	workout: "",
	image: "",
};

const ModalEditWorkout = ({ handleModalEditTrigger }) => {
	const [file, setFile] = useState(null);
	const [fileDataURL, setFileDataURL] = useState(null);
	const [errors, setErrors] = useState(baseErrors);
	const [values, setValues] = useState(baseValues);

	const MAX_FILE_SIZE = 1024;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		validation(name, value);
	};

	const validation = (name, value) => {
		if (name === "workout") {
			if (!regexNameValidation.test(value)) {
				setErrors({ ...errors, workout: "Workout name must be in letters" });
			} else if (value == "") {
				setErrors({ ...errors, workout: "Workout name is required" });
			} else {
				setErrors({ ...errors, workout: "" });
			}
		}
	};

	const handleUploadImage = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const fileSizeKiloBytes = file.size / 1024;

		if (fileSizeKiloBytes > MAX_FILE_SIZE) {
			setErrors({ ...errors, image: "File size is greater than maximum limit" });
			return;
		} else {
			setErrors({ ...errors, image: "" });
		}

		setFile(file);
	};

	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (file) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				const { result } = e.target;
				if (result && !isCancel) {
					setFileDataURL(result);
				}
			};
			fileReader.readAsDataURL(file);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [file]);

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-16 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t border-b p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Edit Workout</h3>
							</div>
							<div className="h-[65vh] overflow-y-auto p-6">
								<div className="h-[90&] space-y-6">
									<div>
										<div className="relative">
											<input
												type="text"
												id="workout"
												name="workout"
												className={errors.workout ? inputError : inputNotError}
												placeholder=" "
												onChange={handleChange}
												required
											/>
											<label htmlFor="workout" className={errors.workout ? labelError : labelNotError}>
												<span className="block after:ml-1 after:text-red-500 after:content-['*']">Workout Name</span>
											</label>
										</div>
										<div className="mt-1">
											{errors.workout && (
												<span className="text-xs font-light text-secondary-red md:text-sm">
													<i className="fi fi-rr-info"></i> {errors.workout}
												</span>
											)}
										</div>
									</div>
									<div className="relative">
										{fileDataURL ? (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<img
														src={fileDataURL}
														alt=""
														className="h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-cover object-center"
													/>
												</div>
											</div>
										) : (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<img src="" alt="" className="h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-cover object-center" />
												</div>
											</div>
										)}
										<input
											className="mb-1 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
											name="image"
											id="image"
											type="file"
											accept="image/*"
											onChange={handleUploadImage}
											required
										/>
										<div className="mb-2 flex items-center space-x-4">
											{errors.image && (
												<span className="text-xs font-light text-secondary-red md:text-sm">
													<i className="fi fi-rr-info"></i> {errors.image}
												</span>
											)}
											<div className="min-w-0 flex-1">
												<p className="text-end text-xs font-medium text-neutral-100-2 md:text-sm">Max size: 1MB</p>
											</div>
										</div>
									</div>
									<div className="relative">
										<textarea
											id="description"
											name="description"
											type="text"
											rows="5"
											className="peer w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 first-line:block focus:border-blue-500 focus:ring-blue-500"
											placeholder=" "></textarea>
										<label
											htmlFor="description"
											className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-neutral-60 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
											<span className="block after:ml-1 after:text-red-500 after:content-['*']"> Description</span>
										</label>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 border-t border-gray-200 p-6">
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

export default ModalEditWorkout;
