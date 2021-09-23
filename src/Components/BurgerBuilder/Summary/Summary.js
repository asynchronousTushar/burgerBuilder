import React from "react";

const Summary = props => {
    const orderSummary = props.ingredients.map(item => {
        return <li key={item.type}><strong style={{textTransform: "capitalize"}}>{item.type}:</strong>{item.unit}</li>
    })

    return (
        <div>
            <ul>{orderSummary}</ul>
        </div>
    );
}

export default Summary;