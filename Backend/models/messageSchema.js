import mongoose from "mongoose";
import validator from "validator";


const messageschema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },lastName:{
        type:String,
        required:true
    },middleName:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please enter a valid email"]
    },phone:{
        type:String,
        required:true,
       minLength:[10,'please eneter a valid number'],
       maxLength:[10,'please eneter a valid number']
    },message:{
        type:String,
        required:true,
        minLength:[10,'enter atleast 10 character']
    }

})
export const Message = mongoose.model("Message",messageschema)