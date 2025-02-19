import { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
    // console.log(req.body);
    const user = new User(req.body);
    await user.save()
    res.send('Registro Creado Correctamente')
 }