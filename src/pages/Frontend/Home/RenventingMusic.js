import React from 'react'
import reinventingicon from "assets/images/reinventing-icon.png"
import { Typography } from 'antd'
import uidesktopImg from "assets/images/ui-example-desktop.png"

const { Title } = Typography

export default function RenventingMusic() {
    return (
        <div className="py-5">
            <div className="py-5">
                <div className='py-5 text-center'>
                    <div className="">
                        <img src={reinventingicon} className='img-fluid mb-4' width="100px" alt="img" />
                        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                            <Title>Reinventing how we create music.</Title>
                        </div>
                        <div className="d-flex justify-content-center gap-2">
                            <span className='border border-dark rounded-4 px-3'>
                                Text-2-Audio
                            </span>
                            <span className='border border-dark rounded-4 px-3'>
                                Audio-2-Audio
                            </span>
                        </div>
                        <div className='py-5'>
                            <img src={uidesktopImg} className='img-fluid' alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
