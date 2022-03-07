/* eslint-disable react-hooks/rules-of-hooks */
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import TurndownService from 'turndown';
import { Form } from 'react-bootstrap';
import doctorApi from '../../../../api/doctorApi';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import InputField from '../../../../components/InputField';
import SelectField from '../../../../components/SelectField';
import UploadField from '../../../../components/UpLoadField';
import { toast } from 'react-toastify';

export default function DoctorProfileForm({ doctor, positions, specialists }) {
  const mdParser = new MarkdownIt();
  const turndownService = new TurndownService();
  const [markdown, setMarkdown] = useState(
    doctor.workHistory ? turndownService.turndown(doctor.workHistory) : ''
  );

  function handleEditorChange({ html, text }) {
    setMarkdown(text);
  }

  const {
    fullName,
    phone,
    address,
    certificateImage,
    clinicImage,
    clinicName,
    clinicAddress,
    email,
    date,
    gender,
    licenseImage,
    positionId,
    specialistId,
    avatarImage,
    workHistory,
  } = doctor;
  const schema = yup.object().shape({
    fullName: yup.string().required('Tên không được để trống !').nullable(),
    phone: yup.string().required('Số điện thoại không được để trống !').nullable(),
    address: yup.string().required('Địa chỉ bác sĩ không được để trống !').nullable(),
    clinicName: yup.string().required('Tên phòng khám không được để trống !').nullable(),
    email: yup.string().required('Email không được để trống !').nullable(),
    date: yup.string().required('Ngày sinh không được để trống !').nullable(),
    gender: yup.string().required('Giới tính không được để trống !').nullable(),
    positionId: yup.string().required('Tên chức vụ không được để trống !').nullable(),
    specialistId: yup.string().required('Tên chuyên khoa không được để trống !').nullable(),
    clinicAddress: yup.string().required('Tên phòng khám không được để trống !').nullable(),
    avatarImage: yup
      .mixed()
      .test('required', 'Ảnh đại diện không được để trống', (value) => value && value.length)
      .test(
        'type',
        'Định dạng không được hỗ trợ',
        (value) =>
          value && value[0] && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
      )
      .nullable(),
  });
  const form = useForm({
    defaultValues: {
      fullName,
      phone,
      address,
      clinicName,
      email,
      date,
      gender,
      positionId,
      specialistId,
      workHistory,
      clinicAddress,
    },
    resolver: yupResolver(schema),
    mode: onchange,
  });

  const dataList = [
    {
      label: 'Nam',
      value: true,
    },
    { label: ' Nữ', value: false },
  ];

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values) => {
    const id = JSON.parse(localStorage.getItem('user'))?.Doctor?.id;
    var formData = new FormData();
    const { workHistory, ...rest } = values;
    for (const key in rest) {
      if (typeof values[key] === 'string') formData.append(key, values[key]);
      if (typeof values[key] === 'object' && typeof values[key][0] === 'object') {
        console.log(key, values[key][0]);
        formData.append(key, values[key][0]);
      }
    }

    doctor.status === 'NOT_ACTIVE'
      ? formData.append('status', 'PENDING')
      : formData.append('status', 'ACTIVE');
    formData.append('workHistory', mdParser.render(markdown));
    const data = await doctorApi.update(id, formData);

    if (data) {
      toast.success('Cập nhật dữ liệu thành công');
      window.location.reload();
    }
  };

  return (
    <form className="w-100" onSubmit={form.handleSubmit(handleSubmit)}>
      <Grid container justifyContent="center">
        <Grid item xs={4} className="px-2">
          <InputField name="fullName" label="Họ và tên" form={form} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <InputField name="phone" label="Số điện thoại" form={form} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <InputField name="email" label="Email" form={form} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={4} className="px-2">
          <InputField name="date" label="Ngày sinh" form={form} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <SelectField dataList={dataList} name="gender" label="Giới tính" form={form} />
        </Grid>

        <Grid item xs={4} className="px-2">
          <SelectField dataList={positions} name="positionId" label="Chức vụ" form={form} />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start">
        <Grid item xs={4} className="px-2">
          <InputField name="address" label="Quê quán" form={form} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <SelectField dataList={specialists} name="specialistId" label="Chuyên khoa" form={form} />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" className="mt-4">
        <Grid item xs={4} className="px-2">
          <InputField name="clinicName" label="Tên phòng khám" form={form} />
        </Grid>
        <Grid item xs={4} className="px-2">
          <InputField name="clinicAddress" label="Địa chỉ phòng khám" form={form} />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" className="mt-4">
        <Grid item xs={12} className="px-2 mt-3 mb-3">
          <Form.Label>Tiểu sử làm việc</Form.Label>
          <MdEditor
            value={markdown}
            style={{ height: 400 }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </Grid>
        <Grid item xs={3} className="px-2">
          <UploadField
            name="avatarImage"
            label="Ảnh đại diện"
            form={form}
            value={form.watch('avatarImage')}
            image={avatarImage}
          />
        </Grid>
        <Grid item xs={3} className="px-2">
          <UploadField
            name="clinicImage"
            label="Ảnh phòng khám"
            form={form}
            value={form.watch('clinicImage')}
            image={clinicImage}
          />
        </Grid>
        <Grid item xs={3} className="px-2">
          <UploadField
            name="licenseImage"
            label="Ảnh chứng chỉ hành nghề"
            form={form}
            value={form.watch('licenseImage')}
            image={licenseImage}
          />
        </Grid>
        <Grid item xs={3} className="px-2">
          <UploadField
            name="certificateImage"
            label="Ảnh giấy phép kinh doanh"
            form={form}
            image={certificateImage}
            value={form.watch('certificateImage')}
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
