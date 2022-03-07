import { Container } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import doctorApi from '../../api/doctorApi';
import ImageRatio from '../../components/ImageRatio';
import { API_HOST_STATIC } from '../../constants';
import { useHistory, useLocation } from 'react-router-dom';
import positionApi from '../../api/positionApi';
import specialistApi from '../../api/specialistApi';
import { Pagination } from '@mui/material';
import queryString from 'query-string';
function BookingPage({ doctor }) {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [search, setSearch] = useState(urlParams.get('search') || '');
  const [doctorList, setDoctorList] = useState([]);
  const [positions, setPositions] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 6,
    page: 1,
    total: 10,
  });

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 6,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const result = await doctorApi.getALl(queryParams);
        setDoctorList(result?.data?.data);
        setPagination({ ...pagination, total: result?.data?.count });
      } catch (error) {
        console.log('Failed to fetch list doctor', error);
      }
    })();
  }, [queryParams]);

  useEffect(() => {
    (async () => {
      try {
        const dataPositions = await positionApi.getALl();
        const dataSpecialist = await specialistApi.getALl();
        setPositions(dataPositions.data);
        setSpecialists(dataSpecialist.data);
      } catch (e) {
        console.log('fail to fetch data');
      }
    })();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    const newFilters = { ...queryParams, search: value.trim(), page: 1 };
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const handleChangePagination = (_, page) => {
    setPagination({ ...pagination, page: page });
    const filters = { ...queryParams, page };
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handlePositionChange = (e) => {
    const newFilters = { ...queryParams, position: e.target.value, page: 1 };
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const handleSpecialistChange = (e) => {
    const newFilters = { ...queryParams, specialist: e.target.value, page: 1 };
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Container maxWidth="md" className="mt-3">
      {search && (
        <p>
          Kết quả tìm kiếm với từ khóa <b>"{search}"</b>
        </p>
      )}
      <Card>
        <h5 className="text-center mt-3">Danh sách các bác sĩ</h5>
        <div className="d-flex container mb-2 justify-content-between w-100">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="col-6">
              <FormControl
                placeholder="Nhập tên phòng khám hoặc bác sĩ cần tìm"
                size="md"
                className="w-100 py-2"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {/* <Button variant="primary" id="button-addon2" onClick={handleSearch}>
                Tìm kiếm
              </Button> */}
            <div className="col-3 ps-2">
              <Form.Select onChange={handleSpecialistChange}>
                <option value="">Chuyên khoa</option>
                {specialists?.length > 0 &&
                  specialists.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.specialistName}
                      </option>
                    );
                  })}
              </Form.Select>
            </div>
            <div className="col-3 ps-2">
              <Form.Select onChange={handlePositionChange}>
                <option value="">Chức Vụ</option>
                {positions?.length > 0 &&
                  positions.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.positionName}
                      </option>
                    );
                  })}
              </Form.Select>
            </div>
          </div>
        </div>

        <div>
          <Row className="mx-3 mt-4">
            {doctorList?.length > 0 &&
              doctorList.map((doctor) => {
                const image = `${API_HOST_STATIC}${doctor.avatarImage}`;
                return (
                  <Col sm={4} className="bg-white">
                    <div className="box-item p-2 b">
                      <div className="w-100 bg-white p-2">
                        <div style={{ width: '100%' }}>
                          <ImageRatio
                            src={image}
                            ratio="1x1"
                            className="rounded border-none img-thumbnail"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className="text-center">
                          <p className="mt-1 fs-6 fw-bold text-center mb-0">
                            {doctor.Position.positionName || 'Bác sĩ'} - {doctor.fullName}
                          </p>
                          {doctor.numberOfPatientsExamined > 0 ? (
                            <p>
                              <small className="text-success text-right">
                                <b>({doctor.numberOfPatientsExamined} </b> lượt khám )
                              </small>
                            </p>
                          ) : (
                            <p>
                              <small className="text-success text-right">Chưa có lượt khám</small>
                            </p>
                          )}
                          <p className=" fs-6 mb-0">
                            <small className=" d-inline-block d-block fw-bold">
                              {doctor.clinicName}
                            </small>
                          </p>
                          <small className=" d-block mb-2">
                            Chuyên khoa {doctor?.Specialist?.specialistName}
                          </small>
                          <Button onClick={() => history.push(`/booking/${doctor.id}`)}>
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            {doctorList?.length === 0 && <Alert variant="warning">Không tìm thấy bác sĩ</Alert>}
          </Row>
        </div>
        <div className="mx-auto my-3">
          {Math.ceil(pagination.total / pagination.limit) >= 1 && (
            <Pagination
              count={Math.ceil(pagination.total / pagination.limit)}
              variant="outlined"
              shape="rounded"
              page={pagination.page}
              onChange={handleChangePagination}
            />
          )}
        </div>
      </Card>
    </Container>
  );
}

export default BookingPage;
