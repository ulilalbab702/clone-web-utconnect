import TermConditionPage from "./TermConditionPage";
import { connect } from "react-redux";
import { login } from "../../actions/user";
import { getTermCondition } from "../../actions/termCondition";
import { push } from "connected-react-router";

const mapStateToProps = state => ({
    ...state.user,
    dataTermCondition: state.termCondition.termCondition.data,
});

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data)),
    push: (url) => dispatch(push(url)),
    fetchTermCondition: (token) => dispatch(getTermCondition(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TermConditionPage);