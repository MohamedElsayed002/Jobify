

import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'please provide name'],
        minLength : 3,
        maxLength : 20,
        trim  : true,
    },
    email : {
        type : String,
        required  : [true , 'please provide email'],
        validate  : {
            validator: validator.isEmail,
            message : 'please provide a valid email'
        },
        unique : true,
    },
    password : {
        type : String,
        required : [true , 'please provide password'],
        minLength : 6
    },
    lastName : {
        type : String,
        maxLength : 20,
        trim : true,
        default : 'lastName'
    },
    location : {
        type : String,
        trim : true,
        maxLength : 20,
        default : 'my city'
    }

})



userSchema.pre('save' , async function () {
    if(!this.modifiedPaths('password')) return 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function () {
    return jwt.sign({userId : this._id} , 'jwtSecret' , {expiresIn : '1d'})
}


userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export const userModel =  mongoose.model('user' , userSchema)