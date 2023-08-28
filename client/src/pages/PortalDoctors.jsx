import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { AppointmentsDoctorsTable } from "../components/Appointment/AppointmentsTable";

function PortalDoctors() {
  const { authData } = useAuthContext();
  const [appointments, setAppointments] = useState([]);
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/appointment/doctor/${authData?.data?.user?.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dummy]);

  return (
    <Box component="section">
      <AppointmentsDoctorsTable
        appointments={appointments}
        reRender={setDummy}
      />
    </Box>
  );
}

export default PortalDoctors;
