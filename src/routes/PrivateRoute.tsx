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
    // Sin token: redirigir a login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(rol)) {
    // Con token pero rol no permitido: redirigir a home
    return <Navigate to="/" replace />;
  }

  // Token y rol permitidos: renderizar componente
  return children;
};

export default PrivateRoute;
