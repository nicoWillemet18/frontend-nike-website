import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol") || "";
  const location = useLocation();

  const rutasProhibidasParaAdmin = ["/", "/login", "/sign-up"];

  if (token && rol === "ADMIN" && rutasProhibidasParaAdmin.includes(location.pathname)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default PublicRoute;
