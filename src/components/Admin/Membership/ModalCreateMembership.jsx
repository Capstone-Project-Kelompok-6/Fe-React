import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
	inputError,
	inputNotError,
	labelError,
	labelNotError,
	regexEmailValidation,
	regexNameValidation,
	regexPasswordValidation,
} from "../../../utils/globalVariable";
import { createMembership } from "../../../stores/features/membershipSlice";

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
				setErrors({ ...errors, password: "Password must contain minimum one capital letter and one number" });
			} else if (value.length <= 8) {
				setErrors({ ...errors, password: "Password must be more than 8 characters" });
			} else {
				setErrors({ ...errors, password: "" });
			}
		}
	};

	const checkMaxLengthPhoneNumber = (e) => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.target.maxLength);
		}
	};

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const first_name = formData.get("first_name");
		const last_name = formData.get("last_name");
		const email = formData.get("email");
		const phone_number = formData.get("phone_number");
		const password = formData.get("password");

		if (!errors.first_name && !errors.last_name && !errors.email && !errors.phone_number && !errors.password) {
			try {
				dispatch(createMembership({ first_name, last_name, phone_number, email, password })).then((res) => {
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
					} else {
						Swal.fire("Sorry", res.error.message.split(":")[1], "error");
					}
				});
			} catch (error) {
				Swal.fire("Sorry", error.message, "error");
			}
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
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity duration-300 ease-linear"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-4 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleSubmit} className="rounded-xl bg-white shadow-4">
							<div className="flex items-center justify-between rounded-t border-b p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Add New Membership</h3>
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
											id="first_name"
											name="first_name"
											className={errors.first_name ? inputError : inputNotError}
											placeholder=" "
											required
											onChange={handleChange}
										/>
										<label htmlFor="first_name" className={errors.last_name ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">First Name</span>
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
										<label htmlFor="last_name" className={errors.last_name ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">Last Name</span>
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
									<div className="relative grid grid-flow-col grid-cols-2 gap-0">
										<input
											type={passwordShown ? "text" : "password"}
											id="password"
											name="password"
											className={errors.password ? `${inputError} flex-2 col-span-2` : `${inputNotError} flex-2 col-span-2`}
											placeholder=" "
											onChange={handleChange}
											required
										/>
										<label htmlFor="password" className={errors.password ? labelError : labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">Password</span>
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
											onInput={checkMaxLengthPhoneNumber}
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

export default ModalCreateMembership;
