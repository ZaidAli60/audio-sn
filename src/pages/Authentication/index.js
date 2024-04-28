import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import Register from './Register'
import RestPassword from './RestPassword'
import Verification from './Verification'

export default function index() {
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='rest-password' element={<RestPassword />} />
                <Route path='verification' element={<Verification />} />
            </Route>
        </Routes>
    )
}
