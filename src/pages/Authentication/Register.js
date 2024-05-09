import React, { useState } from 'react'
import { useAuthContext } from 'context/AuthContext';
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Checkbox, Divider } from 'antd';
import video from 'assets/video/vid_sub.mp4'
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_END_POINT
const initialState = { email: "", password: "", checkbox: false }

export default function Register() {
    const { dispatch } = useAuthContext()
    const [showPassword, setShowPassword] = useState('password')
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)

    // console.log('state', state)

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const onCheckboxChange = e => {
        const { checked } = e.target
        setState(s => ({ ...s, checkbox: checked }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;

        if (!window.isEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
        if (password.length < 8) { return window.toastify("Password must be minimum 8 characters long.", "error") }

        const formData = { email, password, email_status: "unverified", roles: ["customer"], status: "active" }

        setIsProcessing(true)
        axios.post(`${SERVER_URL}/api/email-signup`, formData)
            .then(res => {
                let { status, data } = res
                if (status === 200) {
                    localStorage.setItem("jwt", JSON.stringify({ token: data.access_token }));
                    // dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data, roles: ["superAdmin"] } } })
                    dispatch({ payload: { user: { ...data } } })
                    // navigate("/auth/verification")
                    setState(initialState)
                    window.toastify("Signup successful! Please check your email for verification.", "success")
                }
                setIsProcessing(false)
            })
            .catch(err => {
                console.log('err', err)
                const { response } = err
                window.toastify(response?.data?.detail || "Service temporarily unavailable. Please try again later.", "error")
                // if (response?.status === 400) {
                //     window.toastify("User already exists. Please sign in instead.", "error")
                // } else {
                //     localStorage.removeItem("jwt")
                //     window.toastify(err?.response?.data?.error || "Something went wrong while creating your account, please try again", "error")
                // }
                setIsProcessing(false)
            })
    }

    return (
        <div className='login'>
            <div className="mb-0 d-flex overflow-hidden max-vh-100">
                <div className="bg-black min-vh-100 text-white p-2 p-md-5 d-flex align-items-center left-signin" style={{ width: '500px', height: '100vh' }}>
                    <div className='w-100'>

                        <h4 >Create Account</h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Already have an account? <Link to="/auth" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'>Log In</Link></p>
                        <div className="social-button my-3">

                            <button className='google-button '>
                                <FcGoogle size={25} className='position-absolute ' />
                                <span className='mx-auto'>
                                    Sign in with Google
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
                            <div style={{ marginBottom: "20px" }}>
                                <Checkbox checked={state.checkbox} name='checkbox' onChange={onCheckboxChange} className={`${!state.checkbox ? 'custom-checkbox' : ''} text-white`}>

                                    <span style={{ color: '#90998b' }}> I accept the <Link className='text-primary' to="/terms-privacy">Terms & Privacy Policy</Link> of the platform.</span>
                                </Checkbox>
                            </div>
                            <Button type="primary" className="w-100" style={{ fontWeight: '500', fontSize: '18px', }} size='large' shape='round' onClick={handleSubmit} loading={isProcessing}>Start for free</Button>
                            <p style={{ color: '#90998b' }}>No Credit Card required.</p>
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
