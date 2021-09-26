import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "reactstrap";

const controls = [
    { label: "Tomato", type: "Tomato" },
    { label: "Cheese", type: "Cheese" },
    { label: "Lettuse", type: "Lettuse" },
    { label: "Meat", type: "Meat" }
];

const BuildControl = props => {
    return (
        <div className="d-flex mt-1">
            <div className="mr-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <button className="btn btn-danger btn-sm mr-1" onClick={props.removeIngredient}>Less</button>
            <button className="btn btn-success btn-sm mr-1" onClick={props.addIngredient}>More</button>
        </div>
    );
}

const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{ marginTop: "30px", marginBottom: "30px", textAlign: "center" }}>
                <CardHeader style={{ backgroundColor: "#F70D64", color: "white" }}>
                    <h5>Add Ingredients</h5>
                </CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                addIngredient={() => {
                                    props.addIngredient(item.type)
                                }}
                                removeIngredient={() => {
                                    props.removeIngredient(item.type)
                                }}
                            />
                        })
                    }
                </CardBody>
                <CardFooter>
                    <h6>Price: <strong>{props.price}</strong> BDT</h6>
                    <Button color="dark" className="font-weight-bold" disabled={!props.purchasable} onClick={ props.modelOpen}>Checkout</Button>
                </CardFooter>
            </Card>
        </div>


    )
}

export default Controls;