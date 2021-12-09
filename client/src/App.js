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
const MyDashboardCompanies = lazy(() =>
  import('./controllers/myDashboardCompanies/MyDashboardCompanies')
);
const MyDashboardEmployees = lazy(() =>
  import('./controllers/myDashboardEmployees/MyDashboardEmployees')
);
const MyDashboardProfile = lazy(() =>
  import('./controllers/myDashboardProfile/MyDashboardProfile')
);
const MyDashboardAdmin = lazy(() =>
  import('./controllers/myDashboardAdmin/MyDashboardAdmin')
);

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
            <Route path="/d" element={<MyHomePage />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MyDashboard />}>
                <Route path="/company" element={<MyDashboardCompanies />} />
                <Route path="/employee" element={<MyDashboardEmployees />} />
                <Route path="/profile" element={<MyDashboardProfile />} />
                <Route path="/admin" element={<MyDashboardAdmin />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </main>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
