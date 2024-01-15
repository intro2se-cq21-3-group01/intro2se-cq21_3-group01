import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Checkout from '../components/Checkout/Checkout';

const CheckoutPage = () => {
    return (
        <>
            <Header />
            <div className="register-page">
                <div className="container">
                    <div className="row">
                        <Checkout />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CheckoutPage;