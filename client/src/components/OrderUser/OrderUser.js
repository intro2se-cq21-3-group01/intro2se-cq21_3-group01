import { useState, useEffect } from 'react';
import customAxios from '../../axios/customAxios';


import styles from './OrderUser.module.css';
import { useAuth } from '../../context/AuthContext';

const OrderUser = () => {
    const [orders, setOrders] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        const getOrders = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await customAxios.get('/api/orders', config);

            if (response.data.success) {
                setOrders(response.data.data);
            }
        }

        if (user.isAuthenticated) {
            getOrders();
        }

        // eslint-disable-next-line 
    }, []);

    return (
        <>
            {orders.length > 0 ? (
                <div className={styles['order-container']} >
                    <div className="container mt-3">
                        <h2 className={styles['order-header']}>Order History</h2>

                        <div className="row justify-content-center">
                            <div className="col-10">
                                <table className="table table-bordered border-dark-subtle table-hover">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope="col">Number</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Note</th>
                                            <th scope="col">Method</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {orders && orders.map((order, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    {order.items.map((item, itemIndex) => (
                                                        <>
                                                            {item.quantity} - {item.product.name}
                                                            <br />
                                                        </>
                                                    ))}
                                                </td>
                                                <td>$ {order.totalPrice}</td>
                                                <td>{order.note || "Empty"}</td>
                                                <td className='text-capitalize'>{order.paymentMethod}</td>
                                                <td>{order.status}</td>
                                                <td>{order.address}</td>
                                                <td>{order.date}</td>
                                                <td>
                                                    <button
                                                        disabled={order.status !== 'PENDING' && order.status !== 'PROCESSING'}
                                                        className={styles['btn-cancel']}
                                                    >Cancel</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            ) : (
                // Nội dung khi không có đơn hàng
                <h2 className={styles['order-header']}>Your Order History Is Empty</h2>
            )}
        </>
    );
}

export default OrderUser;