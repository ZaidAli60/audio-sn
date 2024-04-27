import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import video from 'assets/video/vid_sub.mp4'
import axios from 'axios';
import { Button } from 'antd';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SERVER_URL = process.env.REACT_APP_API_END_POINT
const initialState = { newPassword: "", confirmPassword: "", }

export default function RestPassword() {
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)
    const [showPassword, setShowPassword] = useState('password')
    const [token, setToken] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const readData = async () => {
        let query = new URLSearchParams(window.location.search)
        let oobCode = query.get("token")
        setToken(oobCode)
    }

    useEffect(() => {
        readData()
    }, [])


    const handleResetPassword = e => {
        e.preventDefault()

        let { newPassword, confirmPassword } = state;


        if (!newPassword) {
            return window.toastify("Please enter new password.", "error")
        }
        if (newPassword.length < 8) {
            return window.toastify("Password should be minimum 8 chars.", "error")
        }
        if (confirmPassword !== newPassword) {
            return window.toastify("Password dosen't match", "error")
        }

        setIsProcessing(true)
        axios.post(`${SERVER_URL}/api/reset-password`, { token, confirmPassword }, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                let { data, status } = res
                if (status === 200) {
                    window.toastify(data.message, "success")
                }
                setState(initialState)
                setIsProcessing(false)
            })
            .catch(err => {
                // console.log('err', err)
                if (err?.response.status === 400) {
                    window.toastify("Password reset token has expired. Send Forgot Password request again.", "error")
                } else {
                    window.toastify(err.response?.data?.error || "Something went wrong, please try again", "error")
                }
                setIsProcessing(false)
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <div className='login'>
            <div className="mb-0 d-flex overflow-hidden max-vh-100">
                <div className="bg-black min-vh-100 text-white p-2 p-md-5 d-flex align-items-center left-signin" style={{ width: '500px', height: '100vh' }}>
                    <div className='w-100'>
                        <h4>Rest Password </h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Reset the password of your Soundtracks account.</p>
                        <div className='input-form'>
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.newPassword} onChange={handleChange} name='newPassword' type={showPassword} placeholder=' ' />
                                <label className='floating-label'>
                                    New Password
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
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.confirmPassword} onChange={handleChange} name='confirmPassword' type={showPassword} placeholder=' ' />
                                <label className='floating-label'>
                                    Confirm Password
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
                            <Button type="primary" className="custom-btn w-100" size='large' shape='round' onClick={handleResetPassword} loading={isProcessing}>Rest Password</Button>
                            <Link to="/auth" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'><FiArrowLeft size={20} className='me-2' />Return to Log in</Link>
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
