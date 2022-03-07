import { Container } from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import bookingApi from '../../../api/bookingApi';
export default function VerifyBooking() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const bookingId = urlParams.get('bookingId');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await bookingApi.verifyBooking(bookingId, 'BOOKED');
        setStatus(data);
        setLoading(false);
      } catch (error) {
        setStatus(error);
        console.log('Failed to verify booking', error);
      }
      setLoading(false);
    })();
  }, [bookingId]);
  // if (!status) return;
  const getContentBooking = (status) => {
    switch (status?.status) {
      case 2:
        return <Alert variant="success">{status.message}</Alert>;
      case 1:
        return <Alert variant="warning">{status.message}</Alert>;
      case 0:
        return <Alert variant="danger">{status.message}</Alert>;

      default:
        <Alert variant="danger">{'1'}</Alert>;
        break;
    }
  };

  return (
    <Container maxWidth="md">
      {loading && status === null ? (
        <div className="w-100 text-center">
          <Spinner animation="border" className="text-center"></Spinner>
        </div>
      ) : (
        <div style={{ marginBottom: 500 }} className="mt-3">
          {getContentBooking(status)}
        </div>
      )}
    </Container>
  );
}
