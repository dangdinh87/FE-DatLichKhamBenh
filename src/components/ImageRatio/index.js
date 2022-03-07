import React from 'react';
import { Ratio } from 'react-bootstrap';
import imageDoctor from '../../static/placeholderDoctor.png';
export default function ImageRatio({ ratio, src, className, ...props }) {
  return (
    <Ratio aspectRatio={ratio}>
      <img
        src={src}
        alt="Lỗi"
        style={{ width: '100%' }}
        className={className}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = imageDoctor;
        }}
        {...props}
      />
    </Ratio>
  );  
}
