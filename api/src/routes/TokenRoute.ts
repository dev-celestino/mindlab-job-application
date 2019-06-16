import * as express from "express";
import TokenController from "../controllers/TokenController";

const router = express.Router();


router.post('/token', TokenController.generateToken)

export default router