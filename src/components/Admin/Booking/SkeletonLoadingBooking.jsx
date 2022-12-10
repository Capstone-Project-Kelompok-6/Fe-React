import React from "react";

const SkeletonLoadingBooking = () => {
	return (
		<div className="relative rounded-20 border bg-white py-4 shadow-4">
			<div className="mb-2 flex items-center justify-between px-5">
				<div className="w-36 animate-pulse rounded-lg bg-gray-300 py-3">
					<p className="text-sm font-medium text-neutral-100-2 md:text-base"></p>
				</div>
				<div className="mr-4 inline-flex items-center">
					<p className="animate-pulse rounded-full border bg-gray-300 px-2 py-1 font-medium md:px-2">
						<i className="fi fi-sr-rec mr-1 mt-1 text-[10px] text-gray-400"></i>
						<span className="rounded-lg border bg-gray-400 px-4 text-xs"></span>
					</p>
				</div>
			</div>
			<div className="mx-5 mb-2 animate-pulse border-b border-gray-300 md:mb-1"></div>
			<div className="flex flex-col px-5 md:flex-row md:items-center">
				<div
					role="status"
					className="mt-2 h-48 w-full animate-pulse rounded-20 bg-gray-300 object-cover object-center p-16 text-center md:h-[190px] md:w-32 md:py-16 md:px-4">
					<i className="fi fi-rr-picture text-4xl text-gray-200"></i>
					<span className="sr-only">Loading...</span>
				</div>
				<div className="flex flex-col py-0 px-0 leading-normal md:py-2 md:px-4">
					<h5 className="mb-2 mt-4 w-24 animate-pulse rounded-lg bg-gray-300 py-3 text-base font-semibold tracking-tight text-neutral-100-2 md:mt-2"></h5>
					<div className="mb-2 grid w-56 animate-pulse grid-cols-2 gap-32 rounded-md bg-gray-300 py-2 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
						<div className="flex">
							<div className="inline-flex flex-shrink-0 items-center text-sm">
								<p className="font-medium tracking-tight text-neutral-100-2"></p>
							</div>
						</div>
						<div className="inline-flex items-center text-sm font-medium">
							<p className="font-semibold tracking-tight text-neutral-100-2"></p>
						</div>
					</div>
					<div className="grid w-56 animate-pulse grid-cols-1 gap-3 rounded-lg bg-gray-300 py-2 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
						<div className="flex">
							<div className="inline-flex flex-shrink-0 items-center">
								<div>
									<p className="text-sm font-medium tracking-tight text-neutral-100-2"></p>
									<p className="text-xs font-normal text-neutral-60"></p>
								</div>
							</div>
						</div>
						<div className="inline-flex items-center text-sm font-medium">
							<p className="font-medium tracking-tight text-neutral-100-2"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoadingBooking;
