import React, { Component } from "react";
import { Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../../redux/authActionCreator";

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(logOut())
    }
}

class LogOut extends Component {

    componentDidMount() {
        this.props.logOut();
    }

    render() {
        return (
            <Switch>
                <Redirect to="/login" exact />
            </Switch>
        );
    }
}

export default connect(null, mapDispatchToProps)(LogOut);