import { TermConditionApi } from "../api";
import {
    TERM_CONDITION_REQ,
    TERM_CONDITION_SUCCESS,
    TERM_CONDITION_FAILED,
} from "../actions/actionTypes";

const api = (token) => TermConditionApi.newInstance(token);
export const getTermCondition = (token) => async (dispatch) => {
    dispatch({
        type: TERM_CONDITION_REQ,
    });
    try {
        const res = await api(token).termConditionGet();
        dispatch({
            type: TERM_CONDITION_SUCCESS,
            payload: {data: res.data},
        });
    } catch (error) {
        dispatch({
            type: TERM_CONDITION_FAILED,
            payload: error
        });
    }
};