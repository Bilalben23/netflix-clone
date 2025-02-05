import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AuthLayout from './components/AuthLayout';
import HomeScreen from './pages/home/HomeScreen';
import Footer from './components/Footer';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<HomeScreen />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
