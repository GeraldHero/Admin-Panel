import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/layouts/myNavbar/MyNavbar';
import MyLoader from './components/myLoader/MyLoader';
import { MyFooter } from './components/layouts/myFooter/MyFooter';
import './App.css';

const MyLogin = lazy(() => import('./pages/MyLogin'));
const MyHomePage = lazy(() => import('./pages/MyHomePage'));

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <main>
        <Suspense fallback={<MyLoader />}>
          <Routes>
            <Route path="/" element={<MyHomePage />}></Route>
            <Route path="/login" element={<MyLogin />}></Route>
          </Routes>
        </Suspense>
      </main>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
