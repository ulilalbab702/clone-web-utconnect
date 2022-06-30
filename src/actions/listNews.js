import { CategoryApi, UploadDownloadApi, ListNewsApi } from "../api"
import {
    CHECKPRICE_REQ,
    CHECKPRICE_SUCCESS,
    CHECKPRICE_FAILED,
    BRANCH_LIST_REQ,
    BRANCH_LIST_SUCCESS,
    BRANCH_LIST_FAILED,
    UPLOAD_CSV_REQ,
    UPLOAD_CSV_SUCCESS,
    UPLOAD_CSV_FAILED,
    UPLOAD_FILE_REQ,
    UPLOAD_FILE_FAILED,
    UPLOAD_FILE_SUCCESS,
    DOWNLOAD_CSV_REQ,
    DOWNLOAD_CSV_SUCCESS,
    DOWNLOAD_CSV_FAILED,
    LIST_NEWS_REQ,
    LIST_NEWS_SUCCESS,
    LIST_NEWS_FAILED,
} from "./actionTypes";

const api = (token) => ListNewsApi.newInstance(token);
const apiBranch = (token) => CategoryApi.newInstance(token);
const apiUploadDownload = (token) => UploadDownloadApi.newInstance(token);

export const getBranchList = (token, IsGetAll, Description) => async (dispatch) => {
    dispatch({
        type: BRANCH_LIST_REQ,
    });
    let resp = null
    try {
        const res = await apiBranch(token).listBranchGet(IsGetAll, Description);
        if (res.data != null) {
            dispatch({
                type: BRANCH_LIST_SUCCESS,
                payload: { data: res.data },
            });
        }
        resp = res.data
    } catch (error) {
        dispatch({
            type: BRANCH_LIST_FAILED,
            payload: error
        });
        resp = '400'
    }
    return resp
};

export const getCheckPrice = (token, body) => async (dispatch) => {
    dispatch({
        type: CHECKPRICE_REQ,
    });
    let resp = null
    try {
        const res = await apiBranch(token).getCheckPrice(body);
        if (res.data != null) {
            dispatch({
                type: CHECKPRICE_SUCCESS,
                payload: { data: res.data },
            });
            resp = res.data
        }
    } catch (error) {
        dispatch({
            type: CHECKPRICE_FAILED,
            payload: error
        });
        resp = '400'
    }
    return resp
};

export const uploadCsvTemplate = (token, formData) => async (dispatch) => {
    dispatch({
        type: UPLOAD_CSV_REQ,
    });
    let response = null
    try {
        const res = await apiUploadDownload(token).postCsv(formData);
        if (res.data != null) {
            dispatch({
                type: UPLOAD_CSV_SUCCESS,
                payload: { data: res.data },
            });
            response = res.data
        }
        return response
    } catch (error) {
        dispatch({
            type: UPLOAD_CSV_FAILED,
            payload: error
        });
        response = '400'
    }
    return response
};

export const uploadAttachment = (token, file) => async (dispatch) => {
    dispatch({
        type: UPLOAD_FILE_REQ,
    });
    let response = null
    try {
        const res = await apiUploadDownload(token).postFile(file);
        if (res.data != null) {
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: { data: res.data },
            });
            response = res.data
        }
    } catch (error) {
        response = '400'
        dispatch({
            type: UPLOAD_FILE_FAILED,
            payload: error
        });
    }
    return response
};

export const getTemplate = (token) => async (dispatch) => {
    dispatch({
        type: DOWNLOAD_CSV_FAILED,
    });
    let response = null
    try {
        const res = await apiUploadDownload(token).getTemplate();
        if(res.data != null) {
            dispatch({
                type: DOWNLOAD_CSV_SUCCESS,
                payload: {data: res.data},
            });
            response = res.data
        }
    } catch (error) {
        dispatch({
            type: DOWNLOAD_CSV_FAILED,
            payload: error,
        });
        response = '400'
    }
    return response
};

export const listNewsHome = (attributeValue, PageSize, PageNumber) => async (dispatch) => {
    dispatch({
        type: LIST_NEWS_REQ,
    });
    try {
        const res = await api(null).listNewsGet(attributeValue, PageSize, PageNumber);
        dispatch({
            type: LIST_NEWS_SUCCESS,
            payload: {data: res.data},
        });
    } catch (error) {
        dispatch({
            type: LIST_NEWS_FAILED,
            payload: error,
        });
    }
};