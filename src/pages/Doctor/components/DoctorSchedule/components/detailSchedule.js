import React, { useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { TimePickerComponent, DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import moment from 'moment';
import scheduleApi from '../../../../../api/scheduleApi';
import { useSelector } from 'react-redux';

export default function DoctorScheduleDetail() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const id = JSON.parse(localStorage.getItem('user'))?.Doctor?.id;
  const [selectSchedule, setSelectSchedule] = useState(moment(new Date()).startOf('day').valueOf());
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const doctor = useSelector((state) => state.doctor.current);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = {};
        data.doctorId = id;
        data.workingDay = selectSchedule;
        const result = await scheduleApi.getByDate(data);
        setSchedule(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setSchedule(null);
        console.log('Failed to fetch schedule', error);
      }
    })();
  }, [id, selectSchedule]);

  const handleSelectDate = (date) => {
    setSelectSchedule(moment(date.value).startOf('day').valueOf());
  };

  const handleDatePickerChange = (date) => {
    setSchedule(date);
  };

  if (doctor.status === 'NOT_ACTIVE' || doctor.status === 'PENDING')
    return <Alert variant="danger">Bạn không được sử dụng chức năng này</Alert>;
  return (
    <div>
      <h3 className="text-center text-uppercase">Quản lí lịch khám</h3>

      <div style={{ width: 400 }}>
        <span>Chọn ngày</span>
        <DatePickerComponent
          format="dd/MM/yyyy"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          change={(date) => handleSelectDate(date)}
          min={new Date().getDate() - 1}
        />
      </div>
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          {schedule?.TimeSlots?.length && (
            <p className="fw-bold mt-2 ms-2">Các khung giờ khám theo ngày </p>
          )}
          {schedule?.TimeSlots?.length > 0 ? (
            <div>
              {schedule?.TimeSlots?.sort(
                (a, b) => parseInt(a.orderIndex) - parseInt(b.orderIndex)
              ).map((item, index) => (
                <Button
                  variant={`${item.status ? 'warning' : 'outline-primary'}`}
                  className="m-2 text-dark"
                  key={index}
                  style={{ cursor: item.status ? '' : 'not-allowed ' }}
                  disabled={item.status ? false : true}
                  // onClick={() => handleSelectTime(item)}
                >
                  {item.value}
                </Button>
              ))}
            </div>
          ) : (
            <Alert className="mt-2" variant="warning">
              Không tim thấy lịch khám .Vui lòng chọn ngày khác hoặc{' '}
              <Button onClick={() => history.push('/doctor/schedule/create')}>Tạo lịch</Button>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}
