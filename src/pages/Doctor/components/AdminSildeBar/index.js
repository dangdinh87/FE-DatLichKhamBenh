import React, { Component } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// import logo from 'assets/img/reactlogo.png';

function Sidebar({ color, imag }) {
  const location = useLocation();
  const doctor = useSelector((state) => state.doctor.current);
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  return (
    <div className="sidebar" data-color={color}>
      <div
        className="sidebar-background"
        // style={{
        //   backgroundImage: 'url(' + image + ')',
        // }}
      />
      <div className="sidebar-wrapper bg-primary">
        <div className="logo d-flex align-items-center justify-content-center">
          <p className="simple-text" href="#">
            BOOKING CARE
          </p>
        </div>
        <Nav>
          <li>
            <NavLink
              to="/doctor/patient-detail"
              className="nav-link"
              activeStyle={{
                fontWeight: 'bold',
                background: 'white',
                color: 'black',
              }}
            >
              <i className={'nc-icon nc-paper-2'} />
              <p>Bệnh Nhân</p>
            </NavLink>
          </li>
        </Nav>
        <Nav>
          <li>
            <NavLink
              to="/doctor/schedule"
              className={`nav-link`}
              activeStyle={{
                fontWeight: 'bold',
                background: 'white',
                color: 'black',
              }}
            >
              <i className={'nc-icon nc-notes'} />
              <p>Lịch khám</p>
            </NavLink>
          </li>
        </Nav>

        <Nav>
          <li>
            <NavLink
              to="/doctor/profile"
              className="nav-link"
              activeStyle={{
                fontWeight: 'bold',
                background: 'white',
                color: 'black',
              }}
            >
              <i className={'nc-icon nc-circle-09'} />
              <p>Tài khoản</p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
