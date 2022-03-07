import React from 'react';
import Login from './components/Login copy';
import AdminNavBar from './components/AdminNavBar';
import AdminSideBar from './components/AdminSildeBar';
import '../../pages/Doctor/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import { Switch, Route } from 'react-router-dom';
import DoctorList from './components/DoctorList';
export default function AdminPage() {
  const isCheckAdmin = JSON.parse(localStorage.getItem('user'))?.Admin || null;

  if (!isCheckAdmin) {
    return <Login />;
  }

  return (
    <div className="wrapper">
      <AdminSideBar />
      <div className="main-panel">
        <AdminNavBar />
        <div className="content">
          <Switch>
            <Route path="/admin" exact component={DoctorList} />
            {/* <Route path={`${match.url}/patient-detail`} component={DoctorListDetail} />
            <Route path={`${match.url}/schedule`} component={DoctorSchedule} />
            <Route path={`${match.url}/profile`} component={DoctorProfile} /> */}
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
