import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({ handledrawerTrigger }) => {
	const user = Cookies.get("sub");

	return (
		<header className="fixed top-0 left-0 z-40 flex h-14 w-full items-center justify-between bg-white bg-opacity-90 px-4 py-2 backdrop-blur-sm md:px-6">
			<div className="flex w-2/3 items-center">
				<div className="cursor-pointer rounded-full p-2 hover:bg-gray-200 md:hidden" onClick={handledrawerTrigger}>
					<i className="fi fi-rr-menu-burger flex items-center justify-center text-base text-gray-800"></i>
				</div>
				<Link
					to="/dashboard"
					className="flex items-center self-center whitespace-nowrap pl-2 text-sm font-semibold tracking-tight sm:text-sm md:hidden md:text-sm lg:text-xl">
					<span className="text-neutral-100-2">
						Work<span className="text-primary-violet">Fit.</span>
					</span>
				</Link>
				<Link to="/dashboard" className="flex cursor-pointer items-center self-center whitespace-nowrap pl-1 text-xl font-semibold">
					<span className="hidden text-neutral-100-2 md:block">
						Work<span className="text-primary-violet">Fit.</span>
					</span>
				</Link>
			</div>
			<div className="flex w-52 items-center text-right transition-all duration-300 ease-in-out sm:w-auto md:w-auto lg:w-auto xl:w-auto">
				<div className="relative">
					<h2 className="text-xs font-bold leading-relaxed tracking-tight text-neutral-100-2 sm:text-sm md:text-lg lg:text-lg xl:text-lg">
						Welcome {user}
					</h2>
				</div>
			</div>
		</header>
	);
};

export default Header;
