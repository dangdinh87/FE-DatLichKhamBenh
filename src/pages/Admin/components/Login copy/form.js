import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/InputField';
import PasswordField from '../../../../components/PasswordField';

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
    password: yup.string().required('Mật khẩu không được để trống !'),
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
      <h4 className="fw-bold">TRANG QUẢN TRỊ</h4>
      <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <InputField name="username" label="Tên đăng nhập" form={form} />
          </Grid>
          <Grid item xs={12}>
            <PasswordField name="password" label="Mật khẩu" form={form} />
          </Grid>
          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            className="btn btn-primary mx-auto mt-3 w-100 mb-2"
          >
            Đăng Nhập
          </Button>
        </Grid>
      </form>
    </div>
    // </Container>
  );
}

export default LoginForm;
