import React from "react";

const SkeletonLoadingArticle = () => {
	return (
		<div className="rounded-20 bg-white shadow-4">
			<div className="relative overflow-hidden pb-40">
				<div
					role="status"
					className="absolute inset-0 h-full w-full animate-pulse rounded-t-20 bg-gray-300 object-fill object-center p-16 text-center">
					<i className="fi fi-rr-picture text-4xl text-gray-200"></i>
					<span className="sr-only">Loading...</span>
				</div>
			</div>

			<div className="p-5">
				<div className="mb-2 flex animate-pulse items-center space-x-4 rounded-xl bg-gray-300 py-3">
					<div className="min-w-0 flex-1">
						<p className="text-sm font-bold text-neutral-100-2"></p>
					</div>
					<div className="inline-flex items-center text-xs font-medium text-neutral-100-2"></div>
				</div>
				<div className="flex items-center space-x-3">
					<div className="min-w-0 flex-1 animate-pulse rounded-xl bg-gray-300 py-4">
						<p className="text-base font-medium text-gray-900"></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoadingArticle;
