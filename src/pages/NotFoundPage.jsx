import React from "react";
import error from "../assets/img/png/error404.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
	return (
		<div className="lg:mt-38 container mt-6">
			<Helmet>
				<title>Not Found - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<div className="flex flex-col-reverse lg:flex-row">
				<div className="flex-1 text-center lg:text-left">
					<h1 className="my-2 text-xl font-semibold lg:text-5xl">Ooops...</h1>
					<h3 className="my-2 text-lg lg:text-4xl">Page Not Found</h3>
					<p className="my-5 text-base lg:text-2xl">
						The page you are looking for doesn’t exist or an other error occurred We suggest you
						back to home
					</p>
					<Link to="/">
						<button
							type="button"
							className="mr-2 mb-2 mt-4 rounded-lg bg-secondary-navy px-8 py-4 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Back To Home
						</button>
					</Link>
				</div>
				<div className="flex-1">
					<img src={error} alt="Error Not Found 404" />
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
