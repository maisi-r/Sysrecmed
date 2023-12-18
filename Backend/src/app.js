import express from 'express';
import cors from "cors";
import morgan from "morgan";
import recordRoutes from './routes/record.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import signedPdfRouter from './routes/signedPdf.routes';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRoles } from './libs/initialSetup';
import swaggerUI from "swagger-ui-express";
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import methodOverride from 'method-override';
import config from './config';

const app = express();

createRoles();

// GridFs Configuration - create storage engine
const storage = new GridFsStorage({
    url: "mongodb://127.0.0.1/Sysrecmedicos",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = (file.originalname.split(" ").join("_")).toLowerCase();
            const id = file._id;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads',
                idFile: id
            };
            resolve(fileInfo);
        });
    }
});

var storageSignature = multer.memoryStorage();
const uploadSignature = multer({ storage: storageSignature });

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Esto es para formData
app.use(methodOverride('_method'));
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(config.swaggerSpec)));
app.get('/', (req, res) => {
    res.json('Welcome');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/record', recordRoutes);

// Middleware para procesar solicitudes multipart/form-data
app.use('/api/pdf-signature', (req, res, next) => {
    // Verifica si la solicitud es multipart/form-data
    if (req.is('multipart/form-data')) {
        // Utiliza multer para procesar los campos y archivos adjuntos
        uploadSignature.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: 'Error al procesar el archivo' });
            }
            // Continúa con el siguiente middleware o enrutador
            next();
        });
    } else {
        // Si no es multipart/form-data, continúa sin procesar archivos adjuntos
        next();
    }
}, signedPdfRouter);




export default app;