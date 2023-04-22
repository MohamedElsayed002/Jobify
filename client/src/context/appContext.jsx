

import React ,{useEffect,useContext,useReducer} from 'react'
import reducer from './reducer'
import { CLEAR_ALERT,
            DISPLAY_ALERT,
            REGISTER_USER_BEGIN,
            REGISTER_USER_SUCCESS,
            REGISTER_USER_ERROR,
            LOGIN_USER_BEGIN,
            LOGIN_USER_SUCCESS,
            LOGIN_USER_ERROR,
            TOGGLE_SIDEBAR,
            LOGOUT_USER,
            UPDATE_USER_BEGIN,
            UPDATE_USER_ERROR,
            UPDATE_USER_SUCCESS,
            HANDLE_CHANGE,
            CLEAR_VALUES,
            CREATE_JOB_BEGIN,
            CREATE_JOB_ERROR,
            CREATE_JOB_SUCCESS,
            GET_JOBS_BEGIN,
            GET_JOBS_SUCCESS,
            SET_EDIT_JOB,
            DELETE_JOB_BEGIN,
            EDIT_JOB_BEGIN,
            EDIT_JOB_ERROR,
            EDIT_JOB_SUCCESS,
            SHOW_STATS_BEGIN,
            SHOW_STATS_SUCCESS} from './action'
import axios from 'axios'


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading : false,
    showAlert : false,
    alertText : '',
    alertType : '',
    user : user ? JSON.parse(user) : null,
    token : token,
    userLocation : userLocation || '',
    jobLocation : userLocation ||  '',
    showSidebar : true,
    isEditing : false,
    editJobId : '',
    position : '',
    company : '',
    jobTypeOptions : ['full-time' , 'part-time' , 'remote' , 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview' , 'declined' , 'pending'],
    status  : 'pending',
    jobs : [],
    totalJobs: 0,
    numOfPages :1,
    page : 1,
    stats : {},
    monthlyApplications : []
}





const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)


    const authFetch = axios.create({
        baseURL: '/api/v1',
      });

    authFetch.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(error.response)
            if(error.response.status === 401) {
                logOutUser()
            }
            return Promise.reject(error)
        }
    )


    const displayAlert = () => {
        dispatch({type : DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type : CLEAR_ALERT})
        },3000)
    }

    const addToLocalStorage = ({user,token,location}) => {
        localStorage.setItem('user' , JSON.stringify(user))
        localStorage.setItem('token' , token)
        localStorage.setItem('location' , location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
        dispatch({type : REGISTER_USER_BEGIN})
        try {
            const response = await axios.post('/api/v1/auth/register' , currentUser)
            console.log(response.data)
            const {user , token , location } = response.data
            console.log(user,token,location)
            dispatch({
                type : REGISTER_USER_SUCCESS,
                payload : {user,token,location}
            })
            addToLocalStorage({user,token,location})
        } catch (error) {
            console.log(error.response)
            dispatch({type : REGISTER_USER_ERROR,
            payload: {message : error.response.data.message}
        })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({type : LOGIN_USER_BEGIN})
        try {
            const {data} = await axios.post('/api/v1/auth/login' , currentUser)
            const {user , token ,location} = data
            dispatch({
                type : LOGIN_USER_SUCCESS,
                payload : {user,token,location},
            })
            addToLocalStorage({user,token,location})

        }catch(error) {
            dispatch({
                type : LOGIN_USER_ERROR,
                payload : {message : error.response.data.message}
            })
        }
        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({type : TOGGLE_SIDEBAR})
    }

    const logOutUser = () => {
        dispatch({type : LOGOUT_USER})
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({type : UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch('/auth/updateUser' , currentUser)
            const {user , location , token} = data
            dispatch({
                type : UPDATE_USER_SUCCESS,
                payload : {user,location,token}
            })

            addToLocalStorage({user,location,token})

        } catch (error) {
            if(error.response.status !== 401) {
                dispatch({type : UPDATE_USER_ERROR , payload : {message : error.response.data.message}})

            }
        }
        clearAlert()
    }

    const handleChange = ({name,value}) => {
        dispatch({type : HANDLE_CHANGE , payload : {name,value}})
    }

    const clearValues = () => {
        dispatch({type : CLEAR_VALUES})
    }
    

    const createJob = async () => {
        dispatch({type : CREATE_JOB_BEGIN})
        try {
            const {position,company,jobLocation,jobType,status} = state
            await authFetch.post('/jobs' , {
                position,
                company,
                jobLocation,
                jobType,
                status
            })
            dispatch({type : CREATE_JOB_SUCCESS})
            dispatch({type : CLEAR_VALUES})
        }catch(error) {
            if(error.response.status === 401) return
            dispatch({
                type : CREATE_JOB_ERROR,
                payload: {message : error.response.data.message}
            })
        }
        clearAlert()
    }


    const getJobs = async () => {
        let url = '/jobs'

        dispatch({type : GET_JOBS_BEGIN})
        try {
            const {data} = await authFetch(url)
            const {jobs,totalJobs,numOfPages} = data
            dispatch({
                type : GET_JOBS_SUCCESS,
                payload : {
                    jobs,
                    totalJobs,
                    numOfPages
                }
            })
        }catch(error) {
            console.log(error.response)
            logOutUser()
        }
    }


    const setEditJob = (id) => {
        dispatch({type : SET_EDIT_JOB , payload :{id}})
    }

    const editJob = async  () => {
        dispatch({type : EDIT_JOB_BEGIN})
        try {
            const {position,company,jobLocation,jobType,status} = state
            await authFetch.patch(`/jobs/${state.editJobId}` , {
                company,
                position,
                jobLocation,
                jobType,
                status
            })
            dispatch({type : EDIT_JOB_SUCCESS})
            dispatch({type : CLEAR_VALUES})

        }catch(error) {
                if(error.response.status === 401) return
                dispatch({type : EDIT_JOB_ERROR , payload : error.response.data.message})
            
        }
        clearAlert()
    }

    const deleteJob = async (jobId) => {
        dispatch({type : DELETE_JOB_BEGIN})
        try {
            await authFetch.delete(`/jobs/${jobId}`)
            getJobs()
        }catch(error) {
            console.log(error.response)
        }
    }


    const showStats = async () => {
        dispatch({type : SHOW_STATS_BEGIN})
        try {
            const {data} = await authFetch('/jobs/stats')
            dispatch({
                type : SHOW_STATS_SUCCESS,
                payload : {
                    stats : data.defaultStats,
                    monthlyApplications : data.monthlyApplications
                }
            })
        }catch(error) {
            console.log(error.response)
            
        }
    }


    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            registerUser,
            loginUser,
            toggleSidebar,
            logOutUser,
            updateUser,
            handleChange,
            clearValues,
            createJob,
            getJobs,
            setEditJob,
            deleteJob,
            editJob,
            showStats
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider , initialState , useAppContext}