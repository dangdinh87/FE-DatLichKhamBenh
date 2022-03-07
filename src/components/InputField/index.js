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
  size: PropTypes.string,
};

function InputField(props) {
  const {
    form,
    name,
    label,
    disabled,
    type = 'text',
    placeholder,
    size,
    showRequired,
    style,
  } = props;
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
        <Form.Group className="" controlId="exampleForm.ControlInput1">
          <Form.Label>
            {label} {showRequired && <span className="text-danger">*</span>}
          </Form.Label>
          <Form.Control
            ref={ref}
            onChange={onChange}
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            value={value}
            // isValid={!hasError}
            isInvalid={!!hasError}
            name={name}
            className="p-3"
            size={size}
            style={style}
            // rows={3}
            {...props}
          />
          <p className="text-danger mb-1">{errors[name]?.message}</p>
        </Form.Group>
      )}
    />
  );
}

export default InputField;
