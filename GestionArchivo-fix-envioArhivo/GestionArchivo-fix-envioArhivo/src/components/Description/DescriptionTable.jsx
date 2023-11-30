import React from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import PdfMostrar from '../Pdfmostrar';
import { useParams } from 'react-router-dom';
import { useGetFileQuery } from '../../store/apis/fileApi';
import "./descriptionFile.scss";
import SectionContainer from '../Container/SectionContainer/SectionContainer';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { format } from 'date-fns';

const Description = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetFileQuery(id);
  console.log(data)

  

  return (
    <SectionContainer>
      <h3>Detalle del documento</h3>
      {!isLoading && (
        <div className="container">
          <div className='row'>
          <div className='col-3'>
          <strong>Nombre del documento:</strong> 
          </div>
          <div className='col-8'>
          <p>{data.file.name}</p>
          </div>

          <div className='col-3'>
          <strong>Descripcion:</strong> 
          </div>
          <div className='col-8'>
          <p>{data.file.description}</p>
          </div>

          {data.file.additionalInformation ? (

        
            
            <div className='row'>
            <div className='col-3'>
            <strong>Número:</strong> 
            </div>
            <div className='col-8'>
            <p>{data.file.additionalInformation.number}</p>
            </div>

            <div className='col-3'>
            <strong>Correlativo:</strong> 
            </div>
            <div className='col-8'>
            <p>{data.file.additionalInformation.correlative}</p>
            </div>

            <div className='col-3'>
            <strong>Año:</strong> 
            </div>
            <div className='col-8'>
            <p>{data.file.additionalInformation.year}</p>
            </div>

            <div className='col-3'>
            <strong>Fecha:</strong> 
            </div>
            <div className='col-8'>
            <p>{format(new Date(data.file.additionalInformation.date), 'dd/MM/yy')}</p>
            </div>

            <div className='col-3'>
            <strong>Cuerpo:</strong> 
            </div>
            <div className='col-8'>
            <p>{data.file.additionalInformation.body}</p>
            </div>

            <div className='col-3'>
            <strong>Iniciador:</strong> 
            </div>
            <div className='col-8'>
            <p>{data.file.additionalInformation.initiator}</p>
            </div>

            <div className='col-3'>
            <strong>Asunto:</strong> 
            </div>
            <div className='col-8'>
            <p>{data.file.additionalInformation.issue}</p>
            </div>
            </div>
          ) : (
            <div>
              <p>No hay información adicional disponible.</p>
            </div>
          )}

          <div className="form-group item3">
            <p>
              <PdfMostrar data={data.file.files}></PdfMostrar>
            </p>
          </div>
          
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default Description;
