import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import Navbar from 'components/frontend/Navbar'
import Home from './Home'
import { Content } from 'antd/es/layout/layout'
import { Layout } from 'antd'
import Footer from 'components/frontend/footer/Footer'

export default function Index() {
    return (
        <Layout>
            <Navbar />
            <Content>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Content>
            <Footer />
        </Layout>
    )
}
