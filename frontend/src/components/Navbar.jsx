import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Card,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    handleMenuClose();
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Menu Icon for Mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          component={NavLink}
          to="/"
        >
          CricManager
        </Typography>

        {/* Navigation Links */}
        {user && (
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              color="inherit"
              component={NavLink}
              to="/players"
              sx={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#ffeb3b" : "inherit",
              })}
            >
              Players
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/teams"
              sx={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#ffeb3b" : "inherit",
              })}
            >
              Teams
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/matches"
              sx={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#ffeb3b" : "inherit",
              })}
            >
              Matches
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/performances"
              sx={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#ffeb3b" : "inherit",
              })}
            >
              Performances
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/achievements"
              sx={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#ffeb3b" : "inherit",
              })}
            >
              Achievements
            </Button>
          </Box>
        )}

        {/* User Menu */}
        {user ? (
          <Box>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            color="inherit"
            component={NavLink}
            to="/login"
            sx={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#ffeb3b" : "inherit",
            })}
          >
            Login
          </Button>
        )}
      </Toolbar>
      <Card
        sx={{
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {/* Card content */}
      </Card>
    </AppBar>
  );
};

export default Navbar;