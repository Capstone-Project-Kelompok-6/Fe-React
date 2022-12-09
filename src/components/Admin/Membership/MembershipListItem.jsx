import React, { useState } from "react";
import { formatShortDate } from "../../../utils/formatDate";
import ModalEditMembership from "./ModalEditMembership";

const MembershipListItem = ({ data }) => {
	const { full_name, image, image_name, phone_number, email, created_at, is_active } = data;
	const [actionDropdown, setActionDropdown] = useState(false);
	const [modalEditTrigger, setModalEditTrigger] = useState(false);

	const handleModalEditTrigger = () => {
		setModalEditTrigger(!modalEditTrigger);
	};

	const handleActionDrowpdon = () => {
		setActionDropdown(!actionDropdown);
	};

	return (
		<div className="rounded-xl bg-white p-4 shadow-4">
			<div className="group relative">
				<button className="absolute right-0 top-0 cursor-pointer text-neutral-100-2" onClick={handleActionDrowpdon}>
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
							onClick={handleActionDrowpdon}></div>
						<div className="absolute top-0 right-0 z-10 mr-1 mt-7 w-32 rounded-xl bg-white shadow-4 transition duration-300">
							<ul className="list-reset">
								<li>
									<button
										type="button"
										className="mr-2 inline-flex w-full items-center rounded-xl px-5 py-2.5 text-center text-sm font-medium text-neutral-100-2 transition duration-300 ease-in-out hover:rounded-xl hover:bg-yellow-50 focus:outline-none"
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
			<div className="flex items-center space-x-3">
				<img className="h-11 w-11 rounded-full object-cover object-center" src={image} alt={image_name} />
				<div className="min-w-0 flex-1">
					<div className="text-base font-semibold text-neutral-100-2">
						{full_name}
						{is_active === true ? (
							<div className="ml-2 inline-flex items-center font-medium text-secondary-navy">
								<i className="fi fi-rr-badge-check"></i>
							</div>
						) : (
							<div className="inline-flex items-center font-medium text-secondary-red"></div>
						)}
					</div>
					<div className="flex flex-wrap">
						<p className="truncate text-sm font-normal text-neutral-100-2">{email}</p>
					</div>
				</div>
			</div>
			<div className="flex items-center space-x-3 pb-2 pt-4 text-sm">
				<div className="inline-flex flex-shrink-0 items-center justify-center">
					<span className="mt-1 text-secondary-green">
						<i className="fi fi-sr-phone-call"></i>
					</span>
				</div>
				<div className="flex-1">
					<p className="font-medium text-neutral-100-2">{phone_number}</p>
				</div>
			</div>
			<div className="flex items-center space-x-3 text-sm">
				<div className="inline-flex flex-shrink-0 items-center justify-center">
					<span className="mt-1 text-secondary-navy">
						<i className="fi fi-sr-info"></i>
					</span>
				</div>
				<div className="flex-1">
					<p className="font-medium text-neutral-100-2">{formatShortDate(created_at)}</p>
				</div>
			</div>
			{modalEditTrigger && (
				<ModalEditMembership
					modalEditTrigger={modalEditTrigger}
					handleModalEditTrigger={handleModalEditTrigger}
					update={data}
					handleActionDrowpdon={handleActionDrowpdon}
				/>
			)}
		</div>
	);
};

export default MembershipListItem;
