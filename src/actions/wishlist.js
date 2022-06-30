import { WishlistApi } from "../api";
import {
    WISHLIST_POST_REQ,
    WISHLIST_POST_SUCCESS,
    WISHLIST_POST_FAILED,
    WISHLIST_DEL_FAILED,
    WISHLIST_DEL_REQ,
    WISHLIST_DEL_SUCCESS,
    WISHLIST_GET_REQ,
    WISHLIST_GET_SUCCESS,
    WISHLIST_GET_FAILED,
} from "./actionTypes";

const api = (token) => WishlistApi.newInstance(token);
export const addWishlist = (token, data) => async (dispatch) => {
    dispatch({
        type: WISHLIST_POST_REQ,
    });
    try {
        const res = await api(token).wishlistPost(data);
        dispatch({
            type: WISHLIST_POST_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_POST_FAILED,
            payload: error,
        });
    }
};

export const delWishlist = (token, data) => async (dispatch) => {
    dispatch({
        type: WISHLIST_DEL_REQ,
    });
    try {
        const res = await api(token).wishlistDelete(data);
        dispatch({
            type: WISHLIST_DEL_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_DEL_FAILED,
            payload: error
        });
    }
};

export const getWishlist = (token) => async (dispatch) => {
    dispatch({
        type: WISHLIST_GET_REQ,
    });
    try {
        const res = await api(token).wishlistGet();
        dispatch({
            type: WISHLIST_GET_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: WISHLIST_GET_FAILED,
            payload: error,
        });
    }
};