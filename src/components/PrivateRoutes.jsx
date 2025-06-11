import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
// This component checks if the user is authenticated. If not, it redirects to the login page. Otherwise, it renders the children components.
// This is useful for protecting routes that should only be accessible to authenticated users, such as creating a post or viewing user-specific content.