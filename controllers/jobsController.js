import { jobModel } from "../models/Jobs.js"
import {BadRequestError , NotFoundError , UnauthenticatedError} from '../errors/index.js'
import {StatusCodes} from 'http-status-codes'
import checkPermissions from "../utils/checkPermisson.js"
import mongoose from 'mongoose'
import moment from 'moment'



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

    const { status, jobType, sort, search } = req.query;

    const queryObject = {
        createdBy : req.user.userId
    }

    if(status !== 'all') {
        queryObject.status = status
    }

    if(jobType !== 'all') {
        queryObject.jobType = jobType
    }

    if(search) {
        queryObject.position = {$regex : search , $options : 'i'}
    }

    let result = jobModel.find(queryObject)

    if(sort === 'latest') {
        result = result.sort('-createdAt')
    }

    if(sort === 'oldest') {
        result = result.sort('createdAt')
    }

    if(sort === 'a-z') {
        result = result.sort('position')
    }

    if(sort === 'z-a') {
        result = result.sort('-position')
    }

    const jobs = await result 

    res.status(StatusCodes.OK).json({jobs,totalJobs : jobs.length , numsOfPages : 1})
}



const updateJob = async (req,res) => {

    const {id : jobId} = req.params
    const {company , position} = req.body

    if(!position || !company) {
        throw new BadRequestError('please provide all values')
    }

    const job = await jobModel.findOne({_id : jobId})
    if(!job) {
        throw new NotFoundError(`no job with id: ${jobId}`)
    }


    checkPermissions(req.user , job.createdBy)

    const updateJob = await jobModel.findOneAndUpdate({_id : jobId} , req.body , {new : true , runValidators : true})
    res.status(StatusCodes.OK).json(updateJob)


}


const deleteJob = async (req,res) => {

    const {id : jobId} = req.params
    const job = await jobModel.findOneAndDelete({_id : jobId})

    if(!job) {
        throw new NotFoundError(`NO job with id : ${jobId}`)
    }

    checkPermissions(req.user,job.createdBy)

    
    res.status(StatusCodes.OK).json({message : "success ! job removed"})

}
const ObjectId = mongoose.Types.ObjectId;


const showStats = async (req,res) => {
    console.log(req.user.userId)
    let stats = await jobModel.aggregate([
        {$match : {createdBy : new ObjectId(req.user.userId)}},
        {$group : {_id : '$status' , count : {$sum : 1}}}
    ])

    stats = stats.reduce((acc,curr) => {
        const {_id : title , count} = curr
        acc[title] = count
        return acc
    } , {})

    const defaultStats = {
        pending : stats.pending || 0,
        interview : stats.interview || 0,
        declined : stats.declined || 0
    }

    let monthlyApplications = await jobModel.aggregate([
        {$match : {createdBy : new ObjectId(req.user.userId)}},
        {
            $group : {
                _id : {year : {$year : '$createdAt'} , month : {$month : '$createdAt'}},
                count  : {$sum : 1}
            },
        },
        { $sort : {'_id.year' : -1 , '_id.month' : -1}},
        { $limit : 6}
    ])

    monthlyApplications = monthlyApplications.map((item) => {
        const {
            _id : {year,month},
            count,
        } = item

        const date = moment().month(month -1 ).year(year).format('MMM Y')
        return {date,count}
    }).reverse()

    res.status(StatusCodes.OK).json({defaultStats , monthlyApplications})

}











export {createJob , deleteJob , getAllJobs , updateJob , showStats}