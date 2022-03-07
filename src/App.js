import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { default as React } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPage from './pages/Admin';
import BookingPage from './pages/Booking';
import DoctorPage from './pages/Doctor';
import routers from './routes/index';

export default function App(props) {
  return (
    <Router>
      <ThemeProvider>
        <ToastContainer position="top-right" />
        <CssBaseline />
        <Switch>
          <Route path="/doctor" component={(props) => <DoctorPage {...props} />} />
          <Route path="/admin" component={(props) => <AdminPage {...props} />} />
          {routers.map((route, index) => {
            return (
              <Route
                path={route.path}
                exact={route.exact}
                component={() => (
                  <>
                    <Header />
                    {route.main}
                    <Footer />
                  </>
                )}
                key={index}
              />
            );
          })}
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
