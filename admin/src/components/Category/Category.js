import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import customAxios from "../../axios/customAxios";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandPeace, faPlus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import styles from './Category.module.css';

import { AuthContext } from '../context/auth'

const CategoryList = (props) => {

    const [categories, setCategories] = useState([]);
    const { user , logOut} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        const getAllCategories = async () => {

            try {
                if(user.isAdmin === true){
                    navigate("/")
                }
                const response = await customAxios.get('/api/category/');
                setCategories(response.data.data);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getAllCategories();
    }, [navigate, user]);


    const handleDeleteCategory = async (category) => {
        try {

            const id = String(category._id);
            const response = await customAxios.get(`/api/category/delete/${id}`);
            if (response.data.success) {
                toast.success("Delete successfully !");
                const updatedCategories = categories.filter(cat => cat._id !== category._id);
                setCategories(updatedCategories);
            }
        } catch (error) {
            console.error("Error deleting employee:");
        }
    };


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
                        <Link to="/category/add">
                            <button className="btn btn-primary"><FontAwesomeIcon icon={faPlus} className={styles["icon"]} />Add Category</button>
                        </Link>
                    </div>
                </div>
                <div className="d-flex mt-2 ms-5">
                    <table className={`table ${styles.tableEdit}`}>
                        <thead>
                            <tr>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Name</th>
                                <th className={`table-secondary ${styles.textShadow}`} scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category) => {
                                return (
                                    <tr key={category._id}>
                                        <td className={styles["tdEdit"]}>{category.name}</td>
                                        <td><Link to={`/category/update/${category._id}`}><FontAwesomeIcon icon={faPen} className={styles["iconEdit"]} /></Link>
                                            <FontAwesomeIcon icon={faTrashCan} className={styles["icon"]} onClick={() => handleDeleteCategory(category)} />
                                        </td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {/* <Pagination filter={filter} onPageChange={onPageChange} totalPage={totalPage} /> */}
            </div>
        </>
    );
}

export default CategoryList;

