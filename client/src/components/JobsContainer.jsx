

import { useEffect } from "react"
import Loading from "./Loading"
import Job from "./Job"
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppContext } from "../context/appContext"

const JobsContainer = () => {

    const {getJobs,jobs,isLoading,page,totalJobs} = useAppContext()

    useEffect(() => {
        getJobs()
    },[])

    if(isLoading) {
        return <Loading/>
    }

    if(jobs.length === 0) {
        return <Wrapper>
            <h2>no job to display...</h2>
        </Wrapper>
    }

    return (
        <Wrapper>
            <h4>
                {totalJobs} job{jobs.length > 1 && 's'} found
            </h4>
            <div className="jobs">
                {
                    jobs.map((job) => {
                        return <Job key={job._id} {...job} />
                    })
                }
            </div>
        </Wrapper>
    )
}

export default JobsContainer