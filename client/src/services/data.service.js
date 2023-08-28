import axios from "axios";

const URI = "http://127.0.0.1:8000/api/appointment/";

export const makeAppointment = ({
  patient_id,
  doctor_id,
  specialty_id,
  date,
  time,
  state = "Pendiente por confirmar",
  observation,
}) => {
  const data = {
    patient_id,
    doctor_id,
    specialty_id,
    date: `${date} ${time}`,
    state,
    observation,
  };

  return axios({
    method: "post",
    url: `${URI}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return null;
    });
};

const signUp = ({ fullname, username, password }) => {
  const data = {
    fullname,
    username,
    password,
    password_confirmation: password,
    role_id: 1,
    specialty_id: 1,
  };

  return axios({
    method: "post",
    url: `${URI}/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((res) => {
      if (res?.data?.access_token) {
        setAuthData((prev) => ({ ...prev, isAuthenticated: false }));
      }
      return true;
    })
    .catch((e) => {
      return null;
    });
};

export const getSpecialties = () => {
  axios({
    method: "get",
    url: `${URI}/specialty`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return null;
    });
};
