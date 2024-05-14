import { connectDB } from "../db.js";
const connection = connectDB();

// Función para incrementar el contador de altas
export const incrementarContadorAltas = async () => {
    try {
        const sql = 'UPDATE contadores SET altas = altas + 1';
        await connection.query(sql);
    } catch (error) {
        console.error(error);
        throw new Error('Error al incrementar el contador de altas');
    }
};


// Función para incrementar el contador de bajas
export const incrementarContadorBajas = async () => {
    try {
        const sql = 'UPDATE contadores SET bajas = bajas + 1';
        await connection.query(sql);
    } catch (error) {
        console.error(error);
        throw new Error('Error al incrementar el contador de bajas');
    }
};
// Función para obtener el contador de altas
export const obtenerContadorAltas = async (req, res) => {
    try {
        const sql = 'SELECT altas FROM contadores';
        await connection.query(sql, (err, rows) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error al obtener el contador' });
            }
            
            // console.log('Filas recuperadas:', rows[0]);
            res.status(200).json(rows[0]);
        }); 
        
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el contador de altas');
    }
};

// Función para obtener el contador de bajas
export const obtenerContadorBajas = async (req, res) => {
    try {
        const sql = 'SELECT bajas FROM contadores';
        await connection.query(sql, (err, rows) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error al obtener el contador' });
            }
            
            // console.log('Filas recuperadas:', rows[0]);
            res.status(200).json(rows[0]);
        }); 
        
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el contador de bajas');
    }
};

// Establece la conexión y asigna la conexión a una variable
const validarClave = async (clave, res) => {
    if (clave.length !== 18){
        return Promise.reject({ status: 400, message: 'Clave no valida' });
    } else {
        return Promise.resolve(); // La clave es válida
    }
}
// Función para verificar si ya existe un alumno con la clave proporcionada
// Función para verificar si ya existe un alumno con la clave proporcionada
// Función para verificar si ya existe un alumno con la clave proporcionada
const existeAlumnoConClave = async (clave) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = 'SELECT COUNT(*) AS total FROM alumnos WHERE clave = ?';
            connection.query(sql, [clave], (err, rows) => {
                if (err) {
                    console.error(err);
                    reject('Error al ejecutar la consulta');
                }

                console.log(rows);
                const totalAlumnos = rows[0].total;

                resolve(totalAlumnos > 0); // Devuelve true si hay al menos un alumno con la clave proporcionada
            });
        } catch (error) {
            console.error(error);
            reject('Error al verificar la existencia del alumno');
        }
    });
};



    


export const agregarAlumno = async (req, res) => {
    const {
        clave,
        matricula,
        paterno,
        materno,
        nombre
    } = req.body;

    try {
        // Verificar si ya existe un alumno con la clave proporcionada
        const existeAlumno = await existeAlumnoConClave(clave);
        if (existeAlumno) {
            return res.status(400).json({ message: 'Ya existe un alumno con esa clave' });
        }
        console.log(existeAlumno)
        
        const alumno = {
            clave,
            matricula,
            paterno,
            materno,
            nombre
        };

        // Utiliza la conexión que se ha establecido
        await validarClave(clave);
        await connection.query('INSERT INTO alumnos SET ?', alumno);
        await incrementarContadorAltas();
        res.status(201).json({ message: 'Alumno agregado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el alumno' });
    }
};

// Función para verificar si ya existe un alumno con la clave proporcionada


export const listarAlumnos = async (req, res) => {
    try {
        const sql = 'SELECT * FROM alumnos';
        connection.query(sql, (err, rows) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error al listar los alumnos' });
            }
            
            // console.log('Filas recuperadas:', rows);
            res.status(200).json(rows); // Devolver los resultados como respuesta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar los alumnos' });
    }
};

export const obtenerAlumnos = async (req, res) => {
    const { clave } = req.body;
    try {
        const sql = 'SELECT * FROM alumnos WHERE clave = ?';
        connection.query(sql, [clave], (err, alumno) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error al obtener el alumno' });
            }

            if (alumno.length === 0) {
                return res.status(404).json({ message: 'No se encontró ningún alumno con la clave proporcionada' });
            }
            
            res.status(200).json(alumno[0]);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el alumno' });
    }
};

export const modificarAlumno = async (req, res) => {
    const {
        clave,
        nuevoNombre,
        nuevaMatricula,
        nuevoPaterno,
        nuevoMaterno
    } = req.body;

    try {
        const sql = 'SELECT * FROM alumnos WHERE clave = ?';

        connection.query(sql, [clave], async (err, alumno) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error al obtener el alumno' });
            }

            if (alumno.length === 0) {
                return res.status(404).json({ message: 'El alumno no existe' });
            }

            const nuevosDatos = {}; //se define el objeto en el que estaran los datos
            if (nuevoNombre) nuevosDatos.nombre = nuevoNombre;
            if (nuevaMatricula) nuevosDatos.matricula = nuevaMatricula;//esto es para que si no le das un campo no lo modifique 
            if (nuevoPaterno) nuevosDatos.paterno = nuevoPaterno;
            if (nuevoMaterno) nuevosDatos.materno = nuevoMaterno;
            console.log(clave, nuevosDatos)

            if (Object.keys(nuevosDatos).length === 0) { //si esta vacio no va a llegar al query, que llegue vacio lo romperia
                return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
            }
            await connection.query('UPDATE alumnos SET ? WHERE clave = ?', [nuevosDatos, clave]);

            res.status(200).json({ message: 'Alumno modificado exitosamente' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al modificar el alumno' });
    }
};

export const eliminarAlumno= async (req, res) => {
    const { id } = req.params; 

    try {
        // Verificar si el alumno existe antes de intentar eliminarlo
        const sql = 'SELECT * FROM alumnos WHERE alumno_id = ?';
        connection.query(sql, [id], async (err, alumno) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error al obtener el alumno' });
            }

            if (alumno.length === 0) {
                return res.status(404).json({ message: 'El alumno no existe' });
            }

            // Ejecutar la consulta DELETE para eliminar el alumno
            const deleteSql = 'DELETE FROM alumnos WHERE alumno_id = ?';
            await incrementarContadorBajas();
            connection.query(deleteSql, [id], (deleteErr, result) => {
                if (deleteErr) {
                    console.error('Error al eliminar el alumno:', deleteErr);
                    return res.status(500).json({ message: 'Error al eliminar el alumno' });
                }
                res.status(200).json({ message: 'Alumno eliminado exitosamente' });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el alumno' });
    }
};
export const totalAlumnos = async (req, res) => {
    try {
        const sql = 'SELECT COUNT(*) AS total FROM alumnos';
        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).json({ message: 'Error al obtener el total de alumnos' });
            }
            
            // El resultado de la consulta contendrá una fila con el campo 'total'
            const total = result[0].total;
            res.status(200).json({ total });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el total de alumnos' });
    }
};
