import React from 'react';
import { Ratio } from 'react-bootstrap';

export default function ImageRatio({ ratio, src, className }) {
  return (
    <Ratio aspectRatio={ratio}>
      <img src={src} alt="Lỗi" style={{ width: '100%' }} className={className} />
    </Ratio>
  );
}
