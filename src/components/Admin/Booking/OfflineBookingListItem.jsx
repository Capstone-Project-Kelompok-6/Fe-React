import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useHook from "../../../hooks/useHook";
import { fetchOfflineClassesByPrice } from "../../../stores/features/offlineClassesSlice";
import { formatDateTime } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/formatPrice";
import { actionDropdownEdit } from "../../../utils/globalVariable";
import { truncate } from "../../../utils/truncate";
import ModalEditOfflineBooking from "./ModalEditOfflineBooking";

const OfflineBookingListItem = ({ data }) => {
	const {
		class_dates,
		email,
		full_name,
		image_name,
		instructor_name,
		price,
		workout,
		workout_image,
		created_at,
		status,
		end_class_date,
		is_expired,
	} = data;
	const dispatch = useDispatch();
	const offlineClassesList = useSelector((state) => state.offlineClasses.data);
	const { actionDropdown, setActionDropdown, modalEditTrigger, setModalEditTrigger } = useHook();

	const handleActionDropdown = () => {
		setActionDropdown(!actionDropdown);
	};

	const handleModalEditTrigger = () => {
		setModalEditTrigger(!modalEditTrigger);
		dispatch(fetchOfflineClassesByPrice(price));
	};

	return (
		<div>
			<div className="relative h-full rounded-20 border bg-white py-4 shadow-4">
				<div className="mb-2 flex items-center px-5">
					<div className="min-w-0 flex-1 flex-col">
						<p className="text-xs font-medium text-neutral-100-2 md:text-sm">
							{formatDateTime(created_at)} - {formatDateTime(end_class_date)}
						</p>
					</div>
					<div className="mr-4 inline-flex items-center">
						{status === "PAID" && (
							<p className="rounded-full border border-secondary-green bg-tertiary-4 bg-opacity-25 px-2 py-0 font-medium text-secondary-green md:px-3">
								<i className="fi fi-sr-rec mr-1 mt-1 text-[6px] md:text-[8px]"></i>
								<span className="text-[10px] md:text-xs">{status}</span>
							</p>
						)}
						{(status === "PENDING" || status === "") && (
							<p className="rounded-full border border-secondary-yellow bg-secondary-yellow bg-opacity-25 px-2 py-0 font-medium text-tertiary-yellow md:px-3">
								<i className="fi fi-sr-rec mr-1 mt-1 text-[6px] md:text-[8px]"></i>
								<span className="text-[10px] md:text-xs">PENDING</span>
							</p>
						)}
					</div>
					<div className="inline-flex items-center pt-2">
						<button
							className="inline-block text-neutral-80"
							type="button"
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
								<div className="absolute right-0 z-10 mr-6 mt-5 w-32 rounded-xl bg-white shadow-4 transition duration-300">
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
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="mx-5 mb-2 border-b border-neutral-100-2 md:mb-1"></div>
				<div className="flex flex-col px-5 md:flex-row md:items-center">
					<img
						className="my-2 h-48 w-full rounded-xl object-cover object-center md:h-[190px] md:w-32"
						src={workout_image}
						alt={image_name}
					/>
					<div className="flex flex-col py-0 px-0 leading-normal md:py-2 md:px-4">
						<div className="-mb-0 mt-2 grid grid-cols-2 gap-16 md:-mb-6 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<h5 className="text-base font-semibold tracking-tight text-neutral-100-2">
									{workout}
								</h5>
							</div>
							<div className="inline-flex items-center text-sm font-medium">
								<span className="mt-1 text-secondary-navy">
									<i className="fi fi-sr-info mr-2"></i>
								</span>
								{is_expired === false ? (
									<p className="font-medium text-secondary-green">
										<span className="text-sm">Active Class</span>
									</p>
								) : (
									<p className="font-medium text-secondary-red">
										<span className="text-sm">Expired Class</span>
									</p>
								)}
							</div>
						</div>
						<div className="mt-4 grid grid-cols-2 gap-16 md:mt-8 md:-mb-6 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<div className="inline-flex flex-shrink-0 items-center text-sm">
									<span className="mt-1 text-primary-violet">
										<i className="fi fi-sr-briefcase mr-2"></i>
									</span>
									<p className="font-medium tracking-tight text-neutral-100-2">{instructor_name}</p>
								</div>
							</div>
							<div className="inline-flex items-center text-sm font-medium">
								<span className="mt-1 text-secondary-green">
									<i className="fi fi-sr-money fi-sr-briefcase mr-2"></i>
								</span>
								<p className="font-semibold tracking-tight text-neutral-100-2">
									{formatPrice(price)}
								</p>
							</div>
						</div>
						<div className="mt-4 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<div className="flex-shrink-0">
									<span className="mt-1 text-sm text-secondary-navy">
										<i className="fi fi-sr-user fi-sr-briefcase mr-2"></i>
									</span>
								</div>
								<div className="flex-1 leading-relaxed">
									<p className="text-sm font-medium tracking-tight text-neutral-100-2">
										{full_name}
									</p>
									<p className="text-xs font-normal text-neutral-60">{truncate(email, 20)}</p>
								</div>
							</div>
							<div className="text-sm font-medium">
								<div className="flex">
									<div className="mr-2 mt-0.5 flex-shrink-0">
										<span className="text-secondary-navy">
											<i className="fi fi-sr-clock"></i>
										</span>
									</div>
									<div className="flex-1 leading-relaxed">
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
						</div>
					</div>
				</div>
			</div>
			{modalEditTrigger && (
				<ModalEditOfflineBooking
					handleModalEditTrigger={handleModalEditTrigger}
					offlineClassesList={offlineClassesList}
					update={data}
					handleActionDropdown={handleActionDropdown}
				/>
			)}
		</div>
	);
};

export default OfflineBookingListItem;
