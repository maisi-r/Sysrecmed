import React from "react";
import FileTable from "./components/FileTable/FileTable";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
import FormFile from "./components/FormFile/FormFile";
import FormFileInformation from "./components/FormFileInformation/FormFileInformation";
import Login from "./components/auth/Login/Login"
import Description from "./components/Description/DescriptionTable";
import DescriptionFile from "./components/Description/DescriptionFileInformation";
import FormEdit from "./components/FormEdit";



const App = () => {

  
  return (
    
    <div>
      
      <Header/>
      
      <Routes>
        <Route path="/" element={<Login/>}/>
        {/* <Route path="/welcome" element={<Welcome />} /> */}

        {/* <Route path="/admin/*" element={
          <RequireAuth role="Admin">
            <Admin />
          </RequireAuth>
        } />

        <Route path="/editor/*" element={
          <RequireAuth role="Editor">
            <Manager />
          </RequireAuth>
        } />

        <Route path="/*" element={
          <RequireAuth role="User">
            <User /> 
          </RequireAuth>
        } /> */}
        
        <Route path="/archivos" element={<FileTable/>} />

        <Route path="/archivos/descripcion/:id" element={ <Description /> } />

        <Route path="/archivos/descripcion/adicional/:id" element={ <DescriptionFile /> } />

        <Route path="/informacion-adicional/:id" element={<FormFileInformation/>} />

        <Route path="/carga" element={<FormFile/>} /> 

        <Route path="/editar/:id" element={<FormEdit/>}/>
        


        
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App