import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from '../reducers';
import {history} from './router.config';

function storeConfig(state){
    const middlewares = []
    if(process.env.NODE_ENV === 'development') {
        middlewares.push(logger)
    }
    const composeEnhancer = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        appReducer,
        state,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                ...middlewares
                )),
                );
        return store;
}

export default storeConfig;