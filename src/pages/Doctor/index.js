/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Route, Switch, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import AdminNavBar from './components/AdminNavBar';
import AdminSideBar from './components/AdminSildeBar';
import DoctorListDetail from './components/DoctorListPatient';
import DoctorProfile from './components/DoctorProfile';
import DoctorSchedule from './components/DoctorSchedule';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import { getDoctorDetail } from './doctorSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

function DoctorPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const isLogin =
    (localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('user'))?.typeAccountId == '2') ||
    false;
  if (!isLogin) history.push('/login');

  const id = JSON.parse(localStorage.getItem('user'))?.Doctor?.id;

  useEffect(() => {
    (async () => {
      try {
        unwrapResult(await dispatch(getDoctorDetail(id)));
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    })();
  }, []);

  return (
    <>
      <div className="wrapper">
        <AdminSideBar />
        <div className="main-panel">
          <AdminNavBar />
          <div className="content">
            <Switch>
              <Route path={match.url} exact component={DoctorListDetail} />
              <Route path={`${match.url}/patient-detail`} component={DoctorListDetail} />
              <Route path={`${match.url}/schedule`} component={DoctorSchedule} />
              <Route path={`${match.url}/profile`} component={DoctorProfile} />
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default DoctorPage;
