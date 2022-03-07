import { Container } from '@material-ui/core';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function AboutPage() {
  return (
    <Container maxWidth="lg" flexDirection="row">
      <Card className="mt-4">
        <div className="d-flex align-content-center justify-content-between">
          <div className="me-4 p-4">
            <h5>ISOFHCARE là ứng dụng được quản lý bởi Sở Y Tế Đà Nẵng</h5>
            <p className='mt-2'>
              ISOFHCARE là mạng lưới kết nối các bác sĩ và người bệnh tại khu vực thành phố Đà Nẵng
              nhằm đáp ứng nhu cầu đặt lịch khám bệnh online hiện nay
            </p>
            <p className='mt-3'>Số điện thoại liên hệ: 0977.963.775</p>
            <p>Email : nguyendangdinh47@gmail.com</p>
            <p>Địa chỉ :103 Hùng Vương - Hải Châu - TP. Đà Nẵng </p>
            <p></p>
            <p></p>
          </div>
          <div>
            <iframe
              title="Sở Y Tế Đà Nẵng"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9516811277813!2d108.21582931465136!3d16.067996988881706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421834448d22dd%3A0x6ca474a094bd07ce!2zU-G7nyBZIFThur8gVFAgxJDDoCBO4bq1bmc!5e0!3m2!1svi!2s!4v1644945418201!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </Card>
    </Container>
  );
}
