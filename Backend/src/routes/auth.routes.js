import express from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { verifyToken } from "../middlewares/authJwt.js";
import { validateSchema } from '../middlewares/validator.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = express.Router();

router.post('/signup', validateSchema(registerSchema),authCtrl.signup);
router.post('/signin', validateSchema(loginSchema),authCtrl.signin);
router.post('/signout', authCtrl.signout);
router.get('/profile', verifyToken, authCtrl.profile);

export default router;