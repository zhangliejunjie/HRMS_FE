import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Router from './routes';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth } from './store/slice/userSlice';

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
    dispatch(userIsAuth())
  }, [dispatch])


  return (


    <>
      <Header member={member} />
      <Router />
    </>

  )
}

export default App
