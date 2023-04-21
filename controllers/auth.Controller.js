
import {BadRequestError , NotFoundError , UnauthenticatedError} from '../errors/index.js'
import {userModel} from '../models/Users.js'
import {StatusCodes} from 'http-status-codes'








export const register = async  (req,res) => {
        const {name,email,password} = req.body
        if(!name || !email || !password) {
            throw  new BadRequestError("please all fields required")
        }
        const user = await userModel.create({name,email,password})
        let token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user : {email : user.email , name : user.name , lastName : user.lastName , location : user.location} , token , location : user.location})
    

}

export const login = async  (req,res) => {
    const {email,password} = req.body
    if(!email || !password) {
        throw new BadRequestError('please provide all values')
    }

    const user = await userModel.findOne({email}).select('+password')
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    console.log(user)

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user ,token , location : user.location})



}

export const updateUser = async  (req,res) => {
    const {email,name,lastName,location} = req.body
    if(!email || !name || !lastName || !location) {
        throw new BadRequestError('Please provide all values ')
    }

    const user = await userModel.findOne({_id : req.user.userId})

    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location 

    await user.save()
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user , token , location : user.location})
}