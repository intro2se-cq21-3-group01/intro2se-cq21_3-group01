import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import customAxios from "../../axios/customAxios";
import { AuthContext } from '../context/auth'
import { toast } from 'react-toastify';

import styles from './AddCategory.module.css';

const AddCategory = () => {
    const { user } = useContext(AuthContext);

    const [name, setName] = useState('');

    const navigate = useNavigate();

    
    const handleAddCategory = async () => {
        // Validate form fields
        if (!name) {
            // Display an error message or handle it as per your UI/UX design
            toast.error("Please enter full information !");
            return;
        }
    
        // Rest of your code for making the API call
        try {
            const category = {
                name: name,
            }
    
            const response = await customAxios.post('/api/category/add', category);
    
            if (response.data.success) {
                console.log(response.data);
                toast.success("Add successfully !");
                navigate('/category');
            } else {
                console.error("Failed to add category. Check the response for more details.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    useEffect(() => {
        if(user.isAdmin === true){
            navigate("/")
        }
    })
    return (
        <>
            <div className={`col-9  ${styles.col9}`}>
                <div className={`${styles.rowTitle} mt-2 d-flex justify-content-between align-items-center`}>
                    <h1 className={`${styles.title} ms-5`}>Add Category</h1>
                    <Link to="/category">
                        <button type="submit" className="btn btn-dark me-5">Back</button>
                    </Link>
                </div>
                <hr className={`my-3 ${styles.colorLine}`} />
                <div className={`container ${styles.containerEdit} d-flex justify-content-center align-items-center`}>
                    <div className="row d-flex justify-content-center mt-1">
                        <div className={`col-md-9 ${styles.formAdd}`}>
                            <div className="row justify-content-center formInput mt-2">
                                <div class="col-md-12 mb-2">
                                    <label for="name" class="form-label">NameCategory</label>
                                    <input type="text" class="form-control"
                                        id="name" name="name" placeholder="name" required
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>
                                <hr className="my-3" />
                                <div className="row justify-content-start">
                                    <div className="col-6 mb-2">
                                        <button className="btn btn-dark" onClick={handleAddCategory}>Save all</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCategory;
