import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth'
import customAxios from "../../axios/customAxios";
import { toast } from 'react-toastify';

import styles from './EditEmployee.module.css';

const EditCategory = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [datestart, setDateStart] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const getEmployee = async () => {
            if(user.isAdmin !== true){
                navigate("/")
            }
            try {
                const response = await customAxios.get(`/api/admin/employee/${id}`);
                if (response.data.success) {
                    setFullname(response.data.data.fullname);
                    setUsername(response.data.data.username);

                    const dateOfBirth = response.data.data.dob;
                    const dob = new Date(dateOfBirth);
                    const formatDob = dob.toISOString().split('T')[0];
                    setDob(formatDob);
                    
                    setEmail(response.data.data.email);
                    setAddress(response.data.data.address);

                    const originalDate = response.data.data.dateStart;
                    const parsedDate = new Date(originalDate);
                    const formattedDate = parsedDate.toISOString().split('T')[0];
                    setDateStart(formattedDate);

                    setPhone(response.data.data.phone);
                    setImage(response.data.data.image);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        }
        getEmployee();
    }, [id,navigate, user]);



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
        // Validate form fields
        if (!fullname || !username || !password || !dob || !email || !address || !phone || !datestart || !image) {
            // Display an error message or handle it as per your UI/UX design
            toast.error("Please enter full information !");
            return;
        }
        const employee = {
            fullname: fullname,
            username: username,
            password: password,
            email: email,
            address: address,
            image: image,
            dob: dob,
            dateStart: datestart,
            phone: phone,
        }

        const respone = await customAxios.post(`/api/admin/employee/update/${id}`, employee);

        if (respone.data.success) {
            console.log(respone.data);
            toast.success("Update successfully !");
            navigate('/employee');
        }
    }

    return (
        <>
            <div className={`col-9  ${styles.col9}`}>
                <div className={`${styles.rowTitle} mt-2 d-flex justify-content-between align-items-center`}>
                    <h1 className={`${styles.title} ms-5`}>Edit Employee</h1>
                    <Link to="/employee">
                        <button type="submit" className="btn btn-dark me-5">Back</button>
                    </Link>
                </div>
                <hr className={`my-3 ${styles.colorLine}`} />
                <div className={`container ${styles.containerEdit} d-flex justify-content-center align-items-center`}>
                    <div className="row d-flex justify-content-center mt-1">
                        <div className={`col-md-9 ${styles.formAdd}`}>
                            <div className="row justify-content-center formInput mt-2">
                                <div class="col-md-5 mb-2">
                                    <label for="fullname" class="form-label">FullName</label>
                                    <input type="text" class="form-control" 
                                            id="fullname" name="fullname" placeholder="fullname" required
                                            value={fullname}
                                            onChange={(e) => { setFullname(e.target.value)}}
                                            />
                                </div>
                                <div className="col-md-5">
                                    <label for="username" className="form-label">UserName</label>
                                    <input type="text" className="form-control" 
                                        id="username" name="username" 
                                        placeholder="username" required 
                                        value={username}
                                        onChange={(e) => { setUsername(e.target.value)}}
                                        />
                                </div>
                                <div className="col-md-5 mb-2">
                                    <label for="password" className="form-label">Pasword</label>
                                    <input type="password" className="form-control" 
                                        id="password" name="password" placeholder="password" required
                                        onChange={(e) => { setPassword(e.target.value)}}
                                        />
                                </div>
                                <div className="col-md-5">
                                    <label for="dob" className="form-label">Date Of Birth</label>
                                    <input type="date" className="form-control" 
                                        id="dob" name="dob" placeholder="dob" required
                                        value={dob}
                                        onChange={(e) => { setDob(e.target.value)}}
                                    />
                                </div>
                                <div className="col-md-5 mb-2">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" 
                                        id="email" name="email" placeholder="email@gmail.com" required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value)}}
                                        />
                                </div>
                                <div className="col-md-5">
                                    <label for="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" 
                                        id="address" name="address" placeholder="tpHCM" required 
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value)}}
                                        />
                                </div>
                                <div className="col-md-5 mb-2">
                                    <label for="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" 
                                        id="phone" name="phone" placeholder="phone" required 
                                        value={phone}
                                        onChange={(e) => { setPhone(e.target.value)}}
                                        />
                                </div>
                                <div className="col-md-5">
                                    <label for="datestart" className="form-label">Date start</label>
                                    <input type="date" className="form-control" 
                                        id="datestart" name="datestart" placeholder="DateStart" required 
                                        value={datestart}
                                        onChange={(e) => { setDateStart(e.target.value)}}
                                        />
                                </div>
                                <div className="col-5 mb-2">
                                    <label for="avatar" className="form-label">Avatar</label>
                                    <input type="file" className="form-control" id="avatar"
                                        onChange={convertToBase64} 
                                    />
                                </div>
                                <hr className="my-3" />
                                <div className="row justify-content-start">
                                    <div className="col-2 mb-2">
                                        <button className="btn btn-dark" onClick={handleEditEmployee}>Edit</button>
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

export default EditCategory;
