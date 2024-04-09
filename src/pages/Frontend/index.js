import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
// import Navbar from 'components/frontend/Navbar'
import Home from './Home'
import { Content } from 'antd/es/layout/layout'
import { Layout } from 'antd'
// import Footer from 'components/frontend/footer/Footer'
import Generate from './Generate/Generate'
import { useAuthContext } from 'context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Index() {
    const { isAuthenticated } = useAuthContext()
    console.log('isAuthenticated', isAuthenticated)
    return (
        <Layout>
            {/* <Navbar /> */}
            <Content>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/generate' element={!isAuthenticated ? <Navigate to="/auth" replace /> : <Generate />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Content>
            {/* <Footer /> */}
        </Layout>
    )
}
