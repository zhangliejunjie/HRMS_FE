import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth } from './store/reducers/userSlice';
import { auth } from './store/reducers/userSlice'
import { showToast } from './utils/tool'
function App() {
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()
  useEffect(() => {
    if (notification && notification.error) {
      const msg = notification.message ? notification.message : 'Error'
      showToast('error', msg)
      // dispatch(clearNotification())
    }
    if (notification && notification.success) {
      const msg = notification.message ? notification.message : 'Good job !!!'
      showToast('success', msg)
      // dispatch(clearNotification())
    }
  }, [notification, dispatch])



  return (


    <>
      <Header />
      <Router />
      <ToastContainer />

    </>

  )
}

export default App
