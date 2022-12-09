import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Select from "react-select";
import thumbnail from "../../../assets/img/png/thumbnail.png";

const baseErrors = {
	video: "",
};

const ModalEditOnlineClasses = ({ handleModalEditTrigger }) => {
	const [file, setFile] = useState("");
	const [fileDataURL, setFileDataURL] = useState(null);
	const [title, setTitle] = useState("");
	const [errors, setErrors] = useState(baseErrors);

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

	const maxLengthCheck = (e) => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.target.maxLength);
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form className="rounded-xl bg-white shadow" encType="multipart/form-data">
							<div className="flex items-center justify-between rounded-t border-b p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">Edit Online Classes</h3>
							</div>
							<div className="h-[65vh] overflow-y-auto p-6">
								<div className="h-[90&] space-y-6">
									<div>
										<div className="relative">
											<input
												type="text"
												id="video_title"
												name="video_title"
												maxLength={maxTitle}
												onInput={maxLengthCheck}
												onChange={(e) => setTitle(e.target.value)}
												className="peer block w-full appearance-none rounded-lg border border-neutral-60 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
												placeholder=" "
											/>
											<label
												htmlFor="video_title"
												className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-neutral-60 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
												<span className="block after:ml-1 after:text-red-500 after:content-['*']">Video Title</span>
											</label>
										</div>
										<h1 className="mt-2 text-end text-xs font-medium text-neutral-60 md:text-sm">
											{title.length}/{maxTitle}
										</h1>
									</div>
									<div className="relative">
										<Select
											className="z-50 block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0"
											name="workout_id"
											placeholder="Select workout category"
											noOptionsMessage={() => "Workout data not found"}
										/>
									</div>
									<div className="relative">
										{fileDataURL ? (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<ReactPlayer
														url={fileDataURL}
														className="inset-0 h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-fill object-center transition-all duration-300 ease-in-out"
														playing
														width="320px"
														height="208px"
														controls
														playIcon={
															<button>
																<i className="fi fi-sr-play text-2xl text-white"></i>
															</button>
														}
														light={thumbnail}
													/>
												</div>
											</div>
										) : (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<video
														src=""
														controls
														className="inset-0 h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-fill object-center"
													/>
												</div>
											</div>
										)}
										<input
											className="mb-5 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
											id="video"
											name="video"
											type="file"
											accept="video/*"
											onChange={handleUploadVideo}
										/>
									</div>
									<div className="relative">
										<input
											type="number"
											min="1"
											id="price"
											name="price"
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
											className="peer w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 first-line:block focus:border-blue-500 focus:ring-blue-500"
											placeholder=" "></textarea>
										<label
											htmlFor="description"
											className="absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-neutral-60 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
											<span className="block after:ml-1 after:text-red-500 after:content-['*']"> Information</span>
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

export default ModalEditOnlineClasses;
