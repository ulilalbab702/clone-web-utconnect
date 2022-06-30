import React, {Component} from "react";
import { connect } from "react-redux";
import { getStorage } from "../../utils/storage.helper";
import { USER_STORAGE } from "../../constants/storage";
import { getUser } from "../../actions/user";

export default function (ComposedComponent) {
    class RequiredAuth extends Component {

        componentDidMount() {
            const user = getStorage("USER");
            if (user !== null) {
                this.props.getUser();
            }
        };
        render() {
            return <ComposedComponent {...this.props} />
        }
    }
    const mapStateToProps = (state) => ({
        user: state.user,
    });
    const mapDispatchToProps = (dispatch) => ({
        getUser: () => dispatch(getUser()),
    });
    return connect(mapStateToProps, mapDispatchToProps)(RequiredAuth);
}