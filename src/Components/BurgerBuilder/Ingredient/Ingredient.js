import React from 'react';
import './Ingredient.css';
import BreadTop from '../../../assets/images/top.jpg'
import BreadBottom from '../../../assets/images/bottom.jpg'
import Cheese from '../../../assets/images/cheese.jpg'
import Lettuse from '../../../assets/images/lettuse.jpg'
import Tomato from '../../../assets/images/tomato.jpg'

const Ingredient = props => {
    let ingredient = null;

    switch (props.type) {

        case "BreadTop":
            ingredient = <img src={BreadTop} alt={props.type} />
            break;
        case "BreadBottom":
            ingredient = <img src={BreadBottom} alt={props.type} />
            break;
        case "Cheese":
            ingredient = <img src={Cheese} alt={props.type} />
            break;
        case "Lettuse":
            ingredient = <img src={Lettuse} alt={props.type} />
            break;
        case "Tomato":
            ingredient = <img src={Tomato} alt={props.type} />
            break;

        default:
            ingredient = null;

    }


    return (
        <div className="Ingredient">{ingredient}</div>
    );
}

export default Ingredient;

