
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/configureStore";

interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: Array<"Admin" | "Editor" | "Viewer">;
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, accessToken } = useSelector((state: RootState) => state.login); 
  // 👆 adjust slice name if your reducer is under `auth`

  // If not logged in, redirect to login
  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but role not allowed, redirect to unauthorized page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
