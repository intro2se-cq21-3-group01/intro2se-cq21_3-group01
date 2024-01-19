import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import customAxios from "../../axios/customAxios";
import { AuthContext } from '../context/auth'
import { toast } from 'react-toastify';

import styles from './EditCoupon.module.css';

const UpdateCoupon = () => {

    const { user } = useContext(AuthContext);
    const { id } = useParams();

    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        const getEmployee = async () => {
            if(user.isAdmin === true){
                navigate("/")
            }
            try {
                const response = await customAxios.get(`/api/admin/coupon/${id}`);
                if (response.data.success) {
                    setCode(response.data.data.code);
                    setDiscount(response.data.data.discount);
                    setQuantity(response.data.data.quantity);
                    setDescription(response.data.data.description);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getEmployee();
    }, [id , navigate, user]);

    const handleEditCoupon = async () => {
        // Validate form fields
        if (!code || !discount || !quantity || !description) {
            // Display an error message or handle it as per your UI/UX design
            toast.error("Please enter full information !");
            return;
        }
    
        // Rest of your code for making the API call
        try {
            const coupon = {
                code: code,
                discount: discount,
                quantity: quantity,
                description: description,
            }
    
            const response = await customAxios.post(`/api/admin/coupon/update/${id}`, coupon);
    
            if (response.data.success) {
                console.log(response.data);
                toast.success("Update successfully !");
                navigate('/coupon');
            } else {
                console.error("Failed to update coupon. Check the response for more details.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <div className={`col-9  ${styles.col9}`}>
                <div className={`${styles.rowTitle} mt-2 d-flex justify-content-between align-items-center`}>
                    <h1 className={`${styles.title} ms-5`}>Edit Coupon</h1>
                    <Link to="/coupon">
                        <button type="submit" className="btn btn-dark me-5">Back</button>
                    </Link>
                </div>
                <hr className={`my-3 ${styles.colorLine}`} />
                <div className={`container ${styles.containerEdit} d-flex justify-content-center align-items-center`}>
                    <div className="row d-flex justify-content-center mt-1">
                        <div className={`col-md-9 ${styles.formAdd}`}>
                            <div className="row justify-content-center formInput mt-2">
                                <div class="col-md-5 mb-2">
                                    <label for="code" class="form-label">Name</label>
                                    <input type="text" class="form-control"
                                        id="code" name="code" placeholder="name" required
                                        value={code}
                                        onChange={(e) => { setCode(e.target.value) }}
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label for="discount" className="form-label">Discount</label>
                                    <input type="number" className="form-control"
                                        id="discount" name="discount"
                                        placeholder="discount" required
                                        value={discount}
                                        onChange={(e) => { setDiscount(e.target.value) }}
                                    />
                                </div>
                                <div className="col-md-5 mb-2">
                                    <label for="quantity" className="form-label">Quantity</label>
                                    <input type="number" className="form-control"
                                        id="quantity" name="quantity" placeholder="quantity" required
                                        value={quantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                    />
                                </div>
                                <div className="col-md-5">
                                    <label for="desc" className="form-label">Description</label>
                                    <input type="text" className="form-control"
                                        id="desc" name="desc" placeholder="description" required
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                </div>
                                <hr className="my-3" />
                                <div className="row justify-content-start">
                                    <div className="col-2 mb-2">
                                        <button className="btn btn-dark" onClick={handleEditCoupon}>Save all</button>
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

export default UpdateCoupon;
