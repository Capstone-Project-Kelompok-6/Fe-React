import React from "react";
import { Helmet } from "react-helmet";
import ArticleList from "../../components/Admin/Article/ArticleList";
import ToTop from "../../components/ToTop";

const ArticlePage = () => {
	return (
		<>
			<Helmet>
				<title>Manage Article - Gym Membership</title>
				<meta name="website" content="Gym Membership" />
			</Helmet>
			<ArticleList />
			<ToTop />
		</>
	);
};

export default ArticlePage;
