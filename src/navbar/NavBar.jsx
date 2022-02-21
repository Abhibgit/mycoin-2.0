import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import moment from "moment";

function NavBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElTwo, setAnchorElTwo] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationOpen = Boolean(anchorElTwo);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationOpen = (event) => {
    setAnchorElTwo(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorElTwo(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMyCoinClick = (event) => {
    navigate("/");
  };

  const handleTopTen = (event) => {
    event.preventDefault();
    handleMenuClose();
    navigate("/topperforming");
  };
  const handleLogout = (evt) => {
    evt.preventDefault();
    localStorage.removeItem("token");
    window.location.reload(false);
    handleMenuClose();
  };

  const handleProfileLink = (evt) => {
    evt.preventDefault();
    handleMenuClose();
    navigate("/user/profile");
  };

  const handleWatchlistLink = (evt) => {
    evt.preventDefault();
    handleMenuClose();
    navigate("/watchlist");
  };
  const handleDashboardLink = (evt) => {
    evt.preventDefault();
    handleMenuClose();
    navigate("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {props.user.name !== "" ? (
        <div>
          <MenuItem onClick={handleProfileLink}>
            <IconButton size="large" color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={handleDashboardLink}>
            <IconButton size="large" color="inherit">
              <DashboardIcon />
            </IconButton>
            <p>Dashboard</p>
          </MenuItem>
          <MenuItem onClick={handleWatchlistLink}>
            <IconButton size="large" color="inherit">
              <VisibilityIcon />
            </IconButton>
            <p>Watchlist</p>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <IconButton size="large" color="inherit">
              <LogoutIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </div>
      ) : (
        <MenuItem>Please Login</MenuItem>
      )}
    </Menu>
  );

  const notificationsMenuId = "primary-search-notification-menu";
  const renderNotifications = (
    <Menu
      anchorEl={anchorElTwo}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
      {props.notifications ? (
        props.notifications.map(({ message, createdAt, _id }, idx) => (
          <ListItem
            key={message + idx}
            sx={{
              boxShadow: 1,
              margin: 1,
            }}
          >
            {message} - {moment(createdAt).format("YYYY-MM-DD hh:mm:ss")}
            <Button onClick={() => props.removeNotification(_id)}>X</Button>
          </ListItem>
        ))
      ) : (
        <ListItem>You have no notifications</ListItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {props.user.name !== "" ? (
          <div>
            <MenuItem onClick={handleNotificationOpen}>
              <IconButton size="large" color="inherit">
                <Badge
                  badgeContent={
                    props.notifications ? props.notifications.length : null
                  }
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileLink}>
              <IconButton size="large" color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleTopTen}>
              <IconButton size="large" color="inherit">
                <DashboardIcon />
              </IconButton>
              <p>Top Performing</p>
            </MenuItem>
            <MenuItem onClick={handleDashboardLink}>
              <IconButton size="large" color="inherit">
                <SearchIcon />
              </IconButton>
              <p>Search</p>
            </MenuItem>
            <MenuItem onClick={handleWatchlistLink}>
              <IconButton size="large" color="inherit">
                <VisibilityIcon />
              </IconButton>
              <p>Watchlist</p>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <IconButton size="large" color="inherit">
                <LogoutIcon />
              </IconButton>
              <p>Logout</p>
            </MenuItem>
          </div>
        ) : (
          <MenuItem>Please Login</MenuItem>
        )}
      </Menu>
    </>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={handleMyCoinClick}>
            <img
              src={require("../assets/MyCoin.svg").default}
              alt="mySvgImage"
            />
          </Button>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, m: 0.75, fontSize: 25 }}
          >
            MyCoin
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              color="inherit"
              aria-controls={notificationsMenuId}
              onClick={handleNotificationOpen}
            >
              <Badge
                badgeContent={
                  props.notifications ? props.notifications.length : null
                }
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotifications}
    </Box>
  );
}

export default NavBar;
