import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchBar from "../components/SearchBar/SearchBar";
import { Button, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

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
      {props.user !== "" ? (
        <div>
          <MenuItem onClick={handleProfileLink}>Profile</MenuItem>
          <MenuItem onClick={handleDashboardLink}>Dashboard</MenuItem>
          <MenuItem onClick={handleWatchlistLink}>Watchlist</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
          <ListItem key={message + idx}>
            {message} - {createdAt}{" "}
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
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={require("../assets/MyCoin.svg").default}
            alt="mySvgImage"
            onClick={handleMyCoinClick}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, m: 0.75, fontSize: 25 }}
            onClick={handleMyCoinClick}
          >
            MyCoin
          </Typography>
          <Search>
            <SearchBar
              coinList={props.coinList}
              ticker={props.ticker}
              findProfileCoin={props.findProfileCoin}
              handleCoinProfileData={props.handleCoinProfileData}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
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
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
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
