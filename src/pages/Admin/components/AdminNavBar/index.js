import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';
import { logout } from '../../../../features/Auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';

// import routes from 'routes.js';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = JSON.parse(localStorage.getItem('user')) || null;

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex w-100 justify-content-between align-items-center ml-2 ml-lg-0">
          <Navbar.Brand href="#home" onClick={(e) => e.preventDefault()} className="mr-2">
            Trang Admin - Sở Y Tế Đà Nẵng
          </Navbar.Brand>
          <div>
            Xin chào!{' '}
            <span className="fw-bold me-3">{userLogin?.Doctor?.fullName || userLogin?.username}</span>{' '}
            <Button className="m-0" onClick={handleLogout}>
              <span className="no-icon">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
