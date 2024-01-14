import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ForgotPassword from '../components/ForgotPassword/ForgorPassword';

const ForgotPasswordPage = () => {
    return (
        <>
            <Header />
            <div className="forgot-password-page">
                <div className="container">
                    <div className="row">
                        <ForgotPassword />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ForgotPasswordPage;