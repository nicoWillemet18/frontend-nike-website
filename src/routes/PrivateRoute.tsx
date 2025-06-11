import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol") || "";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
