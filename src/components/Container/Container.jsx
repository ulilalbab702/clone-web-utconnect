import React from "react";
import { DefaultHeader, DefaultFooter, FooterBar } from '../../components'
import { history } from "../../config/router.config";
import routes from "../../route";
import { ConnectedRouter } from "connected-react-router";
import { MENU } from "../../constants/menu";
import "../../index.css";

export default class Container extends React.Component {
    render() {
        return(
            <>
            <DefaultHeader/>
            <ConnectedRouter history={history}>
            {routes}
            </ConnectedRouter>
            <FooterBar />
            </>
        )
    }
}