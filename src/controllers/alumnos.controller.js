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


export const listarAlumnos = async (req, res) => {
    try {
        //const alumnos = await connection.query('SELECT * FROM alumnos');
        const sql = 'SELECT * FROM alumnos where alumno_id=2';
        connection.query(sql, (err, rows) => {
            if (err) {
              console.error('Error al ejecutar la consulta:', err);
              return;
            }
            
            // Trabajar con los resultados
            console.log('Filas recuperadas:', rows);
            
            // Procesar cada fila
            rows.forEach((row) => {
              console.log('Columna1:', row.alumno_id, 'Columna2:', row.nombre);
              // Puedes acceder a cada columna por su nombre
            });
          });
        //console.log(alumnos)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar los alumnos' });
    }
}
