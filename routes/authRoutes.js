
import express from 'express'
import { register , login , updateUser } from "../controllers/auth.Controller.js";
import { auth } from '../middleware/auth.js';


const authRouter = express.Router()



authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('/updateUser').patch(auth , updateUser)


export default authRouter