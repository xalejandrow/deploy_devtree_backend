import  { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import slug from 'slugify';
import formidable from 'formidable';
import { v4 as uuid } from 'uuid';
import User from "../models/User";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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
    // console.log('desde getUser');
   res.json(req.user)
       
}

export const updateProfile = async (req: Request, res: Response) => {
   try {
        // console.log(req.body);
        const { description } = req.body;
        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({ handle});
        if(handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Nombre de usuario no disponible')
            res.status(409).json({ error: error.message });
            return;
        }

        // actualizar el usuario
        req.user.description = description;
        req.user.handle = handle;
        await req.user.save();
        res.status(200).send('Perfil Actualizado Correctamente')
        
   } catch (e) {
    const error = new Error('Hubo un error')
    res.status(500).json({ error: error.message });
   }
}

export const uploadImage = async (req: Request, res: Response) => {

    const form = formidable({ multiples: false });

    try {
        // console.log('desde uploadImage');
        form.parse(req, (error, fields, files) => {
            // console.log(files.file[0].filepath);
            cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, async function(error, result) {
                if(error) {
                    const error = new Error('Hubo un error al subir la imagen')
                    res.status(500).json({ error: error.message });
                    return;
                }
                if(result) {
                    console.log(result.secure_url);
                    
                }

            })
        })
        
    } catch (e) {
        const error = new Error('Hubo un error')
        res.status(500).json({ error: error.message });
        return;
    }
}