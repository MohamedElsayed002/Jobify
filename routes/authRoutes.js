
import express from 'express'
import { register , login , updateUser } from "../controllers/auth.Controller.js";
import { auth } from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit'
const apiLimiter = rateLimiter({
    windowMs : 15 * 60 * 1000,
    max: 10,
    message : 'too many requests from this IP address, please try again after 15minutes'
})
const authRouter = express.Router()



authRouter.route('/register').post(apiLimiter,register)
authRouter.route('/login').post(apiLimiter,login)
authRouter.route('/updateUser').patch(auth , updateUser)


export default authRouter