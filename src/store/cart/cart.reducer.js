import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
    isOpen: false,
    cartItems: {},
    totalAmount: 0
};


export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_IS_OPEN:
            return { ...state, isOpen: payload };
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            return { ...state, cartItems: payload, totalAmount: state.totalAmount + 1 };
        case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
            return { ...state, cartItems: payload, totalAmount: state.totalAmount - 1 };
        case CART_ACTION_TYPES.CLEAR_ITEMS:
            return { ...state, cartItems: payload};
        case CART_ACTION_TYPES.UPDATE_TOTAL_AMOUNT:
            return {...state, totalAmount:payload};
        default:
            return state;
    }
}