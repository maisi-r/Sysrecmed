import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useAddAditionaInformationFileMutation } from '../../store/apis/additionalInformationFileApi';
import { useParams, useNavigate } from 'react-router-dom';
import { parse, isDate, format } from "date-fns";
import Swal from 'sweetalert2';
import "./formf.scss"

import "react-datepicker/dist/react-datepicker.css";

const FormFileInformation = () => {
  const { id } = useParams();
  const required = "El campo es requerido";
  const [addInformation] = useAddAditionaInformationFileMutation();
  const navigate = useNavigate();

  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
  }

  const formik = useFormik({
    initialValues: {
      number: "",
      correlative: "",
      body: "",
      year: "",
      date: new Date(),
      initiator: "",
      issue: ""
    },
    validationSchema: Yup.object({
      number: Yup.number().required(required),
      correlative: Yup.string().required(required),
      year: Yup.number().required(required),
      body: Yup.string().required(required),
      date: Yup.date().nullable().transform(parseDateString).typeError("Al editar debe seleccionar nuevamente la fecha"),
      initiator: Yup.string().required(required),
      issue: Yup.string().required(required),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const result = await addInformation({ id: id, data: values });
        console.log(result);
        Swal.fire({
          title: "Exito",
          text: "Archivo guardado correctamente",
          icon: "success",
          timer: 3500
        }).then(() => {
          navigate(`/archivos`);
          formik.resetForm();
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched
  } = formik;

  return (
    <div className='container'>
      <h1>Carga Adicional</h1>
      <div className="formf-container">
        <form onSubmit={handleSubmit} className="form">
          <div className='formf-group item1'>
            <label htmlFor="number">Expediente N°</label>
            <input
              type="text"
              className={`input__light-${errors.number && touched.number ? 'warning' : 'success'}`}
              placeholder="Ingrese el número del expediente"
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

          <div className='formf-group item2'>
            <label htmlFor="correlative">N° Correlativo</label>
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

          <div className='formf-group item3'>
            <label htmlFor="year">Año</label>
            <input
              type="text"
              className={`input__light-${errors.year && touched.year ? 'warning' : 'success'}`}
              placeholder="Ingrese el nombre"
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

          <div className='formf-group item4'>
            <label htmlFor="body">Cuerpo</label>
            <input
              type="text"
              className={`input__light-${errors.body && touched.body ? 'warning' : 'success'}`}
              placeholder="Ingrese el cuerpo"
              value={values.body}
              onBlur={handleBlur}
              onChange={handleChange}
              name="body"
            />
            {errors.body && touched.body && (
              <div className='text-red'>
                <small className="text-red-600">{errors.body}</small>
              </div>
            )}
          </div>

          

          <div className='formf-group item5'>
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              className={`input__light-${errors.date && touched.date ? 'warning' : 'success'}`}
              placeholder="Seleccione una fecha"
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
          </div>

          <div className='formf-group item6'>
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

          <div className='formf-group item7'>
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

          <div className="formf-group item8">
            <button type="submit" className="btn">Cargar</button>
          </div>


          <div className="formf-group item9">         
                    <button onClick={() => navigate('/archivos')} className="btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormFileInformation;


// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from "yup";
// import { useAddAditionaInformationFileMutation } from '../../store/apis/additionalInformationFileApi';
// import { useParams, useNavigate } from 'react-router-dom';
// import { parse, isDate, format } from "date-fns";
// import Swal from 'sweetalert2';
// import "./formf.scss"

// import "react-datepicker/dist/react-datepicker.css";

// const FormFileInformation = () => {
//   const { id } = useParams();
//   const required = "El campo es requerido";
//   const [addInformation] = useAddAditionaInformationFileMutation();
//   const navigate = useNavigate();

//   function parseDateString(value, originalValue) {
//     const parsedDate = isDate(originalValue)
//       ? originalValue
//       : parse(originalValue, "yyyy-MM-dd", new Date());

//     return parsedDate;
//   }

//   const formik = useFormik({
//     initialValues: {
//       number: "",
//       correlative: "",
//       body: "",
//       year: "",
//       date: new Date(),
//       initiator: "",
//       issue: ""
//     },
//     validationSchema: Yup.object({
//       number: Yup.number().required(required),
//       correlative: Yup.string().required(required),
//       year: Yup.number().required(required),
//       body: Yup.string().required(required),
//       date: Yup.date().nullable().transform(parseDateString).typeError("Al editar debe seleccionar nuevamente la fecha"),
//       initiator: Yup.string().required(required),
//       issue: Yup.string().required(required),
//     }),
//     onSubmit: async (values) => {
//       try {
//         console.log(values);
//         const result = await addInformation({ id: id, data: values });
//         console.log(result);
//         Swal.fire({
//           title: "Exito",
//           text: "Archivo guardado correctamente",
//           icon: "success",
//           timer: 3500
//         }).then(() => {
//           navigate(`/archivos`);
//           formik.resetForm();
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   });

//   const {
//     handleSubmit,
//     handleChange,
//     handleBlur,
//     setFieldValue,
//     values,
//     errors,
//     touched
//   } = formik;

//   return (
//     <div className='container'>
//       <h1>Carga Adicional</h1>
//       <div className="formf-container">
//         <form onSubmit={handleSubmit} className="form">
//           <div className='formf-group item1'>
//             <label htmlFor="number">Expediente N°</label>
//             <input
//               type="text"
//               className={`input__light-${errors.number && touched.number ? 'warning' : 'success'}`}
//               placeholder="Ingrese el número del expediente"
//               value={values.number}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               name="number"
//             />
//             {errors.number && touched.number && (
//               <div className='text-red'>
//                 <small className="text-red-600">{errors.number}</small>
//               </div>
//             )}
//           </div>

//           <div className='formf-group item2'>
//             <label htmlFor="correlative">N° Correlativo</label>
//             <input
//               type="text"
//               className={`input__light-${errors.correlative && touched.correlative ? 'warning' : 'success'}`}
//               placeholder="Ingrese el correlativo"
//               value={values.correlative}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               name="correlative"
//             />
//             {errors.correlative && touched.correlative && (
//               <div className='text-red'>
//                 <small className="text-red-600">{errors.correlative}</small>
//               </div>
//             )}
//           </div>

//           <div className='formf-group item3'>
//             <label htmlFor="year">Año</label>
//             <input
//               type="text"
//               className={`input__light-${errors.year && touched.year ? 'warning' : 'success'}`}
//               placeholder="Ingrese el nombre"
//               value={values.year}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               name="year"
//             />
//             {errors.year && touched.year && (
//               <div className='text-red'>
//                 <small className="text-red-600">{errors.year}</small>
//               </div>
//             )}
//           </div>

//           <div className='formf-group item4'>
//             <label htmlFor="body">Cuerpo</label>
//             <input
//               type="text"
//               className={`input__light-${errors.body && touched.body ? 'warning' : 'success'}`}
//               placeholder="Ingrese el cuerpo"
//               value={values.body}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               name="body"
//             />
//             {errors.body && touched.body && (
//               <div className='text-red'>
//                 <small className="text-red-600">{errors.body}</small>
//               </div>
//             )}
//           </div>

          

//           <div className='formf-group item5'>
//             <label htmlFor="date">Fecha</label>
//             <input
//               type="date"
//               className={`input__light-${errors.date && touched.date ? 'warning' : 'success'}`}
//               placeholder="Seleccione una fecha"
//               value={values.date}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               name="date"
//             />
//             {errors.date && touched.date && (
//               <div className='text-red'>
//                 <small className="text-red-600">{errors.date}</small>
//               </div>
//             )}
//           </div>

//           <div className='formf-group item6'>
//             <label htmlFor="initiator">Iniciador</label>
//             <input
//               type="text"
//               className={`input__light-${errors.initiator && touched.initiator ? 'warning' : 'success'}`}
//               placeholder="Ingrese el iniciador"
//               value={values.initiator}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               name="initiator"
//             />
//             {errors.initiator && touched.initiator && (
//               <div className='text-red'>
//                 <small className="text-red-600">{errors.initiator}</small>
//               </div>
//             )}
//           </div>

//           <div className='formf-group item7'>
//             <label htmlFor="issue">Asunto</label>
//             <input
//               type="text"
//               className={`input__light-${errors.issue && touched.issue ? 'warning' : 'success'}`}
//               placeholder="Ingrese el asunto"
//               value={values.issue}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               name="issue"
//             />
//             {errors.issue && touched.issue && (
//               <div className='text-red'>
//                 <small className="text-red-600">{errors.issue}</small>
//               </div>
//             )}
//           </div>

//           <div className="formf-group item8">
//             <button type="submit" className="btn">Cargar</button>
//           </div>


//           <div className="formf-group item9">         
//                     <button onClick={() => navigate('/archivos')} className="btn">Cancelar</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default FormFileInformation;




