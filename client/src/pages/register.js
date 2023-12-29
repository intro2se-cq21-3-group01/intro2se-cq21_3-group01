import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Register from '../components/Register/Register';

const RegisterPage = () => {

    return (
        <>
            <Header />
            <div className="register-page">
                <div className="container">
                    <div className="row">
                        <Register />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default RegisterPage;