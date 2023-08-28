import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import axios from "axios";
import { COLORS } from "../../constants/constants";
import { useAuthContext } from "../../context/authContext";

const AppointmentsTable = ({ appointments }) => {
  return appointments && appointments.length !== 0 ? (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 3, px: 2 }}>
        <Typography variant="h5">Citas programadas</Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Observación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.specialty.name}</TableCell>
                  <TableCell>{appointment.doctor.fullname}</TableCell>
                  <TableCell>{appointment.state}</TableCell>
                  <TableCell>{appointment.observation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  ) : (
    <Typography variant="h4">No tienes citas programadas</Typography>
  );
};

export const AppointmentsDoctorsTable = ({ appointments, reRender }) => {
  const updateAppointment = (id) => {
    axios({
      method: "put",
      url: `http://127.0.0.1:8000/api/appointment/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ state: "Confirmada" }),
    })
      .then((res) => {
        reRender((prev) => !prev);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return appointments && appointments.length !== 0 ? (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 3, px: 2 }}>
        <Typography variant="h5">Citas programadas</Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Observación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {new Date(appointment.date).toLocaleString()}
                  </TableCell>
                  <TableCell>{appointment.patient.fullname}</TableCell>
                  <TableCell>{appointment.patient.username}</TableCell>
                  <TableCell>
                    {appointment.state}
                    {appointment.state === "Pendiente por confirmar" && (
                      <IconButton
                        size="small"
                        sx={{ backgroundColor: COLORS.primary, color: "white" }}
                        name="j"
                        onClick={() => {
                          updateAppointment(appointment.id);
                        }}
                      >
                        <Check />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>{appointment.observation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  ) : (
    <Typography variant="h4">No tienes citas programadas</Typography>
  );
};

export default AppointmentsTable;
