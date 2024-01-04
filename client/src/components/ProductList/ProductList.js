import { useEffect, useState } from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import ProductItem from "../ProductItem/ProductItem";
import './ProductList.css';

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const { sortBy, inputEnd, checkedCategories } = props;

    // Call api to get products
    useEffect(() => {
        const getAllProducts = async () => {
            const response = await axios.get(
                `http://localhost:8000/api/product?page=${currentPage}&limit=${currentLimit}`
            );

            if (response.data.success) {
                setProducts(response.data.data);
                setTotalPages(response.data.totalPages);
            }
        }

        getAllProducts();
    }, [currentPage]);

    // Update products whenever there is a change in the original data
    useEffect(() => {
        let newProducts = [...products];

        if (sortBy === 'decrease') {
            newProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'increase') {
            newProducts.sort((a, b) => a.price - b.price);
        }

        setProducts(newProducts);
        window.scrollTo(0, 0)
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
        window.scrollTo(0, 0)
    }, [inputEnd, checkedCategories, products]);

    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1);
    };

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
                    <div className="row mt-5 justify-content-center">
                        <div className="col-6">
                            <div className="product-pagination d-flex justify-content-center">
                                <ReactPaginate
                                    nextLabel=">"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={totalPages}
                                    previousLabel="<"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProductList;
