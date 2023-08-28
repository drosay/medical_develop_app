import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import { COLORS } from "../../constants/constants";
import { makeAppointment } from "../../services/data.service";
import { timeOptions } from "../../constants/items";

import "./datepicker.css";

function AppointmentForm({ action }) {
  const {
    authData: { data },
  } = useAuthContext();

  const [specialties, setSpecialties] = useState({});
  const [doctors, setDoctors] = useState([]);

  const defaultValues = {
    patient_id: data?.user?.id,
    doctor_id: 0,
    specialty_id: 0,
    date: "",
    time: "06:00",
    observation: "",
  };

  const [values, setValues] = useState(defaultValues);

  //SPECIALTY useEffect
  useEffect(() => {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/specialty`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSpecialties(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //DOCTORS useEffect
  useEffect(() => {
    const doctors = () => {
      setValues((prev) => {
        return { ...prev, doctor_id: 0 };
      });

      axios({
        method: "get",
        url: `http://127.0.0.1:8000/api/users/specialty/${values.specialty_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setDoctors(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    values.specialty_id !== 0 && doctors();
  }, [values.specialty_id]);

  const handleChange = (e) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doAppointment();
  };

  const doAppointment = async () => {
    try {
      await makeAppointment(values);
      action(false);
    } catch (err) {
      //TOAST
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        pt: 2,
      }}
    >
      {/* SPECIALITIES */}
      <FormControl fullWidth>
        <InputLabel id="specialty">Especialidad</InputLabel>
        <Select
          labelId="specialty"
          value={values.specialty_id}
          label="Especialidad"
          name="specialty_id"
          onChange={handleChange}
        >
          <MenuItem value={0}>seleccione</MenuItem>
          {Object.values(specialties).map((specialty) => (
            <MenuItem key={specialty.id} value={specialty.id}>
              {specialty.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* DOCTORS */}
      <FormControl fullWidth>
        <InputLabel id="doctors">Especialista</InputLabel>
        <Select
          labelId="doctors"
          value={values.doctor_id}
          label="Especialista"
          name="doctor_id"
          onChange={handleChange}
          defaultValue={0}
        >
          <MenuItem value={0}>seleccione</MenuItem>
          {doctors.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* DATE */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        <input
          id="date"
          type="date"
          name="date"
          min="2023-08-28"
          onChange={handleChange}
          className="datePicker"
        />
        <FormControl sx={{ width: { xs: "100%", sm: "200px" } }}>
          <InputLabel id="hour">Hora</InputLabel>
          <Select
            labelId="hour"
            value={values.time}
            label="Hora"
            name="time"
            onChange={handleChange}
          >
            {timeOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/*OBSERVATIONS */}
      <FormControl fullWidth>
        <TextField
          required
          multiline
          maxRows={3}
          id="outlined"
          label="Observaciones"
          name="observation"
          onChange={handleChange}
          value={values.observation}
        />
      </FormControl>

      <Button
        variant="contained"
        type="submit"
        sx={{ backgroundColor: COLORS.primary, fontWeight: "bold" }}
      >
        Agendar Cita
      </Button>
    </Box>
  );
}

export default AppointmentForm;
