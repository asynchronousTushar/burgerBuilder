import React from 'react';
import './Burger.css';
import Ingredient from '../Ingredient/Ingredient';

const Burger = props => {

    let ingredientsArr = props.ingredients.map( item => {
        let unitArr = [...Array(item.unit).keys()];
        return unitArr.map(() => {
            return <Ingredient type={item.type} key={Math.random()}/>;
        })
    })
    .reduce((ingredients, element) => {
        return ingredients.concat(element)
    }, [] );
    
    if (ingredientsArr.length === 0) {
        ingredientsArr = <p>Please add some ingredients! </p>;
    }

    return (
        <div className="Burger">
            <Ingredient type="BreadTop"/>
                {ingredientsArr}
            <Ingredient type="BreadBottom"/>
            <br/>
            <br/>
        </div>
    )
}

export default Burger;