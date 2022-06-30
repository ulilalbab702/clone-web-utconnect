import { VideoApi } from "../api";
import {
    GET_VIDEO_ALL_REQ,
    GET_VIDEO_ALL_SUCCESS,
    GET_VIDEO_ALL_FAILED,
    GET_VIDEO_DETAIL_REQ,
    GET_VIDEO_DETAIL_SUCCESS,
    GET_VIDEO_DETAIL_FAILED,

    GET_FITUR_UTCONNECT_REQ,
    GET_FITUR_UTCONNECT_FAILED,
    GET_FITUR_UTCONNECT_SUCCESS,
} from "./actionTypes";

const api = (token) => VideoApi.newInstance(token);

export const getAllVideo = (PageNumber, PageSize) => async (dispatch) => {
    dispatch({
        type: GET_VIDEO_ALL_REQ,
    });
    try {
        const res = await api(null).videoAllGet(PageNumber, PageSize);
        dispatch({
            type: GET_VIDEO_ALL_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: GET_VIDEO_ALL_FAILED,
            payload: error,
        });
    }
};

export const getDetailVideo = (videoId) => async (dispatch) => {
    dispatch({
        type: GET_VIDEO_DETAIL_REQ,
    });
    try {
        const res = await api(null).videoDetailGet(videoId);
        dispatch({
            type: GET_VIDEO_DETAIL_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: GET_VIDEO_DETAIL_FAILED,
            payload: error,
        });
    }
};

export const getFiturUTConnectAction = () => async (dispatch) => {
    dispatch({
        type: GET_FITUR_UTCONNECT_REQ,
    });
    try {
        const res = await api().getFiturUTConnect();
        dispatch({
            type: GET_FITUR_UTCONNECT_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: GET_FITUR_UTCONNECT_FAILED,
            payload: error,
        });
    }
};