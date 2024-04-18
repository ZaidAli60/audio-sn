import { Button } from 'antd'
import React from 'react'
import { FaMusic } from "react-icons/fa6";

export default function Hero() {
    return (
        <div className={`home dashboard bg-dark min-vh-100 position-relative d-flex justify-content-center align-items-center`}>
            <video autoPlay loop muted className="position-absolute top-0 left-0 w-100 h-100" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}>
                <source src="https://www.loudly.com/wp-content/uploads/2023/10/api_lp_rev.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="position-relative z-index-1 text-center text-white">
                <h1 className='text-uppercase text-bold' style={{ fontWeight: "bold" }}>create music with <br />AI</h1>
                <p>Powered by Bittensor</p>
                <p>Subnet X</p>
                <Button size='large' type='primary' className='text-dark' ><span className='me-1'>Create</span> <FaMusic /></Button>
            </div>
        </div>
    )
}
