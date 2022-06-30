import {
    IMAGE_SLIDER_FAILED,
    IMAGE_SLIDER_SUCCESS,
    IMAGE_SLIDER_REQ,
    PROMOTION_LIST_FAILED,
    PROMOTION_LIST_SUCCESS,
    PROMOTION_LIST_REQ,
    PROMOTION_DETAIL_SUCCESS,
    PROMOTION_HEADER_LIST_REQ,
    PROMOTION_HEADER_LIST_SUCCESS,
    PROMOTION_HEADER_LIST_FAILED,
} from "../actions/actionTypes";
import { combineReducers } from "redux";

const initialState = {
    image: null,
    dataDetail: null,
    data: {
        data: []
    },
    loading: false,
    promotionListHeader: [{
        attributeId: "",
        attributeValue: "Semua",
        attributeDescription: "Semua",
        groups: []
    }],
};

export const promotion = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case IMAGE_SLIDER_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                image: data,
                loading: false
            };
        }
        case IMAGE_SLIDER_REQ: {
            return {
                ...state,
                loading: true
            };
        }
        case IMAGE_SLIDER_FAILED: {
            return {
                ...state,
                loading: false
            };
        }
        case PROMOTION_LIST_REQ: {
            return {
                ...state,
                loading: true,
            };
        }
        case PROMOTION_LIST_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }
        case PROMOTION_DETAIL_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                loading: false,
                dataDetail: data,
            };
        }
        case PROMOTION_LIST_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                loading: false,
                ...data,
                data: {
                    ...state.data,
                    data: [...state.data.data, ...data.data],
                },
            };
        }
        case PROMOTION_DETAIL_SUCCESS: {
            const { data } = payload;  
            return {
                ...state,
                loading: false,
                dataDetail: data
              };
        }
        case PROMOTION_HEADER_LIST_REQ: {
            return {
                ...state,
                loading: true,
            };
        }
        case PROMOTION_HEADER_LIST_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }
        case PROMOTION_HEADER_LIST_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                loading: false,
                promotionListHeader: state.promotionListHeader.concat(data),
            };
        }
        default: 
        return state;
    }
}
const promotionReducer = combineReducers({
    promotion,
});

export { promotionReducer };