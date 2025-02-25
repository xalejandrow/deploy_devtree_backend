import  { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import slug from 'slugify';
import jwt from 'jsonwebtoken';
import User from "../models/User";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
    // console.log(req.body);
    

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) {
        const error = new Error('Un usuario con ese email ya está registrado')
        res.status(409).json({ error: error.message });
        return;
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle
    });
    if(handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({ error: error.message });
        return;
    }
    
    
    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle
    
    await user.save()
    res.status(200).send('Registro Creado Correctamente')
    
}


export const login = async (req: Request, res: Response) => {
    
    // Manejar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { email, password } = req.body;

    // Revisar si el usuario está registrado
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error('El Usuario no existe')
        res.status(404).json({ error: error.message });
        return;
    }

    // Comprobar el password
    const isPasswordCorrect = await checkPassword(password, user.password)
    if(!isPasswordCorrect) {
        const error = new Error('Password Incorrecto')
        res.status(401).json({ error: error.message });
        return;
    }
    
    const token = generateJWT({id: user._id})

    res.send(token)


}

export const getUser = async (req: Request, res: Response) => {
    const bearer = req.headers.authorization;
    if(!bearer) {
        const error = new Error('No Autorizado')
        res.status(401).json({ error: error.message });
        return 
    }

    const [, token] = bearer.split(' ')
    if(!token) {
        const error = new Error('No Autorizado')
        res.status(401).json({ error: error.message });
        return 
    }

    try {
        const resuult = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(resuult);
        if(typeof resuult === 'object' && resuult.id) {
            // console.log(resuult.id);
            // const user = await await User.findById(resuult.id).select('name email handle description image')
            const user = await await User.findById(resuult.id).select('-password')
            if(!user) {
                const error = new Error('El Usuario no existe')
                res.status(404).json({ error: error.message });
                return 
            }
            res.json(user)
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Token No Válido' });
    }
}