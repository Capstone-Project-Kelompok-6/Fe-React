import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createWorkout } from "../../../stores/features/workoutSlice";
import {
	cancelButton,
	imageMimeType,
	inputError,
	inputNotError,
	labelError,
	labelNotError,
	regexNameValidation,
	saveButton,
} from "../../../utils/globalVariable";
import { PulseLoader } from "react-spinners";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { handleKeyDown } from "../../../utils/rmvHtmlTag";

const baseValues = {
	workout: "",
	image: "",
	description: "",
};

const baseErrors = {
	workout: "",
	image: "",
	description: "",
};

const ModalCreateWorkout = ({ handleModalCreateTrigger }) => {
	const [addImage, setAddImage] = useState(null);
	const [imageDataURL, setImageDataURL] = useState(null);
	const [errors, setErrors] = useState(baseErrors);
	const [values, setValues] = useState(baseValues);
	const imageWorkout = useRef(null);
	const dispatch = useDispatch();
	const loaderSubmit = useSelector((state) => state.loaderSubmit);

	const MAX_FILE_SIZE_IMAGE = 3072;

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
				setErrors({
					...errors,
					workout: "Workout name must be in letters",
				});
			} else if (value == "") {
				setErrors({
					...errors,
					workout: "Workout name is required",
				});
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

		if (!file.type.match(imageMimeType)) {
			setErrors({
				...errors,
				image: "Image mime type is not valid",
			});
			return;
		} else if (fileSizeKiloBytes > MAX_FILE_SIZE_IMAGE) {
			setErrors({
				...errors,
				image: "File size is greater than maximum limit",
			});
			return;
		} else {
			setErrors({ ...errors, image: "" });
		}

		setAddImage(file);
	};

	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (addImage) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				const { result } = e.target;
				if (result && !isCancel) {
					setImageDataURL(result);
				}
			};
			fileReader.readAsDataURL(addImage);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [addImage]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoaderSubmit(true));
		const formData = new FormData(e.target);
		const workout = formData.get("workout");
		const image = formData.get("image");
		const description = formData.get("description");

		if (!errors.workout && !errors.image) {
			dispatch(createWorkout({ workout, image, description })).then((res) => {
				if (!res.error) {
					setTimeout(
						() =>
							Swal.fire({
								icon: "success",
								title: "Saved",
								text: "Workout data successfully saved",
								showConfirmButton: false,
								timer: 2000,
								background: "#ffffff",
							}),
						1000
					);
					handleModalCreateTrigger();
					dispatch(setLoaderSubmit(false));
				} else {
					Swal.fire("Sorry", res.error.message.split(":")[1], "info");
					dispatch(setLoaderSubmit(false));
				}
			});
		} else {
			setTimeout(
				() =>
					Swal.fire({
						icon: "error",
						title: "Workout data cannot saved",
						text: "Please, check your inputed data",
						background: "#ffffff",
					}),
				1000
			);
			dispatch(setLoaderSubmit(false));
		}
	};

	const handleCancelUpload = () => {
		setImageDataURL("");
		imageWorkout.current.value = "";
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-16 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleSubmit} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Add New Workout
								</h3>
							</div>
							<div className="h-[68vh] overflow-y-auto px-6 pt-0 pb-6">
								<div className="h-[90%] space-y-6">
									<div className="relative">
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
											<label
												htmlFor="workout"
												className={errors.workout ? labelError : labelNotError}>
												<span className="block after:ml-1 after:text-red-500 after:content-['*']">
													Workout Name
												</span>
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
										{imageDataURL ? (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<img
														src={imageDataURL}
														alt=""
														className="h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-cover object-center"
													/>
													<button
														type="button"
														className="absolute -top-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-500 text-sm font-bold text-white sm:mr-10 md:right-0 md:mr-14 xl:mr-20"
														onClick={handleCancelUpload}>
														<i className="fi fi-rr-cross-small mt-1"></i>
													</button>
												</div>
											</div>
										) : (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex h-52 w-80 flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-80">
													<div className="flex flex-col items-center justify-center pt-6 pb-5">
														<i className="fi fi-rr-camera text-2xl text-neutral-80"></i>
													</div>
												</div>
											</div>
										)}
										<input
											className="mb-1 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
											name="image"
											id="image"
											type="file"
											accept="image/*"
											ref={imageWorkout}
											onChange={handleUploadImage}
											required
										/>
										<div className="mb-4 flex items-center space-x-4">
											{errors.image && (
												<span className="text-xs font-light text-secondary-red md:text-sm">
													<i className="fi fi-rr-info"></i> {errors.image}
												</span>
											)}
											<div className="min-w-0 flex-1">
												<p className="text-end text-xs font-medium text-neutral-100-2 md:text-sm">
													Max size: 3MB
												</p>
											</div>
										</div>
									</div>
									<div className="relative">
										<textarea
											id="description"
											name="description"
											type="text"
											rows="5"
											className={inputNotError}
											placeholder=" "
											required
											onKeyDown={handleKeyDown}></textarea>
										<label htmlFor="description" className={labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Information
											</span>
										</label>
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

export default ModalCreateWorkout;
