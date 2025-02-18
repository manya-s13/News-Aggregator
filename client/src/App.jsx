import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Signin from './pages/Signin.jsx';
import SignUp from './pages/Signup.jsx';
import Home from './pages/Home.jsx';


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
