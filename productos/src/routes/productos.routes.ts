import { Router } from "express";
import { getAll } from "../controllers/productos.controller";
import { createProduct } from "../controllers/insert.controller";
import { updateProduct } from "../controllers/insert.controller";
import { deleteProduct } from "../controllers/insert.controller";

const router = Router();

router.get("/all", getAll);

// Ruta para insertar un nuevo producto
router.post("/", createProduct);

// Ruta para modificar un producto existente
router.put("/:id", updateProduct);

// Ruta para eliminar un producto
router.delete("/:id", deleteProduct);


export default router;