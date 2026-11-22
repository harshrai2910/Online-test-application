import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "./loader";

export const ProtectedRoute = ({ isLoggedIn, authLoading }) => {
  const location = useLocation();

  if (authLoading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
