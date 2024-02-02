import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import './order.css';
import Template from './template';

const DownloadOrder = ({ data, identifier }) => {
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;

    if (input) {
      const pdfOptions = {
        margin: 10,
        filename: 'order_details.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // html2pdf(input, pdfOptions);
    }
  };

  return (
    <>
      <button className='retry-button' onClick={downloadPDF}>Download PDF</button>
      <div style={{ display: 'none' }}>
        <Template ref={pdfRef} data={data} identifier={identifier} />
      </div>
    </>
  );
};

export default DownloadOrder;
