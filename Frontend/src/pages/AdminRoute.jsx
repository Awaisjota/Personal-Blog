import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthrole } from "../features/authSlice";

const AdminRoute = ({ children }) => {
  const role = useSelector(selectAuthrole);

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
