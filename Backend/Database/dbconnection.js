import mongoose from "mongoose";
export const dbconnection = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:'APPOINTMENT'
        }).then(()=>{
            console.log('connected')
        }).catch((err)=>{
           throw err
        })
}