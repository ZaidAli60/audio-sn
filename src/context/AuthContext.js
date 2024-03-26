import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { createContext } from 'react';

const AuthContext = createContext()
const initialState = { isAuthenticated: false, user: {} }

const reducer = (state, { type, payload }) => {

    switch (type) {
        case "SET_LOGGED_IN":
            const { user } = payload
            return { ...state, isAuthenticated: true, user }
        case "SET_PROFILE":
            return { ...state, ...payload }
        case "SET_LOGGED_OUT":
            return initialState
        default:
            return state
    }
}
const SERVER_URL = process.env.REACT_APP_API_END_POINT


export default function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoding] = useState(true)
    // const [accessToken, setAccessToken] = useState("");

    console.log('state', state)
    console.log('isAppLoading', isAppLoading)

    const getUser = useCallback((user) => {
        console.log('user', user)
        // const config = { headers: { Authorization: `Bearer ${doc.access_token}` } }
        // axios.get(`http://38.80.122.248:40337/react/read/${user.id}`)
        //     .then(res => {
        //         let { data, status } = res
        //         if (status === 200) {
        //             dispatch({ type: "SET_PROFILE", payload: { user: { ...data } } })
        //         }
        //     })
        //     .catch(err => {
        //         console.log('err', err)
        //     })
        //     .finally(() => {
        //         setIsAppLoding(false)
        //     })
    },
        [],
    )

    const readUserProfile = useCallback(data => {
        const { token } = data;
        console.log('token', token)
        const config = { headers: { Authorization: `Bearer ${token}` } }
        axios.get(`${SERVER_URL}/react/auth/user`, config)
            .then(res => {
                console.log('resData', res)
                let { data, status } = res
                if (status === 200) {
                    let user = { ...data, roles: ["superAdmin"] }
                    console.log('user', user)
                    dispatch({ type: "SET_LOGGED_IN", payload: { user } })
                    getUser(data)
                }
            })
            .catch(err => {
                console.error('err', err)
                localStorage.removeItem("jwt")
                // setIsAppLoding(false)
            })
            .finally(() => {
                setIsAppLoding(false)
            })
    }, [getUser])

    const handleLogout = () => {
        // const token = accessToken
        // console.log('accessToken', token)
        googleLogout()
        localStorage.removeItem("jwt")
        dispatch({ type: "SET_LOGGED_OUT" })
        // const config = { headers: { Authorization: `Bearer ${123456}` } }
        // axios.get(`http://85.239.241.96:8000/react/signout`, {}, config)
        //     .then(res => {
        //         console.log('res', res)
        //         let { data, status } = res
        //         if (status === 200) {
        //             googleLogout()
        //             window.toastify(data.message, "success")
        //             localStorage.removeItem("jwt")
        //             dispatch({ type: "SET_LOGGED_OUT" })
        //         }
        //     })
        //     .catch(err => {
        //         console.error('err', err)
        //         window.toastify("Something went wrong", "error")
        //     })
    }



    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("jwt"))
        if (data) {
            readUserProfile(data)
            // setAccessToken(data)
        } else {
            setTimeout(() => setIsAppLoding(false), 500);
        }
    }, [readUserProfile])


    return (
        <AuthContext.Provider value={{ ...state, dispatch, readUserProfile, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)