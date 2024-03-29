import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import customAxios from '../../axios/customAxios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import styles from './ProductDetail.module.css';
import { useCart } from '../../context/CartContext';

const ProductDetail = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    const { addToCart } = useCart();

    useEffect(() => {
        const getProduct = async () => {
            const response = await customAxios.get(`/api/product/${id}`);

            if (response.data.success)
                setProduct(response.data.data);
        };

        getProduct();
    }, [id]);

    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            quantity: count,
            product: product
        });

        toast.success('Add to cart successfully !');
    }

    return (
        <div className={styles['product-container']}>
            <div className="container">
                <div className='row'>
                    <div className={styles['product-header']}>
                        <h3>Product Detail</h3>
                    </div>
                </div>
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
                            <button
                                onClick={handleAddToCart}
                                disabled={product.quantity === 0}
                            >
                                {product.quantity === 0 ? "Out of stock" : " Add to cart"}
                            </button>
                        </div>
                        <div className={styles['product-buy']}>
                            <button
                                disabled={product.quantity === 0}
                            >
                                Buy now
                            </button>
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
