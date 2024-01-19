import React from 'react';
import { Link } from "react-router-dom";

import styles from './ProductItem.module.css'
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const ProductItem = (props) => {
    const { _id, imgUrl, name, price, quantity } = props.product;

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            quantity: 1,
            product: props.product
        });

        toast.success('Add to cart successfully !');
    }
    return (
        <div className={` ${styles['product-item']} card`}>
            <Link to={`/product/${_id}`}>
                <img src={imgUrl} className="card-img-top" alt="Product" />
            </Link>
            {/* <FontAwesomeIcon icon={faHeart} className={styles['product-item-heart']} /> */}
            <div className="card-body">
                <div className="card-title">
                    <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
                        <h6 className={styles['product-item-name']}>{name}</h6>
                    </Link>
                    <h6 className={styles['product-item-price']}>$ {price}</h6>
                </div>
                <div className={styles['product-item-stars']}>
                    {/* {[...Array(stars)].map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} className={styles['star-icon']} />
                    ))} */}
                </div>
                <button
                    className={` ${styles['product-item-btn']} btn btn-primary`}
                    onClick={handleAddToCart}
                    disabled={quantity === 0}
                >
                    {quantity === 0 ? "Out of stock" : " Add to cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
