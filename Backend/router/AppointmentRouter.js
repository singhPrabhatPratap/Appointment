import express from 'express'
const router = express.Router()
import { postAppointment,getallappointments,updateAppointmentStatus,deleteAppointment } from '../controller/AppointmentController.js'
import {isAdminautthenticated,isPatientautthenticated} from '../middleWares/auth.js'

router.post('/appointment',isPatientautthenticated,postAppointment)
router.get('/seeappointment',isAdminautthenticated,getallappointments)
router.put('/updateappointment/:id',isAdminautthenticated,updateAppointmentStatus)
router.delete('/deleteappointment/:id',isAdminautthenticated,deleteAppointment)

export default router