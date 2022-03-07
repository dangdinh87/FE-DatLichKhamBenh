import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';
import './index.scss';
// import SearchBar from '../SearchBar';

export default function Header(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const userLogin = JSON.parse(localStorage.getItem('user'))?.Patient || null;

  const handleClickOpenLogin = () => {
    if (location.pathname === '/login') return;
    history.push('/login');
  };

  const handleClickOpenRegister = () => {
    if (location.pathname === '/register') return;
    history.push('/register');
  };
  // const goToProfile = () => {
  //   history.push(`/profile/${isLogin._id}`);
  // };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };
  return (
    <header className="header-container">
      <div className="header-box">
        <div className="header-logo"></div>
        <div className="header-navigation">
          <ul className="header-navigation-list">
            <li
              className={`header-navigation-item ${
                window?.location?.pathname?.length === 1 && 'header-navigation-item__active'
              }`}
            >
              <NavLink to="/">Trang chủ </NavLink>
            </li>

            <li
              className={`header-navigation-item ${
                window?.location?.pathname?.startsWith('/booking') &&
                'header-navigation-item__active'
              }`}
            >
              <NavLink to="/booking">Đặt khám</NavLink>
            </li>
            <li
              className={`header-navigation-item ${
                window?.location?.pathname?.startsWith('/about') && 'header-navigation-item__active'
              }`}
            >
              <NavLink to="/about">Giới Thiệu</NavLink>
            </li>
            {/* <li className="header-navigation-item">
              <NavLink to="/commutation">Cộng đồng</NavLink>
            </li> */}
            <li
              className={`header-navigation-item ${
                window?.location?.pathname?.startsWith('/hand-book') &&
                'header-navigation-item__active'
              }`}
            >
              <NavLink to="/hand-book">Cẩm Nang</NavLink>
            </li>
          </ul>
        </div>

        <div className="header-action d-flex align-items-center justify-content-end">
          {!!userLogin ? (
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="bi bi-person-circle" style={{ fontSize: '1rem' }}></i>{' '}
                {userLogin?.fullName || JSON.parse(localStorage.getItem('user'))?.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#" onClick={() => history.push(`/profile/${userLogin?.id}`)}>
                  Thông tin cá nhân
                </Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => history.push('/history-booking')}>
                  Xem lịch khám
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <button
                type="button"
                class="btn btn-primary me-3 rounded"
                onClick={handleClickOpenLogin}
              >
                Đăng nhập
              </button>
              <button type="button" class="btn btn-secondary" onClick={handleClickOpenRegister}>
                Đăng kí
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
