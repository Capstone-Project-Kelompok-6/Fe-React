import React from "react";
import heroImage from "../assets/img/png/heroImage.png";
import playStore from "../assets/img/png/playStore.png";
import appStore from "../assets/img/png/appStore.png";

const Hero = () => {
	return (
		<div className="container mt-24 lg:mt-36 ">
			<div className="flex flex-col-reverse lg:flex lg:flex-row">
				<div className="flex-1 lg:pb-28">
					<h1 className="text-xl font-semibold leading-normal tracking-widest lg:text-6xl">
						LET`S START A NEW LIFE TODAY
					</h1>
					<p className="mt-3 text-base font-normal leading-snug tracking-normal lg:my-7 lg:pr-32 lg:text-4xl">
						We are here to help organize your diet plan for a better lifestyle
					</p>
					<div className="mx-auto mt-6 flex w-3/4 lg:mx-0 lg:mt-16 lg:flex">
						<div className="mr-4 flex-1">
							<a href="/">
								<img src={playStore} alt="Play Store" />
							</a>
						</div>
						<div className="flex-1">
							<a href="/">
								<img src={appStore} alt="App Store" />
							</a>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<img
						src={heroImage}
						style={{ width: "400px" }}
						className="ml-5 lg:ml-64 lg:-mt-10"
						alt="Hero"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
