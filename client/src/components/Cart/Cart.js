import { useMemo } from 'react';

import styles from './Cart.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const subTotal = useMemo(() => {
        let total = 0;
        cartItems.forEach((cartItem) => {
            total += cartItem.quantity * cartItem.product.price;
        });

        return total;
    }, [cartItems]);

    return (
        cartItems?.length > 0 ? (
            <section className="h-100">
                <div className="container h-100 py-5">
                    <div className="row">
                        <div className="col-8">
                            {cartItems?.map(((cartItem, index) => (
                                <div className="card rounded-3 mb-4" key={index}>
                                    <div className="card-body p-4">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-2">
                                                <img
                                                    src={cartItem.product.imgUrl}
                                                    className={`${styles['product-img']} rounded-2`}
                                                    alt={cartItem.product.name}
                                                />
                                            </div>
                                            <div className="col-3 ms-4">
                                                <p className="lead fw-semibold mb-2">{cartItem.product.name}</p>
                                            </div>
                                            <div className="col-2 d-flex">
                                                <button
                                                    className="btn btn-link px-2"
                                                    onClick={() => updateQuantity(cartItem.product._id, -1)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>

                                                <input min="0" name="quantity" value={cartItem.quantity} type="number"
                                                    className="form-control form-control-sm" readOnly />

                                                <button
                                                    className="btn btn-link px-2"
                                                    onClick={() => updateQuantity(cartItem.product._id, 1)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                            <div className="col-2 offset-lg-1">
                                                <h5 className="mb-0">$ {cartItem.product.price}</h5>
                                            </div>
                                            <div className="col-1 text-center">
                                                <button className="text-danger" style={{ border: 'none' }}
                                                    onClick={() => removeFromCart(index)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                        <div className='col-4'>
                            <div className={styles['checkout-container']}>
                                <h3 className="fw-bold mb-5">Summary</h3>
                                <hr className="my-4" />

                                <div className="d-flex justify-content-between mb-3">
                                    <h5 className="text-uppercase">Subtotal</h5>
                                    <h5>$ {subTotal.toFixed(2)}</h5>
                                </div>

                                <h5 className="text-uppercase mb-1">Coupon codes</h5>

                                <div className="mb-5">
                                    <div className="form-outline">
                                        <input type="text" className="form-control form-control-lg"
                                            placeholder='Enter your coupon'
                                        />
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-between mb-3">
                                    <h5 className="text-uppercase">All Discounts</h5>
                                    <h5>$ 0</h5>
                                </div>

                                <div className="d-flex justify-content-between mb-5">
                                    <h5 className="text-uppercase">Grand total</h5>
                                    <h5>$ {subTotal.toFixed(2)}</h5>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-dark btn-block btn-lg w-100"
                                    data-mdb-ripple-color="dark"
                                    onClick={() => { navigate("/checkout") }}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ) : (
            <>
                <div style={{
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <h3
                        className='mt-3 text-uppercase'
                        style={{
                            textAlign: 'center',
                            fontSize: '30px',
                            fontWeight: '1000',
                        }}
                    >
                        Your cart is empty
                    </h3>
                </div>
            </>
        )
    );
}

export default Cart;
