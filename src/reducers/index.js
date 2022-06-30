import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../config/router.config';
import { videoReducer } from './video';
import { promotionReducer } from './promotion';
import { listBrandReducer } from './brand';
import { listProductReducer } from './listProduct';
import { listNewsReducer } from './listNews';
import { userReducer } from './user';
import { detailProductReducer } from './detailProduct';
import { wishlistReducer } from './wishlist';
import { cartReducer } from './cart';
import { termConditionReducer } from './termCondition';

const appReducer = combineReducers({
    router: connectRouter(history),
    video: videoReducer,
    promotions: promotionReducer,
    listBrand: listBrandReducer,
    listProduct: listProductReducer,
    listNews: listNewsReducer,
    user: userReducer,
    detailProduct: detailProductReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    termCondition: termConditionReducer,
});

export default appReducer;
