import { Router } from "express";
import { PaginaInicio } from "../Controller/baseController.js";

const router = Router()

router.get('/', PaginaInicio)

export default router