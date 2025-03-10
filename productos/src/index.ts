import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import productosRoutes from "./routes/productos.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuración de la conexión a MySQL en WSL con TypeScript
const db = mysql.createConnection({
  host: "172.26.64.107",
  user: "root",
  password: "tu_contraseña", // Reemplázalo con tu contraseña real
  database: "nombre_de_tu_base" // Cambia esto por el nombre de tu base de datos
});

db.connect((err: Error | null) => {
  if (err) {
    console.error(" Error al conectar a MySQL en WSL:", err);
    return;
  }
  console.log(" Conectado a MySQL en WSL");
});

app.use(express.json());
app.use("/productos", productosRoutes);

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Ruta para probar conexión con la base de datos
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS resultado", (err: Error | null, result: any) => {
    if (err) {
      res.status(500).json({ error: " Error en la conexión a la base de datos", detalle: err.message });
    } else {
      res.json({ mensaje: " Conexión exitosa", resultado: result });
    }
  });
});

app.listen(port, () => {
  console.log(` Servidor escuchando en el puerto: ${port}`);
});




