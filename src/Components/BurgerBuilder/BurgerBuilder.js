import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import Summary from './Summary/Summary';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

const priceList = {
    Cheese: 30,
    Lettuse: 40,
    Tomato: 30
}

class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: "Tomato", unit: 0 },
            { type: "Cheese", unit: 0 },
            { type: "Lettuse", unit: 0 }
        ],
        totalPrice: 40,
        modelOpen: false,
        purchasable: false
    }

    purchasableHandeler = ingredients => {
        let totalUnit = ingredients.reduce((initial, element) => {
            return initial + element.unit;
        }, 0);
        this.setState({
            purchasable: totalUnit > 0
        })
    }

    modelHandeler = () => {
        this.setState({
            modelOpen: !this.state.modelOpen
        })
    }

    addIngredient = type => {
        let ingredients = [...this.state.ingredients];
        let newPrice = this.state.totalPrice + priceList[type];
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.unit >= 3) {
                    alert('It will distroy the burger');
                    return;
                }

                item.unit++
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
        this.purchasableHandeler(ingredients);
    }

    removeIngredient = type => {
        let ingredients = [...this.state.ingredients];
        let newPrice = this.state.totalPrice - priceList[type];
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.unit <= 0) return;

                item.unit--

            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        });
        this.purchasableHandeler(ingredients);
    }

    orderHandeler = () => {
        this.props.history.push("/checkout")
    }

    render() {
        return (
            <div>
                <div className="container d-flex flex-md-row flex-column">
                    <Burger ingredients={this.state.ingredients} />
                    <Controls addIngredient={this.addIngredient} removeIngredient={this.removeIngredient} price={this.state.totalPrice} purchasable={this.state.purchasable} modelOpen={this.modelHandeler} />
                </div>
                <Modal isOpen={this.state.modelOpen}>

                </Modal>
            </div>
        );
    }

}

export default BurgerBuilder;