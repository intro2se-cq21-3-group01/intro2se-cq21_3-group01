import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

import PayPal from '../Paypal/Paypal';
import customAxios from '../../axios/customAxios';

import styles from './Checkout.module.css'

const Checkout = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const { cartItems, discountCode, discount,
        setDiscount, setDiscountCode,
        grandTotalPrice, clearCart } = useCart();
    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuthenticated) {
            toast.warning("Please sign in before checkout !");
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/product');
        }
        // eslint-disable-next-line
    }, []);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.id);
    };

    const handlePayByCash = async (e) => {
        if (!name || !phone || !address) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const newOrder = {
            name: name,
            phone: phone,
            address: address,
            paymentMethod: paymentMethod,
            items: cartItems,
            totalPrice: grandTotalPrice,
            note: note,
            discountCode: discountCode
        }

        const headers = {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${user.token}`,
        };

        const response = await customAxios.post(`/api/orders/`, newOrder, { headers })

        if (response.data.success) {
            clearCart();
            setDiscount(0);
            setDiscountCode("");

            toast.success("Purchase successfully !!!");
            navigate('/product');
        }
    }

    return (
        <div className="container">
            <main>
                <div className="py-5 text-center">
                    <h2 style={{ fontWeight: '1200' }}>CHECKOUT FORM</h2>
                </div>

                <div className="row g-5 d-flex justify-space-around">
                    <div className={`col-md-5 col-lg-4 order-md-last`}>
                        <div className={styles['colorBR1']}>
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span style={{ color: '#222222' }}>Your cart</span>
                                <span className="badge rounded-pill" style={{ background: '#222222' }}>{cartItems.length}</span>
                            </h4>
                            <ul className="list-group mb-3">
                                {cartItems && cartItems.map((cartItem, index) => (
                                    <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                                        <div>
                                            <div className={styles['nameProduct']}>{cartItem.quantity} - {cartItem.product.name}</div>
                                        </div>
                                        <span className="text-body-secondary">${cartItem.product.price * cartItem.quantity}</span>
                                    </li>
                                ))}
                                <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                                    <div className="text-success">
                                        <div className={styles['nameProduct']}>Coupon code : {discountCode || "Empty"}</div>
                                    </div>
                                    <span className="text-success">− $ {discount}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span className={styles['summaryTotal']}>Total (USD)</span>
                                    <p className={styles['valueSummaryTotal']}>${grandTotalPrice}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`col-md-6 col-lg-7 ${styles.colorBR}`}>
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation">
                            <div className="row g-3">
                                <div className="col-6">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder='Nguyen Van A'
                                    />
                                </div>

                                <div className="col-6">
                                    <label htmlFor="phone" className="form-label">Phone number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder='0123456789'
                                    />
                                </div>

                                <div className="col-6">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="1234 Main St"
                                        required
                                    />
                                </div>

                                <div className="col-6">
                                    <label htmlFor="note" className="form-label">Note</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Bla bla"
                                    />
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Payment</h4>

                            <div className="my-3">
                                <div className="form-check">
                                    <input
                                        id="cash"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        checked={paymentMethod === 'cash'}
                                        onChange={handlePaymentChange}
                                    />
                                    <label className="form-check-label" htmlFor="cash">
                                        Cash
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        id="paypal"
                                        name="paymentMethod"
                                        type="radio"
                                        className="form-check-input"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={handlePaymentChange}
                                    />
                                    <label className="form-check-label" htmlFor="paypal">
                                        PayPal
                                    </label>
                                </div>
                            </div>

                            <hr className="my-4" />

                            {
                                paymentMethod === 'cash' ?
                                    (<button
                                        type='submit'
                                        className="w-100 btn btn-primary btn-lg mb-2"
                                        onClick={handlePayByCash}
                                        style={{ background: '#222222', border: 'none' }}
                                    >
                                        NEXT
                                    </button>
                                    )
                                    :
                                    (
                                        <PayPal
                                            handlePayByCash={handlePayByCash}
                                        />
                                    )
                            }
                        </form>
                    </div>
                </div>
            </main>
        </div>

    );
}

export default Checkout;