import { Backdrop, Container, CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
    // marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.background.default,
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
  messageCart: {
    position: 'absolute',
    padding: theme.spacing(2),
    backgroundColor: 'rgb(255, 255, 255)',
    top: '90%',
    borderRadius: theme.spacing(1),
    right: theme.spacing(3),
    '&::before': {
      content: "''",
      position: 'absolute',
      bottom: '100%',
      borderStyle: 'solid',
      borderWidth: '8px',
      right: theme.spacing(2),
      borderColor: 'transparent transparent rgb(255, 255, 255)',
    },
  },
  cartTitle: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey[700],
  },
  messageCartSub: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  flexMenuRight: {
    flexWrap: 'row nowrap',
  },
  backdrop: {
    zIndex: 998,
    color: '#fff',
  },
}));

export default function ButtonAppBar(props) {
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const MODE = { LOGIN: 'login', REGISTER: 'register' };
  const classes = useStyles();
  // const userLogin = useSelector((state) => state.user);
  // const isLogin = !!userLogin.current.id;
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const handleToggle = (value) => {
    setOpenBackDrop(value);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  // const isDarkMode = useSelector((state) => state.system.isDarkMode);
  // const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => {
    // setChecked((prev) => !prev);
    setAnchorEl(null);
  };

  // const handleClose = () => setOpen(false);

  // const handleLogoutAction = () => {
  //   const action = logout();
  //   dispatch(action);
  //   setAnchorEl(null);
  //   handleCloseMenu();
  // };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.navBar} position="sticky" id="back-to-top-anchor">
        <Container>
          <Toolbar>
            <Grid container direction="row" justify="flex-start" alignItems="center" xs={3} item>
              <Typography variant="h6">
                <NavLink
                  to="/products"
                  exact
                  className={classes.link}
                  // activeClassName={classes.link_active}
                >
                  TOI DEV
                </NavLink>
              </Typography>
            </Grid>
            {/* <Grid container direction="row" justify="center" alignItems="center" item xs={true}>
              <SearchBar onShowOverlay={handleToggle} />
            </Grid> */}
            <Grid
              wrap="nowrap"
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              xs={3}
            >
              {/* {isLogin ? (
                <>
                  <Grid zeroMinWidth>
                    <Typography noWrap>{userLogin.current.fullName}</Typography>
                  </Grid>

                  <IconButton className={classes.menuButton} onClick={handleClick} color="inherit">
                    <AccountCircleIcon />
                  </IconButton>
                </>
              ) : (
                <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                  Đăng Nhập
                </Button>
              )} */}

              {/* <Tooltip title="Dark Mode">
                <IconButton onClick={() => dispatch(toggleDarkMode())}>
                  {isDarkMode ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon style={{ color: 'white' }} />
                  )}
                </IconButton>
              </Tooltip> */}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      {openBackDrop && (
        <Backdrop
          invisible={false}
          transitionDuration={300}
          className={classes.backdrop}
          open={openBackDrop}
          onClick={handleCloseBackDrop}
        >
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        {/* <MenuItem onClick={handleLogoutAction}>Logout</MenuItem> */}
      </Menu>
      {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {mode === MODE.LOGIN && (
          <>
            <Login handleClose={handleClose} />
            <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
              Don't you have account ? Sign up
            </Button>
          </>
        )}
        {mode === MODE.REGISTER && (
          <>
            <Register handleClose={handleClose} />
            <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
              Do you have account ? Sign in
            </Button>
          </>
        )}
      </Dialog> */}
    </div>
  );
}
