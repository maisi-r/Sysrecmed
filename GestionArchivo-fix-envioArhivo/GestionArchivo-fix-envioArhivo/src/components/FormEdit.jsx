import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup"; 
import { useAddFileMutation, useGetFileQuery, useGetFilesQuery, useUpdateFileMutation } from '../store/apis/fileApi/';
 import { useGetAdditionalInformationFileQuery, useAddAditionaInformationFileMutation, useUpdateAditionaInformationFileMutation, useDeleteAditionaInformationFileMutation } from '../store/apis/additionalInformationFileApi/';
import { useParams } from 'react-router-dom';
import { parse, isDate } from "date-fns";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "./edit.scss"


import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import "react-datepicker/dist/react-datepicker.css";
import {  useSelector } from 'react-redux';

const FormEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetFileQuery(id);
  const [updateEdit] = useUpdateAditionaInformationFileMutation();
  const additionalInformationId = data?.file?.additionalInformation?._id;
  const [startDate, setStartDate] = useState(null);
  const [additionalInformation, setAdditionalInformation] = useState(null);

  const required = "El campo es requerido";

  useEffect(() => {
    if (data) {
      setStartDate(new Date(data.date));
      setAdditionalInformation(data.file?.additionalInformation || null);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setStartDate(new Date(data.date));
    }
  }, [data]);

  console.log(additionalInformationId);
  

  const [updateFileMutation] = useUpdateFileMutation();

  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "dd-MM-yyyy", new Date());
  
    return parsedDate;
  }

  useEffect(() => {
    if (data) {
      formik.setFieldValue('name', data?.file?.name || '');
      formik.setFieldValue('description', data?.file?.description || '');
      formik.setFieldValue('number', data?.file?.additionalInformation?.number || '');
      formik.setFieldValue('correlative', data?.file?.additionalInformation?.correlative || '');
      formik.setFieldValue('year', data?.file?.additionalInformation?.year || '');
      // formik.setFieldValue('date', data?.file?.additionalInformation?.date || '');
      formik.setFieldValue('body', data?.file?.additionalInformation?.body || '');
      formik.setFieldValue('initiator', data?.file?.additionalInformation?.initiator || '');
      formik.setFieldValue('issue', data?.file?.additionalInformation?.issue || '');
  
      setStartDate(new Date(data.date));
    }
  }, [data]);

  

  

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    number: Yup.string().required('El número es obligatorio'),
    correlative: Yup.string().required(required).matches(/^[a-zA-Z0-9\s\.,áéíóúÁÉÍÓÚñÑ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,('El correlativo es obligatorio')),
    year: Yup.string().required('El año es obligatorio'),
    // date: Yup.string().required('La fecha es obligatorio'),
    body: Yup.string().required('El cuerpo es obligatorio'),
    initiator: Yup.string().required(required).matches(/^[a-zA-Z0-9\s\.,áéíóúÁÉÍÓÚñÑ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,('El iniciador es obligatorio')),
    issue: Yup.string().required(required).matches(/^[a-zA-Z0-9\s\.,áéíóúÁÉÍÓÚñÑ!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, ('El asunto es obligatorio')),
  });

  const initialValues = {
    name: data?.file?.name || '',
    description: data?.file?.description || '',
    number: additionalInformation ? additionalInformation.number : '',
    correlative: additionalInformation ? additionalInformation.correlative : '',
    year: additionalInformation ? additionalInformation.year : '',
    // date: additionalInformation ? additionalInformation.date: '',
    body: additionalInformation ? additionalInformation.body : '',
    initiator: additionalInformation ? additionalInformation.initiator : '',
    issue: additionalInformation ? additionalInformation.issue : '',
  };


  const onSubmit = async (values) => {
    // Verificar si additionalInformationId es null
    if (additionalInformationId !== null) {
      const updatedAdditionalInformation = {
        id: additionalInformationId,
        number: values.number,
        correlative: values.correlative,
        year: values.year.toString(),
        // date: values.date,
        body: parseInt(values.body),
        initiator: values.initiator,
        issue: values.issue,
      };
  
      const updatedFile = {
        name: values.name,
        system: values.system,
        description: values.description,
        additionalInformation: updatedAdditionalInformation,
      };
  
      try {
        const responseedit = await updateFileMutation({ id: id, data: updatedFile }).unwrap();
        const responseedit2 = await updateEdit({ id: additionalInformationId, data: updatedAdditionalInformation }).unwrap();
  
        Swal.fire({ title: "Exito", text: "Archivo editado correctamente", icon: "success", timer: 3500 });
        console.log(responseedit);
        console.log(responseedit2);
        navigate(`/archivos`);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Manejar el caso en el que additionalInformationId sea null
      const newAdditionalInformationId = uuid(); // Generar un nuevo ID único
      const newAdditionalInformation = {
        id: newAdditionalInformationId,
        number: values.number,
        correlative: values.correlative,
        year: values.year.toString(),
        // date: values.date,
        body: parseInt(values.body),
        initiator: values.initiator,
        issue: values.issue,
      };
  
      const updatedFile = {
        name: values.name,
        system: values.system,
        description: values.description,
        additionalInformation: newAdditionalInformation,
      };
  
      try {
        const responseedit = await updateFileMutation({ id: id, data: updatedFile }).unwrap();
        const responseedit2 = await createEdit({ data: newAdditionalInformation }).unwrap();
  
        Swal.fire({ title: "Exito", text: "Archivo editado correctamente", icon: "success", timer: 3500 });
        console.log(responseedit);
        console.log(responseedit2);
        navigate(`/archivos`);
      } catch (error) {
        console.log(error);
      }
    }
  };




  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <>
      <div className="container">
      <h3>Editar Archivo</h3>
        <div className="edit-container">
        
          <form onSubmit={handleSubmit} className='form'>
            <div className='edit-group item1'>
              <label htmlFor="name">Nombre del documento</label>
              <input
                type="text"
                className={`input__light-${errors.name && touched.name ? 'warning' : 'success'}`}
                placeholder="Ingrese el nombre del documento"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                name="name"
              />
              {errors.name && touched.name && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.name}</small>
                </div>
              )}
            </div>

            <div className='edit-group item2'>
              <label htmlFor="description">Descripción</label>
              <input
              type="text"
                className={`textarea__light-${errors.description && touched.description ? 'warning' : 'success'}`}
                placeholder="Ingrese la descripción"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                name="description"
              ></input>
              {errors.description && touched.description && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.description}</small>
                </div>
              )}
            </div>

            <div className='edit-group item3'>
              <label htmlFor="number">Número</label>
              <input
                type="text"
                className={`input__light-${errors.number && touched.number ? 'warning' : 'success'}`}
                placeholder="Ingrese el número"
                value={values.number}
                onBlur={handleBlur}
                onChange={handleChange}
                name="number"
              />
              {errors.number && touched.number && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.number}</small>
                </div>
              )}
            </div>

            <div className='edit-group item4'>
              <label htmlFor="correlative">Correlativo</label>
              <input
                type="text"
                className={`input__light-${errors.correlative && touched.correlative ? 'warning' : 'success'}`}
                placeholder="Ingrese el correlativo"
                value={values.correlative}
                onBlur={handleBlur}
                onChange={handleChange}
                name="correlative"
              />
              {errors.correlative && touched.correlative && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.correlative}</small>
                </div>
              )}
            </div>

            <div className='form-group item5'>
              <label htmlFor="year">Año</label>
              <input
                type="text"
                className={`input__light-${errors.year && touched.year ? 'warning' : 'success'}`}
                placeholder="Ingrese el año"
                value={values.year}
                onBlur={handleBlur}
                onChange={handleChange}
                name="year"
              />
              {errors.year && touched.year && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.year}</small>
                </div>
              )}
            </div>

            {/* <div className='edit-group item6'>
              <label htmlFor="date">Fecha</label>
              <input
    type="text"
    className={`input__light-${errors.date && touched.date ? 'warning' : 'success'}`}
    placeholder="Ingrese la fecha"
    value={values.date}
    onBlur={handleBlur}
    onChange={handleChange}
    name="date"
  />
              {errors.date && touched.date && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.date}</small>
                </div>
              )}
            </div> */}

            <div className='edit-group item6'>
              <label htmlFor="body">Cuerpo</label>
              <input
              type="text"
              className={`input__light-${errors.year && touched.year ? 'warning' : 'success'}`}
                placeholder="Ingrese el cuerpo"
                value={values.body}
                onBlur={handleBlur}
                onChange={handleChange}
                name="body"
              ></input>
              {errors.body && touched.body && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.body}</small>
                </div>
              )}
            </div>

            <div className='edit-group item7'>
              <label htmlFor="initiator">Iniciador</label>
              <input
                type="text"
                className={`input__light-${errors.initiator && touched.initiator ? 'warning' : 'success'}`}
                placeholder="Ingrese el iniciador"
                value={values.initiator}
                onBlur={handleBlur}
                onChange={handleChange}
                name="initiator"
              />
              {errors.initiator && touched.initiator && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.initiator}</small>
                </div>
              )}
            </div>

            <div className='edit-group item8'>
              <label htmlFor="issue">Asunto</label>
              <input
                type="text"
                className={`input__light-${errors.issue && touched.issue ? 'warning' : 'success'}`}
                placeholder="Ingrese el asunto"
                value={values.issue}
                onBlur={handleBlur}
                onChange={handleChange}
                name="issue"
              />
              {errors.issue && touched.issue && (
                <div className='text-red'>
                  <small className="text-red-600">{errors.issue}</small>
                </div>
              )}
            </div>
            
            <div className="edit-group item9"> 
            <button type="submit" className="btn">
              Guardar
            </button>
            </div>

            <div className="edit-group item10">
    <button onClick={() => navigate('/archivos')} className="btn">Cancelar</button>
</div>
            

            
          </form>
          
        </div>
      </div>
    </>
  );
};

export default FormEdit;
