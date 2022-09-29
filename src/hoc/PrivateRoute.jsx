import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoute = () => {
    const user = useSelector(state => state.user)
    alert(user.auth)
    return (
        user.auth ? <Outlet /> : <Navigate to='/auth' />
    )
}

export default PrivateRoute