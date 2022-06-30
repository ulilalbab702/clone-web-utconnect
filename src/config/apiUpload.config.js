import * as axios from 'axios';
import { getStorage } from '../utils/storage.helper';
const dotenv = require('dotenv');
dotenv.config();

const OCP_CLINET_ID = process.env.REACT_APP_OCP_CLIENT

const logging = true;

const axiosConfigOcp = {
    timeout: 30000,
    baseURL: process.env.REACT_APP_API_URL_OC,
    headers: {
        Accept: 'application/json,application/pdf,application/octet-stream',
        'Content-Type': 'multipart/form-data',
    },
}
// initial config api

const apiConfigOc = () => {
    const token = getStorage("USER")?.tokenResponse?.accessToken;

    if (OCP_CLINET_ID) axiosConfigOcp.headers['Ocp-Apim-Subscription-Key'] = OCP_CLINET_ID;
    if (token) axiosConfigOcp.headers.Authorization = `Bearer ${token}`;
    if (process.env.NODE_ENV === 'development') {
    }
    const axiosApi = axios.create(axiosConfigOcp);
    if (logging) {
        axiosApi.interceptors.request.use(request => {
            if (process.env.NODE_ENV === 'development') {
            }
            return request;
        })
        axiosApi.interceptors.response.use(response => {
            if(process.env.NODE_ENV === 'development') {
            }
            return response;
        })
    }
    return axiosApi;
};

export default apiConfigOc