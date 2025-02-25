import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
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
            // res.json(user)
            req.user = user
            next()
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Token No Válido' });
    }
}