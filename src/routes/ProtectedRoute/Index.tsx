import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  isPublic?: boolean;
  isAuthorized: boolean;
};
const ProtectedRoute = ({ isPublic, isAuthorized }: ProtectedRouteProps) => {
  return isPublic || isAuthorized ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/login" />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
