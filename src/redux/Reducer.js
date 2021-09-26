import * as actionType from './actionTypes';

const priceList = {
    Cheese: 30,
    Lettuse: 40,
    Tomato: 30,
    Meat: 60
}

const initialState = {
    ingredients: [
        { type: "Tomato", unit: 0 },
        { type: "Cheese", unit: 0 },
        { type: "Meat", unit: 0 },
        { type: "Lettuse", unit: 0 }
    ],
    totalPrice: 40,
    purchasable: false,
    ordersLoading: true,
    orders: [],
    ordersError: false
}

const Reducer = (state = initialState, action) => {
    let ingredients = [...state.ingredients];

    switch (action.type) {
        case actionType.ADD_INGREDIENTS:

            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.unit >= 3) {
                        alert('It will distroy the burger');
                        return;
                    }

                    item.unit++
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + priceList[action.payload]
            }

        case actionType.REMOVE_INGREDIENTS:

            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.unit <= 0) return;

                    item.unit--
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - priceList[action.payload]
            }

        case actionType.UPADATE_PURCHASABLE:
            let sum = ingredients.reduce((totalUnit, element) => {
                return totalUnit + element.unit;
            }, 0);

            return {
                ...state,
                purchasable: sum > 0
            }
        case actionType.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: "Tomato", unit: 0 },
                    { type: "Cheese", unit: 0 },
                    { type: "Meat", unit: 0 },
                    { type: "Lettuse", unit: 0 }
                ],
                totalPrice: 40,
                purchasable: false
            }

        case actionType.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                });
            }
            return {
                ...state,
                orders: orders,
                ordersLoading: false
            }

        case actionType.LOAD_FAILED:
            return {
                ...state,
                ordersError: true,
                ordersLoading: false
            }

        default:
            return state;
    }
}

export default Reducer;