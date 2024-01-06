import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import OrderUser from '../components/OrderUser/OrderUser';

const OrderUserPage = () => {
    return (
        <div style={{ backgroundColor: '#EFEFEF' }}>
            <Header />
            <OrderUser />
            <Footer />
        </div>
    );
}

export default OrderUserPage;