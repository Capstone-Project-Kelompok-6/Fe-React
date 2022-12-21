import React from "react";
import instructor1 from "../assets/img/png/instructor1.png";
import instructor2 from "../assets/img/png/instructor2.png";
import instructor3 from "../assets/img/png/instructor3.png";

const InstructorInfo = () => {
	return (
		<div className="container lg:mt-10">
			<h1 className="text-center text-xl lg:text-4xl lg:font-medium">Our Best Instructor</h1>
			<div className="my-6 flex items-center justify-center lg:px-60">
				<div className="mb-6 grid grid-cols-3 gap-3 md:grid-cols-3">
					<div className="py-2 lg:py-10">
						<div className="max-w-sm">
							<div>
								<img className="rounded-xl object-cover" src={instructor1} alt="instructor-image" />
							</div>
							<div className="p-5">
								<h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-900 lg:text-2xl">
									Alan Ramirez
								</h5>
							</div>
						</div>
					</div>
					<div className="relative py-2 lg:-mt-4 lg:py-10">
						<div className="absolute max-w-sm">
							<div>
								<img
									className="h-48 rounded-xl object-cover md:h-96"
									src={instructor2}
									alt="instructor-image"
								/>
							</div>
							<div className="p-5">
								<h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-900 lg:text-2xl">
									Natalia Baruna
								</h5>
							</div>
						</div>
					</div>
					<div className="py-2 lg:py-10">
						<div className="max-w-sm">
							<div>
								<img className="rounded-xl object-cover" src={instructor3} alt="instructor-image" />
							</div>
							<div className="p-5">
								<h5 className="mb-2 text-center text-lg font-bold tracking-tight text-gray-900 lg:text-2xl">
									Alex Perez
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InstructorInfo;
