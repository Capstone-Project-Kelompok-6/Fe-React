import React, { useState, useEffect, useRef } from "react";
import { inputError, inputNotError, labelError, labelNotError, regexEmailValidation, regexNameValidation } from "../../../utils/globalVariable";

const baseErrors = {
	instructor_name: "",
	image: "",
	email: "",
	phone_number: "",
};

const baseValues = {
	instructor_name: "",
	image: "",
	email: "",
	phone_number: "",
};

const ModalCreateInstructor = ({ handleModalCreateTrigger }) => {
	const [file, setFile] = useState(null);
	const [fileDataURL, setFileDataURL] = useState(null);
	const [errors, setErrors] = useState(baseErrors);
	const [values, setValues] = useState(baseValues);
	const imageInstructor = useRef(null);

	const MAX_FILE_SIZE = 1024;
	const maxLengthPhoneNumber = 13;

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
		validation(name, value);
	};

	const validation = (name, value) => {
		if (name === "instructor_name") {
			if (!regexNameValidation.test(value)) {
				setErrors({ ...errors, instructor_name: "Full name must be in letters" });
			} else if (value == "") {
				setErrors({ ...errors, instructor_name: "Full name is required" });
			} else {
				setErrors({ ...errors, instructor_name: "" });
			}
		}

		if (name === "email") {
			if (!regexEmailValidation.test(value)) {
				setErrors({ ...errors, email: "Invalid email" });
			} else if (value == "") {
				setErrors({ ...errors, email: "Email is required" });
			} else {
				setErrors({ ...errors, email: "" });
			}
		}

		if (name === "phone_number") {
			if (value == "") {
				setErrors({ ...errors, phone_number: "Phone number is required" });
			} else if (value.length <= 11) {
				setErrors({ ...errors, phone_number: "Phone number must be longer than 11 characters" });
			} else {
				setErrors({ ...errors, phone_number: "" });
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

	const handleCancelUpload = () => {
		setFileDataURL("");
		imageInstructor.current.value = "";
	};

	const checkMaxLengthPhoneNumber = (e) => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.target.maxLength);
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-6 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form className="rounded-xl bg-white shadow-4">
							<div className="flex items-center justify-between rounded-t border-b p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Add New Instructor</h3>
								<button
									type="button"
									className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
									data-modal-toggle="editUserModal"></button>
							</div>
							<div className="space-y-6 p-6">
								<div>
									<div className="relative">
										<input
											type="text"
											id="instructor_name"
											name="instructor_name"
											className={errors.instructor_name ? inputError : inputNotError}
											placeholder=" "
											onChange={handleChange}
											required
										/>
										<label htmlFor="instructor_name" className={errors.instructor_name ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">Fullname</span>
										</label>
									</div>
									<div className="mt-1">
										{errors.instructor_name && (
											<span className="text-xs font-light text-secondary-red md:text-sm">
												<i className="fi fi-rr-info"></i> {errors.instructor_name}
											</span>
										)}
									</div>
								</div>
								<div className="relative">
									{fileDataURL ? (
										<div className="my-5 flex w-full items-center justify-center">
											<div className="flex flex-col items-center justify-center">
												<img src={fileDataURL} alt="" className="h-32 w-32 rounded-full border-2 border-dashed border-neutral-80 object-cover" />
												<button
													type="button"
													className="absolute top-0 ml-20 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-500 text-sm font-bold text-white"
													onClick={handleCancelUpload}>
													<i className="fi fi-rr-cross-small mt-1"></i>
												</button>
											</div>
										</div>
									) : (
										<div className="my-5 flex w-full items-center justify-center">
											<div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-dashed border-neutral-80">
												<div className="flex flex-col items-center justify-center pt-5 pb-5">
													<i className="fi fi-rr-camera text-2xl text-neutral-80"></i>
												</div>
											</div>
										</div>
									)}
									<input
										className="mb-1 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
										id="image"
										name="image"
										type="file"
										accept="image/*"
										ref={imageInstructor}
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
								<div>
									<div className="relative">
										<input
											type="email"
											id="email"
											name="email"
											className={errors.email ? inputError : inputNotError}
											placeholder=" "
											required
											onChange={handleChange}
										/>
										<label htmlFor="email" className={errors.email ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">Email</span>
										</label>
									</div>
									<div className="mt-1">
										{errors.email && (
											<span className="text-xs font-light text-secondary-red md:text-sm">
												<i className="fi fi-rr-info"></i> {errors.email}
											</span>
										)}
									</div>
								</div>

								<div>
									<div className="relative">
										<input
											type="number"
											min="1"
											maxLength={maxLengthPhoneNumber}
											onInput={checkMaxLengthPhoneNumber}
											onChange={handleChange}
											id="phone_number"
											name="phone_number"
											className={errors.phone_number ? inputError : inputNotError}
											placeholder=" "
											required
										/>
										<label htmlFor="phone_number" className={errors.phone_number ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">Phone Number</span>
										</label>
									</div>
									<div className="mt-1">
										{errors.phone_number && (
											<span className="text-xs font-light text-secondary-red md:text-sm">
												<i className="fi fi-rr-info"></i> {errors.phone_number}
											</span>
										)}
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 border-t border-gray-200 p-6">
								<button
									type="button"
									className="w-full rounded-xl border border-secondary-navy bg-white px-5 py-2.5 text-sm font-medium text-primary-violet hover:bg-gray-100 hover:text-violet-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
									onClick={handleModalCreateTrigger}>
									Cancel
								</button>
								<button
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

export default ModalCreateInstructor;
