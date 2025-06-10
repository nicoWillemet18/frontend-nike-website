import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol") || "";
  const location = useLocation();

  // Rutas públicas que ADMIN no puede visitar
  const rutasProhibidasParaAdmin = ["/", "/login", "/sign-up"];

  if (token && rol === "ADMIN" && rutasProhibidasParaAdmin.includes(location.pathname)) {
    // Admin logueado intenta entrar a ruta pública prohibida → redirigir a /admin
    return <Navigate to="/admin" replace />;
  }

  // Para cliente o no logueado no bloqueamos nada en rutas públicas (cliente puede entrar a login y sign-up)
  return children;
};

export default PublicRoute;
