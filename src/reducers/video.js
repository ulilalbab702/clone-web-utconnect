import { combineReducers } from "redux";
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
} from "../actions/actionTypes";

const initialState = {
    data: null,
    dataDetail: null,
    error: null,
    loading: false,
}

export const video = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_VIDEO_ALL_REQ: {
            return { ...state, data: null, error: null, loading: true }
        };
        case GET_VIDEO_ALL_SUCCESS: {
            const { data } = payload;
            return { ...state, data: data, error: null, loading: false }
        };
        case GET_VIDEO_ALL_FAILED: {
            const { error } = payload;
            return { ...state, data: null, error: error, loading: false }
        };
        case GET_VIDEO_DETAIL_REQ: {
            return { ...state, dataDetail: null, error: null, loading: true }
        };
        case GET_VIDEO_DETAIL_SUCCESS: {
            const { data } = payload;
            return { ...state, dataDetail: data, error: null, loading: false }
        };
        case GET_VIDEO_DETAIL_FAILED: {
            const { error } = payload;
            return { ...state, dataDetail: null, error: error, loading: false }
        };
        default:
            return state;
    };
};

const initialStateFitur = {
    dataFitur: null,
    loading: false,
    errorFitur: null,
}

export const fitur = (state = { ...initialStateFitur }, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_FITUR_UTCONNECT_REQ: {
            return { ...state, dataFitur: null, errorFitur: null, loading: true }
        };
        case GET_FITUR_UTCONNECT_SUCCESS: {
            const { data } = payload;
            return { ...state, dataFitur: data, errorFitur: null, loading: false }
        };
        case GET_FITUR_UTCONNECT_FAILED: {
            const { error } = payload;
            return { ...state, dataFitur: null, errorFitur: error, loading: false }
        };
        default:
            return state;
    };
};

const videoReducer = combineReducers({
    video,
    fitur,
});

export { videoReducer };