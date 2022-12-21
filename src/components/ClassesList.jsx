import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import yogaClass from "../assets/img/png/yogaClass.png";
import fitness from "../assets/img/png/fitness.png";
import muscle from "../assets/img/png/muscle.png";

const ClassesList = () => {
	SwiperCore.use([Autoplay]);

	return (
		<div className="bg-secondary-navy pt-24 pb-16 lg:px-20">
			<h1 className="text-center text-xl font-medium text-white lg:text-4xl">
				Lets Join Our Classes
			</h1>
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
				<SwiperSlide className="bg-secondary-navy">
					<div className="mx-auto mt-8 max-w-xs rounded-lg bg-[#252525] bg-opacity-40 shadow-md lg:mt-14">
						<div>
							<img
								className="mx-auto rounded-t-lg lg:p-4 lg:pb-0"
								src={yogaClass}
								alt="class-image"
							/>
						</div>
						<div className="p-5">
							<div>
								<h5 className="mb-2 text-lg font-medium tracking-tight text-white lg:text-3xl lg:font-semibold">
									Yoga
								</h5>
							</div>
							<p className="mb-3 text-sm font-light text-white lg:text-lg lg:font-normal">
								Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
								chronological order.
							</p>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide className="bg-secondary-navy">
					<div className="mx-auto mt-8 max-w-xs rounded-lg bg-[#252525] bg-opacity-40 shadow-md lg:mt-14">
						<div>
							<img
								className="mx-auto rounded-t-lg lg:p-4 lg:pb-0"
								src={fitness}
								alt="class-image"
							/>
						</div>
						<div className="p-5">
							<div>
								<h5 className="mb-2 text-lg font-medium tracking-tight text-white lg:text-3xl lg:font-semibold">
									Yoga
								</h5>
							</div>
							<p className="mb-3 text-sm font-light text-white lg:text-lg lg:font-normal">
								Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
								chronological order.
							</p>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide className="bg-secondary-navy">
					<div className="mx-auto mt-8 max-w-xs rounded-lg bg-[#252525] bg-opacity-40 shadow-md lg:mt-14">
						<div>
							<img className="mx-auto rounded-t-lg lg:p-4 lg:pb-0" src={muscle} alt="class-image" />
						</div>
						<div className="p-5">
							<div>
								<h5 className="mb-2 text-lg font-medium tracking-tight text-white lg:text-3xl lg:font-semibold">
									Yoga
								</h5>
							</div>
							<p className="mb-3 text-sm font-light text-white lg:text-lg lg:font-normal">
								Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
								chronological order.
							</p>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide className="bg-secondary-navy">
					<div className="mx-auto mt-8 max-w-xs rounded-lg bg-[#252525] bg-opacity-40 shadow-md lg:mt-14">
						<div>
							<img
								className="mx-auto rounded-t-lg lg:p-4 lg:pb-0"
								src={yogaClass}
								alt="class-image"
							/>
						</div>
						<div className="p-5">
							<div>
								<h5 className="mb-2 text-lg font-medium tracking-tight text-white lg:text-3xl lg:font-semibold">
									Yoga
								</h5>
							</div>
							<p className="mb-3 text-sm font-light text-white lg:text-lg lg:font-normal">
								Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
								chronological order.
							</p>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide className="bg-secondary-navy">
					<div className="mx-auto mt-8 max-w-xs rounded-lg bg-[#252525] bg-opacity-40 shadow-md lg:mt-14">
						<div>
							<img
								className="mx-auto rounded-t-lg lg:p-4 lg:pb-0"
								src={yogaClass}
								alt="class-image"
							/>
						</div>
						<div className="p-5">
							<div>
								<h5 className="mb-2 text-lg font-medium tracking-tight text-white lg:text-3xl lg:font-semibold">
									Yoga
								</h5>
							</div>
							<p className="mb-3 text-sm font-light text-white lg:text-lg lg:font-normal">
								Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
								chronological order.
							</p>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default ClassesList;
