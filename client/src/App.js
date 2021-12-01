import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import MyLoading from './components/layouts/MyLoader';
const MyLogin = lazy(() => import('./pages/MyLogin'));
const MyHomePage = lazy(() => import('./pages/MyHomePage'));
function App() {
  return (
    <Suspense fallback={<MyLoading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyHomePage />}></Route>{' '}
          <Route path="/login" element={<MyLogin />}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
