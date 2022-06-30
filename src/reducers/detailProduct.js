import {
    DETAIL_PRODUCT_SUCCESS,
    DETAIL_PRODUCT_REVIEW_REQ,
    DETAIL_PRODUCT_REVIEW_SUCCESS,
    DETAIL_PRODUCT_REVIEW_FAILED,
} from "../actions/actionTypes";
import { combineReducers } from "redux";

const initialState = {
    data: null,
    dataReview: null,
    loading: false,
    error: null,
};

export const detailProduct = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case DETAIL_PRODUCT_SUCCESS: {
            const { data } = payload;
            return { ...state, data };
        }
        case DETAIL_PRODUCT_REVIEW_REQ: {
            return { ...state, dataReview: null, error: null, loading: true };
        }
        case DETAIL_PRODUCT_REVIEW_SUCCESS: {
            const { data } = payload;
            return { ...state, dataReview: data, error: null, loading: false };
        }
        case DETAIL_PRODUCT_REVIEW_FAILED: {
            const { error } = payload;
            return { ...state, dataReview: null, error: error, loading: false };
        }
        default:
            return state;
    }
};

const detailProductReducer = combineReducers({
    detailProduct,
});

export { detailProductReducer };