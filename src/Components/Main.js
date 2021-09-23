import React from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Header from './Header/Header';
import { Route } from 'react-router-dom';

const Main = props => {
    return (
        <div>
            <Header />
            <div className="container">
                <Route path="/orders" exact component={Orders} />
                <Route path="/checkout" exact component={Checkout} />
                <Route path="/" exact component={BurgerBuilder} />
            </div>
        </div>
    )
}

export default Main;