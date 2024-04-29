import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from 'context/AuthContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Divider } from 'antd';
import video from 'assets/video/vid_sub.mp4'
import GoogleLogin from './GoogleLogin';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_END_POINT
const initialState = { email: "", password: "", }

export default function Login() {

    const { dispatch } = useAuthContext()
    const [showPassword, setShowPassword] = useState('password')
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password } = state
        email = email.trim()

        setIsProcessing(true)
        if (!window.isEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
        axios.post(`${SERVER_URL}/api/email-signin`, { email, password })
            .then(res => {
                let { status, data } = res
                if (status === 200) {
                    localStorage.setItem("jwt", JSON.stringify({ token: data.access_token }));
                    dispatch({ payload: { user: { ...data, roles: ["superAdmin"] } } })
                    if (data?.user_info?.email_status === "Verified") {
                        dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data, roles: ["superAdmin"] } } })
                        window.toastify("Login successfully", "success")
                    } else {
                        window.toastify("You have not verified yet. Please verify your email first and then Sign in.", "error")
                    }
                }
                setIsProcessing(false)
            })
            .catch(err => {
                // console.log('err', err)
                const { response } = err
                if (response?.data?.detail === "400: OooPS...User not found. Please sign up first.") {
                    window.toastify("Ooops....User not found as it does not exists. Please sign up first.", "error")
                } else {
                    window.toastify("Ooops.....Incorrect password. Please try again.", "error")
                }
                setIsProcessing(false)
            })
    }

    return (
        <div className='login'>
            <div className="mb-0 d-flex overflow-hidden max-vh-100">
                <div className="bg-black text-white p-2 p-md-5 d-flex align-items-center left-signin" style={{ width: '500px', height: '100vh' }}>
                    <div className='w-100'>
                        <h4 >Login</h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Don't have an account? <Link to="register" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'>Don't have an account?</Link></p>
                        {/* <GoogleLogin logo_alignment='center' onSuccess={handleOnSuccess} onError={handleOnError} /> */}
                        <GoogleLogin />
                        <Divider className='text-white border-white'>OR</Divider>
                        <div className='input-form'>
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.email} onChange={handleChange} name='email' type='text' placeholder=' ' />
                                <label className='floating-label'>E-mail</label>
                            </div>
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.password} onChange={handleChange} name='password' type={showPassword} placeholder=' ' />
                                <label className='floating-label'>
                                    Password
                                </label>
                                {showPassword === 'password' ? (
                                    <FaEyeSlash
                                        size={20}
                                        className='text-white eye-icon '
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowPassword('text');
                                        }}
                                    />
                                ) : (
                                    <FaEye
                                        size={20}
                                        className='text-white eye-icon'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowPassword('password');
                                        }}
                                    />
                                )}
                            </div>
                            <Button type="primary" className="custom-btn w-100" size='large' shape='round' onClick={handleSubmit} loading={isProcessing}>Log In</Button>
                            <Link to="forgot-password" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'>Forgot password?</Link>
                        </div>
                    </div>
                </div>
                <div className="p-0 m-0 d-none d-md-block h-full" style={{ flexGrow: 1, height: '100vh' }}>
                    <video src={video} autoPlay muted loop playsInline controls={false} style={{ width: "100%", objectFit: "cover", height: "100%" }}  >
                    </video>
                </div>
            </div>
        </div>
    )
}
