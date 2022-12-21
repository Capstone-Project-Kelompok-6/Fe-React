import React, { useEffect, useState } from "react";

const ToTop = () => {
	const [scroll, setScroll] = useState(false);

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleScrollVisibility = () => {
		if (window.scrollY > 200) {
			setScroll(true);
		} else {
			setScroll(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScrollVisibility);

		return () => {
			window.removeEventListener("scroll", handleScrollVisibility);
		};
	});
	return (
		<div>
			<button
				onClick={handleScrollToTop}
				className={
					scroll
						? "visible fixed right-6 bottom-4 z-[99999] flex h-10 w-10 items-center justify-center rounded-lg border-0 bg-secondary-navy opacity-[1] shadow-4 transition-all duration-300 hover:bg-indigo-700 hover:text-gray-100"
						: "fixed right-6 bottom-4 z-[99999] hidden h-10 w-10 items-center justify-center rounded-lg border-0 bg-secondary-navy opacity-0 shadow-4 transition-all duration-300 hover:bg-indigo-700 hover:text-gray-100"
				}>
				<i className="fi fi-rr-arrow-small-up mt-1 text-lg text-gray-50"></i>
			</button>
		</div>
	);
};

export default ToTop;
