import jwt from 'jsonwebtoken'
import { User } from '../models/UserSchema.js'
import errorHandler from './errMiddle.js'
import { catchasyncerr } from './middlewares.js'

export const isAdminautthenticated = catchasyncerr(async(req,res,next)=>{
    const token = req.cookies.adminToken
    if(!token){
        return next(new errorHandler("admin not authenticated",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id)

    if(req.user.role !== 'Admin'){
        return next(new errorHandler(`${req.user.role} not authorised for this resources`))
    }
    next()
})
export const isPatientautthenticated = catchasyncerr(async(req,res,next)=>{
    const token = req.cookies.patientToken
    if(!token){
        return next(new errorHandler("Patient not authenticated",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id)

    if(req.user.role !== 'Patient'){
        return next(new errorHandler(`${req.user.role} not authorised for this resources`,403))
    }
    next()
})