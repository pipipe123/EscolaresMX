import { connectDB } from "../db.js";

// Establece la conexión y asigna la conexión a una variable
const connection = connectDB();

export const agregarAlumno = async (req, res) => {
    const {
        clave,
        matricula,
        paterno,
        materno,
        nombre
    } = req.body;

    try {
        const alumno = {
            clave,
            matricula,
            paterno,
            materno,
            nombre
        };

        // Utiliza la conexión que se ha establecido
        await connection.query('INSERT INTO alumnos SET ?', alumno);
        res.status(201).json({ message: 'Alumno agregado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el alumno' });
    }
};
