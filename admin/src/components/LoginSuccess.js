import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
//import { loginSuccess } from '../store/actions/authAction'
import { useParams } from 'react-router-dom'
//import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../components/context/auth';
const LoginSuccess = () => {
    const { userId } = useParams()
    const { addLocal} = useContext(AuthContext);
    console.log(userId);
    const navigate = useNavigate();
    //const dispatch = useDispatch()
    //const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        //dispatch(loginSuccess(userId, tokenLogin))
        const user = {
            userId: userId
        }
        const fetchToken = async () => {
            let response = await axios.post('http://localhost:8000/api/auth/login-success', user, { withCredentials: true, })
            console.log(response);

            if (response.data.success) {
                console.log(response.data.user.isAdmin);
                if (response.data.user.isAdmin === true) {
                    addLocal(response.data.jwt, response.data.user)
                    console.log("Admin");
                    navigate("/employee")
                }
                else {
                    addLocal(response.data.jwt, response.data.user)
                    navigate("/order")
                    console.log("Nhân viên");
                }
    
            }
        }
        fetchToken()
    }, [userId])
    // return (
    //     // <div>
    //     //     {isLoggedIn ? <Navigate to={'/'} replace={true} /> : <h3>Yêu cầu bạn hãy đăng nhập</h3>}
    //     // </div>
    // )
}

export default LoginSuccess