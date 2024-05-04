import Home from './Home/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function Index() {
    return (
        <div className='dashboard'>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    )
}
