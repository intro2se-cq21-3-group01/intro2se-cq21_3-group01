import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string'
import customAxios from "../../axios/customAxios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandPeace, faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import styles from './Coupon.module.css';

import Search from "../Share/Search";
import Pagination from "../Share/Pagination";
import { AuthContext } from '../context/auth'
const CouponList = (props) => {

    const [coupons, setCoupons] = useState([]);
    const [totalPage, setTotalPage] = useState("")

    const { user , logOut} = useContext(AuthContext);

    const navigate = useNavigate();

    const [filter, setFilter] = useState({
        page: '1',
        limit: '6',
        search: '',
        status: true,
    })
    
    
    const memoizedFilter = useMemo(() => filter, [filter]);

    useEffect(() => {
        const query = '?' + queryString.stringify(memoizedFilter);
        const getAllCoupons = async () => {

            try {
                if(user.isAdmin === true){
                    navigate("/")
                }
                const response = await customAxios.get(`/api/admin/coupon/${query}`);
                setCoupons(response.data.data);
                setTotalPage(response.data.totalPage)
                console.log("totalPage", response.data.totalPage);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getAllCoupons();
    }, [memoizedFilter, navigate, user]);


    const handleDeleteCoupon = async (coupon) => {
        try {

            const id = String(coupon._id);
            const response = await customAxios.get(`/api/admin/coupon/delete/${id}`);
            if (response.data.success) {
                toast.success("Delete successfully !");
                setFilter({
                    ...filter,
                    status: !filter.status
                })
            }
        } catch (error) {
            console.error("Error deleting employee:");
        }
    };

    const handlerSearch = (value) => {
        setFilter({
            ...filter,
            page: '1',
            search: value
        })
    }

    const onPageChange = (value) => {
        setFilter({
            ...filter,
            page: value
        })
    }

    return (
        <>
            <div className={`col-9  ${styles.col9}`}>
                <nav className={`navbar ${styles.navbarEdit}`}>
                    <div className="container d-flex">
                        <h2 className={`navbar-brand  ${styles.navbarBrand}`}>Hello,{user.fullname}<FontAwesomeIcon icon={faHandPeace} /></h2>
                        <div className="d-flex">
                            <button className="btn btn-dark me-5" onClick={() => { logOut() }}>Log out</button>
                        </div>
                    </div>
                </nav>
                <div className="d-flex mt-3 ms-5 justify-content-between">
                    <div className="">
                        <Link to="/coupon/add">
                            <button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} className={styles["icon"]} />Add Coupon</button>
                        </Link>
                    </div>
                    <Search handlerSearch={handlerSearch} />
                </div>
                <div className="d-flex mt-2 ms-5">
                    <table className={`table ${styles.tableEdit}`}>
                        <thead>
                            <tr>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Name</th>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Discount</th>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Quantity</th>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons?.map((coupon) => {
                                return (
                                    <tr key={coupon._id}>
                                        <td className={styles["tdEdit"]}>{coupon.code}</td>
                                        <td className={styles["tdEdit"]}>{coupon.discount}</td>
                                        <td className={styles["tdEdit"]}>{coupon.quantity}</td>
                                        <td><Link to={`/coupon/update/${coupon._id}`}><FontAwesomeIcon icon={faPen} className={styles["iconEdit"]} /></Link>
                                            <FontAwesomeIcon icon={faTrashCan} className={styles["icon"]} onClick={() => handleDeleteCoupon(coupon)} />
                                        </td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} />
            </div>
        </>
    );
}

export default CouponList;

