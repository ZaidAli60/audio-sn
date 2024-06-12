import React from 'react'

export default function ScreenLoader() {
    return (
        <div className='bg-dark text-white  d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <img src={`${window.logoLight}`}
                className='img-fluid'
                style={{ width: "150px", height: "auto" }}
                alt="Audio" />
        </div>
    );

}
