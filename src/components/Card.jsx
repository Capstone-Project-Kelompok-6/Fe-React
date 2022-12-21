import React from "react";

const Card = () => {
	return (
		<div className="rounded-xl border border-gray-200 bg-neutral-100-2 p-6 shadow-4">
			<div className="h-11 w-11 rounded-[100px] bg-[#7e7aa0] py-3 text-center">
				<i className="fi fi-rr-quote-right h-10 text-[#fafafa]"></i>
			</div>

			<div className="px-1 py-4">
				<div className="mb-2 flex items-center space-x-4">
					<div className="min-w-0 flex-1">
						<p className="text-base font-medium text-white">Antoni Daniel, Student</p>
					</div>
				</div>
				<div className="min-w-0 flex-1">
					<p className="text-sm font-normal text-white">
						Cool, It`s Very Helpful With This Application, It`s Very Helping, Cool, Cool!!!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
