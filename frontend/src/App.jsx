import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import AuthLayout from './components/AuthLayout';
import PersistLogin from './components/PersistLogin';
import RedirectAuthenticatedRoute from './components/RedirectAuthenticatedRoute ';
import HomeScreen from './pages/home/HomeScreen';
import ProtectedRoute from './components/ProtectedRoute';
import Watch from './pages/Watch';
import SearchHub from './pages/SearchHub';
import SearchHistory from './pages/SearchHistory';
import NotFound from './pages/NotFound';
import Trending from './pages/Trending';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Protected Home (only for authenticated users) */}
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomeScreen />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/search" element={<SearchHub />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/history" element={<SearchHistory />} />

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

        {/* NotFound Route (Catch-All) */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
