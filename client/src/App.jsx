import { CssBaseline, Toolbar } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/login";
import Register from "./pages/Register";
import Portal from "./utils/Portal";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <CssBaseline />
          <Header />
          <Toolbar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/portal" element={<Portal />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

// const Redirect = () =>{
//   return <Navigate to="/" replace={true}/>
// }
