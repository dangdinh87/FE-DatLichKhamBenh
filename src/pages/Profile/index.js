/* eslint-disable react-hooks/rules-of-hooks */
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Alert, Card, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import patientApi from '../../api/patientApi';
import PatientProfileForm from './form';
import { useParams } from 'react-router-dom';
function PatientProfile({ onSubmit }) {
  const params = useParams();
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await patientApi.getById(params.id);
        setPatient(data.data);
        setLoading(true);
      } catch (error) {
        console.log('Failed to fetch patient', error);
      }
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container maxWidth="md" className="mt-4">
      <Card component="main" className="p-4">
        <h5 className="text-center text-uppercase">Thông tin cá nhân</h5>
        <PatientProfileForm patient={patient} />
      </Card>
    </Container>
  );
}

export default PatientProfile;
