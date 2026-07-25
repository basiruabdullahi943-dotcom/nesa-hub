import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

  const isAdmin =
    localStorage.getItem("adminLoggedIn");

  if (isAdmin !== "true") {

    return <Navigate to="/admin-login" />;

  }

  return children;
}

export default AdminRoute;