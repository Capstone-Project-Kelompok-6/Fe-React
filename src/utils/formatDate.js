import moment from "moment/min/moment-with-locales";

export const formatShortDate = (date) => {
	return date.toString().length === 13
		? moment(date).format("DD MMM YYYY")
		: moment(date * 1000).format("DD MMM YYYY");
};

export const formatLongDate = (date) => {
	return date.toString().length === 13
		? moment(date).format("DD MMMM YYYY")
		: moment(date * 1000).format("DD MMMM YYYY");
};

export const formatCommonDate = (date) => {
	return moment(date).format("DD MMMM YYYY");
};

export const formatDateTime = (dateTime) => {
	return moment(dateTime).format("DD MMM YYYY");
};
