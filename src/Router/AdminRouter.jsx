import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { userRole, isPending } = useRole();

  if ((loading, isPending)) {
    return <Loading></Loading>;
  }

  if (user && userRole.userRole === "Admin") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRouter;
