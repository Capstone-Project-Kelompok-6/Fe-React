import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfflineClasses } from "../stores/features/offlineClassesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Pagination, Autoplay } from "swiper";

const ClassesList = () => {
	SwiperCore.use([Autoplay]);
	const dispatch = useDispatch();
	const offlineClasses = useSelector((state) => state.offlineClasses.data);

	useEffect(() => {
		dispatch(fetchOfflineClasses(5));
	}, [dispatch]);

	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + "..." : string;
	};

	return (
		<div className="bg-secondary-navy pt-24 pb-16 lg:px-20">
			<h1 className="text-center text-xl font-medium text-white lg:text-4xl">Lets Join Our Classes</h1>
			<Swiper
				slidesPerView={3}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				breakpoints={{
					0: {
						slidesPerView: 1,
					},
					765: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
				}}
				modules={[Pagination]}
				className="mySwiper"
				autoplay={{
					delay: 1500,
					pauseOnMouseEnter: true,
					disableOnInteraction: false,
				}}>
				{offlineClasses.rows?.map((item) => {
					return (
						<SwiperSlide key={item.class_id}>
							<div className="mx-auto mt-8 h-full max-w-xs rounded-lg bg-[#252525] bg-opacity-40 shadow-md lg:mt-14">
								<div>
									<img
										className="inset-0 mx-auto h-44 w-full rounded-t-lg object-cover object-center lg:p-4 lg:pb-0"
										src={item.workout_image}
										alt={item.image_name}
									/>
								</div>
								<div className="p-5">
									<div>
										<h5 className="mb-2 text-lg font-medium tracking-tight text-white lg:text-3xl lg:font-semibold">{item.workout}</h5>
									</div>
									<p className="mb-3 text-sm font-light text-white lg:text-lg lg:font-normal">{truncate(item.description, 50)}</p>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default ClassesList;
