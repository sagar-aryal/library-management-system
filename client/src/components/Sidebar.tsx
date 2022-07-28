import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  AccountBox,
  Group,
  Home,
  Storefront,
  Person,
  Mail,
  Notifications,
  Attribution,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      flex={1}
      sx={{ display: { xs: "none", sm: "block" } }}
      position="sticky"
      top={0}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Books" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Collections" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem onClick={handleClick}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }} component={Link} to="/">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Books" />
            </ListItem>
            <ListItem sx={{ pl: 4 }} component={Link} to="/users">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem sx={{ pl: 4 }} component={Link} to="/authors">
              <ListItemIcon>
                <Attribution />
              </ListItemIcon>
              <ListItemText primary="Authors" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Sidebar;
