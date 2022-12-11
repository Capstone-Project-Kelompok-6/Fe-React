import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructor } from "../stores/features/instructorSlice";

const InstructorInfo = () => {
	const dispatch = useDispatch();
	const instructor = useSelector((state) => state.instructor.data);

	useEffect(() => {
		dispatch(fetchInstructor(3));
	}, [dispatch]);

	return (
		<div className="container lg:mt-10">
			<h1 className="text-center text-xl lg:text-4xl lg:font-medium">Our Best Instructor</h1>
			<div className="mx-auto px-5 py-2 pt-10 lg:px-32 lg:pt-12">
				<div className="-m-1 flex flex-wrap md:-m-2">
					{instructor.rows?.map((item) => {
						return (
							<div className="flex w-1/3 flex-wrap" key={item.instructor_id}>
								<div className="w-full p-1 md:p-2">
									<img alt={item.image_name} className="block h-80 w-full rounded-lg object-cover object-center" src={item.instructor_image} />
									<div className="p-5 text-center">
										<h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 lg:text-2xl">{item.instructor_name}</h5>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default InstructorInfo;
