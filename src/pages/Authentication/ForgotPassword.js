import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import video from 'assets/video/vid_sub.mp4'
import axios from 'axios';
import { Button } from 'antd';

const SERVER_URL = process.env.REACT_APP_API_END_POINT
const initialState = { email: "" }

export default function ForgotPassword() {
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleResetPassword = e => {
        e.preventDefault()
        let { email } = state
        setIsProcessing(true)

        axios.post(`${SERVER_URL}/api/forgot-password`, { email })
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
                const { response } = err
                window.toastify(response?.data?.detail || "Something went wrong, please try again", "error")
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
                        <h4>Forgot Password
                        </h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Enter your email to reset your password.</p>
                        <div className='input-form'>
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.email} onChange={handleChange} name='email' type='text' placeholder=' ' />
                                <label className='floating-label'>Email</label>
                            </div>
                            <Button type="primary" className="w-100" style={{ fontWeight: '500', fontSize: '18px' }} size='large' shape='round' onClick={handleResetPassword} loading={isProcessing}>Reset Password</Button>
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
