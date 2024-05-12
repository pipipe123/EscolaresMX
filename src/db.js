import mysql from "mysql";

export const connectDB = () => {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "escolaresmx" 
    });

    connection.connect((err) => {
        if (err) {
            console.error("Error al conectar a la base de datos MySQL:", err);
            return;
        }
        console.log("Conectado a la base de datos MySQL");
    });
    
    return connection;
};
