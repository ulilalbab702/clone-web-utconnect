import { ListProductApi } from "../api";
import {
    LIST_PRODUCT_FAILED,
    LIST_PRODUCT_REQ,
    LIST_PRODUCT_SUCCESS,
} from "../actions/actionTypes";

const api = (token) => ListProductApi.newInstance(token);
export const listProduct = (token, page, Brand, Category, MinimumPrice, MaximumPrice, RatingValue, Filters) => async (dispatch) => {
    dispatch({
        type: LIST_PRODUCT_REQ,
    });
    try {
        const res = await api(token).getListProduct(page, Brand, Category, MinimumPrice, MaximumPrice, RatingValue, Filters);
        dispatch({
            type: LIST_PRODUCT_SUCCESS,
            payload: { data: res.data },
        });
    } catch (error) {
        dispatch({
            type: LIST_PRODUCT_FAILED,
            payload: error,
        });
    }
};