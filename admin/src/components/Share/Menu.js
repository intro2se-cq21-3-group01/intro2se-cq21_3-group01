import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCartShopping, faChartLine, faHockeyPuck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth'

import styles from "./Menu.module.css";

function Menu() {
    const navigate = useNavigate();
    const { user, jwt } = useContext(AuthContext);
    //console.log("Menu", user.isAdmin);
    const menu = [
        {
            item: "Employee Management",
            link: "employee",
            permission: true,
            icon: faUser
        },
        {
            item: "Menu Management",
            permission: true,
            link: "product",
            icon: faBars
        },
        {
            item: "Order Management",
            permission: false,
            link: "order",
            icon: faCartShopping
        },
        {
            item: "Performance Anlysis",
            permission: true,
            link: "analysis",
            icon: faChartLine
        },
        {
            item: "Category Management",
            permission: false,
            link: "category",
            icon: faHockeyPuck
        },
        {
            item: "Coupon Management",
            permission: false,
            link: "coupon",
            icon: faDollarSign
        },
        // Add other menu items as needed
    ];
    useEffect(() => {
        if (jwt === null) {
            navigate("/");
        }
    }, [navigate, jwt]);
    return (
        <>
            {jwt && user ? (
                <div className={`col-3 ${styles.col3} ${styles.dashboard}`}>
                    {/* Tiêu đề của thanh menu */}
                    <h1 className={styles.title}>
                        Dashboard
                    </h1>

                    {/* Danh sách các mục trong thanh menu */}
                    <ul className={styles.ulEdit}>
                        {menu.map((item, index) => (
                            item.permission === user.isAdmin ? (
                                // Render một mục menu nếu có quyền truy cập (permission === true)
                                <NavLink to={"/" + item.link} className={`${styles.NavLinkEdit}`} key={index}>
                                    <li className={`${styles.titleItem}`} activeclassname={`${styles.active} active`}>
                                        <div className={`d-flex ${styles.itemDashboard}`}>
                                            <FontAwesomeIcon icon={item.icon} className={styles.icon} /> {item.item}
                                        </div>
                                    </li>
                                </NavLink>
                            ) : (
                                // Nếu không có quyền truy cập, render một phần tử div rỗng
                                <div key={index}></div>
                            )
                        ))}
                    </ul>
                </div>
            ) :
                (
                    null
                )
            }
        </>
    );
}

export default Menu;
