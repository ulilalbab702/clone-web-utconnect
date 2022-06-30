import { connect } from "react-redux";
import Container from "./Container";
import { push } from "connected-react-router";
import path from "path";
import {getUser} from "../../actions/user"

const mapStateToProps = state => ({
    path: state.router.location.pathname,
    user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    push: (path) => dispatch(push(path)),
    getUser: () => dispatch(getUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);