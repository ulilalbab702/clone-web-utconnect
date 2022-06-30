import { BrandApi } from "../api";
import {
    BRAND_REQ,
    BRAND_SUCCESS,
    BRAND_FAILED
} from "../actions/actionTypes";

const api = (token) => BrandApi.newInstance(token);
export const listBrand = () => async (dispatch) => {
    dispatch({
        type: BRAND_REQ,
    });
    try {
        const res = await api(null).listBrandGet();
        dispatch({
            type: BRAND_SUCCESS,
            payload: {data: res.data},
        });
    } catch (error) {
        dispatch({
            type: BRAND_FAILED,
            payload: error,
        });
    }
};