import { useState } from 'react';

import Filter from "../components/Filter/Filter";
import ProductList from "../components/ProductList/ProductList";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const ProductListPage = () => {
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
            <Header />
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
            <Footer />
        </div>
    );
}

export default ProductListPage;