import { useState } from 'react'
import Header from './components/Header'
import Router from './routes';

import { createTheme, ThemeProvider } from "@mui/material/styles";

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




  return (


    <>
      <Header />
      <Router />
    </>

  )
}

export default App
