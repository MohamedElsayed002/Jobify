
import  {createJob , deleteJob , getAllJobs , updateJob , showStats} from '../controllers/jobsController.js'
import express from 'express'



const JobsRouter = express.Router()

JobsRouter.route('/').post(createJob).get(getAllJobs)
JobsRouter.route('/stats').get(showStats)
JobsRouter.route('/:id').delete(deleteJob).patch(updateJob)


export default JobsRouter