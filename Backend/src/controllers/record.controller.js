import Record from "../models/Record";
import User from '../models/User.js';

export const createRecord = async (req, res) => {
    try {
        const {
            lastname, name, classe, nationality, lelc, ci, policeof, civilstatus,
            domicile, ministry, distribution, taskyouperform, dateofadmission, category,
            orderno, prescribingphysician, days, from, until, article, diagnostic
        } = req.body;

        // Convierte el 'name' en un formato para el nombre del archivo
        const nameFile = (name.split(" ").join("_")).toLowerCase();

        // Obtiene el archivo cargado desde req.file si existe
        const file = req.file;

        //Usuario

        console.log(req.userId)

        // Crea un nuevo registro en la base de datos
        const newRecord = new Record({
            lastname, name, classe, nationality, lelc, ci, policeof, civilstatus,
            domicile, ministry, distribution, taskyouperform, dateofadmission, category,
            orderno, prescribingphysician, days, from, until, article, diagnostic, user: req.userId
        });

        // Si hay un archivo cargado, asigna el archivo al registro
        if (file) {
            newRecord.files = [{
                filename: file.originalname,
                bucketName: 'uploads', // Ajusta el nombre del bucket según tu configuración
                mimetype: file.mimetype,
                encoding: file.encoding,
                id: file.id, // Aquí deberías usar el ID del archivo en tu sistema
            }];
        }

        // Guarda el nuevo registro en la base de datos
        const recordSaved = await newRecord.save();

        res.status(201).json(recordSaved);
    } catch (error) {
        // Maneja el error de manera adecuada
        res.status(500).json({ success: false, message: 'Error creating record', error });
    }
};  

export const getRecord = async (req, res) => {
    const records = await Record.find({}).populate('user');
    res.json(records);
};

export const getRecordById = async (req, res) => {
    const record = await Record.findById(req.params.recordId);
    if(!record) return res.status(200).json ({message: ' Ficha no encontrada'})
    res.json(record);
};

export const updateRecordById = async (req, res) => {
    const updatedRecord = await Record.findByIdAndUpdate(
        req.params.recordId,
        req.body,
        {
            new: true
        }
    );
    if(!updatedRecord) return res.status(200).json ({message: ' Ficha no encontrada'})
    res.json(updatedRecord);
};

export const deleteRecordById = async (req, res) => {
    const { recordId } = req.params;
    await Record.findByIdAndRemove(recordId);
    if(!recordId) return res.status(200).json ({message: ' Ficha no encontrada'})
    res.json(recordId);
};