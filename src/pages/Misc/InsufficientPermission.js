import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { Typography } from 'antd'
const { Title } = Typography;

export default function InsufficientPermission() {

    const location = useLocation()

    const dashboardRoutes = location.pathname.indexOf("/dashboard") !== -1

    if (dashboardRoutes)
        return <div className="container">
            <div className="row">
                <div className="col-12 col-md-10 offset-md-1">
                    <div className="card p-3 p-md-4 text-center">
                        <Title level={2} className="mb-0 text-primary">You don't have permission to access this pages.</Title>
                    </div>
                </div>
            </div>
        </div>

    return (
        <main className='d-flex justify-content-center align-items-center bg-primary'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card p-3 p-md-4 text-center">
                            <Title level={2} className="mb-0 text-primary">You don't have permission to access this page.</Title>
                            <Link to={-1} className="btn btn-primary mt-4">Go Back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
