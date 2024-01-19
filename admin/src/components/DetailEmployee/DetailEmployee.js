import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './DetailEmployee.module.css';

const EmployeeDetail = (props) => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [dateStart, setDateStart] = useState("");
    const [dob, setDob] = useState("");
    useEffect(() => {
        const getEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/employee/${id}`);

                if (response.data.success) {
                    setEmployee(response.data.data);
                    const originalDate = response.data.data.dateStart;
                    const parsedDate = new Date(originalDate);
                    const formattedDate = parsedDate.toISOString().split('T')[0];
                    setDateStart(formattedDate);

                    const dateOfBirth = response.data.data.dob;
                    const dob = new Date(dateOfBirth);
                    const formatDob = dob.toISOString().split('T')[0];
                    setDob(formatDob);

                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        getEmployee();
    }, [id]);

    return (
        <>
            <div className={`col-9  ${styles.col9}`}>
                <div className={`${styles.rowTitle} mt-5 d-flex justify-content-end align-items-center`}>
                    <Link to="/employee">
                        <button className="btn btn-dark me-5">Back</button>
                    </Link>
                </div>
                <hr className={`my-3 ${styles.colorLine}`} />
                <div className="container d-flex align-items-center ms-5">
                    <div className="col-md-4 text-center">
                        <img src={employee.image} className={styles["avatar"]} alt="" />
                    </div>
                    <div className={`col-md-8 ${styles.infoEmploy}`}>
                        <h2 className="Name mb-4">{employee.fullname}</h2>
                        <label for="">Location</label>
                        <h3 className={styles['h3Edit']}>{employee.address}</h3>
                        <label for="">Date of Birth</label>
                        <h3 className={styles['h3Edit']}>{dob}</h3>
                        <label for="">Email</label>
                        <h3 className={styles['h3Edit']}>{employee.email}</h3>
                        <label for="">Phone</label>
                        <h3 className={styles['h3Edit']}>{employee.phone}</h3>
                        <label for="">Date Start</label>
                        <h3 className={styles['h3Edit']}>{dateStart}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeDetail;

