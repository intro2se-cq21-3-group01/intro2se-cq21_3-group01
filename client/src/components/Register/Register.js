import { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';

import styles from './Register.module.css';
import registerImg from '../../assets/imgs/register.jpg';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            username: username,
            password: password
        };

        const respone = await axios.post('http://localhost:8000/api/auth/register', newUser);

        if (respone.data.success) {
            toast.success(respone.data.message);
        }
    }

    return (
        <div className={styles['register-container']}>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className={styles['register-header']}>
                            <h4>
                                Register
                            </h4>
                            <p>
                                Enter your account information
                            </p>
                        </div>
                        <div className={styles['register-form']}>
                            <input
                                type='text'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
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
                            <button className={styles['btn-next']} onClick={handleRegister}>NEXT</button>

                            <p className={styles['register-other']}><b>Login</b> with Others</p>

                            <button className={styles['btn-google']}>
                                <FontAwesomeIcon icon={faGoogle} className='me-2' />
                                Login in with <b>Google</b>
                            </button>
                            <button className={styles['btn-facebook']}>
                                <FontAwesomeIcon icon={faFacebook} className='me-2' />
                                Login in with <b>Facebook</b>
                            </button>

                            <p> Already have an account?
                                <a className={styles['register']} href='/login'>Sign in</a>
                            </p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <img src={registerImg} className={styles['register-img']} alt='register-img' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;