import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductDetail from '../components/ProductDetail/ProductDetail';

const ProductPage = () => {

    return (
        <>
            <Header />
            <div className="product-page">
                <div className="container">
                    <div className="row">
                        <ProductDetail />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductPage;