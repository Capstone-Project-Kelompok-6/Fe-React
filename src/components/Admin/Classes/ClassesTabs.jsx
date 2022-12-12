import React from "react";
import { NavLink } from "react-router-dom";
import { classesSidebarCollections } from "../../../mocks/sidebarCollections";
import { activeLinkTab, inActiveLinkTab } from "../../../utils/globalVariable";

const ClassesTabs = () => {
	return (
		<ul className="-mb-px flex flex-wrap text-center" role="tablist">
			{classesSidebarCollections.map((item, idx) => {
				return (
					<li key={idx}>
						<NavLink to={item.path}>
							{({ isActive }) => (
								<div className={isActive ? activeLinkTab : inActiveLinkTab}>
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
