import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Cart from '../components/Cart/Cart';

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