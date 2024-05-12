import { Router } from "express";

import { agregarAlumno } from '../controllers/alumnos.controller.js';
const router=Router();

router.post('/alumnos/agregar', agregarAlumno);


export default router
