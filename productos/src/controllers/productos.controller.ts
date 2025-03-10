import { Request, Response } from "express";

export const getAll = (req: Request, res: Response): void => {
    res.status(200).json({ message: "hola UNACH" });
    //res.send("UNACH")
};
