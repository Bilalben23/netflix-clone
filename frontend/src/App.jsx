import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import AuthLayout from './components/AuthLayout';
import Footer from './components/Footer';
import PersistLogin from './components/PersistLogin';
import RedirectAuthenticatedRoute from './components/RedirectAuthenticatedRoute ';
import HomeScreen from './pages/home/HomeScreen';
import ProtectedRoute from './components/ProtectedRoute';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Protected Home (only for authenticated users) */}
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomeScreen />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/movies' element={<h1>Movies goes here...</h1>} />

              {/* protected routes goes here... */}
            </Route>

          </Route>

          <Route element={<RedirectAuthenticatedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
            </Route>
          </Route>

        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
