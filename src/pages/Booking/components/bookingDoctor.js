import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import localization from 'moment/locale/vi';
import doctorApi from '../../../api/doctorApi';
import scheduleApi from '../../../api/scheduleApi';
import ImageRatio from '../../../components/ImageRatio';
import { API_HOST_STATIC } from '../../../constants';

function BookingDetailPage() {
  const params = useParams();
  const history = useHistory();
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arrayDate, setArrayDate] = useState(() => {
    let arrDate = [];
    for (let index = 0; index < 7; index++) {
      let object = {};
      object.label = moment(new Date()).add(index, 'days').format('dddd - DD/MM');
      object.value = moment(new Date()).add(index, 'days').startOf('day').valueOf();

      arrDate.push(object);
    }
    return arrDate;
  });
  const [selectSchedule, setSelectSchedule] = useState(arrayDate[0]?.value || '');
  const [schedule, setSchedule] = useState([]);
  const image = `${API_HOST_STATIC}${doctor?.avatarImage}`;
  const imageClinic = `${API_HOST_STATIC}${doctor?.clinicImage}`;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = {};
        data.doctorId = params.id;
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
  }, [params.id, selectSchedule]);

  useEffect(() => {
    (async () => {
      try {
        const result = await doctorApi.getById(params);
        setDoctor(result.data);
        console.log(result);
      } catch (error) {
        console.log('Failed to fetch user', error);
      }
    })();
  }, []);

  const handleSelectDate = (e) => {
    setSelectSchedule(e.target.value);
  };

  const handleSelectTime = (item) => {
    if (item)
      history.push(`/booking/${params.id}/${item.id}`, { data: { schedule, doctor, item } });
  };
  return (
    <div className="container-md mt-3 " style={{ width: 1140 }}>
      <Card className="p-4">
        <div className="d-flex justify-content-start ">
          <div style={{ width: 200 }} className=" flex-shrink-0 ">
            <ImageRatio ratio={'1x1'} src={image} style={{ objectFit: 'cover' }} />
          </div>
          <div className="ms-4 flex-shrink-0">
            <h5>
              <b>
                {doctor?.Position?.positionName || 'Bác sĩ'} - {doctor.fullName}
              </b>
            </h5>
            <i class="bi bi-hospital"></i> <p className="fw-medium">{doctor.clinicName}</p>
            <em>
              <i class="bi bi-geo-alt-fill"></i>
              <small> {doctor.clinicAddress}</small>
            </em>
            <p className="text-success">
              <small>
                Chuyên khoa <b>{doctor?.Specialist?.specialistName}</b>
              </small>
            </p>
          </div>
          <div
            className="h-100 align-self-baseline"
            style={{ width: 300, objectFit: 'cover', marginLeft: 'auto' }}
          >
            <ImageRatio
              className="h-100 flex-shrink-0"
              ratio={'4x3'}
              src={imageClinic}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="mt-4" style={{ width: 300 }}>
          {arrayDate?.length && (
            <Form.Select style={{ textTransform: 'capitalize' }} onChange={handleSelectDate}>
              {arrayDate.map((item) => {
                return <option value={item.value}>{item.label}</option>;
              })}
            </Form.Select>
          )}
        </div>
        {loading ? (
          <p>Loading... </p>
        ) : (
          <div>
            {schedule?.TimeSlots?.length && (
              <p className="fw-bold mt-2 ms-2">Vui lòng chọn khung giờ đặt lịch</p>
            )}
            {schedule?.TimeSlots?.length > 0 ? (
              schedule?.TimeSlots?.sort(
                (a, b) => parseInt(a.orderIndex) - parseInt(b.orderIndex)
              ).map((item, index) => (
                <Button
                  variant={`${item.status ? 'warning' : 'outline-primary'}`}
                  className="m-2 text-dark"
                  key={index}
                  style={{ cursor: item.status ? '' : 'not-allowed ' }}
                  disabled={item.status ? false : true}
                  onClick={() => handleSelectTime(item)}
                >
                  {item.value}
                </Button>
              ))
            ) : (
              <Alert className="mt-2" variant="warning">
                Không tim thấy lịch khám . Vui lòng chọn ngày khác!
              </Alert>
            )}
          </div>
        )}

        {doctor.workHistory && (
          <div className="mt-2 bg-light p-3 shadow-sm">
            <h5>Tiểu sử làm việc</h5>
            <div dangerouslySetInnerHTML={{ __html: doctor.workHistory }}></div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default BookingDetailPage;
