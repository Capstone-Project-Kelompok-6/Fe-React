import React from "react";
import { Helmet } from "react-helmet";
import FormLogin from "../components/FormLogin";

const LoginPage = () => {
	return (
		<div>
			<Helmet>
				<title>Login Page - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<FormLogin />
		</div>
	);
};

export default LoginPage;
