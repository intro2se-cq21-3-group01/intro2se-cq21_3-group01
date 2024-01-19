import React, { useState , useEffect, useContext } from "react";
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AuthContext } from '../context/auth'


import styles from './EditProduct.module.css';

const EditEmployee = () => {
    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const [category, setCategory] = useState([])

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesc] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [categoryChoose, setCategoryChoose] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/product/${id}`);
                if (response.data.success) {
                    setName(response.data.data.name);
                    setPrice(response.data.data.price);
                    setDesc(response.data.data.description);
                    setQuantity(response.data.data.quantity);
                    setImage(response.data.data.imgUrl);
                    setCategoryChoose(response.data.data.categories);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getProduct();
    }, [id])

    function convertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error");
        }
    }
    const handleEditEmployee = async () => {
        if (!name || !price || !description || !quantity || !image || !category) {
            // Display an error message or handle it as per your UI/UX design
            toast.error("Please enter full information !");
            return;
        }
        const product = {
            name: name,
            price: price,
            description: description,
            quantity: quantity,
            imgUrl: image,
            categories: categoryChoose
        }

        console.log(product);
        const respone = await axios.post(`http://localhost:8000/api/admin/product/update/${id}`, product);

        if (respone.data.success) {
            console.log(respone.data);
            navigate('/product');
        }
    }
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                if(user.isAdmin !== true){
                    navigate("/")
                }
                const respone = await axios.get('http://localhost:8000/api/category/');
                setCategory(respone.data.data)

            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getAllCategories();
    }, [navigate, user]);
    return (
        <>
            <div className={`col-9  ${styles.col9}`}>
                <div className={`${styles.rowTitle} mt-2 d-flex justify-content-between align-items-center`}>
                    <h1 className={`${styles.title} ms-5`}>Edit Product</h1>
                    <Link to="/product">
                        <button type="submit" className="btn btn-dark me-5">Back</button>
                    </Link>
                </div>
                <hr className={`my-3 ${styles.colorLine}`} />
                <div className={`container ${styles.containerEdit} d-flex justify-content-center align-items-center`}>
                    <div className="row d-flex justify-content-center mt-1">
                        <div className={`col-md-9 ${styles.formAdd}`}>
                            <div className="row justify-content-center formInput mt-2">
                                <div class="col-md-5 mb-2">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control"
                                        id="name" name="name" placeholder="name" required
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label for="price" className="form-label">Price</label>
                                    <input type="number" className="form-control"
                                        id="price" name="price"
                                        placeholder="...$" required
                                        value={price}
                                        onChange={(e) => { setPrice(e.target.value) }}
                                    />
                                </div>
                                <div className="col-md-5 mb-2">
                                    <label for="description" className="form-label">Description</label>
                                    <input type="text" className="form-control"
                                        id="description" name="description" placeholder="description" required
                                        value={description}
                                        onChange={(e) => { setDesc(e.target.value) }}
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label for="quantity" className="form-label">Quantity</label>
                                    <input type="number" className="form-control"
                                        id="quantity" name="quantity" placeholder="quantity" required
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                    />
                                </div>
                                <div className="col-md-5 mb-2">
                                    <label for="avatar" className="form-label">Image Product</label>
                                    <input type="file" className="form-control" id="avatar"
                                        onChange={convertToBase64}
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label for="categories" className="form-label">Category</label>
                                    <select className={styles['selectEdit']} name="categories" id="categories" value={categoryChoose} onChange={(e) => setCategoryChoose(e.target.value)}>
                                        <option >Chọn loại</option>
                                        {
                                            category && category.map((item, index) => (
                                            <option value={item.name} key={index} >{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <hr className="my-3" />
                                <div className="row justify-content-start">
                                    <div className="col-2 mb-2">
                                        <button className="btn btn-dark" onClick={handleEditEmployee}>Edit all</button>
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

export default EditEmployee;
