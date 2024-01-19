import { useState } from 'react';
import { toast } from 'react-toastify';
import customAxios from '../../axios/customAxios';
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [reenteredPassword, setReenteredPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !reenteredPassword || !newPassword) {
            toast.error("Please fill in all fields!");
            return;
        }

        if (reenteredPassword !== newPassword) {
            toast.error("New password and re-entered password do not match!");
            return;
        }

        if (!isPasswordValid(newPassword)) {
            toast.error("Password must have at least 1 uppercase letter, 1 number, and be 8 characters long!");
            return;
        }

        try {
            const response = await customAxios.post('/api/auth/change-password', {
                currentPassword: currentPassword,
                newPassword: newPassword,
            });

            if (response && response.data && response.data.success) {
                toast.success(response.data.message);

                setCurrentPassword("");
                setReenteredPassword("");
                setNewPassword("");
            }
        } catch (error) {
            console.error('An error occurred:', error.response.data.message);
            toast.error('Failed to change password. Please try again.');
        }
    };

    return (
        <div className={styles['login-container']}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className={`${styles['login-content']} col-5`}>
                        <div className={styles['login-header']}>
                            <h4>Change Password</h4>
                            <p>Change password is so easy</p>
                        </div>
                        <div className={styles['login-form']}>
                            <input
                                type='password'
                                placeholder='Current password'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <br />
                            <input
                                type='password'
                                placeholder='New password'
                                value={reenteredPassword}
                                onChange={(e) => setReenteredPassword(e.target.value)}
                            />
                            <br />
                            <input
                                type='password'
                                placeholder='Re-enter new password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <br />
                            <button
                                className={styles['btn-next']}
                                onClick={handleChangePassword}
                            >
                                CHANGE PASSWORD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
