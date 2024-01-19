import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandPeace, faArrowDownWideShort, faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';


import styles from './Employee.module.css';

import Search from "../Share/Search";
import Pagination from "../Share/Pagination";
import { AuthContext } from '../context/auth'
const EmployeeList = (props) => {

    const [employees, setEmployees] = useState([]);
    const { user , logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(employees);
    const [filter, setFilter] = useState({
        page: '1',
        limit: '8',
        search: '',
        status: true,
        sort: false,
    })
    const [totalPage, setTotalPage] = useState("")
    
    const memoizedFilter = useMemo(() => filter, [filter]);

    useEffect(() => {
        const query = '?' + queryString.stringify(memoizedFilter);
        console.log("search:", query);
        const getAllEmployees = async () => {

            try {
                const response = await axios.get(`http://localhost:8000/api/admin/employee/${query}`);
                setEmployees(response.data.data);
                setTotalPage(response.data.totalPage)
                console.log("totalPage", response.data.totalPage);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getAllEmployees();
    }, [memoizedFilter, navigate, user]);


    const handleDeleteEmployee = async (user) => {
        try {

            const id = String(user._id);
            console.log(user._id);
            const response = await axios.get(`http://localhost:8000/api/admin/employee/delete/${id}`);
            if (response.data.success) {
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

    const sortByName = () => {
        setFilter({
            ...filter,
            sort: !filter.sort,
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
                            <img className={styles["avaNow"]} src="./Img/avatarTitle.jpg" alt="" />
                        </div>
                    </div>
                </nav>
                <div className="d-flex mt-3 ms-5 justify-content-between">
                    <div className="">
                        <button type="button" className="btn btn-light" onClick={sortByName}><FontAwesomeIcon icon={faArrowDownWideShort} className={styles["icon"]} />Filters</button>
                        <Link to="/employee/add">
                            <button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} className={styles["icon"]} />Add Employee</button>
                        </Link>
                    </div>
                    <Search handlerSearch={handlerSearch} />
                </div>
                <div className="d-flex mt-2 ms-5">
                    <table className={`table ${styles.tableEdit}`}>
                        <thead>
                            <tr>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Name</th>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Email</th>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Phone</th>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.map((user) => {
                                return (
                                    <tr key={user._id}>
                                        <td className={styles["tdEdit"]}><Link className={styles["linkEdit"]} to={`/employee/${user._id}`}>{user.fullname}</Link></td>
                                        <td className={styles["tdEdit"]}>{user.email}</td>
                                        <td className={styles["tdEdit"]}>{user.phone}</td>
                                        <td><Link to={`/employee/update/${user._id}`}><FontAwesomeIcon icon={faPen} className={styles["iconEdit"]} /></Link>
                                            <FontAwesomeIcon icon={faTrashCan} className={styles["icon"]} onClick={() => handleDeleteEmployee(user)} />
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

export default EmployeeList;

