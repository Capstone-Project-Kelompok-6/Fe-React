import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useHook from "../../hooks/useHook";
import Auth from "../../utils/auth";
import { formatCommonDate } from "../../utils/formatDate";

const Header = ({ handledrawerTrigger }) => {
	const { activeLink, setActiveLink } = useHook();
	const location = useLocation();
	const date = new Date();

	useEffect(() => {
		setActiveLink(location.pathname);
	}, [location]);

	return (
		<header className="fixed top-0 left-0 z-40 flex h-14 w-full items-center justify-between bg-white bg-opacity-90 px-4 py-2 backdrop-blur-sm md:px-6">
			<div className="flex w-1/2 items-center">
				<div
					className="cursor-pointer rounded-full p-2 hover:bg-gray-200 md:hidden"
					onClick={handledrawerTrigger}>
					<i className="fi fi-rr-menu-burger flex items-center justify-center text-base text-gray-800"></i>
				</div>
				<Link
					to="/dashboard"
					className="flex items-center self-center whitespace-nowrap pl-2 text-lg font-semibold tracking-tight sm:text-sm md:hidden md:text-sm lg:text-2xl">
					<span className="text-neutral-100-2">
						Work<span className="text-primary-violet">Fit.</span>
					</span>
				</Link>
				<Link
					to="/dashboard"
					className="flex cursor-pointer items-center self-center whitespace-nowrap pl-1 text-2xl font-semibold">
					<span className="hidden text-neutral-100-2 md:block">
						Work<span className="text-primary-violet">Fit.</span>
					</span>
				</Link>
			</div>
			<div className="flex w-auto items-center pr-2 text-right transition-all duration-300 sm:w-auto md:w-auto md:pr-0 lg:w-auto xl:w-auto">
				<div className="relative">
					<h2 className="text-sm font-semibold leading-relaxed tracking-tight text-neutral-100-2 sm:text-sm md:text-lg lg:text-lg xl:text-lg">
						Welcome{" "}
						{Auth.getUserDetail() === undefined
							? Auth.getUserDetail()
							: Auth.getUserDetail().fullname}
					</h2>
					{activeLink === "/dashboard" ? null : (
						<p className="text-xs font-medium leading-relaxed tracking-tight text-neutral-60">
							{formatCommonDate(date)}
						</p>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
