import {
    GET_USER_TYPE,
    LOGIN_TYPE,
    LOGOUT_TYPE,
    SET_LEADER_TYPE,
    SUCCESS_TYPE,
    LOGIN_SUCCESS,
    GET_USER_SUCCESS,
    LOGOUT_SUCCESS
} from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = null;

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.data,
            }
        case GET_USER_SUCCESS:
            return { ...state, ...action.payload.data };
        case SET_LEADER_TYPE:
            return { ...state, isLeader: action.payload };
        case LOGOUT_SUCCESS:
            return { ...initialState };
        case `CLEAR_STORE`:
            return state = null;
        default:
            return state;
    }
};

const userReducer = combineReducers({
    user
});

export { userReducer };