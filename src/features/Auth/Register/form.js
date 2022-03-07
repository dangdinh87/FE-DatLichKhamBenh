import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  LinearProgress,
  Radio,
  RadioGroup,
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
import RadioField from '../../../components/RadioBox';

RegisterForm.propTypes = {
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
  registerLink: {
    textDecoration: 'none',
  },
}));
function RegisterForm({ handleClose, onSubmit }) {
  const schema = yup.object().shape({
    username: yup.string().required('Tên tài khoản không được để trống !'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống !')
      .min(6, 'Mật khẩu phải trên 6 kí tự'),
    retypePassword: yup
      .string()
      .required('Nhập lại mật khẩu không được để trống !')
      .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không chính xác !'),
  });
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      typeAccountId: '1',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    delete values.retypePassword;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const listData = [
    { value: '1', name: 'Bệnh Nhân' },
    { value: '2', name: 'Bác Sĩ' },
  ];

  const classes = useStyles();
  const { isSubmitting } = form.formState;
  return (
    <Container component="main">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h4 className="fw-bold">Đăng kí</h4>
        <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid container>
            <RadioField
              name="typeAccountId"
              defaultValue="1"
              dataList={listData}
              inline={true}
              form={form}
            />

            <Grid item xs={12}>
              <InputField name="username" label="Tài khoản" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="password" label="Mật Khẩu" form={form} />
            </Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={12}>
              <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />
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
              Đăng kí
            </button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className={classes.registerLink}>
                  Bạn đã có tài khoản ? Đăng nhập ngay
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegisterForm;
