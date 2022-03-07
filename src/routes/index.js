import React from 'react';
import NotFound from './../components/NotFound';
import HomePage from './../pages/Home';
import LoginFeature from './../features/Auth/Login';
import RegisterFeature from './../features/Auth/Register';
import ProfileFeature from './../pages/Profile';
import BookingPage from '../pages/Booking';
import BookingDetailPage from '../pages/Booking/components/bookingDoctor';
import BookingCreatePage from '../pages/Booking/components/bookingCreatel';
import VerifyBooking from '../pages/Booking/components/verifyBooking';
import HistoryBookingPage from '../pages/HistoryBooking';
import Handbook from '../pages/Handbook';
import AboutPage from '../pages/About';
const routes = [
  {
    path: '/',
    exact: true,
    main: <HomePage />,
  },
  {
    path: '/login',
    exact: false,
    main: <LoginFeature />,
  },
  {
    path: '/register',
    exact: false,
    main: <RegisterFeature />,
  },
  {
    path: '/register',
    exact: false,
    main: <RegisterFeature />,
  },
  {
    path: '/profile/:id',
    exact: true,
    main: <ProfileFeature />,
  },
  {
    path: '/booking',
    exact: true,
    main: <BookingPage />,
  },
  {
    path: '/verify-booking',
    exact: true,
    main: <VerifyBooking />,
  },
  {
    path: '/booking/:id',
    exact: true,
    main: <BookingDetailPage />,
  },
  {
    path: '/booking/:id/:timeSlotId',
    exact: true,
    main: <BookingCreatePage />,
  },
  {
    path: '/history-booking',
    exact: true,
    main: <HistoryBookingPage />,
  },

  {
    path: '/about',
    exact: true,
    main: <AboutPage />,
  },
  {
    path: '/hand-book',
    exact: true,
    main: <Handbook />,
  },
  {
    path: '',
    exact: false,
    main: <NotFound />,
  },
];

export default routes;
