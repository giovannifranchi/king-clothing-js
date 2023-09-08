import { createContext } from "react";
import { useState } from "react";

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: ()=>null,
    cartItems: {},
    setCartItems: ()=>null,
    totalAmount: 0,
    setTotalAmount: ()=>null,
});

export const CartProvider = ({children})=> {

    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [totalAmount, setTotalAmount] =  useState(0);


    const addItemstoCart = (item) => {
        if (!(item.id in cartItems)) {
            setCartItems((prevCartItems) => ({
                ...prevCartItems,
                [item.id]: { info: item, itemAmount: 1 },
            }));
        } else {
            setCartItems((prevCartItems) => ({
                ...prevCartItems,
                [item.id]: {
                    info: item,
                    itemAmount: prevCartItems[item.id].itemAmount + 1,
                },
            }));
        }
        setTotalAmount(totalAmount + 1);
    };

    const removeItemsFromCart = (item)=>{
        if(cartItems[item.id].itemAmount === 1){
            const key = item.id;
            const newItems = {...cartItems}
            delete newItems[key];
            setCartItems({...newItems})
        }else{
            setCartItems((prevItems)=>({
                ...prevItems,
                [item.id]:{
                    info: item,
                    itemAmount: prevItems[item.id].itemAmount - 1
                }
            }))
        }

        setTotalAmount(totalAmount - 1);
    }

    const removeAllItems = ({id})=>{
        const amountToRemove = cartItems[id].itemAmount;
        const newItems = {...cartItems}
        delete newItems[id];
        setCartItems(newItems);
        setTotalAmount(totalAmount - amountToRemove);
    }
    

    const value = {isOpen, setIsOpen, cartItems, setCartItems, totalAmount, setTotalAmount, addItemstoCart, removeItemsFromCart, removeAllItems};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}