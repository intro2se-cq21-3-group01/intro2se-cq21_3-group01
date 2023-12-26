import { useState } from 'react';
import './Filter.css'

const Filter = (props) => {
    const [inputEnd, setInputEnd] = useState(0);
    const [checkedCategories, setCheckedCategories] = useState([]);

    const { categories } = props;

    const handleCheckCategory = (index) => {
        const isChecked = checkedCategories.includes(index);

        if (isChecked) {
            setCheckedCategories(prevState => {
                return prevState.filter(item => item !== index);
            });
        }
        else {
            setCheckedCategories([...checkedCategories, index]);
        }
    }


    return (
        <div className="filter">
            <div className='sort-by'>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Sort by
                    </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">Increase</li>
                        <li class="dropdown-item">Decrease</li>
                    </ul>
                </div>
            </div>
            <div className="category">
                <h3>Category</h3>
                {categories &&
                    categories.map((category, index) => (
                        <div className="category-row" key={index}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="cookies"
                                    checked={checkedCategories.includes(index)}
                                    onChange={() => handleCheckCategory(index)}
                                />
                                <label className="form-check-label" htmlFor="cookies">
                                    {category.name}
                                </label>
                            </div>
                            <span className="quantity">({category.quantity})</span>
                        </div>
                    ))
                }
            </div>
            <div className="slider-price">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="range" className="form-range" id="price" max={500000}
                    value={inputEnd}
                    onChange={(e) => { setInputEnd(e.target.value) }}
                />
                <br />
                <input type="text" className="input-start" value="0" readOnly />
                <input type="text" className="input-end" value={inputEnd} readOnly onChange={() => { }} />
            </div>
        </div>
    );
}

export default Filter;
