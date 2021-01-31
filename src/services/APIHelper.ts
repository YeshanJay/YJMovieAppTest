
import Axios, { AxiosInstance } from "axios";
import * as AxiosLogger from 'axios-logger';

import { ServiceUrls } from "../constants/ServiceUrls";
import { UserLogin } from "../models/UserLogin";
import { envConfig } from "../../env";
import { Console } from "../utils/ConsoleLog";


export class APIHelper {

    private static _instance: APIHelper = null;
    private _axios: AxiosInstance = null;

    private constructor() {

    }

    /**
     * Gets the instance.
     */
    static get instance(): APIHelper {
        if (APIHelper._instance == null) {
            APIHelper._instance = new APIHelper();

            const headers: any = {};

            if (UserLogin.isAuthenticated && UserLogin.instance.authToken) {
                // headers["Authorization"] = `Bearer ${UserLogin.instance.authToken}`;
            }

            headers["Content-Type"] = "application/json";

            Console.debug("ServiceUrls.API_BASE_URL: ", ServiceUrls.API_BASE_URL);
            APIHelper._instance._axios = Axios.create({
                baseURL: ServiceUrls.API_BASE_URL,
                headers,
                timeout: 30000
            });

            APIHelper._instance._axios.interceptors.request.use(AxiosLogger.requestLogger);
            APIHelper._instance._axios.interceptors.request.use((requestConfig) => {
                if (!(requestConfig.params && requestConfig.params.api_key)) {
                    if (!requestConfig.params) {
                        requestConfig.params = {};
                    }

                    requestConfig.params.api_key = envConfig.API_TMDB_KEY;
                }

                return requestConfig;
            });
            APIHelper._instance._axios.interceptors.response.use((res) => {
                return res;
            }, (error) => {
                Console.error(error);
                return Promise.reject(error);
            });
        }

        return APIHelper._instance;
    }

    /**
     * Gets the instance of axios.
     */
    static get api(): AxiosInstance {
        if (!APIHelper.instance) {
            return null;
        }

        return APIHelper.instance._axios;
    }

    /**
     * Clears the instance of axios.
     */
    static clearInstance(): void {
        if (APIHelper._instance) {
            APIHelper.instance._axios = null;
        }
        APIHelper._instance = null;
    }

}

