import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/configureStore";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, accessToken } = useSelector((state: RootState) => state.login); 
  // 👆 make sure you reference the correct slice (auth vs login)

  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
