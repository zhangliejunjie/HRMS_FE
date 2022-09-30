import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Router from './routes';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth } from './store/reducers/userSlice';
import { auth } from './store/reducers/userSlice'
const theme = createTheme({
  overrides: {
    MuiInputLabel: {
      filled: {
        transform: "translate(12px, 10px) scale(0.75)",
        "&$marginDense": {
          transform: "translate(12px, 7px) scale(0.75)"
        }
      },
      outline: {
        transform: "translate(14px, -6px) scale(0.75)"
      }
    }
  }
});
function App() {

  const member = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(() => {
    let data = localStorage.getItem('persist:root')
    data = JSON.parse(data);
    const userDispatch = JSON.parse(data.user)
    console.log(userDispatch);
    dispatch(auth(userDispatch))
  }, [dispatch])


  return (


    <>
      <Header />
      <Router />
    </>

  )
}

export default App
