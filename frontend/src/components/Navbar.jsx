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
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchCategory, setSearchCategory] = useState("Players");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search query.");
      return;
    }

    const encodedQuery = encodeURIComponent(searchQuery);

    switch (searchCategory) {
      case "Players":
        navigate(`/players?search=${encodedQuery}`);
        break;
      case "Teams":
        navigate(`/teams?search=${encodedQuery}`);
        break;
      case "Matches":
        navigate(`/matches?search=${encodedQuery}`);
        break;
      default:
        alert("Invalid search category.");
        break;
    }
  };

  // Sidebar menu items
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Players", icon: <PeopleIcon />, path: "/players" },
    { text: "Teams", icon: <GroupsIcon />, path: "/teams" },
    { text: "Matches", icon: <SportsCricketIcon />, path: "/matches" },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Sidebar Toggle Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
          sx={{ marginRight: 2 }}
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

        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <TextField
            select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ marginRight: 1, width: 120 }}
          >
            <MenuItem value="Players">Players</MenuItem>
            <MenuItem value="Teams">Teams</MenuItem>
            <MenuItem value="Matches">Matches</MenuItem>
          </TextField>
          <TextField
            placeholder={`Search ${searchCategory}`}
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

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

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <ListItemText primary="Navigation" />
          </ListItem>
          <Divider />
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setIsDrawerOpen(false); // Close the drawer after navigation
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;