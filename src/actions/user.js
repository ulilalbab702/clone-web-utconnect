import { AccountApi } from "../api"
import {
    FAILURE_TYPE,
    LOGIN_TYPE,
    REQUEST_TYPE,
    SUCCESS_TYPE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQ,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
} from "../actions/actionTypes";
import { getStorage, setStorage } from "../utils/storage.helper"
import { USER_STORAGE } from "../constants/storage"

export const login = (data) => async dispatch => {
    const api = AccountApi.newInstance();
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await api.login(data)
        setStorage(USER_STORAGE, response.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                statusCode: response.status,
                data: response.data,
            },
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: { message: true }
        });
    }
};

export const getUser = () => dispatch => {
    dispatch({
        type: GET_USER_REQ
    });
    const user = getStorage(USER_STORAGE);
    if (user) {
        dispatch({
            type: GET_USER_SUCCESS,
            payload: {data: user},
        });
    } else {
        dispatch({
            type: GET_USER_FAILED,
            payload: {message: null},
        });
    }
};