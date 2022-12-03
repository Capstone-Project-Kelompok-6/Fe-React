import axios from "axios";

import CONST from "../utils/constants";
import { errorHandler, requestHandler, successHandler } from "./axiosInterceptors";

const configAxios = {
	baseURL: CONST.BASE_URL_API,
	headers: {},
};

const axiosInstance = axios.create(configAxios);

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
	(response) => successHandler(response),
	(error) => errorHandler(error)
);

export default axiosInstance;
