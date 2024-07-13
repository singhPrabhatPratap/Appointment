import express from 'express'
import { login, newAdmin, patientRegistered,getDoctorsDetails,getUserDetail,adminlogout,patientlogout,addNewDoctor} from '../controller/UserController.js'
let router = express.Router()
import {isAdminautthenticated,isPatientautthenticated} from  '../middleWares/auth.js'

router.post("/User/Registered",patientRegistered)
router.post("/login",login)
router.post("/Admin/Registered",isAdminautthenticated,newAdmin)
router.post("/doctor/Registered",isAdminautthenticated,addNewDoctor)
router.get("/doctors",getDoctorsDetails)
router.get("/admin/me",isAdminautthenticated,getUserDetail)
router.get("/patient/me",isPatientautthenticated,getUserDetail)
router.get("/patient/logout",isPatientautthenticated,patientlogout)
router.get("/admin/logout",isAdminautthenticated,adminlogout)
export default router