import { CartApi } from "../api";
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

const api = (token) => CartApi.newInstance(token);

export const listCart = (token) => async (dispatch) => {
    dispatch({
        type: CART_LIST_REQ,
    });
    try {
        const res = await api(token).listCartGet();
        dispatch({
            type: CART_LIST_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: CART_LIST_FAILED,
            payload: { err: error },
        });
    }
};

export const addCart = (token, body) => async (dispatch) => {
    dispatch({
        type: ADD_CART_REQ,
    });
    try {
        const res = await api(token).itemCartPost(body);
        if (res.data != null) {
            dispatch({
                type: ADD_CART_SUCCESS,
                payload: { data: res.data },
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_CART_FAILED,
            payload: error,
        });
    }
};

export const searchByUserId = (token, userId) => async (dispatch) => {
    dispatch({
        type: SEARCH_BY_USERID_REQ,
    });
    try {
        const res = await api(token).searchByUserIdGet(userId);
        dispatch({
            type: SEARCH_BY_USERID_SUCCESS,
            payload: { data: res },
        });
    } catch (error) {
        dispatch({
            type: SEARCH_BY_USERID_FAILED,
            payload: { err: error },
        });
    }
};

export const cartListByCartId = (token, cartId) => async (dispatch) => {
    dispatch({
        type: CART_LIST_BY_CARTID_REQ,
    });
    try {
        const res = await api(token).cartListByCartIdGet(cartId);
        dispatch({
            type: CART_LIST_BY_CARTID_SUCCESS,
            payload: { data: res },
        });
    } catch (error) {
        dispatch({
            type: CART_LIST_BY_CARTID_FAILED,
            payload: { err: error },
        });
    }
};

export const cartDetailDelete = (token, cartId) => async (dispatch) => {
    dispatch({
        type: DELETE_CART_BY_CARTID_REQ,
    });
    try {
        const res = await api(token).cartDetailDelete(cartId);
        dispatch({
            type: DELETE_CART_BY_CARTID_SUCCESS,
            payload: { data: res },
        });
    } catch (error) {
        dispatch({
            type: DELETE_CART_BY_CARTID_FAILED,
            payload: { err: error },
        });
    }
};

export const allCartDelete = (token, cartId, body) => async (dispatch) => {
    dispatch({
        type: DELETE_ALL_CART_REQ,
    });
    try {
        const res = await api(token).allCartDelete(cartId, body);
        dispatch({
            type: DELETE_ALL_CART_SUCCESS,
            payload: { data: res },
        });
    } catch (error) {
        dispatch({
            type: DELETE_ALL_CART_FAILED,
            payload: { err: error },
        });
    }
};

export const putCartListByCartId = (cartId, data, token) => async (dispatch) => {
    dispatch({
        type: CART_LIST_BY_CARTID_PUT_REQ
    });
    try {
        const res = await api(token).putCartListByCartId(cartId, data);
        dispatch({
            type: CART_LIST_BY_CARTID_PUT_SUCCESS,
            payload: { data: res },
        });
    } catch (error) {
        dispatch({
            type: CART_LIST_BY_CARTID_PUT_FAILED,
            payload: { err: error },
        });
    }
};