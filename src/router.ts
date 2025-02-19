import { Router } from "express";
import User from "./models/User";

const router = Router();

/** Autenticación y registro */
router.post('/auth/register', async (req, res) => {
   // console.log(req.body);
   const user = new User(req.body);
   await user.save();
   
   // Otra forma de hacerlo
   // await User.create(req.body)
});

export default router;
