import React from "react";
import { Helmet } from "react-helmet";

import {
	Navbar,
	Hero,
	AboutUs,
	ClassesInfo,
	Testimonial,
	Footer,
	ClassesList,
	InstructorInfo,
	ToTop,
} from "../components/LayoutLanding";

const LandingPage = () => {
	return (
		<>
			<Helmet>
				<title>WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<Navbar />
			<main>
				<section id="hero" className="px-4 lg:pt-2">
					<Hero />
				</section>
				<section id="about" className="px-4 pt-24 pb-16">
					<AboutUs />
				</section>
				<section id="classes-info" className="lg:mt-16">
					<ClassesInfo />
				</section>
				<section id="classes-list">
					<ClassesList />
				</section>
				<section id="instructor" className="mt-10 lg:mt-20">
					<InstructorInfo />
				</section>
				<section id="testimonial">
					<Testimonial />
				</section>
			</main>
			<Footer />
			<ToTop />
		</>
	);
};

export default LandingPage;
