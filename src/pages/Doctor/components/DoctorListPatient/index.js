import React, { useEffect, useState } from 'react';
import { Alert, Badge, Card, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import bookingApi from '../../../../api/bookingApi';
import moment from 'moment';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import { getDoctorDetail } from '../../doctorSlice';

export default function DoctorListDetail() {
  const dispatch = useDispatch();
  let [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctor = useSelector((state) => state.doctor.current);

  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (!doctor.id) return;
    (async () => {
      try {
        setLoading(true);
        const data = await bookingApi.getByDoctorId(doctor.id);
        setBookings(data.data);
        setLoading(true);
      } catch (error) {
        console.log('Failed to fetch list booking', error);
      }
      setLoading(false);
    })();
  }, [doctor]);

  useEffect(() => {
    (async () => {
      try {
        unwrapResult(await dispatch(getDoctorDetail(doctor.id)));
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    })();
  }, [bookings]);

  const getStatus = (status = null) => {
    switch (status) {
      case 'UNCONFIRMED':
        return <Badge bg="dark">Chưa xác nhận</Badge>;
      case 'CONFIRMED':
        return <Badge bg="info">Đã xác nhận</Badge>;
      case 'COMPLETED':
        return <Badge bg="primary">Đã khám</Badge>;
      case 'CANCELED':
        return <Badge bg="secondary">Đã hủy</Badge>;
      default:
        return <Badge bg="dark">Chưa xác nhận</Badge>;
    }
  };

  const handleClickSuccess = async (id, status) => {
    const data = bookingApi.updateStatus(id, status, doctor.id);
    if (data) {
      toast.success('Cập nhật thành công');
      const data = await bookingApi.getByDoctorId(doctor.id);
      setBookings(data.data);
    }
  };

  const handleClickCancel = async (id, status) => {
    const data = bookingApi.updateStatus(id, status, doctor.id);
    if (data) {
      toast.success('Hủy thành công');
      const data = await bookingApi.getByDoctorId(doctor.id);
      setBookings(data.data);
    }
  };

  const handleSelectStatus = (e) => {
    setFilter(e.target.value);
  };

  const getAction = (id, status = null) => {
    switch (status) {
      case 'UNCONFIRMED':
        return <p></p>;
      case 'CONFIRMED':
        return (
          <>
            <button
              type="button"
              class="btn btn-primary btn-sm me-3"
              onClick={() => handleClickSuccess(id, 'COMPLETED')}
            >
              <i class="far fa-eye"></i>Xác nhận khám
            </button>
            <button
              type="button"
              class="btn btn-danger  btn-sm"
              onClick={() => handleClickCancel(id, 'CANCELED')}
            >
              <i class="far fa-trash-alt"></i>Hủy
            </button>
          </>
        );
      case 'COMPLETED':
        return <p></p>;
      case 'CANCELED':
        return <p></p>;
      default:
        return <p></p>;
    }
  };
  if (doctor.status === 'NOT_ACTIVE' || doctor.status === 'PENDING')
    return <Alert variant="danger">Bạn không được sử dụng chức năng này</Alert>;
  if (filter) {
    bookings = [...bookings].filter((booking) => booking.status === filter);
  }

  return (
    <div>
      <h3 className="text-center text-uppercase">Danh sách đặt lịch khám bệnh</h3>
      <p className="ms-4">
        {doctor?.numberOfPatientsExamined ? (
          <p>Số lượt đặt khám thành công : {doctor.numberOfPatientsExamined}</p>
        ) : (
          ''
        )}{' '}
      </p>
      {doctor.status === 'NOT_ACTIVE' || doctor.status === 'PENDING' ? (
        <Alert variant="danger">Bạn không có quyền sử dụng chức năng này </Alert>
      ) : (
        <>
          <div className="d-flex container mb-2 justify-content-end w-100" style={{ width: 400 }}>
            <div className="d-flex">
              <Form.Group controlId="formGridEmail">
                {/* <Form.Label>Trạng thái</Form.Label> */}
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleSelectStatus(e)}
                >
                  <option value="">Tất cả</option>
                  <option value="UNCONFIRMED">Chưa xác nhận</option>
                  <option value="CONFIRMED">Đã xác nhận</option>
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
                        <th scope="col">Tên Bệnh Nhân</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Thời gian khám</th>
                        <th scope="col">Ngày khám</th>
                        <th scope="col">Lí do khám bệnh</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.length > 0 &&
                        bookings.map((el) => {
                          return (
                            <tr>
                              <td>{el.Patient.fullName}</td>
                              <td>{el.Patient.phone}</td>
                              <td className="fw-bold">{el.TimeSlot.value}</td>
                              <td>{moment.unix(el.dateBooking / 1000).format('DD/MM/YYYY')}</td>
                              <td>{el.reasonExamination}</td>
                              <td>{getStatus(el.status)}</td>
                              <td>{getAction(el.id, el.status)}</td>
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
        </>
      )}
    </div>
  );
}
