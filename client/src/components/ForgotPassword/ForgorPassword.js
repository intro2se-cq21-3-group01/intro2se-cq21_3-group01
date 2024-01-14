import { useState } from 'react';
import { toast } from 'react-toastify';

import customAxios from '../../axios/customAxios';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Please enter email !");
            return;
        }


        const respone = await customAxios.post('/api/auth/forgot-password', {
            email: email
        });

        if (respone && respone.data && respone.data.success) {
            toast.success(respone.data.message);
            setEmail("");
        }
    }

    return (
        <div className={styles['login-container']}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className={`${styles['login-content']} col-5`}>
                        <div className={styles['login-header']}>
                            <h4>
                                Forgot Password
                            </h4>
                            <p>
                                Please enter an email to reset password
                            </p>
                        </div>
                        <div className={styles['login-form']}>
                            <input
                                type='text'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <br />
                            <button
                                className={styles['btn-next']}
                                onClick={handleForgotPassword}
                            >
                                RESET PASSWORD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;