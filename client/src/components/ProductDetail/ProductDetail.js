import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductDetail.module.css';

const ProductDetail = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const getProduct = async () => {
            const response = await axios.get(`http://localhost:8000/api/product/${id}`);
            setProduct(response.data.data);
        };

        getProduct();
        // eslint-disable-next-line
    }, []);

    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className={styles['product-container']}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img className={styles['product-img']} src={product.imgUrl} alt="" />
                    </div>
                    <div className="col-6">
                        <div className={styles['product-name']}>{product.name}</div>
                        <div className={styles['product-price']}>$ {product.price}</div>
                        <div className={styles['product-count']}>
                            <FontAwesomeIcon icon={faMinus}
                                className={styles['add-icon']}
                                onClick={handleDecrement}
                            />
                            <p>{count}</p>
                            <FontAwesomeIcon icon={faPlus}
                                className={styles['sub-icon']}
                                onClick={handleIncrement}
                            />
                        </div>
                        <div className={styles['product-add-cart']}>
                            <button>Add to cart</button>
                        </div>
                        <div className={styles['product-buy']}>
                            <button>Buy now</button>
                        </div>
                        <div className={styles['product-des']}>
                            <h4>Description</h4>
                            <p> {product.description} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
