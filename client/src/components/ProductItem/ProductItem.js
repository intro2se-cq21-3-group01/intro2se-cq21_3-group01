import React from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './ProductItem.module.css'

const ProductItem = (props) => {
    const { _id, imgUrl, name, price } = props.product;
    const stars = 5;

    return (
        <div className={` ${styles['product-item']} card`}>
            <Link to={`/product/${_id}`}>
                <img src={imgUrl} className="card-img-top" alt="Product" />
            </Link>
            <FontAwesomeIcon icon={faHeart} className={styles['product-item-heart']} />
            <div className="card-body">
                <div className="card-title">
                    <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
                        <h6 className={styles['product-item-name']}>{name}</h6>
                    </Link>
                    <h6 className={styles['product-item-price']}>$ {price}</h6>
                </div>
                <div className={styles['product-item-stars']}>
                    {[...Array(stars)].map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} className={styles['star-icon']} />
                    ))}
                </div>
                <a href="/" className={` ${styles['product-item-btn']} btn btn-primary`}>
                    Add to cart
                </a>
            </div>
        </div>
    );
};

export default ProductItem;
