import React from "react";
import { Helmet } from "react-helmet";
import FormLogin from "../components/FormLogin";

const LoginPage = () => {
	return (
		<div>
			<Helmet>
				<title>Login Page - WorkFit</title>
				<meta name="website" content="WorkFit" />
			</Helmet>
			<FormLogin />
		</div>
	);
};

export default LoginPage;
