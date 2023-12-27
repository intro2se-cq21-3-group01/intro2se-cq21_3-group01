import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import axios from 'axios';

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { sortBy, inputEnd, checkedCategories } = props;

    // Call api to get products
    useEffect(() => {
        const getAllProducts = async () => {
            const response = await axios.get('http://localhost:8000/api/product');
            setProducts(response.data.data);
        }

        getAllProducts();
    }, []);

    // Update products whenever there is a change in the original data
    useEffect(() => {
        let newProducts = [...products];

        if (sortBy === 'decrease') {
            newProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'increase') {
            newProducts.sort((a, b) => a.price - b.price);
        }

        setProducts(newProducts);
        // eslint-disable-next-line
    }, [sortBy]);

    // Update filtered products based on price and categories
    useEffect(() => {
        const filteredByPrice = products.filter(product => product.price <= inputEnd);
        const filteredByCategory = checkedCategories.length === 0 ?
            products
            :
            products.filter(product => {
                return product.categories.some(category => checkedCategories.includes(category));
            });

        const finalFilteredProducts = filteredByPrice.filter(product => filteredByCategory.includes(product));

        setFilteredProducts(finalFilteredProducts);
    }, [inputEnd, checkedCategories, products]);

    return (
        <>
            <div className="product-list">
                <div className="container">
                    <div className="row">
                        {filteredProducts.map(product => (
                            <div key={product._id} className="col-4">
                                <ProductItem product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
