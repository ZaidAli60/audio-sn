import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Frontend from './Frontend'
import Authentication from './Authentication'


export default function Index() {
    return (
        <Routes>
            <Route path='/*' element={<Frontend />} />
            <Route path='/auth/*' element={<Authentication />} />
        </Routes>
    )
}
