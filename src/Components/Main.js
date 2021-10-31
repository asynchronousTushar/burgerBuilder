import React, { Component } from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Header from './Header/Header';
import Auth from './Auth/Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOut from "./Auth/LogOut/LogOut";

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

class Main extends Component {
    render() {
        let routes = null;
        if (this.props.token) {
            routes = (
                <Switch>
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/checkout" exact component={Checkout} />
                    <Route path="/logout" exact component={LogOut} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} exact />
                    <Redirect to="/login" />
                </Switch>
            )
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}
                </div>
            </div >
        )
    }
}

export default connect(mapStateToProps, null)(Main);