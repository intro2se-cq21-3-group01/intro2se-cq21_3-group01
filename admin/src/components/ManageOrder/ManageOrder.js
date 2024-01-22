import { useEffect, useState, useContext } from "react";
import ReactPaginate from 'react-paginate';
import styles from "./MangeOrder.module.css";
import customAxios from "../../axios/customAxios";
import { useNavigate } from 'react-router-dom';
import { faPenToSquare, faTrash, faFloppyDisk, faBan, faHandPeace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import { AuthContext } from '../context/auth'
const ManageOrder = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const [isEditing, setIsEditing] = useState(false);
    const [editedOrder, setEditedOrder] = useState({});
    const { user, jwt , logOut } = useContext(AuthContext);

    const navigate = useNavigate();
    
    const getOrders = async () => {
        const response = await customAxios.get(
            `/api/orders/filter/?page=${currentPage}&limit=${currentLimit}&filter=${filter}&searchQuery=${searchQuery}`
        );

        if (response && response.data && response.data.success) {
            setOrders(response.data.data);
            setTotalPages(response.data.totalPages);
        }
    }

    useEffect(() => {
        if(user.isAdmin === true){
            navigate("/")
        }
        getOrders();

    }, [filter, currentPage, searchQuery, jwt, navigate, user]);

    const handleChangeStatus = async (e, order) => {
        const response = await customAxios.put(`/api/orders/change-status`,
            {
                orderId: order._id,
                newStatus: e.target.value
            }
        );

        if (response && response.data && response.data.success) {
            toast.success(response.data.message);
        }

        getOrders();
    }

    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1);
    };

    const handleDeleteOrder = async (order) => {
        const response = await customAxios.delete(`/api/orders/${order._id}`);

        if (response && response.data && response.data.success) {
            toast.success(response.data.message);
        }

        getOrders();
    }

    const handleEditOrder = (order) => {
        setIsEditing(!isEditing);
        setEditedOrder(order);
    }

    const handleSaveEdit = async (order) => {
        const response = await customAxios.put(`/api/orders/update/${order._id}`, {
            name: editedOrder.name,
            phone: editedOrder.phone,
            address: editedOrder.address
        });

        if (response && response.data && response.data.success) {
            toast.success(response.data.message);
            getOrders();
            setIsEditing(!isEditing);
        }
    }

    return (
        <>

            <div className={`col-9  ${styles.col9}`}>
                <nav className={`navbar ${styles.navbarEdit}`}>
                    <div className="container d-flex">
                        <h2 className={`navbar-brand  ${styles.navbarBrand}`}>Hello,{user.username}<FontAwesomeIcon icon={faHandPeace} /></h2>
                        <div className="d-flex">
                            <button className="btn btn-dark me-5" onClick={() => { logOut() }}>Log out</button>
                        </div>
                    </div>
                </nav>

                <div className={styles['order-container']} >
                    <div className="container mt-3">
                        <h2 className={styles['order-header']}>Manage Order</h2>
                        <div className="row">
                            <div className="col-3">
                                <select
                                    className={styles['filter']}
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="ALL">All</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="PROCESSING">Processing</option>
                                    <option value="SHIPPING">Shipping</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={styles['input-search']}
                                    placeholder="Search order ..."
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <div className="col-12">
                                <table className="table table-bordered border-dark-subtle table-hover">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope="col">Number</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Method</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {orders && orders.map((order, index) => (
                                            <tr key={index}>
                                                <th>{(currentPage - 1) * currentLimit + index + 1}</th>
                                                <td>
                                                    {isEditing && order._id === editedOrder._id ? (
                                                        <input
                                                            className={styles['edit-input']}
                                                            value={editedOrder.name}
                                                            onChange={(e) => setEditedOrder({ ...editedOrder, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <span>{order.name}</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {isEditing && order._id === editedOrder._id ? (
                                                        <input
                                                            className={styles['edit-input']}
                                                            value={editedOrder.phone}
                                                            onChange={(e) => setEditedOrder({ ...editedOrder, phone: e.target.value })}
                                                        />
                                                    ) : (
                                                        <span>{order.phone}</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {order.items.map((item, itemIndex) => (
                                                        <div key={itemIndex}>
                                                            {item.quantity} - {item.product.name}
                                                            <br />
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>$ {order.totalPrice}</td>
                                                <td>
                                                    {isEditing && order._id === editedOrder._id ? (
                                                        <input
                                                            className={styles['edit-input']}
                                                            value={editedOrder.address}
                                                            onChange={(e) => setEditedOrder({ ...editedOrder, address: e.target.value })}
                                                        />
                                                    ) : (
                                                        <span>{order.address}</span>
                                                    )}
                                                </td>
                                                <td className={styles[`${order.status}`]}>
                                                    <select
                                                        value={order.status}
                                                        onChange={
                                                            (e) => handleChangeStatus(e, order)
                                                        }
                                                    >
                                                        <option value="PENDING">Pending</option>
                                                        <option value="PROCESSING">Processing</option>
                                                        <option value="SHIPPING">Shipping</option>
                                                        <option value="COMPLETED">Completed</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className='text-capitalize'>{order.paymentMethod}</td>
                                                <td>{order.date}</td>
                                                <td>
                                                    {isEditing && order._id === editedOrder._id ? (
                                                        <>
                                                            <FontAwesomeIcon
                                                                icon={faFloppyDisk}
                                                                className={styles['save-icon']}
                                                                onClick={() => handleSaveEdit(order)}
                                                            />
                                                            <FontAwesomeIcon icon={faBan}
                                                                className={styles['cancel-icon']}
                                                                onClick={() => setIsEditing(false)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FontAwesomeIcon
                                                                icon={faPenToSquare}
                                                                className={styles['edit-icon']}
                                                                onClick={() => handleEditOrder(order)}
                                                            />
                                                            <FontAwesomeIcon icon={faTrash}
                                                                className={styles['delete-icon']}
                                                                onClick={() => handleDeleteOrder(order)}
                                                            />
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row mt-2 justify-content-center">
                            <div className="col-6">
                                <div className="product-pagination d-flex justify-content-center">
                                    {orders.length > 0 &&
                                        <ReactPaginate
                                            nextLabel=">"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={3}
                                            marginPagesDisplayed={2}
                                            pageCount={totalPages}
                                            previousLabel="<"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            containerClassName="pagination"
                                            activeClassName="active"
                                            renderOnZeroPageCount={null}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>

        </>
    );
}

export default ManageOrder;