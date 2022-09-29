import React from 'react'
import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from './pages/Home'
import Access from './pages/Access';
import Job from './pages/Job';
import Dashboard from './pages/Dashboard';
import AuthGuard from './hoc/AuthGuard';
import PrivateRoute from './hoc/PrivateRoute';
export default function Router() {

    const member = useSelector(state => state.user)
    console.log(member);
    const element = useRoutes([
        {
            path: '/',
            element: < Home />
        },
        {
            path: '/auth',
            element: < Access />
        },
        {
            path: '/job',
            element: <Job />
        },
        {
            element: <PrivateRoute />,
            children: [
                {
                    path: '/profile',
                    element: <Dashboard />
                }
            ]
        }
    ])
    const location = useLocation();

    if (!element) return null;

    return (
        <AnimatePresence mode="wait" initial={false}>
            {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    )
}