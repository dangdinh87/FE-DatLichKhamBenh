import React from 'react';
import { Alert, Container } from 'react-bootstrap';

export default function Handbook() {
  return (
    <Container>
      <Alert className="mx-4 mt-3" variant="warning">
        Chức năng đang được cập nhật
      </Alert>
    </Container>
  );
}
