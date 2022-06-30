import {
    CHECKPRICE_SUCCESS,
    BRANCH_LIST_FAILED,
    BRANCH_LIST_REQ,
    BRANCH_LIST_SUCCESS,
    UPLOAD_CSV_SUCCESS,
    UPLOAD_FILE_SUCCESS,
    DOWNLOAD_CSV_SUCCESS,
    LIST_NEWS_FAILED,
    LIST_NEWS_REQ,
    LIST_NEWS_SUCCESS,
} from "../actions/actionTypes";
import { combineReducers } from "redux";

const initialState = {
    priceList: null,
    branchList: null,
    uploadCsv: null,
    uploadPdf: null,
    downloadFile: null,
    newsHome: {
        data: []
    },
};

export const listNews = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case CHECKPRICE_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                priceList: data
            };
        }
        case BRANCH_LIST_REQ: {
            return {
                ...state,
                branchList: null
            };
        }
        case BRANCH_LIST_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                branchList: data
            };
        }
        case UPLOAD_FILE_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                uploadPdf: data
            };
        }
        case UPLOAD_CSV_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                uploadCsv: data
            };
        }
        case DOWNLOAD_CSV_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                downloadFile: data
            };
        }
        case LIST_NEWS_REQ: {
            return {
                ...state,
                loading: true,
                newsHome: {
                    data: []
                },
            };
        }
        case LIST_NEWS_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                loading: false,
                newsHome: {
                    data
                },
            };
        }
        case LIST_NEWS_FAILED: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state;
    }
};

const listNewsReducer = combineReducers({
    listNews: listNews
});

export { listNewsReducer }