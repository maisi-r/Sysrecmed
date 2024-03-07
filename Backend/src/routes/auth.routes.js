import express from 'express';
import {signup, signin, signout, profile} from '../controllers/auth.controller';
import { verifyToken } from '../controllers/auth.controller';
import { authRequired } from "../middlewares/authJwt.js";
import { validateSchema } from '../middlewares/validator.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = express.Router();

router.post('/signup', validateSchema(registerSchema), signup);
router.post('/signin', validateSchema(loginSchema),signin);
router.post('/signout', signout);
router.get('/verify', verifyToken);
router.get('/profile', authRequired, profile);

export default router;