import mysql from "mysql";

let connection;

export const connectDB = () => {
    // Configura la conexión a MySQL
    connection = mysql.createConnection({
        host: "localhost",
        user: "escolaresmx",
        password: "1234",
        database: "escolaresmx" // Nombre de tu base de datos MySQL
    });

    // Conectar a la base de datos MySQL
    connection.connect((err) => {
        if (err) {
            console.error("Error al conectar a la base de datos MySQL:", err);
            return;
        }
        console.log("Conectado a la base de datos MySQL");
    });
    
    return connection; // Devuelve la conexión para que pueda ser utilizada
};
