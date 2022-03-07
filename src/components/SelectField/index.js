/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import {
  // eslint-disable-next-line object-curly-newline
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

function SelectField(props) {
  const useHelperTextStyles = makeStyles(() => ({
    root: {
      position: 'absolute',
      bottom: '-12px',
    },
  }));
  const { name, dataList = [], label, onChange, form, showAll = true, disabled = false } = props;

  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];
  const handleChange = (event) => {
    if (onChange) onChange(event.target.value);
  };

  const helperTextStyles = useHelperTextStyles();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <Form error={!!hasError} disabled={disabled}>
          <Form.Label>{label}</Form.Label>
          <Form.Select
            ref={ref}
            value={value}
            fullWidth
            label={label}
            name={name}
            onChange={(event) => {
              onChange(event);
              handleChange(event);
            }}
          >
            {showAll && <option value="">Chọn</option>}
            {dataList.map((item) => (
              <option value={item.value || item.id} key={item.value || item.id}>
                {item.name || item.label || item.positionName || item.specialistName || ''}
              </option>
            ))}
          </Form.Select>
          <p className="text-danger mb-1">{errors[name]?.message}</p>
        </Form>
      )}
    />
  );
}
SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  form: PropTypes.object,
  showAll: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
};

export default SelectField;
