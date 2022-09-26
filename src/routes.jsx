import React from 'react'
import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";


import Home from './pages/Home'
import Access from './pages/Access';
export default function Router() {
    const element = useRoutes([
        {
            path: '/',
            element: < Home />
        },
        {
            path: '/auth',
            element: < Access />
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