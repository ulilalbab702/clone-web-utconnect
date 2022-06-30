import React from 'react';
import { MENU } from '../constants/menu';
import {
  HomePage,
  LandingPage,
  DetailProduct,
  WishlistPage,
  BucketList,
  OrderDetail,
  BillingAddress,
  TermConditionPage
} from '../views';
import { Route, Switch, Redirect } from 'react-router';
import RequiredAuth from '../components/AuthGuard';



const routes = (
  <Switch>
    <Route exact path={MENU.LANDING} component={RequiredAuth(HomePage)} />
    <Route exact path={MENU.HOME} component={RequiredAuth(LandingPage)} />
    <Route exact path={`${MENU.DETAIL_PRODUCT}:productId`} component={RequiredAuth(DetailProduct)} />
    <Route exact path={MENU.WISHLIST} component={RequiredAuth(WishlistPage)} />
    <Route exact path={MENU.BUCKETLIST} component={RequiredAuth(BucketList)} />
    <Route exact path={MENU.ORDERDETAIL} component={(OrderDetail)} />
    <Route exact path={MENU.BILLING} component={RequiredAuth(BillingAddress)} />
    <Route exact path={MENU.TERMCONDITION} component={RequiredAuth(TermConditionPage)} />
    <Redirect to="/Landing" />
  </Switch>
);

export default routes;