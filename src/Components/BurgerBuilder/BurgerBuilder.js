import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import * as actionCreator from '../../redux/actionCreator';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: ingType => dispatch(actionCreator.addIngredients(ingType)),
        removeIngredient: ingType => dispatch(actionCreator.removeIngredients(ingType)),
        updatePurchasable: () => dispatch(actionCreator.updatePurchasable())
    }
}


class BurgerBuilder extends Component {
    state = {
        modelOpen: false
    }

    modelHandeler = () => {
        this.setState({
            modelOpen: !this.state.modelOpen
        })
    }

    addIngredient = type => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }

    removeIngredient = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }

    orderHandeler = () => {
        this.props.history.push("/checkout")
    }

    render() {
        return (
            <div>
                <div className="container d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls addIngredient={this.addIngredient} removeIngredient={this.removeIngredient} price={this.props.totalPrice} purchasable={this.props.purchasable} modelOpen={this.modelHandeler} />
                </div>
                <Modal isOpen={this.state.modelOpen} >
                    <ModalHeader>
                        <strong >Your Order Summary</strong>
                    </ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" className="font-weight-bold" onClick={this.orderHandeler}>Checkout</Button>
                        <Button color="danger" className="font-weight-bold" onClick={this.modelHandeler}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);