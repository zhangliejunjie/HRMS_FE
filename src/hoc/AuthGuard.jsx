import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

import { useNavigate } from "react-router-dom";


const AuthGuard = (ComposedComponent) => {
    let navigate = useNavigate();

    const AuthenticationCheck = (props) => {
        console.log(props);
        const [isAuth, setIsAuth] = useState(false)
        const user = useSelector(state => {
            console.log(state);
            return state.user
        })
        useEffect(() => {
            if (!user.auth) {
                navigate("/");

            } else {
                setIsAuth(true)
            }
        }, [props, user])
        if (!isAuth) {
            return <Loader />
        } else {
            return <ComposedComponent member={user} {...props} />
        }
    }

    return (
        AuthenticationCheck
    )
}

export default AuthGuard