import { Button } from 'antd'
import React from 'react'
import WaveSoundL from '../../../assets/images/wave-sound-left.svg'
import WaveSoundR from '../../../assets/images/wave-sound-right.svg'
import { useNavigate } from 'react-router-dom'


export default function Hero() {
    let navigate = useNavigate()
    return (
        <div className={`home dashboard bg-dark min-vh-100 position-relative d-flex justify-content-center align-items-center`}>
            <video autoPlay loop muted className="position-absolute top-0 left-0 w-100 h-100" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}>
                <source src="https://res.cloudinary.com/dufkxmegs/video/upload/v1714826019/api_lp_rev_r09f1p.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="position-relative z-index-1 text-center text-white d-flex flex-column">
                <div className='text-uppercase' style={{ fontWeight: '700', fontSize: '60px' }}>create music</div>
                <div style={{ fontWeight: '500', fontSize: '24px', marginBottom: 25 }}>with</div>
                <div style={{ fontWeight: '700', fontSize: '46px', border: '1px solid #fff', borderRadius: 12, margin: '0 auto', marginBottom: 25, padding: '5px 20px' }}>AI</div>
                <div style={{ fontWeight: '500', fontSize: '24px', marginBottom: 5 }}>Powered by Bittensor</div>
                <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: 25 }}>Subnet X</div>
                <Button style={{
                    background: '#299898',
                    fontWeight: '500',
                    fontSize: '18px',
                    margin: '0 auto',
                    padding: '14px 24px',
                    gap: 8
                }}
                    size='large' type='primary'
                    className="d-flex justify-content-center align-items-center text-white"
                    onClick={() => navigate('/generate')}
                >
                    <img src={WaveSoundL} alt="" />
                    <span>Create</span>
                    <img src={WaveSoundR} alt="" />

                </Button>
            </div>
        </div>
    )
}
