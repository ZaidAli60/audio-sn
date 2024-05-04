import React from 'react';
import { useAuthContext } from 'context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_API_END_POINT

export default function Google() {
    const { dispatch } = useAuthContext();

    const handleOnSuccess = response => {
        axios.post(`${SERVER_URL}/api/google-signin`, { id_token: response.credential })
            .then(res => {
                // console.log('response', res)
                let { data, status } = res;
                if (status === 200) {
                    localStorage.setItem("jwt", JSON.stringify({ token: data.access_token }));
                    readUserProfile(data);
                }
            })
            .catch(err => {
                window.toastify("Something went wrong while signing in", "error");
                console.log('err', err)
            })
    }

    const readUserProfile = doc => {
        const config = { headers: { Authorization: `Bearer ${doc.access_token}` } }
        axios.get(`${SERVER_URL}/api/auth/user`, config)
            .then(res => {
                let { data, status } = res
                if (status === 200) {
                    // let googleData = doc.userData
                    const isSuperAdmin = data.userData.roles.includes("superAdmin")
                    const isCustomer = data.userData.roles.includes("customer")
                    // dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data, ytd: 20000000, roles: ["superAdmin"] } } })
                    dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data }, isSuperAdmin, isCustomer } })
                    window.toastify("Login successful", "success")
                }
            })
            .catch(err => {
                // console.error('err', err)
                const { response } = err
                window.toastify(response?.data?.detail || "Something went wrong, please try again", "error")
                localStorage.removeItem("jwt")
                // setIsAppLoding(false)
            })
    }

    const handleOnError = err => {
        console.log('err google sign in', err);
        window.toastify("Something went wrong, please try again", "error");
    }

    return (
        <GoogleLogin logo_alignment='center' onSuccess={handleOnSuccess} onError={handleOnError} />
    );
}







// const readUserProfile = data => {
//     const { token } = data;
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     axios.get(`http://127.0.0.1:8000/auth/user`, config)
//         .then(res => {

//             let { data, status } = res;
//             if (status === 200) {
//                 window.toastify("Login successful", "success");
//                 dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data, ytd: 20000000, roles: ["superAdmin"] } } });
//             }
//         })
//         .catch(err => {
//             console.error('err', err);
//         })
// }