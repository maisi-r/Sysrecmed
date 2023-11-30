import { BrowserRouter as Router, Link, } from 'react-router-dom';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import style from "./table.scss";
import { BiArrowBack, BiPencil, BiTrash, BiChevronsLeft, BiLineChart, BiChevronsRight, BiChevronLeft, BiChevronRight, BiPlusCircle, BiBookmarkAltPlus, BiZoomIn, BiRefresh } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.css";
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { editOn } from '../../store/slices/idEditSlice';
import { useDeleteFileMutation, useUpdateFileMutation } from '../../store/apis/fileApi';
import { GlobalFilter } from '../GlobalFilter';

const Table = ({ columns, data, icon, color, handleEdit, totalItems, handleDownload , table, typeUser = false }) => {
  
  const [deleteFile] = useDeleteFileMutation();
  const [updateFile] = useUpdateFileMutation();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  async function handleDelete(id) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar este archivo?',
      confirmButtonText: 'Eliminar',
      denyButtonText: 'Cancelar',
      showDenyButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFile(id);
        Swal.fire({ title: "Éxito", text: "Archivo eliminado correctamente", icon: "success", timer: 3500 });
      }
    });
  }

  async function handleDownload(id) {
    fetch(`http://138.117.77.156:3007/api/file/download/${id}`, {
      method: 'get',
      headers: {
        Accept: 'application/octet-stream',
        'Content-Type': 'application/octet-stream'
      }
    }).then((res) => res.json());
  }

  // const handleClick = (event) => {
  //   event.preventDefault();
  //   navigate("/carga");
  // };
  const handleNew = () => {
  };

  const handleDispatchId = (id) => {
    handleEdit();
    
    dispatch(editOn(id));
  };
  
  async function handleActualizar() {
    try {
      setIsUpdating(true);

      // Obtén los datos actualizados que deseas enviar al servidor
      const updatedData = /* ... */

      // Realiza la actualización utilizando el endpoint 'updateFile'
      await updateFile({ id: fileId, data: updatedData });

      Swal.fire({ title: "Éxito", text: "Datos actualizados correctamente", icon: "success", timer: 3500 });

      // Realiza acciones adicionales después de la actualización, como volver a cargar los datos actualizados

    } catch (error) {
      // Maneja el error o muestra un mensaje de error al usuario
      console.error(error);
      Swal.fire({ title: "Error", text: "Ocurrió un error al actualizar los datos", icon: "error", timer: 3500 });
    } finally {
      setIsUpdating(false);
    }
  }


  useEffect(() => {
    setPageSize(Number(8));
  }, [])
  

  return (
    <>


                      
                    <div className="Carga">
                    <Link to="/carga" onClick={handleNew}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.02 }}
                className="Carga"
              >
                <BiPlusCircle /> Nueva Carga
              </motion.button>
            </Link>
            
                    
        {!typeUser && (
          <>
           
            
          </>
        )}
      
                </div>


      
                  
                    
                    
     
      
      <div><GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>
      <br />
      
      <div className="table__container">
        <table className="table__containerTable" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
                <th className="actions__title">Acciones</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                  <th className="actions__icons">
                    <Link to={`/editar/${row.original.id} `}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.02 }}
                        className={"editar"}
                      >
                        <BiPencil />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 1.02 }}
                      className={"borrar"}
                      onClick={() => { handleDelete(row.original.id) }}
                    >
                      <BiTrash />
                    </motion.button>
                    {console.log(row.original)}
                    <Link to={`/archivos/descripcion/${row.original.id}`}>
                      <motion.button
                        className={"ver"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.02 }}
                      >
                        <BiZoomIn />
                      </motion.button>
                    </Link>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
        
      </div>

        <div className="pagination">
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>

          <div className="pagination__icon">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {<BiChevronsLeft />}
            </motion.button>{' '}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => previousPage()} disabled={!canPreviousPage}>
              {<BiChevronLeft />}
            </motion.button>{' '}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => nextPage()} disabled={!canNextPage}>
              {<BiChevronRight />}
            </motion.button>{' '}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {<BiChevronsRight />}
            </motion.button>{' '}
          </div>

          {totalItems && (
            <div>
              Total Documentos{' '}
              <strong>
                {totalItems}
              </strong>
            </div>
          )}
        </div>
    </>
  );
};

export default Table;
