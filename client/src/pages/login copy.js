import { useNavigate } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cart from '../components/Cart/Cart';

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const CartPage = () => {

    return (
        <>
            <Header />
            <div className="register-page">
                <div className="container">
                    <div className="row">
                        <Cart />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CartPage;