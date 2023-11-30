import { Router } from "express";
import { createRecord, getRecord, getRecordById, updateRecordById, deleteRecordById } from '../controllers/record.controller';
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt";
import multer from 'multer'; // Importa multer
import { validateSchema } from "../middlewares/validator.middleware";
import { createRecordSchema } from "../schemas/record.schema";

const router = Router();

// Configura multer para manejar form-data con un campo 'file'
const upload = multer(); // Puedes personalizar la configuración según tus necesidades

// Crear un registro junto con la carga de archivos
router.post('/', [verifyToken, isModerator, upload.single('file')],validateSchema(createRecordSchema),createRecord);

// Obtener todos los registros
router.get('/', getRecord);

// Obtener un registro por su ID
router.get('/:recordId', getRecordById);

// Actualizar un registro por su ID
router.put('/:recordId', [verifyToken, isAdmin], updateRecordById);

// Eliminar un registro por su ID
router.delete('/:recordId', [verifyToken, isAdmin], deleteRecordById);

export default router;