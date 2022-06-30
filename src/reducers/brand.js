import {
    BRAND_REQ,
    BRAND_SUCCESS,
    BRAND_FAILED
} from "../actions/actionTypes";
import { combineReducers } from "redux";

const initialState = {
    data: null,
    loading: false
};

export const listBrand = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case BRAND_SUCCESS: {
            const { data } = payload;
            return { ...state, data, loading: false };
        }
        case BRAND_REQ: {
            return { ...state, loading: true };
        }
        case BRAND_FAILED: {
            return { ...state, loading: false };
        }
        default:
            return state;
    }
}

const listBrandReducer = combineReducers({
    listBrand: listBrand,
});

export { listBrandReducer };