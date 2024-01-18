import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import styles from './ProfileUser.module.css';
import { toast } from "react-toastify";
import customAxios from "../../axios/customAxios";

const ProfileUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');

    const [isEdit, setIsEdit] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuthenticated) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await customAxios.get('/api/user', config);

            if (response.data.success) {
                setUsername(response.data.data.username);
                setEmail(response.data.data.email);
                setAddress(response.data.data.address);
                setGender(response.data.data.gender);
            }
        }

        if (user.isAuthenticated) {
            getUser();
        }
    }, [isEdit]);

    const handleEditProfile = () => {
        setIsEdit(!isEdit);
    }

    const handleSaveProfile = async () => {
        const newUser = {
            address: address,
            gender: gender
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };

        const response = await customAxios.post('/api/user/edit', newUser, config);

        if (response.data.success) {
            toast.success('Edit profile successfully !');
        }

        setIsEdit(!isEdit);
    }

    return (
        <>
            <div className="container mt-2">
                <h2 className={styles['profile-header']}>
                    {isEdit ? 'Edit Profile' : 'User Profile'}
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="text-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" className={styles.avatar} alt="avatar" />
                        </div>
                    </div>

                    <div className="col-md-6 personal-info">
                        <form className="form-horizontal" role="form">
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Username:</label>
                                <input className="form-control" type="text" value={username} disabled />
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Email:</label>
                                <input className="form-control" type="text" value={email} disabled />
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Address:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={!isEdit}
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Gender:</label>
                                <div className="ui-select">
                                    <select
                                        className="form-control"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        disabled={!isEdit}
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>
                        </form>

                        {isEdit ?
                            (
                                <button
                                    className={styles['btn-save']}
                                    onClick={handleSaveProfile}
                                >
                                    Save Profile
                                </button>
                            )

                            :
                            (<button
                                className={styles['btn-edit']}
                                onClick={handleEditProfile}
                            >
                                Edit Profile
                            </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUser;