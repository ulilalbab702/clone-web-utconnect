import {PromotionApi, PromotionBussinesApi} from "../api";
import {
    IMAGE_SLIDER_REQ,
    IMAGE_SLIDER_SUCCESS,
    IMAGE_SLIDER_FAILED,
    PROMOTION_LIST_REQ,
    PROMOTION_LIST_SUCCESS,
    PROMOTION_LIST_FAILED,
    PROMOTION_DETAIL_REQ,
    PROMOTION_DETAIL_SUCCESS,
    PROMOTION_DETAIL_FAILED,
    PROMOTION_HEADER_LIST_REQ,
    PROMOTION_HEADER_LIST_SUCCESS,
    PROMOTION_HEADER_LIST_FAILED
} from "../actions/actionTypes";

const api = (token) => PromotionApi.newInstance(token);
const api2 = (token) => PromotionBussinesApi.newInstance(token);
export const imageSlider = () => async (dispatch) => {
    dispatch({
        type: IMAGE_SLIDER_REQ,
    });
    try{
        const res = await api(null).imageSliderGet();
        dispatch({
            type: IMAGE_SLIDER_SUCCESS,
            payload: {data: res.data},
        });
    } catch (error) {
        dispatch({
            type: IMAGE_SLIDER_FAILED,
            payload: error,
        });
    }
};

export const promotionList = (BusinessTypeId, GroupId, Page, Sorting, PageSize) => async (dispatch) => {
    dispatch({
        type: PROMOTION_LIST_REQ,
    });
    let response = null
    try {
        const res = await api(null).promotionListGet(BusinessTypeId, GroupId, Page, Sorting, PageSize);
        dispatch({
            type: PROMOTION_LIST_SUCCESS,
            payload: {data: res.data},
        });
        response = res.data
    }catch (error) {
        dispatch({
            type: PROMOTION_LIST_FAILED,
            payload: error,
        });
        response = '400'
    }
    return response
};

export const promotionDetail = (id) => async (dispatch) => {
    dispatch({
        type: PROMOTION_DETAIL_REQ,
    });
    try{
        const res = await api(null).promotionDetail(id);
        dispatch({
            type: PROMOTION_DETAIL_SUCCESS,
            payload: {data: res.data},
        });
    } catch (error) {
        dispatch({
            type: PROMOTION_DETAIL_FAILED,
            payload: error,
        });
    }
};

export const promotionListHeader = (token) => async (dispatch) => {
    dispatch({
        type: PROMOTION_HEADER_LIST_REQ,
    });
    let response = null
    try {
        const res = await api2(token).getPromotionListHeader();
        dispatch({
            type: PROMOTION_HEADER_LIST_SUCCESS,
            payload: {data: res.data},
        });
        response = res.data
    } catch (error) {
        dispatch({
            type: PROMOTION_HEADER_LIST_FAILED,
            payload: error,
        });
        response = '400'
    }
    return response;
}