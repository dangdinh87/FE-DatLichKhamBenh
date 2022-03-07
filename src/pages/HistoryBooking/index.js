import { Container } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Card, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import bookingApi from '../../api/bookingApi';

function HistoryBookingPage() {
  let [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  // const doctor = useSelector((state) => state.doctor.current);
  const id = JSON.parse(localStorage.getItem('user'))?.Patient?.id || null;
  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const data = await bookingApi.getByPatientId(id);
        setBookings(data.data);
        setLoading(true);
      } catch (error) {
        console.log('Failed to fetch list booking', error);
      }
      setLoading(false);
    })();
  }, [id]);

  const getStatus = (status = null) => {
    switch (status) {
      case 'UNCOMFIRMED':
        return <Badge bg="dark">Chưa xác nhận</Badge>;
      case 'BOOKED':
        return <Badge bg="info">Đã xác nhận</Badge>;
      case 'COMPLETED':
        return <Badge bg="primary">Đã khám</Badge>;
      case 'CANCELED':
        return <Badge bg="secondary">Đã hủy</Badge>;
      default:
        return <Badge bg="dark">Chưa xác nhận</Badge>;
    }
  };

  const handleSelectStatus = (e) => {
    setFilter(e.target.value);
  };

  if (filter) {
    bookings = [...bookings].filter((booking) => booking.status === filter);
  }

  return (
    <Container maxWidth="md">
      <h3 className="text-center text-uppercase">Danh sách đặt lịch khám bệnh</h3>
      <div className="d-flex container mb-2 justify-content-end w-100" style={{ width: 400 }}>
        <div className="d-flex">
          <Form.Group controlId="formGridEmail">
            {/* <Form.Label>Trạng thái</Form.Label> */}
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => handleSelectStatus(e)}
            >
              {/* <option value="">Trạng thái</option> */}
              <option value="">Tất cả</option>
              <option value="UNCOMFIRM">Chưa xác nhận</option>
              <option value="BOOKED">Đã xác nhận</option>
              <option value="COMPLETED">Đã khám</option>
              <option value="CANCELED">Đã hủy</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      <div class="container">
        <Card className="p-4">
          <div class="row">
            <div class="col-12">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Mã Lịch Khám</th>
                    <th scope="col">Thời gian khám</th>
                    <th scope="col">Ngày khám</th>
                    <th scope="col">Lí do khám bệnh</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.length > 0 &&
                    bookings.map((el) => {
                      return (
                        <tr>
                          <th scope="row">{el.id}</th>
                          <td className="fw-bold">{el.TimeSlot.value}</td>
                          <td>{moment.unix(el.dateBooking / 1000).format('DD/MM/YYYY')}</td>
                          <td>{el.reasonExamination}</td>
                          <td>{getStatus(el.status)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {bookings?.length === 0 && <Alert variant="warning">Không có dữ liệu !</Alert>}
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default HistoryBookingPage;
