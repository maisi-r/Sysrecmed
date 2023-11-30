import React, { useMemo } from "react";
import { useGetFilesQuery } from "../../store/apis/fileApi";
import { BrowserRouter as Router, Link, } from 'react-router-dom';

import Table from "./Table";
import { BiGroup } from "react-icons/bi";
import openModalUser from "./openModalDoc";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionContainer from "../Container/SectionContainer/SectionContainer";


const FileTable = () => {
  const { data: dataDoc, isLoading: isLoadingDoc } = useGetFilesQuery();
  console.log(dataDoc);

  const [fileData, setFileData] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (dataDoc && dataDoc.files) {
      const formattedData = dataDoc.files.map((item) => ({
        tipodocumento: item.name,
        descripcion: item.description || "",
        numero: item.additionalInformation?.number || "",
        iniciador: item.additionalInformation?.initiator || "",
        asunto: item.additionalInformation?.issue || "",
        id: item._id,
      }));

      setFileData(formattedData);
    }
  }, [dataDoc, refreshCount]);

  const columnsDoc = useMemo(
    () => [
      {
        Header: "Nombre del documento",
        accessor: "tipodocumento",
      },
      {
        Header: "N°",
        accessor: "numero",
      },
      {
        Header: "Iniciador",
        accessor: "iniciador",
      },
      {
        Header: "Asunto",
        accessor: "asunto",
      },
    ],
    []
  );

  const handleFileUpload = async (formData) => {
    // Lógica para subir el archivo
    await uploadFile(formData);

    // Incrementar el contador de actualización para forzar la recarga de la tabla
    setRefreshCount((prevCount) => prevCount + 1);
  };

  return (
    <SectionContainer>
      
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{ background: "#00aaee", color: "#ffffff" }} className="btn">
          <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
            Cerrar Sesión
          </Link>
        </button>
      </div>
      <h3>Documentos</h3>
      <div className="containerInput"></div>
      <div className="table-container">
        {!isLoadingDoc && (
          <Table
            columns={columnsDoc}
            data={fileData}
            icon={<BiGroup />}
            tableType="documentos"
            totalItems={dataDoc.totalItems}
            handleNew={() => openModalUser("new", handleFileUpload)}
            handleEdit={() => openModalUser("edit")}
          />
        )}
      </div>
    </SectionContainer>
  );
};


export default FileTable;


// import React, { useMemo } from "react";
// import { useGetFilesQuery } from "../../store/apis/fileApi";

// import Table from "./Table";
// import { BiGroup } from "react-icons/bi";
// import openModalUser from "./openModalDoc";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SectionContainer from "../Container/SectionContainer/SectionContainer";


// const FileTable = () => {
//   const { data: dataDoc, isLoading: isLoadingDoc } = useGetFilesQuery();
//   console.log(dataDoc);
//   const formatNewLines = (text) => {
//     return text.split("\n").map((line, index) => (
//       <React.Fragment key={index}>
//         {line}
//         <br />
//       </React.Fragment>
//     ));
//   };
//   const dataTableDoc = () =>
//   dataDoc?.files?.map((item) => ({
//     tipodocumento: item.name,
//     descripcion: item.description || "",
//     numero: item.additionalInformation?.number || "",
//     iniciador: item.additionalInformation?.initiator || "",
//     asunto: item.additionalInformation?.issue || "",
//     id: item._id,
//   }));

//   const columnsDoc = useMemo(
//     () => [
//       {
//         Header: "Nombre del documento",
//         accessor: "tipodocumento",
//       },
//       {
//         Header: "N°",
//         accessor: "numero",
//       },
//       {
//         Header: "Iniciador",
//         accessor: "iniciador",
//       },
//       {
//         Header: "Asunto",
//         accessor: "asunto",
//       },
//     ],
//     []

//   );

//   return (
//     <SectionContainer>
//       <h3>Documentos</h3>
//       <div className="containerInput"></div>
//       <div className="table-container">
//         {!isLoadingDoc && (
//           <Table
//             columns={columnsDoc}
//             data={dataTableDoc()}
//             icon={<BiGroup />}
//             tableType="documentos"
//             totalItems={dataDoc.totalItems}
//             handleNew={() => openModalUser("new")}
//             handleEdit={() => openModalUser("edit")}
//           />
//         )}
//       </div>
//     </SectionContainer>
//   );
// };


// export default FileTable;