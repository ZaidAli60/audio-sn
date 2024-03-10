import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import video from 'assets/images/videoBg.mp4'

const initialState = { email: "", }

export default function ForgotPassword() {
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state)

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

                            <button onClick={handleSubmit} style={{ backgroundColor: '#26f7c5', letterSpacing: '1px', fontSize: '12px' }} className='w-100 border-0 py-3 text-uppercase fw-bold text rounded-5 my-3'>
                                Reset password
                            </button>
                            <Link to="/auth" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'><FiArrowLeft size={20} className='me-2' />Return to Log in</Link>
                        </div>
                    </div>
                </div>
                <div className="col-7 p-0 m-0 d-none  d-md-block ">
                    <video
                        src={video}
                        className='fullscreen-video'
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}
                    >
                    </video>
                </div>
            </div>
        </div>
    )
}
