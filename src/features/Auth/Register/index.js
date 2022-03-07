import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../userSlice';
import { useHistory } from 'react-router';

import RegisterForm from './form';

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (values) => {
    try {
      const data = unwrapResult(await dispatch(register(values)));
      if (data) toast.success('Đăng kí thành công !');
      if (values.typeAccountId == 1) return history.push('/');
      if (values.typeAccountId == 2) return history.push('/doctor/profile');
      // if (values.typeAccountId == 3) return history.push('/admin');
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Card className="mb-5 mt-4 py-5">
        <div className="d-flex flex-row align-items-center justify-content-center">
          <div className="">
            <img
              src={require('../../../static/section/login.png').default}
              style={{ maxWidth: 450, width: '100%' }}
              alt="Fail"
            />
          </div>
          <div className="w-50">
            <RegisterForm onSubmit={handleSubmit} />
          </div>
        </div>
      </Card>
    </Container>
  );
}
