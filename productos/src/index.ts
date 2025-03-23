import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import productosRoutes from "./routes/productos.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3013;

app.use(express.json());
app.use("/productos", productosRoutes);

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});