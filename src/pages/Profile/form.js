/* eslint-disable react-hooks/rules-of-hooks */
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import patientApi from '../../api/patientApi';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import UploadField from '../../components/UpLoadField';

export default function PatientProfileForm({ patient }) {
  const history = useHistory();
  const params = useParams();
  let { fullName, phone, email, date, gender, image, patientHistory, address } = patient;
  const schema = yup.object().shape({
    fullName: yup.string().required('Tên không được để trống !'),
    phone: yup.string().required('Số điện thoại không được để trống !'),
    email: yup.string().required('Email không được để trống !'),
  });

  const form = useForm({
    defaultValues: {
      fullName,
      phone,
      email,
      date,
      gender,
      patientHistory,
      address,
    },
    resolver: yupResolver(schema),
    mode: onchange,
  });

  const { isSubmitting } = form.formState;
  const dataList = [
    {
      label: 'Nam',
      value: 'true',
    },
    { label: 'Nữ', value: 'false' },
  ];

  const handleSubmit = async (values) => {  
    var formData = new FormData();
    for (const key in values) {
      if (typeof values[key] === 'string') formData.append(key, values[key]);
    }

    if (values.image !== null || values?.image?.length > 0)
      formData.append('image', values.image[0]);

    const data = await patientApi.update(params.id, formData);

    if (data) {
      toast.success('Cập nhật thông tin người dùng thành công');
      history.push('/');
    }
  };

  return (
    <form className="w-100" onSubmit={form.handleSubmit(handleSubmit)}>
      <Grid container justifyContent="center">
        <Grid container justifyContent="center" className="mt-2 mb-2">
          <Grid item xs={3} className="px-2">
            <UploadField
              name="image"
              label="Ảnh đại diện"
              form={form}
              value={form.watch('image')}
              image={image}
            />
          </Grid>
        </Grid>
        <Grid item xs={4} className="px-2">
          <InputField name="fullName" label="Họ và tên" form={form} showRequired={true} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <InputField name="phone" label="Số điện thoại" form={form} showRequired={true} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <InputField name="email" label="Email" form={form} showRequired={true} />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start">
        <Grid item xs={4} className="px-2">
          <InputField name="address" label="Địa chỉ" form={form} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <InputField name="date" label="Ngày sinh" form={form} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <SelectField dataList={dataList} name="gender" label="Giới tính" form={form} />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" className="mt-4">
        <Grid item xs={12} className="px-2">
          <InputField
            name="patientHistory"
            label="Lịch sử bệnh"
            form={form}
            as="textarea"
            rows={5}
            style={{ height: 100 }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary mx-auto mt-3 w-100 mb-2 py-2 fw-bolder text-uppercase "
        >
          Cập nhật thông tin
        </button>
      </Grid>
    </form>
  );
}
