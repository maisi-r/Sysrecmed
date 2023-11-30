import React, { useMemo } from "react";
import Table from "../FileTable/Table";
import { BiZoomIn } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useGetFileQuery } from "../../store/apis/fileApi";
import SectionContainer from "../Container/SectionContainer/SectionContainer";


const DescriptionFile = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetFileQuery(id);
  console.log(data?.file);
  console.log(id);

  return (
    <SectionContainer>
      <h3>Detalle</h3>

      {!isLoading && (
        <div className="container">
          <div className="form-group file1">
            <p>{data.file.name}</p>
          </div>
          <div className="form-group item2">
            <p>{data.file.system}</p>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default DescriptionFile;
