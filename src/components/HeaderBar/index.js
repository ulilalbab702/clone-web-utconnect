import { connect } from "react-redux";
import DefaultHeader from "./DefaultHeader";
import { push } from "connected-react-router";
import { login } from "../../actions/user";
import { searchByUserId } from "../../actions/cart";

const mapStateToProps = (state) => ({
    ...state.user,
    path: state.router.location.pathname,
    user: state.user,
    dataCart: state.cart.searchByUserId.data?.data,
})

const mapDispatchToProps = (dispatch) => ({
    push: (path, item) => dispatch(push(path, item)),
    login: (param) => dispatch(login(param)),
    fetchSearchByUserId: (token, userId) => dispatch(searchByUserId(token, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);