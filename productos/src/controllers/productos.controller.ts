import express from "express";
import pool from '../db';

// export const getAll = (req: express.Request, res: express.Response) => {
//         res.send('UNACH');
//     };

export const getAll = async (req: express.Request, res: express.Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

