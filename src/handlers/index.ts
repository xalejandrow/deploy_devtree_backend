import  { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
    // console.log(req.body);

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    
    if(userExists) {
        const error = new Error('El usuario ya está registrado')
        res.status(409).json({ error: error.message });
        return;
    }
    
    const user = new User(req.body)
    user.password = await hashPassword(password)
    await user.save()
    res.status(200).send('Registro Creado Correctamente')

 }