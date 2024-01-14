import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import { useAuth } from '../context/AuthContext';

const ChangePasswordPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuthenticated) {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <div className="change-password-page">
                <div className="container">
                    <div className="row">
                        <ChangePassword />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ChangePasswordPage;