import React from 'react'

export default function Footer() {
    return (
        <footer className={`container-fluid px-xxl-3 px-lg-4text-center footer bg-dark`}>
            <div className="px-xxl-5 custom-lg-padding custom-xxl-padding">
                <div className="border-0 bg-dark text-white">
                    <div className="row mb-4 py-5">
                        <div className="col-md-4 col-sm-4 col-xs-4 mb-4">
                            <div className="footer-text text-center">
                                <div className="d-flex">
                                    {/* <img src={`${window.logo}`} className='img-fluid me-lg-5 me-auto' style={{ width: "170px", height: "auto" }} alt="Audio" /> */}
                                    <h1>Logo</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2"></div>
                        <div className="col-md-2 col-sm-2 col-xs-2 mb-4">
                            <h5 className="heading">Company</h5>
                            <div className='d-flex flex-column'>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> About</a>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> Terms of services</a>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> Privacy Policy</a>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2 mb-4">
                            <h5 className="heading">Resources</h5>
                            <div className='d-flex flex-column'>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> User guide</a>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> FAQs</a>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2">
                            <h5 className="heading">Socials</h5>
                            <div className='d-flex flex-column'>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> Twitter</a>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> Discord</a>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> Instagram</a>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> SoundCloud</a>
                                <a href="http://" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-white'> Join newsletters</a>
                            </div>
                        </div>
                    </div>
                    <div className="divider mb-4"> </div>
                    <div className="row" >
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="pull-left">
                                <p>Copyright &copy; {window.year} - All rights reserved</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <div className="pull-right mr-4 d-flex policy">
                                <div>Terms of Use</div>
                                <div>Privacy Policy</div>
                                <div>Cookie Policy</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
