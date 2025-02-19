import User from "../models/User";

export const createAccount = async (req, res) => {
    // console.log(req.body);
    const user = new User(req.body);
    await user.save()
    res.send('Registro Creado Correctamente')
 }