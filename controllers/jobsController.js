import { jobModel } from "../models/Jobs.js"
import {BadRequestError , NotFoundError , UnauthenticatedError} from '../errors/index.js'
import {StatusCodes} from 'http-status-codes'




const createJob = async (req,res) => {

    const {position , company} = req.body

    if(!position || !company) {
        throw new BadRequestError('please provide all values')
    }

    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body)
    res.status(StatusCodes.CREATED).json(job)

}

const getAllJobs = async (req,res) => {
    const jobs  = await jobModel.find({createdBy : req.user.userId})
    res.status(StatusCodes.OK).json({jobs,totalJobs : jobs.length , numsOfPages : 1})
}


const updateJob = async (req,res) => {
    res.send('updateJob ')
}

const showStats = async (req,res) => {
    res.send('show stats job')
}



const deleteJob = async (req,res) => {
    res.send('deleteJob')
}







export {createJob , deleteJob , getAllJobs , updateJob , showStats}