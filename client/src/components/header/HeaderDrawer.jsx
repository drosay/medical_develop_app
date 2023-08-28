import { Fragment } from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { COLORS } from "../../constants/constants";
import { menuItems } from "../../constants/items";
import { useAuthContext } from "../../context/authContext";

export default function HeaderDrawer({ handleDrawerToggle, active }) {
  const {
    logOut,
    authData: { isAuthenticated },
  } = useAuthContext();

  const drawer = (
    <Box
      onClick={() => {
        handleDrawerToggle();
      }}
      sx={{ textAlign: "right" }}
    >
      <Typography
        variant="h5"
        sx={{ margin: "5px", color: COLORS.secondary, fontWeight: "bold" }}
      >
        Neural Connection
      </Typography>
      <List>
        {isAuthenticated ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={logOut}
              sx={{ color: COLORS.text_primary, fontWeight: "bold" }}
            >
              Logout
            </ListItemButton>
          </ListItem>
        ) : (
          menuItems.map((item, index) => (
            <Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton>
                  <Link
                    style={{
                      color: COLORS.text_primary,
                      textDecoration: "none",
                      fontWeight: "bold",
                      marginLeft: "auto",
                    }}
                    to={item.to}
                  >
                    {item.text}
                  </Link>
                </ListItemButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))
        )}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={active}
      onClose={() => {
        handleDrawerToggle();
      }}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        ".MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 230,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}
