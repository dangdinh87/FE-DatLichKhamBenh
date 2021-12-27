import { Backdrop, Badge, Button, CssBaseline, IconButton, Tooltip, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CreateIcon from '@material-ui/icons/Create';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import { toggleDarkMode } from '../../features/System/systemSlice';
import SearchBar from '../SearchBar';
import './index.scss';
// import SearchBar from '../SearchBar';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 999,
  },

  navBar: {
    zIndex: 999,
  },
  menuButton: {
    textTransform: 'capitalize',
    background: theme.palette.primary.dark,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: 20,
    textTransform: 'uppercase',
    margin: 5,
  },
  link_active: {
    color: 'red',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  flexMenuRight: {
    flexWrap: 'row nowrap',
  },
  backdrop: {
    zIndex: 998,
    color: '#fff',
  },
  rightHeader: {
    marginLeft: 'auto',
  },
}));

export default function ButtonAppBar(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const userLogin = JSON.parse(localStorage.getItem('user'))?.name || '';
  const isLogin = JSON.parse(localStorage.getItem('user')) || false;
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const handleToggle = (value) => {
    setOpenBackDrop(value);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const isDarkMode = useSelector((state) => state.system.isDarkMode);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => {
    // setChecked((prev) => !prev);
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    if (location.pathname === '/login') return;
    history.push('/login');
  };
  const goToProfile = () => {
    history.push(`/profile/${isLogin._id}`);
    setAnchorEl(null);
    handleCloseMenu();
  };

  const handleLogoutAction = () => {
    dispatch(logout());
    setAnchorEl(null);
    handleCloseMenu();
    history.push('/');
  };

  const MODE = { LOGIN: 'login', REGISTER: 'register' };

  return (
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <AppBar className={classes.navBar} position="sticky" id="back-to-top-anchor">
    //     <Toolbar>
    //       <Grid direction="row" justifyContent="flex-start" alignItems="center" xs={2}>
    //         <div className="logo-header"></div>
    //       </Grid>
    //       <Grid direction="row" justifyContent="center" alignItems="center" xs={3}>
    //         <SearchBar onShowOverlay={handleToggle} />
    //       </Grid>
    //       <Grid
    //         wrap="nowrap"
    //         container
    //         direction="row"
    //         justifyContent="flex-end"
    //         alignItems="center"
    //         className={classes.rightHeader}
    //         xs={3}
    //       >
    //         <Tooltip title="Tin nhắn">
    //           <IconButton>
    //             <Badge color="secondary" max={99} variant="dot">
    //               <ChatBubbleIcon style={{ color: 'white' }} />
    //             </Badge>
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Thông báo">
    //           <IconButton>
    //             <Badge color="secondary" max={99} variant="dot" zeroMinWidth>
    //               <NotificationsIcon style={{ color: 'white' }} />
    //             </Badge>
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Dark Mode">
    //           <IconButton onClick={() => dispatch(toggleDarkMode())}>
    //             {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon style={{ color: 'white' }} />}
    //           </IconButton>
    //         </Tooltip>
    //         {isLogin ? (
    //           <Button className={classes.menuButton} onClick={handleClick} color="inherit">
    //             <Typography noWrap>{userLogin}</Typography>
    //             &ensp; <AccountCircleOutlinedIcon />
    //           </Button>
    //         ) : (
    //           <Button variant="contained" color="secondary" onClick={handleClickOpen}>
    //             Đăng Nhập
    //           </Button>
    //         )}
    //       </Grid>
    //     </Toolbar>
    //   </AppBar>
    //   {openBackDrop && (
    //     <Backdrop
    //       invisible={false}
    //       transitionDuration={300}
    //       className={classes.backdrop}
    //       open={openBackDrop}
    //       onClick={handleCloseBackDrop}
    //     >
    //       {/* <CircularProgress color="inherit" /> */}
    //     </Backdrop>
    //   )}
    //   <Menu
    //     anchorEl={anchorEl}
    //     keepMounted
    //     open={Boolean(anchorEl)}
    //     onClose={handleCloseMenu}
    //     anchorOrigin={{
    //       vertical: 'bottom',
    //       horizontal: 'right',
    //     }}
    //     transformOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     getContentAnchorEl={null}
    //   >
    //     <MenuItem onClick={goToProfile}>Thông tin cá nhân</MenuItem>
    //     <MenuItem onClick={goToProfile}>Đổi mật khẩu</MenuItem>
    //     <MenuItem onClick={handleLogoutAction}>Đăng xuất</MenuItem>
    //   </Menu>
    // </div>
    <header className="header-container">
      <div className="header-box">
        <div className="header-logo"></div>
        <div className="header-navigation">
          <ul className="header-navigation-list">
            <li className="header-navigation-item">
              <NavLink to="/home">Trang chủ </NavLink>
            </li>

            <li className="header-navigation-item">
              <NavLink to="/about">Giới Thiệu</NavLink>
            </li>
            <li className="header-navigation-item">Đặt khám</li>
            <li className="header-navigation-item">Cộng đồng</li>
            <li className="header-navigation-item">Cẩm nang</li>
          </ul>
        </div>
        <div className="header-action">
          <button type="button" class="btn btn-primary me-3 rounded" onClick={handleClickOpen}>
            Đăng nhập
          </button>
          <button type="button" class="btn btn-secondary">
            Đăng kí
          </button>
        </div>
      </div>
    </header>
  );
}
