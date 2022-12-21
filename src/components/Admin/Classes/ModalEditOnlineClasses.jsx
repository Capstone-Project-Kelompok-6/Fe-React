import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import {
	editOnlineClasses,
	editOnlineVideoClasses,
} from "../../../stores/features/onlineClassesSlice";
import { fetchWorkoutList } from "../../../stores/features/workoutSlice";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import { maxLengthCheck } from "./../../../utils/maxLengthCheck";
import {
	cancelButton,
	disabledButton,
	imageMimeType,
	inputNotError,
	labelNotError,
	saveButton,
	select,
	videoMimeType,
} from "../../../utils/globalVariable";
import { handleKeyDown } from "../../../utils/rmvHtmlTag";

const baseValues = {
	video_title: "",
	price: "",
	description: "",
};

const baseErrors = {
	video: "",
	thumbnail: "",
};

const ModalEditOnlineClasses = ({ handleModalEditTrigger, handleActionDropdown, update }) => {
	const {
		class_id,
		video_title,
		workout,
		video,
		video_name,
		thumbnail,
		thumbnail_name,
		price,
		description,
		workout_id,
	} = update;
	const [values, setValues] = useState(baseValues);
	const [selectedWorkout, setSelectedWorkout] = useState("");
	const [editVideo, setEditVideo] = useState(null);
	const [editThumbnail, setEditThumbnail] = useState(null);
	const [videoDataURL, setVideoDataURL] = useState(null);
	const [thumbnailDataURL, setThumbnailDataURL] = useState(null);
	const [errors, setErrors] = useState(baseErrors);
	const dispatch = useDispatch();
	const workoutList = useSelector((state) => state.workout.data);
	const loading = useSelector((state) => state.workout.loading);
	const loaderSubmit = useSelector((state) => state.loaderSubmit);

	const maxTitle = 100;
	const MAX_FILE_SIZE_VIDEO = 5120;
	const MAX_FILE_SIZE_IMAGE = 3072;

	useEffect(() => {
		dispatch(fetchWorkoutList(1000));
	}, [loading, dispatch]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleUploadVideo = (e) => {
		e.preventDefault();
		const fileVideo = e.target.files[0];
		if (!fileVideo) return;

		const fileSizeKiloBytes = fileVideo.size / 1024;
		if (!fileVideo.type.match(videoMimeType)) {
			setErrors({
				...errors,
				video: "Video mime type is not valid",
			});
			return;
		} else if (fileSizeKiloBytes > MAX_FILE_SIZE_VIDEO) {
			setErrors({ ...errors, video: "File size is greater than maximum limit" });
			return;
		} else {
			setErrors({ ...errors, video: "" });
		}

		setEditVideo(fileVideo);
	};

	const handleUploadImage = (e) => {
		e.preventDefault();
		const fileThumbnail = e.target.files[0];
		if (!fileThumbnail) return;

		const fileSizeKiloBytes = fileThumbnail.size / 1024;
		if (!fileThumbnail.type.match(imageMimeType)) {
			setErrors({
				...errors,
				thumbnail: "Image mime type is not valid",
			});
			return;
		} else if (fileSizeKiloBytes > MAX_FILE_SIZE_IMAGE) {
			setErrors({ ...errors, thumbnail: "File size is greater than maximum limit" });
			return;
		} else {
			setErrors({ ...errors, thumbnail: "" });
		}

		setEditThumbnail(fileThumbnail);
	};

	useEffect(() => {
		let fileReaderVideo,
			fileReaderThumbnail,
			isCancel = false;
		if (editVideo) {
			fileReaderVideo = new FileReader();
			fileReaderVideo.onload = (e) => {
				const { result } = e.target;
				if (result && !isCancel) {
					setVideoDataURL(result);
				}
			};
			fileReaderVideo.readAsDataURL(editVideo);
		}
		if (editThumbnail) {
			fileReaderThumbnail = new FileReader();
			fileReaderThumbnail.onload = (e) => {
				const { result } = e.target;
				if (result && !isCancel) {
					setThumbnailDataURL(result);
				}
			};
			fileReaderThumbnail.readAsDataURL(editThumbnail);
		}
		return () => {
			isCancel = true;
			if (fileReaderVideo && fileReaderVideo.readyState === 1) {
				fileReaderVideo.abort();
			}
			if (fileReaderThumbnail && fileReaderThumbnail.readyState === 1) {
				fileReaderThumbnail.abort();
			}
		};
	}, [editVideo, editThumbnail]);

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(setLoaderSubmit(true));

		const formData = new FormData(e.target);
		const video_title = formData.get("video_title");
		const workout_id = formData.get("workout_id");
		const price = Number(formData.get("price"));
		const description = formData.get("description");

		if (!errors.video && !errors.thumbnail) {
			dispatch(
				editOnlineClasses({
					class_id,
					workout,
					video_title,
					workout_id,
					price,
					description,
					video,
					video_name,
					thumbnail,
					thumbnail_name,
				})
			).then(() => {
				const video = formData.get("video");
				const thumbnail = formData.get("thumbnail");
				if (video.name !== "" && thumbnail.name !== "") {
					dispatch(
						editOnlineVideoClasses({
							class_id,
							workout,
							video_title,
							workout_id,
							price,
							description,
							video,
							video_name,
							thumbnail,
							thumbnail_name,
						})
					).then((res) => {
						if (res) {
							handleModalEditTrigger();
							handleActionDropdown();
							setTimeout(
								() =>
									Swal.fire({
										icon: "success",
										title: "Updated",
										text: "Online classes data successfully updated",
										showConfirmButton: false,
										timer: 2000,
										background: "#ffffff",
									}),
								1000
							);
							dispatch(setLoaderSubmit(false));
						}
					});
				} else {
					handleModalEditTrigger();
					handleActionDropdown();
					setTimeout(
						() =>
							Swal.fire({
								icon: "success",
								title: "Updated",
								text: "Online classes data successfully updated",
								showConfirmButton: false,
								timer: 2000,
								background: "#ffffff",
							}),
						1000
					);
					dispatch(setLoaderSubmit(false));
				}
			});
		} else {
			setTimeout(
				() =>
					Swal.fire({
						icon: "error",
						title: "Online classes data cannot updated",
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
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-14 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Edit Online Classes
								</h3>
							</div>
							<div className="h-[68vh] overflow-y-auto px-6 pt-2 pb-6">
								<div className="h-[90%] space-y-6">
									<div>
										<div className="relative">
											<input
												type="text"
												id="video_title"
												name="video_title"
												maxLength={maxTitle}
												onInput={maxLengthCheck}
												onChange={handleChange}
												className={inputNotError}
												placeholder=" "
												defaultValue={video_title}
												required
											/>
											<label htmlFor="video_title" className={labelNotError}>
												<span className="block after:ml-1 after:text-red-500 after:content-['*']">
													Video Title
												</span>
											</label>
										</div>
										{values.video_title ? (
											<h1 className="mt-2 text-end text-xs font-normal text-dark-4 md:text-sm">
												{values.video_title.length}/{maxTitle}
											</h1>
										) : (
											<h1 className="mt-2 text-end text-xs font-normal text-dark-4 md:text-sm">
												{video_title.length}/{maxTitle}
											</h1>
										)}
									</div>
									<div className="relative">
										<Select
											className={`z-50 ${select}`}
											options={workoutList.rows
												?.map((item) => {
													return { value: item.workout_id, label: item.workout };
												})
												.sort((a, b) => a.label.localeCompare(b.label))}
											defaultValue={{ value: workout_id, label: workout }}
											name="workout_id"
											placeholder="Select workout category"
											noOptionsMessage={() => "Workout data not found"}
											onChange={(e) => setSelectedWorkout(e.value)}
										/>
									</div>
									<div className="relative">
										{videoDataURL ? (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<video
														src={videoDataURL}
														controls
														className="inset-0 h-52 w-80 rounded-lg border-2 border-dashed border-gray-300 object-fill object-center"
													/>
												</div>
											</div>
										) : (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<video
														src={video}
														alt={video_name}
														controls
														className="inset-0 h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-fill object-center"
													/>
												</div>
											</div>
										)}
										<input
											className="mb-1 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
											id="video"
											name="video"
											type="file"
											accept="video/*"
											onChange={handleUploadVideo}
										/>
										<div className="mb-2 flex items-center space-x-4">
											{errors.video && (
												<span className="text-sm text-secondary-red">{errors.video}</span>
											)}
											<div className="min-w-0 flex-1">
												<p className="text-end text-xs font-medium text-neutral-100-2 md:text-sm">
													Max size: 5MB
												</p>
											</div>
										</div>
									</div>
									<div className="relative">
										{thumbnailDataURL ? (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<img
														src={thumbnailDataURL}
														alt=""
														className="h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-cover object-center"
													/>
												</div>
											</div>
										) : (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<img
														src={thumbnail}
														alt={thumbnail_name}
														className="h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-cover object-center"
													/>
												</div>
											</div>
										)}
										<input
											className="mb-1 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
											name="thumbnail"
											id="thumbnail"
											type="file"
											accept="image/*"
											onChange={handleUploadImage}
										/>
										<div className="mb-2 flex items-center space-x-4">
											{errors.thumbnail && (
												<span className="text-xs font-light text-secondary-red md:text-sm">
													<i className="fi fi-rr-info"></i> {errors.thumbnail}
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
										<input
											type="number"
											min="1"
											id="price"
											name="price"
											className={inputNotError}
											placeholder=" "
											defaultValue={price}
											onChange={handleChange}
										/>
										<label htmlFor="price" className={labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Price
											</span>
										</label>
									</div>
									<div className="relative">
										<textarea
											id="description"
											name="description"
											rows="5"
											className={inputNotError}
											placeholder=" "
											defaultValue={description}
											onKeyDown={handleKeyDown}
											onChange={handleChange}></textarea>
										<label htmlFor="description" className={labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Information
											</span>
										</label>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 p-6">
								<button type="button" className={cancelButton} onClick={handleModalEditTrigger}>
									Cancel
								</button>
								{loaderSubmit ? (
									<button className={saveButton}>
										<PulseLoader size={5} color={"#ffffff"} />
									</button>
								) : (
									<button
										type="submit"
										className={
											!values.video_title &&
											!selectedWorkout &&
											!values.price &&
											!values.description &&
											!editVideo &&
											!editThumbnail
												? disabledButton
												: saveButton
										}
										disabled={
											!values.video_title &&
											!selectedWorkout &&
											!values.price &&
											!values.description &&
											!editVideo &&
											!editThumbnail
										}>
										Save Changes
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

export default ModalEditOnlineClasses;
