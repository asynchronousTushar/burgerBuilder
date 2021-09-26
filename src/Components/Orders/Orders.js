import React from "react";
import Spinner from "./Spinner/Spinner";
import Order from "./Order/Order";
import { connect } from 'react-redux';
import { fetchOrders } from "../../redux/actionCreator";
import { Alert } from "reactstrap";

const mapStateToProps = state => {
    return {
        ordersLoading: state.ordersLoading,
        ordersError: state.ordersError,
        orders: state.orders
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

class Orders extends React.Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orders = null;
        if (this.props.ordersError) {
            orders = <Alert><strong>There might be a server error. Please Contact us for any query! </strong></Alert>;
        } else {
            if (this.props.orders.length === 0) {
                orders = <Alert><strong>You have no order right now! </strong></Alert>;
            } else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />;
                });
            }
        }
        return (
            <div>
                {this.props.ordersLoading ? <Spinner /> : orders}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);