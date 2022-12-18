import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
	const [drawerTrigger, setdrawerTrigger] = useState(false);

	const handledrawerTrigger = () => {
		setdrawerTrigger(!drawerTrigger);
	};

	return (
		<>
			<div className="flex h-full overflow-y-auto">
				<Sidebar />
				<Drawer drawerTrigger={drawerTrigger} handledrawerTrigger={handledrawerTrigger} />
				<div className="flex w-full flex-1 flex-col">
					<Header handledrawerTrigger={handledrawerTrigger} />
					<div className="pl-0 pt-14 md:pl-52 lg:pl-52">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default MainLayout;
