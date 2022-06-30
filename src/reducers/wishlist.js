import { combineReducers } from "redux";
import {
    WISHLIST_POST_REQ,
    WISHLIST_POST_SUCCESS,
    WISHLIST_POST_FAILED,
    WISHLIST_DEL_REQ,
    WISHLIST_DEL_SUCCESS,
    WISHLIST_DEL_FAILED,
    WISHLIST_GET_REQ,
    WISHLIST_GET_SUCCESS,
    WISHLIST_GET_FAILED,
} from "../actions/actionTypes";

const initialState = {
    dataGet: null,
    dataPost: null,
    dataDel: null,
    loading: false,
    error: null,
};

export const wishlist = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case WISHLIST_POST_REQ: {
            return {
                ...state,
                dataPost: null,
                error: null,
                loading: true
            }
        };
        case WISHLIST_POST_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                dataPost: data,
                error: null,
                loading: false
            }
        };
        case WISHLIST_POST_FAILED: {
            const { error } = payload;
            return {
                ...state,
                dataPost: null,
                error: error,
                loading: false
            }
        };
        case WISHLIST_DEL_REQ: {
            return {
                ...state,
                dataDel: null,
                error: null,
                loading: true
            }
        };
        case WISHLIST_DEL_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                dataDel: data,
                error: null,
                loading: false
            }
        };
        case WISHLIST_DEL_FAILED: {
            const { error } = payload;
            return {
                ...state,
                dataDel: null,
                error: error,
                loading: false
            }
        };
        case WISHLIST_GET_REQ: {
            return {
                ...state,
                dataGet: null,
                error: null,
                loading: true
            }
        };
        case WISHLIST_GET_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                dataGet: data,
                error: null,
                loading: false
            }
        };
        case WISHLIST_GET_FAILED: {
            const {error} = payload;
            return{
                ...state,
                dataGet: null,
                error: error,
                loading: false
            }
        };
        default:
            return state;
    };
};

const wishlistReducer = combineReducers({
    wishlist: wishlist,
});

export { wishlistReducer }