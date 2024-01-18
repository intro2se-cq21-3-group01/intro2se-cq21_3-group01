import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [grandTotalPrice, setGrandTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState("");

    useEffect(() => {
        let total = 0;
        cartItems.forEach((cartItem) => total += cartItem.quantity * cartItem.product.price)

        setSubTotalPrice(total.toFixed(2));
    }, [cartItems]);

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
        setCartItems((prevItems) => {

            const updatedItems = [...prevItems];
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.product._id === productId);

            if (existingItemIndex !== -1) {
                // If the product exists in the cart, update its quantity
                updatedItems[existingItemIndex].quantity += changeAmount;

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
        <CartContext.Provider
            value={{
                cartItems, subTotalPrice, grandTotalPrice, discount, discountCode,
                setGrandTotalPrice, setDiscount, setDiscountCode,
                addToCart, removeFromCart, clearCart, updateQuantity
            }}
        >
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
