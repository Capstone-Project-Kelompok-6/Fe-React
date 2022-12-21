import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import useHook from "../../../hooks/useHook";
import { deleteOnlineClasses } from "../../../stores/features/onlineClassesSlice";
import { formatPrice } from "../../../utils/formatPrice";
import {
	actionDropdownDelete,
	actionDropdownEdit,
	cancelButtonSwal,
	confirmButtonSwal,
} from "../../../utils/globalVariable";
import { truncate } from "../../../utils/truncate";
import ModalEditOnlineClasses from "./ModalEditOnlineClasses";
import ReactPlayer from "react-player";

const OnlineClassesListItem = ({ data }) => {
	const { class_id, workout, video_title, video, video_name, price, description, thumbnail } = data;
	const { actionDropdown, setActionDropdown, modalEditTrigger, setModalEditTrigger } = useHook();
	const dispatch = useDispatch();

	const handleDelete = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: confirmButtonSwal,
				cancelButton: cancelButtonSwal,
				icon: "text-secondary-yellow",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Are you sure",
				text: "You can't undo this action.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, Delete it!",
				cancelButtonText: "No, Cancel",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					try {
						dispatch(deleteOnlineClasses(class_id));
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Deleted",
									text: "Online classes data has been deleted",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
					} catch (error) {
						setTimeout(
							() =>
								Swal.fire({
									icon: "error",
									title: "Error",
									text: "Online classes data cannot be deleted",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
					}
				}
			});
	};

	const handleModalEditTrigger = () => {
		setModalEditTrigger(!modalEditTrigger);
	};

	const handleActionDropdown = () => {
		setActionDropdown(!actionDropdown);
	};

	return (
		<div>
			<div className="h-full rounded-20 bg-white shadow-4">
				<div className="relative overflow-hidden pb-48">
					{!video_name ? (
						<div
							role="status"
							className="absolute inset-0 h-full w-full animate-pulse rounded-t-20 bg-gray-300 object-fill object-center p-20 text-center">
							<i className="fi fi-sr-play text-4xl text-gray-200"></i>
							<span className="sr-only">Loading...</span>
						</div>
					) : (
						<div className="player-wrapper">
							<ReactPlayer
								className="video-player"
								url={video}
								alt={video_name}
								width="100%"
								height="100%"
								playing
								controls
								playIcon={
									<button>
										<i className="fi fi-sr-play text-4xl text-white"></i>
									</button>
								}
								light={thumbnail}
							/>
						</div>
					)}
					<div className="group relative">
						<button
							className="absolute right-0 top-0 cursor-pointer rounded-bl-xl rounded-tr-20 bg-neutral-60 bg-opacity-60 px-4 py-2 text-blue-100 shadow-4"
							onClick={handleActionDropdown}>
							<i className="fi fi-rr-menu-dots-vertical"></i>
						</button>
						{actionDropdown && (
							<div>
								<div
									className={
										actionDropdown
											? "pointer-events-auto fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
											: "pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
									}
									onClick={handleActionDropdown}></div>
								<div className="absolute top-0 right-0 z-10 mr-5 mt-8 w-32 rounded-xl bg-white shadow-4 transition duration-300">
									<ul className="list-reset">
										<li>
											<button
												type="button"
												className={`rounded-t-xl hover:rounded-t-xl ${actionDropdownEdit}`}
												onClick={handleModalEditTrigger}>
												<i className="fi fi-sr-pencil mr-2 -ml-1 mt-1 text-sm text-secondary-yellow"></i>
												Edit
											</button>
										</li>
										<li>
											<button
												type="button"
												className={`rounded-b-xl hover:rounded-b-xl ${actionDropdownDelete}`}
												onClick={handleDelete}>
												<i className="fi fi-sr-trash mr-2 -ml-1 mt-1 text-sm text-secondary-red"></i>
												Delete
											</button>
										</li>
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="px-5 py-4">
					<div className="mb-1 flex items-center">
						<div className="min-w-0 flex-1">
							<div className="group relative">
								<h5 className="text-base font-medium tracking-tight text-neutral-100-2">
									{truncate(video_title, 30)}
								</h5>

								<div className="absolute top-0 left-0 mt-5 mr-1 hidden flex-col items-center group-hover:flex md:mt-6">
									<span className="whitespace-no-wrap relative z-10 rounded-lg bg-neutral-100-2 p-2 text-[10px] leading-none text-white shadow-4">
										{video_title}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="mb-1 flex items-center space-x-3 text-sm">
						<div className="inline-flex flex-shrink-0 items-center justify-center">
							<span className="mt-1 text-secondary-navy">
								<i className="fi fi-sr-film"></i>
							</span>
						</div>
						<div className="flex-1">
							<p className="font-medium tracking-tight text-neutral-100-2">{workout}</p>
						</div>
					</div>
					<div className="mb-4">
						<h5 className="text-sm font-semibold tracking-tight text-neutral-100-2">
							{formatPrice(price)}
						</h5>
					</div>
					<div className="min-w-0 flex-1">
						<p className="whitespace-pre-line break-all text-sm font-normal text-neutral-80">
							{truncate(description, 30)}
						</p>
					</div>
				</div>
				{modalEditTrigger && (
					<ModalEditOnlineClasses
						handleModalEditTrigger={handleModalEditTrigger}
						update={data}
						handleActionDropdown={handleActionDropdown}
					/>
				)}
			</div>
		</div>
	);
};

export default OnlineClassesListItem;
