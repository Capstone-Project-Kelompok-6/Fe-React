import React from "react";
import sittingImage from "../assets/img/png/sittingImage.png";

const ClassesInfo = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${sittingImage})`,
				backgroundSize: "cover",
				height: "100vh",
			}}>
			<div className="flex">
				<div className="relative h-screen flex-1 bg-black bg-opacity-80 py-72 text-center text-white lg:py-56">
					<div className="absolute top-64 px-4 md:top-52">
						<h1 className="text-base font-semibold lg:text-4xl">
							<span className="text-secondary-subtle-yellow">Offline</span>
							<span className="text-secondary-yellow"> Classes</span>
						</h1>
						<p className="text-sm font-medium lg:mt-8 lg:px-44 lg:text-2xl">
							In offline classes, you can come directly to the gym to consult with the instructor,
							get guidance on continuing to care about your body`s health.
						</p>
					</div>
				</div>
				<div className="relative h-screen flex-1 bg-black bg-opacity-80 py-72 text-center text-white lg:py-56">
					<div className="absolute top-64 px-4 md:top-52">
						<h1 className="text-base font-semibold lg:text-4xl">
							<span className="text-secondary-subtle-yellow">Online</span>
							<span className="text-secondary-yellow"> Classes</span>
						</h1>
						<p className="text-sm font-medium lg:mt-8 lg:px-44 lg:text-2xl">
							Online classes are virtual spaces where online fitness learning activities are carried
							out. providing various instructional videos about fitness
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClassesInfo;
