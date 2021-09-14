import React from 'react';
import NotFound from './../components/NotFound';
import PostFeature from './../features/Post';
import LoginFeature from './../features/Auth/Login';
import RegisterFeature from './../features/Auth/Register';
const routes = [
  {
    path: '/',
    exact: true,
    main: () => <PostFeature />,
  },
  {
    path: '/login',
    exact: false,
    main: () => <LoginFeature />,
  },
  {
    path: '/register',
    exact: false,
    main: () => <RegisterFeature />,
  },
  {
    path: '',
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
