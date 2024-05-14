import { Router } from "express";

import { agregarAlumno, listarAlumnos, obtenerAlumnos, modificarAlumno, eliminarAlumno, totalAlumnos} from '../controllers/alumnos.controller.js';
const router=Router();

router.post('/alumnos/agregar', agregarAlumno);
router.get('/alumnos/listar', listarAlumnos);
router.get('/alumnos/obtener', obtenerAlumnos);
router.get('/alumnos/total', totalAlumnos);
router.put('/alumnos/modificar', modificarAlumno);
router.delete('/alumnos/eliminar/:id', eliminarAlumno);





export default router
