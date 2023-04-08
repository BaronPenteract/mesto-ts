import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteType = {
  element: React.ComponentType<any>;
  loggedIn: boolean;
  props: {};
};

const ProtectedRoute: React.FC<ProtectedRouteType> = ({ element: Component, loggedIn, props }) => {
  return <>{loggedIn ? <Component {...props} /> : <Navigate to="/sing-up" replace />}</>;
};

export default ProtectedRoute;
