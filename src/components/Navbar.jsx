import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navbarCollections } from "../mocks/navbarCollections";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenNavbar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="fixed top-0 left-0 z-20 w-full bg-white px-2 py-1 dark:bg-gray-900 lg:px-4 ">
			<div className="container mx-auto flex flex-wrap items-center justify-between">
				<Link to="/" className="flex items-center">
					<span className="self-center whitespace-nowrap rounded-lg p-2 text-2xl font-semibold dark:text-white lg:bg-white lg:text-5xl">
						<span className="text-neutral-100-2">Work</span>
						<span className="text-primary-violet">Fit.</span>
					</span>
				</Link>
				<button
					onClick={handleOpenNavbar}
					type="button"
					className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden">
					<svg
						className="h-6 w-6"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<div className={isOpen ? "w-full lg:block lg:w-auto" : "hidden w-full lg:block lg:w-auto"}>
					<ul className="mt-4 flex flex-col rounded-lg bg-white p-4 font-medium lg:mt-2 lg:flex-row lg:space-x-8 lg:border-0 lg:bg-white lg:text-sm lg:font-medium">
						{navbarCollections.map((item, idx) => {
							return (
								<li key={idx}>
									<a
										href={item.path}
										className="mb-4 block rounded px-3 py-2 text-xl font-medium text-neutral-100-2 hover:rounded-lg hover:bg-secondary-navy hover:bg-opacity-10 lg:border-0 lg:hover:text-blue-700"
										aria-current="page"
										onClick={handleOpenNavbar}>
										{item.name}
									</a>
								</li>
							);
						})}
						<li>
							<Link
								to="/login"
								className="block rounded px-3 py-2 text-xl font-bold text-primary-violet hover:rounded-lg hover:bg-secondary-navy hover:bg-opacity-10 lg:border-0 lg:hover:text-blue-700">
								Login
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
