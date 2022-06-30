import {
    ADD_CART_REQ,
    ADD_CART_SUCCESS,
    ADD_CART_FAILED,
    SEARCH_BY_USERID_REQ,
    SEARCH_BY_USERID_SUCCESS,
    SEARCH_BY_USERID_FAILED,
    CART_LIST_BY_CARTID_REQ,
    CART_LIST_BY_CARTID_SUCCESS,
    CART_LIST_BY_CARTID_FAILED,
    CART_LIST_REQ,
    CART_LIST_SUCCESS,
    CART_LIST_FAILED,
    DELETE_CART_BY_CARTID_REQ,
    DELETE_CART_BY_CARTID_SUCCESS,
    DELETE_CART_BY_CARTID_FAILED,
    DELETE_ALL_CART_REQ,
    DELETE_ALL_CART_SUCCESS,
    DELETE_ALL_CART_FAILED,
    CART_LIST_BY_CARTID_PUT_REQ,
    CART_LIST_BY_CARTID_PUT_SUCCESS,
    CART_LIST_BY_CARTID_PUT_FAILED,
} from "../actions/actionTypes"
import { combineReducers } from "redux"

const initialState = {
    data: null,
    dataCart: null,
    dataPost: null,
    dataCartList: null,
    dataPutCartList: null,
    errPutCartList: '',
    error: '',
    loading: false,
};

export const cartData = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case CART_LIST_REQ: {
            return {
                ...state,
                loading: true
            };
        }
        case CART_LIST_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                data,
                loading: false
            };
        }
        case CART_LIST_FAILED: {
            const { err } = payload;
            return {
                ...state,
                err,
                loading: false
            }
        }
        default:
            return state;
    }
}

export const addCart = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case ADD_CART_REQ: {
            return {
                ...state,
                loading: true
            };
        }
        case ADD_CART_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                data,
                loading: false
            };
        }
        case ADD_CART_FAILED: {
            const { err } = payload;
            return {
                ...state,
                error: err,
                loading: false
            };
        }
        default:
            return state;
    }
}

export const searchByUserId = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case SEARCH_BY_USERID_REQ: {
            return {
                ...state,
                loading: true
            };
        }
        case SEARCH_BY_USERID_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                data,
                loading: false
            };
        }
        case SEARCH_BY_USERID_FAILED: {
            const { err } = payload;
            return {
                ...state,
                err,
                loading: false
            };
        }
        default:
            return state;
    }
}

export const listCart = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case CART_LIST_BY_CARTID_REQ: {
            return {
                ...state,
                error: '',
                dataCartList: null,
                loading: true
            };
        }
        case CART_LIST_BY_CARTID_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                dataCartList: data,
                loading: false
            };
        }
        case CART_LIST_BY_CARTID_FAILED: {
            const { err } = payload;
            return {
                ...state,
                error: err,
                dataCartList: null,
                loading: false
            };
        }
        case DELETE_CART_BY_CARTID_REQ: {
            return {
                ...state,
                error: '',
                loading: true,
            };
        }
        case DELETE_CART_BY_CARTID_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                data: data,
                loading: false
            };
        }
        case DELETE_CART_BY_CARTID_FAILED: {
            const { err } = payload;
            return {
                ...state,
                error: err,
                loading: false
            };
        }
        case DELETE_ALL_CART_REQ: {
            return {
                ...state,
                error: '',
                loading: true,
            };
        }
        case DELETE_ALL_CART_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                data: data,
                loading: false,
            };
        }
        case DELETE_ALL_CART_FAILED: {
            const { err } = payload;
            return {
                ...state,
                error: err,
                loading: false,
            };
        }
        case CART_LIST_BY_CARTID_PUT_REQ: {
            return { ...state, err: '', loading: true };
        }
        case CART_LIST_BY_CARTID_PUT_SUCCESS: {
            const { data } = payload;
            return { ...state, dataPutCartList: data, loading: false };
        }
        case CART_LIST_BY_CARTID_PUT_FAILED: {
            const { err } = payload;
            return { ...state, errPutCartList: err, loading: false };
        }
        default:
            return state;
    }
}

const cartReducer = combineReducers({
    cartData: cartData,
    addCart: addCart,
    searchByUserId,
    listCart
});

export { cartReducer };