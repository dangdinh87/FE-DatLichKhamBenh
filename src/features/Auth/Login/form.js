import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Container,
  CssBaseline,
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 4, 0, 1),
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
    // marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(1),
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  login: {
    textDecoration: 'none',
  },
}));
function LoginForm({ handleClose, onSubmit }) {
  const schema = yup.object().shape({
    username: yup.string().required('Tên đăng nhập không được để trống !'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống !')
      .min(6, 'Mật khẩu phải lớn hơn 6 kí tự !'),
  });
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: onchange,
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const classes = useStyles();
  const { isSubmitting } = form.formState;
  return (
    // <Container component="main">
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <h4 className="fw-bold">Đăng Nhập</h4>
      <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <InputField name="username" label="Tên đăng nhập" form={form} />
          </Grid>
          <Grid item xs={12}>
            <PasswordField name="password" label="Mật khẩu" form={form} />
          </Grid>
          <button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            className="btn btn-primary mx-auto mt-3 w-100 mb-2"
          >
            Đăng Nhập
          </button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" className={classes.login}>
                Bạn chưa có tài khoản ? Đăng kí ngay
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
    // </Container>
  );
}

export default LoginForm;
