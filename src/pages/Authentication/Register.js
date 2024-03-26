import React, { useState } from 'react'
import { useAuthContext } from 'context/AuthContext';
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { Divider } from 'antd';
import video from 'assets/video/vid_sub.mp4'
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_END_POINT
const initialState = { email: "", password: "", }

export default function Register() {
    const { dispatch } = useAuthContext()
    const [showPassword, setShowPassword] = useState('password')
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;

        if (!window.isEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
        if (password.length < 8) { return window.toastify("Password must be atleast 8 chars.", "error") }

        const formData = { email, password }

        axios.post(`${SERVER_URL}/react/email-signup`, formData)
            .then(res => {
                let { status, data } = res
                if (status === 200) {
                    localStorage.setItem("jwt", JSON.stringify({ token: data.access_token }));
                    dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data, roles: ["superAdmin"] } } })
                    window.toastify("Your account has been created successfully", "success")
                }
            })
            .catch(err => {
                const { response } = err
                if (response?.status === 400) {
                    window.toastify("User already exists. Please sign in instead.", "error")
                } else {
                    localStorage.removeItem("jwt")
                    window.toastify(err?.response?.data?.error || "Something went wrong while creating your account, please try again", "error")
                }
                // setIsProcessing(false)
            })
    }

    return (
        <div className='container-fluid login'>
            <div className="row">
                <div className="col-12 col-md-5 bg-black min-vh-100 text-white p-5 d-flex align-items-center">
                    <div className='w-100'>

                        <h4 className='fw-bold'>Create Account</h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Already have an account? <Link to="/auth" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'>Log In</Link></p>
                        <div className="social-button my-3">

                            <button className='google-button '>
                                <FcGoogle size={25} className='position-absolute ' />
                                <span className='mx-auto'>
                                    Sign in with Google
                                </span>
                            </button>

                            <button className='facebook-button'>
                                <FaFacebook size={25} className='position-absolute' />
                                <span className='mx-auto'>
                                    Continue with Facebook
                                </span>
                            </button>

                        </div>
                        <Divider className='text-white border-white'>OR</Divider>
                        <div className='input-form'>
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.email} onChange={handleChange} name='email' type='text' placeholder=' ' />
                                <label className='floating-label'>Email</label>
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
                            <button onClick={handleSubmit} style={{ backgroundColor: '#26f7c5', letterSpacing: '1px', fontSize: '12px', fontWeight: '900' }} className='w-100 border-0 py-3 text-uppercase fw-bold text rounded-5 my-3'>
                                Start for free
                            </button>
                            <p style={{ color: '#90998b' }}>No Credit Card required.</p>
                        </div>
                    </div>
                </div>
                <div className="col-7 p-0 m-0 d-none d-md-block ">
                    <video src={video} autoPlay muted loop playsInline controls={false} style={{ width: "100%", objectFit: "cover", height: "100vh" }}  >
                    </video>
                </div>
            </div>
        </div>
    )
}
