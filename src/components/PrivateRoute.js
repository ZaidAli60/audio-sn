import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import InsufficientPermission from 'pages/Misc/InsufficientPermission'
import { useAuthContext } from 'context/AuthContext'

export default function PrivateRoute(props) {

    const { user, isAuthenticated } = useAuthContext()
    const location = useLocation()
    const { Component, allowedRoles = [] } = props

    if (!isAuthenticated)
        return <Navigate to="/" state={{ from: location }} replace />

    if (!allowedRoles.length || user.user_info.roles.find(role => allowedRoles.includes(role)))
        return <Component />
    return <InsufficientPermission />
}
