import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { COLORS } from "../constants/constants";
import AppointmentForm from "../components/Appointment/AppointmentForm";
import AppointmentsTable from "../components/Appointment/AppointmentsTable";

function PortalPatients() {
  const [open, setOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const { authData } = useAuthContext();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/appointment/patient/${authData?.data?.user?.id}`,
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
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component="section">
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: COLORS.secondary,
          color: "white",
          ":hover": {
            backgroundColor: COLORS.primary,
          },
        }}
        endIcon={<Add />}
      >
        Agendar nueva cita
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{ minHeight: "600px" }}
      >
        <DialogTitle>Agendar Cita</DialogTitle>
        <DialogContent sx={{ height: "500px", padding: 5 }}>
          <AppointmentForm action={setOpen} />
        </DialogContent>
      </Dialog>
      <AppointmentsTable appointments={appointments} />
    </Box>
  );
}

export default PortalPatients;
