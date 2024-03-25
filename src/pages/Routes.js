import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Frontend from './Frontend'
import Authentication from './Authentication'
import { useAuthContext } from 'context/AuthContext'


export default function Index() {
    const { isAuthenticated } = useAuthContext()
    return (
        <Routes>
            <Route path='/*' element={<Frontend />} />
            {/* <Route path='/auth/*' element={<Authentication />} /> */}
            <Route path='/auth/*' element={!isAuthenticated ? <Authentication /> : <Navigate to="/generate" replace />} />
        </Routes>
    )
}
