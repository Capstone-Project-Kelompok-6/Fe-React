import React, { useState } from "react";
import Swal from "sweetalert2";
import { formatDateTime } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/formatPrice";
import { actionDropdownDelete, cancelButtonSwal, confirmButtonSwal } from "../../../utils/globalVariable";

const OnlineBookingListItem = ({ data }) => {
	const { email, full_name, price, video_title, workout, created_at, video, video_name } = data;
	const [actionDropdown, setActionDropdown] = useState(false);

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
						const Toast = Swal.mixin({
							customClass: {
								title: "text-sm",
							},
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							timer: 3000,
							timerProgressBar: true,
							width: "auto",
							didOpen: (toast) => {
								toast.addEventListener("mouseenter", Swal.stopTimer);
								toast.addEventListener("mouseleave", Swal.resumeTimer);
							},
						});

						Toast.fire({
							icon: "success",
							title: "Offline Booking data successfully deleted",
						});
					} catch (error) {
						return Swal.fire({
							icon: "error",
							title: "Maaf",
							text: "Anda gagal logout",
						});
					}
				}
			});
	};

	const handleActionDropdown = () => {
		setActionDropdown(!actionDropdown);
	};

	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + "..." : string;
	};

	return (
		<div>
			<div className="relative rounded-20 border bg-white py-4 shadow-4">
				<div className="mb-2 flex items-center px-5">
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium text-neutral-100-2 md:text-base">{formatDateTime(created_at)}</p>
					</div>
					<div className="mr-4 inline-flex items-center">
						<p className="rounded-full border border-secondary-green bg-tertiary-4 bg-opacity-25 px-2 py-1 font-medium text-secondary-green md:px-3">
							<i className="fi fi-sr-rec mr-1 mt-1 text-[10px]"></i>
							<span className="text-xs">Paid</span>
						</p>
					</div>
					<div className="inline-flex items-center pt-2">
						<button className="inline-block text-neutral-80" type="button" onClick={handleActionDropdown}>
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
								<div className="absolute right-0 z-40 mr-6 mt-5 w-32 rounded-xl bg-white shadow-4 transition duration-300">
									<ul className="list-reset">
										<li>
											<button type="button" className={`rounded-xl hover:rounded-xl ${actionDropdownDelete}`} onClick={handleDelete}>
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
				<div className="mx-5 mb-2 border-b border-neutral-100-2 md:mb-0"></div>
				<div className="flex flex-col px-5 md:flex-row md:items-center">
					<video className="h-48 w-full rounded-xl object-cover md:h-[120px] md:w-28">
						<source src={video} alt={video_name} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
					<div className="flex flex-col py-0 px-0 leading-normal md:py-2 md:px-4">
						<h5 className="mb-2 mt-4 text-base font-semibold tracking-tight text-neutral-100-2 md:mt-2">{truncate(`${video_title}`, 20)}</h5>
						<div className="grid grid-cols-2 gap-32 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<div className="inline-flex flex-shrink-0 items-center text-sm">
									<span className="mt-1 text-secondary-navy">
										<i className="fi fi-sr-film mr-2"></i>
									</span>
									<p className="font-medium tracking-tight text-neutral-100-2">{workout}</p>
								</div>
							</div>
							<div className="inline-flex items-center text-sm font-medium">
								<span className="mt-1 text-secondary-green">
									<i className="fi fi-sr-money fi-sr-briefcase mr-2"></i>
								</span>
								<p className="font-semibold tracking-tight text-neutral-100-2">{formatPrice(price)}</p>
							</div>
						</div>
						<div className="mb-2 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<div className="inline-flex flex-shrink-0 items-center">
									<span className="mt-1 text-sm text-secondary-navy">
										<i className="fi fi-sr-user fi-sr-briefcase mr-2"></i>
									</span>
									<div>
										<p className="pt-4 text-sm font-medium tracking-tight text-neutral-100-2">{full_name}</p>
										<p className="text-xs font-normal text-neutral-60">{email}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnlineBookingListItem;
