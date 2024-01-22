import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import customAxios from '../../axios/customAxios';
import Banner01 from '../../assets/imgs/Banner01.png'
import Banner02 from '../../assets/imgs/Banner02.png'

import { AuthContext } from '../context/auth';
import styles from './Login.module.css'
function Login(props) {

    const { addLocal, jwt, user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMsg, setValidationMsg] = useState('');

    const { handleSubmit } = useForm();
    const navigate = useNavigate();
    console.log(email);
    console.log(password);

    const validateAll = () => {
        let msg = {}
        if (!email) {
            msg.email = "Email không được để trống"
        }
        if (!password) {
            msg.password = "Password không được để trống"
        }
        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleLogin = () => {
        const isValid = validateAll();
        if (!isValid) return
        login();
    }

    const login = async () => {
        const user = {
            email: email,
            password: password
        }

        const response = await customAxios.post('/api/admin/employee/login', user, { withCredentials: true, });
        console.log(response.data);

        if (response.data.success) {
            console.log(response.data.user.fullname);
            if (response.data.user.isAdmin) {
                addLocal(response.data.jwt, response.data.user)
                //customAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
                console.log("Admin");
                navigate("/employee")
            }
            else {
                addLocal(response.data.jwt, response.data.user)
                navigate("/order")
                console.log("Nhân viên");
            }

        }
        else
            setValidationMsg({ api: response.data.message })
        console.log(response.data.message);
    }

    const handleLoginGoogle = () => {
        window.open('http://localhost:8000/api/auth/google', '_self')
    }
    
    useEffect(() => {
        if (jwt && user) {
            if (user.isAdmin) {
                navigate("/employee");
            } else {
                navigate("/order");
            }
        }
    }, [jwt, user, navigate]);
    return (
        <>
            <div className={`auth-wrapper d-flex no-block justify-content-center align-items-center position-relative ${styles['heightImg']}`}
                style={{ background: `url(${Banner01}) no-repeat center center` }}>
                <div className="auth-box row">
                    <div className="col-md-5 modal-bg-img">
                        <img src={Banner02} alt="img"></img>
                    </div>
                    <div className={`col-md-7 bg-white ${styles['heightForm']}`}>
                        <div className="p-3">
                            <h2 className="mt-3 text-center">Sign In</h2>

                            {
                                <p className="form-text text-danger">{validationMsg.api}</p>
                            }
                            <form className="mt-4" onSubmit={handleSubmit(handleLogin)}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="text-dark" htmlFor="uname">Email</label>
                                            <input className="form-control" name="email" type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <p className="form-text text-danger">{validationMsg.email}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="text-dark" htmlFor="pwd">Password</label>
                                            <input className="form-control" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                                            <p className="form-text text-danger">{validationMsg.password}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleLoginGoogle()}
                                    >
                                        Google
                                    </button>
                                    <div className="col-lg-12 text-center">
                                        <button type="submit" className="btn btn-block btn-dark">Sign In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;