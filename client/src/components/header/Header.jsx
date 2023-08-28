import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderDrawer from "./HeaderDrawer";
import { COLORS } from "../../constants/constants";
import hero from "../../assets/hero.png";
import { menuItems } from "../../constants/items";
import { useAuthContext } from "../../context/authContext";

export default function Header() {
  const [active, setActive] = useState(false);
  const {
    logOut,
    authData: { isAuthenticated },
  } = useAuthContext();

  const handleDrawerToggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ backgroundColor: "white" }} elevation={1}>
        <Toolbar>
          <img src={hero} style={{ height: "35px" }} />
          <Typography
            variant="h4"
            sx={{
              flexGrow: { xs: 1, sm: 0 },
              fontSize: { xs: "1.5rem", sm: "2.4rem" },
              fontWeight: "bold",
              ml: 2,
            }}
            color={COLORS.secondary}
          >
            Neural Connection
          </Typography>
          {/* MENU DESKTOP*/}
          <Box sx={{ display: { xs: "none", sm: "block" }, ml: "auto" }}>
            {isAuthenticated ? (
              <Button
                variant="text"
                sx={{ color: COLORS.text_primary, fontWeight: "bold" }}
                onClick={logOut}
              >
                Logout
              </Button>
            ):(
              menuItems.map((item, index) => (
                <Link
                  key={index}
                  style={{
                    color: COLORS.text_primary,
                    fontWeight: "bold",
                    textDecoration: "none",
                    margin: "10px",
                  }}
                  to={item.to}
                >
                  {item.text}
                </Link>
              ))
            ) }
          </Box>
          {/* BURGUER MENU */}
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" }, color: COLORS.secondary }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <HeaderDrawer handleDrawerToggle={handleDrawerToggle} active={active} />
      </Box>
    </Box>
  );
}
