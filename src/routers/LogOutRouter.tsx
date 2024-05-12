import React from 'react';
import { Login } from '../pages/Login';

interface ILoginStatus {
  handleLoginStatus: (type: boolean) => void;
}

export const LogOutRouter: React.FC<ILoginStatus> = ({ handleLoginStatus }) => {
  return <Login handleLoginStatus={handleLoginStatus} />;
};
