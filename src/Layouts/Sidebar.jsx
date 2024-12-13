import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ position: "fixed", top: 10, left: 10 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#3f51b5",
            color: "white",
          }}
        >
          <h2>Menu</h2>
        </div>
        <Divider />
        <List>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Beranda" />
          </ListItem>
            </Link>
          <Link
            to="/pelanggan"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Manajemen Pelanggan" />
            </ListItem>
          </Link>
          <Link
            to="/barang"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Manajemen Barang" />
            </ListItem>
          </Link>
          <Link
            to="/penjualan"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button onClick={toggleDrawer}>
              <ListItemText primary="Manajemen Penjualan" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
