import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../axios/customAxios';
import { toast } from 'react-toastify';

import styles from './Register.module.css';
import registerImg from '../../assets/imgs/register.jpg';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            toast.error("Please enter email, username and password !");
            return;
        }

        const newUser = {
            email: email,
            username: username,
            password: password
        };

        const respone = await customAxios.post('/api/auth/register', newUser);

        if (respone && respone.data && respone.data.success) {
            toast.success(respone.data.message);
            navigate('/login');
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