import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const PayPal = (props) => {
    const { cartItems, totalPrice } = useCart();
    const { user } = useAuth();
    const { handlePayByCash } = props;

    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/orders/paypal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    cart: cartItems,
                    totalPrice: totalPrice
                }),
            });

            const orderData = await response.json();

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/paypal/${data.orderID}/capture`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    cart: cartItems,
                    totalPrice: totalPrice
                })
            });

            const orderData = await response.json();
            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
            } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
            } else {
                handlePayByCash();
                console.log("Capture result", orderData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PayPalScriptProvider options={{ 'client-id': 'AQOdGJXftE2huWtYIteDfFDn_NrOMJwxSbBGIUif1wGZbirU1JG9LEE7dfvgiY0XfABJl71CtByQlZNu' }}>
            <div id="paypal-button-container">
                <PayPalButtons
                    createOrder={() => createOrder()}
                    onApprove={(data, actions) => onApprove(data, actions)}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPal;
