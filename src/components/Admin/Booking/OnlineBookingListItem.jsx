import React from "react";
import { formatDateTime } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/formatPrice";
import { truncate } from "../../../utils/truncate";

const OnlineBookingListItem = ({ data }) => {
	const {
		email,
		full_name,
		price,
		video_title,
		workout,
		created_at,
		thumbnail,
		thumbnail_name,
		status,
	} = data;

	return (
		<div>
			<div className="relative rounded-20 border bg-white py-4 shadow-4">
				<div className="mb-2 flex items-center px-5">
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium text-neutral-100-2 md:text-base">
							{formatDateTime(created_at)}
						</p>
					</div>
					<div className="mr-4 inline-flex items-center">
						{status === "PAID" && (
							<p className="rounded-full border border-secondary-green bg-tertiary-4 bg-opacity-25 px-2 py-1 font-medium text-secondary-green md:px-3">
								<i className="fi fi-sr-rec mr-1 mt-1 text-[10px]"></i>
								<span className="text-xs">{status}</span>
							</p>
						)}
						{status === "PENDING" && (
							<p className="rounded-full border border-secondary-orange bg-secondary-orange bg-opacity-25 px-2 py-1 font-medium text-secondary-orange md:px-3">
								<i className="fi fi-sr-rec mr-1 mt-1 text-[10px]"></i>
								<span className="text-xs">{status}</span>
							</p>
						)}
						{status === "" && (
							<p className="rounded-full border border-red-2 bg-red-2 bg-opacity-25 px-2 py-1 font-medium text-red-1 md:px-3">
								<i className="fi fi-sr-rec mr-1 mt-1 text-[10px]"></i>
								<span className="text-xs">{status}</span>
							</p>
						)}
					</div>
				</div>
				<div className="mx-5 mb-2 border-b border-neutral-100-2 md:mb-0"></div>
				<div className="flex flex-col px-5 md:flex-row md:items-center">
					<img
						className="h-48 w-full rounded-xl object-cover md:h-[120px] md:w-28"
						src={thumbnail}
						alt={thumbnail_name}
					/>
					<div className="flex flex-col py-0 px-0 leading-normal md:py-2 md:px-4">
						<h5 className="mb-2 mt-4 text-base font-semibold tracking-tight text-neutral-100-2 md:mt-2">
							{truncate(`${video_title}`, 20)}
						</h5>
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
								<p className="font-semibold tracking-tight text-neutral-100-2">
									{formatPrice(price)}
								</p>
							</div>
						</div>
						<div className="mb-2 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<div className="inline-flex flex-shrink-0 items-center">
									<span className="mt-1 text-sm text-secondary-navy">
										<i className="fi fi-sr-user fi-sr-briefcase mr-2"></i>
									</span>
									<div>
										<p className="pt-4 text-sm font-medium tracking-tight text-neutral-100-2">
											{full_name}
										</p>
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
