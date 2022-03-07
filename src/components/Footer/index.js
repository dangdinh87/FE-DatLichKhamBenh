import React from 'react';
import './index.scss';
import logo from '../../static/logo.svg';

export default function Footer() {
  return (
    <footer className=" footer-container ">
      <div className="mt-4 mx-auto" style={{ maxWidth: '1000px' }}>
        {/* <div className="d-flex justify-content-center flex-wrap mx-auto">
          <div className="footer-menu">QUY CHẾ HOẠT ĐỘNG SÀN GĐTMĐT</div>
          <div className="footer-menu">CHÍNH SÁCH ĐỔI TRẢ</div>
          <div className="footer-menu">CHÍNH SÁCH BẢO MẬT</div>
          <div className="footer-menu">CHÍNH SÁCH GIAO HÀNG VÀ THANH TOÁN</div>
          <div className="footer-menu">CHÍNH SÁCH GIẢI QUYẾT KHIẾU NẠI</div>
        </div> */}
        <div className="text-center">
          <div className="d-flex align-content-center justify-content-center">
            <img src={logo} alt="Error" />
            <h4 className="mb-4 mt-4 ms-4 text-secondary">Ứng dụng đặt khám online hàng đầu</h4>
          </div>
          <p>
            <b>Địa chỉ</b> : Sở Y Tế TP. Đà Nẵng, 103 Hùng Vương, Quận Hải Châu, Thành phố
            Đà Nẵng, Việt Nam
          </p>
          <p>
            <b>Hotline : </b>
            0977.963.775
          </p>
          <p>
            <b>Email : </b> 
            dangdinh47@selly.vn
          </p>
        </div>
      </div>
      <div className="bg-white">
        <p className="text-black container py-4 mb-0 ms-4">© 2021 Isofcare.</p>
      </div>
    </footer>
  );
}
