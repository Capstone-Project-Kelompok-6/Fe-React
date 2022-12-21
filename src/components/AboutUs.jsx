import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import car1 from "../assets/img/png/car1.png";
import car2 from "../assets/img/png/car2.png";
import car3 from "../assets/img/png/car3.png";
import car4 from "../assets/img/png/car4.png";

const AboutUs = () => {
	SwiperCore.use([Autoplay]);

	return (
		<div className="container">
			<div className="mt-4 mb-10">
				<div className="text-center lg:pt-10">
					<h1 className="text-xl font-semibold leading-tight lg:mb-3 lg:text-4xl">
						What Is <span>Work</span>
						<span className="text-primary-violet">Fit.</span>
					</h1>
					<p className="mt-3 mb-10 text-lg lg:text-xl">
						WorkFit is a preparation class suitable for members who have just started Fitness.
					</p>
					<Swiper
						className="mySwiper"
						loop={true}
						autoplay={{
							delay: 1500,
							pauseOnMouseEnter: true,
							disableOnInteraction: false,
						}}>
						<SwiperSlide>
							<img src={car1} alt="About" className="mx-auto rounded-lg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={car2} alt="About" className="mx-auto rounded-lg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={car3} alt="About" className="mx-auto rounded-lg" />
						</SwiperSlide>
						<SwiperSlide>
							<img src={car4} alt="About" className="mx-auto rounded-lg" />
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
