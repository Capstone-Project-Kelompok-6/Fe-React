import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useHook from "../../hooks/useHook";
import { contentSidebarCollections, mainSidebarCollections } from "../../mocks/sidebarCollections";
import Auth from "../../utils/auth";
import { sidebarActive, sidebarInActive } from "../../utils/globalVariable";

const Drawer = ({ drawerTrigger, handledrawerTrigger }) => {
	const { activeLink, setActiveLink } = useHook();
	const location = useLocation();
	const navigate = useNavigate();

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
		<div className="sm:block md:hidden">
			<div
				className={
					drawerTrigger
						? "pointer-events-auto fixed inset-0 z-50 bg-gray-600 opacity-75 transition-opacity duration-300 ease-linear"
						: "pointer-events-none fixed inset-0 z-50 bg-gray-600 opacity-0 transition-opacity duration-300 ease-linear"
				}
				onClick={handledrawerTrigger}></div>
			<div
				className={
					drawerTrigger
						? "fixed inset-y-0 left-0 z-50 h-screen w-full max-w-[250px] translate-x-0 transform bg-white p-4 shadow-lg duration-300 ease-in-out"
						: "fixed inset-y-0 left-0 z-50 h-screen w-full max-w-[250px] -translate-x-full transform bg-white p-4 duration-300 ease-in-out"
				}>
				<Link to="/dashboard" className="flex items-center pl-2.5" onClick={handledrawerTrigger}>
					<span className="self-center whitespace-nowrap text-xl font-semibold text-neutral-100-2">
						Work<span className="text-primary-violet">Fit.</span>
					</span>
				</Link>
				<button
					type="button"
					className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:rounded-lg hover:bg-gray-200 hover:text-gray-900"
					onClick={handledrawerTrigger}>
					<i className="fi fi-rr-cross-small flex items-center justify-center text-base"></i>
				</button>
				<div className="flex-col justify-between overflow-y-auto py-4 sm:relative sm:flex md:h-full">
					<div className="relative">
						<ul>
							{mainSidebarCollections.map((item, idx) => {
								return (
									<li key={idx}>
										<NavLink to={item.path}>
											{({ isActive }) => (
												<div
													className={isActive ? sidebarActive : sidebarInActive}
													onClick={handledrawerTrigger}>
													{isActive ? item.iconActive : item.iconInactive}
													<span className="ml-3">{item.name}</span>
												</div>
											)}
										</NavLink>
									</li>
								);
							})}
							<div className="ml-2 flex px-2 py-2 text-base font-bold text-primary-violet">
								Manage Classes
							</div>
							<li>
								<NavLink to="/classes/offline">
									<div
										className={
											activeLink === "/classes/offline" || activeLink === "/classes/online"
												? sidebarActive
												: sidebarInActive
										}
										onClick={handledrawerTrigger}>
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
										}
										onClick={handledrawerTrigger}>
										{activeLink === "/booking/offline" || activeLink === "/booking/online" ? (
											<i className="fi fi-sr-book-alt ml-2 flex items-center justify-center text-base"></i>
										) : (
											<i className="fi fi-rr-book-alt ml-2 flex items-center justify-center text-base"></i>
										)}
										<span className="ml-3">Booking</span>
									</div>
								</NavLink>
							</li>
							<div className="ml-2 flex px-2 py-2 text-base font-bold text-primary-violet">
								Manage Content
							</div>
							{contentSidebarCollections.map((item, idx) => {
								return (
									<li key={idx}>
										<NavLink to={item.path}>
											{({ isActive }) => (
												<div
													className={isActive ? sidebarActive : sidebarInActive}
													onClick={handledrawerTrigger}>
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
							<li className="mt-10">
								<button
									type="button"
									className="flex w-full cursor-pointer items-center rounded-lg p-2 text-sm font-normal text-secondary-red hover:bg-red-100"
									onClick={handleLogout}>
									<i className="fi fi-rr-sign-out-alt ml-2 flex items-center justify-center text-base transition duration-75"></i>
									<span className="ml-3">Logout</span>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Drawer;
