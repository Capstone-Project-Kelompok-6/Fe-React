import moment from "moment/min/moment-with-locales";
import "moment/locale/id";
moment.locale("id");

export const formatShortDate = (date) => {
	return date.toString().length === 13 ? moment(date).format("ll") : moment(date * 1000).format("ll");
};

export const formatLongDate = (date) => {
	return date.toString().length === 13 ? moment(date).format("LL") : moment(date * 1000).format("LL");
};

export const formatCommonDate = (date) => {
	return moment(date).format("LL");
};

export const formatDateTime = (dateTime) => {
	return moment(dateTime).format("ll - LT");
};
