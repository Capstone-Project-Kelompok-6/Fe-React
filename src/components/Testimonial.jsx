import React from "react";
import Card from "./Card";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";

const Testimonial = () => {
	SwiperCore.use([Autoplay]);

	return (
		<div className="container pt-24 pb-16">
			<div className="text-center">
				<h1 className="text-xl font-semibold lg:text-4xl lg:font-normal">
					What are they saying?
				</h1>
				<p className="font-normal lg:mt-5 lg:px-72 lg:text-lg">
					here are some things they said about workfit, let`s see what they
					think after using workfit
				</p>
			</div>
			<div className="flex flex-wrap pt-6">
				<div className="w-[30%] px-4 py-4 md:py-0 lg:w-1/2 xl:w-1/4">
					<h6 className="text-sm lg:text-base">Testimonial</h6>
					<h3 className="text-xs font-semibold lg:text-3xl">
						What People Say About Our Services
					</h3>
				</div>
				<div className="w-[70%] px-4 lg:w-1/2 xl:w-3/4">
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
							delay: 2000,
							pauseOnMouseEnter: true,
							disableOnInteraction: false,
						}}
					>
						<SwiperSlide>
							<Card />
						</SwiperSlide>

						<SwiperSlide>
							<Card />
						</SwiperSlide>

						<SwiperSlide>
							<Card />
						</SwiperSlide>

						<SwiperSlide>
							<Card />
						</SwiperSlide>

						<SwiperSlide>
							<Card />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
