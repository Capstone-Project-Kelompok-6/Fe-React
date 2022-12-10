import React from "react";
import { NavLink } from "react-router-dom";
import { classesSidebarCollections } from "../../../mocks/sidebarCollections";

const ClassesTabs = () => {
	return (
		<ul className="-mb-px flex flex-wrap text-center" role="tablist">
			{classesSidebarCollections.map((item, idx) => {
				return (
					<li key={idx}>
						<NavLink to={item.path}>
							{({ isActive }) => (
								<div
									className={
										isActive
											? "text-secondary inline-block rounded-t-lg border-b-2 border-secondary-navy p-4 text-sm font-medium text-secondary-navy transition-all duration-300 ease-in-out"
											: "inline-block rounded-t-lg border-b-2 border-transparent p-4 text-sm font-normal text-neutral-60 transition-all duration-300 ease-in-out hover:border-gray-300 hover:text-neutral-80"
									}>
									<span>{item.name}</span>
								</div>
							)}
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
};

export default ClassesTabs;
