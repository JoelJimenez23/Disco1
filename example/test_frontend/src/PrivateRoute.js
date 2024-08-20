import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from './AuthService';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={getToken() ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
