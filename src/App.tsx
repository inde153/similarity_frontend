import React, { useState } from 'react';
import './tailwind.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { useEffect } from 'react';
import client from './api';
import { Profile } from './pages/Profile';
import { LogOutRouter } from './routers/LogOutRouter';
import { LogInRouter } from './routers/LogInRouter';
import { requestURL } from './api/requests';
import { PrivateRoute } from './components/PrivateRoute';
const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  const [loginStatus, setLoginStatus] = useState(Boolean(localStorage.getItem('u_info')));

  const handleLoginStatus = (type: boolean): void => {
    setLoginStatus(type);
  };

  useEffect(() => {
    if (!loginStatus) {
      client
        .get(requestURL.refresh)
        .then((res) => {
          if (res.data) {
            localStorage.setItem('u_info', JSON.stringify(res.data));
            setLoginStatus(true);
          }
        })
        .catch((e) => {
          if (loginStatus) {
            localStorage.removeItem('u_info');
            setLoginStatus(false);
          }
        });
    }
  }, [loginStatus]);

  const routers = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          index: true,
          element: loginStatus ? <LogInRouter /> : <LogOutRouter handleLoginStatus={handleLoginStatus} />,
        },
        {
          path: '/profile',
          element: <PrivateRoute Component={Profile} loginStatus={loginStatus} />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
