import React from "react";
import { Card } from "reactstrap";

const Order = props => {
    let ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span key={item.type} style={{border: "2px solid GREY", borderRadius: "2px", padding: "5px", marginLeft: "5px" , boxSizing: "border-box"}}><span>{item.unit}x</span>  {item.type}</span>
        );
    })
    return (
        <div>
            <Card style={{backgroundColor: "#F70D65"}} className="text-light text-left p-5 mt-3">
                <p><strong>Order Number:</strong>   {props.order.id}</p>
                <p><strong>Delivery Addresss:   </strong>{props.order.customer.deliveryAddress}</p>
                <p><strong>Ingredients:  </strong> {ingredientSummary}</p>
                <p><strong>Phone Number:</strong> {props.order.customer.phone}</p>
                <p><strong>Total Price:</strong> {props.order.price}</p>

            </Card>
        </div>
    );
}

export default Order;