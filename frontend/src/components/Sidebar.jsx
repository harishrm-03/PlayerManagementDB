import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Players", icon: <PeopleIcon />, path: "/players" },
    { text: "Teams", icon: <GroupsIcon />, path: "/teams" },
    { text: "Matches", icon: <SportsCricketIcon />, path: "/matches" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ marginRight: 2 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
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
                setIsOpen(false); // Close the drawer after navigation
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;