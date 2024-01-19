import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: ''
    }
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : userDefault;
    });

    const login = (userData) => {
        setUser({ ...userData, isLoading: false });
        localStorage.setItem("user", JSON.stringify({ ...userData, isLoading: false }));
    };

    const logout = () => {
        setUser(userDefault);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

// import React, { createContext, useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';


// export const AuthContext = createContext();

// const AuthContextProvider = (props) => {
//     const [jwt, setJWT] = useState();
//     const [user, setUser] = useState();

//     useEffect(() => {
//         localStorage.getItem('jwt') && setJWT(JSON.parse(localStorage.getItem('jwt')));
//         localStorage.getItem('user') && setUser(JSON.parse(localStorage.getItem('user')));
//     }, [])

//     const addLocal = (jwt, user) => {

//         localStorage.setItem("jwt", JSON.stringify(jwt))
//         localStorage.setItem("user", JSON.stringify(user))

//         setJWT(jwt);
//         setUser(user);
        
//     }

//     const logOut = () => {
//         localStorage.removeItem("jwt")
//         localStorage.removeItem("user")

//         setJWT();
//         setUser();
//         <Redirect to="/" />
//     }


//     return (
//         <AuthContext.Provider
//             value={{
//                 jwt,
//                 user,
//                 addLocal,
//                 logOut
//             }}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// }

// export default AuthContextProvider;