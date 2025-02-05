import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Layout from './components/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
