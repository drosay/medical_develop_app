import PortalPatients from "../pages/PortalPatients";
import PortalDoctors from "../pages/PortalDoctors";
import { useAuthContext } from "../context/authContext";
import { useEffect } from "react";

function Portal() {
  const {
    authData: { data },
    setAuthData,
  } = useAuthContext();

  useEffect(() => {
  }, []);

  return data?.user?.role_id === 1 ? <PortalPatients /> : <PortalDoctors />;
}

export default Portal;
