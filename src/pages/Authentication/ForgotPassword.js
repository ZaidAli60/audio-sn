import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import video from 'assets/video/vid_sub.mp4'
import axios from 'axios';

const initialState = { email: "", }

export default function ForgotPassword() {
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleResetPassword = e => {
        e.preventDefault()

        let { email } = state

        // email = email.trim()
        // if (!window.isEmail(email)) { return window.toastify("Please enter a valid email address", "error") }

        // setIsProcessing(true)
        console.log('state', state)
        axios.post(`http://85.239.241.96:8000/react/forgot-password`, { email })
            .then(res => {
                console.log('res', res)
                let { data, status } = res
                if (status === 200) {
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                window.toastify(err.response?.data?.error || "Something went wrong, please try again", "error")
            })
            .finally(() => {
                // setIsProcessing(false)
            })
    }

    return (
        <div className='container-fluid login'>
            <div className="row">
                <div className="col-12 col-md-5 bg-black min-vh-100 text-white p-5 d-flex align-items-center">
                    <div className='w-100'>
                        <h4 className='fw-bold'>Forgot Password
                        </h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Enter your email to reset your password.</p>
                        <div className='input-form'>
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.email} onChange={handleChange} name='email' type='text' placeholder=' ' />
                                <label className='floating-label'>Email</label>
                            </div>

                            <button onClick={handleResetPassword} style={{ backgroundColor: '#26f7c5', letterSpacing: '1px', fontSize: '12px' }} className='w-100 border-0 py-3 text-uppercase fw-bold text rounded-5 my-3'>
                                Reset password
                            </button>
                            <Link to="/auth" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'><FiArrowLeft size={20} className='me-2' />Return to Log in</Link>
                        </div>
                    </div>
                </div>
                <div className="col-7 p-0 m-0 d-none  d-md-block ">
                    <video src={video} autoPlay muted loop playsInline controls={false} style={{ width: "100%", objectFit: "cover", height: "100vh" }}  >
                    </video>
                </div>
            </div>
        </div>
    )
}
