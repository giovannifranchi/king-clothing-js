import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";



export const addItemHelper = (item, state) => {
    if (!(item.id in state.cartItems)) {
        return {
            ...state.cartItems, [item.id]: {
                info: item,
                itemAmount: 1
            }
        }
    } else {
        return {
            ...state.cartItems, [item.id]: {
                info: item,
                itemAmount: state.cartItems[item.id].itemAmount + 1
            }
        }
    }
}

export const removeItemHelper = (item, state) => {
    if (state.cartItems[item.id].itemAmount === 1) {
        const newItems = { ...state.cartItems };
        delete newItems[item.id];
        return newItems;
    } else {
        return {
            ...state.cartItems,
            [item.id]: {
                info: item,
                itemAmount: state.cartItems[item.id].itemAmount - 1
            }
        }
    }
}

export const clearHelper = (item, state) => {
    const newItems = { ...state.cartItems };
    delete newItems[item.id];
    return newItems;
}



export const toggleIsOpen = (data)=>createAction(CART_ACTION_TYPES.TOGGLE_IS_OPEN, data);
export const addItemToCart = (item, cart)=>{
    const newItems = addItemHelper(item, cart);
    return createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, newItems);
}
export const removeItemFromCart = (item, cart)=>{
    const newItems = removeItemHelper(item, cart);
    return createAction(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, newItems);
}
export const clearItems = (item, cart)=>{
    const newItems = clearHelper(item, cart);
    return createAction(CART_ACTION_TYPES.CLEAR_ITEMS, newItems);
}

export const updateTotal = (item, totalAmount, cart)=>{
    const newTotalAmount = totalAmount - cart.cartItems[item.id].itemAmount;
    return createAction(CART_ACTION_TYPES.UPDATE_TOTAL_AMOUNT, newTotalAmount);
}