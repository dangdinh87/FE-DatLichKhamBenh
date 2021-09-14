import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../components/InputField';
import PasswordField from '../../../components/PasswordField';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 1, 0, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: theme.spacing(2, 0, 1, 0),
  },
  progress: {
    top: theme.spacing(1),
    position: 'absolute',
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));
function RegisterForm({ handleClose, onSubmit }) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name !')
      .test('Full name must contain two words or more', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Please enter your email !')
      .email('Please enter your address email !'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter least 6 characters'),
    retypePassword: yup
      .string()
      .required('Please enter retype password')
      .oneOf([yup.ref('password')], 'Password does not match'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const classes = useStyles();
  const { isSubmitting } = form.formState;
  return (
    <Container component="main">
      <CssBaseline />
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <IconButton aria-label="clear" className={classes.closeBtn} onClick={handleClose}>
        <CloseIcon color="primary" />
      </IconButton>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng kí
        </Typography>
        <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid container>
            <Grid item xs={12}>
              <InputField name="fullName" label="Họ và tên" form={form} />
            </Grid>
            <Grid item xs={12}>
              <InputField name="email" label="Gmail" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="password" label="Mật khẩu" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Đồng ý với các điều khoản dịch vụ"
              />
            </Grid>
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Bạn đã có tài khoản ? Đăng nhập ngay</Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegisterForm;
