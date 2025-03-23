import { Request, Response } from 'express';
import pool from '../db'; // Importa la conexión a la base de datos

// Obtener todos los productos
export const getAll = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
};

// Insertar un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
    const { nombre, productos, descripcion, categoria } = req.body; 

    
    if (!nombre || !productos || !categoria) {
        return res.status(400).send('Nombre, productos y categoría son campos obligatorios');
    }

    try {
        // Inserta el producto en la base de datos
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, productos, descripcion, categoria) VALUES (?, ?, ?, ?)',
            [nombre, productos, descripcion, categoria]
        );

        
        res.status(201).json({
            message: 'Producto insertado correctamente',
            id: (result as any).insertId, 
        });
    } catch (error) {
        console.error('Error al insertar producto:', error);
        res.status(500).send('Error al insertar producto');
    }
};

// modificar productos
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { nombre, productos, descripcion, categoria } = req.body; 

   
    if (!nombre || !productos || !categoria) {
        return res.status(400).send('Nombre, precio y categoría son campos obligatorios');
    }

    try {
       
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, productos = ?, descripcion = ?, categoria = ? WHERE id = ?',
            [nombre, productos, descripcion, categoria, id]
        );

        
        if ((result as any).affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        res.status(200).json({
            message: 'Producto actualizado correctamente',
            id: id,
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error al actualizar producto');
    }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtén el ID del producto desde los parámetros de la URL

    try {
        
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);

    
        if ((result as any).affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        res.status(200).json({
            message: 'Producto eliminado correctamente',
            id: id,
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error al eliminar producto');
    }
};