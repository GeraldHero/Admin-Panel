import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/layouts/myNavbar/MyNavbar';
import MyLoading from './components/layouts/myLoader/MyLoader';
const MyLogin = lazy(() => import('./pages/MyLogin'));
const MyHomePage = lazy(() => import('./pages/MyHomePage'));

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Suspense fallback={<MyLoading />}>
        <Routes>
          <Route path="/" element={<MyHomePage />}></Route>
          <Route path="/login" element={<MyLogin />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
