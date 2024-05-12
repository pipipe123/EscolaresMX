import { Router } from "express";

import { agregarAlumno, listarAlumnos } from '../controllers/alumnos.controller.js';
const router=Router();

router.post('/alumnos/agregar', agregarAlumno);
router.get('/alumnos/listar', listarAlumnos);



export default router
