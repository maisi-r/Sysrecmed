import React from "react";
import fileDownload from "js-file-download";
import axios from "axios";

function App() {
  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        "https://example.com/myfile.pdf",
        {
          responseType: "blob",
        }
      );
      fileDownload(response.data, "myfile.pdf");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
}

export default App;
