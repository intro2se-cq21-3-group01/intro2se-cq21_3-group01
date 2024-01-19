import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string'
import customAxios from "../../axios/customAxios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPeace, faArrowDownWideShort, faPlus, faPen, faTrashCan} from '@fortawesome/free-solid-svg-icons';

import styles from './menu.module.css';

import Search from "../Share/Search";
import Pagination from "../Share/Pagination";
import { AuthContext } from '../context/auth';
import { toast } from 'react-toastify';
const MenuEmployee = (props) => {
    const [products, setProducts] = useState([]);
    const [totalCategories, setTotalCategories] = useState('');
    const [totalProducts, setTotalProducts] = useState('');
    const [totalSoldOut, setTotalSoldOut] = useState('');
    const [totalAmount, setTotalAmount] = useState('');

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        page: '1',
        limit: '6',
        search: '',
        status: true,
        sort: false,
    });

    const [totalPage, setTotalPage] = useState("");

    const memoizedFilter = useMemo(() => filter, [filter]);

    useEffect(() => {
        const query = '?' + queryString.stringify(memoizedFilter);
        const getAllEmployees = async () => {
            if(user.isAdmin !== true){
                navigate("/")
            }
            try {
                const response = await customAxios.get(`/api/admin/product/${query}`);
                setProducts(response.data.data);
                setTotalPage(response.data.totalPage);
                setTotalCategories(response.data.totalCategories);
                setTotalProducts(response.data.totalProducts);
                setTotalSoldOut(response.data.totalSoldOut);
                setTotalAmount(response.data.totalAmount);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getAllEmployees();
    }, [memoizedFilter, navigate, user]);
    const handleDeleteProduct = async (user) => {
        try {
            const id = String(user._id);
            const response = await customAxios.get(`/api/admin/product/delete/${id}`);
            if (response.data.success) {
                toast.success("Delete successfully !");
                setFilter({
                    ...filter,
                    status: !filter.status
                });
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handlerSearch = (value) => {
        setFilter({
            ...filter,
            page: '1',
            search: value
        });
    }

    const onPageChange = (value) => {
        setFilter({
            ...filter,
            page: value
        });
    }

    const sortByName = () => {
        setFilter({
            ...filter,
            sort: !filter.sort,
        });
    }
    console.log(totalPage);
    return (
        <>
            <div className={`col-9  ${styles.col9}`} style={{ backgroundColor: '#f5f6f8', padding: '0px' }}>
                <nav className="navbar" style={{ backgroundColor: '#fff', height: '70px' }}>
                    <div className="container d-flex">
                        <h2 className={`navbar-brand  ${styles.navbarBrand}`}>Hello, {user.fullname}<FontAwesomeIcon icon={faHandPeace} /></h2>
                        <div className="d-flex">
                            <button className="btn btn-dark me-5" onClick={() => { logOut() }}>Log out</button>
                        </div>
                    </div>
                </nav>
                <div className={`d-flex ${styles['nav-infor']} mt-3 ms-5 me-5`}>
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <div className={styles["InforTitle"]}>
                            <h3 className={styles["fontNumber"]}>{totalCategories}</h3>
                            <h3 className={styles["fontcate"]}>Type</h3>
                        </div>
                        <div className="d-flex">
                            <span className={styles["line"]}></span>
                        </div>
                    </div>
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <div className={styles["InforTitle"]}>
                            <h3 className={styles["fontNumber"]}>{totalProducts}</h3>
                            <h3 className={styles["fontcate"]}>In Stock</h3>
                        </div>
                        <div className="d-flex">
                            <span className={styles["line"]}></span>
                        </div>
                    </div>
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <div className={styles["InforTitle"]}>
                            <h3 className={styles["fontNumber"]}>{totalSoldOut}</h3>
                            <h3 className={styles["fontcate"]}>Sold out</h3>
                        </div>
                        <div className="d-flex">
                            <span className={styles["line"]}></span>
                        </div>

                    </div>
                    <div className="col-3">
                        <h3 className={styles["fontNumber"]}>{totalAmount}$</h3>
                        <h3 className={styles["fontcate"]}>Total Earned</h3>
                    </div>

                </div>

                <div className="d-flex mt-3 ms-5 me-5 justify-content-between">
                    <div className="">
                        <button type="button" className="btn btn-sm btn-light" onClick={sortByName}><FontAwesomeIcon icon={faArrowDownWideShort} className="iconFilter" />Filters</button>
                        <Link to="/product/add">
                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPlus} className="iconFilter" />Add Product</button>
                        </Link>

                    </div>
                    <Search handlerSearch={handlerSearch} />
                </div>
                <div className="d-flex mt-2 ms-5 me-5">
                    <table className={`table ${styles.table}`}>
                        <thead>
                            <tr>
                                <th className="table-secondary textShadow" scope="col">Name</th>
                                <th className="table-secondary textShadow" scope="col">Type</th>
                                <th className="table-secondary textShadow" scope="col">Price</th>
                                <th className="table-secondary textShadow" scope="col">Quantity</th>
                                <th className="table-secondary textShadow" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product) => {
                                return (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.categories[0]}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td> <Link to={`/product/update/${product._id}`}><FontAwesomeIcon icon={faPen} className={styles["iconEdit"]} /></Link>
                                            <FontAwesomeIcon icon={faTrashCan} className={styles["icon"]} onClick={() => handleDeleteProduct(product)}/>
                                        </td>
                                    </tr>
                                )
                                }
                                )}
                           
                        </tbody>
                    </table>
                </div>
                <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} />
            </div>
        </>
    );
}

export default MenuEmployee;
