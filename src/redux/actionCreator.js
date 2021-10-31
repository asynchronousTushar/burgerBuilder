import axios from 'axios';
import * as actionType from './actionTypes';

export const addIngredients = ingType => {
    return {
        type: actionType.ADD_INGREDIENTS,
        payload: ingType
    }
}

export const removeIngredients = ingType => {
    return {
        type: actionType.REMOVE_INGREDIENTS,
        payload: ingType
    }
}

export const updatePurchasable = () => {
    return {
        type: actionType.UPADATE_PURCHASABLE
    }
}

export const resetIngredients = () => {
    return {
        type: actionType.RESET_INGREDIENTS
    }
}

export const loadOrders = orders => {
    return {
        type: actionType.LOAD_ORDERS,
        payload: orders
    }
}

export const loadFailed = () => {
    return {
        type: actionType.LOAD_FAILED
    }
}

export const fetchOrders = (token, userId) => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    return dispatch => {
        axios.get('https://burger-builder-b361b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + token + queryParams)
            .then(response => {
                dispatch(loadOrders(response.data));
            })
            .catch(err => {
                dispatch(loadFailed());
                console.log(err.message);
            })
    }
}