import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function PrivateRoutes() {
    const {authData:{isAuthenticated}} = useAuthContext();
  return (
    isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>
  )
}

export default PrivateRoutes