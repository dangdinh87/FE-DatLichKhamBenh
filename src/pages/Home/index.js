import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import doctorApi from '../../api/doctorApi';
import ImageRatio from '../../components/ImageRatio';
import ScrollList from '../../components/ScrollList';
import SearchBar from '../../components/SearchBar';
import { API_HOST_STATIC } from '../../constants';
import './index.scss';

function HomePage() {
  const [doctorList, setDoctorList] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

  const getDoctors = async () => {
    try {
      const result1 = await doctorApi.getTopDoctor();
      const result2 = await doctorApi.getNewClinic();
      setDoctorList(result1.data);
      setClinics(result2.data);
    } catch (error) {
      console.log('Failed to fetch doctor', error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const handleSearch = () => {
    history.push(`/booking?search=${search}`);
  };

  return (
    <div className="w-100">
      <div className="home-container">
        <div className="home-box-center">
          <div className="d-flex flex-column w-100 h-100 justify-content-center item-center text-center text-white">
            <p className="fs-4 fw-bolder text-center">Tìm bác sĩ, phòng khám dễ dàng hơn</p>
            <p>Chủ động đặt lịch hẹn thông minh và được chăm sóc tận tình</p>
            <div>
              <InputGroup className="mb-3 py-4">
                <FormControl
                  placeholder="Nhập tên phòng khám hoặc bác sĩ cần tìm"
                  size="md"
                  className="py-4"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="primary" id="button-addon2" onClick={handleSearch}>
                  Tìm kiếm
                </Button>
              </InputGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Dịch vụ của chúng tôi</h5>
        <ScrollList
          listImage={listSectionService}
          renderItem={(el) => <SectionItemService el={el} />}
        />
      </div>

      <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Phòng khám mới</h5>
        <ScrollList listImage={clinics} renderItem={(el) => <SectionSpecialistItem el={el} />} />
      </div>

      <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Bác sĩ nổi bật</h5>
        <ScrollList listImage={doctorList} renderItem={(el) => <SectionDoctorItem el={el} />} />
      </div>

      {/* <div className="section-highlight mt-5">
        <h5 className="ms-2 ">Cẩm nang y tế</h5>
        <ScrollList listImage={doctorList} renderItem={(el) => <SectionDoctorItem el={el} />} />
      </div> */}
    </div>
  );
}

export default HomePage;

function SectionDoctorItem({ el }) {
  const image = `${API_HOST_STATIC}${el.avatarImage}`;
  const history = useHistory();
  return (
    <div className="box-item p-2 " style={{ width: '250px' }}>
      <div className="w-100 bg-white p-3">
        <div style={{ width: '100%' }}>
          <ImageRatio
            src={image}
            ratio="1x1"
            className="rounded border-none img-thumbnail"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="text-center">
          <p className="mt-1  fs-6 mb-2 fw-bold text-center mb-0">
            {el.Position.positionName || 'Bác sĩ'} - {el.fullName}
          </p>
          <p className=" fs-6 mb-0">
            <span className="text-primary d-inline-block fs-6 fw-bold text-danger">
              {el.clinicName}
            </span>
          </p>
          <p className=" fs-6 mb-2">Chuyên khoa {el?.Specialist?.specialistName}</p>
          <Button onClick={() => history.push(`/booking/${el.id}`)}>Xem chi tiết</Button>
        </div>
        {el.numberOfPatientsExamined > 0 ? (
          <p>
            <small className="text-success text-right">
              <b>{el.numberOfPatientsExamined} </b> lượt khám thành công
            </small>
          </p>
        ) : (
          <p>
            <small className="text-success text-right">Chưa có lượt khám</small>
          </p>
        )}
      </div>
    </div>
  );
}

function SectionSpecialistItem({ el }) {
  const image = `${API_HOST_STATIC}${el.clinicImage}`;
  const history = useHistory();
  return (
    <div className="box-item p-2 " style={{ width: '250px' }}>
      <div className="w-100 bg-white p-3">
        <div style={{ width: '100%' }}>
          <ImageRatio
            src={image}
            ratio="1x1"
            className="rounded border-none img-thumbnail"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="text-center">
          <p className="mt-1 fs-6 text-center mb-0 fw-bold">{el.clinicName}</p>
          <small className="  mb-0">{el.clinicAddress}</small>
          <br />
          <small className="  mb-2">Chuyên khoa {el?.Specialist?.specialistName}</small>
          <Button onClick={() => history.push(`/booking/${el.id}`)}>Xem chi tiết</Button>
        </div>
      </div>
    </div>
  );
}

function SectionItemService({ el }) {
  return (
    <div className="box-item p-2" style={{ width: '250px', height: '100%' }}>
      <div
        className="w-100 bg-white d-flex flex-column align-items-center p-3"
        style={{ height: '100%' }}
      >
        <div style={{ width: 100, height: 100 }}>
          <ImageRatio src={el.image} ratio="1x1" className="rounded-circle" />
        </div>
        <p className="mt-2 fw-bold fs-6 mb-2 fw-bold">{el.title}</p>
        <div className="bg-primary w-25" style={{ height: 4 }}></div>
        <p className="mt-1 px-2 text-center">
          <small className="text-muted fs-8"> {el.content} </small>
        </p>
      </div>
    </div>
  );
}

const listSectionService = [
  {
    id: 1,
    title: 'Phòng khám',
    content:
      'Đặt khám theo gói dịch vụ chất lượng, dịch vụ khám bệnh tới từ các đối tác phòng khám uy tín hàng đầu Đà Nẵng.',
    image: require('./../../static/section/benhvien.png').default,
  },
  {
    id: 2,
    title: 'Bác sĩ',
    content:
      'Đặt khám trực tiếp tới đội ngũ bác sĩ có trình độ chuyên môn cao, nhiều năm kinh nghiệm, giàu y đức, giúp bạn hoàn toàn chủ động lựa chọn thời gian khám.',
    image: require('./../../static/section/bacsi.png').default,
  },
  {
    id: 3,
    title: 'Cẩm Nang',
    content:
      'Với lượng bài đăng phong phú, chuyên mục Cẩm nang y tế cung cấp cho bạn nhiều kiến thức bổ ích về sức khỏe, mang tính thực tiễn áp dụng vào.',
    image: require('./../../static/section/camnang.png').default,
  },
  {
    id: 4,
    title: 'Kiểm soát',
    content:
      'Dưới sự giám soát chặt chẽ của sở Y Tế Đà Nẵng giúp bạn hoàn toàn yên tâm về độ uy tín và an toàn khi đặt lịch khám bệnh.',
    image: require('./../../static/section/congdong.png').default,
  },
];
