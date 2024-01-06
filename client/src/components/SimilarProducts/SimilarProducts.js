import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import customAxios from '../../axios/customAxios';


import styles from './SimilarProducts.module.css'

const SimilarProducts = () => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getSimilarProducts = async () => {
            const response = await customAxios.get(`/api/product/similar/${id}`);

            if (response.data.success) {
                setSimilarProducts(response.data.data);
            }
        }

        getSimilarProducts();
    }, [id]);

    return (
        <div className={styles['similar-container']}>
            <div className='container'>
                <div className='row'>
                    <div className={styles['similar-header']}>
                        <h3>Similar Products</h3>
                    </div>
                </div>

                <div className='row'>
                    <div className={styles['similar-content']}>
                        <div className='row'>
                            {
                                similarProducts && similarProducts.map((product, index) => (
                                    <div className='col-4' key={index}>
                                        <div className={styles['similar-product']}>
                                            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>

                                                <img className={styles['product-img']} src={product.imgUrl} alt='' />
                                                <h5 className={styles['product-name']}>
                                                    {product.name}
                                                </h5>
                                            </Link>
                                            <p className={styles['product-price']}>
                                                $ {product.price}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className={styles['similar-view-all-product']}>
                        <Link className={styles['similar-product-btn']} to="/product">
                            View all products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SimilarProducts;