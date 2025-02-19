import { Router } from "express";
import User from "./models/User";

const router = Router();

/** Autenticación y registro */
router.post('/auth/register', async (req, res) => {
   // console.log(req.body);
   const user = new User(req.body);
   await user.save()
   res.send('Registro Creado Correctamente')
});

export default router;
