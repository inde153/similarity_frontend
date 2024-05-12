import React, { Component, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface IPrivateRoute {
  Component: any;
  loginStatus: boolean;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ Component, loginStatus }) => {
  return loginStatus ? <Component /> : <Navigate to="/" />;
};
