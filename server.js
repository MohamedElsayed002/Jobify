
import express from 'express'
import connectDB from './db/connect.js'

import dotenv from 'dotenv'
import 'express-async-errors'
import morgan from 'morgan'
dotenv.config()

import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

import authRouter from './routes/authRoutes.js'
import JobsRouter from './routes/jobsRouter.js'
import { auth } from './middleware/auth.js'



const app = express()

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/' , (req,res) => {
    res.json({message : 'api'})
})

app.get('/api/v1' , (req,res) => {
    res.json({message : "Mohamed"})
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs' , auth, JobsRouter)

app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)




const port = process.env.PORT  || 5000
const start = async () => {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(port , () => {
            console.log(`Server is listening on port ${port}`)
        })
    }catch(error) {
        console.log(error)
    }
}

start()