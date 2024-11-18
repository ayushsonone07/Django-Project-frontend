import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {

  const token = Cookies.get('accessToken')


  return token ? <Outlet /> : <Navigate to={'/login'} replace />

};

export default ProtectedRoute;
