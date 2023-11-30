import React, { useMemo } from 'react'
import { useGetFilesQuery } from '../../store/apis/fileApi';
import Table from "./Table";

const TableFile = () => {
    


  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
    ],
    []
  )
  
  const { data: dataDoc, isLoading : isLoadingDoc } = useGetFilesQuery();

  const dataTable= () => dataDoc?.files?.map( item => ({ tipodocumento: item.name, descripcion: item.description || "" }));

//   const navigate = useNavigate();

  return (
    !isLoadingDoc ? 
    <>
      <Table columns={columns} data={dataTable} />
      <button>Agregar nuevo archivo</button>
    </>
    : 
      <p>Cargando...</p>
  )
}

export default TableFile;