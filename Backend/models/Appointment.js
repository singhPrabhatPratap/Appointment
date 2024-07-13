import mongoose from "mongoose";
import validator from "validator";

const appointmentschema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "please eneter a valid number"],
    maxLength: [10, "please eneter a valid number"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is invalid"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  appointment_date:{
    type:String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  doctor:{
    firstName:{
        type:String,
    required:true
    },
    lastName:{
        type:String,
    required:true
    }
  },
  hasvisited:{
    type:Boolean,
    default:false
  },
  doctorId:{
    type:mongoose.Schema.ObjectId,
    required:[true,'Doctor ID is invalid']
  },
  patientId:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,'Patient ID is invalid']
  },
  address:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:['Pending','Accepted','Rejected'],
    default:'Pending'
  }
});
export const Appointment= mongoose.model('Appointment',appointmentschema)
