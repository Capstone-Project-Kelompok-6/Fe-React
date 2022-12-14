import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import useHook from "../../../hooks/useHook";
import { deleteOfflineClasses } from "../../../stores/features/offlineClassesSlice";
import { formatPrice } from "../../../utils/formatPrice";
import {
	actionDropdownDelete,
	actionDropdownEdit,
	cancelButtonSwal,
	confirmButtonSwal,
} from "../../../utils/globalVariable";
import { truncate } from "../../../utils/truncate";
import ModalEditOfflineClasses from "./ModalEditOfflineClasses";

const OfflineClassesListItem = ({ data }) => {
	const {
		class_id,
		instructor_name,
		workout,
		instructor_image,
		workout_image,
		class_dates,
		price,
	} = data;
	const dispatch = useDispatch();
	const { actionDropdown, setActionDropdown, modalEditTrigger, setModalEditTrigger } = useHook();

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
					dispatch(deleteOfflineClasses(class_id));
					try {
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Deleted",
									text: "Offline classes data has been deleted",
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
									text: "Offline classes data cannot deleted",
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

	const handleActionDropdown = () => {
		setActionDropdown(!actionDropdown);
	};

	const handleModalEditTrigger = () => {
		setModalEditTrigger(!modalEditTrigger);
	};

	return (
		<div className="rounded-20 bg-white shadow-3">
			<div className="relative overflow-hidden rounded-t-20 pb-40">
				<img
					className="absolute inset-0 h-full w-full rounded-t-20 object-cover object-center transition duration-300 ease-in-out hover:scale-105 hover:rounded-t-20"
					src={workout_image}
					alt="workout-image"
					loading="lazy"
				/>
				<div className="group relative">
					<button
						className="absolute right-0 top-0 cursor-pointer rounded-bl-xl rounded-tr-20 bg-neutral-80 bg-opacity-50 px-4 py-2 text-blue-100 shadow-4 hover:rounded-tr-20"
						onClick={handleActionDropdown}>
						<i className="fi fi-br-menu-dots-vertical"></i>
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

			<div className="p-5">
				<div className="mb-4 flex items-center space-x-4">
					<div className="min-w-0 flex-1">
						<p className="truncate text-base font-medium text-neutral-100-2">{workout}</p>
					</div>
					<div className="inline-flex items-center text-sm font-semibold text-neutral-100-2">
						{formatPrice(price)}
					</div>
				</div>

				<div className="relative mb-28 space-x-2 text-sm">
					<div className="absolute flex">
						<div className="mr-3 mt-0.5 flex-shrink-0">
							<span className="text-secondary-navy">
								<i className="fi fi-sr-clock"></i>
							</span>
						</div>
						<div className="flex-1 text-sm leading-relaxed">
							{class_dates &&
								class_dates.map((date) => {
									return (
										<h5 className="font-normal tracking-tight text-neutral-100-2" key={date}>
											{date}
										</h5>
									);
								})}
						</div>
					</div>
				</div>
				<div className="flex items-center space-x-3">
					<img
						className="h-8 w-8 rounded-full object-cover object-center"
						src={instructor_image}
						alt="image instructor"
					/>

					<div className="min-w-0 flex-1">
						<p className="text-base font-medium text-neutral-100-2">
							{truncate(instructor_name, 20)}
						</p>
					</div>
				</div>
			</div>
			{modalEditTrigger && (
				<ModalEditOfflineClasses
					handleModalEditTrigger={handleModalEditTrigger}
					update={data}
					handleActionDropdown={handleActionDropdown}
				/>
			)}
		</div>
	);
};

export default OfflineClassesListItem;
