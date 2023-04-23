

import { useEffect } from "react"
import Loading from "./Loading"
import Job from "./Job"
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAppContext } from "../context/appContext"
import PageBtnContainer from "./pageBtnContainer"
const JobsContainer = () => {

    const {getJobs,jobs,isLoading,page,totalJobs,search,searchStatus,searchType,sort,numOfPages} = useAppContext()
    console.log(jobs)

    useEffect(() => {
        getJobs()
    },[search,searchStatus,searchType,sort,page])

    if(isLoading) {
        return <Loading/>
    }
    if(!jobs) {
        return <h1>no</h1>
    }
    if(jobs.length === 0) {
        return <Wrapper>
            <h2>no job to display...</h2>
        </Wrapper>
    }
    console.log(numOfPages)
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
            {numOfPages > 1 && <PageBtnContainer/>}
        </Wrapper>
    )
}

export default JobsContainer