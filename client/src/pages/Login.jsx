import { useEffect, useState } from "react";
import { Box, TextField, Button, FormControl, Paper, Typography } from "@mui/material";
import { COLORS } from "../constants/constants";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const defaultValues = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(defaultValues);
  const {
    signIn,
    authData: { isAuthenticated },
    setAuthData,
  } = useAuthContext();

  useEffect(() => {
    isAuthenticated && navigate("/portal");
    const data = JSON.parse(localStorage.getItem("user"));
    if (data?.isAuthenticated) {
      setAuthData(data);
      navigate("/portal");
    }
  }, []);

  const handleChange = (e) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin();
    //TOAST
  };

  const doLogin = async () => {
    try {
      await signIn(values);
      navigate("/portal");
    } catch (err) {
      //TOAST
      console.log(err);
    }
  };
  return (
    <Paper sx={{ height: "300px", width: "300px" , mx:"auto",mt:5}}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "inherit",
          width: "inherit",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Inicia sesión</Typography>
        <FormControl>
          <TextField
            required
            id="outlined-required"
            label="Correo"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: COLORS.primary, fontWeight: "bold" }}
        >
          Ingresar
        </Button>
      </Box>
    </Paper>
  );
}

export default Login;
