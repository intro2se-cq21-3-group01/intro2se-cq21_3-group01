import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.product._id === item.product._id);

            if (existingItemIndex !== -1) {
                // If the product already exists in the cart, update its quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;

                return updatedItems;
            } else {
                // If the product is not in the cart, add it
                return [...prevItems, item];
            }
        });
    };

    const updateQuantity = (productId, changeAmount) => {
        console.log('call');
        setCartItems((prevItems) => {
            console.log('call set');

            const updatedItems = [...prevItems];
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.product._id === productId);

            if (existingItemIndex !== -1) {
                // If the product exists in the cart, update its quantity
                console.log(updatedItems[existingItemIndex].quantity);
                updatedItems[existingItemIndex].quantity += changeAmount;
                console.log(updatedItems[existingItemIndex].quantity);

                // If the quantity becomes 0 or negative, remove the item from the cart
                if (updatedItems[existingItemIndex].quantity <= 0) {
                    updatedItems.splice(existingItemIndex, 1);
                }
            }

            return updatedItems;
        });
    };

    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((item, i) => i !== index));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
