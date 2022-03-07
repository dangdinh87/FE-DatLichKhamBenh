import React, { useEffect, useState } from 'react';
import SearchBar from '../../../../components/SearchBar';
import doctorApi from '../../../../api/doctorApi';
import { Card, Spinner, Button, Modal, Badge, Form } from 'react-bootstrap';
import ImageRatio from '../../../../components/ImageRatio';
import { API_HOST_STATIC } from '../../../../constants';
import { toast } from 'react-toastify';
import { Alert, Breadcrumbs, Pagination, Typography } from '@mui/material';

export default function DoctorList() {
  let [doctor, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState({
    total: 20,
    limit: 10,
    page: 1,
  });
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await doctorApi.getALlFromAdmin();
        setDoctors(data.data);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch list doctor', error);
      }
      setLoading(false);
    })();
  }, [filter]);

  if (loading) return <Spinner animation="border"></Spinner>;
  const getStatus = (status = null) => {
    switch (status) {
      case 'NOT_ACTIVE':
        return <Badge bg="dark">Chưa kích hoạt</Badge>;
      case 'PENDING':
        return <Badge bg="info">Chờ xác nhận</Badge>;
      case 'ACTIVE':
        return <Badge bg="primary">Đã kích hoạt</Badge>;
      case 'CANCEL':
        return <Badge bg="secondary">Từ chối</Badge>;
      default:
        return <Badge bg="dark">Chưa xác nhận</Badge>;
    }
  };

  const contentModal = (el) => {
    const image1 = `${API_HOST_STATIC}${el.avatarImage}`;
    setShow(
      <Modal size="lg" show={true} onHide={() => setShow(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Chi tiết Hồ sơ bác sĩ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="row ">
            <div class="col-3 text-muted fs-6">Họ và tên</div>
            <div class="col ">
              <b>{el?.fullName}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Số điện thoại </div>
            <div class="col ">
              <b>{el?.phone}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Email </div>
            <div class="col ">
              <b>{el?.email}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Ngày Sinh </div>
            <div class="col ">
              <b>{el?.date}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Quê quán </div>
            <div class="col ">
              <b>{el?.address}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Tên phòng khám</div>
            <div class="col ">
              <b>{el?.clinicName}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Địa chỉ phòng khám </div>
            <div class="col ">
              <b>{el?.clinicAddress}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Chức vụ </div>
            <div class="col ">
              <b>{el?.Position?.positionName}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Chuyên khoa </div>
            <div class="col ">
              <b>{el?.Specialist?.specialistName}</b>
            </div>
          </div>
          <div class="row">
            <div class="col-3 text-muted fs-6">Tiểu sử làm việc </div>
            <div class="col ">
              <div dangerouslySetInnerHTML={{ __html: el?.workHistory }}></div>
            </div>
          </div>
          <div className="d-flex">
            <div class="col-3 text-muted fs-6">Ảnh cá nhân </div>
            <div class="col-8 border shadow">
              <ImageRatio ratio={'1x1'} src={image1} style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="d-flex mt-4">
            <div class="col-3 text-muted fs-6">Ảnh phòng khám </div>
            <div class="col-8 border shadow">
              <ImageRatio
                ratio={'1x1'}
                src={`${API_HOST_STATIC}${el.clinicImage}`}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="d-flex mt-4">
            <div class="col-3 text-muted fs-6">Ảnh chứng chỉ hành nghề </div>
            <div class="col-8 border shadow">
              <ImageRatio
                ratio={'1x1'}
                src={`${API_HOST_STATIC}${el.certificateImage}`}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="d-flex mt-4">
            <div class="col-3 text-muted fs-6">Ảnh giấy phép kinh doanh</div>
            <div class="col-8 border shadow">
              <ImageRatio
                ratio={'1x1'}
                src={`${API_HOST_STATIC}${el.licenseImage}`}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="mt-3">
            <Button className="me-3" onClick={() => handleSuccess(el)}>
              Duyệt
            </Button>
            <Button variant="danger" onClick={() => handleCancel(el)}>
              Từ chối
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const handleSuccess = async (el) => {
    try {
      const data = await doctorApi.update(el.id, { status: 'ACTIVE' });
      if (data) {
        const data = await doctorApi.getALlFromAdmin();
        setDoctors(data.data);
        toast.success('Duyệt hồ sơ thành công');
      }
      setShow(null);
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  const handleCancel = async (el) => {
    try {
      const data = await doctorApi.update(el.id, { status: 'CANCEL' });
      if (data) {
        const data = await doctorApi.getALlFromAdmin();
        setDoctors(data.data);
        toast.warning('Từ chối hồ sơ thành công');
      }
      setShow(null);
    } catch (error) {
      toast.error(error.message || error);
    }
  };

  const handleSelectStatus = (e) => {
    setFilter(e.target.value);
  };

  if (filter) {
    doctor = doctor.filter((el) => el.status === filter);
  }

  const handleChangePagination = (e) => {
    console.log(e);
  };

  return (
    <div>
      <h5 className="text-center">Danh sách hồ sơ bác sĩ</h5>
      <div className="d-flex container mb-2 justify-content-end w-100" style={{ width: 400 }}></div>
      <div class="container">
        <Card className="p-4">
          <div class="row">
            <div className="d-flex">
              <Form.Group controlId="formGridEmail">
                {/* <Form.Label>Trạng thái</Form.Label> */}
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => handleSelectStatus(e)}
                  value={filter}
                >
                  <option value="">Tất cả</option>
                  {/* <option value="UNCOMFIRM">Chưa kích hoạt</option> */}
                  <option value="PENDING">Đang chờ</option>
                  <option value="ACTIVE">Đã kích hoạt</option>
                  <option value="CANCEL">Đã từ chối</option>
                </Form.Select>
              </Form.Group>
            </div>
            {doctor?.length > 0 && (
              <div class="col-12">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Mã Bác Sĩ</th>
                      <th scope="col">Tên Bác Sĩ</th>
                      <th scope="col">Số điện thoại</th>
                      <th scope="col">Địa chỉ</th>
                      {/* <th scope="col">Ngày sinh</th> */}
                      <th scope="col">Tên phòng khám</th>
                      <th scope="col">Địa chỉ phòng khám</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctor?.length > 0 &&
                      doctor.map((el) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{el.id}</th>
                              <td>{el.fullName}</td>
                              <td>{el.phone}</td>
                              <td>{el.address}</td>
                              {/* <td>{el.date}</td> */}
                              <td>{el.clinicName}</td>
                              <td>{el.clinicAddress}</td>
                              <td>{getStatus(el.status)}</td>
                              {/* <td>{moment.unix(el.dateBooking / 1000).format('DD/MM/YYYY')}</td> */}
                              <td>
                                {el.status === 'PENDING' && (
                                  <Button size="sm" onClick={() => contentModal(el)}>
                                    Chi tiết
                                  </Button>
                                )}
                              </td>

                              {/* <td>{getAction(el.id, el.status)}</td> */}
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* {doctor?.length === 0 && <Alert variant="warning">Không có dữ liệu !</Alert>}
          {Math.ceil(pagination.total / pagination.limit) >= 1 && (
            <Pagination
              className="mx-auto"
              count={Math.ceil(pagination.total / pagination.limit)}
              variant="outlined"
              shape="rounded"
              page={pagination.page}
              onChange={handleChangePagination}
            />
          )} */}
        </Card>

        {show}
      </div>
    </div>
  );
}
