import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import SimilarProducts from '../components/SimilarProducts/SimilarProducts';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const ProductPage = () => {
    const { id } = useParams();

    useEffect(() => window.scrollTo(0, 0), [id]);

    return (
        <>
            <Header />
            <div className="product-page">
                <div className="container">
                    <div className="row">
                        <ProductDetail />
                    </div>
                    <div className='row'>
                        <SimilarProducts />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductPage;