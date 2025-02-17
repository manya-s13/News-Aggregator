import express from "express";
import { checkAuth, logout, signin, signup } from "../controllers/userController.js";
import { isAuthenticated } from "../authMiddleware.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get('/checkauth', isAuthenticated, checkAuth);

export default router;