import express from "express"
import cors from "cors"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import { dbconnection } from "./Database/dbconnection.js"
import router from './router/router.js' 
import userRouter from './router/UserRouter.js'
import AppointmentRouter from './router/AppointmentRouter.js'
import { errorMiddleWare} from "./middleWares/errMiddle.js"

const app = express()
config({path:"./config/config.env"})

app.use(
    cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET",'POST','PUT','DELETE'],
    credentials:true,
}
))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

app.use('/api/v1/message',router)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/Appointment',AppointmentRouter)
dbconnection()
app.use(errorMiddleWare)
export default app