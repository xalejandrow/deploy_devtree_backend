import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers";

const router = Router();

/** Autenticación y registro */
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacío'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('El password debe tener al menos 8 caracteres'),
        // .withMessage('El password no puede ir vacío'),
    createAccount);

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    login
);

export default router;