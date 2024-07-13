import { catchasyncerr } from "../middleWares/middlewares.js";
import { Appointment } from "../models/Appointment.js";
import { User } from "../models//UserSchema.js";
import errorHandler from "../middleWares/errMiddle.js";

export const postAppointment = catchasyncerr(async (req, res, next) => {
  let {
    firstName,
    lastName,
    middleName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasvisited,
    address,
  } = req.body;
if (
    !firstName ||
    !lastName ||
    !middleName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new errorHandler("please fill full form", 400));
  }
  const isconflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isconflict.length === 0) {
    return next(new errorHandler("doctor not found", 404));
  }
  if (isconflict.length > 1) {
    return next(
      new errorHandler("doctor Conflict please contact on email or Phone", 404)
    );
  }
  // doctorId = isconflict[0]._id;
  // patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    middleName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor:{
        firstName:doctor_firstName,
        lastName:doctor_lastName,
    },
    hasvisited,
    address,
    doctorId:isconflict[0]._id,
    patientId:req.user._id
  });
  res.status(200).json({
    success:true,
    message:'Appointment sent successfully',
    appointment
  })
});
export const getallappointments= catchasyncerr(async(req,res,next)=>{
const appointments = await Appointment.find()
res.status(200).json({
  success:true,
  appointments
})
})

export const updateAppointmentStatus = catchasyncerr(async(req,res,next)=>{
  let {id}  = req.params
  const appointment = await Appointment.findById(id)
  if(!appointment){
    return next(new errorHandler(" appointment not found",404))

  }
  appointment = await Appointment.findByIdAndUpdate(id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:true
  });
  res.status(200).json({
    success:true,
    message:'appointment updated',
    appointment
  })
})

export const deleteAppointment = catchasyncerr(async(req,res,next)=>{
  let {id}= req.params
  let appointment = await Appointment.findById(id)
if(!appointment){
  return next(new errorHandler('appoitnment not found',404))
}
await appointment.deleteOne()
res.status(200).json({
  success:true,
  message:' Appointment deleted Successfully'
})
})

