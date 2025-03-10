import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config({ path: "/home/taller4/api-gateway/.env" });

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());


app.get("/productos", async (req, res) => {
  try { 
    const response = await axios.get("http://localhost:3001/productos/all"); 
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al obtener productos");
  }
});

// Redirigir a usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3002/usuarios/usuario1");
    res.json(response.data); 
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios");
  }
});


app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(port, () => {
  console.log(`Escuchando en el puerto: ${port}`);
});


