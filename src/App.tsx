import React from 'react';
import './tailwind.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { useEffect } from 'react';
import { client } from './api';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const res = client.get('auth/refresh');
  }, []);

  return <RouterProvider router={routers} />;
}

export default App;
