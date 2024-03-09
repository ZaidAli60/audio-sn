import React from 'react'

export default function Footer() {
    return (
        <footer className={`container-fluid text-center footer`}>
            <div className='mb-5'>
                <p className='fontFamily fw-bold mb-1' style={{ fontSize: "1rem" }} >Powered by <a href="https://firsttensor.com/" target="_blank" rel="noopener noreferrer"> <img src={`${window.footerLogoDark}`} className='img-fluid' style={{ width: "130px", verticalAlign: "baseline" }} alt={window.appName} /></a> </p>
                <p className='fontFamily mb-1'>To show support, please consider delegating TAO to FirstTensor.</p>
                <p className={`mb-1 fontFamily`}>Copyright &copy; {window.year} <span><a className='text-decoration-none' href="https://bittensorstaking.com" target="_blank" rel="noopener noreferrer"> BittensorStaking.com </a></span></p>
            </div>
        </footer>
    )
}
