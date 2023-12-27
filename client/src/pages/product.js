import { useState } from 'react';

import Filter from "../components/Filter/Filter";
import ProductList from "../components/ProductList/ProductList";

const categories = [
    {
        name: 'Cookies',
        quantity: 10
    },
    {
        name: 'Desserts',
        quantity: 20
    },
    {
        name: 'Cakes',
        quantity: 30
    },
    {
        name: 'Muffins',
        quantity: 40
    },
    {
        name: 'Breakfast',
        quantity: 40
    },
];

const ProductPage = () => {
    const [inputEnd, setInputEnd] = useState(50);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('');

    const handleCheckCategory = (category) => {
        const isChecked = checkedCategories.includes(category);

        if (isChecked) {
            setCheckedCategories(prevState => {
                return prevState.filter(item => item !== category);
            });
        }
        else {
            setCheckedCategories([...checkedCategories, category]);
        }
    }


    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className="product-page">
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Filter
                            inputEnd={inputEnd}
                            setInputEnd={setInputEnd}
                            checkedCategories={checkedCategories}
                            setCheckedCategories={setCheckedCategories}
                            handleCheckCategory={handleCheckCategory}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            handleSortChange={handleSortChange}
                            categories={categories}
                        />
                    </div>
                    <div className="col-9">
                        <ProductList
                            inputEnd={inputEnd}
                            sortBy={sortBy}
                            checkedCategories={checkedCategories}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;