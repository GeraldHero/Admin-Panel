import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import setAuthToken from './reduxConfig/utils/setAuthToken';
import MyNavbar from './components/layouts/myNavbar/MyNavbar';
import MyLoader from './components/myLoader/MyLoader';
import { MyFooter } from './components/layouts/myFooter/MyFooter';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';
const MyLogin = lazy(() => import('./pages/MyLogin'));
const MyHomePage = lazy(() => import('./pages/MyHomePage'));
const MyDashboard = lazy(() => import('./pages/MyDashboard'));

function App() {
  if (localStorage.getItem('userInfo')) {
    const item = JSON.parse(localStorage.getItem('userInfo'));
    setAuthToken(item.token);
  }
  return (
    <BrowserRouter>
      <MyNavbar />
      <main>
        <Suspense fallback={<MyLoader />}>
          <Routes>
            <Route path="/login" element={<MyLogin />}></Route>
            <Route path="/" element={<MyHomePage />}></Route>
            <Route exact path="/dashboard" element={<PrivateRoute />}>
              <Route exact path="/dashboard" element={<MyDashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
