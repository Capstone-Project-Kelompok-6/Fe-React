import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import { createVideo, createVideoTitle } from "../../../stores/features/videoSlice";
import { setLoaderSubmit } from "../../../stores/features/loaderSubmitSlice";
import {
	cancelButton,
	inputNotError,
	labelNotError,
	saveButton,
} from "../../../utils/globalVariable";
import { maxLengthCheck } from "../../../utils/maxLengthCheck";

const baseErrors = {
	video: "",
};

const ModalCreateVideo = ({ handleModalCreateTrigger }) => {
	const [file, setFile] = useState("");
	const [fileDataURL, setFileDataURL] = useState(null);
	const [errors, setErrors] = useState(baseErrors);
	const [title, setTitle] = useState("");
	const dispatch = useDispatch();
	const loaderSubmit = useSelector((state) => state.loaderSubmit);

	const maxTitle = 100;
	const MAX_FILE_SIZE = 5120;

	const handleUploadVideo = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const fileSizeKiloBytes = file.size / 1024;

		if (fileSizeKiloBytes > MAX_FILE_SIZE) {
			setErrors({ ...errors, video: "File size is greater than maximum limit" });
			return;
		} else {
			setErrors({ ...errors, video: "" });
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

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoaderSubmit(true));
		const formData = new FormData(e.target);
		const title = formData.get("title");

		if (!errors.video) {
			dispatch(createVideoTitle({ title })).then((result) => {
				const video_content_id = result.payload.video_content_id;
				const video = formData.get("video");
				const video_name = result.payload.video_name;
				dispatch(createVideo({ video_content_id, video, video_name })).then((res) => {
					if (res) {
						handleModalCreateTrigger();
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Saved",
									text: "Video successfully saved",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
						dispatch(setLoaderSubmit(false));
					} else {
						handleModalCreateTrigger();
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Saved",
									text: "Video successfully saved",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
						dispatch(setLoaderSubmit(false));
					}
				});
			});
		} else {
			setTimeout(
				() =>
					Swal.fire({
						icon: "error",
						title: "Video cannot saved",
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

			<div className="fixed inset-0 z-50 items-center justify-center">
				<div className="flex w-full items-end justify-center px-4 py-16 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleSubmit} className="rounded-20 bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Add New Video
								</h3>
							</div>
							<div className="space-y-6 p-6">
								<div>
									<div className="relative">
										<input
											type="text"
											id="title"
											name="title"
											maxLength={maxTitle}
											onInput={maxLengthCheck}
											onChange={(e) => setTitle(e.target.value)}
											className={inputNotError}
											placeholder=" "
											required
										/>

										<label htmlFor="title" className={labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Title
											</span>
										</label>
									</div>
									<h1 className="mt-2 text-end text-xs font-normal text-dark-4 md:text-sm">
										{title.length}/{maxTitle}
									</h1>
								</div>
								<div className="relative">
									{fileDataURL ? (
										<div className="my-5 flex w-full items-center justify-center">
											<div className="flex flex-col items-center justify-center">
												<video
													src={fileDataURL}
													controls
													className="inset-0 h-52 w-80 rounded-lg border-2 border-dashed border-gray-300 object-fill object-center"
												/>
											</div>
										</div>
									) : (
										<div className="my-5 flex w-full items-center justify-center">
											<div className="inset-0 flex h-52 w-80 items-center justify-center rounded-lg border-2 border-dashed border-neutral-80 bg-neutral-background">
												<div className="flex items-center justify-center pt-5 pb-5">
													<i className="fi fi-rr-video-camera text-2xl text-neutral-80"></i>
												</div>
											</div>
										</div>
									)}
									<input
										className="mb-1 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
										id="video"
										name="video"
										type="file"
										accept="video/mp4"
										onChange={handleUploadVideo}
										required
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

export default ModalCreateVideo;
