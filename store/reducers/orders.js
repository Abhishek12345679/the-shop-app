import { ADD_ORDER, GET_ORDER } from "../actions/orders";
import order from "../../models/order";

const initialState = {
    orders: []
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER:
            return {
                ...state,
                orders: action.orders
            };
        case ADD_ORDER:
            const newOrder = new order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            );

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
        default:
            return state;
    }
};

export default ordersReducer;