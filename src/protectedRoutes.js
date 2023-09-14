import useUser from "./functions/store";
import { Outlet } from "react-router-dom";
import Login from "./components/auth/login";


function ProtectedRoutes() {
  const user = useUser((state) => state.user)
  if (user) {
    return <Outlet />;
  }
  return <Login/>
}

export default ProtectedRoutes;
