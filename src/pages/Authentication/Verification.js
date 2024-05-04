import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";
import video from 'assets/video/vid_sub.mp4'
import axios from 'axios';
import { Button } from 'antd';
import { useAuthContext } from 'context/AuthContext';

const SERVER_URL = process.env.REACT_APP_API_END_POINT
const initialState = { verification_code: "" }

export default function Verification() {
    const { dispatch } = useAuthContext()
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false)
    const [token, setToken] = useState("")

    const readData = async () => {
        let query = new URLSearchParams(window.location.search)
        let oobCode = query.get("token")
        setToken(oobCode)
    }

    useEffect(() => {
        readData()
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleVerification = e => {
        e.preventDefault()
        let { verification_code } = state
        setIsProcessing(true)

        axios.post(`${SERVER_URL}/api/verification`, { verification_code, token })
            .then(res => {
                let { data, status } = res
                if (status === 200) {
                    localStorage.setItem("jwt", JSON.stringify({ token: data.access_token }));
                    const isSuperAdmin = data.user_info.roles.includes("superAdmin")
                    const isCustomer = data.user_info.roles.includes("customer")
                    dispatch({ type: "SET_LOGGED_IN", payload: { user: { ...data }, isCustomer, isSuperAdmin } })
                    setState(initialState)
                    setIsProcessing(false)
                    window.toastify(data.message, "success")
                }
            })
            .catch(err => {
                // if (err?.response?.data.detail === "Invalid token") {
                //     window.toastify("Invalid token", "error")
                // } else {
                //     window.toastify("Verification code is incorrect", "error")
                // }
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
                        <h4>Verification
                        </h4>
                        <p className='m-0 p-0 mb-4' style={{ color: '#90998b' }}>Enter your verification code.</p>
                        <div className='input-form'>
                            <div className='floating-label-content'>
                                <input className='floating-input' value={state.verification_code} onChange={handleChange} name='verification_code' type='text' placeholder=' ' />
                                <label className='floating-label'>Code</label>
                            </div>
                            <Button type="primary" className="w-100" style={{ fontWeight: '500', fontSize: '18px' }} size='large' shape='round' onClick={handleVerification} loading={isProcessing}>Verify</Button>
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
