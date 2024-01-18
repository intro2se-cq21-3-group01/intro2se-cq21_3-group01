import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customAxios from '../../axios/customAxios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';
import loginImg from '../../assets/imgs/login.jpg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            toast.error("Please enter both username and password !");
            return;
        }

        const user = {
            username: username,
            password: password
        }

        const respone = await customAxios.post('/api/auth/login', user);

        if (respone && respone.data && respone.data.success) {
            const userData = {
                username: respone.data.data.username,
                isAuthenticated: true,
                token: respone.data.data.accessToken
            };

            localStorage.setItem('accessToken', userData.token);
            login(userData);

            toast.success(respone.data.message);
            navigate('/product');
        }
    }

    return (
        <div className={styles['login-container']}>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className={styles['login-header']}>
                            <h4>
                                Welcome
                            </h4>
                            <p>
                                We are glad to see you back with us
                            </p>
                        </div>
                        <div className={styles['login-form']}>
                            <input
                                type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                            />
                            <input
                                type='password'
                                placeholder='Pasword'
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            
                            <div className={styles['forgotPassword']}>
                                <div></div>
                                <Link className={styles['forgot-password']} to='/user/forgot-password'>Forgot password?</Link>
                            </div>
                            <button className={styles['btn-next']} onClick={handleLogin}>NEXT</button>

                            <p className={styles['login-other']}><b>Login</b> with Others</p>

                            <button className={styles['btn-google']}>
                                <FontAwesomeIcon icon={faGoogle} className='me-2' />
                                Login in with <b>Google</b>
                            </button>
                            <button className={styles['btn-facebook']}>
                                <FontAwesomeIcon icon={faFacebook} className='me-2' />
                                Login in with <b>Facebook</b>
                            </button>

                            <p>Don't have an account yet?
                                <a className={styles['register']} href='/register'>Register</a>
                            </p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <img src={loginImg} className={styles['login-img']} alt='login-img' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;