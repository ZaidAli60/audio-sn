import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { Divider } from 'antd';
import video from 'assets/images/videoBg.mp4'
import { useAuthContext } from 'context/AuthContext';
import GoogleLogin from './GoogleLogin';

const initialState = { email: "", password: "", }

export default function Login() {
    const [showPassword, setShowPassword] = useState('password')
    const [state, setState] = useState(initialState);
    const { data } = useAuthContext()
    console.log('data', data)


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
                <div className="col-12 col-md-5 bg-black min-vh-100 text-white p-5 d-flex  align-items-center">
                    <div className='w-100'>
                        <h4 className='fw-bold'>Login</h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Don't have an account? <Link to="register" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'>Don't have an account?</Link></p>
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
                        {/* <GoogleLogin logo_alignment='center' onSuccess={handleOnSuccess} onError={handleOnError} /> */}
                        <GoogleLogin />
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
                                Log In
                            </button>
                            <Link to="forgot-password" style={{ color: '#90998b' }} className='text-decoration-underline hover-text'>Forgot password?</Link>
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