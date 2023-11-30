import React, { useRef, useEffect, useState } from 'react';
import "./form.scss";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAddFileMutation } from '../../store/apis/fileApi';
import { useGetSystemsQuery } from '../../store/apis/systemApi';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const FormFile = () => {
  const { data, isLoading } = useGetSystemsQuery();
  const { register, reset, handleSubmit } = useForm();
  const [uploadFile] = useAddFileMutation();
  const navigate = useNavigate();

  const options = !isLoading && data.systems.map(item => ({ label: item.name, value: item.name }));
  const defaultSystem = "Expedientes";

  const selectSystemRef = useRef(null); // Referencia al campo "Sistema"
  const [selectedFiles, setSelectedFiles] = useState([]); // Array de archivos seleccionados

  useEffect(() => {
    // Seleccionar "Expedientes" y simular clic en el campo "Sistema"
    if (selectSystemRef.current) {
      selectSystemRef.current.value = defaultSystem;
      selectSystemRef.current.click();
    }
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files)); // Almacenar los archivos seleccionados en el estado
  };

  const onSubmit = async (data) => {
    const { system, name, description } = data;

    const formDataArray = selectedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("system", system);
      formData.append("name", name);
      formData.append("description", description);
      return formData;
    });

    try {
      const uploadPromises = formDataArray.map((formData) => uploadFile(formData)); // Array de promesas de carga
      const results = await Promise.all(uploadPromises); // Esperar a que se completen todas las cargas

      const ids = results.map((result) => result.data.file._id); // Obtener los IDs de los archivos cargados

      navigate(`/informacion-adicional/${ids.join(",")}`); // Navegar a la página de información adicional con los IDs separados por comas
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar los archivos.',
      });
    } finally {
      reset();
      setSelectedFiles([]);
    }
  };

  return (
    <div className='container'>
      <h1>Nueva Carga</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="formfile">
          <div className="form-group file1">
            <label htmlFor='name'>Nombre del Documento</label>
            <input {...register("name")} />
          </div>

          <div className="form-group file2">
            <label htmlFor='name'>Sistema</label>
            <select className="select" defaultValue={defaultSystem} {...register("system")}>
              {!isLoading && options?.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group file3">
            <label htmlFor='name'>Descripción</label>
            <input {...register("description")} />
          </div>

          <div className="form-group file4">
            <label htmlFor='name'>Archivos</label>
            <input type="file" {...register("files")} multiple onChange={handleFileChange} />
          </div>

          <div className="form-group file5">
            <button type="submit" className="btn">Nueva carga</button>
          </div>

          <div className="form-group file6">
            <button onClick={() => navigate('/archivos')} className="btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormFile;

// import React, { useRef, useEffect } from 'react';
// import "./form.scss";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { useAddFileMutation } from '../../store/apis/fileApi';
// import { useGetSystemsQuery } from '../../store/apis/systemApi';
// import { useState } from 'react';
// import Swal from 'sweetalert2';
// import { useNavigate } from "react-router-dom";
// import 'sweetalert2/dist/sweetalert2.css';

// const FormFile = () => {
//   const { data, isLoading } = useGetSystemsQuery();
//   const { register, reset, handleSubmit } = useForm();
//   const [uploadFile] = useAddFileMutation();
//   const navigate = useNavigate();

//   const options = !isLoading && data.systems.map(item => ({ label: item.name, value: item.name }));
//   const defaultSystem = "Expedientes";

//   const selectSystemRef = useRef(null); // Referencia al campo "Sistema"

//   useEffect(() => {
//     // Seleccionar "Expedientes" y simular clic en el campo "Sistema"
//     if (selectSystemRef.current) {
//       selectSystemRef.current.value = defaultSystem;
//       selectSystemRef.current.click();
//     }
//   }, []);

//   const onSubmit = async (data) => {
//     const { system, file } = data;

//     const formData = new FormData();
//     formData.append("file", file[0]);
//     formData.append("system", system);
//     formData.append("name", data.name);
//     formData.append("description", data.description);

//     const result = await uploadFile(formData);
//     reset();
//     let id = result.data.file._id;

//     navigate(`/informacion-adicional/${id}`);
//   };

//   return (
//     <div className='container'>
//       <h1>Nueva Carga</h1>
//       <div className="form-container">
//         <form onSubmit={handleSubmit(onSubmit)} className="formfile">
//           <div className="form-group file1">
//             <label htmlFor='name'>Nombre del Documento</label>
//             <input {...register("name")} />
//           </div>

//           <div className="form-group file2">
//             <label htmlFor='name'>Sistema</label>
//             <select className="select" defaultValue={defaultSystem} {...register("system")}>
//               {!isLoading && options?.map((option, idx) => (
//                 <option key={idx} value={option.value}>{option.label}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group file3">
//             <label htmlFor='name'>Descripción</label>
//             <input {...register("description")} />
//           </div>

//           <div className="form-group file4">
//             <label htmlFor='name'>Archivo</label>
//             <input type="file" {...register("file")} />
//           </div>

//           <div className="form-group file5">
//             <button type="submit" className="btn">Nueva carga</button>
//           </div>

//           <div className="form-group file6">
//             <button onClick={() => navigate('/archivos')} className="btn">Cancelar</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FormFile;








