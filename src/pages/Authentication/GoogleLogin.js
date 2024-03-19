import React from 'react';
import { useAuthContext } from 'context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


export default function Google() {
    const { dispatch } = useAuthContext();

    const handleOnSuccess = response => {
        axios.post(`http://38.80.122.248:40337/react/google-signin`, { id_token: response.credential })
            .then(res => {
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
        axios.get(`http://38.80.122.248:40337/react/auth/user`, config)
            .then(res => {
                let { data, status } = res
                if (status === 200) {
                    let googleData = doc.userData
                    dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data, ...googleData, roles: ["superAdmin"] } } })
                    window.toastify("Login successful", "success")
                }
            })
            .catch(err => {
                console.error('err', err)
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