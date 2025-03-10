import { Router } from "express";
import { getAll } from "../controllers/productos.controller";

const router = Router();

router.get("/all", getAll);

export default router;