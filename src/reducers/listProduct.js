import { LIST_PRODUCT_FAILED, LIST_PRODUCT_REQ, LIST_PRODUCT_SUCCESS } from "../actions/actionTypes";
import { combineReducers } from "redux";

const initialState = {
    data: {
        data: [],
    },
    loading: false,
};

export const listProduct = (state = { ...initialState }, action) => {
    const { payload, type } = action;
    switch (type) {
        case LIST_PRODUCT_REQ: {
            return {
                ...state,
                loading: true,
            };
        }
        case LIST_PRODUCT_FAILED: {
            return {
                ...state,
                loading: false,
            };
        }
        case LIST_PRODUCT_SUCCESS: {
            const { data } = payload;
            return {
                ...state,
                loading: false,
                ...data,
                data: {
                    ...state.data,
                    data: [...data.data],
                },
            };
        }
        default:
            return state;
    }
};

const listProductReducer = combineReducers({
    listProduct: listProduct,
});

export { listProductReducer };