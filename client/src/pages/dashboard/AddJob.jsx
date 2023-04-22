
import {useState} from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {    FormRowSelect ,
            FormRow ,
            Alert} from '../../components'

const AddJob = () => {
    const { createJob,
            isLoading,
            clearValues,
            handleChange ,
            isEditing,
            showAlert,
            displayAlert,
            position,
            company,
            jobLocation,
            jobType,
            jobTypeOptions,
            status,
            statusOptions,
            editJob} = useAppContext()


            const handleJobInput = (e) => {
                const name = e.target.name
                const value = e.target.value
                handleChange({ name, value })
              }

    const handleSubmit = (e) => {
        e.preventDefault()
    
        if (isEditing) {
          editJob()
          return
        }
        createJob()
      }
   
    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? 'edit job ' : 'add job'}</h3>
                {showAlert && <Alert/>}
                <div className="form-center">
                    <FormRow    type="text"
                                name="position"
                                value={position} 
                                handleChange={handleJobInput}
                    />
                    <FormRow    type="text"
                                name="company"
                                value={company} 
                                handleChange={handleJobInput}
                    />
                    <FormRow    type="text"
                                name="jobLocation"
                                labelText='job location'
                                value={jobLocation} 
                                handleChange={handleJobInput}
                    />
                    <FormRowSelect
                        name="status"
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    <FormRowSelect
                        name="jobType"
                        labelText="job type"
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />

                    <div className="btn-container">
                    <button onClick={(e) => {
                            e.preventDefault()
                            clearValues()
                        }} className="btn btn-block clear-btn">
                            clear
                        </button>

                        <button onClick={handleSubmit} type="submit" className="btn btn-block submit-btn" disabled={isLoading}>
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob