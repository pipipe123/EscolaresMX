import { Router } from "express";
import { obtenerContadorAltas, obtenerContadorBajas } from "../controllers/alumnos.controller.js";

const router=Router();

router.get('/obtenerAltas', obtenerContadorAltas);
router.get('/obtenerBajas', obtenerContadorBajas);

export default router;
