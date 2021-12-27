import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import ImageRatio from '../../components/ImageRatio';
import ScrollList from '../../components/ScrollList';
import SearchBar from '../../components/SearchBar';
import './index.scss';
function SectionItem({ el }) {
  return (
    <div className="box-item p-2" style={{ width: '250px' }}>
      <div className="w-100  bg-white">
        <div style={{ width: '100%' }}>
          <ImageRatio src={el.photo} ratio="1x1" className="rounded border-none" />
        </div>
        <p className="mt-1 max-line__ellipses ">{el.name}</p>
        <p className="mt-2 fs-6">
          <span className="text-muted item-text-profi ">Giá từ: </span>
          <span className="text-primary d-inline-block fs-6 fw-bold text-danger">33.000đ</span>
        </p>
        <p className="text-muted fs-6 item-text-profit">Hoa hồng: 12.000đ</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const listsection = [
    {
      id: 123,
      value: 'Ok OK',
      photo:
        'https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/psg-nguyen-quang-bv-viet-duc_e54adbb8_6d30_40fd_98dd_7abc913665f7.jpg',
    },
    {
      id: 222,
      value: 'Ok OK',
      photo:
        'https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/psg-nguyen-quang-bv-viet-duc_e54adbb8_6d30_40fd_98dd_7abc913665f7.jpg',
    },
    {
      id: 333,
      value: 'Ok OK',
      photo:
        'https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/psg-nguyen-quang-bv-viet-duc_e54adbb8_6d30_40fd_98dd_7abc913665f7.jpg',
    },
    {
      id: 333,
      value: 'Ok OK',
      photo:
        'https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/psg-nguyen-quang-bv-viet-duc_e54adbb8_6d30_40fd_98dd_7abc913665f7.jpg',
    },
  ];

  return (
    <div className="w-100">
      <div className="home-container">
        <div className="home-box-center">
          <div className="d-flex flex-column w-100 h-100 justify-content-center item-center text-center text-white">
            <p className="fs-4 fw-bolder text-center">Tìm bác sĩ, bệnh viện dễ dàng hơn</p>
            <p>Chủ động đặt lịch hẹn thông minh và được chăm sóc tận tình</p>
            <div>
              <InputGroup className="mb-3 py-4">
                <FormControl
                  placeholder="Nhập tên phòng khám hoặc bác sĩ cần tìm"
                  size="lg"
                  className="py-3"
                />
                <Button variant="primary" id="button-addon2">
                  Tìm kiếm
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Dịch vụ của chúng tôi</h5>
        <ScrollList listImage={listsection} renderItem={(el) => <SectionItem el={el} />} />
      </div>

      <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Phòng khám nổi bật</h5>
        <ScrollList listImage={listsection} renderItem={(el) => <SectionItem el={el} />} />
      </div>

      <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Bác sĩ nổi bật</h5>
        <ScrollList listImage={listsection} renderItem={(el) => <SectionItem el={el} />} />
      </div>

      <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Cẩm nang y tế</h5>
        <ScrollList listImage={listsection} renderItem={(el) => <SectionItem el={el} />} />
      </div>
    </div>
  );
}
