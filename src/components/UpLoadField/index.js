import { Box, FormControl, FormHelperText, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { API_HOST_STATIC, THUMBNAIL_PLACEHOLDER } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '4px',
  },
  inputUpload: {
    display: 'none',
  },
  imageBox: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    border: '1px solid #cccccc',
    cursor: 'pointer',
    '&:hover ': {
      filter: 'brightness(0.9)',
      '&$buttonGroup': {
        display: 'flex',
        filter: 'brightness(1.2)',
      },
    },
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: ' #ffffff',
    objectFit: 'cover',
  },
  boxFullScreen: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    boxShadow: 24,
    p: 4,
  },
  imageFullScreen: {
    transform: 'scale(1.3, 1.3)',
    maxWidth: 600,
  },
  deleteButton: {
    marginLeft: 4,
  },
  closeModal: {
    position: 'absolute',
    top: -32,
    right: -32,
  },
  buttonGroup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'none',
  },
  buttonCenter: {
    margin: '0 2px',
    padding: 0,
  },
  rootErrorHelper: {
    position: 'absolute',
    bottom: 20,
  },
}));

function UploadField(props) {
  const {
    name,
    form,
    image = null,
    onChangeFile = null,
    onDelete = null,
    value = null,
    label,
  } = props;
  const {
    formState: { errors },
    register,
    control,
  } = form;

  const hasError = errors[name];
  const classes = useStyles();
  const [file, setFile] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (value && value[0]) {
      setFile(URL.createObjectURL(value[0]));
      return;
    }
    setFile(null);
  }, [value]);

  const handleDelete = () => {
    setFile(THUMBNAIL_PLACEHOLDER);
    onDelete?.();
  };

  const imageCurrent = image ? `${API_HOST_STATIC}/${image}` : THUMBNAIL_PLACEHOLDER;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <FormControl size="small" error={!!hasError} fullWidth className={classes.root}>
          <Form.Label>{label}</Form.Label>
          <Modal open={open} onClose={handleClose}>
            <Box className={classes.boxFullScreen}>
              <img src={file || imageCurrent} className={classes.imageFullScreen} alt="Error" />
            </Box>
          </Modal>
          <div className={classes.imageBox}>
            <img className={classes.image} src={file || imageCurrent} alt="Error" />
            <div className={classes.buttonGroup}>
              {image && (
                <Button type="button" onClick={handleOpen} variant="info" className="me-2">
                  <i class="bi bi-eye fs-4"></i>
                </Button>
              )}
              <label htmlFor={`icon-button-${name}`} className="m-0">
                <input
                  {...register(name)}
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  className={classes.inputUpload}
                  id={`icon-button-${name}`}
                  type="file"
                  name={name}
                  onChange={(e) => {
                    onChange(e.target.files);
                    onChangeFile?.(e);
                  }}
                />
                <span className="btn btn-success">
                  <i class="bi bi-pencil-square fs-4"></i>
                </span>
              </label>
              {/* {image && (
                <Button
                  type="button"
                  component="span"
                  color="error"
                  variant="contained"
                  onClick={() => handleDelete()}
                  size="small"
                >
                  <i class="bi bi-trash fs-4"></i>
                </Button>
              )} */}
            </div>
          </div>
          <FormHelperText
            id="my-helper-text"
            classes={{
              root: classes.rootErrorHelper,
            }}
          >
            {errors[name]?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

UploadField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object,
  label: PropTypes.string,
  image: PropTypes.string,
  onChangeFile: PropTypes.func,
  onDelete: PropTypes.func,
};

export default UploadField;
