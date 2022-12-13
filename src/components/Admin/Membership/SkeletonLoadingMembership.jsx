import React from "react";

const SkeletonLoadingMembership = () => {
	return (
		<div className="rounded-xl bg-white p-4 shadow-4">
			<div className="flex items-center space-x-3">
				<div className="inline-flex h-11 w-11 flex-shrink-0 animate-pulse items-center justify-center rounded-full bg-skeleton p-1">
					<span className="mt-1 text-sm text-gray-50">
						<i className="fi fi-sr-user"></i>
					</span>
				</div>
				<div className="min-w-0">
					<p className="mb-2 w-32 animate-pulse rounded-xl bg-skeleton py-2 font-semibold text-neutral-100-2"></p>
					<p className="w-28 animate-pulse rounded-xl bg-skeleton py-1.5 font-normal text-neutral-100-2"></p>
				</div>
			</div>
			<div className="flex items-center space-x-3 pb-2 pt-4 text-sm">
				<div className="inline-flex flex-shrink-0 animate-pulse items-center justify-center">
					<span className="mt-1 text-sm text-skeleton">
						<i className="fi fi-sr-phone-call"></i>
					</span>
				</div>
				<div className="w-20 animate-pulse rounded-xl bg-skeleton py-1.5">
					<p className="font-medium tracking-tight text-neutral-100-2"></p>
				</div>
			</div>
			<div className="flex items-center space-x-3 text-sm">
				<div className="inline-flex flex-shrink-0 animate-pulse items-center justify-center">
					<span className="mt-1 text-sm text-skeleton">
						<i className="fi fi-sr-calendar"></i>
					</span>
				</div>
				<div className="w-20 animate-pulse rounded-xl bg-skeleton py-1.5">
					<p className="font-medium tracking-tight text-neutral-100-2"></p>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoadingMembership;
