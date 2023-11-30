import Modal from "../../../components/Modal/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import { useAddGoalMutation, useGetGoalQuery, useUpdateGoalMutation } from "../../../store/apis/goalApi";
// import { useGetMesasQuery } from "../../../store/apis/mesasApi";
import { useGetOdsQuery } from "../../../store/apis/odsApi";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { handleClose } from "../../../helpers/functions";
import Swal from "sweetalert2";
import style from "../../../styles/general.module.scss";

const ModalGoal = ({ title, root, type }) => {

  const ref = useRef(null);
  const { id } = useSelector((state) => state.edit); 

  let dataEdit = "";
  
  (function(){ 
    if (type === "edit") {
      const { data, isSuccess } = useGetGoalQuery(id);
      dataEdit = isSuccess ? data?.goal[0] : "";
    }
  })();
  
  const [ updateGoal ] = useUpdateGoalMutation();
  const [ addGoal ] = useAddGoalMutation();
  // const { data: dataMesas, isSuccess: isSuccessMesas } = useGetMesasQuery();
  const { data: dataOds, isSuccess: isSuccessOds } = useGetOdsQuery();

  // const mesaList = (isSuccessMesas ? dataMesas.mesas.map( item => ( {name: item.name, value: item.name } )) : [] );
  const odsList = (isSuccessOds ? dataOds.ods.map( item => ( {name: `${item.numOds}. ${item.name}`, value: item.name } )) : [] );

  const required = "Campo obligatorio";

  const formik = useFormik({
    initialValues: {
        name: "",
        number: "",
        description: "",
        // mesa: "",
        ods: ""
    },

    validationSchema: Yup.object({
        name: Yup.string().required(required),
        number: Yup.string().required(required),
        // mesa: Yup.string().required(required),
        description: Yup.string().required(required),
        ods: Yup.string().required(required)
    }),

    onSubmit: async (values) => {
      try {
        if ( type === "edit" ) {
          const responseUpdateGoal = await updateGoal({ id: id, data: values }).unwrap();
          console.log(responseUpdateGoal);
          Swal.fire({ title: "Exito", text: "Meta Editada correctamente", icon: "success", timer: 3500 });
          handleClose(ref);
        } else {
          const addGoalResponse = await addGoal(values).unwrap();
          console.log(values)
          Swal.fire({ title: "Exito", text: "Meta Agregada correctamente", icon: "success", timer: 3500 });
          handleClose(ref);
        }
      } catch (error) {
        console.log(error);
      }
    },
    
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = formik;
  formik.initialValues.name = dataEdit?.name || "";
  formik.initialValues.number = dataEdit?.number || "";
  // formik.initialValues.mesa = dataEdit?.mesa?.name || "";
  formik.initialValues.description = dataEdit?.description || "";
  formik.initialValues.ods = dataEdit?.ods?.name || "";

  return (

    <Modal title={ type==="edit" ? "Editar Meta" : title } root={root}>
      <form ref={ref} action="" onSubmit={ handleSubmit } >

        <Input
          label="Nombre de la meta" 
          errors={ errors.name } 
          touched={ touched.name } 
          values={ values.name } 
          handleBlur={ handleBlur } 
          handleChange={ handleChange } 
          placeholder="Meta" 
          name="name" 
          type="text"
        />

        <Input
          label="Numero de meta" 
          errors={ errors.number } 
          touched={ touched.number } 
          values={ values.number } 
          handleBlur={ handleBlur } 
          handleChange={ handleChange } 
          placeholder="Numero de meta" 
          name="number" 
          type="text"
        />

        <Input
          label="Descripción de la meta" 
          errors={ errors.description } 
          touched={ touched.description } 
          values={ values.description } 
          handleBlur={ handleBlur } 
          handleChange={ handleChange } 
          placeholder="Breve descripción" 
          name="description" 
          type="text"
        />

        {/* <Select 
          label="Mesa"
          errors={ errors.mesa }
          touched={ touched.mesa }
          values={ values.mesa }
          name="mesa"
          handleBlur={ handleBlur }
          handleChange={ handleChange }
          textOptions="Seleccione la mesa a cargo de la meta"        
          listOptions={ mesaList }
        /> */}

        <Select 
          label="Objetivo"
          errors={ errors.ods }
          touched={ touched.ods }
          values={ values.ods }
          name="ods"
          handleBlur={ handleBlur }
          handleChange={ handleChange }
          textOptions="Seleccione el objetivo de esta meta"
          listOptions={ odsList }
        />
          <div className={style.container__button}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.02 }} type='submit' className={style.button__modal}>{type==="edit" ? 'Editar Meta' : 'Agregar Meta'}</motion.button>
          </div>
      </form>
    </Modal>
  );
}

export default ModalGoal