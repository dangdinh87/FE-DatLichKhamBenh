import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, type = 'text' } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            ref={ref}
            onChange={onChange}
            disabled={disabled}
            type={type}
            placeholder={label}
            value={value}
            isValid={!hasError}
            isInvalid={!!hasError}
            name={name}
            className="p-3"
          />
          <p className="text-danger mt-1">{errors[name]?.message}</p>
        </Form.Group>
        // <TextField
        //   // defaultValue
        //   margin="normal"
        //   variant="outlined"
        //   fullWidth
        //   label={label}
        //   disabled={disabled}
        //   error={!!hasError}
        //   helperText={errors[name]?.message}
        //   value={value}
        //   onChange={onChange}
        //   name={name}
        // />
      )}
    />
  );
}

export default InputField;
