import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { contentSidebarCollections, mainSidebarCollections } from "../../mocks/sidebarCollections";
import Auth from "../../utils/auth";

const Sidebar = () => {
	const navigate = useNavigate();
	const [active, setActive] = useState([]);
	const location = useLocation();

	useEffect(() => {
		setActive(location.pathname);
	}, [location]);

	const handleLogout = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton:
					"focus:outline-none text-white bg-secondary-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
				cancelButton:
					"text-secondary-red hover:text-neutral-100-2 border border-secondary-red hover:bg-secondary-red hover:bg-opacity-30 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Are you sure?",
				text: "Log out of admin dashboard",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, Logout",
				cancelButtonText: "No, Cancel",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					try {
						Auth.signOut();
						navigate("/login");
						Swal.fire({
							icon: "success",
							title: "Logout berhasil",
							showConfirmButton: false,
							timer: 1500,
						});
					} catch (error) {
						return Swal.fire({
							icon: "error",
							title: "Maaf",
							text: "Anda gagal logout",
						});
					}
				}
			});
	};

	return (
		<aside className="fixed top-0 bottom-0 left-0 z-30 mt-14 hidden w-52 leading-none transition-all duration-300 md:block">
			<div className="relative z-40 hidden h-full flex-col justify-between overflow-y-auto bg-white py-2 px-3 sm:flex md:h-full">
				<div className="relative">
					<ul>
						{mainSidebarCollections.map((item, idx) => {
							return (
								<li key={idx}>
									<NavLink to={item.path}>
										{({ isActive }) => (
											<div
												className={
													isActive
														? "mb-1 flex items-center rounded-lg bg-primary-violet bg-opacity-10 p-2 text-sm font-semibold text-primary-violet transition-all duration-300 ease-in-out hover:bg-indigo-200"
														: "mb-1 flex items-center rounded-lg p-2 text-sm font-normal text-neutral-80 transition-all duration-300 ease-in-out hover:bg-indigo-100"
												}>
												{isActive ? item.iconActive : item.iconInactive}
												<span className="ml-3 font-medium">{item.name}</span>
											</div>
										)}
									</NavLink>
								</li>
							);
						})}
						<div className="ml-2 flex px-2 py-2 text-base font-bold text-primary-violet">Manage Classes</div>
						<li>
							<NavLink to="/classes/offline">
								<div
									className={
										active === "/classes/offline" || active === "/classes/online"
											? "mb-1 flex items-center rounded-lg bg-primary-violet bg-opacity-10 p-2 text-sm font-semibold text-primary-violet transition-all duration-300 ease-in-out hover:bg-indigo-200"
											: "mb-1 flex items-center rounded-lg p-2 text-sm font-normal text-neutral-80 transition-all duration-300 ease-in-out hover:bg-indigo-100"
									}>
									{active === "/classes/offline" || active === "/classes/online" ? (
										<i className="fi fi-sr-school ml-2 flex items-center justify-center text-base"></i>
									) : (
										<i className="fi fi-rr-school ml-2 flex items-center justify-center text-base"></i>
									)}
									<span className="ml-3 font-medium">Classes</span>
								</div>
							</NavLink>
						</li>

						<li>
							<NavLink to="/booking/offline">
								<div
									className={
										active === "/booking/offline" || active === "/booking/online"
											? "mb-1 flex items-center rounded-lg bg-primary-violet bg-opacity-10 p-2 text-sm font-semibold text-primary-violet transition-all duration-300 ease-in-out hover:bg-indigo-200"
											: "mb-1 flex items-center rounded-lg p-2 text-sm font-normal text-neutral-80 transition-all duration-300 ease-in-out hover:bg-indigo-100"
									}>
									{active === "/booking/offline" || active === "/booking/online" ? (
										<i className="fi fi-sr-book-alt ml-2 flex items-center justify-center text-base"></i>
									) : (
										<i className="fi fi-rr-book-alt ml-2 flex items-center justify-center text-base"></i>
									)}
									<span className="ml-3 font-medium">Booking</span>
								</div>
							</NavLink>
						</li>
						<div className="ml-2 flex px-2 py-2 text-base font-bold text-primary-violet">Manage Content</div>
						{contentSidebarCollections.map((item, idx) => {
							return (
								<li key={idx}>
									<NavLink to={item.path}>
										{({ isActive }) => (
											<div
												className={
													isActive
														? "mb-1 flex items-center rounded-lg bg-primary-violet bg-opacity-10 p-2 text-sm font-semibold text-primary-violet transition-all duration-300 ease-in-out hover:bg-indigo-200"
														: "mb-1 flex items-center rounded-lg p-2 text-sm font-normal text-neutral-80 transition-all duration-300 ease-in-out hover:bg-indigo-100"
												}>
												{isActive ? item.iconActive : item.iconInactive}
												<span className="ml-3 font-medium">{item.name}</span>
											</div>
										)}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="relative">
					<ul>
						<li className="pb-2">
							<button
								type="button"
								className="flex w-full cursor-pointer items-center rounded-lg p-2 text-sm font-normal text-secondary-red transition-colors duration-300 ease-in-out hover:bg-red-100"
								onClick={handleLogout}>
								<i className="fi fi-rr-sign-out-alt ml-2 flex items-center justify-center text-base transition duration-75"></i>
								<span className="ml-3 font-medium">Logout</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
