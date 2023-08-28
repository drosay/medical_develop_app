import { useState, useContext, createContext, useMemo } from "react";
import axios from "axios";

const URI = "http://127.0.0.1:8000/api/auth";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authData, setAuthData] = useState({
    data: {},
    isAuthenticated: false,
  });

  const signIn = ({ username, password }) => {
    const data = { username, password };
    return axios({
      method: "post",
      url: `${URI}/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    })
      .then((res) => {
        if (res?.data?.access_token) {
          setAuthData({ data: res.data, isAuthenticated: true });
          localStorage.setItem(
            "user",
            JSON.stringify({ data: res.data, isAuthenticated: true })
          );
        } else {
          setAuthData((prev) => ({ ...prev, isAuthenticated: false }));
        }
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

  const logOut = () => {

    if (authData?.data?.access_token) {
      const token = authData.data.access_token;

      axios({
        method: "post",
        url: `${URI}/logout`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setAuthData({ data: {}, isAuthenticated: false });
          localStorage.removeItem('user')
          return true;
        })
        .catch((e) => {
          return null;
        });
    }
  };

  const value = useMemo(
    () => ({
      signIn,
      signUp,
      logOut,
      authData,
      setAuthData,
    }),
    [authData]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  return context ? context : "You must be inside the AuthContext provider";
}

export { AuthProvider, useAuthContext };
