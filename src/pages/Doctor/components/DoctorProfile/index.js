/* eslint-disable react-hooks/rules-of-hooks */
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Alert, Card, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import doctorApi from '../../../../api/doctorApi';
import positionApi from '../../../../api/positionApi';
import specialistApi from '../../../../api/specialistApi';
import DoctorProfileForm from './form';

function DoctorProfile({ onSubmit }) {
  const id = JSON.parse(localStorage.getItem('user'))?.Doctor?.id;
  // const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  const doctor = useSelector((state) => state.doctor.current);

  console.log(doctor);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // const result = await doctorApi.getById({ id });
        const dataPositions = await positionApi.getALl();
        const dataSpecialist = await specialistApi.getALl();
        // setDoctor(result.data);
        setPositions(dataPositions.data);
        setSpecialists(dataSpecialist.data);
        setLoading(true);
      } catch (error) {
        console.log('Failed to fetch doctor', error);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  const getDoctorProfile = (status = null) => {
    switch (status) {
      case 'NOT_ACTIVE':
        return (
          <>
            <Alert variant="warning">
              Vui lòng đăng kí đầy đủ thông tin đến sở Y Tế để sử dụng hệ thống! Xin cảm ơn.
            </Alert>
            <h4 className="fw-bold text-center">ĐĂNG KÍ THÔNG TIN BÁC SĨ</h4>
            <DoctorProfileForm doctor={doctor} positions={positions} specialists={specialists} />
          </>
        );
      case 'PENDING':
        return (
          <Alert variant="success">
            Bạn đã đăng kí thông tin thành công, vui lòng đợi Sở Y Tế duyệt hồ sơ! Xin cảm ơn.
          </Alert>
        );
      case 'ACTIVE':
        return (
          <>
            <h4 className="fw-bold text-center">CẬP NHẬT THÔNG TIN BÁC SĨ</h4>
            <DoctorProfileForm doctor={doctor} positions={positions} specialists={specialists} />
          </>
        );
      case 'CANCEL':
        return (
          <Alert variant="danger">
            Thông tin không được duyệt. Vui lòng liên hệ Sở Y Tế Đà Nẵng <b>0977 963 775</b>. Xin
            cảm ơn
          </Alert>
        );
      default:
        return <Alert variant="warning">Người dùng chưa xác định</Alert>;
    }
  };

  return (
    <Container>
      <Card component="main" className="p-4">
        {getDoctorProfile(doctor?.status)}
      </Card>
    </Container>
  );
}

export default DoctorProfile;
