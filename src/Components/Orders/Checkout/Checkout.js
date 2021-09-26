import React from "react";
import { Card, Button, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import axios from 'axios';
import * as actionCreator from "../../../redux/actionCreator";
import Spinner from '../Spinner/Spinner';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(actionCreator.resetIngredients())
    }
}

class Checkout extends React.Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        isModelOpen: false,
        modalMessage: "",
        isLoading: false,
        orderStatus: ""
    }

    onchangeHandeler = event => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            }
        });
    }

    submitHandeler = () => {
        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: this.state.values,
            orderTime: new Date()
        }
        this.setState({
            isLoading: true
        })
        axios.post("https://burger-builder-b361b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isModelOpen: true,
                        modalMessage: "Order placed Succesfully",
                        orderStatus: "success",
                        isLoading: false
                    });
                } else {
                    this.setState({
                        isModelOpen: true,
                        modalMessage: "something Went Wrong! Please Order Again",
                        orderStatus: "failed",
                        isLoading: false
                    });
                }
            })
            .catch(err => {
                this.setState({
                    isModelOpen: true,
                    modalMessage: `${err.message}!  Please Order Again.`,
                    orderStatus: "failed",
                    isLoading: false
                });
                console.log(err);
                console.log(err.message);
            });
    }

    cancelSubmit = () => {
        this.props.history.goBack();
    }

    submitFailed = () => {
        this.setState({
            isModelOpen: false
        });
    }

    submitSuccesfull = () => {
        this.setState({
            isModelOpen: false
        });
        this.props.resetIngredients();
        this.props.history.push("/orders");
    }



    render() {

        let modal = null;

        if (this.state.orderStatus === "success") {
            modal = <Modal isOpen={this.state.isModelOpen} >
                <ModalBody onClick={this.submitSuccesfull}>
                    {this.state.modalMessage}
                </ModalBody>
            </Modal>;
        } else {
            modal = <Modal isOpen={this.state.isModelOpen} >
                <ModalBody onClick={this.submitFailed}>
                    {this.state.modalMessage}
                </ModalBody>
            </Modal>;
        }

        let form = <div>
            <Card style={{ backgroundColor: "#D70F64", padding: "20px", marginTop: "30px" }}>
                <h4 style={{ color: "#f1f1f1", marginBottom: "30px", fontFamily: "sans-serif" }}>payment : <strong>{this.props.totalPrice} BDT</strong></h4>
                <form>
                    <textarea name="deliveryAddress" value={this.state.paymentAddress} placeholder="Enter Your Delivery Address" style={{ backgroundColor: "#f1f1f1" }} className="form-control mb-2" onChange={e => this.onchangeHandeler(e)} />
                    <input name="phone" value={this.state.phone} placeholder="Enter Your Phone Number" style={{ backgroundColor: "#f1f1f1" }} className="form-control mb-2" onChange={e => this.onchangeHandeler(e)} />
                    <select name="paymentMethod" value={this.state.values.paymentType} style={{ backgroundColor: "#f1f1f1" }} className="form-control mb-5" onChange={e => this.onchangeHandeler(e)}>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <Button color="light" className="mr-2 font-weight-bold" onClick={this.submitHandeler} disabled={!this.props.purchasable}>Place Order</Button>
                    <Button color="dark" className="mr-auto font-weight-bold" onClick={this.cancelSubmit}>Cancel</Button>
                </form>
                <br />
            </Card>
            {modal}
        </div>;

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);