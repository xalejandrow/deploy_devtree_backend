import  { Request, Response } from "express";
import User from "../models/User";

export const createAccount = async (req: Request, res: Response) => {
    // console.log(req.body);

    const { email } = req.body;

    const userExists = await User.findOne({ email });
    
    if(userExists) {
        const error = new Error('El usuario ya está registrado')
        res.status(409).json({ error: error.message });
        return;
    }
    
    const user = new User(req.body)
    await user.save()
    res.status(200).send('Registro Creado Correctamente')

 }