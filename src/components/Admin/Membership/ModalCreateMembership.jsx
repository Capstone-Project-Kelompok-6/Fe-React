import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	cancelButton,
	inputError,
	inputNotError,
	labelError,
	labelNotError,
	regexEmailValidation,
	regexNameValidation,
	regexPasswordValidation,
	saveButton,
} from "../../../utils/globalVariable";
import { PulseLoader } from "react-spinners";
import { createMembership } from "../../../stores/features/membershipSlice";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";

import Swal from "sweetalert2";
import { maxLengthCheck } from "../../../utils/maxLengthCheck";

const baseValue = {
	first_name: "",
	last_name: "",
	email: "",
	phone_number: "",
	password: "",
};

const baseErrors = {
	first_name: "",
	last_name: "",
	email: "",
	phone_number: "",
	password: "",
};

const ModalCreateMembership = ({ handleModalCreateTrigger }) => {
	const [values, setValues] = useState(baseValue);
	const [errors, setErrors] = useState(baseErrors);
	const [passwordShown, setPasswordShown] = useState(false);
	const dispatch = useDispatch();
	const loaderSubmit = useSelector((state) => state.loaderSubmit);

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
		if (name === "first_name") {
			if (!regexNameValidation.test(value)) {
				setErrors({ ...errors, first_name: "First name must be in letters" });
			} else if (value == "") {
				setErrors({ ...errors, first_name: "First name is required" });
			} else {
				setErrors({ ...errors, first_name: "" });
			}
		}

		if (name === "last_name") {
			if (!regexNameValidation.test(value)) {
				setErrors({ ...errors, last_name: "Last name must be in letters" });
			} else if (value == "") {
				setErrors({ ...errors, last_name: "Last name is required" });
			} else {
				setErrors({ ...errors, last_name: "" });
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

		if (name === "password") {
			if (!regexPasswordValidation.test(value)) {
				setErrors({
					...errors,
					password: "Password must contain minimum one capital letter and one number",
				});
			} else if (value.length <= 8) {
				setErrors({ ...errors, password: "Password must be more than 8 characters" });
			} else {
				setErrors({ ...errors, password: "" });
			}
		}
	};

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoaderSubmit(true));

		const formData = new FormData(e.target);
		const first_name = formData.get("first_name");
		const last_name = formData.get("last_name");
		const email = formData.get("email");
		const phone_number = formData.get("phone_number");
		const password = formData.get("password");

		if (
			!errors.first_name &&
			!errors.last_name &&
			!errors.email &&
			!errors.phone_number &&
			!errors.password
		) {
			dispatch(createMembership({ first_name, last_name, phone_number, email, password })).then(
				(res) => {
					if (!res.error) {
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Saved",
									text: "Membership data successfully saved",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
						handleModalCreateTrigger();
						dispatch(setLoaderSubmit(false));
					} else {
						Swal.fire("Sorry", res.error.message.split(":")[1], "error");
						dispatch(setLoaderSubmit(false));
					}
				}
			);
		} else {
			setTimeout(
				() =>
					Swal.fire({
						icon: "error",
						title: "Membership data cannot saved",
						text: "Please, check your inputed data",
						background: "#ffffff",
					}),
				1000
			);
			dispatch(setLoaderSubmit(false));
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity duration-300 ease-linear"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-4 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleSubmit} className="rounded-xl bg-white shadow-4">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Add New Membership
								</h3>
							</div>
							<div className="space-y-6 p-6">
								<div>
									<div className="relative">
										<input
											type="text"
											id="first_name"
											name="first_name"
											className={errors.first_name ? inputError : inputNotError}
											placeholder=" "
											required
											onChange={handleChange}
										/>
										<label
											htmlFor="first_name"
											className={errors.last_name ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												First Name
											</span>
										</label>
									</div>
									<div className="mt-1">
										{errors.first_name && (
											<span className="text-xs font-light text-secondary-red md:text-sm">
												<i className="fi fi-rr-info"></i> {errors.first_name}
											</span>
										)}
									</div>
								</div>
								<div>
									<div className="relative">
										<input
											type="text"
											id="last_name"
											name="last_name"
											className={errors.last_name ? inputError : inputNotError}
											placeholder=" "
											required
											onChange={handleChange}
										/>
										<label
											htmlFor="last_name"
											className={errors.last_name ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Last Name
											</span>
										</label>
									</div>
									<div className="mt-1">
										{errors.last_name && (
											<span className="text-xs font-light text-secondary-red md:text-sm">
												<i className="fi fi-rr-info"></i> {errors.last_name}
											</span>
										)}
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
											onChange={handleChange}
											required
										/>
										<label htmlFor="email" className={errors.email ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Email
											</span>
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
									<div className="relative grid grid-flow-col grid-cols-2 gap-0">
										<input
											type={passwordShown ? "text" : "password"}
											id="password"
											name="password"
											className={
												errors.password
													? `${inputError} flex-2 col-span-2`
													: `${inputNotError} flex-2 col-span-2`
											}
											placeholder=" "
											onChange={handleChange}
											required
										/>
										<label
											htmlFor="password"
											className={errors.password ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Password
											</span>
										</label>
										<button type="button" onClick={togglePassword}>
											{passwordShown === false ? (
												<i className="fi fi-rr-eye absolute right-0.5 -bottom-1 p-2.5 text-tertiary-5 hover:transition-colors lg:right-0.5 lg:-bottom-1.5 lg:text-lg"></i>
											) : (
												<i className="fi fi-rr-eye-crossed absolute right-0.5 -bottom-1 p-2.5 text-tertiary-5 hover:transition-colors lg:right-0.5 lg:-bottom-1.5 lg:text-lg"></i>
											)}
										</button>
									</div>
									<div className="mt-1">
										{errors.password && (
											<span className="text-xs font-light text-secondary-red md:text-sm">
												<i className="fi fi-rr-info"></i> {errors.password}
											</span>
										)}
									</div>
								</div>
								<div>
									<div className="relative">
										<input
											type="number"
											min="1"
											id="phone_number"
											name="phone_number"
											className={errors.phone_number ? inputError : inputNotError}
											placeholder=" "
											onChange={handleChange}
											required
											maxLength={maxLengthPhoneNumber}
											onInput={maxLengthCheck}
										/>
										<label
											htmlFor="phone_number"
											className={errors.phone_number ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Phone Number
											</span>
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
							<div className="flex items-center justify-center space-x-2 p-6">
								<button type="button" className={cancelButton} onClick={handleModalCreateTrigger}>
									Cancel
								</button>
								{loaderSubmit ? (
									<button className={saveButton}>
										<PulseLoader size={5} color={"#ffffff"} />
									</button>
								) : (
									<button type="submit" className={saveButton}>
										Save
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

export default ModalCreateMembership;
