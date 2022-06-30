import * as axios from 'axios';
const dotenv = require('dotenv');
dotenv.config();

const IBM_CLIENT_ID = process.env.REACT_APP_OCP_CLIENT
const axiosConfig = {
    timeout: 30000,
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept: 'application/json,application/pdf,application/octet-stream',
    },
};
//Set to true for enabling logging axios request and response
const logging = true;

//Initial Config API
const apiConfig = (token) => {
    // add token IBM_CLIENT_ID to Headers if token not null
    if (IBM_CLIENT_ID) axiosConfig.headers['Ocp-Apim-Subscription-Key'] = IBM_CLIENT_ID;
    if (token) axiosConfig.headers.Authorization = `Bearer ${token}`;
    if (process.env.NODE_ENV === 'development') {
    }
    const axiosApi = axios.create(axiosConfig);
    if (logging) {
        axiosApi.interceptors.request.use(request => {
            if (process.env.NODE_ENV === 'development') {
            }
            return request;
        })
        axiosApi.interceptors.response.use(response => {
            if (process.env.NODE_ENV === 'development') {
            }
            return response;
        })
    }
    return axiosApi;
};

export default apiConfig;