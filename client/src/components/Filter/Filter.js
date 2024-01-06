import React, { useEffect, useState } from 'react';
import customAxios from '../../axios/customAxios';


import styles from './Filter.module.css';

const Filter = (props) => {
    const {
        inputEnd,
        setInputEnd,
        checkedCategories,
        handleCheckCategory,
        sortBy,
        handleSortChange,
    } = props;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const response = await customAxios.get(`/api/category`);

            setCategories(response.data.data)
        }

        getCategories();
    }, []);

    return (
        <div className={styles.filter}>
            <div className={styles['sort-by']}>
                <div className={styles.dropdown}>
                    <label htmlFor="sortSelect">Sort by</label>
                    <select
                        id="sortSelect"
                        value={sortBy}
                        onChange={handleSortChange}
                        className="form-select"
                    >
                        <option value="">Select</option>
                        <option value="increase">Increase</option>
                        <option value="decrease">Decrease</option>
                    </select>
                </div>
            </div>
            <div className={styles.category}>
                <h4>Category</h4>
                {categories &&
                    categories.map((category, index) => (
                        <div className={styles['category-row']} key={index}>
                            <div className="form-check">
                                <input
                                    className={`form-check-input ${styles['form-check-input']}`}
                                    type="checkbox"
                                    value=""
                                    id={category.name.toLowerCase()}
                                    checked={checkedCategories.includes(category.name)}
                                    onChange={() => handleCheckCategory(category.name)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={category.name.toLowerCase()}
                                >
                                    {category.name}
                                </label>
                            </div>
                            {/* <span className={styles.quantity}>({category.quantity})</span> */}
                        </div>
                    ))}
            </div>
            <div className={styles['slider-price']}>
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input
                    type="range"
                    className="form-range"
                    id={styles.price}
                    max={50}
                    value={inputEnd}
                    onChange={(e) => {
                        setInputEnd(e.target.value);
                    }}
                />
                <br />
                <input type="text" className={styles['input-start']} value="0" readOnly />
                <input
                    type="text"
                    className={styles['input-end']}
                    value={inputEnd}
                    readOnly
                    onChange={() => { }}
                />
            </div>
        </div>
    );
};

export default Filter;
