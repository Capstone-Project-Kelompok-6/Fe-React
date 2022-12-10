import axios from "axios";
import Auth from "../utils/auth";
import CONST from "../utils/constants";

const exceptionApiUrlforRT = (config) => {
	if (!config) return null;
	const arr = [
		config.url.includes("/auth/login"),
		config.url.includes("/users"),
		config.url.includes("/instructors"),
		config.url.includes("/workous"),
		config.url.includes("/classes/offline"),
		config.url.includes("/classes/online"),
		config.url.includes("/books/offline"),
		config.url.includes("/books/online"),
	];
	return arr.includes(true);
};

export const isHandlerEnabled = (config) => {
	// eslint-disable-next-line no-prototype-builtins
	return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled ? false : true;
};

export const requestHandler = async (config) => {
	if (isHandlerEnabled(config)) {
		const token = Auth.getAccessToken();
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		} else if (!exceptionApiUrlforRT(config)) {
			const newToken = await axios.patch(`${CONST.BASE_URL_API}/auth/refresh`, {
				refresh_token: Auth.getRefreshToken(),
			});

			Auth.storeUserInfoToCookie(newToken.data.data);
			config.headers["Authorization"] = `Bearer ${newToken.data.data.access_token}`;
		}
	}
	return config;
};

export const successHandler = (response) => {
	if (isHandlerEnabled(response)) {
		if (response.status === 200) {
			return response;
		}
	}
	return response;
};

export const errorHandler = (error) => {
	if (error.response && error.response.status === 401) {
		// Auth.signOut();
	}
	return Promise.reject({ ...error });
};
