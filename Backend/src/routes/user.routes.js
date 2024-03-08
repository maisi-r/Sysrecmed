import { Router } from "express";
import { createUser } from "../controllers/user.controllers.js";
import { isAdmin, authRequired } from "../middlewares/validateToken.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.post("/", [authRequired, isAdmin, checkExistingUser], createUser);

export default router;