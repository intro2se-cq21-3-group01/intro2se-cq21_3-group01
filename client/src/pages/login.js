import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const LoginPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAuthenticated) {
            navigate('/product');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Header />
            <div className="register-page">
                <div className="container">
                    <div className="row">
                        <Login />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginPage;