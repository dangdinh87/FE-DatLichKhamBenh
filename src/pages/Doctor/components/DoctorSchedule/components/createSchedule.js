/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { TimePickerComponent, DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';
import { Button, Card, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '../../../../../components/InputField';
import scheduleApi from '../../../../../api/scheduleApi';
import { useHistory } from 'react-router-dom';
// @import "~@syncfusion/ej2-dropdowns/styles/bootstrap.scss";
// import './style.scss';
export default function DoctorScheduleCreate() {
  const userLogin = JSON.parse(localStorage.getItem('user')) || null;
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date('9/6/2022 7:00'));
  const [endTime, setEndTime] = useState(new Date('9/6/2022 17:00'));
  const [timeRange, setTimeRange] = useState(0.5);
  const [schedule, setSchedule] = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleRenderSchedule();
  }, []);

  const handleDatePickerChange = (date) => {
    setStartDate(date);
  };

  const handleSelectTime = (id) => {
    const newSchedule = [...schedule];
    let index = newSchedule.findIndex((item) => item.orderIndex === id);
    newSchedule[index].status = !newSchedule[index].status;
    setSchedule(newSchedule);
  };

  const handleSelectRangeTime = (e) => {
    const { value } = e.target;
    // setTimeRange(value);
    form.setValue('rangeTime', value);
    if (endTime || startTime || value) handleRenderSchedule(null, null, value);
  };

  const handleSelectStartTime = (args) => {
    //setState bất đồng bộ nên không thể dùng state để tính toán
    const { value } = args;
    setStartTime(value);
    if (value > endTime) setEndTime(value);
    if (endTime || value || timeRange) handleRenderSchedule(value, null, null);
  };

  const handleSelectEndTime = (args) => {
    const { value } = args;
    setEndTime(value);
    if (startTime || value || timeRange) handleRenderSchedule(null, value, null);
  };

  const handleRenderSchedule = (start, end, step) => {
    const newStartTime = start || new Date(startTime);
    const newEndTime = end || new Date(endTime);
    const newStep = parseFloat(step || timeRange);
    const calculatorHours = newEndTime.getHours() - newStartTime.getHours();
    const arrayTimeSlot = [];
    for (let index = 0; index < calculatorHours / newStep; index++) {
      const timeSlot = newStartTime.getHours() + index * newStep;
      const newTimeSlot = moment.utc(parseFloat(timeSlot) * 3600 * 1000).format('HH:mm');
      const newToTimeSlot = moment
        .utc(parseFloat(timeSlot + newStep) * 3600 * 1000)
        .format('HH:mm');
      const objValueTime = {
        orderIndex: index,
        value: `${newTimeSlot} - ${newToTimeSlot}`,
        status: true,
      };

      if (parseFloat(timeSlot + newStep) <= newEndTime.getHours()) {
        arrayTimeSlot.push(objValueTime);
      }
    }
    setSchedule(arrayTimeSlot);
  };

  const schema = yup.object().shape({
    startTime: yup.date().required().typeError('Vui lòng chọn thời gian'),
    endTime: yup.date().required().typeError('Vui lòng chọn thời gian'),
    rangeTime: yup.number().required('Vui lòng chọn khoảng thời gian'),
    workingDay: yup.date().required().typeError('Vui lòng chọn ngày'),
    priceTimeSlot: yup.string().required('Vui lòng nhập giá khám'),
    maxNumberTimeSlot: yup.string().required('Vui lòng nhập số lượng bệnh nhân tối đa'),
  });
  const form = useForm({
    defaultValues: {
      startTime: '',
      endTime: '',
      rangeTime: 0.5,
      workingDay: startDate,
      priceTimeSlot: '',
      maxNumberTimeSlot: '',

      // password: '',
    },
    resolver: yupResolver(schema),
    mode: onchange,
  });

  const handleSubmit = async (values) => {
    try {
      values.arrSchedule = [...schedule];
      values.workingDay = moment(values.workingDay).startOf('day').valueOf();
      values.startTime = values.startTime.getHours();
      values.endTime = values.endTime.getHours();
      values.doctorId = userLogin?.Doctor?.id;

      const data = await scheduleApi.create(values);
      // history.push('/');
      if (data) toast.success('Tạo lịch khám thành công !');

      // unwrapResult(await dispatch(login(values)));
      // toast.success('Đăng nhập thành công !');
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };
  const {
    formState: { errors },
  } = form;
  // const hasError = errors[name];

  return (
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <a href="#" onClick={() => history.goBack()}>
        Quay lại
      </a>
      <h3 className="text-center text-uppercase ">Tạo lịch bác sĩ</h3>
      <Controller
        name={'workingDay'}
        control={form.control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <Form.Group
            className="mb-3 me-3"
            style={{ width: 310 }}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className="text-success">Chọn ngày làm việc</Form.Label>
            <DatePickerComponent
              ref={ref}
              format="dd/MM/yyyy"
              value={value}
              onChange={onChange}
              change={(date) => handleDatePickerChange(date)}
              min={new Date()}
              name={name}
            />

            <p className="text-danger mt-1">{errors[name]?.message}</p>
          </Form.Group>
        )}
      />
      <div class="input-group ">
        <Controller
          name={'startTime'}
          control={form.control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Form.Group className="mb-3 me-3 d-block" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-success">Thời gian bắt đầu</Form.Label>
              <TimePickerComponent
                ref={ref}
                id="mintimepick"
                // value={startTime}
                onChange={onChange}
                change={handleSelectStartTime}
                min={new Date('9/6/2022 7:00')}
                max={new Date('9/6/2022 22:00')}
                format="HH:mm"
                enableMask={true}
                step={60}
                allowEdit={false}
                className="bg-white"
                name={name}
              />
              <p className="text-danger mt-1">{errors[name]?.message}</p>
            </Form.Group>
          )}
        />
        <Controller
          name={'endTime'}
          control={form.control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Form.Group className="mb-3 me-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-success">Thời gian nghỉ</Form.Label>
              <TimePickerComponent
                ref={ref}
                min={startTime}
                max={new Date('9/6/2022 22:00')}
                onChange={onChange}
                id="maxtimepick"
                enabled={!!startTime}
                // value={endTime}
                format="HH:mm"
                enableMask={true}
                change={handleSelectEndTime}
                step={60}
                allowEdit={false}
                className="bg-white"
                name={name}
                size="sm"
              />
              <p className="text-danger mt-1">{errors[name]?.message}</p>
            </Form.Group>
          )}
        />
        <Controller
          name={'rangeTime'}
          control={form.control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Form.Group className="" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-success">Thời gian mỗi khung giờ</Form.Label>
              <Form.Select
                style={{ height: 28 }}
                onChange={(onChange, (e) => handleSelectRangeTime(e))}
                className="fs-8 fw-light form-control form-control-sm"
                value={value}
                name={name}
              >
                <option value={0.25}>15 phút</option>
                <option value={0.5}>30 phút</option>
                <option value={0.75}>45 phút</option>
                <option value={1}>1 tiếng</option>
                <option value={1.25}>1 tiếng 15 phút</option>
                <option value={1.5}>1 tiếng 30 phút</option>
                <option value={2}>2 tiếng</option>
              </Form.Select>
              <p className="text-danger ">{errors[name]?.message}</p>
            </Form.Group>
          )}
        />
      </div>

      <div className="d-flex flex-wrap">
        {schedule?.map((item, index) => {
          return (
            <Button
              variant={`${item.status ? 'warning' : 'outline-warning'}`}
              className="m-2 text-dark"
              key={index}
              onClick={() => handleSelectTime(item.orderIndex)}
            >
              {item.value}
            </Button>
          );
        })}
      </div>
      <div class="input-group mt-3">
        <div className="me-3">
          <InputField label="Nhập giá mỗi khung giờ" type="text" name="priceTimeSlot" form={form} />
        </div>
        <InputField
          label="Nhập số lượng bênh nhân mỗi khung giờ"
          type="number"
          name="maxNumberTimeSlot"
          form={form}
        />
      </div>

      {/* <Button variant="primary">Primary</Button>{' '} */}
      <Button className="bg-success" type="submit">
        Tạo Lịch
      </Button>
      <a className="btn btn-danger ms-2" href="#">
        Quay Lại
      </a>
    </Form>
  );
}
