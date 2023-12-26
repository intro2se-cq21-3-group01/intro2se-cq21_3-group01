import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import './ProductItem.css'

const ProductItem = (props) => {
    const { imgUrl, name, price } = props.product;
    const stars = 5;

    return (
        <div className="product-item card">
            <img src={imgUrl} className="card-img-top" alt="Product" />
            <FontAwesomeIcon icon={faHeart} className='product-item-heart' />
            <div className="card-body">
                <div className="card-title">
                    <h6 className="product-item-name">{name}</h6>
                    <h6 className="product-item-price">{price} đ</h6>
                </div>
                <div className="product-item-stars">
                    {[...Array(stars)].map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} className='star-icon' />
                    ))}
                </div>
                <a href="/" className="product-item-btn btn btn-primary">
                    Add to cart
                </a>
            </div>
        </div>
    );
};

export default ProductItem;
