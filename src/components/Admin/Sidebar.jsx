import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useHook from "../../hooks/useHook";
import { contentSidebarCollections, mainSidebarCollections } from "../../mocks/sidebarCollections";
import Auth from "../../utils/auth";
import { sidebarActive, sidebarInActive } from "../../utils/globalVariable";

const Sidebar = () => {
	const { activeLink, setActiveLink } = useHook();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setActiveLink(location.pathname);
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
							title: "Logout Success",
							showConfirmButton: false,
							timer: 1500,
						});
					} catch (error) {
						return Swal.fire({
							icon: "error",
							title: "Sorry",
							text: "You failed to logout",
						});
					}
				}
			});
	};

	return (
		<aside className="fixed top-0 bottom-0 left-0 z-30 mt-14 hidden w-52 leading-none transition-all duration-300 sm:hidden md:block">
			<div className="relative z-40 hidden h-full flex-col justify-between overflow-y-auto bg-white py-2 px-3 sm:flex md:h-full">
				<div className="relative">
					<ul>
						{mainSidebarCollections.map((item, idx) => {
							return (
								<li key={idx}>
									<NavLink to={item.path}>
										{({ isActive }) => (
											<div className={isActive ? sidebarActive : sidebarInActive}>
												{isActive ? item.iconActive : item.iconInactive}
												<span className="ml-3">{item.name}</span>
											</div>
										)}
									</NavLink>
								</li>
							);
						})}
						<div className="flex px-2 py-2 text-base font-bold text-primary-violet">
							Manage Classes
						</div>
						<li>
							<NavLink to="/classes/offline">
								<div
									className={
										activeLink === "/classes/offline" || activeLink === "/classes/online"
											? sidebarActive
											: sidebarInActive
									}>
									{activeLink === "/classes/offline" || activeLink === "/classes/online" ? (
										<i className="fi fi-sr-school ml-2 flex items-center justify-center text-base"></i>
									) : (
										<i className="fi fi-rr-school ml-2 flex items-center justify-center text-base"></i>
									)}
									<span className="ml-3">Classes</span>
								</div>
							</NavLink>
						</li>

						<li>
							<NavLink to="/booking/offline">
								<div
									className={
										activeLink === "/booking/offline" || activeLink === "/booking/online"
											? sidebarActive
											: sidebarInActive
									}>
									{activeLink === "/booking/offline" || activeLink === "/booking/online" ? (
										<i className="fi fi-sr-book-alt ml-2 flex items-center justify-center text-base"></i>
									) : (
										<i className="fi fi-rr-book-alt ml-2 flex items-center justify-center text-base"></i>
									)}
									<span className="ml-3">Booking</span>
								</div>
							</NavLink>
						</li>
						<div className="flex px-2 py-2 text-base font-bold text-primary-violet">
							Manage Content
						</div>
						{contentSidebarCollections.map((item, idx) => {
							return (
								<li key={idx}>
									<NavLink to={item.path}>
										{({ isActive }) => (
											<div className={isActive ? sidebarActive : sidebarInActive}>
												{isActive ? item.iconActive : item.iconInactive}
												<span className="ml-3">{item.name}</span>
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
